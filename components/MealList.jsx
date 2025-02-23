"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function MealList() {
  const { data: session } = useSession();
  const [mealPlans, setMealPlans] = useState([]);
  const [expandedPlan, setExpandedPlan] = useState(null);

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
          return;
        }
        setMealPlans(response.data);
      } catch (error) {
        console.error("Error fetching meals:", error);
        const timer = setTimeout(() => {
          getAllMeals();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  };

  const parseMealPlan = (mealPlanText) => {
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
            const ingredients =
              parts[2]
                ?.replace(/^Key ingredients:\s*/, "")
                .replace(/\.$/, "") || "";
            return {
              title: parts[0]?.replace(/Meal \d+:\s*/, ""),
              description: parts[1] || "",
              ingredients: ingredients,
              type: parts[0]?.match(/Meal \d+/)?.[0] || "Meal",
            };
          });
      });
    return days;
  };

  const MealCard = ({ meal, image }) => {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="p-4">
          {image && (
            <figure className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
              <img
                src={image}
                alt={meal.title}
                width={400}
                height={300}
                className="object-cover"
              />
            </figure>
          )}
          <h3 className="text-sm font-medium text-blue-600">{meal.type}</h3>
          <h4 className="text-lg font-semibold text-gray-900 mt-2">{meal.title}</h4>
          <p className="text-sm text-gray-600 mt-2">{meal.description}</p>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900 mb-2">Key ingredients:</p>
            <div className="flex flex-wrap gap-2">
              {meal.ingredients.split(/[,\n]/).map((ingredient, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                >
                  {ingredient.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DaySection = ({ dayMeals, dayNumber, mealImages }) => (
    <div className="border border-gray-200 rounded-lg bg-gray-50 mb-4">
      <button className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Day {dayNumber}
          </span>
          <span className="text-gray-600">{dayMeals.length} meals</span>
        </div>
      </button>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dayMeals.map((meal, index) => (
            <MealCard
              key={index}
              meal={meal}
              image={
                mealImages?.find((img) => img.mealTitle === meal.title)
                  ?.imageUrl
              }
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-center text-4xl font-bold text-gray-900 mb-12">
          Your <span className="text-blue-600">Meal</span> Plans
        </h1>
        <div className="space-y-6">
          {mealPlans.map((mealPlan, planIndex) => (
            <div
              key={mealPlan._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setExpandedPlan(expandedPlan === planIndex ? null : planIndex)
                  }
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Meal Plan {planIndex + 1}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Created on:{" "}
                      {new Date(mealPlan.dateModified).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() =>
                      setExpandedPlan(expandedPlan === planIndex ? null : planIndex)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`w-6 h-6 text-gray-500 transition-transform ${
                        expandedPlan === planIndex ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                </div>

                {expandedPlan === planIndex && (
                  <div className="mt-6 space-y-4">
                    {parseMealPlan(mealPlan.generatedMealPlans).map(
                      (dayMeals, dayIndex) => (
                        <DaySection
                          key={`${mealPlan._id}-${dayIndex}`}
                          dayNumber={dayIndex + 1}
                          dayMeals={dayMeals}
                          mealImages={mealPlan.mealImages}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MealList;