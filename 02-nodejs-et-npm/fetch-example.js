// fetch-example.js - Appel API avec fetch (Node 18+)

// Node 18+ supporte fetch nativement
async function fetchUsers() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    console.log("Utilisateurs récupérés:");
    users.slice(0, 3).forEach((user) => {
      console.log(`- ${user.name} (${user.email})`);
    });

    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération:", error.message);
  }
}

// Appel POST
async function createPost() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Mon nouveau post",
          body: "Contenu du post...",
          userId: 1,
        }),
      }
    );

    const newPost = await response.json();
    console.log("\nNouveau post créé:", newPost);
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

// Exécution
(async () => {
  await fetchUsers();
  await createPost();
})();
