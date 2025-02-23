export default function MealCard({ meal, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="p-4">
        {image ? (
          <figure className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
            <img
              src={image}
              alt={meal.title}
              width={400}
              height={300}
              className="object-cover w-full h-full"
            />
          </figure>
        ) : (
          <div className="h-48 w-full rounded-lg bg-gray-100 flex items-center justify-center mb-4">
            <span className="text-gray-400">Click "Load Images" to view</span>
          </div>
        )}
        
        <h3 className="text-sm font-medium text-blue-600">{meal.type}</h3>
        <h4 className="text-lg font-semibold text-gray-900 mt-2">
          {meal.title}
        </h4>
        <p className="text-sm text-gray-600 mt-2">{meal.description}</p>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900 mb-2">
            Key ingredients:
          </p>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.split(/[,\n]/).map((ingredient, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
              >
                {ingredient.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
