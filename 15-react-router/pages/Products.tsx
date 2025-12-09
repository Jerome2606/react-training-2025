// pages/Products.tsx - Liste de produits avec navigation
import { Link, useSearchParams } from "react-router-dom";

const products = [
  { id: 1, name: "Laptop", category: "electronics" },
  { id: 2, name: "T-Shirt", category: "clothing" },
  { id: 3, name: "Phone", category: "electronics" },
  { id: 4, name: "Jeans", category: "clothing" },
];

export const Products = () => {
  // Accès aux query params (?category=electronics)
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const filteredProducts = categoryFilter
    ? products.filter((p) => p.category === categoryFilter)
    : products;

  const setCategory = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <h1>Produits</h1>

      {/* Filtres */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setCategory(null)}
          style={{ fontWeight: !categoryFilter ? "bold" : "normal" }}
        >
          Tous
        </button>
        <button
          onClick={() => setCategory("electronics")}
          style={{
            fontWeight: categoryFilter === "electronics" ? "bold" : "normal",
          }}
        >
          Électronique
        </button>
        <button
          onClick={() => setCategory("clothing")}
          style={{
            fontWeight: categoryFilter === "clothing" ? "bold" : "normal",
          }}
        >
          Vêtements
        </button>
      </div>

      {/* Liste des produits */}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {/* Link vers la page de détail avec l'ID */}
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
