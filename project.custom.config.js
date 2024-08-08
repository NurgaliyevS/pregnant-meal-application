import themes from "daisyui/src/theming/themes.js";

export const customConfig = {
  colors: {
    theme: "acid",
    main: themes[`[data-theme=acid]`],
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
  domainWithHttps: "",
  seo: {
    keywords: "",
    description: "",
    themeColor: "",
    applicationName: "pregnantmeal",
    og: {
      title: "",
      url: "",
      image: "",
      imageAlt: "",
      articleAuthor: "",
      twitterSite: "",
      twitterImage: "",
    },
  },
};
