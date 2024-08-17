import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <article className="flex flex-col gap-24 md:gap-32 w-full bg-neutral text-gray-300 py-20 lg:py-44">
      <section>
        <div className="flex flex-col justify-between items-center lg:flex-row gap-20 container max-w-4xl mx-auto">
          <Image
            src="/sarah.webp"
            alt="Sarah"
            width={200}
            height={280}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Sarah, Expecting Mom</h1>
            <p className="py-6">I love how easy it is to plan my meals now!</p>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col justify-between items-center lg:flex-row gap-20 container max-w-4xl mx-auto">
          <div>
            <h1 className="text-5xl font-bold">Emma, New Mom</h1>
            <p className="py-6">
              The recipes are so yummy, even my husband loves them!
            </p>
          </div>
          <Image
            src="/emma.webp"
            alt="Emma"
            width={200}
            height={280}
            className="max-w-sm rounded-lg shadow-2xl"
          />
        </div>
      </section>
      <section>
        <div className="flex flex-col justify-between items-center lg:flex-row gap-20 container max-w-4xl mx-auto">
          <Image
            src="/lisa.webp"
            alt="Lisa"
            width={200}
            height={280}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Lisa, Second-time Mom</h1>
            <p className="py-6">This app helped me eat better for my baby.</p>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Hero;
