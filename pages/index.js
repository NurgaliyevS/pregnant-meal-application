import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { customConfig } from "@/project.custom.config";
import { Noto_Sans } from "next/font/google";
import Head from "next/head";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import SampleMeals from "@/components/SampleMeals";
import PricingPlans from "@/components/PricingPlans";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

const lato = Noto_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content={customConfig.seo.description}
        />
        <title>{customConfig.documentTitle}</title>
        <link rel="canonical" href={customConfig.domainWithHttps} />
      </Head>
      <header className={lato.className}>
        <Header />
      </header>
      <main className={`flex flex-col min-h-screen mx-auto ${lato.className}`}>
        <Hero />
        <Benefits />
        <HowItWorks />
        <SampleMeals />
        <PricingPlans />
        <FAQ />
        <FinalCTA />
      </main>
      <footer className={lato.className}>
        <Footer />
      </footer>
    </>
  );
}
