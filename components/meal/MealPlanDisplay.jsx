function MealPlanDisplay({ mealPlan }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Your meal plan</h2>
      <pre className="text-left whitespace-pre-wrap mt-5">
        {mealPlan}
      </pre>
    </div>
  );
}

export default MealPlanDisplay; 