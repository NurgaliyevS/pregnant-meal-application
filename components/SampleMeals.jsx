import Image from "next/image";
import CTAButton from "@/components/CTAButton";

function SampleMeals() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container max-w-7xl mx-auto px-8">
        <h2 className="font-bold text-3xl lg:text-5xl text-center mb-16 text-primary">
          Sample Meals
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-200 relative">
              <Image 
                src="/avocado-breakfast.webp" 
                alt="Breakfast example" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-6 text-primary-focus">
              <h3 className="font-bold text-xl mb-2">Breakfast</h3>
              <p>Greek yogurt with berries and granola</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-200 relative">
              <Image 
                src="/Caesar-salad.webp" 
                alt="Lunch example" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-6 text-primary-focus">
              <h3 className="font-bold text-xl mb-2">Lunch</h3>
              <p>
                Caesar Salad with grilled chicken
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="h-48 bg-gray-200 relative">
              <Image 
                src="/pasta-Primavera.webp" 
                alt="Dinner example" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-6 text-primary-focus">
              <h3 className="font-bold text-xl mb-2">Dinner</h3>
              <p>
                Pasta Primavera with salmon and roasted vegetables
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <CTAButton plausibleNameBeforeLogin="GET_STARTED_MEALS" />
        </div>
      </div>
    </section>
  );
}

export default SampleMeals; 