// JsxBasics.tsx - Syntaxe JSX fondamentale

import React from "react";

// ============================================================
// JSX = JavaScript XML
// C'est du sucre syntaxique pour React.createElement()
// ============================================================

// Ce que vous écrivez :
const element = <h1 className="title">Bonjour!</h1>;

// Ce que le compilateur génère :
const elementCompiled = React.createElement(
  "h1",
  { className: "title" },
  "Bonjour!"
);

// ============================================================
// RÈGLE 1 : Un seul élément racine
// ============================================================

// ❌ ERREUR : Deux éléments racines
/*
const Wrong = () => {
  return (
    <h1>Titre</h1>
    <p>Paragraphe</p>
  );
};
*/

// ✅ Solution 1 : Wrapper div
const WithDiv = () => {
  return (
    <div>
      <h1>Titre</h1>
      <p>Paragraphe</p>
    </div>
  );
};

// ✅ Solution 2 : Fragment (ne crée pas de noeud DOM)
import { Fragment } from "react";

const WithFragment = () => {
  return (
    <Fragment>
      <h1>Titre</h1>
      <p>Paragraphe</p>
    </Fragment>
  );
};

// ✅ Solution 3 : Fragment raccourci (le plus courant)
const WithShortFragment = () => {
  return (
    <>
      <h1>Titre</h1>
      <p>Paragraphe</p>
    </>
  );
};

// ============================================================
// RÈGLE 2 : Fermer toutes les balises
// ============================================================

// ❌ HTML classique (pas valide en JSX)
// <img src="photo.jpg">
// <br>
// <input type="text">

// ✅ JSX (auto-fermant)
const SelfClosingTags = () => (
  <>
    <img src="photo.jpg" alt="Photo" />
    <br />
    <input type="text" />
    <hr />
  </>
);

// ============================================================
// RÈGLE 3 : className au lieu de class
// ============================================================

// ❌ Pas valide (class est un mot réservé en JS)
// <div class="container">

// ✅ Utiliser className
const WithClassName = () => (
  <div className="container">
    <span className="highlight">Texte</span>
  </div>
);

// ============================================================
// RÈGLE 4 : camelCase pour les attributs
// ============================================================

const CamelCaseAttributes = () => (
  <div>
    {/* onclick → onClick */}
    <button onClick={() => alert("Click!")}>Cliquer</button>

    {/* tabindex → tabIndex */}
    <input tabIndex={1} />

    {/* for → htmlFor (sur les labels) */}
    <label htmlFor="email">Email:</label>
    <input id="email" type="email" />

    {/* maxlength → maxLength */}
    <input maxLength={100} />

    {/* readonly → readOnly */}
    <input readOnly value="Non modifiable" />
  </div>
);

// ============================================================
// RÈGLE 5 : Styles inline en objet
// ============================================================

// ❌ HTML classique
// <div style="color: red; font-size: 16px;">

// ✅ JSX : objet avec camelCase
const InlineStyles = () => (
  <div
    style={{
      color: "red",
      fontSize: "16px", // font-size → fontSize
      backgroundColor: "#f0f0f0", // background-color → backgroundColor
      marginTop: 20, // Les nombres sont en pixels
      padding: "10px 20px", // Les strings avec unités
    }}
  >
    Texte stylé
  </div>
);

// ============================================================
// EXPRESSIONS JAVASCRIPT DANS JSX
// ============================================================

const JsExpressions = () => {
  const name = "Alice";
  const age = 25;
  const items = ["Pomme", "Banane", "Orange"];

  return (
    <div>
      {/* Variables */}
      <p>Nom: {name}</p>

      {/* Expressions */}
      <p>Âge dans 10 ans: {age + 10}</p>

      {/* Appels de fonction */}
      <p>Majuscules: {name.toUpperCase()}</p>

      {/* Ternaire */}
      <p>Statut: {age >= 18 ? "Majeur" : "Mineur"}</p>

      {/* Template literals */}
      <p>{`Bonjour ${name}, tu as ${age} ans`}</p>

      {/* Longueur de tableau */}
      <p>Nombre d'items: {items.length}</p>
    </div>
  );
};

// ============================================================
// CE QUI NE MARCHE PAS DANS LES ACCOLADES
// ============================================================

/*
// ❌ Pas de statements (if, for, while)
<p>{if (true) "oui"}</p>

// ❌ Pas d'objets directement (sauf pour style)
<p>{{ name: "Alice" }}</p>  // Erreur!

// ✅ Pour les objets, utiliser JSON.stringify
<p>{JSON.stringify({ name: "Alice" })}</p>
*/

export {
  WithDiv,
  WithFragment,
  WithShortFragment,
  SelfClosingTags,
  WithClassName,
  CamelCaseAttributes,
  InlineStyles,
  JsExpressions,
};
