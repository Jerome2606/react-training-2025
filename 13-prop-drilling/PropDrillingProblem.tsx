// PropDrillingProblem.tsx - ❌ Exemple du problème de prop drilling
import { useState } from "react";

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
// ❌ PROBLÈME : Les props traversent de nombreux composants
// qui n'en ont pas besoin, juste pour les transmettre
// ============================================================

// Niveau 1 : App - possède l'état
export const App = () => {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Alice Martin",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/150?u=alice",
  });

  const [theme, setTheme] = useState<Theme>({
    mode: "light",
    primaryColor: "#61dafb",
  });

  const [notifications, setNotifications] = useState(3);

  const handleLogout = () => setUser(null);
  const toggleTheme = () =>
    setTheme((t) => ({ ...t, mode: t.mode === "light" ? "dark" : "light" }));
  const clearNotifications = () => setNotifications(0);

  return (
    <div>
      {/* ❌ On doit passer TOUTES les props à travers chaque niveau */}
      <Header
        user={user}
        theme={theme}
        notifications={notifications}
        onLogout={handleLogout}
        onToggleTheme={toggleTheme}
        onClearNotifications={clearNotifications}
      />
      <Main
        user={user}
        theme={theme}
      />
      <Footer theme={theme} />
    </div>
  );
};

// Niveau 2 : Header - ne fait que transmettre la plupart des props
interface HeaderProps {
  user: User | null;
  theme: Theme;
  notifications: number;
  onLogout: () => void;
  onToggleTheme: () => void;
  onClearNotifications: () => void;
}

const Header = ({
  user,
  theme,
  notifications,
  onLogout,
  onToggleTheme,
  onClearNotifications,
}: HeaderProps) => {
  // ❌ Header utilise seulement theme pour son style
  // mais doit recevoir et transmettre user, notifications, etc.
  
  return (
    <header style={{ background: theme.mode === "dark" ? "#20232a" : "#fff" }}>
      {/* ❌ Encore des props à passer... */}
      <Navbar
        user={user}
        theme={theme}
        notifications={notifications}
        onLogout={onLogout}
        onToggleTheme={onToggleTheme}
        onClearNotifications={onClearNotifications}
      />
    </header>
  );
};

// Niveau 3 : Navbar - transmet encore...
interface NavbarProps {
  user: User | null;
  theme: Theme;
  notifications: number;
  onLogout: () => void;
  onToggleTheme: () => void;
  onClearNotifications: () => void;
}

const Navbar = ({
  user,
  theme,
  notifications,
  onLogout,
  onToggleTheme,
  onClearNotifications,
}: NavbarProps) => {
  return (
    <nav>
      <Logo theme={theme} />
      <NavLinks theme={theme} />
      
      {/* ❌ On continue à passer les props... */}
      <UserSection
        user={user}
        notifications={notifications}
        onLogout={onLogout}
        onClearNotifications={onClearNotifications}
      />
      
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </nav>
  );
};

// Niveau 4 : UserSection - transmet toujours...
interface UserSectionProps {
  user: User | null;
  notifications: number;
  onLogout: () => void;
  onClearNotifications: () => void;
}

const UserSection = ({
  user,
  notifications,
  onLogout,
  onClearNotifications,
}: UserSectionProps) => {
  if (!user) {
    return <button>Se connecter</button>;
  }

  return (
    <div>
      {/* ❌ Encore un niveau... */}
      <NotificationBell
        count={notifications}
        onClear={onClearNotifications}
      />
      <UserMenu user={user} onLogout={onLogout} />
    </div>
  );
};

// Niveau 5 : UserMenu - utilise ENFIN user et onLogout!
interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  // ✅ Finalement, on utilise les props!
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
      <button onClick={onLogout}>Déconnexion</button>
    </div>
  );
};

// Niveau 5 : NotificationBell
interface NotificationBellProps {
  count: number;
  onClear: () => void;
}

const NotificationBell = ({ count, onClear }: NotificationBellProps) => {
  return (
    <button onClick={onClear}>
      🔔 {count > 0 && <span>{count}</span>}
    </button>
  );
};

// Composants qui utilisent theme
const Logo = ({ theme }: { theme: Theme }) => (
  <div style={{ color: theme.primaryColor }}>🚀 MyApp</div>
);

const NavLinks = ({ theme }: { theme: Theme }) => (
  <div style={{ color: theme.mode === "dark" ? "#fff" : "#000" }}>
    <a href="/">Accueil</a>
    <a href="/about">À propos</a>
  </div>
);

const ThemeToggle = ({
  theme,
  onToggle,
}: {
  theme: Theme;
  onToggle: () => void;
}) => (
  <button onClick={onToggle}>
    {theme.mode === "light" ? "🌙" : "☀️"}
  </button>
);

// Main et Footer
const Main = ({ user, theme }: { user: User | null; theme: Theme }) => (
  <main style={{ background: theme.mode === "dark" ? "#282c34" : "#f5f5f5" }}>
    <h1>Bienvenue {user?.name || "visiteur"}!</h1>
  </main>
);

const Footer = ({ theme }: { theme: Theme }) => (
  <footer style={{ background: theme.mode === "dark" ? "#20232a" : "#fff" }}>
    © 2024 MyApp
  </footer>
);

// ============================================================
// PROBLÈMES AVEC CETTE APPROCHE:
// ============================================================
// 
// 1. VERBOSITÉ : Chaque composant intermédiaire doit déclarer
//    des props qu'il n'utilise pas
//
// 2. MAINTENANCE : Ajouter une nouvelle prop = modifier TOUS
//    les composants intermédiaires
//
// 3. LISIBILITÉ : Difficile de voir qui utilise vraiment quoi
//
// 4. TYPAGE : Interfaces dupliquées à chaque niveau
//
// 5. REFACTORING : Déplacer un composant = cauchemar
//
// ============================================================
