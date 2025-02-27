import React from "react";
import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { FiInfo } from "react-icons/fi";

function Hero() {
  return (
    <section className="container max-w-7xl mx-auto flex flex-col items-center justify-between px-8 py-16 lg:py-24 gap-10">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">
        <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight text-primary">
            Healthy Meals for You and Your Baby
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            Simple meal plans designed for each stage of your pregnancy journey.
          </p>
          <div className="flex gap-4">
            <CTAButton plausibleNameBeforeLogin="GET_STARTED_HERO" />
            <Link href="/demo" className="btn btn-outline btn-primary">
              <FiInfo className="h-5 w-5 mr-2" />
              Demo
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
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
    </section>
  );
}

export default Hero;
