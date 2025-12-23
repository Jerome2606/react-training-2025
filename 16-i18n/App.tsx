import { useTranslation } from "react-i18next";
import TranslatedComponent from "./TranslatedComponent";

function App() {
  const { i18n } = useTranslation();

  return (
    <div style={{ padding: "2rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>Internationalisation avec React i18next</h1>

        {/* Sélecteur de langue */}
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="language-select">Langue: </label>
          <select
            id="language-select"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{ padding: "0.5rem", fontSize: "1rem" }}
          >
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </div>
      </header>

      <main>
        <TranslatedComponent />
      </main>
    </div>
  );
}

export default App;
