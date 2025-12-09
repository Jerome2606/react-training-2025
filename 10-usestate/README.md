# useState : gérer l'état local

useState est le hook fondamental pour gérer l'état dans un composant React.

## Syntaxe de base

```tsx
const [state, setState] = useState(initialValue);
```

## Fichiers

- `Counter.tsx` - Compteur simple
- `Form.tsx` - Formulaire avec état
- `TodoList.tsx` - Liste avec état tableau
- `AdvancedPatterns.tsx` - Patterns avancés

## Points clés

1. **Immutabilité** : Ne jamais modifier l'état directement
2. **Mise à jour fonctionnelle** : `setState(prev => prev + 1)`
3. **Objets** : Toujours spread `setState(prev => ({ ...prev, key: value }))`
4. **Tableaux** : Utiliser `map`, `filter`, `concat` (pas `push`, `pop`)
