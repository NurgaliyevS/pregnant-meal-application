import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateMealPlan(userPreference) {
  const systemPrompt = `Generate a weekly meal plan for a ${
    userPreference.pregnancyStage
  } woman with the following criteria:
  ${
    userPreference?.allergiesFoodAversionsDietaryRestrictions
      ? `Allergies, food aversions, and dietary restrictions: ${userPreference.allergiesFoodAversionsDietaryRestrictions}`
      : ""
  }
  Meals per day: ${userPreference.mealCountPerDay}
  Cooking level: ${userPreference.cookingLevel}
  Cuisine type: ${userPreference?.cuisineType || "European"}

  Provide a meal plan for 7 days, with ${
    userPreference.mealCountPerDay
  } meals per day. For each day, list the meals as follows:
  [Day of the week]
  - Meal 1: [Name] - [Brief description] - [Main ingredients]
  - Meal 2: [Name] - [Brief description] - [Main ingredients]
  - Meal 3: [Name] - [Brief description] - [Main ingredients]
  (Adjust the number of meals based on the mealCountPerDay)

  Do not include any introductory text or conclusion. Start directly with the first day of the week.`;

  const stream = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1000, // Increased token limit to accommodate a full meal plan
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: "Please provide the meal plan as requested.",
      },
    ],
    stream: false,
  });

  let fullResponse = "";

  for await (const message of stream?.content[0]?.text) {
    fullResponse += message;
  }

  return fullResponse;
}