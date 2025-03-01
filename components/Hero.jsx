import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import VideoModal from "@/components/VideoModal";
import { FiInfo, FiPlay } from "react-icons/fi";

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="container max-w-7xl mx-auto flex flex-col items-center justify-between px-4 sm:px-8 py-10 lg:py-24 gap-10">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-16">
        <div className="flex flex-col gap-6 lg:gap-8 items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-6xl tracking-tight text-primary">
            Healthy Pregnant Meal Plans for You and Your Baby
          </h1>
          <p className="text-lg sm:text-xl opacity-90 leading-relaxed">
            Simple meal plans designed for each stage of your pregnancy journey.
          </p>
          <div className="flex flex-row gap-4 w-full justify-center lg:justify-start">
            <CTAButton 
              plausibleNameBeforeLogin="GET_STARTED_HERO"
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
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <Image
            src="/main.webp"
            alt="Pregnant meal plan"
            width={600}
            height={600}
            className="w-full rounded-lg shadow-lg"
            priority={true}
          />
        </div>
      </div>
      
      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoId="y4ahy6gupUs" 
      />
    </section>
  );
}

export default Hero;
