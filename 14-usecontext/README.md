# useContext : état global

useContext permet de partager des données à travers l'arbre de composants sans prop drilling.

## Cas d'usage

- Thème (dark/light mode)
- Authentification (utilisateur connecté)
- Langue/i18n
- Préférences utilisateur

## Fichiers

- `ThemeContext.tsx` - Context pour le thème
- `AuthContext.tsx` - Context pour l'authentification
- `App.tsx` - Exemple d'utilisation

## Pattern recommandé

1. Créer le context avec `createContext()`
2. Créer un Provider avec état
3. Créer un hook personnalisé `useXxx()`
4. Wrapper l'app avec le Provider
