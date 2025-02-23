import OpenAI from "openai";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import UserMealPreference from "@/backend/mealPreference";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function uploadToR2(base64Image, mealTitle) {
  try {
    const buffer = Buffer.from(base64Image, "base64");
    const uniqueId = crypto.randomBytes(8).toString("hex");
    const key = `meals/${uniqueId}-${mealTitle
      .toLowerCase()
      .replace(/\s+/g, "-")}.png`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: "pregnant-meal-images",
        Key: key,
        Body: buffer,
        ContentType: "image/png",
        ACL: "public-read",
      })
    );

    return `${process.env.NEXT_PUBLIC_R2_URL}/${key}`;
  } catch (error) {
    console.error("Error uploading to R2:", error);
    return null;
  }
}

async function generateImage(prompt) {
  try {
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: "FAST_BLUE",
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30,
          style_preset: "photographic",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Stability API Error:", {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      throw new Error(
        `Stability API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.artifacts?.[0]?.base64) {
      throw new Error("No image data received from Stability API");
    }

    return data.artifacts[0].base64;
  } catch (error) {
    console.error("Image generation error:", error);
    // Return null instead of throwing to prevent the entire meal plan from failing
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { prompt: id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing meal preference ID" });
    }

    // Fetch user preferences using fetch API
    const preferenceRes = await fetch(
      `${process.env.NEXTAUTH_URL}/api/core/meal-preferences?id=${id}`
    );

    if (!preferenceRes.ok) {
      return res
        .status(preferenceRes.status)
        .json({ message: "Failed to fetch user preferences" });
    }

    const { preference: userPreference } = await preferenceRes.json();

    if (!userPreference) {
      return res.status(404).json({ message: "User preferences not found" });
    }

    const prompt = `Create a personalized pregnant meal plan with the following preferences:
      - Cuisine Type: ${userPreference.cuisineType}
      - Pregnancy Stage: ${userPreference.pregnancyStage}
      - Meals per Day: ${userPreference.mealCountPerDay}
      - Allergies/Restrictions: ${
        userPreference.allergiesFoodAversionsDietaryRestrictions || "None"
      }
      - Cooking Level: ${userPreference.cookingLevel}
      
    Please provide a detailed meal plan that is safe for pregnancy and takes into account these preferences.
    
    Format:
    [Day]
    - Meal 1: [Name] - [Brief description] - [Key ingredients]
    - Meal 2: [Name] - [Brief description] - [Key ingredients]
    - Meal 3: [Name] - [Brief description] - [Key ingredients]
    (Adjust meals as needed)

    Do not include any introductory text or conclusion. Start directly with the first day of the week.
    Provide a complete 7-day plan. Be concise but ensure all days are included.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 5000,
      stream: false,
    });

    const mealPlanText = completion.choices[0].message.content;
    const days = mealPlanText
      .split(/\[Day \d+\]/)
      .filter((day) => day.trim())
      .map((day) => {
        return day
          .split("\n-")
          .filter((meal) => meal.trim())
          .map((meal) => {
            const parts = meal.split(" - ").map((s) => s.trim());
            return {
              title: parts[0]?.replace(/Meal \d+:\s*/, ""),
              description: parts[1] || "",
              ingredients: parts[2]?.replace(/\.$/, "") || "",
              type: parts[0]?.match(/Meal \d+/)?.[0] || "Meal",
            };
          });
      });

    // Generate images and store them
    const mealImages = [];
    const mealPlanWithImages = await Promise.all(
      days.map(async (dayMeals) => {
        const mealsWithImages = await Promise.all(
          dayMeals.map(async (meal) => {
            if (!meal.title) return meal;

            const imagePrompt = `A beautiful, appetizing photo of ${meal.title}. Professional food photography style, well-lit, on a clean plate with garnish. Focus on the food presentation.`;
            const base64Image = await generateImage(imagePrompt);

            let imageUrl = null;
            if (base64Image) {
              imageUrl = await uploadToR2(base64Image, meal.title);
              if (imageUrl) {
                mealImages.push({
                  mealTitle: meal.title,
                  imageUrl: imageUrl,
                });
              }
            }

            return {
              ...meal,
              image: base64Image || null,
            };
          })
        );
        return mealsWithImages;
      })
    );

    // Update the meal preference document with both meal plan and images
    const updatedPreference = await UserMealPreference.findByIdAndUpdate(
      id,
      {
        $set: {
          generatedMealPlans: mealPlanText,
          mealImages: mealImages,
          dateModified: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedPreference) {
      throw new Error("Failed to update meal preference");
    }

    return res.status(200).json({
      mealPlan: mealPlanText,
      mealPlanStructured: mealPlanWithImages,
    });
  } catch (error) {
    console.error("Error generating meal plan:", error);
    return res
      .status(500)
      .json({ message: "Error generating meal plan", error: error.message });
  }
}
