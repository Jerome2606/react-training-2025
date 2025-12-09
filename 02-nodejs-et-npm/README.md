# Node.js et npm

Ce dossier contient des exemples d'utilisation de Node.js et npm.

## Commandes essentielles

```bash
# Vérifier les versions
node --version
npm --version

# Initialiser un projet
npm init -y

# Installer des dépendances
npm install <package>           # Production
npm install -D <package>        # Développement uniquement

# Scripts
npm run <script>               # Exécuter un script
npm start                      # Raccourci pour npm run start
npm test                       # Raccourci pour npm run test

# Mise à jour
npm update                     # Met à jour les dépendances
npm outdated                   # Liste les packages obsolètes
```

## Fichiers

- `server.js` - Exemple de serveur HTTP simple avec Node.js
- `fetch-example.js` - Exemple d'appel API avec fetch (Node 18+)
