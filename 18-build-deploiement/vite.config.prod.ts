// vite.config.prod.ts - Configuration optimisée pour la production
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  // Alias
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Configuration du build
  build: {
    // Dossier de sortie
    outDir: "dist",

    // Générer des sourcemaps pour le debugging (optionnel en prod)
    sourcemap: false, // true pour debug, false pour prod

    // Taille minimale pour le splitting
    chunkSizeWarningLimit: 500, // Ko

    // Configuration Rollup
    rollupOptions: {
      output: {
        // Séparer les vendors pour meilleur caching
        manualChunks: {
          // React et React-DOM ensemble
          "react-vendor": ["react", "react-dom"],
          // Router séparé
          "router-vendor": ["react-router-dom"],
          // i18n séparé
          "i18n-vendor": ["i18next", "react-i18next"],
        },

        // Nommage des fichiers avec hash pour le cache busting
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },

    // Minification
    minify: "terser", // ou 'esbuild' (plus rapide mais moins optimisé)
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer les console.log
        drop_debugger: true, // Supprimer les debugger
      },
    },

    // Target des navigateurs
    target: "es2020",
  },

  // Optimisation des dépendances
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },

  // Variables d'environnement
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

// ============================================================
// COMMANDES UTILES
// ============================================================

/*
# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Analyser la taille du bundle (installer rollup-plugin-visualizer)
npm run build -- --analyze

# Build avec rapport de taille
npx vite-bundle-visualizer
*/

// ============================================================
// STRUCTURE DU BUILD
// ============================================================

/*
dist/
├── index.html                    # Point d'entrée
├── assets/
│   ├── index-a1b2c3d4.js        # Code de l'app
│   ├── index-a1b2c3d4.css       # Styles
│   ├── react-vendor-x1y2z3.js   # React
│   ├── router-vendor-m4n5o6.js  # Router
│   └── logo-p7q8r9.svg          # Assets
└── favicon.ico
*/

// ============================================================
// OPTIMISATIONS SUPPLÉMENTAIRES
// ============================================================

/*
1. LAZY LOADING des routes:
   const Home = lazy(() => import('./pages/Home'));
   
2. PRELOAD des assets critiques:
   <link rel="preload" href="/fonts/main.woff2" as="font">
   
3. COMPRESSION gzip/brotli (côté serveur):
   - Vercel/Netlify le font automatiquement
   - Nginx: gzip on;
   
4. CDN pour les assets statiques

5. Service Worker pour le cache (PWA)
*/
