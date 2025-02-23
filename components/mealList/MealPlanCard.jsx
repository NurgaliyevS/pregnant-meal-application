import { useState } from "react";
import MealPlanHeader from "./MealPlanHeader";
import DaySection from "./DaySection";
import MealPlanActions from "./MealPlanActions";

export default function MealPlanCard({
  mealPlan,
  planIndex,
  isPdfLoading,
  allImagesLoaded,
  loadImagesForPlan,
  parseMealPlan,
  handleCopyToClipboard,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <MealPlanHeader
          planIndex={planIndex}
          dateModified={mealPlan.dateModified}
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />

        {isExpanded && (
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
  );
}
