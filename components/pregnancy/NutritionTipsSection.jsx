export default function NutritionTipsSection({ weekNumber }) {
  return (
    <section id="nutrition" className="card bg-base-100 shadow-xl mb-8">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Nutrition Tips for Week {weekNumber}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weekNumber <= 13 && (
            <>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Focus on Folate</h3>
                  <p>Leafy greens, citrus fruits, and legumes are excellent sources of folate, which is crucial for neural tube development.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Combat Nausea</h3>
                  <p>Try eating small, frequent meals throughout the day. Ginger tea and crackers can help manage morning sickness.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Stay Hydrated</h3>
                  <p>Aim for 8-10 glasses of water daily. Herbal teas (approved by your doctor) can be a good alternative.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Iron-Rich Foods</h3>
                  <p>Include lean meats, spinach, and beans in your diet to support increased blood volume and prevent anemia.</p>
                </div>
              </div>
            </>
          )}
          {weekNumber > 13 && weekNumber <= 27 && (
            <>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Calcium Sources</h3>
                  <p>Dairy products, fortified plant milks, and leafy greens provide calcium for your baby's developing bones.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Omega-3 Fatty Acids</h3>
                  <p>Fatty fish (like salmon), walnuts, and flaxseeds support your baby's brain and eye development.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Vitamin D</h3>
                  <p>Get vitamin D from fortified milk, eggs, and safe sun exposure to help with calcium absorption.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Protein Power</h3>
                  <p>Include lean meats, poultry, fish, eggs, dairy, legumes, and nuts to support your baby's growing tissues.</p>
                </div>
              </div>
            </>
          )}
          {weekNumber > 27 && (
            <>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Extra Protein</h3>
                  <p>Increase protein intake to support your baby's final growth spurt with lean meats, eggs, and plant proteins.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Fiber-Rich Foods</h3>
                  <p>Whole grains, fruits, and vegetables can help with digestion and prevent constipation in the third trimester.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Vitamin K</h3>
                  <p>Leafy greens, broccoli, and Brussels sprouts provide vitamin K for healthy blood clotting.</p>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title text-lg">Smaller Meals</h3>
                  <p>As your stomach gets compressed, eat smaller, more frequent meals to prevent heartburn and indigestion.</p>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="mt-6">
          <a href="/meal-plans" className="btn btn-primary btn-block">Get Your Personalized Meal Plan</a>
        </div>
      </div>
    </section>
  );
} 