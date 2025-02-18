import MealCard from "./MealCard"

function DayCard({ dayNumber, meals }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body p-6">
        <div className="flex items-center gap-4 mb-6 border-b border-base-300 pb-4">
          <div className="w-16 h-16 rounded-xl bg-primary flex flex-col items-center justify-center shrink-0">
            <span className="text-primary-content font-bold text-2xl">{dayNumber} day</span>
          </div>
          <div>
            <p className="text-base-content/70 text-sm">{meals.length} meals planned</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {meals.map((meal, index) => (
            <MealCard key={index} mealNumber={index + 1} totalMeals={meals.length} {...meal} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DayCard

