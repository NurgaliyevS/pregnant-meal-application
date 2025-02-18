function MealCard({ mealNumber, title, description, ingredients, image }) {
  const cleanIngredients = ingredients?.replace("Key ingredients:", "").trim();

  return (
    <div className="bg-base-200 hover:bg-base-300 transition-colors duration-200">
      {image && (
        <figure className="px-4 pt-4">
          <img
            src={`data:image/png;base64,${image}`}
            alt={title}
            className="rounded-xl object-cover w-full h-full"
          />
        </figure>
      )}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start gap-3 mb-2">
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-secondary-content font-medium text-sm">
              {mealNumber}
            </span>
          </div>
          <h4 className="font-semibold text-base leading-tight">{title}</h4>
        </div>

        <div className="text-sm flex flex-col gap-2">
          <span className="font-medium">Ingredients</span>
          <div className="flex flex-wrap gap-2">
            {cleanIngredients?.split(",").map((ingredient, i) => (
              <span
                key={i}
                className="badge badge-outline badge-sm text-left h-auto py-1"
              >
                {ingredient.trim()}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-base-content/70 mb-3 mb-0">{description}</p>
      </div>
    </div>
  );
}

export default MealCard;
