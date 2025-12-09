// pages/Home.tsx
export const Home = () => (
  <div>
    <h1>Accueil</h1>
    <p>Bienvenue sur notre application!</p>
  </div>
);

// pages/About.tsx
export const About = () => (
  <div>
    <h1>À propos</h1>
    <p>Une application React avec React Router.</p>
  </div>
);

// pages/NotFound.tsx
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div style={{ textAlign: "center", padding: "40px" }}>
    <h1>404</h1>
    <p>Page non trouvée</p>
    <Link to="/">Retour à l'accueil</Link>
  </div>
);

// pages/Dashboard.tsx
export const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <p>Bienvenue dans votre espace privé!</p>
  </div>
);
