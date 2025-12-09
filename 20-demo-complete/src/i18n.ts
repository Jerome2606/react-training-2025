import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      app: {
        title: "Ma Boutique",
        changeLanguage: "Changer la langue",
        toggleTheme: "Changer le thème",
        hello: "Bonjour {{name}}",
        logout: "Déconnexion",
      },
      home: {
        welcome: "Bienvenue dans notre boutique",
        subtitle: "Découvrez nos produits de qualité",
      },
      categories: {
        all: "Tous les produits",
        electronics: "Électronique",
        jewelery: "Bijoux",
        "men's clothing": "Vêtements homme",
        "women's clothing": "Vêtements femme",
      },
      login: {
        title: "Connexion",
        subtitle: "Entrez votre email pour continuer",
        email: "Email",
        emailPlaceholder: "vous@exemple.com",
        submit: "Se connecter",
      },
      loading: "Chargement...",
      error: {
        loadProducts: "Erreur lors du chargement des produits",
      },
      empty: {
        products: "Aucun produit trouvé",
      },
    },
  },
  en: {
    translation: {
      app: {
        title: "My Store",
        changeLanguage: "Change language",
        toggleTheme: "Toggle theme",
        hello: "Hello {{name}}",
        logout: "Logout",
      },
      home: {
        welcome: "Welcome to our store",
        subtitle: "Discover our quality products",
      },
      categories: {
        all: "All products",
        electronics: "Electronics",
        jewelery: "Jewelry",
        "men's clothing": "Men's clothing",
        "women's clothing": "Women's clothing",
      },
      login: {
        title: "Login",
        subtitle: "Enter your email to continue",
        email: "Email",
        emailPlaceholder: "you@example.com",
        submit: "Sign in",
      },
      loading: "Loading...",
      error: {
        loadProducts: "Error loading products",
      },
      empty: {
        products: "No products found",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
