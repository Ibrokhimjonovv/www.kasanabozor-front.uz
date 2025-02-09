import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uzLanguage from "./locales/uz.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: { "Welcome to React": "Welcome to React and react-i18next" },
    },
    uz: uzLanguage,
  },
  lng: "uz",
  fallbackLng: "uz",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
