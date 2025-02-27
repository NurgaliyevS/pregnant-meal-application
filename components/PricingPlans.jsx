import { FiArrowRight, FiCheck } from "react-icons/fi";
import { buyProduct } from "@/components/buyProduct";

function PricingPlans() {
  return (
    <section
      className="container max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-24"
      id="pricing"
    >
      <h2 className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center mb-10 lg:mb-16 text-primary">
        Choose Your Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg border border-primary border-opacity-20 flex flex-col h-full">
          <div className="text-center mb-4 lg:mb-6">
            <h3 className="font-bold text-xl lg:text-2xl mb-2 text-primary-focus">
              Yummy Starter
            </h3>
            <div className="text-3xl lg:text-4xl font-bold text-primary">
              $4.99
            </div>
            <p className="mt-2 text-sm lg:text-base text-gray-500">
              One-time payment
            </p>
          </div>

          <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8 flex-grow text-sm sm:text-base">
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>20 recipes</span>
            </li>
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>Safe food list</span>
            </li>
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>First trimester focus</span>
            </li>
            <li className="flex items-center opacity-50">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 opacity-0 flex-shrink-0" />
              <span>No email support</span>
            </li>
          </ul>

          <button
            className="btn btn-primary w-full text-sm sm:text-base"
            onClick={(e) => {
              e.preventDefault();
              buyProduct();
            }}
          >
            Make My Meals
            <FiArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg border-2 border-primary relative flex flex-col h-full">
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            POPULAR
          </div>
          <div className="text-center mb-4 lg:mb-6">
            <h3 className="font-bold text-xl lg:text-2xl mb-2 text-primary-focus">
              Super Food Pack
            </h3>
            <div className="text-3xl lg:text-4xl font-bold text-primary">
              $9.99
            </div>
            <p className="mt-2 text-sm lg:text-base text-gray-500">
              One-time payment
            </p>
          </div>

          <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8 flex-grow text-sm sm:text-base">
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>50 recipes</span>
            </li>
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>Safe food list</span>
            </li>
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>Second trimester focus</span>
            </li>
            <li className="flex items-center opacity-50">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 opacity-0 flex-shrink-0" />
              <span>No email support</span>
            </li>
          </ul>

          <button
            className="btn btn-primary w-full text-sm sm:text-base"
            onClick={(e) => {
              e.preventDefault();
              buyProduct("493049");
            }}
          >
            Make My Meals
            <FiArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg border border-primary border-opacity-20 flex flex-col h-full">
          <div className="text-center mb-4 lg:mb-6">
            <h3 className="font-bold text-xl lg:text-2xl mb-2 text-primary-focus">
              Magic Mom Menu
            </h3>
            <div className="text-3xl lg:text-4xl font-bold text-primary">
              $19.99
            </div>
            <p className="mt-2 text-sm lg:text-base text-gray-500">
              One-time payment
            </p>
          </div>

          <ul className="space-y-2 lg:space-y-3 mb-6 lg:mb-8 flex-grow text-sm sm:text-base">
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>150 recipes</span>
            </li>
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>Safe food list</span>
            </li>
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>All trimester focus</span>
            </li>
            <li className="flex items-center">
              <FiCheck className="h-4 w-4 lg:h-5 lg:w-5 text-primary mr-2 flex-shrink-0" />
              <span>24/7 email support</span>
            </li>
          </ul>

          <button
            className="btn btn-primary w-full text-sm sm:text-base"
            onClick={(e) => {
              e.preventDefault();
              buyProduct("493050");
            }}
          >
            Make My Meals
            <FiArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PricingPlans;
