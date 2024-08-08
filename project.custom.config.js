import themes from "daisyui/src/theming/themes.js";

export const customConfig = {
  colors: {
    theme: "acid",
    main: themes[`[data-theme=acid]`],
  },
  // example as uptimefriend.com without https://
  domainName: "uptimefriend.com",
  mailgun: {
    subdomain: "mg",
    fromNoReply: `UptimeFriend <noreply@mg.uptimefriend.com>`,
    fromAdmin: `UptimeFriend <nurgasab@mg.uptimefriend.com>`,
    supportEmail: "nurgasab@uptimefriend.com",
    forwardRepliesTo: "nurgasab@gmail.com",
  },
  domainWithHttps: "",
  seo: {
    keywords: "",
    description: "",
    themeColor: "",
    applicationName: "",
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
