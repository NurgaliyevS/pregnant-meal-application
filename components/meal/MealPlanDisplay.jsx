import { toast } from 'react-toastify';
import DayCard from './DayCard';

function MealPlanDisplay({ mealPlan, mealPlanStructured }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-3">Your Weekly Meal Plan</h2>
        <p className="text-base-content/70">A personalized 7-day meal plan designed for your needs</p>
      </div>

      <div className="grid gap-10 mb-12">
        {mealPlanStructured.map((meals, index) => (
          <DayCard key={index} dayNumber={index + 1} meals={meals} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 mb-8">
        <button 
          className="btn btn-primary btn-lg"
          onClick={() => {
            const element = document.createElement("a");
            const file = new Blob([mealPlan], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "meal-plan.txt";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            toast.success("Meal plan downloaded!");
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Plan
        </button>
        <button 
          className="btn btn-secondary btn-lg"
          onClick={() => {
            navigator.clipboard.writeText(mealPlan);
            toast.success("Meal plan copied to clipboard!");
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h.75m0-3H12m-.75 3h3.75m-3.75 0V13.5m0 6.75" />
          </svg>
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

export default MealPlanDisplay; 