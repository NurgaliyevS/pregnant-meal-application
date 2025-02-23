function MealCard({ mealNumber, title, description, ingredients, imageUrl }) {
  const cleanIngredients = ingredients?.replace("Key ingredients:", "")

  return (
    <div className="h-full flex flex-col border border-base-300 rounded-xl">
      {imageUrl ? (
        <figure className="rounded-t-xl overflow-hidden">
          <img 
            src={imageUrl}
            alt={title} 
            className="object-cover w-full aspect-[4/3]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        </figure>
      ) : (
        <div className="rounded-t-xl bg-base-200 aspect-[4/3] flex items-center justify-center">
          <span className="text-base-content/50">Image loading...</span>
        </div>
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