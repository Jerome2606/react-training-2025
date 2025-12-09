// Timer.tsx - Timers avec cleanup
import { useEffect, useState } from "react";

// Chronomètre avec setInterval
export const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup - très important pour éviter les fuites de mémoire!
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); // Se relance quand isRunning change

  const toggle = () => setIsRunning(!isRunning);
  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h2 style={{ fontSize: "48px", fontFamily: "monospace" }}>
        {formatTime(seconds)}
      </h2>
      <button onClick={toggle}>{isRunning ? "Pause" : "Start"}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

// Compte à rebours
export const Countdown = ({ initialSeconds = 60 }: { initialSeconds?: number }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId: number;

    if (isActive && seconds > 0) {
      intervalId = window.setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      // Notification quand terminé
      alert("Temps écoulé!");
    }

    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  const reset = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  return (
    <div>
      <h2>{seconds}s</h2>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

// Debounce avec setTimeout
export const SearchWithDebounce = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    // Attendre 500ms après la dernière frappe
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    // Annuler le timeout si query change avant 500ms
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Effet pour la recherche (déclenché par debouncedQuery)
  useEffect(() => {
    if (debouncedQuery) {
      console.log("Recherche:", debouncedQuery);
      // fetch(`/api/search?q=${debouncedQuery}`)...
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher..."
      />
      <p>Recherche: {debouncedQuery || "(tapez pour chercher)"}</p>
    </div>
  );
};
