import Image from "next/image";
import CTAButton from "@/components/CTAButton";

function SampleMeals() {
  return (
    <section className="bg-white py-10 lg:py-24" id="sample">
      <div className="container max-w-7xl mx-auto px-4 sm:px-8">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center mb-10 lg:mb-16 text-primary">
          Sample Meals
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="h-40 sm:h-48 bg-gray-200 relative">
              <Image 
                src="/avocado-breakfast.webp" 
                alt="Breakfast example" 
                fill 
                className="object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Breakfast"
                }}
              />
            </div>
            <div className="p-4 sm:p-6 text-primary-focus">
              <h3 className="font-bold text-lg sm:text-xl mb-2">Breakfast</h3>
              <p className="text-sm sm:text-base">Avocado toast with eggs</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="h-40 sm:h-48 bg-gray-200 relative">
              <Image 
                src="/Caesar-salad.webp" 
                alt="Lunch example" 
                fill 
                className="object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Lunch"
                }}
              />
            </div>
            <div className="p-4 sm:p-6 text-primary-focus">
              <h3 className="font-bold text-lg sm:text-xl mb-2">Lunch</h3>
              <p className="text-sm sm:text-base">
                Caesar salad with grilled chicken and homemade dressing
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-lg sm:col-span-2 md:col-span-1">
            <div className="h-40 sm:h-48 bg-gray-200 relative">
              <Image 
                src="/pasta-Primavera.webp" 
                alt="Dinner example" 
                fill 
                className="object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Dinner"
                }}
              />
            </div>
            <div className="p-4 sm:p-6 text-primary-focus">
              <h3 className="font-bold text-lg sm:text-xl mb-2">Dinner</h3>
              <p className="text-sm sm:text-base">
                Pasta primavera with seasonal vegetables and fresh herbs
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-10 lg:mt-16">
          <CTAButton plausibleNameBeforeLogin="GET_STARTED_MEALS" className="w-full sm:w-auto max-w-xs mx-4 sm:mx-0" />
        </div>
      </div>
    </section>
  );
}

export default SampleMeals; 