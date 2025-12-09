import { useState, useEffect } from "react";
import { fetchProducts, fetchProductsByCategory } from "@/services/api";
import type { Product } from "@/types";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const useProducts = (category?: string): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const loadProducts = async () => {
      try {
        const data = category
          ? await fetchProductsByCategory(category)
          : await fetchProducts();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, [category]);

  return { products, loading, error };
};
