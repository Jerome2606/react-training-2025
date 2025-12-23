// i18n.ts - Configuration complète de react-i18next
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Fichiers de traduction
import fr from "./locales/fr.json";
import en from "./locales/en.json";

// Détection de la langue du navigateur
const getDefaultLanguage = (): string => {
  // 1. Vérifier le localStorage
  const saved = localStorage.getItem("language");
  if (saved && ["fr", "en"].includes(saved)) {
    return saved;
  }

  // 2. Vérifier la langue du navigateur
  const browserLang = navigator.language.split("-")[0];
  if (["fr", "en"].includes(browserLang)) {
    return browserLang;
  }

  // 3. Langue par défaut
  return "fr";
};

i18n
  .use(initReactI18next) // Passer i18n à react-i18next
  .init({
    // Ressources de traduction
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },

    // Langue par défaut
    lng: getDefaultLanguage(),

    // Langue de fallback
    fallbackLng: "fr",

    // Namespaces (pour les gros projets)
    // ns: ['common', 'home', 'products'],
    // defaultNS: 'common',

    interpolation: {
      // React échappe déjà les valeurs XSS
      escapeValue: false,

      // Format des dates et nombres
      format: (value, format, lng) => {
        if (format === "uppercase") return value.toUpperCase();
        if (value instanceof Date) {
          return new Intl.DateTimeFormat(lng).format(value);
        }
        return value;
      },
    },

    // Debug en développement
    // debug: process.env.NODE_ENV === "development",
  });

// Sauvegarder le changement de langue
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  document.documentElement.lang = lng;
});

export default i18n;
