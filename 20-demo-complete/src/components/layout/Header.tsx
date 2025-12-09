import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import styles from "./Header.module.css";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const changeLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>🛍️ {t("app.title")}</h1>

        <div className={styles.actions}>
          <button
            onClick={changeLanguage}
            className={styles.iconButton}
            title={t("app.changeLanguage")}
          >
            {i18n.language === "fr" ? "🇫🇷" : "🇬🇧"}
          </button>

          <button
            onClick={toggleTheme}
            className={styles.iconButton}
            title={t("app.toggleTheme")}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user && (
            <>
              <span className={styles.userName}>{t("app.hello", { name: user.name })}</span>
              <Button onClick={logout} variant="outline">
                {t("app.logout")}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
