// ImperativeVsDeclarative.tsx - Comparaison des approches

// ============================================================
// APPROCHE IMPÉRATIVE (style jQuery/vanilla JS)
// ============================================================
// On dit au navigateur COMMENT faire, étape par étape

/*
// Code jQuery/vanilla équivalent :
function updateCounterImperative() {
  const counter = document.getElementById('counter');
  const button = document.getElementById('increment');
  let count = 0;
  
  button.addEventListener('click', function() {
    count++;
    counter.textContent = count;
    
    if (count > 10) {
      counter.style.color = 'red';
    }
    
    if (count === 5) {
      const warning = document.createElement('p');
      warning.textContent = 'Attention!';
      warning.id = 'warning';
      document.body.appendChild(warning);
    }
    
    if (count > 5) {
      const warning = document.getElementById('warning');
      if (warning) warning.remove();
    }
  });
}
*/

// ============================================================
// APPROCHE DÉCLARATIVE (React)
// ============================================================
// On décrit CE QUE l'on veut voir, React s'occupe du COMMENT

import { useState } from "react";

export const CounterDeclarative = () => {
  const [count, setCount] = useState(0);

  // On DÉCRIT l'UI en fonction de l'état
  // React calcule automatiquement les changements nécessaires
  return (
    <div>
      {/* La couleur est déclarative : dépend de count */}
      <p style={{ color: count > 10 ? "red" : "black" }}>
        Compteur: {count}
      </p>

      {/* Le warning apparaît/disparaît déclarativement */}
      {count === 5 && <p>Attention!</p>}

      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
};

// ============================================================
// COMPARAISON LISTE
// ============================================================

// Impératif : on manipule le DOM directement
/*
function addItemImperative(item) {
  const ul = document.getElementById('list');
  const li = document.createElement('li');
  li.textContent = item.name;
  li.id = `item-${item.id}`;
  ul.appendChild(li);
}

function removeItemImperative(id) {
  const li = document.getElementById(`item-${id}`);
  if (li) li.remove();
}

function updateItemImperative(id, newName) {
  const li = document.getElementById(`item-${id}`);
  if (li) li.textContent = newName;
}
*/

// Déclaratif : on décrit l'état, React gère le DOM
interface Item {
  id: number;
  name: string;
}

export const ListDeclarative = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Premier" },
    { id: 2, name: "Deuxième" },
  ]);

  const addItem = () => {
    // On décrit le NOUVEL état
    setItems([...items, { id: Date.now(), name: `Item ${items.length + 1}` }]);
  };

  const removeItem = (id: number) => {
    // On décrit le NOUVEL état (sans l'item)
    setItems(items.filter((item) => item.id !== id));
  };

  // React compare l'ancien et le nouveau rendu
  // et applique SEULEMENT les changements nécessaires
  return (
    <div>
      <button onClick={addItem}>Ajouter</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => removeItem(item.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ============================================================
// AVANTAGES DU DÉCLARATIF
// ============================================================
//
// 1. PRÉVISIBLE : L'UI est une fonction de l'état
//    UI = f(state)
//
// 2. MAINTENABLE : Pas besoin de suivre les mutations du DOM
//
// 3. TESTABLE : On peut tester l'état sans le DOM
//
// 4. PERFORMANT : React optimise les mises à jour (Virtual DOM)
//
// ============================================================
