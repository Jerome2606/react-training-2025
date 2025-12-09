# 🎯 Exercice : useContext

## Objectif
Créer un **système de préférences utilisateur** multi-niveaux pour comprendre useContext et éviter le prop drilling.

---

## 📝 Instructions

Créez un système de préférences avec Context API qui gère:

### Fonctionnalités requises

1. **ThemeContext** : Mode clair/sombre
2. **LanguageContext** : Français/Anglais
3. **SettingsContext** : Préférences diverses
4. **Composition** : Utiliser plusieurs contextes ensemble

---

## 🎨 Structure hiérarchique

```
<App>
  <ThemeProvider>
    <LanguageProvider>
      <SettingsProvider>
        <Header />         ← Utilise Theme + Language
        <MainContent>
          <Sidebar />      ← Utilise Theme + Settings
          <Content />      ← Utilise tous les contextes
        </MainContent>
        <Footer />         ← Utilise Theme
      </SettingsProvider>
    </LanguageProvider>
  </ThemeProvider>
</App>
```

**Sans Context**: Il faudrait passer tous les props à travers chaque niveau (prop drilling hell!)

**Avec Context**: Chaque composant accède directement aux données nécessaires.

---

## ✅ Checklist des concepts à utiliser

- [ ] `createContext()` pour créer le contexte
- [ ] Provider pour fournir les données
- [ ] `useContext()` pour consommer les données
- [ ] Custom hooks (`useTheme`, `useLanguage`, etc.)
- [ ] Gestion d'erreur (utilisation hors du Provider)
- [ ] Composition de plusieurs providers
- [ ] TypeScript pour typer le contexte

---

## 🏗️ Pattern recommandé (3 étapes)

### Étape 1: Créer le Context
```typescript
import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 1️⃣ Créer le contexte (valeur par défaut null)
const ThemeContext = createContext<ThemeContextType | null>(null);
```

### Étape 2: Créer le Provider
```typescript
// 2️⃣ Provider qui wrappe l'app
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Étape 3: Créer le custom hook
```typescript
// 3️⃣ Custom hook pour consommer facilement
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // ⚠️ Protection : vérifier qu'on est dans un Provider
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
```

---

## 📝 Exercice à réaliser

### Fichier 1: `contexts/ThemeContext.tsx`

```typescript
import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Implémenter
};

export const useTheme = () => {
  // TODO: Implémenter avec protection
};
```

### Fichier 2: `contexts/LanguageContext.tsx`

```typescript
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Fonction de traduction
}

// Traductions simples
const translations = {
  fr: {
    welcome: "Bienvenue",
    settings: "Paramètres",
    darkMode: "Mode sombre",
    language: "Langue",
  },
  en: {
    welcome: "Welcome",
    settings: "Settings",
    darkMode: "Dark mode",
    language: "Language",
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Implémenter
};

export const useLanguage = () => {
  // TODO: Implémenter
};
```

### Fichier 3: `contexts/SettingsContext.tsx`

```typescript
import { createContext, useContext, useState, ReactNode } from "react";

interface Settings {
  notifications: boolean;
  soundEnabled: boolean;
  fontSize: "small" | "medium" | "large";
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Implémenter
};

export const useSettings = () => {
  // TODO: Implémenter
};
```

### Fichier 4: `App.tsx`

```typescript
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";

export const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SettingsProvider>
          <div style={{ minHeight: "100vh" }}>
            <Header />
            <MainContent />
          </div>
        </SettingsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};
```

### Fichier 5: `components/Header.tsx`

```typescript
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // TODO: Afficher header avec switch thème + langue
  // Pas besoin de props! Tout vient des contextes
};
```

---

## 🎓 Points clés à respecter

### ❌ ERREUR COMMUNE : Pas de vérification du contexte
```typescript
// ❌ MAUVAIS
export const useTheme = () => {
  return useContext(ThemeContext); // Peut être null!
};

// Utilisation
const { theme } = useTheme(); // ❌ Peut crash si hors Provider
```

### ✅ CORRECT : Protection avec throw
```typescript
// ✅ BON
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
```

### ❌ ERREUR COMMUNE : Prop drilling
```typescript
// ❌ MAUVAIS - Prop drilling
<App theme={theme}>
  <Header theme={theme}>
    <Nav theme={theme}>
      <Button theme={theme} />  ← Tous les niveaux passent le prop
    </Nav>
  </Header>
</App>
```

### ✅ CORRECT : Context
```typescript
// ✅ BON - Context
<ThemeProvider>
  <Header>
    <Nav>
      <Button />  ← Accède directement au thème via useTheme()
    </Nav>
  </Header>
</ThemeProvider>
```

---

## 💡 Exemple d'utilisation

```typescript
// N'importe où dans l'arbre, sans props!
const MyComponent = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { settings } = useSettings();

  return (
    <div style={{
      background: theme === "dark" ? "#333" : "#fff",
      fontSize: settings.fontSize === "large" ? "20px" : "16px"
    }}>
      {t("welcome")}
    </div>
  );
};
```

---

## 🚀 Extensions (Bonus)

1. **Persistance** : Sauvegarder dans localStorage
2. **UserContext** : Ajouter authentification
3. **Composition helper** : Créer un `AppProviders` qui combine tous les providers
4. **DevTools** : Afficher un panneau de debug des contextes
5. **Performance** : Utiliser `useMemo` pour éviter re-renders inutiles

---

## 🔍 Auto-évaluation

Vérifiez que vous avez bien compris:

- [ ] Je sais créer un Context avec createContext
- [ ] Je sais créer un Provider
- [ ] Je sais consommer avec useContext
- [ ] Je comprends l'intérêt du custom hook
- [ ] Je gère l'erreur si hors du Provider
- [ ] Je comprends pourquoi Context évite le prop drilling
- [ ] Je sais composer plusieurs Contexts
- [ ] Je type correctement avec TypeScript

---

---

---

---

---

## 💭 Solution partielle

<details>
<summary>Cliquez pour voir ThemeContext complet</summary>

```typescript
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialiser depuis localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved === "dark" || saved === "light") ? saved : "light";
  });

  // Sauvegarder à chaque changement
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme; // Appliquer au body
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
```

</details>

---

## 🎯 Validation par le formateur

Critères d'évaluation:
- [ ] Les 3 contextes sont créés correctement
- [ ] Custom hooks avec protection d'erreur
- [ ] Providers bien imbriqués dans App
- [ ] Composants consomment via les hooks (pas de props)
- [ ] TypeScript bien utilisé
- [ ] Pas de prop drilling
- [ ] Toggle thème fonctionne partout
- [ ] Switch langue fonctionne partout

---

## 🌟 Pourquoi c'est important?

**Sans Context** (prop drilling):
```typescript
<App theme={theme} language={lang}>
  <Header theme={theme} language={lang}>
    <Nav theme={theme} language={lang}>
      <Menu theme={theme} language={lang}>
        <MenuItem theme={theme} language={lang} /> ← 😱
      </Menu>
    </Nav>
  </Header>
</App>
```

**Avec Context**:
```typescript
<ThemeProvider>
  <LanguageProvider>
    <Header>
      <Nav>
        <Menu>
          <MenuItem /> ← 😊 Accès direct via useTheme() et useLanguage()
        </Menu>
      </Nav>
    </Header>
  </LanguageProvider>
</ThemeProvider>
```

**Context API = Éviter l'enfer du prop drilling!** 🎉
