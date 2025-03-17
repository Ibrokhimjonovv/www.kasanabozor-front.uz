import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nResources } from "./types/i18n";

import uzLanguage from "./locales/uz.json";

i18n.use(initReactI18next).init<I18nResources>({
  resources: {
    uz: uzLanguage,
  },

  lng: "uz",
  fallbackLng: "uz",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
