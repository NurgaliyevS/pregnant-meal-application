import UserMealPreference from "@/backend/mealPreference";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { prompt: id, formData } = req.body;
    if (!id || !formData) {
      return res.status(400).json({ message: "Missing required data" });
    }

    try {
      const prompt = `Create a personalized pregnant meal plan with the following preferences:
            - Cuisine Type: ${formData.cuisineType}
            - Pregnancy Stage: ${formData.pregnancyStage}
            - Meals per Day: ${formData.mealCountPerDay}
            - Allergies/Restrictions: ${
              formData.allergiesFoodAversionsDietaryRestrictions || "None"
            }
            - Cooking Level: ${formData.cookingLevel}
            
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
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 10000,
        stream: false,
      });

      const mealPlanText = completion.choices[0].message.content;

      // Parse meal plan text into structured format
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

      // Update preference and send response
      await UserMealPreference.findByIdAndUpdate(
        id,
        {
          $set: {
            generatedMealPlans: mealPlanText,
            dateModified: new Date(),
          },
        },
        { new: true }
      );

      return res.status(200).json({
        mealPlan: mealPlanText,
        mealPlanStructured: days,
      });
    } catch (openaiError) {
      console.error("OpenAI generation failed:", openaiError);

      // Find a random meal plan in the database (not the user's own)
      const randomMealPlan = await UserMealPreference.aggregate([
        {
          $match: {
            _id: { $ne: id }, // Exclude the current user's preference
            generatedMealPlans: { $exists: true, $ne: "" },
          },
        },
        { $sample: { size: 1 } }, // Get a random document
      ]);

      if (
        randomMealPlan &&
        randomMealPlan.length > 0 &&
        randomMealPlan[0].generatedMealPlans
      ) {
        const randomMealPlanText = randomMealPlan[0].generatedMealPlans;

        // Parse random meal plan text into structured format
        const randomDays = randomMealPlanText
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

        return res.status(200).json({
          mealPlan: randomMealPlanText,
          mealPlanStructured: randomDays,
        });
      }

      // If no meal plans exist in the database at all
      throw new Error("No meal plans available in the database");
    }
  } catch (error) {
    console.error("Error generating meal plan:", error);
    return res.status(500).json({
      message: "Error generating meal plan",
      error: error.message,
    });
  }
}
