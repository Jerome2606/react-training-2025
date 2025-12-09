// pages/ProductDetail.tsx - Détail produit avec useParams
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Simulation de données
const getProduct = (id: number): Promise<Product | null> => {
  const products: Record<number, Product> = {
    1: { id: 1, name: "Laptop", description: "Un super laptop", price: 999 },
    2: { id: 2, name: "T-Shirt", description: "T-shirt en coton", price: 29 },
    3: { id: 3, name: "Phone", description: "Smartphone dernier cri", price: 699 },
    4: { id: 4, name: "Jeans", description: "Jeans classique", price: 59 },
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(products[id] || null), 500);
  });
};

export const ProductDetail = () => {
  // useParams récupère les paramètres de l'URL (:productId)
  const { productId } = useParams<{ productId: string }>();

  // useNavigate pour la navigation programmatique
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProduct(Number(productId));
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!product) {
    return (
      <div>
        <h1>Produit non trouvé</h1>
        <Link to="/products">Retour aux produits</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        <strong>Prix:</strong> {product.price}€
      </p>

      <div style={{ marginTop: "20px" }}>
        {/* Navigation programmatique */}
        <button onClick={() => navigate(-1)}>← Retour</button>
        <button onClick={() => navigate("/products")}>Tous les produits</button>
        <button
          onClick={() =>
            navigate("/products", { state: { fromProduct: product.id } })
          }
        >
          Retour avec state
        </button>
      </div>
    </div>
  );
};
