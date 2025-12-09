// TypingChildren.tsx - Typer children et ReactNode

import { ReactNode, PropsWithChildren } from "react";

// ============================================================
// REACTNODE : Le type le plus flexible pour children
// ============================================================

// ReactNode accepte : string, number, JSX, null, undefined, tableau, Fragment
interface CardProps {
  title: string;
  children: ReactNode;
}

const Card = ({ title, children }: CardProps) => (
  <div className="card">
    <h2>{title}</h2>
    <div className="card-content">{children}</div>
  </div>
);

// Utilisations valides :
const CardExamples = () => (
  <>
    {/* String */}
    <Card title="Simple">Texte simple</Card>

    {/* JSX */}
    <Card title="JSX">
      <p>Un paragraphe</p>
      <button>Un bouton</button>
    </Card>

    {/* Null (ne rend rien) */}
    <Card title="Vide">{null}</Card>

    {/* Nombre */}
    <Card title="Nombre">{42}</Card>

    {/* Fragment */}
    <Card title="Fragment">
      <>
        <span>A</span>
        <span>B</span>
      </>
    </Card>
  </>
);

// ============================================================
// PROPSWITHCHILDREN : Raccourci utile
// ============================================================

// Au lieu de :
interface ContainerProps1 {
  className?: string;
  children: ReactNode;
}

// Utiliser PropsWithChildren :
type ContainerProps2 = PropsWithChildren<{
  className?: string;
}>;

// Les deux sont équivalents
const Container = ({ className, children }: ContainerProps2) => (
  <div className={className}>{children}</div>
);

// ============================================================
// REACTELEMENT : Plus strict que ReactNode
// ============================================================

import { ReactElement } from "react";

// ReactElement = seulement des éléments JSX (pas string, number, null)
interface ModalProps {
  header: ReactElement; // Doit être du JSX
  children: ReactNode; // Peut être n'importe quoi
}

const Modal = ({ header, children }: ModalProps) => (
  <div className="modal">
    <div className="modal-header">{header}</div>
    <div className="modal-body">{children}</div>
  </div>
);

// Utilisation :
const ModalExample = () => (
  <Modal
    header={<h1>Titre du Modal</h1>} // ✅ ReactElement
    // header="Titre" // ❌ Erreur : string n'est pas ReactElement
  >
    Contenu du modal
  </Modal>
);

// ============================================================
// RENDER PROPS : Fonction comme enfant
// ============================================================

interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => ReactNode;
}

// Composant générique avec render prop
function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  // Simulation de fetch
  const data = null as T | null;
  const loading = false;
  const error = null;

  // Appeler children comme une fonction
  return <>{children(data, loading, error)}</>;
}

// Utilisation :
interface User {
  name: string;
}

const RenderPropExample = () => (
  <DataFetcher<User> url="/api/user">
    {(user, loading, error) => {
      if (loading) return <p>Chargement...</p>;
      if (error) return <p>Erreur: {error.message}</p>;
      if (!user) return <p>Pas d'utilisateur</p>;
      return <p>Bonjour {user.name}!</p>;
    }}
  </DataFetcher>
);

// ============================================================
// SLOTS : Plusieurs "children" nommés
// ============================================================

interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode; // Contenu principal
}

const Layout = ({ header, sidebar, footer, children }: LayoutProps) => (
  <div className="layout">
    {header && <header>{header}</header>}
    <div className="layout-body">
      {sidebar && <aside>{sidebar}</aside>}
      <main>{children}</main>
    </div>
    {footer && <footer>{footer}</footer>}
  </div>
);

// Utilisation :
const LayoutExample = () => (
  <Layout
    header={<nav>Navigation</nav>}
    sidebar={<ul><li>Menu 1</li><li>Menu 2</li></ul>}
    footer={<p>© 2024</p>}
  >
    <h1>Contenu principal</h1>
    <p>Le reste du contenu...</p>
  </Layout>
);

// ============================================================
// COMPOSANT QUI RESTREINT SES ENFANTS
// ============================================================

// Accepte seulement des éléments <li>
interface ListProps {
  children: ReactElement<HTMLLIElement> | ReactElement<HTMLLIElement>[];
}

const StrictList = ({ children }: ListProps) => <ul>{children}</ul>;

// Note : Cette restriction est plus documentaire que vraiment stricte
// TypeScript ne peut pas complètement vérifier le type des éléments JSX

// ============================================================
// RÉSUMÉ DES TYPES POUR CHILDREN
// ============================================================

/*
ReactNode        - Le plus flexible (string, number, JSX, null, undefined, array)
ReactElement     - Seulement du JSX
PropsWithChildren<P> - Raccourci pour { children: ReactNode } & P
JSX.Element      - Similaire à ReactElement

Recommandation : Utiliser ReactNode dans 90% des cas
*/

export {
  Card,
  Container,
  Modal,
  DataFetcher,
  Layout,
  StrictList,
  CardExamples,
  ModalExample,
  RenderPropExample,
  LayoutExample,
};
