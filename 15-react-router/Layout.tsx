// Layout.tsx - Layout avec navigation
import { Outlet, NavLink, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();

  // NavLink applique automatiquement une classe "active"
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#61dafb" : "#fff",
    textDecoration: "none",
    padding: "8px 16px",
    borderBottom: isActive ? "2px solid #61dafb" : "none",
  });

  return (
    <div>
      {/* Navigation */}
      <nav
        style={{
          background: "#20232a",
          padding: "16px",
          display: "flex",
          gap: "16px",
        }}
      >
        <NavLink to="/" style={navLinkStyle}>
          Accueil
        </NavLink>
        <NavLink to="/about" style={navLinkStyle}>
          À propos
        </NavLink>
        <NavLink to="/products" style={navLinkStyle}>
          Produits
        </NavLink>
        <NavLink to="/dashboard" style={navLinkStyle}>
          Dashboard
        </NavLink>
      </nav>

      {/* Breadcrumb basé sur l'URL */}
      <div style={{ padding: "8px 16px", background: "#f5f5f5" }}>
        📍 {location.pathname}
      </div>

      {/* Contenu des routes enfants */}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ padding: "20px", background: "#20232a", color: "#fff" }}>
        © 2025 Mon Application
      </footer>
    </div>
  );
};
