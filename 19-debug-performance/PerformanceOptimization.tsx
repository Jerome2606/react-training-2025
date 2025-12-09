// PerformanceOptimization.tsx - Patterns d'optimisation React

import { useState, useMemo, useCallback, memo, ReactNode } from "react";

// ============================================================
// 1. REACT.MEMO - MÉMOISER UN COMPOSANT
// ============================================================

// ❌ Sans mémo - re-render même si props identiques
const ExpensiveListWithoutMemo = ({ items }: { items: { id: number; name: string }[] }) => {
  console.log("🔴 ExpensiveListWithoutMemo rendered");
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

// ✅ Avec memo - re-render seulement si items change
const ExpensiveList = memo(({ items }: { items: { id: number; name: string }[] }) => {
  console.log("🟢 ExpensiveList rendered");
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// Avec comparaison personnalisée
const ExpensiveListCustom = memo(
  ({ items }: { items: { id: number; name: string }[] }) => {
    console.log("🟢 ExpensiveListCustom rendered");
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  },
  (prevProps, nextProps) => {
    // Retourner true si les props sont égales (ne pas re-render)
    return prevProps.items.length === nextProps.items.length;
  }
);

// ============================================================
// 2. USEMEMO - MÉMOISER UNE VALEUR CALCULÉE
// ============================================================

const UseMemoExample = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Zebra", price: 100 },
    { id: 2, name: "Apple", price: 50 },
    { id: 3, name: "Mango", price: 75 },
  ]);
  const [count, setCount] = useState(0);

  // ❌ Sans useMemo - recalculé à chaque render
  const sortedItemsBad = items.sort((a, b) => a.name.localeCompare(b.name));
  console.log("🔴 Sorted without useMemo");

  // ✅ Avec useMemo - recalculé seulement si items change
  const sortedItems = useMemo(() => {
    console.log("🟢 Calculating sorted items...");
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  // Calcul coûteux
  const expensiveValue = useMemo(() => {
    console.log("🟢 Expensive calculation...");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i);
    }
    return result;
  }, [items]); // Recalculé seulement si items change

  // Filtrage et total
  const expensiveItems = useMemo(() => {
    return items.filter((item) => item.price > 60);
  }, [items]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return (
    <div>
      <h3>useMemo Example</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment (no recalc)</button>
      <button
        onClick={() =>
          setItems([...items, { id: Date.now(), name: "New Item", price: 80 }])
        }
      >
        Add Item (triggers recalc)
      </button>

      <div>
        <h4>Sorted Items:</h4>
        {sortedItems.map((item) => (
          <div key={item.id}>
            {item.name} - ${item.price}
          </div>
        ))}
      </div>

      <div>
        <p>Expensive items (price &gt; 60): {expensiveItems.length}</p>
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

// ============================================================
// 3. USECALLBACK - MÉMOISER UNE FONCTION
// ============================================================

interface ChildProps {
  onClick: () => void;
  label: string;
}

// Composant enfant mémorisé
const ChildButton = memo(({ onClick, label }: ChildProps) => {
  console.log(`🟢 ChildButton "${label}" rendered`);
  return <button onClick={onClick}>{label}</button>;
});

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // ❌ Sans useCallback - nouvelle fonction à chaque render
  const handleClickBad = () => {
    console.log("Clicked", count);
  };

  // ✅ Avec useCallback - même fonction si deps identiques
  const handleClick = useCallback(() => {
    console.log("Clicked", count);
  }, [count]);

  // Callback stable - pas de dépendances
  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  // Callback avec plusieurs dépendances
  const handleComplex = useCallback(() => {
    console.log(`Count: ${count}, Other: ${other}`);
  }, [count, other]);

  return (
    <div>
      <h3>useCallback Example</h3>
      <p>Count: {count}</p>
      <p>Other: {other}</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <button onClick={() => setOther(other + 1)}>Increment Other</button>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <ChildButton onClick={handleClick} label="Click Me" />
        <ChildButton onClick={handleReset} label="Reset" />
        <ChildButton onClick={handleComplex} label="Complex" />
      </div>

      <p style={{ fontSize: 12, color: "#666", marginTop: 10 }}>
        Ouvrez la console pour voir quels composants sont re-rendus
      </p>
    </div>
  );
};

// ============================================================
// 4. EXEMPLE COMPLET - LISTE OPTIMISÉE
// ============================================================

interface Item {
  id: number;
  name: string;
  completed: boolean;
}

// Composant Item mémorisé
const TodoItem = memo(
  ({ item, onToggle, onDelete }: {
    item: Item;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }) => {
    console.log(`🟢 TodoItem ${item.id} rendered`);
    return (
      <li style={{ padding: 8, borderBottom: "1px solid #eee" }}>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
        />
        <span style={{ textDecoration: item.completed ? "line-through" : "none", marginLeft: 8 }}>
          {item.name}
        </span>
        <button onClick={() => onDelete(item.id)} style={{ marginLeft: 8 }}>
          Delete
        </button>
      </li>
    );
  }
);

const OptimizedTodoList = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Learn React", completed: false },
    { id: 2, name: "Learn TypeScript", completed: true },
    { id: 3, name: "Build an app", completed: false },
  ]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newItemName, setNewItemName] = useState("");

  // ✅ Mémoiser les callbacks pour éviter re-renders inutiles
  const handleToggle = useCallback((id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  const handleDelete = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleAdd = useCallback(() => {
    if (newItemName.trim()) {
      setItems((prev) => [
        ...prev,
        { id: Date.now(), name: newItemName, completed: false },
      ]);
      setNewItemName("");
    }
  }, [newItemName]);

  // ✅ Mémoiser la liste filtrée
  const filteredItems = useMemo(() => {
    console.log("🟢 Filtering items...");
    switch (filter) {
      case "active":
        return items.filter((item) => !item.completed);
      case "completed":
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }, [items, filter]);

  // ✅ Mémoiser les statistiques
  const stats = useMemo(() => {
    return {
      total: items.length,
      active: items.filter((i) => !i.completed).length,
      completed: items.filter((i) => i.completed).length,
    };
  }, [items]);

  return (
    <div style={{ padding: 20 }}>
      <h3>Optimized Todo List</h3>

      <div style={{ marginBottom: 16 }}>
        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New todo..."
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setFilter("all")}>All ({stats.total})</button>
        <button onClick={() => setFilter("active")}>Active ({stats.active})</button>
        <button onClick={() => setFilter("completed")}>Completed ({stats.completed})</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredItems.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      <p style={{ fontSize: 12, color: "#666", marginTop: 10 }}>
        Ouvrez la console pour voir les optimisations en action
      </p>
    </div>
  );
};

// ============================================================
// 5. LAZY LOADING ET CODE SPLITTING
// ============================================================

import { lazy, Suspense } from "react";

// ✅ Lazy loading de composants lourds
// const HeavyComponent = lazy(() => import("./HeavyComponent"));

const LazyLoadingExample = () => {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      <h3>Lazy Loading Example</h3>
      <button onClick={() => setShowHeavy(!showHeavy)}>
        Toggle Heavy Component
      </button>

      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          {/* <HeavyComponent /> */}
          <div>Heavy component would be loaded here</div>
        </Suspense>
      )}
    </div>
  );
};

// ============================================================
// 6. VIRTUALISATION DE LISTE (CONCEPT)
// ============================================================

// Pour de très grandes listes (1000+ items), utilisez react-window ou react-virtualized
// Exemple conceptuel :

const VirtualizedListConcept = () => {
  // Créer une grande liste
  const largeList = useMemo(
    () => Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` })),
    []
  );

  return (
    <div>
      <h3>Virtualisation (Concept)</h3>
      <p>
        Pour {largeList.length} items, utilisez react-window ou react-virtualized
      </p>
      <div
        style={{
          height: 300,
          overflow: "auto",
          border: "1px solid #ccc",
          padding: 10,
        }}
      >
        {/* ❌ Mauvais : render tous les items */}
        {/* {largeList.map(item => <div key={item.id}>{item.name}</div>)} */}

        {/* ✅ Bon : utilisez react-window pour render seulement les items visibles */}
        <p>Installez react-window pour de vraies listes virtualisées</p>
        <code>npm install react-window</code>
      </div>
    </div>
  );
};

// ============================================================
// 7. PROFILER COMPONENT
// ============================================================

import { Profiler, ProfilerOnRenderCallback } from "react";

const onRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log(`⏱️ [${id}] ${phase} took ${actualDuration.toFixed(2)}ms`);
};

const ProfilerExample = ({ children }: { children: ReactNode }) => {
  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      {children}
    </Profiler>
  );
};

// ============================================================
// DEMO APP
// ============================================================

const PerformanceOptimizationDemo = () => {
  const [activeDemo, setActiveDemo] = useState<string>("useMemo");

  const demos = {
    useMemo: <UseMemoExample />,
    useCallback: <UseCallbackExample />,
    todoList: <OptimizedTodoList />,
    lazyLoading: <LazyLoadingExample />,
    virtualization: <VirtualizedListConcept />,
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Performance Optimization Patterns</h1>

      <div style={{ marginBottom: 20 }}>
        <select
          value={activeDemo}
          onChange={(e) => setActiveDemo(e.target.value)}
          style={{ padding: 8, fontSize: 16 }}
        >
          <option value="useMemo">useMemo</option>
          <option value="useCallback">useCallback</option>
          <option value="todoList">Optimized Todo List</option>
          <option value="lazyLoading">Lazy Loading</option>
          <option value="virtualization">Virtualization Concept</option>
        </select>
      </div>

      <ProfilerExample>
        {demos[activeDemo as keyof typeof demos]}
      </ProfilerExample>

      <div
        style={{
          marginTop: 40,
          padding: 16,
          background: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        <h4>📚 Conseils d'optimisation :</h4>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <strong>React.memo</strong> : Mémorisez les composants qui reçoivent les
            mêmes props souvent
          </li>
          <li>
            <strong>useMemo</strong> : Pour les calculs coûteux ou les transformations
            de données
          </li>
          <li>
            <strong>useCallback</strong> : Pour les fonctions passées à des composants
            enfants mémorisés
          </li>
          <li>
            <strong>Lazy loading</strong> : Chargez les composants lourds à la demande
          </li>
          <li>
            <strong>Virtualisation</strong> : Pour les listes de plus de 100 items
          </li>
          <li>
            <strong>Profiler</strong> : Mesurez avant d'optimiser !
          </li>
        </ul>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export default PerformanceOptimizationDemo;
export {
  ExpensiveList,
  UseMemoExample,
  UseCallbackExample,
  OptimizedTodoList,
  LazyLoadingExample,
  VirtualizedListConcept,
  ProfilerExample,
};
