function MealCard({ mealNumber, title, description, ingredients }) {
  return (
    <div className="card bg-base-200 hover:bg-base-300 transition-colors duration-200">
      <div className="card-body p-4">
        <div className="flex items-start gap-3 mb-2">
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-secondary-content font-medium text-sm">
              {mealNumber}
            </span>
          </div>
          <h4 className="font-semibold text-base leading-tight">
            {title}
          </h4>
        </div>
        
        <p className="text-sm text-base-content/70 mb-3">
          {description}
        </p>
        
        <div className="text-sm">
          <span className="font-medium text-primary">Ingredients: </span>
          {ingredients}
        </div>
      </div>
    </div>
  );
}

export default MealCard; 