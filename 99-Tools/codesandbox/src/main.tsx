import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Playground } from './Playground'



// ===============================================
// 📝 COLLEZ VOTRE COMPOSANT ICI
// ===============================================

// Exemple: importez Counter depuis le dossier 10-usestate
//  import { Counter } from '../../../10-usestate/Counter'
// import { Form } from '../../../10-usestate/Form';
// import { TodoList } from '../../../10-usestate/TodoList';
// import { UserDetail } from '../../../11-useeffect/FetchData';
// import { UserList } from '../../../11-useeffect/FetchData';
// import { SearchWithDebounce } from '../../../11-useeffect/Timer';
// import { LifecycleDemo } from '../../../12-cycle-de-vie/LifecycleDemo';
// import {AppExample} from '../../../14-usecontext/ThemeContext';

// import '../../../16-i18n/i18n'; // Initialize i18n
// import { TranslatedComponent } from '../../../16-i18n/TranslatedComponent';

// Importer et rendre l'un des composants :
//      - `<ShoppingCartUnoptimized />` - Pour montrer les problèmes
//      - `<ShoppingCartOptimized />` - Pour montrer les solutions
//      - `<ShoppingCartComparison />` - Pour comparer côte à côte
// import {ShoppingCartUnoptimized} from '../../../19-debug-performance/ShoppingCartDemo';
import {ShoppingCartOptimized} from '../../../19-debug-performance/ShoppingCartDemo';

// Ou copiez-collez directement votre composant ici:
// import { useState } from 'react';

// const Counter = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     console.log('Avant:', count);
//     setCount(count + 1);
//     console.log('Après (dans le handler):', count); // Valeur pas encore mise à jour!
//   };

//   const decrement = () => setCount(count - 1);
//   const reset = () => {
//     console.log('Reset du compteur');
//     setCount(0);
//   };

//   // Log à chaque render
//   console.log('Render - count actuel:', count);

//   return (
//     <div>
//       <h2>Compteur: {count}</h2>
//       <div style={{ display: 'flex', gap: '8px' }}>
//         <button onClick={decrement}>-</button>
//         <button onClick={increment}>+</button>
//         <button onClick={reset}>Reset</button>
//       </div>
//     </div>
//   );
// };

// ===============================================
// 🎯 RENDERISEZ VOTRE COMPOSANT ICI
// ===============================================

// 💡 Conseil: Désactivez StrictMode pour voir le cycle de vie réel sans double-render
// StrictMode double les renders en dev pour détecter les bugs (feature intentionnelle)
const USE_STRICT_MODE = false; // Changez à true pour activer StrictMode

const App = (
  <Playground>
    {
      // <Counter />
      // <Form />
      // <TodoList />
      // <UserDetail userId={1} />
      // <UserList />
      // <SearchWithDebounce />
      // <LifecycleDemo />
      // <AppExample />
      // <TranslatedComponent />
      // <ShoppingCartUnoptimized />
      <ShoppingCartOptimized />
    }
  </Playground>
);

createRoot(document.getElementById('root')!).render(
  USE_STRICT_MODE ? <StrictMode>{App}</StrictMode> : App
)
