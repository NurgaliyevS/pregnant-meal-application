import { useState } from "react";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import VideoModal from "@/components/VideoModal";
import { FiInfo, FiPlay } from "react-icons/fi";

function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-10 lg:py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-5xl mb-4 lg:mb-6">
          Nourish Your Baby's Future Today!
        </h2>
        <p className="text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 max-w-2xl mx-auto">
          Join thousands of happy moms who discovered delicious, nutrient-packed meals designed specifically for pregnancy. Your baby will thank you!
        </p>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <CTAButton 
            plausibleNameBeforeLogin="GET_STARTED_FINAL" 
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-gray-700 font-medium text-base border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FiPlay className="mr-2 h-5 w-5 text-gray-600" />
            Demo
          </button>
        </div>
      </div>
      
      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoId="IKjZ3iLOztw" 
      />
    </section>
  );
}

export default FinalCTA; 