import { customConfig } from "@/project.custom.config";
import Head from "next/head";

export default function PageHead({
  pageTitle,
  pageDescription,
  weekNumber,
  months,
  trimester,
}) {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} key="description" />
      <meta
        name="keywords"
        content={`${weekNumber} weeks pregnant in months, ${weekNumber} weeks pregnant, ${months} months pregnant, pregnancy week ${weekNumber}, ${trimester} trimester, pregnancy calculator, pregnancy meal plan week ${weekNumber}`}
        key="keywords"
      />
      <link
        rel="canonical"
        href={`${customConfig.domainWithHttps}/pregnancy/${weekNumber}-weeks-pregnant-in-months`}
        key="canonical"
      />

      {/* Open Graph / Social Media Meta Tags */}
      <meta property="og:title" content={pageTitle} key="og:title" />
      <meta property="og:description" content={pageDescription} key="og:description" />
      <meta
        property="og:url"
        content={`${customConfig.domainWithHttps}/pregnancy/${weekNumber}-weeks-pregnant-in-months`}
        key="og:url"
      />
      <meta property="og:type" content="article" key="og:type" />
      <meta property="og:image" content={customConfig.seo.og.image} key="og:image" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:site" content={customConfig.seo.og.twitterSite} key="twitter:site" />
      <meta name="twitter:title" content={pageTitle} key="twitter:title" />
      <meta name="twitter:description" content={pageDescription} key="twitter:description" />
      <meta name="twitter:image" content={customConfig.seo.og.twitterImage} key="twitter:image" />
    </Head>
  );
}
