# Composants React

Les composants sont les briques de base de React.

## Types de composants

### 1. Composants fonctionnels (standard actuel)
```tsx
const MyComponent = () => {
  return <div>Hello</div>;
};
```

### 2. Composants avec props
```tsx
const Greeting = ({ name }: { name: string }) => {
  return <div>Hello {name}</div>;
};
```

## Fichiers

- `FunctionalComponents.tsx` - Composants fonctionnels
- `PropsAndChildren.tsx` - Props et children
- `ComponentComposition.tsx` - Composition de composants
- `PureComponents.tsx` - Composants purs et mémoïsation
