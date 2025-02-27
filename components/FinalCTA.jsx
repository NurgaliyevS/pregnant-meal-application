import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { FiInfo } from "react-icons/fi";

function FinalCTA() {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
      <div className="container max-w-7xl mx-auto px-8 text-center">
        <h2 className="font-bold text-3xl lg:text-5xl mb-6">
          Nourish Your Baby's Future Today!
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of happy moms who discovered delicious, nutrient-packed meals designed specifically for pregnancy. Your baby will thank you!
        </p>
        <div className="flex gap-4 justify-center">
          <CTAButton plausibleNameBeforeLogin="GET_STARTED_FINAL" buttonText="Get My Meal Plan Now" />
          <Link href="/demo" className="btn btn-outline bg-white text-purple-600 hover:bg-white hover:text-pink-500 border-0">
            <FiInfo className="h-5 w-5 mr-2" />
            See Sample Meals
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA; 