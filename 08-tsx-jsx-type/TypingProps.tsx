// TypingProps.tsx - Typer les props d'un composant

// ============================================================
// MÉTHODE 1 : Interface (recommandée)
// ============================================================

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean; // Optionnel avec ?
  variant?: "primary" | "secondary" | "danger"; // Union type
}

// Typage des props dans les paramètres
const Button = ({ label, onClick, disabled = false, variant = "primary" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};

// ============================================================
// MÉTHODE 2 : Type alias
// ============================================================

type CardProps = {
  title: string;
  description?: string;
  imageUrl?: string;
};

const Card = ({ title, description, imageUrl }: CardProps) => (
  <div className="card">
    {imageUrl && <img src={imageUrl} alt={title} />}
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>
);

// ============================================================
// PROPS COMPLEXES
// ============================================================

// Objets imbriqués
interface User {
  id: string;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
  };
}

interface ProfileCardProps {
  user: User;
  showEmail?: boolean;
  onEdit?: (user: User) => void;
}

const ProfileCard = ({ user, showEmail = false, onEdit }: ProfileCardProps) => (
  <div>
    <h3>{user.name}</h3>
    {showEmail && <p>{user.email}</p>}
    {user.address && (
      <p>
        {user.address.street}, {user.address.city}
      </p>
    )}
    {onEdit && <button onClick={() => onEdit(user)}>Modifier</button>}
  </div>
);

// ============================================================
// TABLEAUX
// ============================================================

interface ListProps {
  items: string[];
  onItemClick?: (item: string, index: number) => void;
}

const List = ({ items, onItemClick }: ListProps) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onItemClick?.(item, index)}>
        {item}
      </li>
    ))}
  </ul>
);

// Tableau d'objets
interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductList = ({ products, onProductSelect }: ProductListProps) => (
  <div>
    {products.map((product) => (
      <div key={product.id} onClick={() => onProductSelect(product)}>
        {product.name} - {product.price}€
      </div>
    ))}
  </div>
);

// ============================================================
// EXTENSION DE PROPS HTML
// ============================================================

// Étendre les props d'un élément HTML natif
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const CustomInput = ({ label, error, ...inputProps }: CustomInputProps) => (
  <div>
    <label>{label}</label>
    <input {...inputProps} />
    {error && <span className="error">{error}</span>}
  </div>
);

// Utilisation : toutes les props de <input> sont disponibles
const Example = () => (
  <CustomInput
    label="Email"
    type="email"
    placeholder="votre@email.com"
    required
    maxLength={100}
    error="Email invalide"
  />
);

// ============================================================
// PROPS PAR DÉFAUT
// ============================================================

interface AlertProps {
  message: string;
  type?: "info" | "warning" | "error";
  dismissible?: boolean;
}

// Valeurs par défaut dans la déstructuration
const Alert = ({
  message,
  type = "info",
  dismissible = true,
}: AlertProps) => (
  <div className={`alert alert-${type}`}>
    {message}
    {dismissible && <button>×</button>}
  </div>
);

// ============================================================
// UTILISATION DES COMPOSANTS
// ============================================================

const App = () => {
  const user: User = {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
  };

  return (
    <div>
      {/* ✅ TypeScript vérifie les props */}
      <Button label="Cliquez" onClick={() => alert("Click!")} />

      {/* ❌ Erreur : label manquant */}
       {/* <Button onClick={() => {}} />  */}

      {/* ❌ Erreur : type incorrect */}
      {/* <Button label={123} onClick={() => {}} /> */}

      {/* ✅ Props optionnelles */}
      <Card title="Mon titre" />
      <Card title="Avec desc" description="Une description" />

      {/* ✅ Props complexes */}
      <ProfileCard user={user} showEmail onEdit={(u) => console.log(u)} />
    </div>
  );
};

export { Button, Card, ProfileCard, List, ProductList, CustomInput, Alert, App };
