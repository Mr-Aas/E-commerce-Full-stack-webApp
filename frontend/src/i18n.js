import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import desi from "./locales/desi.json";

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      desi: { translation: desi },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safe
    },
  });

export default i18n;