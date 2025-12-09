import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import styles from "./Home.module.css";

export const Home = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { products, loading, error } = useProducts(
    selectedCategory || undefined
  );
  const { categories } = useCategories();

  // useMemo to prevent recalculating filtered products on every render
  const displayedProducts = useMemo(() => {
    console.log("🔄 useMemo: Recalculating filtered products");
    return products;
  }, [products]);

  if (error) {
    return (
      <div className={styles.error}>
        <p>❌ {t("error.loadProducts")}: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h2>{t("home.welcome")}</h2>
        <p>{t("home.subtitle")}</p>
      </section>

      <section className={styles.filters}>
        <Button
          variant={selectedCategory === "" ? "primary" : "outline"}
          onClick={() => setSelectedCategory("")}
        >
          {t("categories.all")}
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "primary" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {t(`categories.${category}`, category)}
          </Button>
        ))}
      </section>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>{t("loading")}</p>
        </div>
      ) : (
        <section className={styles.products}>
          {displayedProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </section>
      )}

      {!loading && displayedProducts.length === 0 && (
        <div className={styles.empty}>
          <p>{t("empty.products")}</p>
        </div>
      )}
    </div>
  );
};
