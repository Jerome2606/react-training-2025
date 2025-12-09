# 🎯 Demo Complete - Application Guide

## What's Inside

This is a **complete, production-ready example** that demonstrates ALL the concepts covered in the React training:

### ✅ Features Implemented

1. **TypeScript** - Full type safety throughout the app
2. **React Router** - Navigation with protected routes
3. **Context API** - Theme and Authentication contexts
4. **Custom Hooks** - useProducts, useCategories
5. **i18n** - French/English translations with react-i18next
6. **CSS Modules** - Scoped styling with theme support
7. **API Integration** - Fake Store API (no key required)
8. **useState & useEffect** - State management and side effects
9. **useMemo** - Performance optimization
10. **memo** - Component optimization
11. **Controlled Forms** - Login form
12. **Loading & Error States** - Proper UX

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx              # Reusable button with variants
│   │   ├── Button.module.css
│   │   ├── Card.tsx                # Product card (memoized)
│   │   └── Card.module.css
│   └── layout/
│       ├── Header.tsx              # App header with theme/lang switchers
│       └── Header.module.css
├── contexts/
│   ├── AuthContext.tsx             # Authentication state
│   └── ThemeContext.tsx            # Theme (light/dark)
├── hooks/
│   ├── useProducts.ts              # Fetch products with loading/error
│   └── useCategories.ts            # Fetch categories
├── pages/
│   ├── Home.tsx                    # Main product listing
│   ├── Home.module.css
│   ├── Login.tsx                   # Login form
│   └── Login.module.css
├── services/
│   └── api.ts                      # API calls to Fake Store API
├── styles/
│   └── global.css                  # CSS variables & theme
├── types/
│   └── index.ts                    # TypeScript interfaces
├── App.tsx                         # Main app with providers & routes
├── i18n.ts                         # i18next configuration
└── main.tsx                        # Entry point
```

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Use the App

### 1. Login Page
- Enter **any email** (e.g., `alice@example.com`)
- The app extracts the name from the email
- Click "Se connecter" / "Sign in"

### 2. Home Page (Protected)
- **Theme Toggle**: Click 🌙/☀️ to switch dark/light mode
- **Language Toggle**: Click 🇫🇷/🇬🇧 to switch French/English
- **Filter Products**: Click category buttons to filter
- **Logout**: Click "Déconnexion" / "Logout"

### 3. Features to Demonstrate

#### Context Propagation
1. Toggle theme → All components update instantly
2. Change language → All text changes
3. Logout → Redirected to login

#### Performance Optimization
1. Open browser console
2. Click categories → See "useMemo: Recalculating" only when products change
3. Card components only re-render when their product prop changes (memo)

#### Loading States
1. Refresh page → See loading spinner
2. Products load from API
3. Error handling if API fails

## 🔍 Key Concepts Demonstrated

### 1. Context Pattern (ThemeContext.tsx)
```tsx
const ThemeContext = createContext(null);  // 1️⃣ Create
export const ThemeProvider = ({ children }) => { ... };  // 2️⃣ Provider
export const useTheme = () => { ... };  // 3️⃣ Custom Hook
```

### 2. Custom Hook Pattern (useProducts.ts)
```tsx
export const useProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch logic with cleanup
  }, [category]);

  return { products, loading, error };
};
```

### 3. Protected Routes (App.tsx)
```tsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};
```

### 4. Performance with memo & useMemo (Home.tsx)
```tsx
// Component memoization
export const Card = memo(({ product }) => { ... });

// Calculation memoization
const filteredProducts = useMemo(() => {
  return products.filter(...);
}, [products, filter]);
```

### 5. i18n Pattern (Home.tsx)
```tsx
const { t, i18n } = useTranslation();
return <h2>{t("home.welcome")}</h2>;
```

## 🎯 Training Points to Emphasize

| Concept | Where to Show |
|---------|---------------|
| **TypeScript interfaces** | `src/types/index.ts` |
| **Context creation** | `src/contexts/ThemeContext.tsx` |
| **Custom hook** | `src/hooks/useProducts.ts` |
| **useEffect cleanup** | `useProducts.ts` (AbortController) |
| **Controlled forms** | `src/pages/Login.tsx` |
| **CSS Modules** | Any `.module.css` file |
| **CSS Variables** | `src/styles/global.css` |
| **React Router** | `src/App.tsx` |
| **Protected routes** | `ProtectedRoute` component |
| **Composition** | Provider nesting in `App.tsx` |
| **memo optimization** | `src/components/ui/Card.tsx` |
| **useMemo optimization** | `src/pages/Home.tsx` |

## 🔧 API Used

**Fake Store API** - No registration required!

- Base URL: `https://fakestoreapi.com`
- Endpoints:
  - `GET /products` - All products
  - `GET /products/categories` - All categories
  - `GET /products/category/{category}` - Products by category

## 🎨 Theme Implementation

Themes use **CSS Variables** that change based on `data-theme` attribute:

```css
:root[data-theme="light"] {
  --bg-color: #f5f5f5;
  --text-color: #1a1a1a;
  ...
}

:root[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  ...
}
```

Theme toggle updates the attribute:
```tsx
document.documentElement.setAttribute("data-theme", theme);
```

## 📝 Code Quality Features

- ✅ **Type safety** - No `any` types
- ✅ **Error boundaries** - Handled in components
- ✅ **Loading states** - Better UX
- ✅ **Cleanup functions** - No memory leaks
- ✅ **Semantic HTML** - Accessibility ready
- ✅ **Responsive design** - Mobile-friendly
- ✅ **LocalStorage persistence** - Theme & auth state saved

## 🚀 Extensions You Could Add

1. **Shopping Cart** - CartContext with useReducer
2. **Product Details** - Individual product page
3. **Search** - Search input with debounce
4. **Pagination** - Load more products
5. **Favorites** - Save products to localStorage
6. **Tests** - React Testing Library
7. **Storybook** - Component documentation

## 💡 Teaching Tips

1. **Start with structure** - Show the folder organization
2. **Follow data flow** - From API → Hook → Component
3. **Demonstrate context** - Toggle theme to show propagation
4. **Show optimization** - Open console, demonstrate useMemo
5. **Break something** - Remove cleanup, show memory leak
6. **Let students explore** - Change styles, add features

---

**This app is a complete, working example that ties everything together!** 🎉
