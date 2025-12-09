# 🎯 Exercice : useEffect

## Objectif
Créer un composant de **météo en temps réel** pour vérifier votre compréhension de useEffect.

---

## 📝 Instructions

Créez un fichier `WeatherWidget.tsx` qui affiche la météo d'une ville avec mise à jour automatique.

### Fonctionnalités requises

1. **Récupérer la météo** d'une ville via API
2. **Rafraîchir automatiquement** toutes les 30 secondes
3. **Changer de ville** et refetch automatiquement
4. **Cleanup** : Annuler les intervalles et requêtes en cours

---

## 🌐 API Mock (pas besoin de clé)

Utilisez cette API gratuite (pas de clé nécessaire):
```
https://wttr.in/[ville]?format=j1
```

Exemple:
```
https://wttr.in/Brussels?format=j1
```

**Note**: Pour simplifier, vous pouvez aussi créer des données mockées.

---

## ✅ Checklist des concepts à utiliser

- [ ] `useEffect` pour le fetch initial
- [ ] Dépendances : refetch quand la ville change
- [ ] `setInterval` pour le rafraîchissement auto
- [ ] **Cleanup function** pour clearInterval
- [ ] `AbortController` pour annuler les fetch en cours
- [ ] Loading state pendant le fetch
- [ ] Error state si le fetch échoue

---

## 💡 Exemple de rendu attendu

```
Météo de: [Brussels ▼]

🌡️ Température: 11°C
☁️ Conditions: Cloudy
💨 Vent: 23 km/h

Dernière mise à jour: 2025-12-09 09:20 AM
Prochaine mise à jour dans: 25s

[Rafraîchir maintenant]
```

---

## 🎓 Points clés à respecter

### ❌ ERREUR COMMUNE : Pas de cleanup
```typescript
// ❌ MAUVAIS - Memory leak!
useEffect(() => {
  const interval = setInterval(() => {
    fetchWeather(city);
  }, 30000);
  // Pas de return! L'intervalle continue après unmount
}, [city]);
```

### ✅ CORRECT : Cleanup de l'intervalle
```typescript
// ✅ BON
useEffect(() => {
  const interval = setInterval(() => {
    fetchWeather(city);
  }, 30000);

  return () => clearInterval(interval); // Cleanup!
}, [city]);
```

### ❌ ERREUR COMMUNE : Pas d'annulation du fetch
```typescript
// ❌ MAUVAIS - Tente de setState après unmount
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch(url);
    setWeather(data); // Peut s'exécuter après unmount!
  };
  fetchData();
}, [city]);
```

### ✅ CORRECT : AbortController
```typescript
// ✅ BON
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: controller.signal
      });
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }
  };

  fetchData();

  return () => controller.abort(); // Annule le fetch en cours
}, [city]);
```

---

## 🚀 Structure suggérée

```typescript
import { useState, useEffect } from "react";

interface Weather {
  temperature: number;
  condition: string;
  wind: number;
}

export const WeatherWidget = () => {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // TODO: useEffect pour fetch initial + refetch si city change
  // TODO: useEffect pour auto-refresh toutes les 30s
  // TODO: Cleanup functions

  return (
    // TODO: UI
  );
};
```

---

## 🔄 Patterns à implémenter

### 1. Fetch au montage et quand city change
```typescript
useEffect(() => {
  // Fetch weather
  // Avec AbortController pour cleanup
}, [city]);
```

### 2. Auto-refresh toutes les 30 secondes
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    // Refresh weather
  }, 30000);

  return () => clearInterval(interval);
}, [city]); // Relancer l'intervalle si city change
```

### 3. Afficher le countdown
```typescript
const [countdown, setCountdown] = useState(30);

useEffect(() => {
  const timer = setInterval(() => {
    setCountdown(prev => (prev > 0 ? prev - 1 : 30));
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

---

## 🚀 Extensions (Bonus)

1. **Géolocalisation** : Bouton "Ma position" avec `navigator.geolocation`
2. **Historique** : Sauvegarder les dernières villes recherchées
3. **Graphique** : Afficher les prévisions sur 5 jours
4. **Préférences** : Toggle Celsius/Fahrenheit
5. **Dark mode** : Switch jour/nuit

---

## 🔍 Auto-évaluation

Vérifiez que vous avez bien compris:

- [ ] Je sais utiliser useEffect pour du data fetching
- [ ] Je comprends le tableau de dépendances
- [ ] Je sais écrire une cleanup function
- [ ] Je sais utiliser AbortController
- [ ] Je sais gérer setInterval/setTimeout avec cleanup
- [ ] Je gère les états loading/error/success
- [ ] Je comprends quand useEffect se déclenche

---

---

---

---

---

## 💭 Solution simplifiée

<details>
<summary>Cliquez pour voir une solution possible (avec données mockées)</summary>

```typescript
import { useState, useEffect } from "react";

interface Weather {
  temperature: number;
  condition: string;
  wind: number;
}

const CITIES = ["Paris", "London", "New York", "Tokyo", "Sydney"];

// Mock data pour simplifier (pas de vraie API)
const getMockWeather = (city: string): Weather => ({
  temperature: Math.round(Math.random() * 30 + 5),
  condition: ["Ensoleillé", "Nuageux", "Pluvieux", "Orageux"][Math.floor(Math.random() * 4)],
  wind: Math.round(Math.random() * 30 + 5),
});

export const WeatherWidget = () => {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(30);

  // Fetch weather quand city change
  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);

      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!controller.signal.aborted) {
          const data = getMockWeather(city);
          setWeather(data);
          setLastUpdate(new Date());
          setCountdown(30); // Reset countdown
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    return () => controller.abort(); // Cleanup
  }, [city]);

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      // Refetch
      setWeather(getMockWeather(city));
      setLastUpdate(new Date());
      setCountdown(30);
    }, 30000);

    return () => clearInterval(interval); // Cleanup
  }, [city]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, []);

  const manualRefresh = () => {
    setWeather(getMockWeather(city));
    setLastUpdate(new Date());
    setCountdown(30);
  };

  return (
    <div style={{
      padding: "20px",
      fontFamily: "sans-serif",
      maxWidth: "400px",
      border: "1px solid #ddd",
      borderRadius: "8px"
    }}>
      <h2>Météo de:</h2>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "8px", fontSize: "16px", marginBottom: "20px" }}
      >
        {CITIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {loading && <div>Chargement...</div>}

      {weather && !loading && (
        <>
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>
            🌡️ {weather.temperature}°C
          </div>
          <div style={{ fontSize: "20px", marginBottom: "5px" }}>
            ☁️ {weather.condition}
          </div>
          <div style={{ fontSize: "16px", marginBottom: "20px" }}>
            💨 Vent: {weather.wind} km/h
          </div>

          <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
            Dernière mise à jour: {lastUpdate?.toLocaleTimeString()}
          </div>
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "15px" }}>
            Prochaine mise à jour dans: {countdown}s
          </div>

          <button
            onClick={manualRefresh}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            🔄 Rafraîchir maintenant
          </button>
        </>
      )}
    </div>
  );
};
```

</details>

---

## 🎯 Validation par le formateur

Critères d'évaluation:
- [ ] useEffect utilisé correctement
- [ ] Cleanup functions présentes (interval, fetch)
- [ ] AbortController pour annuler les fetch
- [ ] Loading/error states gérés
- [ ] Refetch quand la ville change
- [ ] Pas de memory leaks
- [ ] Code TypeScript bien typé
