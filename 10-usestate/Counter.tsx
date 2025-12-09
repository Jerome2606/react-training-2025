// Counter.tsx - Compteur simple avec useState
import { useState } from "react";

export const Counter = () => {
  // Déclaration de l'état avec valeur initiale
  const [count, setCount] = useState(0);

  // Handlers
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  // ✅ Mise à jour fonctionnelle (recommandé pour les mises à jour basées sur l'état précédent)
  const incrementSafe = () => setCount((prev) => prev + 1);

  return (
    <div>
      <h2>Compteur: {count}</h2>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

// Compteur avec pas personnalisé
export const CounterWithStep = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Compteur: {count}</h2>
      <div>
        <label>
          Pas:{" "}
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            min={1}
          />
        </label>
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <button onClick={() => setCount((c) => c - step)}>-{step}</button>
        <button onClick={() => setCount((c) => c + step)}>+{step}</button>
      </div>
    </div>
  );
};
