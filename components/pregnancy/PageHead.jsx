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
      <meta name="description" content={pageDescription} />
      <meta
        name="keywords"
        content={`${weekNumber} weeks pregnant in months, ${weekNumber} weeks pregnant, ${months} months pregnant, pregnancy week ${weekNumber}, ${trimester} trimester, pregnancy calculator, pregnancy meal plan week ${weekNumber}`}
      />
      <link
        rel="canonical"
        href={`${customConfig.domainWithHttps}/pregnancy/${weekNumber}-weeks-pregnant-in-months`}
      />

      {/* Open Graph / Social Media Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta
        property="og:url"
        content={`${customConfig.domainWithHttps}/pregnancy/${weekNumber}-weeks-pregnant-in-months`}
      />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={customConfig.seo.og.image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={customConfig.seo.og.twitterSite} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={customConfig.seo.og.twitterImage} />
    </Head>
  );
}
