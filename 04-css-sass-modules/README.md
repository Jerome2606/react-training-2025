# CSS, SASS et modules

Ce dossier illustre les différentes approches de styling en React.

## Fichiers

- `styles/global.css` - CSS global classique
- `styles/Button.module.css` - CSS Module (isolation)
- `styles/variables.scss` - Variables SASS
- `styles/Card.scss` - Composant stylé avec SASS
- `components/Button.tsx` - Utilisation de CSS Modules
- `components/Card.tsx` - Utilisation de SASS

## Approches de styling

### 1. CSS Global
```jsx
import './styles/global.css';
<button className="btn btn-primary">Click</button>
```

### 2. CSS Modules (recommandé)
```jsx
import styles from './Button.module.css';
<button className={styles.button}>Click</button>
```

### 3. SASS/SCSS
```jsx
import './Card.scss';
<div className="card">...</div>
```

### 4. CSS-in-JS (styled-components, Emotion)
```jsx
const Button = styled.button`
  background: blue;
`;
```

## Installation SASS

```bash
npm install -D sass
```
