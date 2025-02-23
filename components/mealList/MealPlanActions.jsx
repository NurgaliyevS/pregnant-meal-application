import { PDFDownloadLink } from "@react-pdf/renderer";
import MealPlanPDF from "../meal/MealPlanPDF";

export default function MealPlanActions({
  isPdfLoading,
  isImagesLoaded,
  planId,
  loadImagesForPlan,
  mealPlan,
  parseMealPlan,
  handleCopyToClipboard,
}) {
  return (
    <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
      {isPdfLoading ? (
        <button className="btn btn-primary btn-sm">Loading Images...</button>
      ) : isImagesLoaded(planId) ? (
        <div onClick={(e) => e.stopPropagation()}>
          <PDFDownloadLink
            document={
              <MealPlanPDF
                mealPlanStructured={parseMealPlan(
                  mealPlan.generatedMealPlans,
                  mealPlan.mealImages
                )}
              />
            }
            fileName={`meal-plan.pdf`}
            className="btn btn-primary btn-sm"
          >
            {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
          </PDFDownloadLink>
        </div>
      ) : (
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => loadImagesForPlan(planId, mealPlan.mealImages)}
        >
          Prepare PDF
        </button>
      )}

      <button
        className="btn btn-secondary btn-sm"
        onClick={(e) => {
          e.stopPropagation();
          handleCopyToClipboard(mealPlan.generatedMealPlans);
        }}
      >
        Copy to Clipboard
      </button>
    </div>
  );
}
