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
            const ingredients = parts[2]?.replace(/^Key ingredients:\s*/, "").replace(/\.$/, "") || "";
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

  const MealCard = ({ meal, image }) => (
    <div className="card bg-neutral-200 shadow-lg hover:shadow-xl transition-all">
      <div className="card-body p-4">
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
        <h3 className="card-title text-sm text-primary">{meal.type}</h3>
        <h4 className="font-medium">{meal.title}</h4>
        <p className="text-sm opacity-70">{meal.description}</p>
        <div className="mt-2">
          <p className="text-sm font-medium mb-2">Key ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {meal.ingredients
              .split(/[,\n]/)
              .map((ingredient, i) => (
                <span key={i} className="badge badge-outline badge-sm">
                  {ingredient.trim()}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DaySection = ({ dayMeals, dayNumber, mealImages }) => (
    <div className="collapse collapse-plus bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex items-center gap-4">
        <div className="badge badge-primary badge-lg">Day {dayNumber}</div>
        <span className="text-base-content/70">{dayMeals.length} meals</span>
      </div>
      <div className="collapse-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
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
    <section className="container max-w-7xl mx-auto flex flex-col items-center justify-between px-8 py-8 lg:py-20 gap-10 bg-neutral-400">
      <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 flex justify-center items-center mb-0 lg:mb-7">
        <span className="relative">
          Your <strong className="text-primary">meals</strong>
        </span>
      </h1>
      <div className="w-full">
        {mealPlans.map((mealPlan, planIndex) => (
          <div
            key={mealPlan._id}
            className="card bg-neutral-300 shadow-xl mb-8"
          >
            <div className="card-body p-6">
              <div
                className="flex justify-between items-center mb-6"
                onClick={() =>
                  setExpandedPlan(expandedPlan === planIndex ? null : planIndex)
                }
              >
                <div>
                  <h2 className="card-title">
                    Meal Plan #{mealPlans.length - planIndex}
                  </h2>
                  <p className="text-sm text-base-content/70">
                    Created on:{" "}
                    {new Date(mealPlan.dateModified).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="btn btn-circle btn-ghost"
                  onClick={() =>
                    setExpandedPlan(
                      expandedPlan === planIndex ? null : planIndex
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {expandedPlan === planIndex ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    )}
                  </svg>
                </button>
              </div>

              {expandedPlan === planIndex && (
                <div className="space-y-4">
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
    </section>
  );
}

export default MealList;
