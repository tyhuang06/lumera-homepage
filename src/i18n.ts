import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEN from "./i18n/en/common.json";
import productsEN from "./i18n/en/products.json";
import commonZH from "./i18n/zh-Hant/common.json";
import productsZH from "./i18n/zh-Hant/products.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEN,
        products: productsEN
      },
      "zh-Hant": {
        common: commonZH,
        products: productsZH
      }
    },
    lng: localStorage.getItem("lang") || "zh-Hant",
    fallbackLng: "zh-Hant",

    // 👇 THIS PART MATTERS
    ns: ["common", "products"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false
    }
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;

