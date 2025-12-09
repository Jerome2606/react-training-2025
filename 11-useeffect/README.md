# useEffect : effets de bord

useEffect permet de synchroniser un composant avec des systèmes externes.

## Syntaxe

```tsx
useEffect(() => {
  // Code de l'effet
  return () => {
    // Cleanup (optionnel)
  };
}, [dependencies]);
```

## Patterns de dépendances

| Dépendances | Comportement |
|-------------|--------------|
| `[]` | Exécution au montage uniquement |
| `[dep1, dep2]` | Exécution quand dep1 ou dep2 change |
| Aucun tableau | Exécution à chaque render |

## Fichiers

- `FetchData.tsx` - Appel API
- `Timer.tsx` - Intervalle avec cleanup
- `EventListener.tsx` - Écouteurs d'événements
- `LocalStorage.tsx` - Synchronisation avec localStorage
