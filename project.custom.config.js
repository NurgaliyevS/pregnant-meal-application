import themes from "daisyui/src/theming/themes.js";

export const customConfig = {
  colors: {
    theme: "winter",
    main: themes[`[data-theme=winter"]`],
  },
  // example as pregnantmeal.com without https://
  domainName: "pregnantmeal.com",
  mailgun: {
    subdomain: "mg",
    fromNoReply: `PregnantMeal <noreply@mg.pregnantmeal.com>`,
    fromAdmin: `PregnantMeal <admin@mg.pregnantmeal.com>`,
    supportEmail: "support@pregnantmeal.com",
    forwardRepliesTo: "nurgasab@gmail.com",
  },
  documentTitle: "Yummy Meals, Strong Baby - PregnantMeal",
  domainWithHttps: "https://pregnantmeal.com",
  seo: {
    keywords:
      "first trimester recipes, 7 day meal plan for pregnant woman, pregnancy dinner recipes first trimester, dinner ideas for first trimester, meal plans for pregnant moms",
    description:
      "Yummy Meals, Strong Baby! Get personalized daily, weekly, and monthly meal plans for a healthy pregnancy. Eat smart and grow a happy baby with our easy-to-use food guide.",
    themeColor: "#ffffff",
    applicationName: "pregnantmeal",
    og: {
      title: "PregnantMeal - Yummy Meals, Strong Baby!",
      url: "https://pregnantmeal.com",
      image: "https://pregnantmeal.com/company_related/og-image.webp",
      imageAlt:
        "PregnantMeal - Yummy Meals, Strong Baby! Get personalized daily, weekly, and monthly meal plans for a healthy pregnancy. Eat smart and grow a happy baby with our easy-to-use food guide.",
      content: "https://x.com/tech_nurgaliyev",
      twitterSite: "@tech_nurgaliyev",
      twitterImage: "https://pregnantmeal.com/company_related/og-image.webp",
    },
  },
  blog: {
    title: "PregnantMeal Blog",
    description:
      "Foods to avoid during pregnancy, first trimester recipes, 7 day meal plan for pregnant woman, pregnancy food aversions, pregnancy dinner recipes first trimester, dinner ideas for first trimester, meal plans for pregnant moms",
    canonical: "https://pregnantmeal.com/blog",
    author: {
      name: "Sabyr Nurgaliyev",
      description:
        "I am a software engineer and the husband of a pregnant woman. I wanted to create a platform that helps pregnant women because I know how hard it is to find the right information. My wife is pregnant, and I want to make sure she is eating the right food. I am building PregnantMeal to help moms eat healthy and grow a happy baby.",
    },
  },
};
