# Organisation d'un projet React

Ce dossier présente les bonnes pratiques d'organisation pour un projet React professionnel.

## Structure recommandée

```
src/
├── assets/              # Images, fonts, fichiers statiques
│   ├── images/
│   └── fonts/
├── components/          # Composants réutilisables
│   ├── ui/              # Composants UI génériques (Button, Input, Modal)
│   └── shared/          # Composants partagés métier
├── contexts/            # Context providers
├── hooks/               # Hooks personnalisés
├── pages/               # Composants de pages (un par route)
├── services/            # Appels API, logique métier
├── types/               # Types TypeScript partagés
├── utils/               # Fonctions utilitaires
├── locales/             # Fichiers de traduction
├── styles/              # Styles globaux, variables
├── App.tsx
├── main.tsx
└── i18n.ts
```

## Fichiers

- `structure.md` - Structure détaillée
- `naming-conventions.md` - Conventions de nommage
- `example-component/` - Exemple de composant bien structuré

---

## 📚 Bonnes pratiques vs Anti-patterns

### ✅ À FAIRE

#### 1. Organiser par responsabilité
```
src/
├── components/ui/     # Composants UI réutilisables
├── pages/             # Pages/routes
├── hooks/             # Hooks personnalisés
├── services/          # Logique API
└── utils/             # Fonctions utilitaires
```

#### 2. Utiliser `index.ts` pour regrouper plusieurs exports

**Exemple : Grouper des variantes de composants**
```
components/ui/Button/
├── Button.tsx
├── IconButton.tsx
├── LoadingButton.tsx
└── index.ts
```

```tsx
// components/ui/Button/index.ts
export { Button } from "./Button";
export { IconButton } from "./IconButton";
export { LoadingButton } from "./LoadingButton";
export type { ButtonProps } from "./Button";
```

```tsx
// Import groupé (un seul import pour tout !)
import { Button, IconButton, LoadingButton } from "@/components/ui/Button";

// Utilisation
function MyApp() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Button onClick={() => alert('Clicked!')}>Click me</Button>
      <IconButton icon="search" onClick={() => console.log('Search')} />
      <LoadingButton loading={loading} onClick={handleSubmit}>
        Submit
      </LoadingButton>
    </div>
  );
}
```

**Exemple : Centraliser les composants UI**
```
components/ui/
├── Button.tsx
├── Card.tsx
├── Input.tsx
└── index.ts
```

```tsx
// index.ts
export { Button } from "./Button";
export { Card } from "./Card";
export { Input } from "./Input";
```

```tsx
// Import depuis un seul point d'entrée
import { Button, Card, Input } from "@/components/ui";
```

#### 3. Configurer les alias de chemin

```ts
// vite.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```tsx
// Résultat : imports propres
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
// Au lieu de : import { Button } from "../../../components/ui/Button";
```

#### 4. Colocation des fichiers liés
```
Button/
├── Button.tsx           # Composant
├── Button.module.css    # Styles
├── Button.test.tsx      # Tests
└── index.ts             # Export (si plusieurs exports)
```

#### 5. Conventions de nommage cohérentes

| Type | Convention | Exemple |
|------|------------|---------|
| Composants | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase + `use` | `useAuth.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types | PascalCase | `User.ts` |
| Constantes | SCREAMING_SNAKE | `API_URL` |
| CSS Modules | ComponentName.module.css | `Button.module.css` |

---

### ❌ À ÉVITER

#### 1. Tout mélanger dans le même dossier
```
❌ components/
├── Button.tsx
├── HomePage.tsx        # C'est une page → dans pages/
├── useAuth.ts          # C'est un hook → dans hooks/
├── api.ts              # C'est un service → dans services/
└── formatDate.ts       # C'est un util → dans utils/
```

#### 2. Créer un `index.ts` pour un seul export
```
❌ components/ui/Button/
├── Button.tsx
└── index.ts  # ← INUTILE si Button.tsx exporte uniquement Button

✅ Au lieu de ça :
components/ui/
└── Button.tsx  # Export direct, pas besoin de sous-dossier
```

**Pourquoi ?** L'import `"@/components/ui/Button"` résout automatiquement vers `Button.tsx`. Le fichier `index.ts` n'ajoute rien dans ce cas.

#### 3. Nesting excessif (> 3 niveaux)
```
❌ src/modules/user/features/profile/components/ui/buttons/primary/PrimaryButton.tsx

✅ src/components/ui/Button.tsx
```

#### 4. Fichiers géants (> 300 lignes)
```
❌ UserProfile.tsx (1500 lignes)

✅ Découper en :
   - UserProfile.tsx (composant principal)
   - UserAvatar.tsx (sous-composant)
   - UserStats.tsx (sous-composant)
   - useUserData.ts (hook)
```

#### 5. Chemins relatifs en cascade
```
❌ import { Button } from "../../../components/ui/Button";
❌ import { useAuth } from "../../../../hooks/useAuth";

✅ import { Button } from "@/components/ui/Button";
✅ import { useAuth } from "@/hooks/useAuth";
```

---

## 💡 Exemples concrets

### Quand utiliser `index.ts` ?

#### ✅ CAS 1 : Plusieurs exports liés
```tsx
// components/ui/Button/index.ts
export { Button } from "./Button";
export { IconButton } from "./IconButton";
export { LoadingButton } from "./LoadingButton";

// Utilisation - Un seul import pour les 3 composants !
import { Button, IconButton, LoadingButton } from "@/components/ui/Button";

// Dans votre composant
<div>
  <Button>Submit</Button>
  <IconButton icon="close" />
  <LoadingButton loading={isLoading}>Save</LoadingButton>
</div>
```

#### ✅ CAS 2 : Barrel export pour centraliser
```tsx
// components/ui/index.ts
export { Button } from "./Button";
export { Card } from "./Card";
export { Input } from "./Input";

// Utilisation
import { Button, Card, Input } from "@/components/ui";
```

#### ❌ CAS 3 : Export unique (inutile)
```tsx
// ❌ Ne PAS faire
// components/ui/Button/index.ts
export { Button } from "./Button";

// ✅ Faire à la place
// components/ui/Button.tsx
export const Button = (...) => { ... }
```

---

## 🎯 Checklist pour un projet bien organisé

- [ ] Structure par responsabilité (components, hooks, services, utils)
- [ ] Alias `@/` configuré dans Vite et TypeScript
- [ ] Conventions de nommage cohérentes
- [ ] `index.ts` uniquement pour exports multiples
- [ ] Fichiers < 300 lignes (découper si plus)
- [ ] Maximum 3 niveaux de profondeur
- [ ] Colocation des fichiers liés (composant + styles + tests)
- [ ] Types locaux avec le fichier, types partagés dans `types/`
