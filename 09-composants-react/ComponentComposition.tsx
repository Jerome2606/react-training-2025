// ComponentComposition.tsx - Patterns de composition

import { ReactNode, createContext, useContext } from "react";

// ============================================================
// COMPOSITION BASIQUE : Imbrication
// ============================================================

// Petits composants réutilisables
const Avatar = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="avatar" />
);

const Username = ({ children }: { children: ReactNode }) => (
  <span className="username">{children}</span>
);

const Timestamp = ({ date }: { date: Date }) => (
  <span className="timestamp">{date.toLocaleDateString()}</span>
);

// Composé ensemble
interface CommentProps {
  author: { name: string; avatar: string };
  text: string;
  date: Date;
}

const Comment = ({ author, text, date }: CommentProps) => (
  <div className="comment">
    <Avatar src={author.avatar} alt={author.name} />
    <div className="comment-body">
      <Username>{author.name}</Username>
      <Timestamp date={date} />
      <p>{text}</p>
    </div>
  </div>
);

// ============================================================
// COMPOSITION AVEC CHILDREN
// ============================================================

// Composant "wrapper" générique
interface PanelProps {
  children: ReactNode;
  variant?: "default" | "highlighted" | "danger";
}

const Panel = ({ children, variant = "default" }: PanelProps) => (
  <div className={`panel panel-${variant}`}>{children}</div>
);

// Utilisation flexible
const PanelExamples = () => (
  <>
    <Panel>
      <h2>Titre</h2>
      <p>Contenu simple</p>
    </Panel>

    <Panel variant="highlighted">
      <Comment
        author={{ name: "Alice", avatar: "/alice.jpg" }}
        text="Super article!"
        date={new Date()}
      />
    </Panel>

    <Panel variant="danger">
      <p>⚠️ Attention!</p>
    </Panel>
  </>
);

// ============================================================
// COMPOSITION AVEC SLOTS (Props de type ReactNode)
// ============================================================

interface DialogProps {
  header: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const Dialog = ({ header, footer, children }: DialogProps) => (
  <div className="dialog-overlay">
    <div className="dialog">
      <div className="dialog-header">{header}</div>
      <div className="dialog-body">{children}</div>
      {footer && <div className="dialog-footer">{footer}</div>}
    </div>
  </div>
);

// Utilisation avec slots
const DialogExample = () => (
  <Dialog
    header={<h2>Confirmation</h2>}
    footer={
      <>
        <button>Annuler</button>
        <button>Confirmer</button>
      </>
    }
  >
    <p>Êtes-vous sûr de vouloir continuer ?</p>
  </Dialog>
);

// ============================================================
// COMPOUND COMPONENTS (Composants composés)
// ============================================================

// Context pour partager l'état entre les sous-composants
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

// Composant parent
interface TabsProps {
  children: ReactNode;
  defaultTab: string;
}

const Tabs = ({ children, defaultTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

// Sous-composant : Liste des onglets
const TabList = ({ children }: { children: ReactNode }) => (
  <div className="tab-list" role="tablist">
    {children}
  </div>
);

// Sous-composant : Un onglet
interface TabProps {
  id: string;
  children: ReactNode;
}

const Tab = ({ id, children }: TabProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within Tabs");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      className={`tab ${isActive ? "active" : ""}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

// Sous-composant : Contenu d'un onglet
interface TabPanelProps {
  id: string;
  children: ReactNode;
}

const TabPanel = ({ id, children }: TabPanelProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabPanel must be used within Tabs");

  if (context.activeTab !== id) return null;

  return (
    <div role="tabpanel" className="tab-panel">
      {children}
    </div>
  );
};

// Attacher les sous-composants
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Utilisation élégante
const TabsExample = () => (
  <Tabs defaultTab="home">
    <Tabs.List>
      <Tabs.Tab id="home">Accueil</Tabs.Tab>
      <Tabs.Tab id="profile">Profil</Tabs.Tab>
      <Tabs.Tab id="settings">Paramètres</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel id="home">
      <h2>Bienvenue!</h2>
    </Tabs.Panel>
    <Tabs.Panel id="profile">
      <h2>Votre profil</h2>
    </Tabs.Panel>
    <Tabs.Panel id="settings">
      <h2>Paramètres</h2>
    </Tabs.Panel>
  </Tabs>
);

// ============================================================
// HIGHER-ORDER COMPONENT (HOC) - Pattern avancé
// ============================================================

// HOC qui ajoute des fonctionnalités de logging
function withLogging<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return function WithLogging(props: P) {
    console.log(`[${componentName}] Rendering with props:`, props);
    return <WrappedComponent {...props} />;
  };
}

// Utilisation
const SimpleButton = ({ label }: { label: string }) => (
  <button>{label}</button>
);

const LoggedButton = withLogging(SimpleButton, "SimpleButton");

// ============================================================
// IMPORTS
// ============================================================

import { useState } from "react";

export {
  Comment,
  Panel,
  Dialog,
  Tabs,
  LoggedButton,
  PanelExamples,
  DialogExample,
  TabsExample,
};
