# Organisation d'un projet React

Ce dossier présente les bonnes pratiques d'organisation pour un projet React professionnel.

## Structure recommandée

```
src/
├── assets/              # Images, fonts, fichiers statiques
│   ├── images/
│   └── fonts/
├── components/          # Composants réutilisables
│   ├── ui/              # Composants UI génériques (Button, Input, Modal)
│   └── shared/          # Composants partagés métier
├── contexts/            # Context providers
├── hooks/               # Hooks personnalisés
├── pages/               # Composants de pages (un par route)
├── services/            # Appels API, logique métier
├── types/               # Types TypeScript partagés
├── utils/               # Fonctions utilitaires
├── locales/             # Fichiers de traduction
├── styles/              # Styles globaux, variables
├── App.tsx
├── main.tsx
└── i18n.ts
```

## Fichiers

- `structure.md` - Structure détaillée
- `naming-conventions.md` - Conventions de nommage
- `example-component/` - Exemple de composant bien structuré
