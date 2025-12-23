import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n"; // ⚠️ IMPORTANT: Initialiser i18next AVANT de rendre l'app
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
