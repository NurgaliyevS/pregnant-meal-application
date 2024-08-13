import UserMealPreference from "@/backend/mealPreference";
import connectMongoDB from "@/backend/mongodb";
import { generateMealPlan } from "@/utils/claudeAI";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectMongoDB();

    const { id } = req.body;

    const userPreference = await UserMealPreference.findOne({ _id: id });

    console.log(userPreference, 'userPreference after find');

    if (!userPreference) {
      return res.status(404).json({ message: 'User preferences not found' });
    }

    const mealPlan = await generateMealPlan(userPreference);
    
    // Update mealGenerationCount
    await UserMealPreference.findOneAndUpdate(
      { id },
      { $inc: { mealGenerationCount: 1 } }
    );

    res.status(200).json({ message: 'Meal plan generated' });
  } catch (error) {
    console.error('Error generating meal plan:', error);
    res.status(500).json({ message: 'Error generating meal plan' });
  }
}