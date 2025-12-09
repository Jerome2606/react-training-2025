# Le fichier package.json

Ce dossier explique la structure et l'utilisation de package.json.

## Structure type

```json
{
  "name": "mon-app-react",
  "version": "1.0.0",
  "description": "Description du projet",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src/"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

## Versioning sémantique (SemVer)

- `^18.2.0` : accepte 18.x.x (mises à jour mineures et patches)
- `~18.2.0` : accepte 18.2.x (patches uniquement)
- `18.2.0` : version exacte fixée
- `*` : n'importe quelle version (déconseillé)
- `>=18.0.0 <19.0.0` : plage explicite

## Fichiers

- `package.json` - Exemple complet de configuration
- `package-lock.json` - Verrouillage des versions exactes
