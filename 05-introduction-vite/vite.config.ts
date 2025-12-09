// vite.config.ts - Configuration Vite complète
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Plugins
  plugins: [react()],

  // Alias pour les imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },

  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true, // Ouvre le navigateur automatiquement
    cors: true,
    // Proxy pour les appels API
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  // Configuration du build
  build: {
    outDir: "dist",
    sourcemap: true,
    // Optimisation du bundling
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les vendors
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },

  // Variables d'environnement préfixées par VITE_
  // Accessibles via import.meta.env.VITE_*
  envPrefix: "VITE_",

  // Configuration CSS
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@styles/variables.scss";`,
      },
    },
  },
});
