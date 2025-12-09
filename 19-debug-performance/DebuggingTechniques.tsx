// DebuggingTechniques.tsx - Techniques de debugging React

import { useState, useEffect, useRef } from "react";

// ============================================================
// 1. CONSOLE AVANCÉE
// ============================================================

const ConsoleDebugging = () => {
  const [user, setUser] = useState({ name: "Alice", age: 30 });
  const [items, setItems] = useState(["a", "b", "c"]);

  const debugExamples = () => {
    // console.log basique
    console.log("User:", user);

    // console.table - parfait pour les objets et tableaux
    console.table(user);
    console.table(items);

    // console.group - organiser les logs
    console.group("User Details");
    console.log("Name:", user.name);
    console.log("Age:", user.age);
    console.groupEnd();

    // console.time - mesurer le temps
    console.time("Operation");
    // ... opération longue
    console.timeEnd("Operation");

    // console.trace - voir la call stack
    console.trace("Où suis-je appelé ?");

    // console.assert - log seulement si faux
    console.assert(user.age > 0, "Age doit être positif");

    // console.dir - explorer un objet
    console.dir(document.body);

    // Styling des logs
    console.log(
      "%c Important! %c Normal",
      "background: red; color: white; padding: 2px 5px; border-radius: 3px;",
      ""
    );
  };

  return <button onClick={debugExamples}>Test Console</button>;
};

// ============================================================
// 2. HOOK DE DEBUG PERSONNALISÉ
// ============================================================

// Hook pour logger les renders et leurs causes
const useWhyDidYouRender = (componentName: string, props: Record<string, any>) => {
  const prevPropsRef = useRef<Record<string, any> | undefined>(undefined);

  useEffect(() => {
    if (prevPropsRef.current) {
      const changedProps: Record<string, { from: any; to: any }> = {};

      Object.keys({ ...prevPropsRef.current, ...props }).forEach((key) => {
        if (prevPropsRef.current![key] !== props[key]) {
          changedProps[key] = {
            from: prevPropsRef.current![key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length > 0) {
        console.group(`[${componentName}] Re-rendered because:`);
        console.table(changedProps);
        console.groupEnd();
      }
    }

    prevPropsRef.current = props;
  });
};

// Utilisation
const DebuggedComponent = (props: { name: string; count: number }) => {
  useWhyDidYouRender("DebuggedComponent", props);
  return <div>{props.name}: {props.count}</div>;
};

// ============================================================
// 3. HOOK POUR COMPTER LES RENDERS
// ============================================================

const useRenderCount = (componentName: string) => {
  const renderCount = useRef(0);
  renderCount.current++;

  useEffect(() => {
    console.log(`[${componentName}] Render #${renderCount.current}`);
  });

  return renderCount.current;
};

const ComponentWithRenderCount = () => {
  const renderCount = useRenderCount("MyComponent");
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Renders: {renderCount}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment ({count})
      </button>
    </div>
  );
};

// ============================================================
// 4. ERROR BOUNDARY
// ============================================================

import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error);
    console.error("Component stack:", errorInfo.componentStack);

    // Envoyer à un service de monitoring (Sentry, etc.)
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{ padding: 20, background: "#fee", borderRadius: 8 }}>
            <h2>Something went wrong</h2>
            <pre style={{ color: "red" }}>{this.state.error?.message}</pre>
            <button onClick={() => this.setState({ hasError: false, error: null })}>
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Utilisation
const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <ComponentThatMightFail />
  </ErrorBoundary>
);

// ============================================================
// 5. DEBUGGING DES EFFECTS
// ============================================================

const useEffectDebug = (
  effect: () => void | (() => void),
  deps: any[],
  effectName: string
) => {
  const prevDepsRef = useRef<any[] | undefined>(undefined);

  useEffect(() => {
    if (prevDepsRef.current) {
      const changedDeps = deps
        .map((dep, i) => {
          if (dep !== prevDepsRef.current![i]) {
            return { index: i, from: prevDepsRef.current![i], to: dep };
          }
          return null;
        })
        .filter(Boolean);

      if (changedDeps.length > 0) {
        console.group(`[${effectName}] Effect triggered by:`);
        changedDeps.forEach((change: any) => {
          console.log(`  Dep[${change.index}]: ${change.from} → ${change.to}`);
        });
        console.groupEnd();
      }
    }

    prevDepsRef.current = deps;
    return effect();
  }, deps);
};

// Utilisation
const ComponentWithDebuggedEffect = ({ userId }: { userId: string }) => {
  const [data, setData] = useState(null);

  useEffectDebug(
    () => {
      // fetch data...
      return () => {
        // cleanup...
      };
    },
    [userId],
    "FetchUserData"
  );

  return <div>{/* ... */}</div>;
};

// ============================================================
// 6. REACT DEVTOOLS PROFILER API
// ============================================================

import { Profiler, ProfilerOnRenderCallback } from "react";

const onRenderCallback: ProfilerOnRenderCallback = (
  id, // l'id du Profiler
  phase, // "mount" ou "update"
  actualDuration, // temps de render
  baseDuration, // temps estimé sans mémo
  startTime, // quand React a commencé le render
  commitTime // quand React a commit
) => {
  console.table({
    id,
    phase,
    actualDuration: `${actualDuration.toFixed(2)}ms`,
    baseDuration: `${baseDuration.toFixed(2)}ms`,
    startTime,
    commitTime,
  });
};

const ProfiledApp = () => (
  <Profiler id="App" onRender={onRenderCallback}>
    <App />
  </Profiler>
);

// ============================================================
// EXPORTS
// ============================================================

const ComponentThatMightFail = () => <div>OK</div>;
const App = () => <div>App</div>;

export {
  ConsoleDebugging,
  DebuggedComponent,
  ComponentWithRenderCount,
  ErrorBoundary,
  ProfiledApp,
  useWhyDidYouRender,
  useRenderCount,
  useEffectDebug,
};
