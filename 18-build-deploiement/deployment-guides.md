# Guide de déploiement

## Vercel (Recommandé)

### Étapes
1. Créer un compte sur [vercel.com](https://vercel.com)
2. Connecter votre repo GitHub
3. Vercel détecte automatiquement Vite
4. Cliquer "Deploy"

### Configuration automatique
Vercel détecte :
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

### Variables d'environnement
Dashboard → Settings → Environment Variables
```
VITE_API_URL=https://api.example.com
```

### Domaine personnalisé
Dashboard → Settings → Domains → Add

---

## Netlify

### Étapes
1. Créer un compte sur [netlify.com](https://netlify.com)
2. "New site from Git"
3. Connecter le repo
4. Configurer :
   - Build command: `npm run build`
   - Publish directory: `dist`

### netlify.toml (optionnel)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

⚠️ Le redirect est CRUCIAL pour le routing SPA!

---

## GitHub Pages

### Étapes
1. Dans `vite.config.ts` :
   ```ts
   export default defineConfig({
     base: "/nom-du-repo/",  // Important!
   });
   ```

2. Créer `.github/workflows/deploy.yml` :
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. Settings → Pages → Source: "gh-pages branch"

---

## Docker

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing - renvoie index.html pour toutes les routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache des assets statiques
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

### Commandes
```bash
docker build -t my-react-app .
docker run -p 80:80 my-react-app
```
