import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import styles from "./Login.module.css";

export const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login(email);
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{t("login.title")}</h2>
        <p className={styles.subtitle}>{t("login.subtitle")}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">{t("login.email")}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("login.emailPlaceholder")}
              required
              className={styles.input}
            />
          </div>

          <Button type="submit" variant="primary">
            {t("login.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
};
