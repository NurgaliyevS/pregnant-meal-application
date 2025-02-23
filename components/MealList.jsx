"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EmptyMealPlan from "./mealList/EmptyMealPlan";
import MealPlanActions from "./mealList/MealPlanActions";
import DaySection from "./mealList/DaySection";

function MealList() {
  const { data: session } = useSession();
  const [mealPlans, setMealPlans] = useState([]);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const loadedImagesRef = useRef({});
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [allImagesLoaded, setAllImagesLoaded] = useState({});

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
        const plansWithCachedState = response.data.map((plan, index) => ({
          ...plan,
          imagesLoaded: loadedImagesRef.current[index] || false,
        }));
        setMealPlans(plansWithCachedState);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    }
  };

  const loadImagesForPlan = async (planIndex, e) => {
    // Prevent event propagation
    e?.stopPropagation();

    if (!loadedImagesRef.current[planIndex]) {
      setIsPdfLoading(true);
      setAllImagesLoaded((prev) => ({ ...prev, [planIndex]: false }));

      try {
        const loadedUrls = [];
        const totalImages = mealPlans[planIndex].mealImages.length;
        let loadedCount = 0;

        // Load each image sequentially
        for (const img of mealPlans[planIndex].mealImages) {
          try {
            await new Promise((resolve, reject) => {
              const image = new Image();
              image.onload = () => {
                loadedUrls.push(img.imageUrl);
                loadedCount++;
                resolve();
              };
              image.onerror = reject;
              image.src = img.imageUrl;
            });
          } catch (err) {
            console.warn(`Failed to load image: ${img.imageUrl}`);
          }
        }

        // Only proceed if all images are loaded
        if (loadedCount === totalImages) {
          loadedImagesRef.current[planIndex] = true;
          setAllImagesLoaded((prev) => ({ ...prev, [planIndex]: true }));
        } else {
          toast.error("Some images failed to load. Please try again.");
        }
      } catch (error) {
        console.error("Error loading images:", error);
        toast.error("Failed to load images");
      } finally {
        setIsPdfLoading(false);
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
              <div
                key={mealPlan._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div
                    className="flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-lg transition-colors p-2"
                    onClick={() => {
                      setExpandedPlan(
                        expandedPlan === planIndex ? null : planIndex
                      );
                    }}
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Meal Plan {planIndex + 1}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Created on:{" "}
                        {new Date(mealPlan.dateModified).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </p>
                    </div>
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
                  </div>

                  {expandedPlan === planIndex && (
                    <>
                      <div className="mt-6 space-y-4">
                        {parseMealPlan(
                          mealPlan.generatedMealPlans,
                          mealPlan.mealImages
                        ).map((dayMeals, dayIndex) => (
                          <DaySection
                            key={`${mealPlan._id}-${dayIndex}`}
                            dayNumber={dayIndex + 1}
                            dayMeals={dayMeals}
                          />
                        ))}
                      </div>

                      <MealPlanActions
                        isPdfLoading={isPdfLoading}
                        allImagesLoaded={allImagesLoaded}
                        planIndex={planIndex}
                        loadImagesForPlan={loadImagesForPlan}
                        mealPlan={mealPlan}
                        parseMealPlan={parseMealPlan}
                        handleCopyToClipboard={handleCopyToClipboard}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MealList;
