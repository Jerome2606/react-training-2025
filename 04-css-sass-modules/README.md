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

**Le problème :**
```css
/* styles.css */
.button { background: blue; }

/* Autre fichier, autre dev... */
.button { background: red; }  /* Conflit! */
```

### 2. CSS Modules
```jsx
import styles from './Button.module.css';
<button className={styles.button}>Click</button>
```

**Avantages :** Isolation automatique, pas de conflits
**Limitations :** Pas de variables partagées, duplication de code

### 3. SASS/SCSS
```jsx
import './Card.scss';
<div className="card">...</div>
```

**Avantages :** Variables globales, mixins, nesting
**Limitations :** Pas d'isolation, risque de conflits CSS

### 4. **SASS Modules (Hybride) (RECOMMANDÉ)**
```jsx
import styles from './Card.module.scss';
<div className={styles.card}>...</div>
```

**Meilleur des deux mondes :**
- ✅ Variables/mixins SASS globaux (`$primary`, `@include card-style`)
- ✅ Encapsulation CSS Modules (pas de conflits)
- ✅ Nesting, fonctions, et toute la puissance de SASS
- ✅ Type-safety avec TypeScript

**Exemple :**
```scss
// Card.module.scss
@import "./variables.scss";

.card {
  @include card-style;        // Mixin global
  background: $primary;        // Variable globale
  // Style automatiquement scopé!
}
```

### 5. CSS-in-JS (styled-components, Emotion)
```jsx
const Button = styled.button`
  background: blue;
`;
```

## Comparaison détaillée

| Approche | Variables partagées | Isolation | Mixins/Nesting | Verdict |
|----------|---------------------|-----------|----------------|---------|
| CSS Global | ❌ | ❌ | ❌ | À éviter |
| CSS Modules | ❌ | ✅ | ❌ | Bien pour petits projets |
| SASS | ✅ | ❌ | ✅ | Risque de conflits |
| **SASS Modules** | ✅ | ✅ | ✅ | **🏆 Meilleur choix** |
| CSS-in-JS | ✅ | ✅ | ⚠️ | Bundle plus lourd |

## Exemple concret : Pourquoi l'hybride?

### Problème avec CSS Modules pur
```css
/* Button.module.css */
.button {
  padding: 12px 24px;  /* Duplication */
  border-radius: 8px;  /* Duplication */
  color: #61dafb;      /* Couleur en dur */
}

/* Card.module.css */
.card {
  padding: 24px;       /* Duplication de valeurs */
  border-radius: 8px;  /* Encore la même valeur! */
  color: #61dafb;      /* Couleur dupliquée */
}
```

### Solution avec SASS Modules
```scss
// variables.scss - Source unique de vérité
$primary: #61dafb;
$spacing-md: 16px;
$border-radius-md: 8px;

// Button.module.scss
@import "./variables.scss";
.button {
  padding: $spacing-md;
  border-radius: $border-radius-md;
  color: $primary;
  // Styles scopés automatiquement!
}

// Card.module.scss
@import "./variables.scss";
.card {
  padding: $spacing-md * 1.5;
  border-radius: $border-radius-md;
  background: $primary;
  // Styles scopés automatiquement!
}
```

## Installation SASS

```bash
npm install -D sass
```

Les fichiers `.module.scss` fonctionnent automatiquement avec Vite/Webpack sans configuration supplémentaire!
