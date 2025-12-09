// ThemeContext.tsx - Context pour le thème
import { createContext, useContext, useState, ReactNode } from "react";

// 1. Définir les types
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// 2. Créer le context avec valeur par défaut
const ThemeContext = createContext<ThemeContextType | null>(null);

// 3. Créer le Provider
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider = ({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 4. Créer le hook personnalisé
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

// 5. Composants utilisant le context
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export const ThemedCard = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  const styles = {
    light: {
      background: "#ffffff",
      color: "#20232a",
      border: "1px solid #eee",
    },
    dark: {
      background: "#20232a",
      color: "#ffffff",
      border: "1px solid #333",
    },
  };

  return (
    <div
      style={{
        ...styles[theme],
        padding: "20px",
        borderRadius: "8px",
        margin: "10px 0",
      }}
    >
      {children}
    </div>
  );
};

// 6. Exemple d'utilisation dans App
export const AppExample = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div style={{ padding: "20px" }}>
        <h1>Application avec thème</h1>
        <ThemeToggle />

        <ThemedCard>
          <h2>Card avec thème</h2>
          <p>Le style change automatiquement selon le thème!</p>
        </ThemedCard>

        <ThemedCard>
          <p>Une autre card qui suit le même thème.</p>
        </ThemedCard>
      </div>
    </ThemeProvider>
  );
};
