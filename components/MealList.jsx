"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EmptyMealPlan from "./mealList/EmptyMealPlan";
import MealPlanCard from "./mealList/MealPlanCard";
import { MealPlanProvider } from "./mealList/MealPlanProvider";

function MealList() {
  const { data: session } = useSession();
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    getAllMeals();
  }, [session]);

  const getAllMeals = async () => {
    if (session) {
      try {
        const response = await axios.get(
          "/api/core/meal-preferences?user_email=" + session.user.email
        );
        if (response.data.length === 0) {
          console.log("No meal preferences found for user");
          setMealPlans([]);
          return;
        }
        setMealPlans(response.data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }
  };

  const parseMealPlan = (mealPlanText, mealImages) => {
    if (!mealPlanText) return [];

    const days = mealPlanText
      .split(/\[Day \d+\]/)
      .filter((day) => day.trim())
      .map((day) => {
        return day
          .split("\n-")
          .filter((meal) => meal.trim())
          .map((meal) => {
            const parts = meal.split(" - ").map((s) => s.trim());
            const title = parts[0]?.replace(/Meal \d+:\s*/, "");
            const mealImage = mealImages?.find(
              (img) => img.mealTitle === title
            );

            return {
              title,
              description: parts[1] || "",
              ingredients:
                parts[2]
                  ?.replace(/^Key ingredients:\s*/, "")
                  .replace(/\.$/, "") || "",
              type: parts[0]?.match(/Meal \d+/)?.[0] || "Meal",
              imageUrl: mealImage?.imageUrl || null,
            };
          });
      });
    return days;
  };

  const handleCopyToClipboard = (mealPlanText) => {
    navigator.clipboard.writeText(mealPlanText);
    toast.success("Meal plan copied to clipboard!");
  };

  return (
    <MealPlanProvider>
      <section className="min-h-screen bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-center text-4xl font-bold text-gray-900 mb-12">
            Your <span className="text-blue-600">Meal</span> Plans
          </h1>

          {mealPlans.length === 0 ? (
            <EmptyMealPlan />
          ) : (
            <div className="space-y-6">
              {mealPlans.map((mealPlan, planIndex) => (
                <MealPlanCard
                  key={mealPlan._id}
                  mealPlan={mealPlan}
                  planIndex={planIndex}
                  parseMealPlan={parseMealPlan}
                  handleCopyToClipboard={handleCopyToClipboard}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </MealPlanProvider>
  );
}

export default MealList;
