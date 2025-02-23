import UserMealPreference from "@/backend/mealPreference";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

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
          text_prompts: [{ text: prompt, weight: 1 }],
          cfg_scale: 7,
          clip_guidance_preset: "FAST_BLUE",
          height: 640,
          width: 1536,
          samples: 1,
          steps: 30,
          style_preset: "photographic",
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Stability API error: ${response.status}`);
    }

    const data = await response.json();
    return data.artifacts?.[0]?.base64 || null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, mealPlanStructured } = req.body;
    if (!id || !mealPlanStructured) {
      return res.status(400).json({ message: "Missing required data" });
    }

    const BATCH_SIZE = 3;
    const mealImages = [];
    const mealPlanWithImages = await Promise.all(
      mealPlanStructured.map(async (dayMeals) => {
        const mealsWithImages = [];
        
        // Pre-generate all image prompts for the day
        const imagePrompts = dayMeals.map(meal => ({
          title: meal.title,
          prompt: `A beautiful, appetizing photo of ${meal.title}. Professional food photography style, well-lit, on a clean plate with garnish.`
        }));
        
        // Process meals in batches
        for (let i = 0; i < imagePrompts.length; i += BATCH_SIZE) {
          const batch = imagePrompts.slice(i, i + BATCH_SIZE);
          
          // Generate all images in batch simultaneously
          const batchResults = await Promise.all(
            batch.map(async ({ title, prompt }) => {
              const base64Image = await generateImage(prompt);
              if (!base64Image) return null;

              try {
                const imageUrl = await uploadToR2(base64Image, title);
                if (imageUrl) {
                  mealImages.push({ mealTitle: title, imageUrl });
                }
                return imageUrl;
              } catch (error) {
                console.error("Error uploading to R2:", error);
                return null;
              }
            })
          );

          // Map results back to meals
          const batchMeals = dayMeals.slice(i, i + BATCH_SIZE).map((meal, idx) => ({
            ...meal,
            imageUrl: batchResults[idx] || null,
          }));
          
          mealsWithImages.push(...batchMeals);
          
          if (i + BATCH_SIZE < imagePrompts.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        return mealsWithImages;
      })
    );

    // Update preference with images
    await UserMealPreference.findByIdAndUpdate(
      id,
      {
        $set: {
          mealImages: mealImages,
          dateModified: new Date(),
        },
      },
      { new: true }
    );

    return res.status(200).json({
      mealPlanStructured: mealPlanWithImages
    });

  } catch (error) {
    console.error("Error generating meal images:", error);
    return res.status(500).json({ 
      message: "Error generating meal images", 
      error: error.message 
    });
  }
} 