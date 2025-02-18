import OpenAI from "openai";
import { generateAsync } from "stability-client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    const days = mealPlanText.split(/\[Day \d+\]/)
      .filter(day => day.trim())
      .map(day => {
        return day.split('\n-')
          .filter(meal => meal.trim())
          .map(meal => {
            const parts = meal.split(' - ').map(s => s.trim());
            return {
              title: parts[0]?.replace(/Meal \d+:\s*/, ''),
              description: parts[1] || '',
              ingredients: parts[2]?.replace(/\.$/, '') || '',
              type: parts[0]?.match(/Meal \d+/)?.[0] || 'Meal'
            };
          });
      });

    // Generate images for each meal
    const mealPlanWithImages = await Promise.all(days.map(async (day) => {
      const mealsWithImages = await Promise.all(day.map(async (meal) => {
        try {
          const prompt = `A beautiful, appetizing photo of ${meal.title}. Food photography style, well-lit, professional presentation`;
          
          const generation = await generateAsync({
            prompt,
            apiKey: process.env.STABILITY_API_KEY,
            height: 256,
            width: 256,
            samples: 1,
            cfgScale: 7,
            engine: "stable-diffusion-v1"
          });

          console.log(generation, 'generation');

          // The response includes a base64 image
          const image = generation.artifacts[0].base64;

          console.log(image, 'image');

          return {
            ...meal,
            image
          };
        } catch (error) {
          console.error(`Error generating image for ${meal.title}:`, error);
          return meal;
        }
      }));
      return mealsWithImages;
    }));

    return res.status(200).json({
      mealPlan: mealPlanText,
      mealPlanStructured: mealPlanWithImages
    });
  } catch (error) {
    console.error("Error generating meal plan:", error);
    return res.status(500).json({ message: "Error generating meal plan" });
  }
}
