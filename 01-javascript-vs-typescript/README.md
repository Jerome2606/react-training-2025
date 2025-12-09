# JavaScript vs TypeScript

Ce dossier illustre les différences entre JavaScript et TypeScript.

## Fichiers

- `example.js` - Version JavaScript (typage dynamique)
- `example.ts` - Version TypeScript (typage statique)

## Exécution

```bash
# JavaScript
node example.js

# TypeScript (nécessite ts-node)
npm i && node --loader ts-node/esm example.ts
# OR
npm i && npm start

```

## Points clés

1. **JavaScript** : typage dynamique, flexible mais source d'erreurs
2. **TypeScript** : superset de JS avec typage statique
3. **Avantages TS** : autocomplétion IDE, détection d'erreurs à la compilation
