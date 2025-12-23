// 🎯 Version de démonstration du ShoppingCart pour React DevTools
// À utiliser dans 99-Tools/codesandbox pour les démos de debugging

import { useState, memo, useCallback } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "T-Shirt", price: 19.99 },
  { id: 2, name: "Jeans", price: 49.99 },
  { id: 3, name: "Sneakers", price: 79.99 },
  { id: 4, name: "Hat", price: 14.99 },
];

// ===========================
// Version 1 : SANS optimisation (pour démontrer les problèmes)
// ===========================

// ❌ Composant qui re-render inutilement
const CartStats = ({ items }: { items: CartItem[] }) => {
  console.log('🔴 CartStats render - INUTILE si seule la quantity change');
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
      <p>📊 Items in cart: {totalItems}</p>
      <p>💰 Total: {totalPrice.toFixed(2)} €</p>
    </div>
  );
};

// ❌ Composant qui re-render à chaque fois que le parent re-render
const CartItemRow = ({
  item,
  onAdd,
  onRemove,
  onClear
}: {
  item: CartItem;
  onAdd: () => void;
  onRemove: () => void;
  onClear: () => void;
}) => {
  console.log(`🔴 CartItemRow render: ${item.product.name} - TOUS les items re-render!`);

  return (
    <li style={{ marginBottom: '8px', padding: '8px', background: '#fafafa', borderRadius: '4px' }}>
      <strong>{item.product.name}</strong> x {item.quantity}
      <span style={{ marginLeft: '10px' }}>
        {(item.product.price * item.quantity).toFixed(2)} €
      </span>
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <button onClick={onRemove}>-</button>
        <button onClick={onAdd} style={{ marginLeft: '5px' }}>+</button>
        <button onClick={onClear} style={{ marginLeft: '5px' }}>Remove</button>
      </div>
    </li>
  );
};

export const ShoppingCartUnoptimized = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  console.log('🟡 ShoppingCart render - NORMAL car le state change');

  // ❌ Fonctions créées à chaque render (nouvelle référence)
  const addProduct = (product: Product) => () => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeProduct = (itemToRemove: CartItem) => () => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === itemToRemove.product.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.product.id === itemToRemove.product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.product.id !== itemToRemove.product.id);
      }
    });
  };

  const clearProduct = (itemToClear: CartItem) => () => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== itemToClear.product.id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>🛒 Shopping Cart (Non Optimisé)</h1>
      <p style={{ color: '#666', fontSize: '14px' }}>
        ⚠️ Ouvrir la console et React DevTools pour observer les re-renders inutiles
      </p>

      <CartStats items={cart} />

      <h2>Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {PRODUCTS.map(product => (
          <li key={product.id} style={{ marginBottom: '8px' }}>
            {product.name} - {product.price.toFixed(2)} €
            <button onClick={addProduct(product)} style={{ marginLeft: '10px' }}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Cart ({cart.length} products)</h2>
      {cart.length === 0 ? (
        <p style={{ color: '#999' }}>Votre panier est vide</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map(item => (
            <CartItemRow
              key={item.product.id}
              item={item}
              onAdd={addProduct(item.product)}
              onRemove={removeProduct(item)}
              onClear={clearProduct(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

// ===========================
// Version 2 : AVEC optimisation (pour montrer les solutions)
// ===========================

// ✅ Mémorisé : re-render seulement si items change
const CartStatsOptimized = memo(({ items }: { items: CartItem[] }) => {
  console.log('✅ CartStats render - SEULEMENT quand items change');
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div style={{ background: '#e7f5e7', padding: '10px', marginBottom: '10px' }}>
      <p>📊 Items in cart: {totalItems}</p>
      <p>💰 Total: {totalPrice.toFixed(2)} €</p>
    </div>
  );
});

CartStatsOptimized.displayName = 'CartStatsOptimized';

// ✅ Mémorisé : re-render seulement si item, onAdd, onRemove ou onClear change
const CartItemRowOptimized = memo(({
  item,
  onAdd,
  onRemove,
  onClear
}: {
  item: CartItem;
  onAdd: () => void;
  onRemove: () => void;
  onClear: () => void;
}) => {
  console.log(`✅ CartItemRow render: ${item.product.name} - SEULEMENT cet item!`);

  return (
    <li style={{ marginBottom: '8px', padding: '8px', background: '#fafafa', borderRadius: '4px' }}>
      <strong>{item.product.name}</strong> x {item.quantity}
      <span style={{ marginLeft: '10px' }}>
        {(item.product.price * item.quantity).toFixed(2)} €
      </span>
      <div style={{ display: 'inline-block', marginLeft: '10px' }}>
        <button onClick={onRemove}>-</button>
        <button onClick={onAdd} style={{ marginLeft: '5px' }}>+</button>
        <button onClick={onClear} style={{ marginLeft: '5px' }}>Remove</button>
      </div>
    </li>
  );
});

CartItemRowOptimized.displayName = 'CartItemRowOptimized';

export const ShoppingCartOptimized = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  console.log('🟢 ShoppingCart render - NORMAL car le state change');

  // ✅ useCallback : fonction stable (même référence entre renders)
  const addProduct = useCallback((product: Product) => () => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  }, []);

  const removeProduct = useCallback((itemToRemove: CartItem) => () => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === itemToRemove.product.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.product.id === itemToRemove.product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.product.id !== itemToRemove.product.id);
      }
    });
  }, []);

  const clearProduct = useCallback((itemToClear: CartItem) => () => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== itemToClear.product.id));
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>🛒 Shopping Cart (Optimisé)</h1>
      <p style={{ color: '#2d7a2d', fontSize: '14px' }}>
        ✅ Ouvrir la console : seuls les composants concernés re-render!
      </p>

      <CartStatsOptimized items={cart} />

      <h2>Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {PRODUCTS.map(product => (
          <li key={product.id} style={{ marginBottom: '8px' }}>
            {product.name} - {product.price.toFixed(2)} €
            <button onClick={addProduct(product)} style={{ marginLeft: '10px' }}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Cart ({cart.length} products)</h2>
      {cart.length === 0 ? (
        <p style={{ color: '#999' }}>Votre panier est vide</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map(item => (
            <CartItemRowOptimized
              key={item.product.id}
              item={item}
              onAdd={addProduct(item.product)}
              onRemove={removeProduct(item)}
              onClear={clearProduct(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

// ===========================
// Comparateur côte à côte
// ===========================

export const ShoppingCartComparison = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
      <div style={{ border: '2px solid #f44336', borderRadius: '8px', padding: '10px' }}>
        <ShoppingCartUnoptimized />
      </div>
      <div style={{ border: '2px solid #4caf50', borderRadius: '8px', padding: '10px' }}>
        <ShoppingCartOptimized />
      </div>
    </div>
  );
};

// TODO: WHY USE MEMO NOT WORKING WHEN I CHANGE ONLY JEANS QUANTITY?
