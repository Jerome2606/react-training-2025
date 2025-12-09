# Introduction à Vite

Vite est un outil de build moderne et rapide pour les projets front-end.

## Créer un nouveau projet

```bash
# React + TypeScript
npm create vite@latest mon-app -- --template react-ts

# Autres templates disponibles
# --template react
# --template vue-ts
# --template svelte-ts
```

## Structure générée

```
mon-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Fichiers

- `vite.config.ts` - Configuration Vite complète
- `.env.example` - Variables d'environnement
