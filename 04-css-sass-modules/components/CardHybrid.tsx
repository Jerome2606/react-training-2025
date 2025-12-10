// CardHybrid.tsx - Composant utilisant SASS Module (hybride)
import React from "react";
// Import CSS Module SASS - meilleur des deux mondes!
import styles from "../styles/Card.module.scss";

interface CardHybridProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "dark";
  footer?: React.ReactNode;
}

export const CardHybrid = ({
  title,
  subtitle,
  children,
  variant = "default",
  footer,
}: CardHybridProps) => {
  // Utilisation des classes scopées automatiquement
  const cardClasses = [
    styles.card,
    variant !== "default" && styles[variant]
  ].filter(Boolean).join(" ");

  return (
    <div className={cardClasses}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>

      <div className={styles.body}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

// Exemple d'utilisation
export const CardHybridExample = () => (
  <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
    <CardHybrid title="Card Hybrid Default" subtitle="SASS + CSS Modules">
      <p>
        Cette card utilise les variables SASS globales (couleurs, espacements)
        tout en bénéficiant de l'encapsulation des CSS Modules.
      </p>
    </CardHybrid>

    <CardHybrid title="Card Primary" variant="primary">
      <p>Variante primary avec isolation des styles.</p>
    </CardHybrid>

    <CardHybrid
      title="Card Dark"
      variant="dark"
      footer={
        <>
          <button>Annuler</button>
          <button>Confirmer</button>
        </>
      }
    >
      <p>Variante dark - aucun risque de conflit CSS!</p>
    </CardHybrid>
  </div>
);
