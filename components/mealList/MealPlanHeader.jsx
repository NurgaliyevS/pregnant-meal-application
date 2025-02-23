export default function MealPlanHeader({ planIndex, dateModified, isExpanded, onToggle }) {
    return (
      <div 
        className="flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-lg transition-colors p-2"
        onClick={onToggle}
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Meal Plan {planIndex + 1}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Created on:{" "}
            {new Date(dateModified).toLocaleDateString(
              undefined,
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-6 h-6 text-gray-500 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    );
  }