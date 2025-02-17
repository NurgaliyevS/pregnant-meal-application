import MealCard from './MealCard';

function DayCard({ dayNumber, meals }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-content font-bold text-xl">
              {dayNumber}
            </span>
          </div>
          <h3 className="card-title text-2xl">Day {dayNumber}</h3>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          {meals.map((meal, index) => (
            <MealCard 
              key={index}
              mealNumber={index + 1}
              {...meal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DayCard; 