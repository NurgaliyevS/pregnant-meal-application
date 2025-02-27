import CTAButton from "@/components/CTAButton";

export default function HeroSection({ weekNumber, months, trimester, fruitSize }) {
  return (
    <section className="bg-gradient-to-b from-primary/10 to-base-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {weekNumber} Weeks Pregnant
            </h1>
            <div className="stats shadow mb-6">
              <div className="stat">
                <div className="stat-title">Months</div>
                <div className="stat-value text-primary">{months}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Trimester</div>
                <div className="stat-value text-secondary capitalize">{trimester}</div>
              </div>
            </div>
            <p className="text-lg mb-6">
              At {weekNumber} weeks pregnant, your baby is about the size of a {fruitSize.name}. 
              You're making great progress in your pregnancy journey!
            </p>
            <div className="flex flex-wrap gap-3">
              <CTAButton 
                plausibleNameBeforeLogin={`GET_MEAL_PLANS_WEEK_${weekNumber}`}
              />
              <a href="#nutrition" className="btn btn-outline">Nutrition Tips</a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 rounded-full bg-base-200 flex items-center justify-center shadow-lg">
              <div className="absolute inset-0 rounded-full border-8 border-primary/20 animate-pulse"></div>
              <div className="w-40 h-40 relative flex flex-col items-center justify-center">
                <div className="mb-4 transform scale-150">
                  {fruitSize.icon}
                </div>
                <span className="text-xl font-semibold text-center">Size: {fruitSize.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 