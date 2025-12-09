// TranslatedComponent.tsx - Exemples d'utilisation de i18n
import { useTranslation, Trans } from "react-i18next";

export const TranslatedComponent = () => {
  const { t, i18n } = useTranslation();

  const user = { name: "Alice" };
  const cartItems = 3;
  const price = 99.99;

  return (
    <div>
      {/* Traduction simple */}
      <h1>{t("home.welcome")}</h1>

      {/* Avec interpolation */}
      <p>{t("auth.welcomeUser", { name: user.name })}</p>

      {/* Avec formatage de nombre */}
      <p>{t("products.price", { price: price.toFixed(2) })}</p>

      {/* Pluralisation automatique */}
      <p>{t("products.items", { count: 0 })}</p>
      <p>{t("products.items", { count: 1 })}</p>
      <p>{t("products.items", { count: cartItems })}</p>

      {/* Clés imbriquées */}
      <nav>
        <a href="/">{t("nav.home")}</a>
        <a href="/about">{t("nav.about")}</a>
        <a href="/products">{t("nav.products")}</a>
      </nav>

      {/* Trans component pour le HTML dans les traductions */}
      <Trans i18nKey="description">
        Visit our <a href="/products">products page</a> for more.
      </Trans>

      {/* Changer de langue */}
      <div style={{ marginTop: "20px" }}>
        <p>Langue actuelle: {i18n.language}</p>
        <button
          onClick={() => i18n.changeLanguage("fr")}
          disabled={i18n.language === "fr"}
        >
          Français
        </button>
        <button
          onClick={() => i18n.changeLanguage("en")}
          disabled={i18n.language === "en"}
        >
          English
        </button>
      </div>
    </div>
  );
};

// Hook personnalisé pour les formats de date localisés
export const useLocalizedDate = () => {
  const { i18n } = useTranslation();

  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(i18n.language, options).format(date);
  };

  const formatRelativeTime = (date: Date) => {
    const rtf = new Intl.RelativeTimeFormat(i18n.language, {
      numeric: "auto",
    });

    const diffInDays = Math.floor(
      (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (Math.abs(diffInDays) < 7) {
      return rtf.format(diffInDays, "day");
    }
    return formatDate(date);
  };

  return { formatDate, formatRelativeTime };
};

// Exemple d'utilisation du hook
export const DateExample = () => {
  const { formatDate, formatRelativeTime } = useLocalizedDate();

  const now = new Date();
  const yesterday = new Date(Date.now() - 86400000);

  return (
    <div>
      <p>Aujourd'hui: {formatDate(now, { dateStyle: "full" })}</p>
      <p>Hier: {formatRelativeTime(yesterday)}</p>
    </div>
  );
};
