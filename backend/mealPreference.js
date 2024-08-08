import mongoose from "mongoose";

const UserMealPreferenceSchema = new mongoose.Schema({
  user_email: { type: String, required: true },
  pregnancyStage: {
    type: String,
    enum: [
      "First Trimester",
      "Second Trimester",
      "Third Trimester",
      "Not Pregnant",
    ],
    required: true,
  },
  dietaryRestrictions: String,
  allergies: [String],
  foodAversions: [String],
  mealCountPerDay: {
    type: Number,
    min: 1,
    max: 6,
    default: 3,
  },
  cookingLevel: {
    type: String,
    enum: ["Easy", "Intermediate", "Advanced"],
    default: "Easy",
  },
  cuisineType: {
    type: String,
    default: "European"
  },
});

const UserMealPreference = mongoose.models.UserMealPreference || mongoose.model('UserMealPreference', UserMealPreferenceSchema);

export default UserMealPreference;