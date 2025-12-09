// CompositionSolution.tsx - ✅ Solution alternative avec Composition
import { useState, ReactNode } from "react";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// ============================================================
// ✅ SOLUTION ALTERNATIVE : Pattern de Composition
// Au lieu de passer des données, on passe des composants
// ============================================================

// Le problème avec le prop drilling vient souvent du fait qu'on
// passe des DONNÉES alors qu'on pourrait passer des COMPOSANTS

// ❌ Avant (prop drilling):
// <Layout user={user} theme={theme}>
//   <Header user={user} theme={theme}>
//     <UserMenu user={user} />
//   </Header>
// </Layout>

// ✅ Après (composition):
// <Layout
//   header={<Header userMenu={<UserMenu />} />}
// />

// ============================================================
// COMPOSANTS AVEC SLOTS (composition)
// ============================================================

// Layout avec slots pour header, content, sidebar, footer
interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const Layout = ({ header, sidebar, footer, children }: LayoutProps) => {
  return (
    <div className="layout">
      {header && <header className="layout-header">{header}</header>}
      <div className="layout-body">
        {sidebar && <aside className="layout-sidebar">{sidebar}</aside>}
        <main className="layout-main">{children}</main>
      </div>
      {footer && <footer className="layout-footer">{footer}</footer>}
    </div>
  );
};

// Header avec slots
interface HeaderProps {
  logo?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode; // Pour UserMenu, ThemeToggle, etc.
}

const Header = ({ logo, navigation, actions }: HeaderProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "16px", gap: "16px" }}>
      <div className="header-logo">{logo}</div>
      <nav className="header-nav" style={{ flex: 1 }}>{navigation}</nav>
      <div className="header-actions" style={{ display: "flex", gap: "12px" }}>
        {actions}
      </div>
    </div>
  );
};

// Card avec slots
interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const Card = ({ header, footer, children }: CardProps) => {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
      {header && (
        <div style={{ padding: "16px", borderBottom: "1px solid #ddd", background: "#f9f9f9" }}>
          {header}
        </div>
      )}
      <div style={{ padding: "16px" }}>{children}</div>
      {footer && (
        <div style={{ padding: "16px", borderTop: "1px solid #ddd", background: "#f9f9f9" }}>
          {footer}
        </div>
      )}
    </div>
  );
};

// ============================================================
// UTILISATION - L'état reste au niveau supérieur
// mais on compose les composants au lieu de passer des props
// ============================================================

export const App = () => {
  // L'état est géré ici
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Alice Martin",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/150?u=alice",
  });

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const handleLogout = () => setUser(null);
  const toggleTheme = () => setDarkMode(!darkMode);
  const clearNotifications = () => setNotifications(0);

  // ✅ On COMPOSE les composants avec leurs données
  // Pas besoin de faire passer les props à travers des intermédiaires
  return (
    <Layout
      // Le header reçoit des composants déjà configurés
      header={
        <Header
          logo={<Logo color={darkMode ? "#61dafb" : "#20232a"} />}
          navigation={<NavLinks dark={darkMode} />}
          actions={
            <>
              <NotificationBell
                count={notifications}
                onClear={clearNotifications}
              />
              {user ? (
                <UserMenu user={user} onLogout={handleLogout} />
              ) : (
                <button>Se connecter</button>
              )}
              <ThemeToggle dark={darkMode} onToggle={toggleTheme} />
            </>
          }
        />
      }
      footer={<Footer dark={darkMode} />}
    >
      {/* Contenu principal */}
      <WelcomeSection user={user} dark={darkMode} />
      
      {/* Exemple de Card avec composition */}
      <Card
        header={<h3>Mes informations</h3>}
        footer={<button>Modifier</button>}
      >
        {user ? (
          <div>
            <p>Nom: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Connectez-vous pour voir vos informations</p>
        )}
      </Card>
    </Layout>
  );
};

// ============================================================
// COMPOSANTS SIMPLES - Reçoivent seulement ce dont ils ont besoin
// ============================================================

const Logo = ({ color }: { color: string }) => (
  <div style={{ color, fontWeight: "bold", fontSize: "20px" }}>🚀 MyApp</div>
);

const NavLinks = ({ dark }: { dark: boolean }) => (
  <div style={{ display: "flex", gap: "16px", color: dark ? "#fff" : "#000" }}>
    <a href="/">Accueil</a>
    <a href="/about">À propos</a>
    <a href="/contact">Contact</a>
  </div>
);

const NotificationBell = ({
  count,
  onClear,
}: {
  count: number;
  onClear: () => void;
}) => (
  <button onClick={onClear} style={{ position: "relative" }}>
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

const UserMenu = ({ user, onLogout }: { user: User; onLogout: () => void }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <img
      src={user.avatar}
      alt={user.name}
      style={{ width: 32, height: 32, borderRadius: "50%" }}
    />
    <span>{user.name}</span>
    <button onClick={onLogout}>Déconnexion</button>
  </div>
);

const ThemeToggle = ({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) => <button onClick={onToggle}>{dark ? "☀️" : "🌙"}</button>;

const WelcomeSection = ({
  user,
  dark,
}: {
  user: User | null;
  dark: boolean;
}) => (
  <div style={{ padding: "40px", color: dark ? "#fff" : "#000" }}>
    <h1>Bienvenue {user?.name || "visiteur"}!</h1>
    <p>Découvrez nos services et produits.</p>
  </div>
);

const Footer = ({ dark }: { dark: boolean }) => (
  <div
    style={{
      padding: "20px",
      textAlign: "center",
      background: dark ? "#20232a" : "#f5f5f5",
      color: dark ? "#fff" : "#000",
    }}
  >
    © 2024 MyApp - Tous droits réservés
  </div>
);

// ============================================================
// AVANTAGES DE LA COMPOSITION:
// ============================================================
//
// 1. ✅ FLEXIBILITÉ : On peut facilement changer le contenu
//    de chaque slot sans modifier les composants intermédiaires
//
// 2. ✅ RÉUTILISABILITÉ : Layout, Header, Card peuvent être
//    utilisés avec n'importe quel contenu
//
// 3. ✅ INVERSION DE CONTRÔLE : Le parent décide quoi afficher,
//    les enfants décident comment l'afficher
//
// 4. ✅ PAS BESOIN DE CONTEXT : Pour les cas simples, la
//    composition suffit
//
// ============================================================
// QUAND UTILISER COMPOSITION VS CONTEXT:
// ============================================================
//
// COMPOSITION:
// - UI flexible (layouts, cards, modals)
// - Composants réutilisables
// - Props utilisées une seule fois
//
// CONTEXT:
// - État vraiment global (auth, theme)
// - Données utilisées par BEAUCOUP de composants
// - Données qui changent fréquemment
//
// ============================================================
