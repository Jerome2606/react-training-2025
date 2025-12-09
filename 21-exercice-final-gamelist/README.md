# 🎮 Exercice Final : GameList

**Application React complète pour afficher une liste de jeux vidéo avec l'API RAWG**

Cet exercice final vous permet de mettre en pratique TOUS les concepts vus pendant la formation en créant une application React complète de A à Z.

---

## 🎯 Objectifs pédagogiques

À la fin de cet exercice, vous serez capable de :

- ✅ Créer un projet React avec Vite et TypeScript
- ✅ Intégrer une API REST externe avec gestion d'erreurs
- ✅ Créer des custom hooks réutilisables
- ✅ Gérer l'état avec useState et useEffect
- ✅ Créer des composants réutilisables et typés
- ✅ Utiliser CSS Modules pour le styling
- ✅ Implémenter l'internationalisation (FR/EN)
- ✅ Gérer les états de chargement et d'erreur
- ✅ Structurer une application React professionnellement

---

## 🎮 API RAWG

L'API RAWG (https://rawg.io/apidocs) est une base de données gratuite de plus de 800 000 jeux vidéo.

### 🔑 Obtenir votre clé API (GRATUIT)

1. Créer un compte sur https://rawg.io/
2. Aller dans votre profil → API Keys
3. Copier votre clé API personnelle
4. **Important** : Gardez cette clé confidentielle !

### 📡 Endpoints que vous utiliserez

```bash
# Récupérer tous les jeux (page 1)
GET https://api.rawg.io/api/games?key=YOUR_API_KEY&page=1&page_size=20

# Récupérer les jeux d'un genre spécifique
GET https://api.rawg.io/api/games?key=YOUR_API_KEY&genres=action

# Rechercher des jeux
GET https://api.rawg.io/api/games?key=YOUR_API_KEY&search=zelda

# Récupérer la liste des genres
GET https://api.rawg.io/api/genres?key=YOUR_API_KEY
```

### 📦 Structure des données API

**Réponse pour /api/games** :
```json
{
  "count": 850071,
  "next": "https://api.rawg.io/api/games?page=2",
  "previous": null,
  "results": [
    {
      "id": 3498,
      "name": "Grand Theft Auto V",
      "background_image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
      "rating": 4.47,
      "rating_top": 5,
      "ratings_count": 7000,
      "genres": [
        { "id": 4, "name": "Action" },
        { "id": 3, "name": "Adventure" }
      ],
      "released": "2013-09-17"
    }
  ]
}
```

**Réponse pour /api/genres** :
```json
{
  "count": 19,
  "results": [
    { "id": 4, "name": "Action", "slug": "action", "games_count": 180000 },
    { "id": 51, "name": "Indie", "slug": "indie", "games_count": 68000 }
  ]
}
```

---

## 🏗️ Structure du projet proposée

Voici la structure recommandée pour votre application :

```
21-exercice-final-gamelist/
├── public/
│   └── placeholder.png          # Image par défaut si un jeu n'a pas d'image
├── src/
│   ├── components/              # Tous vos composants React
│   │   ├── GameCard.tsx         # Carte d'affichage d'un jeu
│   │   ├── GameCard.module.css
│   │   ├── GameList.tsx         # Liste principale de jeux
│   │   ├── GameList.module.css
│   │   ├── GenreFilter.tsx      # Filtre par genre
│   │   ├── GenreFilter.module.css
│   │   ├── SearchBar.tsx        # Barre de recherche
│   │   ├── SearchBar.module.css
│   │   ├── LanguageSwitcher.tsx # Sélecteur FR/EN
│   │   └── LanguageSwitcher.module.css
│   ├── hooks/                   # Custom hooks
│   │   ├── useGames.ts          # Hook pour fetch les jeux
│   │   └── useGenres.ts         # Hook pour fetch les genres
│   ├── services/                # Logique API
│   │   └── api.ts               # Fonctions d'appel API
│   ├── types/                   # Types TypeScript
│   │   └── game.ts              # Interface Game, Genre, etc.
│   ├── locales/                 # Fichiers de traduction
│   │   ├── en.json              # Traductions anglaises
│   │   └── fr.json              # Traductions françaises
│   ├── i18n.ts                  # Configuration i18next
│   ├── App.tsx                  # Composant racine
│   ├── App.css                  # Styles globaux
│   └── main.tsx                 # Point d'entrée
├── .env.example                 # Template pour les variables d'environnement
├── .env                         # Vos variables d'environnement (à créer)
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Étapes de l'exercice

### Étape 0 : Préparation

#### 0.1 - Créer le projet avec Vite

```bash
# Dans le dossier formation-react-examples/
npm create vite@latest 21-exercice-final-gamelist -- --template react-ts

# Entrer dans le dossier
cd 21-exercice-final-gamelist

# Installer les dépendances de base
npm install
```

#### 0.2 - Installer les dépendances supplémentaires

```bash
# Pour l'internationalisation
npm install react-i18next i18next

# Pour les types
npm install --save-dev @types/node
```

#### 0.3 - Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```bash
VITE_RAWG_API_KEY=your_api_key_here
```

**Important** : Remplacez `your_api_key_here` par votre vraie clé API RAWG.

Créez également un fichier `.env.example` (pour le partage sans exposer votre clé) :

```bash
VITE_RAWG_API_KEY=your_api_key_here
```

**Note Vite** : Les variables d'environnement dans Vite DOIVENT commencer par `VITE_` pour être accessibles côté client.

#### 0.4 - Vérifier que tout fonctionne

```bash
npm run dev
```

Vous devriez voir l'application de base de Vite s'ouvrir sur http://localhost:5173

---

### Étape 1 : Types TypeScript

#### 1.1 - Créer le fichier `src/types/game.ts`

Définissez les interfaces pour typer les données de l'API :

```typescript
// Interface pour un jeu vidéo
export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  released: string;
  genres: Genre[];
}

// Interface pour un genre de jeu
export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count?: number;
}

// Interface pour la réponse API (pagination)
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
```

**Points clés** :
- `Game` correspond exactement à la structure JSON de l'API
- `Genre` peut être utilisé seul ou imbriqué dans `Game`
- `ApiResponse<T>` est générique pour gérer différents types de listes

---

### Étape 2 : Service API

#### 2.1 - Créer le fichier `src/services/api.ts`

Créez les fonctions pour appeler l'API RAWG :

```typescript
import type { ApiResponse, Game, Genre } from "../types/game";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

// Fonction pour fetch les jeux
export const fetchGames = async (
  genre?: string,
  search?: string,
  page: number = 1
): Promise<ApiResponse<Game>> => {
  // Construire l'URL avec les paramètres
  const params = new URLSearchParams({
    key: API_KEY,
    page: page.toString(),
    page_size: "20",
  });

  if (genre) params.append("genres", genre);
  if (search) params.append("search", search);

  const response = await fetch(`${API_BASE_URL}/games?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }

  return response.json();
};

// Fonction pour fetch les genres
export const fetchGenres = async (): Promise<ApiResponse<Genre>> => {
  const response = await fetch(`${API_BASE_URL}/genres?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.statusText}`);
  }

  return response.json();
};
```

**Points clés** :
- `import.meta.env.VITE_RAWG_API_KEY` récupère la clé depuis `.env`
- `URLSearchParams` construit proprement l'URL avec les paramètres
- Gestion des erreurs avec `response.ok`
- Fonctions async/await pour le typage propre

---

### Étape 3 : Custom Hook useGames

#### 3.1 - Créer le fichier `src/hooks/useGames.ts`

Ce hook encapsule toute la logique de récupération des jeux :

```typescript
import { useState, useEffect } from "react";
import type { Game } from "../types/game";
import { fetchGames } from "../services/api";

interface UseGamesReturn {
  games: Game[];
  loading: boolean;
  error: string | null;
}

export const useGames = (genre?: string, search?: string): UseGamesReturn => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortController pour cleanup
    const controller = new AbortController();

    const loadGames = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchGames(genre, search);

        // Vérifier si le composant est toujours monté
        if (!controller.signal.aborted) {
          setGames(data.results);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Failed to load games");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadGames();

    // Cleanup function
    return () => controller.abort();
  }, [genre, search]); // Relancer si genre ou search change

  return { games, loading, error };
};
```

**Points clés** :
- Gère 3 états : `games`, `loading`, `error`
- `AbortController` pour annuler les requêtes en cours (pas de memory leak)
- Dépendances `[genre, search]` → refetch quand ils changent
- Interface de retour typée avec `UseGamesReturn`

#### 3.2 - BONUS : Créer `src/hooks/useGenres.ts`

Même logique pour les genres :

```typescript
import { useState, useEffect } from "react";
import type { Genre } from "../types/game";
import { fetchGenres } from "../services/api";

interface UseGenresReturn {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

export const useGenres = (): UseGenresReturn => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        if (!controller.signal.aborted) {
          setGenres(data.results);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Failed to load genres");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadGenres();
    return () => controller.abort();
  }, []); // Charge une seule fois

  return { genres, loading, error };
};
```

---

### Étape 4 : Composant GameCard

#### 4.1 - Créer `src/components/GameCard.tsx`

Ce composant affiche UN jeu sous forme de carte :

```tsx
import type { Game } from "../types/game";
import styles from "./GameCard.module.css";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  // Gérer les jeux sans image
  const imageUrl = game.background_image || "/placeholder.png";

  // Afficher les étoiles en fonction de la note
  const renderStars = () => {
    const stars = Math.round(game.rating); // 4.47 → 4 étoiles
    return "⭐".repeat(stars);
  };

  // Formater la date (2013-09-17 → Sep 2013)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt={game.name}
        className={styles.image}
        onError={(e) => {
          // Fallback si l'image ne charge pas
          e.currentTarget.src = "/placeholder.png";
        }}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{game.name}</h3>

        <div className={styles.rating}>
          {renderStars()} <span className={styles.ratingValue}>{game.rating}</span>
        </div>

        <div className={styles.genres}>
          {game.genres.map((genre) => (
            <span key={genre.id} className={styles.genre}>
              {genre.name}
            </span>
          ))}
        </div>

        {game.released && (
          <div className={styles.date}>Released: {formatDate(game.released)}</div>
        )}
      </div>
    </div>
  );
};
```

#### 4.2 - Créer `src/components/GameCard.module.css`

```css
.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content {
  padding: 16px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1a1a1a;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
}

.ratingValue {
  color: #666;
  font-weight: 500;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.genre {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.date {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}
```

**Points clés** :
- Props typées avec interface
- Gestion d'image par défaut avec `onError`
- CSS Modules pour éviter les conflits
- Affichage conditionnel avec `&&`

---

### Étape 5 : Composants de filtrage

#### 5.1 - Créer `src/components/SearchBar.tsx`

```tsx
import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search games..." }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  // Debounce : attendre 500ms après la dernière frappe
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(inputValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, onSearch]);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      {inputValue && (
        <button
          onClick={() => setInputValue("")}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};
```

#### 5.2 - Créer `src/components/SearchBar.module.css`

```css
.searchBar {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #1976d2;
}

.clearButton {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
}

.clearButton:hover {
  color: #333;
}
```

#### 5.3 - Créer `src/components/GenreFilter.tsx`

```tsx
import { useGenres } from "../hooks/useGenres";
import styles from "./GenreFilter.module.css";

interface GenreFilterProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export const GenreFilter = ({ selectedGenre, onGenreChange }: GenreFilterProps) => {
  const { genres, loading, error } = useGenres();

  if (loading) return <div className={styles.loading}>Loading genres...</div>;
  if (error) return <div className={styles.error}>Failed to load genres</div>;

  return (
    <div className={styles.genreFilter}>
      <button
        className={selectedGenre === "" ? styles.active : ""}
        onClick={() => onGenreChange("")}
      >
        All Games
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={selectedGenre === genre.slug ? styles.active : ""}
          onClick={() => onGenreChange(genre.slug)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};
```

#### 5.4 - Créer `src/components/GenreFilter.module.css`

```css
.genreFilter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.genreFilter button {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.genreFilter button:hover {
  border-color: #1976d2;
  background: #e3f2fd;
}

.genreFilter button.active {
  background: #1976d2;
  color: white;
  border-color: #1976d2;
}

.loading,
.error {
  padding: 16px;
  text-align: center;
  color: #666;
}

.error {
  color: #d32f2f;
}
```

---

### Étape 6 : Composant GameList

#### 6.1 - Créer `src/components/GameList.tsx`

C'est le composant principal qui orchestre tout :

```tsx
import { useState } from "react";
import { useGames } from "../hooks/useGames";
import { GameCard } from "./GameCard";
import { GenreFilter } from "./GenreFilter";
import { SearchBar } from "./SearchBar";
import styles from "./GameList.module.css";

export const GameList = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { games, loading, error } = useGames(selectedGenre, searchQuery);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Game Library</h1>
        <SearchBar onSearch={setSearchQuery} placeholder="Search games..." />
      </header>

      <GenreFilter selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />

      {loading && <div className={styles.loading}>Loading games...</div>}

      {error && <div className={styles.error}>Error: {error}</div>}

      {!loading && !error && games.length === 0 && (
        <div className={styles.empty}>No games found. Try a different search or genre.</div>
      )}

      {!loading && !error && games.length > 0 && (
        <div className={styles.grid}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};
```

#### 6.2 - Créer `src/components/GameList.module.css`

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 48px 24px;
  font-size: 18px;
  color: #666;
}

.error {
  color: #d32f2f;
  background: #ffebee;
  border-radius: 8px;
}

.empty {
  color: #757575;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
```

**Points clés** :
- 2 states locaux : `selectedGenre` et `searchQuery`
- Hook `useGames` réagit aux changements
- Gestion des 4 états : loading, error, empty, success
- Grid CSS responsive

---

### Étape 7 : Internationalisation

#### 7.1 - Créer `src/locales/fr.json`

```json
{
  "header": {
    "title": "Bibliothèque de jeux",
    "search": "Rechercher des jeux..."
  },
  "filters": {
    "allGames": "Tous les jeux",
    "loadingGenres": "Chargement des genres...",
    "genresError": "Échec du chargement des genres"
  },
  "gameCard": {
    "released": "Sorti le"
  },
  "states": {
    "loading": "Chargement des jeux...",
    "error": "Erreur",
    "noGames": "Aucun jeu trouvé. Essayez une autre recherche ou un autre genre."
  },
  "language": {
    "french": "Français",
    "english": "English"
  }
}
```

#### 7.2 - Créer `src/locales/en.json`

```json
{
  "header": {
    "title": "Game Library",
    "search": "Search games..."
  },
  "filters": {
    "allGames": "All Games",
    "loadingGenres": "Loading genres...",
    "genresError": "Failed to load genres"
  },
  "gameCard": {
    "released": "Released"
  },
  "states": {
    "loading": "Loading games...",
    "error": "Error",
    "noGames": "No games found. Try a different search or genre."
  },
  "language": {
    "french": "Français",
    "english": "English"
  }
}
```

#### 7.3 - Créer `src/i18n.ts`

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: "en", // Langue par défaut
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React échappe déjà les valeurs
  },
});

export default i18n;
```

#### 7.4 - Créer `src/components/LanguageSwitcher.tsx`

```tsx
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage} className={styles.button}>
      {i18n.language === "en" ? "🇫🇷 Français" : "🇬🇧 English"}
    </button>
  );
};
```

#### 7.5 - Créer `src/components/LanguageSwitcher.module.css`

```css
.button {
  padding: 8px 16px;
  border: 2px solid #1976d2;
  border-radius: 8px;
  background: white;
  color: #1976d2;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.button:hover {
  background: #1976d2;
  color: white;
}
```

#### 7.6 - Mettre à jour `src/components/GameList.tsx`

Ajoutez `useTranslation` et utilisez `t()` :

```tsx
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const GameList = () => {
  const { t } = useTranslation();
  // ... reste du code

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{t("header.title")}</h1>
        <LanguageSwitcher />
        <SearchBar onSearch={setSearchQuery} placeholder={t("header.search")} />
      </header>

      {/* ... */}

      {loading && <div className={styles.loading}>{t("states.loading")}</div>}
      {error && <div className={styles.error}>{t("states.error")}: {error}</div>}
      {!loading && !error && games.length === 0 && (
        <div className={styles.empty}>{t("states.noGames")}</div>
      )}

      {/* ... */}
    </div>
  );
};
```

#### 7.7 - Mettre à jour les autres composants

Faites de même pour `GenreFilter.tsx` et `GameCard.tsx`.

---

### Étape 8 : Composant App et point d'entrée

#### 8.1 - Mettre à jour `src/App.tsx`

```tsx
import { GameList } from "./components/GameList";
import "./App.css";
import "./i18n"; // Important : initialiser i18n

function App() {
  return (
    <div className="App">
      <GameList />
    </div>
  );
}

export default App;
```

#### 8.2 - Mettre à jour `src/App.css`

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
  color: #1a1a1a;
}

.App {
  min-height: 100vh;
}
```

#### 8.3 - `src/main.tsx` reste inchangé

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

### Étape 9 : Tester l'application

```bash
npm run dev
```

#### Checklist de test :

- [ ] L'application démarre sans erreur
- [ ] Les jeux s'affichent dans une grille
- [ ] Les images se chargent correctement
- [ ] La recherche fonctionne (avec debounce de 500ms)
- [ ] Le filtre par genre fonctionne
- [ ] Le changement de langue fonctionne
- [ ] Le loading state s'affiche pendant le chargement
- [ ] Les erreurs sont gérées (testez en coupant le réseau)
- [ ] L'application est responsive (testez sur mobile)
- [ ] Pas d'erreur TypeScript dans la console

---

## 🎁 Fonctionnalités BONUS (si vous avez le temps)

### BONUS 1 : Dark Mode

Ajoutez un ThemeContext comme dans l'exercice 20.

### BONUS 2 : Tri des jeux

Ajoutez un select pour trier par :
- Note (rating)
- Date de sortie (released)
- Nom (alphabétique)

```tsx
const [sortBy, setSortBy] = useState<"rating" | "released" | "name">("rating");

const sortedGames = useMemo(() => {
  const sorted = [...games];
  if (sortBy === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "released") {
    sorted.sort((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime());
  } else if (sortBy === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  return sorted;
}, [games, sortBy]);
```

### BONUS 3 : Pagination

L'API RAWG renvoie `next` et `previous` pour la pagination :

```tsx
const [page, setPage] = useState(1);
const { games, loading, error, hasNext } = useGames(selectedGenre, searchQuery, page);

<button onClick={() => setPage(p => p + 1)} disabled={!hasNext}>
  Load More
</button>
```

### BONUS 4 : Modal détail du jeu

Au clic sur une carte, ouvrir une modal avec plus d'informations :
- Description
- Plateformes
- Screenshots
- Stores (Steam, etc.)

### BONUS 5 : Favoris

Sauvegarder des jeux en favoris dans `localStorage` :

```tsx
const [favorites, setFavorites] = useState<number[]>(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});

const toggleFavorite = (gameId: number) => {
  setFavorites(prev => {
    const newFavorites = prev.includes(gameId)
      ? prev.filter(id => id !== gameId)
      : [...prev, gameId];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    return newFavorites;
  });
};
```

---

## ⚠️ Problèmes courants et solutions

### 🔴 "L'API ne répond pas" ou erreur CORS

**Cause** : Clé API manquante ou invalide

**Solution** :
```bash
# Vérifier que la clé est dans .env
cat .env

# Vérifier qu'elle est accessible
# Dans n'importe quel composant :
console.log("API Key:", import.meta.env.VITE_RAWG_API_KEY);
```

Si `undefined`, vérifiez :
1. Le fichier `.env` existe à la racine
2. La variable commence par `VITE_`
3. Vous avez redémarré le serveur dev après avoir créé `.env`

### 🔴 "Cannot find module './GameCard.module.css'"

**Cause** : TypeScript ne reconnaît pas les CSS Modules

**Solution** : Créer `src/vite-env.d.ts` :

```typescript
/// <reference types="vite/client" />

// Déclaration pour les CSS Modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
```

### 🔴 "Les images ne s'affichent pas"

**Cause** : Certains jeux n'ont pas d'image

**Solution** : Ajoutez un placeholder dans `public/placeholder.png` et utilisez `onError` :

```tsx
<img
  src={game.background_image || "/placeholder.png"}
  onError={(e) => {
    e.currentTarget.src = "/placeholder.png";
  }}
/>
```

### 🔴 "La recherche déclenche trop de requêtes"

**Cause** : Pas de debounce

**Solution** : Implémentez le debounce dans SearchBar (voir Étape 5.1)

### 🔴 "Warning: Can't perform a React state update on an unmounted component"

**Cause** : Requête qui se termine après le unmount du composant

**Solution** : Utilisez `AbortController` dans votre hook (voir Étape 3.1)

### 🔴 "Re-renders infinis"

**Cause** : Dépendance instable dans useEffect

**Solution** :
```tsx
// ❌ Mauvais : onSearch est une nouvelle fonction à chaque render
useEffect(() => {
  onSearch(debouncedValue);
}, [debouncedValue, onSearch]);

// ✅ Bon : Wrap onSearch avec useCallback dans le parent
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query);
}, []);
```

---

## 📚 Ressources utiles

- **API RAWG Documentation** : https://rawg.io/apidocs
- **React DevTools** : Extension pour debugger (Chrome/Firefox)
- **TypeScript Handbook** : https://www.typescriptlang.org/docs/
- **i18next Documentation** : https://www.i18next.com/
- **Vite Environment Variables** : https://vitejs.dev/guide/env-and-mode.html

---

## 🏆 Critères d'auto-évaluation

| Critère | Points | Votre note |
|---------|--------|------------|
| ✅ L'app affiche une liste de jeux | 15 | /15 |
| ✅ Les images s'affichent correctement | 10 | /10 |
| ✅ Le filtre par genre fonctionne | 15 | /15 |
| ✅ La recherche fonctionne avec debounce | 15 | /15 |
| ✅ L'internationalisation (FR/EN) fonctionne | 10 | /10 |
| ✅ Gestion du loading et des erreurs | 10 | /10 |
| ✅ Code propre et bien typé (TypeScript) | 15 | /15 |
| ✅ Utilisation de custom hooks | 10 | /10 |
| 🎁 Bonus implémentés | +10-30 | /30 |
| **TOTAL** | **/100** | **/130** |

---

## 🎉 Félicitations !

Si vous avez réussi cet exercice, vous avez démontré que vous maîtrisez :

- ✅ Création d'un projet React moderne (Vite + TypeScript)
- ✅ Intégration d'API REST avec gestion d'erreurs
- ✅ Custom hooks réutilisables
- ✅ Gestion d'état avec useState et useEffect
- ✅ Composants React bien structurés
- ✅ CSS Modules
- ✅ Internationalisation (i18n)
- ✅ Cleanup et optimisation

**Vous êtes prêt à travailler sur des projets React professionnels !** 🚀

---

## 📁 Solution de référence

Une solution complète est disponible dans le dossier `final/` (à ne consulter qu'en dernier recours !).

Pour la comparer avec votre code :
```bash
# Voir la solution
cd final
npm install
npm run dev
```

**Conseil** : N'ouvrez la solution que si vous êtes vraiment bloqué. Essayez d'abord de résoudre par vous-même !
