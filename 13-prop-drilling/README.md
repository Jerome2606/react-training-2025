# Prop Drilling : le problème et les solutions

Le **prop drilling** (ou "threading") est le fait de passer des props à travers plusieurs niveaux de composants, même si les composants intermédiaires n'en ont pas besoin.

## Le problème

```
App (user) 
  → Header (user)      ← n'utilise pas user, juste le passe
    → Navbar (user)    ← n'utilise pas user, juste le passe
      → UserMenu (user) ← utilise finalement user!
```

## Fichiers

- `PropDrillingProblem.tsx` - Exemple du problème
- `PropDrillingSolution.tsx` - Solution avec useContext
- `CompositionSolution.tsx` - Solution alternative avec composition

## Solutions

1. **Context API** (useContext) - Pour l'état global
2. **Composition** - Passer des composants plutôt que des données
3. **State management** - Redux, Zustand, Jotai...

## Quand utiliser quoi ?

| Situation | Solution recommandée |
|-----------|---------------------|
| 2-3 niveaux | Props (acceptable) |
| État global (theme, auth) | Context API |
| UI flexible | Composition |
| État complexe | State management |
