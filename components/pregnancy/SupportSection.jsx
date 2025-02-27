export default function SupportSection() {
  return (
    <section className="card bg-gradient-to-r from-primary/20 to-secondary/20 shadow-xl mt-8">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Get Support for Your Pregnancy Journey</h2>
        <p className="mb-6">
          Every pregnancy is unique, and proper nutrition is essential for both you and your baby. 
          At PregnantMeal, we offer personalized meal plans designed specifically for each stage of pregnancy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/meal-plans" className="btn btn-primary">Explore Meal Plans</a>
          <a href="/blog" className="btn btn-outline">Read Pregnancy Articles</a>
        </div>
      </div>
    </section>
  );
} 