import { memo } from "react";
import type { Product } from "@/types";
import styles from "./Card.module.css";

interface CardProps {
  product: Product;
}

export const Card = memo(({ product }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <span className={styles.rating}>
            ⭐ {product.rating.rate} ({product.rating.count})
          </span>
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";
