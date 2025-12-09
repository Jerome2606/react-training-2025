# 🎯 Exercice : useState

## Objectif
Créer un composant de **panier d'achat** pour vérifier votre compréhension de useState.

---

## 📝 Instructions

Créez un fichier `ShoppingCart.tsx` qui implémente un panier d'achat avec les fonctionnalités suivantes:

### Fonctionnalités requises

1. **Afficher une liste de produits** (données mockées)
2. **Ajouter des produits au panier**
3. **Modifier la quantité** d'un produit dans le panier
4. **Supprimer un produit** du panier
5. **Calculer le total** automatiquement

---

## 🏗️ Structure de données

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}
```

### Produits mockés

```typescript
const PRODUCTS: Product[] = [
  { id: 1, name: "T-Shirt", price: 19.99 },
  { id: 2, name: "Jeans", price: 49.99 },
  { id: 3, name: "Sneakers", price: 79.99 },
  { id: 4, name: "Hat", price: 14.99 },
];
```

---

## ✅ Checklist des concepts à utiliser

- [ ] `useState` pour gérer le panier (tableau d'objets)
- [ ] Immutabilité : ne jamais modifier directement le state
- [ ] `map()` pour afficher les listes
- [ ] `filter()` pour supprimer un item
- [ ] `map()` pour mettre à jour la quantité
- [ ] Calcul dérivé pour le total (pas dans un state séparé!)
- [ ] Mise à jour fonctionnelle : `setCart(prev => ...)`

---

## 💡 Exemple de rendu attendu

```
Produits disponibles:
[T-Shirt - 19.99€] [Ajouter]
[Jeans - 49.99€] [Ajouter]
[Sneakers - 79.99€] [Ajouter]
[Hat - 14.99€] [Ajouter]

--- Panier ---
T-Shirt x 2 = 39.98€ [-] [+] [Supprimer]
Jeans x 1 = 49.99€ [-] [+] [Supprimer]

Total: 89.97€
```

---

## 🎓 Points clés à respecter

### ❌ ERREUR COMMUNE : Modifier directement le state
```typescript
// ❌ MAUVAIS
const addToCart = (product: Product) => {
  cart.push({ product, quantity: 1 }); // MUTATION!
  // React utilise une comparaison par référence pour savoir si le state a changé. Quand tu mutes directement le tableau, la référence reste la même !
  setCart(cart); // Ne déclenchera pas de re-render
};
```

### ✅ CORRECT : Créer un nouveau tableau
```typescript
// ✅ BON
const addToCart = (product: Product) => {
  setCart(prev => [...prev, { product, quantity: 1 }]);
  // ou
  // setCart(prev => prev.concat({ product, quantity: 1 }));
};
```

**Méthodes qui MUTENT (❌ à éviter)**

- push(), pop()
- shift(), unshift()
- splice()
- sort(), reverse()
- arr[index] = value
- delete arr[index]

**Méthodes IMMUTABLES (✅ à utiliser)**

- concat() - Ajouter
- filter() - Supprimer
- map() - Modifier
- slice() - Copier
- Spread operator [...arr] - Copier
- toSorted(), toReversed() (ES2023+) - Nouvelles versions immutables

**La règle simple** : Si tu veux que React détecte le changement, crée toujours un nouveau tableau/objet ! 🎯

### ❌ ERREUR COMMUNE : Stocker des valeurs dérivées dans le state
```typescript
// ❌ MAUVAIS
const [total, setTotal] = useState(0); // État redondant!
const addToCart = (product: Product) => {
  ...
  // 😱 Tu dois AUSSI mettre à jour total!
  const newTotal = newCart.reduce((sum, item) => 
    sum + item.product.price * item.quantity, 0
  );
  setTotal(newTotal);
};
const removeFromCart = (productId: number) => {
  ...
  // 😱 Encore! Tu dois recalculer total
  const newTotal = newCart.reduce((sum, item) => 
    sum + item.product.price * item.quantity, 0
  );
  setTotal(newTotal);
};
const updateQuantity = (productId: number, quantity: number) => {
  ...
  // 😱 Toujours! Sinon total sera faux
  const newTotal = newCart.reduce((sum, item) => 
    sum + item.product.price * item.quantity, 0
  );
  setTotal(newTotal);
};
```

### ✅ CORRECT : Calculer à la volée
```typescript
// ✅ BON
const total = cart.reduce((sum, item) =>
  sum + item.product.price * item.quantity, 0
);
const addToCart = (product: Product) => {
  ...
  // ✅ Pas besoin de toucher à total! Il se met à jour automatiquement
};
const removeFromCart = (productId: number) => {
  ...
  // ✅ Total recalculé automatiquement au prochain render
};

const updateQuantity = (productId: number, quantity: number) => {
  ...
  // ✅ Total toujours synchronisé!
};
```

**La règle d'or**

**Ne stocke JAMAIS dans le state une valeur que tu peux calculer à partir d'autres states**

**Question légitime** : "Mais recalculer à chaque render, c'est pas lent ?" Réponse : Dans 99% des cas, non. Mais si le calcul est vraiment coûteux, utilise useMemo :

```
const [cart, setCart] = useState<CartItem[]>([]);

// ✅ Recalculé uniquement si cart change
const total = useMemo(() => 
  cart.reduce((sum, item) => 
    sum + item.product.price * item.quantity, 
    0
  ),
  [cart] // Dépendance
);
```

**Règle** : Commence simple (calcul direct), optimise avec useMemo seulement si tu as un problème de performance mesuré.

---

## 🚀 Extensions (Bonus)

Une fois l'exercice de base terminé, ajoutez:

1. **Vidage du panier** : Bouton "Vider le panier"
2. **Limite de quantité** : Maximum 10 par produit
3. **Produit déjà dans le panier** : Incrémenter au lieu d'ajouter
4. **Affichage du nombre d'items** : Badge sur le panier
5. **Sauvegarde localStorage** : Persister le panier (avec useEffect)

---

## 🔍 Auto-évaluation

Vérifiez que vous avez bien compris:

- [ ] Je sais créer un state avec `useState`
- [ ] Je comprends l'immutabilité
- [ ] Je sais mettre à jour un tableau sans le muter
- [ ] Je sais mettre à jour un objet dans un tableau
- [ ] Je sais utiliser la forme fonctionnelle de setState
- [ ] Je sais calculer des valeurs dérivées sans state supplémentaire
- [ ] Je gère correctement les types TypeScript

---

---

---

---

---

## 💭 Solution

<details>
<summary>Cliquez pour voir une solution possible</summary>

```typescript
import { useState } from "react";

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

export const ShoppingCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Ajouter au panier
  const addToCart = (product: Product) => {
    setCart(prev => {
      // Vérifier si déjà dans le panier
      const existingItem = prev.find(item => item.product.id === product.id);

      if (existingItem) {
        // Incrémenter la quantité
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Ajouter nouveau
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Modifier la quantité
  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0) // Supprimer si quantité = 0
    );
  };

  // Supprimer du panier
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Calculer le total (valeur dérivée, pas de state!)
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Produits disponibles</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {PRODUCTS.map(product => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "4px"
            }}
          >
            <div>{product.name}</div>
            <div style={{ fontWeight: "bold" }}>{product.price.toFixed(2)}€</div>
            <button onClick={() => addToCart(product)}>Ajouter</button>
          </div>
        ))}
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h2>Panier ({cart.length} produit{cart.length > 1 ? "s" : ""})</h2>

      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item.product.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                marginBottom: "5px"
              }}
            >
              <span style={{ flex: 1 }}>{item.product.name}</span>
              <button onClick={() => updateQuantity(item.product.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product.id, +1)}>+</button>
              <span style={{ width: "80px", textAlign: "right" }}>
                {(item.product.price * item.quantity).toFixed(2)}€
              </span>
              <button onClick={() => removeFromCart(item.product.id)}>
                Supprimer
              </button>
            </div>
          ))}

          <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold" }}>
            Total: {total.toFixed(2)}€
          </div>
        </>
      )}
    </div>
  );
};
```

</details>

---

## 🎯 Validation par le formateur

Critères d'évaluation:
- [ ] Le code compile sans erreur TypeScript
- [ ] L'immutabilité est respectée partout
- [ ] Pas de mutation directe du state
- [ ] La mise à jour fonctionnelle est utilisée
- [ ] Le total est calculé, pas stocké
- [ ] Le code est lisible et bien structuré
