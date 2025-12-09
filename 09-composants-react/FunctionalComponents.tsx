// FunctionalComponents.tsx - Les différentes formes de composants

// ============================================================
// COMPOSANT SIMPLE (sans props)
// ============================================================

// Fonction classique
function HelloWorld() {
  return <h1>Hello World!</h1>;
}

// Arrow function (plus courant)
const HelloWorldArrow = () => {
  return <h1>Hello World!</h1>;
};

// Arrow function avec retour implicite
const HelloWorldImplicit = () => <h1>Hello World!</h1>;

// ============================================================
// COMPOSANT AVEC PROPS
// ============================================================

// Props inline (pour les cas simples)
const Greeting = ({ name }: { name: string }) => {
  return <h1>Bonjour {name}!</h1>;
};

// Props avec interface (recommandé)
interface WelcomeProps {
  name: string;
  role?: string;
}

const Welcome = ({ name, role = "utilisateur" }: WelcomeProps) => {
  return (
    <div>
      <h1>Bienvenue {name}!</h1>
      <p>Rôle: {role}</p>
    </div>
  );
};

// ============================================================
// COMPOSANT AVEC CHILDREN
// ============================================================

import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
};

// ============================================================
// COMPOSANT AVEC ÉTAT (useState)
// ============================================================

import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Compteur: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

// ============================================================
// COMPOSANT AVEC CALLBACKS
// ============================================================

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};

// ============================================================
// COMPOSANT AVEC LOGIQUE CONDITIONNELLE
// ============================================================

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
  } | null;
}

const UserProfile = ({ user }: UserProfileProps) => {
  // Early return pattern
  if (!user) {
    return <p>Veuillez vous connecter</p>;
  }

  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {user.isAdmin && <span className="badge">Admin</span>}
    </div>
  );
};

// ============================================================
// COMPOSANT AVEC LISTE
// ============================================================

interface TodoListProps {
  items: Array<{
    id: number;
    text: string;
    done: boolean;
  }>;
  onToggle: (id: number) => void;
}

const TodoList = ({ items, onToggle }: TodoListProps) => {
  if (items.length === 0) {
    return <p>Aucune tâche</p>;
  }

  return (
    <ul className="todo-list">
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => onToggle(item.id)}
          style={{ textDecoration: item.done ? "line-through" : "none" }}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
};

// ============================================================
// COMPOSANT "CONTAINER" VS "PRESENTATIONAL"
// ============================================================

// Presentational : ne gère que l'affichage
interface UserCardProps {
  name: string;
  avatar: string;
  bio: string;
}

const UserCard = ({ name, avatar, bio }: UserCardProps) => (
  <div className="user-card">
    <img src={avatar} alt={name} />
    <h3>{name}</h3>
    <p>{bio}</p>
  </div>
);

// Container : gère la logique et les données
const UserCardContainer = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<UserCardProps | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect pour charger les données...

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Utilisateur non trouvé</p>;

  return <UserCard {...user} />;
};

// ============================================================
// EXPORT
// ============================================================

export {
  HelloWorld,
  HelloWorldArrow,
  HelloWorldImplicit,
  Greeting,
  Welcome,
  Card,
  Counter,
  Button,
  UserProfile,
  TodoList,
  UserCard,
  UserCardContainer,
};
