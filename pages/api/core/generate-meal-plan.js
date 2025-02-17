import OpenAI from "openai";

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
      stream: false, // Changed to false since we're not using streaming in Pages Router
    });

    // Return the completed response
    return res.status(200).json({
      mealPlan: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error generating meal plan:", error);
    return res.status(500).json({ message: "Error generating meal plan" });
  }
}
