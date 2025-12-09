// server.js - Serveur HTTP simple avec Node.js
const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Log de la requête
  console.log(`${req.method} ${req.url}`);

  // Définir les headers
  res.setHeader("Content-Type", "application/json");

  // Router simple
  if (req.url === "/") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Bienvenue sur l'API!" }));
  } else if (req.url === "/api/users") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        users: [
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ],
      })
    );
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route non trouvée" }));
  }
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
