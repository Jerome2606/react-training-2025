// ProtectedRoute.tsx - Route protégée par authentification
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

// Simulation d'un hook d'authentification
const useAuth = () => {
  // En production, ceci viendrait d'un AuthContext
  const isAuthenticated = localStorage.getItem("token") !== null;
  return { isAuthenticated };
};

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Rediriger vers login en gardant l'URL d'origine
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Variante avec rôles
interface RoleProtectedRouteProps extends ProtectedRouteProps {
  allowedRoles: string[];
}

export const RoleProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/unauthorized",
}: RoleProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  // const { user } = useAuth(); // En production
  const userRole = "user"; // Simulé

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
