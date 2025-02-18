function MealCard({ mealNumber, title, description, ingredients, image }) {
  const cleanIngredients = ingredients?.replace("Key ingredients:", "")

  return (
    <div className="bg-base-200 hover:bg-base-300 transition-colors duration-200 h-full flex flex-col">
      {image && (
        <figure className="px-4 pt-4">
          <img
            src={`data:image/png;base64,${image}`}
            alt={title}
            className="rounded-xl object-cover w-full aspect-[4/3]"
          />
        </figure>
      )}
      <div className="px-6 py-2 flex flex-col flex-1">
        <div className="flex items-start gap-3 min-h-[3rem]">
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-secondary-content font-medium text-sm">{mealNumber}</span>
          </div>
          <h4 className="font-semibold text-base leading-tight">{title}</h4>
        </div>

        <div className="text-sm mt-4 flex-1">
          <span className="font-medium block mb-2">Ingredients</span>
          <div className="flex flex-wrap gap-2">
            {cleanIngredients?.split(",").map((ingredient, i) => (
              <span key={i} className="badge badge-outline badge-sm text-left h-auto py-1">
                {ingredient}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-base-content/70 mt-4 pb-0 mb-0 mb-auto pb-auto">{description}</p>
      </div>
    </div>
  )
}

export default MealCard

