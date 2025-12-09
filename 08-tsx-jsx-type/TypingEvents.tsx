// TypingEvents.tsx - Typer les événements React

import { useState } from "react";

// ============================================================
// ÉVÉNEMENTS DE FORMULAIRE
// ============================================================

const FormEvents = () => {
  const [value, setValue] = useState("");

  // ChangeEvent pour les inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log("Type:", event.target.type);
    console.log("Name:", event.target.name);
  };

  // ChangeEvent pour les textarea
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Textarea:", event.target.value);
  };

  // ChangeEvent pour les select
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected:", event.target.value);
  };

  // FormEvent pour la soumission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with:", value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={value}
        onChange={handleInputChange}
      />

      <textarea onChange={handleTextareaChange} />

      <select onChange={handleSelectChange}>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </select>

      <button type="submit">Envoyer</button>
    </form>
  );
};

// ============================================================
// ÉVÉNEMENTS DE SOURIS
// ============================================================

const MouseEvents = () => {
  // MouseEvent avec l'élément cible
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Clicked at:", event.clientX, event.clientY);
    console.log("Button:", event.button); // 0 = gauche, 1 = milieu, 2 = droite
  };

  const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Empêcher la propagation
    event.stopPropagation();
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Mouse entered");
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Mouse left");
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button onClick={handleClick}>Cliquez-moi</button>
      <div onClick={handleDivClick}>Zone cliquable</div>
    </div>
  );
};

// ============================================================
// ÉVÉNEMENTS DE CLAVIER
// ============================================================

const KeyboardEvents = () => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Key pressed:", event.key);
    console.log("Key code:", event.code);

    // Touches spéciales
    if (event.key === "Enter") {
      console.log("Enter pressed!");
      event.preventDefault();
    }

    // Combinaisons
    if (event.ctrlKey && event.key === "s") {
      console.log("Ctrl+S pressed!");
      event.preventDefault();
    }

    // Vérifications courantes
    if (event.altKey) console.log("Alt is held");
    if (event.shiftKey) console.log("Shift is held");
    if (event.metaKey) console.log("Cmd/Win is held");
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Key released:", event.key);
  };

  return (
    <input
      type="text"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      placeholder="Tapez quelque chose..."
    />
  );
};

// ============================================================
// ÉVÉNEMENTS DE FOCUS
// ============================================================

const FocusEvents = () => {
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log("Input focused");
    event.target.style.borderColor = "blue";
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log("Input blurred");
    event.target.style.borderColor = "";
  };

  return (
    <input
      type="text"
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Focus me"
    />
  );
};

// ============================================================
// ÉVÉNEMENTS DE DRAG & DROP
// ============================================================

const DragEvents = () => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", "Dragged data");
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Nécessaire pour autoriser le drop
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    console.log("Dropped:", data);
  };

  return (
    <div>
      <div draggable onDragStart={handleDragStart}>
        Glissez-moi
      </div>
      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        Zone de dépôt
      </div>
    </div>
  );
};

// ============================================================
// HANDLER TYPÉ DANS LES PROPS
// ============================================================

interface SearchInputProps {
  onSearch: (query: string) => void;
  onClear?: () => void;
}

const SearchInput = ({ onSearch, onClear }: SearchInputProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={handleChange} />
      <button type="submit">Rechercher</button>
      <button type="button" onClick={handleClear}>
        Effacer
      </button>
    </form>
  );
};

// ============================================================
// RÉSUMÉ DES TYPES D'ÉVÉNEMENTS
// ============================================================

/*
React.ChangeEvent<HTMLInputElement>     - onChange input
React.ChangeEvent<HTMLTextAreaElement>  - onChange textarea
React.ChangeEvent<HTMLSelectElement>    - onChange select
React.FormEvent<HTMLFormElement>        - onSubmit form
React.MouseEvent<HTMLButtonElement>     - onClick, onMouseEnter, etc.
React.KeyboardEvent<HTMLInputElement>   - onKeyDown, onKeyUp, onKeyPress
React.FocusEvent<HTMLInputElement>      - onFocus, onBlur
React.DragEvent<HTMLDivElement>         - onDrag, onDrop, onDragOver
React.TouchEvent<HTMLDivElement>        - onTouchStart, onTouchEnd
React.WheelEvent<HTMLDivElement>        - onWheel
React.ClipboardEvent<HTMLInputElement>  - onCopy, onPaste, onCut
*/

export {
  FormEvents,
  MouseEvents,
  KeyboardEvents,
  FocusEvents,
  DragEvents,
  SearchInput,
};
