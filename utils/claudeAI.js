import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateMealPlan(userPreference) {
  const prompt = `Generate a weekly meal plan for a ${userPreference.pregnancyStage} woman with the following criteria:
  ${userPreference?.dietaryRestrictions ? `Dietary restrictions: ${userPreference.dietaryRestrictions}` : ''}
  ${userPreference?.allergies ? ` Allergies: ${userPreference.allergies.join(', ')}` : ""}
  ${userPreference?.foodAversions ? ` Food aversions: ${userPreference.foodAversions.join(', ')}` : ""}
  Meals per day: ${userPreference.mealCountPerDay}
  Cooking level: ${userPreference.cookingLevel}
  Cuisine type: ${userPreference.cuisineType}

  Provide a meal plan for 7 days, with ${userPreference.mealCountPerDay} meals per day. For each day, list the meals as follows:
  [Day of the week]
  - Meal 1: [Name] - [Brief description] - [Main ingredients]
  - Meal 2: [Name] - [Brief description] - [Main ingredients]
  - Meal 3: [Name] - [Brief description] - [Main ingredients]
  (Adjust the number of meals based on the mealCountPerDay)

  Do not include any introductory text or conclusion. Start directly with the first day of the week.`;

  const stream = await anthropic.completions.create({
    model: 'claude-3-haiku-20240307',
    max_tokens_to_sample: 100,
    temperature: 0.7,
    prompt: prompt,
    stream: true,
  });

  let fullResponse = '';

  for await (const completion of stream) {
    console.log(completion.completion, 'completion');
    fullResponse += completion.completion;
  }

  return fullResponse;
}