import CTAButton from "@/components/CTAButton";

export default function WeekSidebar({ weekNumber, relatedWeeks, router }) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-4 space-y-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl">Week by Week</h3>
            <p className="mb-4">Explore other weeks of pregnancy:</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {relatedWeeks.map(w => (
                <a key={w} href={`/pregnancy/${w}-weeks-pregnant-in-months`} className="btn btn-sm btn-outline">
                  Week {w}
                </a>
              ))}
            </div>
            
            <div className="divider">OR</div>
            
            <div className="form-control">
              <div className="input-group">
                <select className="select select-bordered w-full" onChange={(e) => {
                  if (e.target.value) {
                    router.push(`/pregnancy/${e.target.value}-weeks-pregnant-in-months`);
                  }
                }}>
                  <option value="">Select a week...</option>
                  {Array.from({length: 42}, (_, i) => i + 1).map(w => (
                    <option key={w} value={w}>Week {w}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-primary text-primary-content shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl">Personalized Meal Plans</h3>
            <p className="mb-4">Get nutrition plans tailored to week {weekNumber} of your pregnancy.</p>
            <CTAButton 
              plausibleNameBeforeLogin={`SIDEBAR_MEAL_PLAN_WEEK_${weekNumber}`}
              className="btn-secondary"
            />
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl">Pregnancy Resources</h3>
            <ul className="menu bg-base-200 rounded-box">
              <li><a href="/blog/first-trimester-pregnancy-meal-planning">First Trimester Meal Planning</a></li>
              <li><a href="/blog/food-aversion-pregnancy">Managing Food Aversions</a></li>
              <li><a href="/blog/7-day-meal-plan-pregnant-women">7-Day Meal Plan</a></li>
              <li><a href="/blog">More Articles</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 