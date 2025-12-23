// vite.config.ts - Configuration de base pour développement et production
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  // Alias pour imports propres
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true, // Ouvre le navigateur automatiquement
  },

  // Configuration du build (basique)
  build: {
    outDir: "dist",
    sourcemap: true, // Utile pour le debugging
  },
});
