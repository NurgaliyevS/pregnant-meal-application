function MealCard({ mealNumber, title, description, ingredients, image }) {
  const cleanIngredients = ingredients?.replace("Key ingredients:", "")

  return (
    <div className="h-full flex flex-col border border-base-300 rounded-xl">
      {image && (
        <figure className="rounded-t-xl overflow-hidden">
          <img src={`data:image/png;base64,${image}`} alt={title} className="object-cover w-full aspect-[4/3]" />
        </figure>
      )}
      <div className="p-4 flex flex-col h-full justify-between gap-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3 min-h-12">
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-secondary-content font-medium text-sm">{mealNumber}</span>
            </div>
            <h4 className="font-semibold text-base leading-tight">{title}</h4>
          </div>

          <div className="text-sm">
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

        <div className="text-sm text-base-content/70 border-t border-base-300 pt-4">{description}</div>
      </div>
    </div>
  )
}

export default MealCard