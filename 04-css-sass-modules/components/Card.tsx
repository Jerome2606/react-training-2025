// Card.tsx - Composant utilisant SASS
import React from "react";
import "../styles/Card.scss";

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "dark";
  footer?: React.ReactNode;
}

export const Card = ({
  title,
  subtitle,
  children,
  variant = "default",
  footer,
}: CardProps) => {
  const cardClass =
    variant === "default" ? "card" : `card card--${variant}`;

  return (
    <div className={cardClass}>
      <div className="card__header">
        <div>
          <h2 className="card__title">{title}</h2>
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="card__body">{children}</div>

      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
};

// Exemple d'utilisation
export const CardExample = () => (
  <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
    <Card title="Card Default" subtitle="Sous-titre">
      <p>Contenu de la card avec le style par défaut.</p>
    </Card>

    <Card title="Card Primary" variant="primary">
      <p>Contenu avec variante primary.</p>
    </Card>

    <Card
      title="Card Dark"
      variant="dark"
      footer={
        <>
          <button>Annuler</button>
          <button>Confirmer</button>
        </>
      }
    >
      <p>Contenu avec variante dark et footer.</p>
    </Card>
  </div>
);
