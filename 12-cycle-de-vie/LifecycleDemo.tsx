// LifecycleDemo.tsx - Démonstration du cycle de vie avec console.log

import { useState, useEffect, useRef } from "react";

// ============================================================
// COMPOSANT PRINCIPAL : Affiche tous les événements du cycle de vie
// ============================================================

export const LifecycleDemo = () => {
  console.log("🔵 [App] RENDER - Le composant App est rendu");

  const [showChild, setShowChild] = useState(true);
  const [counter, setCounter] = useState(0);

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h1>Démonstration du Cycle de Vie</h1>
      <p>Ouvrez la console pour voir les logs</p>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setShowChild(!showChild)}>
          {showChild ? "Démonter" : "Monter"} le composant enfant
        </button>
        <button onClick={() => setCounter((c) => c + 1)}>
          Incrémenter compteur parent ({counter})
        </button>
      </div>

      {showChild && <ChildComponent parentCounter={counter} />}

      <hr />
      <ConsoleInstructions />
    </div>
  );
};

// ============================================================
// COMPOSANT ENFANT : Montre toutes les phases
// ============================================================

interface ChildProps {
  parentCounter: number;
}

const ChildComponent = ({ parentCounter }: ChildProps) => {
  // ==== PHASE 1: INITIALISATION (équivalent constructor) ====
  console.log("🟡 [Child] INIT - Début du render (avant useState)");

  const [localCounter, setLocalCounter] = useState(() => {
    console.log("🟡 [Child] useState INIT - Initialisation lazy du state");
    return 0;
  });

  // Ref pour suivre si c'est le premier render
  const isFirstRender = useRef(true);
  const renderCount = useRef(0);
  renderCount.current++;

  console.log(
    `🔵 [Child] RENDER #${renderCount.current} - Props: parentCounter=${parentCounter}, State: localCounter=${localCounter}`
  );

  // ==== PHASE 2: MONTAGE (componentDidMount) ====
  useEffect(() => {
    console.log("🟢 [Child] MOUNT (useEffect []) - Composant monté dans le DOM");
    console.log("   → Idéal pour: fetch initial, subscriptions, timers");

    // ==== PHASE 4: DÉMONTAGE (componentWillUnmount) ====
    return () => {
      console.log("🔴 [Child] UNMOUNT (cleanup) - Composant va être retiré du DOM");
      console.log("   → Idéal pour: cleanup subscriptions, timers, abort fetch");
    };
  }, []); // [] = seulement au montage

  // ==== PHASE 3: MISE À JOUR (componentDidUpdate) ====
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log("🟢 [Child] EFFECT [deps] - Premier render, pas d'update");
      return;
    }

    console.log(
      `🟠 [Child] UPDATE (useEffect [deps]) - parentCounter changé: ${parentCounter}`
    );
    console.log("   → Se déclenche quand les dépendances changent");

    return () => {
      console.log("🟠 [Child] CLEANUP avant UPDATE - Nettoyage avant nouvel effet");
    };
  }, [parentCounter]);

  // Effet sur le state local
  useEffect(() => {
    if (localCounter === 0) return;
    console.log(`🟠 [Child] UPDATE - localCounter changé: ${localCounter}`);
  }, [localCounter]);

  // ==== RENDU ====
  return (
    <div
      style={{
        border: "2px solid #61dafb",
        padding: 20,
        margin: 10,
        borderRadius: 8,
      }}
    >
      <h2>Composant Enfant</h2>
      <p>Render count: {renderCount.current}</p>
      <p>Parent counter (prop): {parentCounter}</p>
      <p>Local counter (state): {localCounter}</p>

      <button onClick={() => setLocalCounter((c) => c + 1)}>
        Incrémenter local
      </button>
    </div>
  );
};

// ============================================================
// COMPOSANT AVEC TIMER : Exemple pratique de cleanup
// ============================================================

export const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    console.log("⏱️ [Timer] MOUNT - Création du timer");

    const intervalId = setInterval(() => {
      if (isRunning) {
        setSeconds((s) => s + 1);
      }
    }, 1000);

    // CRUCIAL : Nettoyer le timer au démontage
    return () => {
      console.log("⏱️ [Timer] UNMOUNT - Suppression du timer");
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <div>
      <h3>Timer: {seconds}s</h3>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Resume"}
      </button>
    </div>
  );
};

// ============================================================
// COMPOSANT AVEC FETCH : Exemple avec AbortController
// ============================================================

export const FetchComponent = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`📡 [Fetch] EFFECT - Fetching user ${userId}`);
    
    const abortController = new AbortController();
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`📡 [Fetch] SUCCESS - User loaded: ${data.name}`);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("📡 [Fetch] ABORTED - Requête annulée");
        } else {
          console.error("📡 [Fetch] ERROR:", err);
        }
      });

    // Cleanup : annuler la requête si le composant est démonté
    return () => {
      console.log(`📡 [Fetch] CLEANUP - Aborting fetch for user ${userId}`);
      abortController.abort();
    };
  }, [userId]);

  if (loading) return <p>Chargement...</p>;
  return <p>Utilisateur: {user?.name}</p>;
};

// ============================================================
// INSTRUCTIONS POUR LA CONSOLE
// ============================================================

const ConsoleInstructions = () => (
  <div style={{ background: "#f5f5f5", padding: 15, borderRadius: 8 }}>
    <h3>Légende des couleurs dans la console :</h3>
    <ul>
      <li>🟡 INIT - Initialisation (useState lazy)</li>
      <li>🔵 RENDER - Phase de rendu</li>
      <li>🟢 MOUNT - Après insertion dans le DOM (useEffect [])</li>
      <li>🟠 UPDATE - Après mise à jour (useEffect [deps])</li>
      <li>🔴 UNMOUNT - Avant suppression du DOM (cleanup)</li>
    </ul>

    <h3>Actions à tester :</h3>
    <ol>
      <li>Observer les logs au chargement (INIT → RENDER → MOUNT)</li>
      <li>Cliquer "Incrémenter local" (RENDER → UPDATE)</li>
      <li>Cliquer "Incrémenter parent" (RENDER → CLEANUP → UPDATE)</li>
      <li>Cliquer "Démonter" (UNMOUNT)</li>
      <li>Cliquer "Monter" (INIT → RENDER → MOUNT)</li>
    </ol>
  </div>
);

// ============================================================
// SCHÉMA DU CYCLE DE VIE
// ============================================================

/*
┌─────────────────────────────────────────────────────────────┐
│                     CYCLE DE VIE REACT                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │   MONTAGE    │                                           │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐     useState(() => init)                  │
│  │ Initialisation│──────────────────────────►  État initial │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │    Render    │──────────────────────────►  Virtual DOM   │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐     useEffect(() => {}, [])               │
│  │  Commit DOM  │──────────────────────────►  DOM réel      │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │   Effects    │──────────────────────────►  Side effects  │
│  └──────┬───────┘                                           │
│         │                                                    │
│ ◄───────┴───────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │ MISE À JOUR  │  (props ou state change)                  │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │    Render    │──────────────────────────►  Nouveau VDOM  │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │    Diff      │──────────────────────────►  Changements   │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐     useEffect cleanup puis effect         │
│  │  Commit DOM  │──────────────────────────►  DOM mis à jour│
│  └──────┬───────┘                                           │
│         │                                                    │
│ ◄───────┴───────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │  DÉMONTAGE   │                                           │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐     useEffect return () => cleanup        │
│  │   Cleanup    │──────────────────────────►  Nettoyage     │
│  └──────────────┘                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
*/
