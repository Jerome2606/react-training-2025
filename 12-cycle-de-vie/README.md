# Cycle de vie des composants React

Ce dossier illustre les différentes phases du cycle de vie d'un composant React avec des fonctions.

## Phases du cycle de vie

1. **Montage (Mount)** : Le composant est créé et inséré dans le DOM
2. **Mise à jour (Update)** : Le composant re-render suite à un changement de props/state
3. **Démontage (Unmount)** : Le composant est retiré du DOM

## Équivalence Classes → Hooks

| Class Component | Hook équivalent |
|----------------|-----------------|
| `constructor` | `useState` initialisation |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect(() => { return cleanup }, [])` |
| `shouldComponentUpdate` | `React.memo()` |

## Fichiers

- `LifecycleDemo.tsx` - Démonstration complète avec console.log
- `MountUnmount.tsx` - Focus sur montage/démontage
- `UpdateCycle.tsx` - Focus sur les mises à jour
