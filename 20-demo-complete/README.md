# 🛍️ Démo Complète - Application React

> **Application complète démontrant tous les concepts de la formation React**

Cette application est un exemple de e-commerce qui intègre tous les concepts vus pendant la formation : TypeScript, hooks, Context API, React Router, i18n, CSS Modules, et plus encore.

---

## ✨ Fonctionnalités démontrées

### Core React
- ✅ **TypeScript** - Typage complet de l'application
- ✅ **Composants fonctionnels** - Architecture modulaire
- ✅ **useState** - Gestion d'état local
- ✅ **useEffect** - Effets de bord et cleanup
- ✅ **useMemo** - Optimisation des calculs
- ✅ **memo** - Optimisation des composants

### État Global
- ✅ **useContext** - Gestion d'état global
  - ThemeContext (dark/light mode)
  - AuthContext (authentification)
- ✅ **Custom Hooks** - useProducts, useCategories

### Routing & Navigation
- ✅ **React Router** - Navigation SPA
- ✅ **Routes protégées** - Authentification requise
- ✅ **Navigation conditionnelle** - Redirections

### API & Data
- ✅ **Fetch API** - Appels HTTP
- ✅ **Loading states** - Spinners pendant chargement
- ✅ **Error handling** - Gestion des erreurs
- ✅ **AbortController** - Cleanup des requêtes

### UI & Styling
- ✅ **CSS Modules** - Styles scopés
- ✅ **CSS Variables** - Thèmes dynamiques
- ✅ **Responsive Design** - Mobile-friendly

### Internationalisation
- ✅ **react-i18next** - Support FR/EN
- ✅ **Changement de langue** - À la volée

### Formulaires
- ✅ **Controlled components** - Formulaire de login
- ✅ **Validation** - Email requis

### Persistence
- ✅ **localStorage** - Sauvegarde thème + auth

---

## 📁 Structure du projet

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # Bouton réutilisable (3 variants)
│   │   ├── Button.module.css
│   │   ├── Card.tsx                # Carte produit (memoized)
│   │   └── Card.module.css
│   └── layout/
│       ├── Header.tsx              # En-tête avec switches
│       └── Header.module.css
├── contexts/
│   ├── AuthContext.tsx             # État d'authentification
│   └── ThemeContext.tsx            # Thème light/dark
├── hooks/
│   ├── useProducts.ts              # Hook pour les produits
│   └── useCategories.ts            # Hook pour les catégories
├── pages/
│   ├── Home.tsx                    # Page principale
│   ├── Home.module.css
│   ├── Login.tsx                   # Page de connexion
│   └── Login.module.css
├── services/
│   └── api.ts                      # Appels API (Fake Store)
├── styles/
│   └── global.css                  # Variables CSS + reset
├── types/
│   ├── index.ts                    # Types TypeScript
│   └── css-modules.d.ts            # Déclarations CSS Modules
├── App.tsx                         # Composant principal
├── i18n.ts                         # Configuration i18next
└── main.tsx                        # Point d'entrée
```

---

## 🚀 Installation et démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

L'application sera accessible sur **http://localhost:5173**

---

## 🎮 Utilisation de l'application

### 1. Page de connexion (`/login`)
- Entrez **n'importe quel email** (ex: `alice@exemple.com`)
- Le nom est extrait de l'email
- Cliquez sur "Se connecter"

### 2. Page d'accueil (`/` - protégée)

#### Actions disponibles:
- **🌙 / ☀️** - Basculer entre mode sombre/clair
- **🇫🇷 / 🇬🇧** - Changer la langue (Français/English)
- **Filtres de catégories** - Filtrer les produits par catégorie
- **Déconnexion** - Se déconnecter et revenir au login

### 3. Fonctionnalités à tester

#### Thème
1. Cliquez sur 🌙 → Tout passe en mode sombre
2. Cliquez sur ☀️ → Retour au mode clair
3. Rechargez la page → Le thème est sauvegardé

#### Langue
1. Cliquez sur 🇫🇷 → Interface en français
2. Cliquez sur 🇬🇧 → Interface en anglais
3. Tous les textes changent instantanément

#### Filtrage
1. Cliquez sur une catégorie → Les produits se filtrent
2. Ouvrez la console → Voyez le `useMemo` recalculer
3. Cliquez sur "Tous les produits" → Tous les produits réapparaissent

---

## 🔍 Concepts clés à observer

### 1. Architecture Context API

```tsx
// Création du Context
const ThemeContext = createContext(null);

// Provider qui wrappe l'app
<ThemeProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
</ThemeProvider>

// Utilisation via custom hook
const { theme, toggleTheme } = useTheme();
```

**Où voir**: `src/contexts/ThemeContext.tsx`, `src/App.tsx`

### 2. Custom Hooks

```tsx
// Hook encapsulant la logique de fetch
const { products, loading, error } = useProducts(category);

// Le hook gère:
// - State (products, loading, error)
// - useEffect pour le fetch
// - Cleanup avec AbortController
```

**Où voir**: `src/hooks/useProducts.ts`, `src/pages/Home.tsx`

### 3. Routes protégées

```tsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};
```

**Où voir**: `src/App.tsx`

### 4. Optimisation avec memo & useMemo

```tsx
// Composant memoized - ne re-render que si props changent
export const Card = memo(({ product }) => { ... });

// Calcul memoized - recalcule seulement si dépendances changent
const filtered = useMemo(() => {
  console.log('🔄 Recalcul');
  return products.filter(...);
}, [products, filter]);
```

**Où voir**: `src/components/ui/Card.tsx`, `src/pages/Home.tsx`

### 5. i18n avec react-i18next

```tsx
// Dans le composant
const { t, i18n } = useTranslation();

// Utilisation
<h1>{t("home.welcome")}</h1>
<button onClick={() => i18n.changeLanguage("en")}>
  English
</button>
```

**Où voir**: `src/i18n.ts`, tous les composants

---

## 🌐 API utilisée

**Fake Store API** - https://fakestoreapi.com

- ✅ **Gratuite** - Pas de clé API nécessaire
- ✅ **Endpoints utilisés**:
  - `GET /products` - Tous les produits
  - `GET /products/categories` - Toutes les catégories
  - `GET /products/category/{category}` - Produits par catégorie

---

## 🎨 Implémentation du thème

Le thème utilise **CSS Variables** qui changent selon l'attribut `data-theme`:

```css
/* Light theme */
:root[data-theme="light"] {
  --bg-color: #f5f5f5;
  --text-color: #1a1a1a;
  --primary-color: #3b82f6;
}

/* Dark theme */
:root[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --primary-color: #60a5fa;
}
```

Le changement de thème met à jour l'attribut:
```tsx
document.documentElement.setAttribute("data-theme", theme);
```

**Où voir**: `src/styles/global.css`, `src/contexts/ThemeContext.tsx`

---

## 📦 Dépendances

### Production
- `react` - Bibliothèque React
- `react-dom` - DOM rendering
- `react-router-dom` - Routing
- `react-i18next` - Internationalisation
- `i18next` - Framework i18n

### Développement
- `typescript` - Typage statique
- `vite` - Build tool
- `@vitejs/plugin-react` - Plugin Vite pour React

---

## 💡 Points d'apprentissage

| Concept | Fichier à consulter |
|---------|---------------------|
| Context Pattern | `src/contexts/ThemeContext.tsx` |
| Custom Hook | `src/hooks/useProducts.ts` |
| Protected Routes | `src/App.tsx` |
| CSS Modules | `src/components/ui/Button.module.css` |
| TypeScript Types | `src/types/index.ts` |
| API Service | `src/services/api.ts` |
| i18n Config | `src/i18n.ts` |
| Controlled Form | `src/pages/Login.tsx` |
| Performance (memo) | `src/components/ui/Card.tsx` |
| Performance (useMemo) | `src/pages/Home.tsx` |

---

## 🚀 Extensions possibles

Cette application peut être étendue avec:

1. **Panier d'achat** - CartContext avec useReducer
2. **Page détail produit** - Route `/products/:id`
3. **Recherche** - Input avec debounce
4. **Favoris** - Sauvegarde dans localStorage
5. **Pagination** - Charger plus de produits
6. **Tests** - React Testing Library + Vitest
7. **Storybook** - Documentation des composants
8. **PWA** - Service worker + manifest

---

## 📝 Qualité du code

- ✅ **100% TypeScript** - Pas de `any`
- ✅ **Cleanup functions** - Pas de memory leaks
- ✅ **Error handling** - Gestion des erreurs API
- ✅ **Loading states** - UX améliorée
- ✅ **Responsive** - Mobile-friendly
- ✅ **Accessible** - Semantic HTML
- ✅ **Persistence** - localStorage pour thème & auth
- ✅ **Performance** - memo + useMemo

---

## 🎓 Utilisation pédagogique

Cette application est **parfaite pour**:

- ✅ Démontrer tous les concepts React en 1 seul projet
- ✅ Montrer l'architecture d'une vraie application
- ✅ Servir de base pour des exercices
- ✅ Illustrer les best practices
- ✅ Code review en formation

**Conseil formateur**: Commencez par faire découvrir l'application, puis plongez dans le code fichier par fichier.

---

**Cette application combine TOUS les concepts de la formation dans un exemple concret et fonctionnel!** 🎉
