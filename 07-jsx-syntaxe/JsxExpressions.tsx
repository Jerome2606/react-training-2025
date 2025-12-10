// JsxExpressions.tsx - Expressions et rendu conditionnel

import { useState } from "react";

// ============================================================
// RENDU CONDITIONNEL
// ============================================================

interface User {
  name: string;
  isAdmin: boolean;
}

// Pattern 1 : Opérateur ternaire (condition ? vrai : faux)
const TernaryExample = ({ user }: { user: User | null }) => {
  return (
    <div>
      {user ? (
        <p>Bienvenue, {user.name}!</p>
      ) : (
        <p>Veuillez vous connecter</p>
      )}
    </div>
  );
};

// Pattern 2 : && (court-circuit) - affiche seulement si vrai
const AndExample = ({ user }: { user: User | null }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Connecté en tant que {user.name}</p>}
      {user?.isAdmin && <button>Admin Panel</button>}
    </div>
  );
};

// ⚠️ Piège avec && et les nombres!
const AndPitfall = ({ count }: { count: number }) => {
  return (
    <div>
      {/* ❌ Si count = 0, affiche "0" au lieu de rien! */}
      {count && <p>{count} messages</p>}

      {/* ✅ Convertir en booléen explicitement */}
      {count > 0 && <p>{count} messages</p>}

      {/* ✅ Ou utiliser Boolean() */}
      {Boolean(count) && <p>{count} messages</p>}
    </div>
  );
};

// Pattern 3 : Variable intermédiaire (pour logique complexe)
const VariableExample = ({ user }: { user: User | null }) => {
  let content;

  if (!user) {
    content = <p>Non connecté</p>;
  } else if (user.isAdmin) {
    content = <p>Bienvenue Admin {user.name}!</p>;
  } else {
    content = <p>Bienvenue {user.name}!</p>;
  }

  return <div>{content}</div>;
};

// Pattern 4 : Early return
const EarlyReturnExample = ({ user }: { user: User | null }) => {
  if (!user) {
    return <p>Veuillez vous connecter</p>;
  }

  // À partir d'ici, user est forcément défini
  return (
    <div>
      <h1>Profil de {user.name}</h1>
      {user.isAdmin && <span>👑 Admin</span>}
    </div>
  );
};

// Pattern 5 : Switch/case avec objet
type Status = "loading" | "error" | "success";

const StatusDisplay = ({ status }: { status: Status }) => {
  const statusContent = {
    loading: <p>⏳ Chargement...</p>,
    error: <p>❌ Erreur!</p>,
    success: <p>✅ Succès!</p>,
  };

  return <div>{statusContent[status]}</div>;
};

// ============================================================
// RENDU DE LISTES
// ============================================================

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Tablet", price: 499 },
];

// ✅ Utiliser map() pour transformer un tableau
const ProductList = () => {
  return (
    <ul>
      {products.map((product) => (
        // ⚠️ La prop "key" est OBLIGATOIRE et doit être unique
        <li key={product.id}>
          {product.name} - {product.price}€
        </li>
      ))}
    </ul>
  );
};

// ❌ Mauvaises pratiques pour les keys
const BadKeys = () => {
  return (
    <ul>
      {products.map((product, index) => (
        // ❌ index comme key = problèmes si la liste change
        <li key={index}>{product.name}</li>
      ))}
    </ul>
  );
};

// ✅ Composant séparé pour chaque item
const ProductItem = ({ product }: { product: Product }) => (
  <li>
    <strong>{product.name}</strong>
    <span> - {product.price}€</span>
  </li>
);

const ProductListWithComponent = () => {
  return (
    <ul>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};

// ============================================================
// COMBINAISON : Liste avec conditions
// ============================================================

const FilteredList = () => {
  const [showExpensive, setShowExpensive] = useState(false);

  const filteredProducts = showExpensive
    ? products.filter((p) => p.price > 500)
    : products;

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showExpensive}
          onChange={(e) => setShowExpensive(e.target.checked)}
        />
        Afficher seulement les produits &gt; 500€
      </label>

      {filteredProducts.length === 0 ? (
        <p>Aucun produit trouvé</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price}€
              {product.price > 800 && <span> 🔥 Premium</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export {
  TernaryExample,
  AndExample,
  AndPitfall,
  VariableExample,
  EarlyReturnExample,
  StatusDisplay,
  ProductList,
  ProductListWithComponent,
  FilteredList,
};
