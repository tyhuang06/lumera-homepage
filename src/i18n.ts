import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEN from "./i18n/en/common.json";
import ringsEN from "./i18n/en/products/rings.json";
import necklacesEN from "./i18n/en/products/necklaces.json";
import earringsEN from "./i18n/en/products/earrings.json";
import braceletsEN from "./i18n/en/products/bracelets.json";
import commonZH from "./i18n/zh-Hant/common.json";
import ringsZH from "./i18n/zh-Hant/products/rings.json";
import necklacesZH from "./i18n/zh-Hant/products/necklaces.json";
import earringsZH from "./i18n/zh-Hant/products/earrings.json";
import braceletsZH from "./i18n/zh-Hant/products/bracelets.json";

// Product translations live in one file per category (mirrors src/data/products/).
// They all share the "products" namespace, so merge them back into a single
// resource per language here.
function mergeProducts(...categories: Record<string, Record<string, string>>[]) {
  const merged: Record<string, Record<string, string>> = {};
  for (const category of categories) {
    for (const [section, entries] of Object.entries(category)) {
      merged[section] = { ...merged[section], ...entries };
    }
  }
  return merged;
}

const productsEN = mergeProducts(ringsEN, necklacesEN, earringsEN, braceletsEN);
const productsZH = mergeProducts(ringsZH, necklacesZH, earringsZH, braceletsZH);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEN,
        products: productsEN,
      },
      "zh-Hant": {
        common: commonZH,
        products: productsZH,
      }
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",

    // 👇 THIS PART MATTERS
    ns: ["common", "products"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false
    }
  });

// i18next only fires "languageChanged" on a runtime i18n.changeLanguage()
// call — not when `lng` is simply resolved from init options (e.g. restored
// from localStorage). Set it once up front too, or a fresh load in zh-Hant
// never gets <html lang="zh-Hant">, and every `:lang(zh-Hant)` CSS rule
// (the Chinese font override included) silently never matches.
document.documentElement.lang = i18n.language;

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;

