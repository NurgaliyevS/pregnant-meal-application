export default function ProgressTracker({ weekNumber }) {
  return (
    <section className="py-8 container mx-auto px-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Your Pregnancy Progress</h2>
          <div className="w-full bg-base-200 rounded-full h-4 mb-6">
            <div 
              className="bg-primary h-4 rounded-full" 
              style={{ width: `${(weekNumber / 40) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span>Week 1</span>
            <span>Week 13</span>
            <span>Week 27</span>
            <span>Week 40</span>
          </div>
          <div className="flex justify-between text-xs text-base-content/70 mt-1">
            <span>First Trimester</span>
            <span className="ml-12">Second Trimester</span>
            <span>Third Trimester</span>
          </div>
        </div>
      </div>
    </section>
  );
} 