import UserMealPreference from "@/backend/mealPreference";
import connectMongoDB from "@/backend/mongodb";
import { generateMealPlan } from "@/utils/claudeAI";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectMongoDB();
    const { user_email } = req.body;

    const userPreference = await UserMealPreference.findOne({ user_email });
    if (!userPreference) {
      return res.status(404).json({ message: 'User preferences not found' });
    }

    console.log(userPreference, 'userPreference');
    // const mealPlan = await generateMealPlan(userPreference);
    res.status(200).json({ mealPlan });
  } catch (error) {
    console.error('Error generating meal plan:', error);
    res.status(500).json({ message: 'Error generating meal plan' });
  }
}