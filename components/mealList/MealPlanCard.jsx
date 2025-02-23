import { useState, useCallback, useRef } from "react";
import MealPlanHeader from "./MealPlanHeader";
import DaySection from "./DaySection";
import MealPlanActions from "./MealPlanActions";
import { useMealPlan } from "./MealPlanProvider";

export default function MealPlanCard({
  mealPlan,
  planIndex,
  parseMealPlan,
  handleCopyToClipboard,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { loadImagesForPlan, isPdfLoading, isImagesLoaded, getLoadedImages } = useMealPlan();
  const hasAttemptedLoad = useRef(false);

  const handleExpand = useCallback(() => {
    setIsExpanded(prev => {
      if (!prev && !hasAttemptedLoad.current) {
        hasAttemptedLoad.current = true;
        loadImagesForPlan(mealPlan._id, mealPlan.mealImages);
      }
      return !prev;
    });
  }, [mealPlan._id, mealPlan.mealImages, loadImagesForPlan]);

  const loadedImages = getLoadedImages(mealPlan._id);
  const imagesAreLoaded = isImagesLoaded(mealPlan._id);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <MealPlanHeader
          planIndex={planIndex}
          dateModified={mealPlan.dateModified}
          isExpanded={isExpanded}
          onToggle={handleExpand}
        />

        <div className={`mt-6 space-y-4 ${isExpanded ? '' : 'hidden'}`}>
          {parseMealPlan(
            mealPlan.generatedMealPlans,
            loadedImages || mealPlan.mealImages
          ).map((dayMeals, dayIndex) => (
            <DaySection
              key={`${mealPlan._id}-${dayIndex}`}
              dayNumber={dayIndex + 1}
              dayMeals={dayMeals}
              showPlaceholder={!imagesAreLoaded}
            />
          ))}
        </div>

        <MealPlanActions
          isPdfLoading={isPdfLoading}
          isImagesLoaded={isImagesLoaded}
          planId={mealPlan._id}
          loadImagesForPlan={loadImagesForPlan}
          mealPlan={mealPlan}
          parseMealPlan={parseMealPlan}
          handleCopyToClipboard={handleCopyToClipboard}
          showImages={imagesAreLoaded}
        />
      </div>
    </div>
  );
}
