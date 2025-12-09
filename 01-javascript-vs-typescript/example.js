// example.js - JavaScript (typage dynamique)

// Pas de typage explicite - tout est permis
const user = { name: "Alice", age: 30 };

// Cette erreur ne sera détectée qu'à l'exécution
//user.name = 123; // Pas d'erreur à l'écriture!

function greet(person) {
  // Aucune garantie sur la structure de person
  return `Bonjour ${person.name}, tu as ${person.age} ans`;
}

// Fonctionne
console.log(greet(user));

// Fonctionne aussi mais peut causer des bugs
console.log(greet({ name: "Bob" })); // age sera undefined

// Exemple de bug silencieux
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

const cart = [
  { name: "Livre", price: 20 },
  { name: "Stylo", price: "5" }, // Bug: string au lieu de number!
];

console.log("Total:", calculateTotal(cart)); // "205" au lieu de 25!
