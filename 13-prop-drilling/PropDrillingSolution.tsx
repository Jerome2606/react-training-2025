// PropDrillingSolution.tsx - ✅ Solution avec Context API
import { createContext, useContext, useState, ReactNode } from "react";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

// ============================================================
// ✅ SOLUTION : Utiliser Context pour l'état partagé
// Chaque composant accède directement à ce dont il a besoin
// ============================================================

// 1. CRÉER LES CONTEXTS

// Context pour l'utilisateur
interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

// Context pour le thème
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// Context pour les notifications
interface NotificationContextType {
  count: number;
  addNotification: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

// 2. CRÉER LES HOOKS PERSONNALISÉS

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};

// 3. CRÉER LES PROVIDERS

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Alice Martin",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/150?u=alice",
  });

  const login = (newUser: User) => setUser(newUser);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>({
    mode: "light",
    primaryColor: "#61dafb",
  });

  const toggleTheme = () => {
    setTheme((t) => ({
      ...t,
      mode: t.mode === "light" ? "dark" : "light",
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(3);

  const addNotification = () => setCount((c) => c + 1);
  const clearNotifications = () => setCount(0);

  return (
    <NotificationContext.Provider
      value={{ count, addNotification, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Provider combiné pour simplifier
const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <UserProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </UserProvider>
  </ThemeProvider>
);

// ============================================================
// 4. COMPOSANTS SIMPLIFIÉS - Plus de prop drilling!
// ============================================================

// App - plus besoin de gérer l'état ici
export const App = () => {
  return (
    <AppProviders>
      {/* ✅ Aucune prop à passer! */}
      <Header />
      <Main />
      <Footer />
    </AppProviders>
  );
};

// Header - utilise seulement ce dont il a besoin
const Header = () => {
  const { theme } = useTheme();

  return (
    <header style={{ background: theme.mode === "dark" ? "#20232a" : "#fff" }}>
      {/* ✅ Pas de props! */}
      <Navbar />
    </header>
  );
};

// Navbar - propre et simple
const Navbar = () => {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px" }}>
      <Logo />
      <NavLinks />
      <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
        <NotificationBell />
        <UserMenu />
        <ThemeToggle />
      </div>
    </nav>
  );
};

// UserMenu - accède directement au context
const UserMenu = () => {
  const { user, logout } = useUser();

  if (!user) {
    return <button>Se connecter</button>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img
        src={user.avatar}
        alt={user.name}
        style={{ width: 32, height: 32, borderRadius: "50%" }}
      />
      <span>{user.name}</span>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
};

// NotificationBell - accède directement aux notifications
const NotificationBell = () => {
  const { count, clearNotifications } = useNotifications();

  return (
    <button onClick={clearNotifications} style={{ position: "relative" }}>
      🔔
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            background: "red",
            color: "white",
            borderRadius: "50%",
            width: 18,
            height: 18,
            fontSize: 12,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
};

// Composants utilisant le thème
const Logo = () => {
  const { theme } = useTheme();
  return <div style={{ color: theme.primaryColor, fontWeight: "bold" }}>🚀 MyApp</div>;
};

const NavLinks = () => {
  const { theme } = useTheme();
  return (
    <div style={{ color: theme.mode === "dark" ? "#fff" : "#000", display: "flex", gap: "16px" }}>
      <a href="/">Accueil</a>
      <a href="/about">À propos</a>
    </div>
  );
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {theme.mode === "light" ? "🌙" : "☀️"}
    </button>
  );
};

// Main
const Main = () => {
  const { user } = useUser();
  const { theme } = useTheme();

  return (
    <main
      style={{
        background: theme.mode === "dark" ? "#282c34" : "#f5f5f5",
        padding: "40px",
        minHeight: "300px",
      }}
    >
      <h1 style={{ color: theme.mode === "dark" ? "#fff" : "#000" }}>
        Bienvenue {user?.name || "visiteur"}!
      </h1>
    </main>
  );
};

// Footer
const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      style={{
        background: theme.mode === "dark" ? "#20232a" : "#fff",
        color: theme.mode === "dark" ? "#fff" : "#000",
        padding: "20px",
        textAlign: "center",
      }}
    >
      © 2024 MyApp
    </footer>
  );
};

// ============================================================
// AVANTAGES DE CETTE APPROCHE:
// ============================================================
//
// 1. ✅ PAS DE PROP DRILLING : Chaque composant accède
//    directement à ce dont il a besoin
//
// 2. ✅ COMPOSANTS SIMPLES : Pas de props inutiles
//
// 3. ✅ MAINTENANCE FACILE : Ajouter une donnée = modifier
//    seulement le provider et les composants qui l'utilisent
//
// 4. ✅ REFACTORING AISÉ : Déplacer un composant ne casse rien
//
// 5. ✅ SÉPARATION DES PRÉOCCUPATIONS : Chaque context gère
//    un domaine (user, theme, notifications)
//
// 6. ✅ TYPAGE PROPRE : Un type par context, hooks typés
//
// ============================================================
