import { memo } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = memo(
  ({
    children,
    onClick,
    variant = "primary",
    disabled = false,
    type = "button",
  }: ButtonProps) => {
    return (
      <button
        type={type}
        className={`${styles.button} ${styles[variant]}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
