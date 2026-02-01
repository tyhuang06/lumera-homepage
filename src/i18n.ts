import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./i18n/en/common.json";
import zhHant from "./i18n/zh-Hant/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      "zh-Hant": { common: zhHant }
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
