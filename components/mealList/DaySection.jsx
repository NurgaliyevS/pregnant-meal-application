import MealCard from "./MealCard";

export default function DaySection({ dayMeals, dayNumber }) {
  return (
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
            <MealCard key={index} meal={meal} image={meal.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}
