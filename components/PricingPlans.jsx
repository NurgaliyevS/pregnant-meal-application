import { FiCheck } from "react-icons/fi";
import { buyProduct } from "@/components/buyProduct";

function PricingPlans() {
  return (
    <section className="container max-w-7xl mx-auto px-8 py-16 lg:py-24" id="pricing">
      <h2 className="font-bold text-3xl lg:text-5xl text-center mb-16 text-primary">
        Choose Your Plan
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-primary border-opacity-20 flex flex-col h-full">
          <div className="text-center mb-6">
            <h3 className="font-bold text-2xl mb-2 text-primary-focus">Yummy Starter</h3>
            <div className="text-4xl font-bold text-primary">$4.99</div>
            <p className="mt-2 text-gray-500">One-time payment</p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              20 recipes
            </li>
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              Safe food list
            </li>
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              First trimester focus
            </li>
            <li className="flex items-center opacity-50">
              <FiCheck className="h-5 w-5 text-primary mr-2 opacity-0" />
              No email support
            </li>
          </ul>
          
          <button 
            className="btn btn-primary w-full"
            onClick={(e) => {
              e.preventDefault();
              buyProduct();
            }}
          >
            Get my meals
          </button>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-primary relative flex flex-col h-full">
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            POPULAR
          </div>
          <div className="text-center mb-6">
            <h3 className="font-bold text-2xl mb-2 text-primary-focus">Super Food Pack</h3>
            <div className="text-4xl font-bold text-primary">$9.99</div>
            <p className="mt-2 text-gray-500">One-time payment</p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              50 recipes
            </li>
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              Safe food list
            </li>
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              Second trimester focus
            </li>
            <li className="flex items-center opacity-50">
              <FiCheck className="h-5 w-5 text-primary mr-2 opacity-0" />
              No email support
            </li>
          </ul>
          
          <button 
            className="btn btn-primary w-full"
            onClick={(e) => {
              e.preventDefault();
              buyProduct("493049");
            }}
          >
            Get my meals
          </button>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg border border-primary border-opacity-20 flex flex-col h-full">
          <div className="text-center mb-6">
            <h3 className="font-bold text-2xl mb-2 text-primary-focus">Magic Mom Menu</h3>
            <div className="text-4xl font-bold text-primary">$19.99</div>
            <p className="mt-2 text-gray-500">One-time payment</p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              150 recipes
            </li>
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              Safe food list
            </li>
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              All trimester focus
            </li>
            <li className="flex items-center">
              <FiCheck className="h-5 w-5 text-primary mr-2" />
              24/7 email support
            </li>
          </ul>
          
          <button 
            className="btn btn-primary w-full"
            onClick={(e) => {
              e.preventDefault();
              buyProduct("493050");
            }}
          >
            Get my meals
          </button>
        </div>
      </div>
    </section>
  );
}

export default PricingPlans; 