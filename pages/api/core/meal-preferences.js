import UserMealPreference from "@/backend/mealPreference";
import connectMongoDB from "@/backend/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  await connectMongoDB();

  switch (method) {
    case "POST":
      try {
        const preference = new UserMealPreference({
          ...req.body,
          dateModified: new Date()
        });
        await preference.save();
        res.status(201).json({
          message: "Meal preference created successfully",
          preference,
        });
      } catch (error) {
        console.error("Error creating meal preference:", error);
        res.status(500).json({ message: "Error creating meal preference" });
      }
      break;

    case "GET":
      try {
        const { user_email, id } = req.query;

        if (id) {
          const preference = await UserMealPreference.findById(id);
          if (!preference) {
            return res.status(404).json({ message: "Meal preference not found" });
          }
          return res.status(200).json({
            message: "Meal preference found",
            preference,
          });
        }

        if (user_email) {
          const preferences = await UserMealPreference.find({ user_email }).sort({ dateModified: -1 });
          return res.status(200).json(preferences);
        }

        if (Object.keys(req.query).length === 0) {
          const preferences = await UserMealPreference.find().sort({ dateModified: -1 });
          return res.status(200).json(preferences);
        }

        return res.status(400).json({ message: "Invalid query" });
      } catch (error) {
        console.error("Error fetching meal preferences:", error);
        res.status(500).json({ message: "Error fetching meal preferences" });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const updatedPreference = await UserMealPreference.findByIdAndUpdate(
          id,
          { ...req.body, dateModified: new Date() },
          { new: true }
        );

        if (!updatedPreference) {
          return res.status(404).json({ message: "Meal preference not found" });
        }

        return res.status(200).json(updatedPreference);
      } catch (error) {
        console.error("Error updating meal preference:", error);
        res.status(500).json({ message: "Error updating meal preference" });
      }
      break;

    case "DELETE":
      try {
        const { user_email, id } = req.query;

        if (id) {
          const deletedPreference = await UserMealPreference.findByIdAndDelete(id);
          if (!deletedPreference) {
            return res.status(404).json({ message: "Meal preference not found" });
          }
          return res.status(200).json(deletedPreference);
        }

        if (user_email) {
          const deletedPreferences = await UserMealPreference.deleteMany({ user_email });
          return res.status(200).json(deletedPreferences);
        }

        return res.status(400).json({ message: "Invalid query" });
      } catch (error) {
        console.error("Error deleting meal preference:", error);
        res.status(500).json({ message: "Error deleting meal preference" });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}