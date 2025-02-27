import { FiUser, FiInfo, FiCalendar, FiClipboard } from "react-icons/fi";

function HowItWorks() {
  return (
    <section className="container max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-24">
      <h2 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center mb-10 lg:mb-16 text-primary">
        How It Works
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4">
            <FiUser className="h-7 w-7 lg:h-8 lg:w-8" />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2 text-primary-focus">Sign Up</h3>
          <p className="text-sm sm:text-base">Create your account in seconds</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4">
            <FiInfo className="h-7 w-7 lg:h-8 lg:w-8" />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2 text-primary-focus">Tell Us About You</h3>
          <p className="text-sm sm:text-base">Share your pregnancy stage and preferences</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4">
            <FiCalendar className="h-7 w-7 lg:h-8 lg:w-8" />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2 text-primary-focus">Get Your Plan</h3>
          <p className="text-sm sm:text-base">Receive your personalized meal plan</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4">
            <FiClipboard className="h-7 w-7 lg:h-8 lg:w-8" />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2 text-primary-focus">Enjoy Your Meals</h3>
          <p className="text-sm sm:text-base">Cook and enjoy nutritious, delicious food</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks; 