import CTAButton from "@/components/CTAButton";
import { FiCalendar, FiClipboard, FiShoppingBag } from "react-icons/fi";

function Benefits() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container max-w-7xl mx-auto px-8">
        <h2 className="font-bold text-3xl lg:text-5xl text-center mb-16 text-primary">
          More Benefits for You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-lg shadow-lg text-primary-focus">
            <div className="text-primary mb-4 flex justify-center">
              <FiCalendar className="h-16 w-16" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-center">Personalized Meal Plans</h3>
            <p>Meals designed for your specific trimester and nutritional needs.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg text-primary-focus">
            <div className="text-primary mb-4 flex justify-center">
              <FiClipboard className="h-16 w-16" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-center">Easy Recipes</h3>
            <p>Simple, delicious recipes that are quick to prepare and good for you.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg text-primary-focus">
            <div className="text-primary mb-4 flex justify-center">
              <FiShoppingBag className="h-16 w-16" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-center">Trimester Focus</h3>
            <p>Specialized nutrition guidance for each stage of your pregnancy.</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <CTAButton plausibleNameBeforeLogin="GET_STARTED_FEATURES" />
        </div>
      </div>
    </section>
  );
}

export default Benefits; 