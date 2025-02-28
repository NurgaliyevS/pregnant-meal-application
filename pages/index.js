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
        <title>{customConfig.documentTitle}</title>
        <meta
          name="description"
          content={customConfig.seo.description}
          key="description"
        />
        <meta
          name="keywords"
          content={customConfig.seo.keywords}
          key="keywords"
        />
        <link rel="canonical" href={customConfig.domainWithHttps} key="canonical" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={customConfig.seo.og.title} key="og:title" />
        <meta property="og:description" content={customConfig.seo.description} key="og:description" />
        <meta property="og:url" content={customConfig.domainWithHttps} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:site_name" content={customConfig.seo.applicationName} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={customConfig.seo.og.image} key="og:image" />
        <meta property="og:image:alt" content={customConfig.seo.og.imageAlt} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:author" content={customConfig.seo.og.articleAuthor} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content={customConfig.seo.og.twitterSite} key="twitter:site" />
        <meta name="twitter:creator" content="@tech_nurgaliyev" />
        <meta name="twitter:title" content={customConfig.seo.og.title} key="twitter:title" />
        <meta name="twitter:description" content={customConfig.seo.description} key="twitter:description" />
        <meta name="twitter:image" content={customConfig.seo.og.twitterImage} key="twitter:image" />
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
