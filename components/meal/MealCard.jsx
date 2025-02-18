function MealCard({ mealNumber, title, description, ingredients, image }) {
  const cleanIngredients = ingredients?.replace("Key ingredients:", "")

  return (
    <div className="h-full flex flex-col">
      {image && (
        <figure className="rounded-xl">
          <img
            src={`data:image/png;base64,${image}`}
            alt={title}
            className="object-cover w-full aspect-[4/3]"
          />
        </figure>
      )}
      <div className="p-6 flex flex-col h-full">
        <div>
          <div className="flex items-start gap-3 h-[4.5rem]">
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-secondary-content font-medium text-sm">{mealNumber}</span>
            </div>
            <h4 className="font-semibold text-base leading-tight">{title}</h4>
          </div>

          <div className="text-sm h-[8rem]">
            <span className="font-medium block mb-2">Ingredients</span>
            <div className="flex flex-wrap gap-2">
              {cleanIngredients?.split(",").map((ingredient, i) => (
                <span key={i} className="badge badge-outline badge-sm text-left h-auto py-1">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-sm text-base-content/70">{description}</div>
      </div>
    </div>
  )
}

export default MealCard

