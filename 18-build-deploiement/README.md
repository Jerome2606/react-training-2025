# Build et Déploiement

Ce dossier couvre le processus de build et les options de déploiement.

## Commandes de build

```bash
# Build de production
npm run build

# Prévisualiser le build localement
npm run preview

# Analyser la taille du bundle
npm run build -- --analyze
```

## Sortie du build

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # Code JavaScript
│   ├── index-[hash].css     # Styles
│   └── vendor-[hash].js     # Dépendances
└── images/                  # Assets statiques
```

## Options de déploiement

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
