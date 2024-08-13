import UserMealPreference from "@/backend/mealPreference";
import connectMongoDB from "@/backend/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  await connectMongoDB();

  switch (method) {
    case "POST":
      try {
        const preference = new UserMealPreference(req.body);
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
        // get all preferences which exists in the database

        const { user_email, id } = req.query;

        if (id) {
          const preference = await UserMealPreference.findById(id);

          if (!preference) {
            return res
              .status(404)
              .json({ message: "Meal preference not found" });
          }

          return res.status(200).json(preference);
        }

        if (user_email) {
          const preference = await UserMealPreference.findOne({ user_email });

          if (!preference) {
            return res
              .status(404)
              .json({ message: "Meal preference not found" });
          }

          res.status(200).json(preference);
        }

        if (!req.query) {
          const preferences = await UserMealPreference.find();
          res.status(200).json(preferences);
        }

        res.status(400).json({ message: "Invalid query" });
      } catch (error) {
        console.error("Error fetching meal preferences:", error);
        res.status(500).json({ message: "Error fetching meal preferences" });
      }
      break;
    case "PUT":
      try {
        const { id } = req.query;
        const updatedPreference = await UserMealPreference.findByIdAndUpdate(
          { _id: id },
          req.body,
          { new: true }
        );

        if (!updatedPreference) {
          return res.status(404).json({ message: "Meal preference not found" });
        }

        return res.status(200).json(updatedPreference);
      } catch {
        console.error("Error updating meal preference:", error);
        res.status(500).json({ message: "Error updating meal preference" });
      }
      break;
    case "DELETE":
      try {
        const { user_email, id } = req.query;

        if (id) {
          const deletedPreference = await UserMealPreference.findByIdAndDelete(
            id
          );

          if (!deletedPreference) {
            return res
              .status(404)
              .json({ message: "Meal preference not found" });
          }

          return res.status(200).json(deletedPreference);
        }

        // delete all preferences for a user by email
        const deletedPreferences = await UserMealPreference.deleteMany({
          user_email,
        });

        if (!deletedPreferences) {
          return res.status(404).json({ message: "Meal preference not found" });
        }

        return res.status(200).json(deletedPreferences);
      } catch {
        console.error("Error deleting meal preference:", error);
        res.status(500).json({ message: "Error deleting meal preference" });
      }
      break;
  }
}
