// example.ts - TypeScript (typage statique)

// Définition du type User
type User = {
  name: string;
  age: number;
};

// TypeScript vérifie la structure
const userTs: User = { name: "Alice", age: 30 };

// ❌ Erreur de compilation:
//userTs.name = 123; // Type 'number' is not assignable to type 'string'

function greetTs(person: User): string {
  // TypeScript garantit que person a name et age
  return `Bonjour ${person.name}, tu as ${person.age} ans`;
}

// ✅ Fonctionne
console.log(greetTs(userTs));

// ❌ Erreur de compilation:
//greetTs({ name: "Bob" }); // Property 'age' is missing

//userTs.

// Interface pour les items du panier
interface CartItem {
  name: string;
  price: number; // Doit être un nombre!
}

function calculateTotalTs(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

const cartTs: CartItem[] = [
  { name: "Livre", price: 20 },
  // ❌ Erreur de compilation:
  // { name: "Stylo", price: "5" }, // Type 'string' is not assignable to type 'number'
  { name: "Stylo", price: 5 }, // ✅ Correct
];

console.log("Total:", calculateTotalTs(cartTs)); // 25 - toujours correct!

// Types avancés
type Role = "admin" | "user" | "guest"; // Union type

interface Employee extends User {
  role: Role;
  department?: string; // Propriété optionnelle
}

const employee: Employee = {
  name: "Charlie",
  age: 28,
  role: "admin",
};

// Generics
function getFirst<T>(arr: T[]): T | undefined {
  return arr ? arr[0] : undefined;
}

const firstNumber = getFirst([1, 2, 3]); // Type: number | undefined
const firstString = getFirst(["a", "b"]); // Type: string | undefined
const firstEmpty = getFirst([]); // Type: empty | undefined
const firstUndefined = getFirst(undefined); // Type: undefined

console.log({ employee, firstNumber, firstString, firstEmpty, firstUndefined });
