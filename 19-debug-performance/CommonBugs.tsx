// CommonBugs.tsx - Bugs courants de performance et leurs solutions

import { useState, useEffect, useMemo, useCallback, memo } from "react";

// ============================================================
// BUG 1 : CRÉER DES OBJETS/TABLEAUX DANS LE RENDER
// ============================================================

// ❌ BUG : Nouvel objet créé à chaque render
const BugInlineObject = () => {
  const [count, setCount] = useState(0);

  // Ce composant enfant sera re-rendu à chaque fois car l'objet est nouveau
  return (
    <div>
      <h3>Bug: Inline Object</h3>
      <ChildComponent user={{ name: "Alice", age: 30 }} />
      <button onClick={() => setCount(count + 1)}>Re-render Parent</button>
      <p>Count: {count}</p>
    </div>
  );
};

// ✅ SOLUTION 1 : Déplacer l'objet hors du composant
const user = { name: "Alice", age: 30 };

const FixedStaticObject = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Fixed: Static Object</h3>
      <ChildComponent user={user} />
      <button onClick={() => setCount(count + 1)}>Re-render Parent</button>
      <p>Count: {count}</p>
    </div>
  );
};

// ✅ SOLUTION 2 : Utiliser useMemo
const FixedUseMemoObject = () => {
  const [count, setCount] = useState(0);

  const user = useMemo(() => ({ name: "Alice", age: 30 }), []);

  return (
    <div>
      <h3>Fixed: useMemo Object</h3>
      <ChildComponent user={user} />
      <button onClick={() => setCount(count + 1)}>Re-render Parent</button>
      <p>Count: {count}</p>
    </div>
  );
};

const ChildComponent = memo(({ user }: { user: { name: string; age: number } }) => {
  console.log("ChildComponent rendered");
  return (
    <div>
      {user.name} - {user.age} ans
    </div>
  );
});

// ============================================================
// BUG 2 : FONCTIONS INLINE DANS LE RENDER
// ============================================================

// ❌ BUG : Nouvelle fonction créée à chaque render
const BugInlineFunction = () => {
  const [items, setItems] = useState([1, 2, 3]);

  return (
    <div>
      <h3>Bug: Inline Function</h3>
      {items.map((item) => (
        // Nouvelle fonction créée pour chaque item à chaque render !
        <ExpensiveItem
          key={item}
          item={item}
          onClick={() => console.log(item)}
        />
      ))}
    </div>
  );
};

// ✅ SOLUTION : useCallback
const FixedUseCallback = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const handleClick = useCallback((item: number) => {
    console.log(item);
  }, []);

  return (
    <div>
      <h3>Fixed: useCallback</h3>
      {items.map((item) => (
        <ExpensiveItem
          key={item}
          item={item}
          onClick={() => handleClick(item)}
        />
      ))}
    </div>
  );
};

const ExpensiveItem = memo(
  ({ item, onClick }: { item: number; onClick: () => void }) => {
    console.log(`ExpensiveItem ${item} rendered`);
    return <button onClick={onClick}>Item {item}</button>;
  }
);

// ============================================================
// BUG 3 : DÉPENDANCES useEffect INCORRECTES
// ============================================================

// ❌ BUG : Dépendances manquantes
const BugMissingDeps = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState(null);

  // ⚠️ ESLint warning : userId devrait être dans les deps
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((r) => r.json())
      .then(setUser);
  }, []); // Bug : userId n'est pas dans les dépendances !

  return <div>{user ? JSON.stringify(user) : "Loading..."}</div>;
};

// ✅ SOLUTION 1 : Ajouter toutes les dépendances
const FixedCorrectDeps = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((r) => r.json())
      .then(setUser);
  }, [userId]); // ✅ Correct

  return <div>{user ? JSON.stringify(user) : "Loading..."}</div>;
};

// ✅ SOLUTION 2 : Utiliser un AbortController pour cleanup
const FixedWithCleanup = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then((r) => r.json())
      .then(setUser)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => controller.abort(); // Cleanup
  }, [userId]);

  return <div>{user ? JSON.stringify(user) : "Loading..."}</div>;
};

// ============================================================
// BUG 4 : STATE UPDATE DANS LE RENDER
// ============================================================

// ❌ BUG : setState dans le render = boucle infinie !
const BugSetStateInRender = () => {
  const [count, setCount] = useState(0);

  // 💥 BOUCLE INFINIE
  // setCount(count + 1);

  return <div>Count: {count}</div>;
};

// ✅ SOLUTION : Utiliser useEffect
const FixedUseEffect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Logique qui modifie le state
    if (count < 5) {
      const timer = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return <div>Count: {count}</div>;
};

// ============================================================
// BUG 5 : CALCULS LOURDS SANS useMemo
// ============================================================

// ❌ BUG : Calcul coûteux à chaque render
const BugExpensiveCalculation = ({ items }: { items: number[] }) => {
  const [count, setCount] = useState(0);

  // Recalculé à chaque render, même si items ne change pas !
  const sortedItems = items.slice().sort((a, b) => b - a);
  const sum = items.reduce((acc, val) => acc + val, 0);

  return (
    <div>
      <p>Sum: {sum}</p>
      <p>Sorted: {sortedItems.join(", ")}</p>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
    </div>
  );
};

// ✅ SOLUTION : useMemo
const FixedUseMemo = ({ items }: { items: number[] }) => {
  const [count, setCount] = useState(0);

  const sortedItems = useMemo(() => {
    console.log("Sorting items...");
    return items.slice().sort((a, b) => b - a);
  }, [items]);

  const sum = useMemo(() => {
    console.log("Calculating sum...");
    return items.reduce((acc, val) => acc + val, 0);
  }, [items]);

  return (
    <div>
      <p>Sum: {sum}</p>
      <p>Sorted: {sortedItems.join(", ")}</p>
      <button onClick={() => setCount(count + 1)}>Re-render ({count})</button>
    </div>
  );
};

// ============================================================
// BUG 6 : MUTATION DIRECTE DU STATE
// ============================================================

// ❌ BUG : Mutation directe de l'array/objet
const BugDirectMutation = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const addItemBad = () => {
    // ❌ Mutation directe - React ne détecte pas le changement !
    items.push(4);
    setItems(items);
  };

  return (
    <div>
      <h3>Bug: Direct Mutation</h3>
      <p>Items: {items.join(", ")}</p>
      <button onClick={addItemBad}>Add Item (broken)</button>
    </div>
  );
};

// ✅ SOLUTION : Créer un nouveau tableau/objet
const FixedImmutableUpdate = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    // ✅ Nouveau tableau
    setItems([...items, items.length + 1]);
  };

  const removeFirst = () => {
    setItems(items.slice(1));
  };

  const updateFirst = () => {
    setItems([999, ...items.slice(1)]);
  };

  return (
    <div>
      <h3>Fixed: Immutable Update</h3>
      <p>Items: {items.join(", ")}</p>
      <button onClick={addItem}>Add Item</button>
      <button onClick={removeFirst}>Remove First</button>
      <button onClick={updateFirst}>Update First</button>
    </div>
  );
};

// ============================================================
// BUG 7 : TROP DE RE-RENDERS (Context)
// ============================================================

import { createContext, useContext } from "react";

// ❌ BUG : Tout le contexte change à chaque update
const BugContext = createContext({ count: 0, user: { name: "Alice" } });

const BugContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  // ❌ Nouvel objet créé à chaque render !
  const value = { count, user: { name: "Alice" } };

  return <BugContext.Provider value={value}>{children}</BugContext.Provider>;
};

// ✅ SOLUTION : useMemo pour la value du context
const FixedContext = createContext({ count: 0, user: { name: "Alice" } });

const FixedContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const value = useMemo(() => {
    return { count, user: { name: "Alice" } };
  }, [count]);

  return <FixedContext.Provider value={value}>{children}</FixedContext.Provider>;
};

// Ou encore mieux : séparer les contextes
const CountContext = createContext(0);
const UserContext = createContext({ name: "Alice" });

// ============================================================
// BUG 8 : KEY MANQUANTE OU INCORRECTE DANS LES LISTES
// ============================================================

// ❌ BUG : Index comme key
const BugIndexKey = () => {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);

  const addItem = () => {
    setItems(["Zebra", ...items]); // Ajouter au début
  };

  return (
    <div>
      <h3>Bug: Index as Key</h3>
      {items.map((item, index) => (
        // ❌ L'index change quand on ajoute au début !
        <input key={index} defaultValue={item} />
      ))}
      <button onClick={addItem}>Add at Start</button>
    </div>
  );
};

// ✅ SOLUTION : ID unique et stable
const FixedUniqueKey = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
  ]);

  const addItem = () => {
    setItems([{ id: Date.now(), name: "Zebra" }, ...items]);
  };

  return (
    <div>
      <h3>Fixed: Unique Key</h3>
      {items.map((item) => (
        <input key={item.id} defaultValue={item.name} />
      ))}
      <button onClick={addItem}>Add at Start</button>
    </div>
  );
};

// ============================================================
// BUG 9 : COMPOSANT PAS MÉMORISÉ ALORS QU'IL DEVRAIT
// ============================================================

// ❌ BUG : Composant enfant coûteux non mémorisé
const ExpensiveChildNormal = ({ data }: { data: string[] }) => {
  console.log("🔴 ExpensiveChild rendered");
  // Simulation de calcul lourd
  const result = data.map((item) => item.toUpperCase()).join(", ");
  return <div>{result}</div>;
};

const BugNotMemoized = () => {
  const [count, setCount] = useState(0);
  const data = ["apple", "banana", "cherry"];

  return (
    <div>
      <h3>Bug: Not Memoized</h3>
      <ExpensiveChildNormal data={data} />
      <button onClick={() => setCount(count + 1)}>Increment ({count})</button>
      <p>L'enfant est re-rendu même si data ne change pas !</p>
    </div>
  );
};

// ✅ SOLUTION : React.memo
const ExpensiveChildMemoized = memo(({ data }: { data: string[] }) => {
  console.log("🟢 ExpensiveChild rendered");
  const result = data.map((item) => item.toUpperCase()).join(", ");
  return <div>{result}</div>;
});

const FixedMemoized = () => {
  const [count, setCount] = useState(0);
  const data = useMemo(() => ["apple", "banana", "cherry"], []);

  return (
    <div>
      <h3>Fixed: Memoized</h3>
      <ExpensiveChildMemoized data={data} />
      <button onClick={() => setCount(count + 1)}>Increment ({count})</button>
      <p>L'enfant n'est pas re-rendu si data ne change pas !</p>
    </div>
  );
};

// ============================================================
// BUG 10 : MEMORY LEAK - EVENT LISTENERS NON NETTOYÉS
// ============================================================

// ❌ BUG : Event listener non nettoyé
const BugMemoryLeak = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    // ❌ Pas de cleanup ! Memory leak quand le composant unmount
  }, []);

  return (
    <div>
      Window size: {size.width} x {size.height}
    </div>
  );
};

// ✅ SOLUTION : Cleanup function
const FixedCleanup = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    // ✅ Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      Window size: {size.width} x {size.height}
    </div>
  );
};

// ============================================================
// DEMO APP
// ============================================================

const CommonBugsDemo = () => {
  const [activeBug, setActiveBug] = useState<string>("inlineObject");

  const bugs = {
    inlineObject: (
      <div>
        <BugInlineObject />
        <hr />
        <FixedStaticObject />
        <hr />
        <FixedUseMemoObject />
      </div>
    ),
    inlineFunction: (
      <div>
        <BugInlineFunction />
        <hr />
        <FixedUseCallback />
      </div>
    ),
    missingDeps: (
      <div>
        <FixedCorrectDeps userId="123" />
        <hr />
        <FixedWithCleanup userId="123" />
      </div>
    ),
    stateInRender: (
      <div>
        <FixedUseEffect />
      </div>
    ),
    expensiveCalc: (
      <div>
        <BugExpensiveCalculation items={[5, 2, 8, 1, 9]} />
        <hr />
        <FixedUseMemo items={[5, 2, 8, 1, 9]} />
      </div>
    ),
    directMutation: (
      <div>
        <BugDirectMutation />
        <hr />
        <FixedImmutableUpdate />
      </div>
    ),
    indexKey: (
      <div>
        <BugIndexKey />
        <hr />
        <FixedUniqueKey />
      </div>
    ),
    notMemoized: (
      <div>
        <BugNotMemoized />
        <hr />
        <FixedMemoized />
      </div>
    ),
    memoryLeak: (
      <div>
        <FixedCleanup />
      </div>
    ),
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Common Performance Bugs & Solutions</h1>

      <div style={{ marginBottom: 20 }}>
        <select
          value={activeBug}
          onChange={(e) => setActiveBug(e.target.value)}
          style={{ padding: 8, fontSize: 16, width: "100%" }}
        >
          <option value="inlineObject">1. Inline Object/Array</option>
          <option value="inlineFunction">2. Inline Function</option>
          <option value="missingDeps">3. Missing useEffect Dependencies</option>
          <option value="stateInRender">4. setState in Render</option>
          <option value="expensiveCalc">5. Expensive Calculations</option>
          <option value="directMutation">6. Direct State Mutation</option>
          <option value="indexKey">7. Index as Key</option>
          <option value="notMemoized">8. Not Memoized Component</option>
          <option value="memoryLeak">9. Memory Leak (Event Listeners)</option>
        </select>
      </div>

      <div style={{ border: "2px solid #e0e0e0", padding: 20, borderRadius: 8 }}>
        {bugs[activeBug as keyof typeof bugs]}
      </div>

      <div
        style={{
          marginTop: 40,
          padding: 16,
          background: "#fff3cd",
          borderRadius: 8,
          border: "2px solid #ffc107",
        }}
      >
        <h4>⚠️ Bugs les plus courants :</h4>
        <ol style={{ lineHeight: 1.8 }}>
          <li>Créer des objets/tableaux inline dans le render</li>
          <li>Fonctions inline passées à des composants mémorisés</li>
          <li>Dépendances useEffect manquantes ou incorrectes</li>
          <li>setState dans le body du composant (boucle infinie)</li>
          <li>Calculs coûteux sans useMemo</li>
          <li>Mutation directe du state (push, splice, etc.)</li>
          <li>Utiliser l'index comme key dans les listes dynamiques</li>
          <li>Ne pas mémoiser les composants enfants coûteux</li>
          <li>Event listeners non nettoyés (memory leaks)</li>
          <li>Context provider sans useMemo sur la value</li>
        </ol>
        <p style={{ fontWeight: "bold", marginTop: 16 }}>
          💡 Astuce : Ouvrez la console pour voir les logs de render !
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export default CommonBugsDemo;
export {
  BugInlineObject,
  FixedStaticObject,
  FixedUseMemoObject,
  BugInlineFunction,
  FixedUseCallback,
  BugMissingDeps,
  FixedCorrectDeps,
  FixedWithCleanup,
  BugExpensiveCalculation,
  FixedUseMemo,
  BugDirectMutation,
  FixedImmutableUpdate,
  BugIndexKey,
  FixedUniqueKey,
  BugNotMemoized,
  FixedMemoized,
  BugMemoryLeak,
  FixedCleanup,
};
