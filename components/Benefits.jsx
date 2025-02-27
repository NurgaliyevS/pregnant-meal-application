import CTAButton from "@/components/CTAButton";
import { FiCalendar, FiClipboard, FiShoppingBag } from "react-icons/fi";

function Benefits() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 lg:py-28">
      <div className="container max-w-7xl mx-auto px-4 sm:px-8">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center mb-12 lg:mb-20 text-primary">
          More Benefits for You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary text-primary-focus flex flex-col items-center">
            <div className="text-primary mb-6 bg-primary/10 p-4 rounded-full">
              <FiCalendar className="h-10 w-10 lg:h-14 lg:w-14" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-center">Personalized Meal Plans</h3>
            <p className="text-center">Meals designed for your specific trimester and nutritional needs.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary text-primary-focus flex flex-col items-center">
            <div className="text-primary mb-6 bg-primary/10 p-4 rounded-full">
              <FiClipboard className="h-10 w-10 lg:h-14 lg:w-14" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-center">Easy Recipes</h3>
            <p className="text-center">Simple, delicious recipes that are quick to prepare and good for you.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary text-primary-focus flex flex-col items-center">
            <div className="text-primary mb-6 bg-primary/10 p-4 rounded-full">
              <FiShoppingBag className="h-10 w-10 lg:h-14 lg:w-14" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-center">Trimester Focus</h3>
            <p className="text-center">Specialized nutrition guidance for each stage of your pregnancy.</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-14 lg:mt-20">
          <CTAButton 
            plausibleNameBeforeLogin="GET_STARTED_FEATURES" 
            className="w-full sm:w-auto max-w-xs mx-4 sm:mx-0 shadow-lg hover:shadow-xl transition-shadow duration-300" 
          />
        </div>
      </div>
    </section>
  );
}

export default Benefits; 