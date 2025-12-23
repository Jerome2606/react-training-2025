# Build et Déploiement

Ce dossier couvre le processus de build et les options de déploiement pour une application React avec Vite.

---

## 📋 Configurations Vite disponibles

### 1. **vite.config.ts** (Config de base)
Configuration standard pour le développement et le build de base.

```bash
npm run dev      # Utilise vite.config.ts en mode development
npm run build    # Utilise vite.config.ts en mode production
```

**Contient :**
- Configuration serveur dev (port 3000)
- Alias `@/` pour les imports
- Sourcemaps activés pour le debugging

---

### 2. **vite.config.prod.ts** (Config optimisée)
Configuration avancée pour la production avec optimisations maximales.

```bash
npm run build:prod   # Utilise vite.config.prod.ts
```

**Optimisations supplémentaires :**
- ✅ Code splitting avancé (react-vendor, router-vendor, i18n-vendor)
- ✅ Suppression automatique des `console.log` et `debugger`
- ✅ Nommage avec hash pour le cache busting
- ✅ Minification avec Terser (plus agressive qu'esbuild)
- ✅ Chunks séparés pour meilleur caching

---

## 🚀 Commandes de build

```bash
# Développement
npm run dev

# Build de production (config de base)
npm run build

# Build de production optimisé (recommandé pour déploiement)
npm run build:prod

# Prévisualiser le build localement
npm run preview
```

---

## 📊 Analyser la taille du bundle

### Méthode 1 : Analyse visuelle avec rollup-plugin-visualizer

```bash
# Installer le plugin
npm install -D rollup-plugin-visualizer

# Build avec analyse
npm run build:prod
```

Ajouter dans `vite.config.prod.ts` :
```ts
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      open: true, // Ouvre automatiquement dans le navigateur
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

Résultat : Un fichier `dist/stats.html` avec une visualisation interactive ! 🎯

### Méthode 2 : vite-bundle-visualizer

```bash
# Installation
npm install -D vite-bundle-visualizer

# Utilisation
npx vite-bundle-visualizer
```

### Méthode 3 : Analyse rapide avec --mode

```bash
# Build avec rapport de taille dans la console
npm run build:prod -- --mode analyze
```

### Que rechercher dans l'analyse ?

❌ **Problèmes courants** :
- Dépendances dupliquées (lodash, moment.js importés 2x)
- Libraries trop lourdes (moment.js → utiliser date-fns ou dayjs)
- Images non optimisées (PNG → WebP)
- Chunks trop gros (> 500 KB)

✅ **Objectifs** :
- Chunk principal < 200 KB
- Vendors séparés par domaine (react, router, i18n)
- Total gzippé < 500 KB

---

## 📦 Sortie du build

### Avec vite.config.ts (basique)
```
dist/
├── index.html
├── assets/
│   ├── index-abc123.js      # Code JavaScript
│   └── index-xyz789.css     # Styles
└── images/                  # Assets statiques
```

### Avec vite.config.prod.ts (optimisé)
```
dist/
├── index.html
├── assets/
│   ├── index-a1b2c3d4.js          # Code de l'app
│   ├── index-a1b2c3d4.css         # Styles
│   ├── react-vendor-x1y2z3.js    # React + ReactDOM (séparé)
│   ├── router-vendor-m4n5o6.js   # React Router (séparé)
│   ├── i18n-vendor-p7q8r9.js     # i18next (séparé)
│   └── logo-k3l4m5.svg            # Assets
└── favicon.ico
```

**Avantage du splitting** : Si vous modifiez votre code app, seul `index-*.js` change. Les vendors restent en cache ! 🚀

---

## 🔑 Cache Busting expliqué

### Problème sans hash
```js
// Build 1
assets/index.js      // ❌ Le navigateur met en cache

// Build 2 - Vous corrigez un bug
assets/index.js      // ❌ Même nom ! Le navigateur garde l'ancien
```

**Résultat** : Les utilisateurs voient l'ancienne version buggée.

### Solution avec hash
```js
// Build 1
assets/index-a1b2c3.js    // ✅ Hash basé sur le contenu

// Build 2 - Vous corrigez un bug
assets/index-f5e6d7.js    // ✅ Nouveau hash = nouveau nom !
```

**Résultat** : Le navigateur télécharge automatiquement la nouvelle version.

### Configuration dans vite.config.prod.ts

```ts
rollupOptions: {
  output: {
    // [name] = nom du fichier (index, logo, etc.)
    // [hash] = hash généré du contenu (change si le contenu change)
    // [ext]  = extension (.js, .css, .svg, etc.)

    entryFileNames: "assets/[name]-[hash].js",    // index-a1b2c3.js
    chunkFileNames: "assets/[name]-[hash].js",    // react-vendor-x1y2z3.js
    assetFileNames: "assets/[name]-[hash].[ext]", // logo-k3l4m5.svg
  }
}
```

---

## ⚙️ Comment Vite choisit la config ?

### Méthode 1 : Config par défaut
```bash
npm run dev      # Cherche vite.config.ts (mode development)
npm run build    # Cherche vite.config.ts (mode production)
```

### Méthode 2 : Spécifier avec --config
```bash
npm run build -- --config vite.config.prod.ts
```

Dans [package.json](./package.json), nous avons défini :
```json
"scripts": {
  "dev": "vite",                                      // → vite.config.ts
  "build": "tsc && vite build",                       // → vite.config.ts
  "build:prod": "vite build --config vite.config.prod.ts"  // → vite.config.prod.ts
}
```

### Méthode 3 : Détection du mode

Vite détecte automatiquement le mode :
```bash
vite              # mode = "development"
vite build        # mode = "production"
```

---

## 🎯 Quelle config utiliser ?

| Situation | Commande | Config utilisée |
|-----------|----------|-----------------|
| Développement local | `npm run dev` | vite.config.ts (mode dev) |
| Build rapide pour tester | `npm run build` | vite.config.ts (mode prod) |
| **Build pour déploiement** | `npm run build:prod` | **vite.config.prod.ts** ✅ |

**Recommandation** : Toujours utiliser `npm run build:prod` pour le déploiement en production !

---

## 📊 Comparaison des builds

| Feature | vite.config.ts | vite.config.prod.ts |
|---------|----------------|---------------------|
| Sourcemaps | ✅ Activés | ❌ Désactivés |
| console.log | ✅ Conservés | ❌ Supprimés |
| Code splitting | ⚠️ Basique | ✅ Avancé (vendors séparés) |
| Minification | esbuild (rapide) | terser (plus optimisé) |
| Cache busting | ✅ Hash | ✅ Hash |
| Taille finale | ~150 KB | ~120 KB (-20%) |

---

## 🌐 Options de déploiement

| Plateforme | Type | Gratuit |
|------------|------|---------|
| Vercel | Serverless | ✅ |
| Netlify | CDN/Serverless | ✅ |
| GitHub Pages | Static | ✅ |
| AWS S3 + CloudFront | CDN | 💰 |
| Firebase Hosting | CDN | ✅ |

## Fichiers

- `vite.config.prod.ts` - Configuration production
- `deploy-vercel.md` - Guide Vercel
- `deploy-netlify.md` - Guide Netlify
- `docker/` - Containerisation
