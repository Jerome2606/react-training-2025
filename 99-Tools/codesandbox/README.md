# 🎮 React Playground - Local CodeSandbox

Un environnement local pour tester rapidement vos composants React avec console intégrée.

## 🚀 Installation

```bash
cd 99-Tools/codesandbox
npm install
```

## 💻 Utilisation

### 1. Démarrer le playground

```bash
npm run dev
```

Le navigateur s'ouvrira automatiquement sur `http://localhost:3000`

### 2. Tester un composant

Ouvrez [src/main.tsx](src/main.tsx) et modifiez le composant à tester :

#### Option A : Importer depuis un autre dossier

```tsx
// Importez depuis n'importe quel dossier de la formation
import { Counter } from '../../../10-usestate/Counter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground>
      <Counter />
    </Playground>
  </StrictMode>,
)
```

#### Option B : Copier-coller directement

```tsx
// Copiez-collez votre composant directement dans main.tsx
const MonComposant = () => {
  const [count, setCount] = useState(0);

  console.log('Render avec count:', count);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground>
      <MonComposant />
    </Playground>
  </StrictMode>,
)
```

### 3. Observer les logs

- **Panneau gauche** : Rendu de votre composant
- **Panneau droit** : Console avec tous les `console.log()`, `console.warn()`, etc.

## ✨ Fonctionnalités

- ✅ Split view (composant + console)
- ✅ Hot reload automatique
- ✅ Capture tous les console.log/warn/error/info
- ✅ Timestamps sur chaque log
- ✅ Bouton "Clear" pour vider la console
- ✅ Auto-scroll vers le dernier log
- ✅ Support TypeScript
- ✅ Coloration syntaxique des logs

## 📝 Exemples d'utilisation

### Tester Counter.tsx

```tsx
import { Counter } from '../../../10-usestate/Counter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground>
      <Counter />
    </Playground>
  </StrictMode>,
)
```

### Tester Form.tsx

```tsx
import { Form } from '../../../10-usestate/Form';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground>
      <Form />
    </Playground>
  </StrictMode>,
)
```

### Tester TodoList.tsx

```tsx
import { TodoList } from '../../../10-usestate/TodoList';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground>
      <TodoList />
    </Playground>
  </StrictMode>,
)
```

### Tester un composant avec props

```tsx
// Composant avec paramètres
export const UserDetail = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching user with ID:', userId);
    // Simuler un fetch
    setTimeout(() => {
      setUser(`User #${userId}`);
    }, 1000);
  }, [userId]);

  return (
    <div>
      <h2>User Detail</h2>
      {user ? <p>{user}</p> : <p>Loading...</p>}
    </div>
  );
};

// Passer les props au composant
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground>
      <UserDetail userId={42} />
    </Playground>
  </StrictMode>,
)
```

### Tester plusieurs instances du même composant

```tsx
import { Counter } from '../../../10-usestate/Counter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Counter />
        <Counter />
        <Counter />
      </div>
    </Playground>
  </StrictMode>,
)
```

## 🎯 Astuces

1. **Debugger avec console.log** : Ajoutez des logs dans vos composants pour comprendre le cycle de vie
2. **Comparer valeurs** : Loggez les valeurs avant/après les setState
3. **Tester rapidement** : Pas besoin de créer une app complète pour tester un composant

## ⚠️ StrictMode et double-render

Par défaut, le playground **désactive StrictMode** pour faciliter l'apprentissage du cycle de vie.

### Pourquoi StrictMode double les renders ?

En développement, React's StrictMode **double intentionnellement** :
- Les appels de fonctions de composant
- Les initialisations de `useState`
- Les montages/démontages (MOUNT → UNMOUNT → MOUNT)

**C'est une feature**, pas un bug ! Ça aide à détecter :
- Les effets de bord non intentionnels
- Les problèmes de cleanup
- Les comportements qui causeraient des bugs en production

### Comment gérer StrictMode ?

Dans [src/main.tsx](src/main.tsx), changez la constante :

```tsx
// Désactivé par défaut pour l'apprentissage
const USE_STRICT_MODE = false;

// Activez pour voir le comportement en StrictMode
const USE_STRICT_MODE = true;
```

### Exemple : Logs avec StrictMode

**StrictMode OFF** (défaut) :
```
🔵 [App] RENDER
🟢 [Child] MOUNT
```

**StrictMode ON** :
```
🔵 [App] RENDER  ← Premier render
🔵 [App] RENDER  ← Second render (StrictMode)
🟢 [Child] MOUNT
🔴 [Child] UNMOUNT  ← Test du cleanup
🟢 [Child] MOUNT    ← Remontage
```

💡 **En production, StrictMode ne double jamais les renders** - c'est uniquement en développement !

## 🛠️ Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build pour la production
- `npm run preview` - Prévisualise le build de production

## 💡 Exemple pré-configuré

Le playground vient avec un exemple de Counter qui montre :
- Comment useState fonctionne
- Quand les re-renders se produisent
- Pourquoi setState est asynchrone

Modifiez simplement [src/main.tsx](src/main.tsx) pour tester vos propres composants !
