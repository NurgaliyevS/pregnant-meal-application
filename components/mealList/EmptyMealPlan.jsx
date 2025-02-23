export default function EmptyMealPlan() {
  return (
    <div className="text-center">
      <p className="text-gray-600 mb-6">
        You haven't created any meal plans yet.
      </p>
      <a
        href="/meal/newMeal"
        className="btn btn-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        Create Your First Meal Plan
      </a>
    </div>
  );
} 