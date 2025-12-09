// Button.tsx - Composant utilisant CSS Modules
import React from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  disabled = false,
  onClick,
}: ButtonProps) => {
  // Combinaison de classes avec CSS Modules
  const classNames = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

// Utilisation avec classnames (npm install classnames)
// import cn from 'classnames';
// className={cn(styles.button, styles[variant], { [styles.disabled]: disabled })}
