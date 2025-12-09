// TodoList.tsx - Gestion d'état avec tableaux
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Apprendre React", completed: true },
    { id: 2, text: "Créer une app", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // ✅ Ajouter - utiliser spread ou concat
  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    // Option 1: spread operator
    setTodos([...todos, todo]);

    // Option 2: concat
    // setTodos(prev => prev.concat(todo));

    setNewTodo("");
  };

  // ✅ Modifier - utiliser map
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ✅ Supprimer - utiliser filter
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ✅ Modifier le texte
  const updateTodoText = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Statistiques
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div>
      <h2>Todo List</h2>

      {/* Formulaire d'ajout */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nouvelle tâche..."
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Ajouter</button>
      </div>

      {/* Liste des todos */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              borderBottom: "1px solid #eee",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#999" : "inherit",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ color: "red" }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Statistiques */}
      <p>
        {completedCount}/{totalCount} tâches complétées
      </p>
    </div>
  );
};

// ❌ Ce qu'il ne faut PAS faire
const WrongWay = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const wrongAdd = () => {
    // ❌ Mutation directe - NE PAS FAIRE
    // items.push(4);
    // setItems(items);
  };

  const wrongDelete = () => {
    // ❌ Mutation directe - NE PAS FAIRE
    // items.splice(0, 1);
    // setItems(items);
  };

  return null;
};
