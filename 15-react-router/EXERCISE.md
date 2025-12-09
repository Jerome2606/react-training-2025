# 🎯 Exercice : React Router - Blog Simple

## Objectif
Ajouter une page **Blog** avec des articles pour comprendre les bases de React Router : routes dynamiques et navigation entre pages.

---

## 📝 Instructions

À partir de l'application existante, ajoutez:

### Fonctionnalités à implémenter

1. **Page Blog** : Liste de 5 articles de blog
2. **Page BlogItem** : Détail d'un article avec son contenu
3. **Navigation article suivant/précédent** : Boutons pour naviguer entre articles
4. **Route dynamique** : `/blog/:id` pour afficher un article spécifique

---

## 🎨 Structure des routes à ajouter

```
/blog                      → Blog (liste des 5 articles)
/blog/:id                  → BlogItem (détail d'un article avec navigation suivant/précédent)
```

Routes existantes (à ne pas modifier):
```
/                          → Home
/about                     → About
/products                  → Products (liste)
/products/:productId       → ProductDetail
/dashboard                 → Dashboard (protégé)
/*                         → NotFound (404)
```

---

## ✅ Checklist des concepts à utiliser

- [ ] `<Route>` pour définir les nouvelles routes blog
- [ ] `<Link>` pour naviguer de la liste vers un article
- [ ] `useParams()` pour récupérer l'id de l'article dans l'URL
- [ ] `useNavigate()` pour les boutons suivant/précédent

---

## 🏗️ À faire

### Étape 1: Ajouter les routes dans App.tsx

Dans le fichier `App.tsx`, ajoutez les routes pour le blog:

```typescript
{/* Routes blog - À AJOUTER */}
<Route path="blog">
  <Route index element={<Blog />} />
  <Route path=":id" element={<BlogItem />} />
</Route>
```

### Étape 2: Créer `pages/Blog.tsx`

Créez une page qui affiche la liste des articles:

```typescript
import { Link } from "react-router-dom";

// Données des articles
const ARTICLES = [
  { id: 1, title: "Introduction à React", excerpt: "Les bases de React..." },
  { id: 2, title: "React Router expliqué", excerpt: "Navigation SPA..." },
  { id: 3, title: "Hooks avancés", excerpt: "useReducer, useMemo..." },
  { id: 4, title: "State Management", excerpt: "Context API et Redux..." },
  { id: 5, title: "Performance React", excerpt: "Optimisation et memoization..." },
];

export const Blog = () => {
  return (
    <div>
      <h1>Blog</h1>
      {ARTICLES.map(article => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          {/* TODO: Utiliser <Link> pour naviguer vers /blog/:id */}
          <Link to={`/blog/${article.id}`}>Lire l'article</Link>
        </article>
      ))}
    </div>
  );
};
```

### Étape 3: Créer `pages/BlogItem.tsx`

Créez une page qui affiche le détail d'un article avec navigation suivant/précédent:

```typescript
import { useParams, useNavigate } from "react-router-dom";

// Même données que Blog.tsx
const ARTICLES = [
  { id: 1, title: "Introduction à React", content: "React est une bibliothèque JavaScript..." },
  { id: 2, title: "React Router expliqué", content: "React Router permet de créer des SPAs..." },
  { id: 3, title: "Hooks avancés", content: "Les hooks avancés incluent useReducer..." },
  { id: 4, title: "State Management", content: "Le state management est crucial..." },
  { id: 5, title: "Performance React", content: "L'optimisation des performances..." },
];

export const BlogItem = () => {
  // TODO: Récupérer l'id depuis l'URL
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: Trouver l'article correspondant
  const article = ARTICLES.find(a => a.id === Number(id));

  // TODO: Calculer l'id de l'article précédent et suivant
  const currentId = Number(id);
  const hasPrevious = currentId > 1;
  const hasNext = currentId < ARTICLES.length;

  // Si article non trouvé
  if (!article) {
    return (
      <div>
        <h1>Article non trouvé</h1>
        <button onClick={() => navigate("/blog")}>Retour au blog</button>
      </div>
    );
  }

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.content}</p>

      <div>
        {/* TODO: Bouton article précédent si hasPrevious */}
        {hasPrevious && (
          <button onClick={() => navigate(`/blog/${currentId - 1}`)}>
            ← Article précédent
          </button>
        )}

        {/* TODO: Bouton article suivant si hasNext */}
        {hasNext && (
          <button onClick={() => navigate(`/blog/${currentId + 1}`)}>
            Article suivant →
          </button>
        )}
      </div>

      <button onClick={() => navigate("/blog")}>
        Retour au blog
      </button>
    </article>
  );
};
```

### Étape 4: Ajouter un lien Blog dans Layout.tsx

N'oubliez pas d'ajouter un lien vers le blog dans la navigation:

```typescript
<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/blog">Blog</Link>  {/* À AJOUTER */}
  <Link to="/products">Products</Link>
</nav>
```

---

## 🎓 Points clés à respecter

### ✅ Utiliser `<Link>` pour la navigation

```typescript
// ❌ MAUVAIS - Recharge la page complète
<a href="/blog">Blog</a>

// ✅ BON - Navigation SPA (pas de rechargement)
<Link to="/blog">Blog</Link>
```

### ✅ Utiliser `useNavigate()` pour la navigation programmatique

```typescript
// ❌ MAUVAIS - Recharge la page
window.location.href = "/blog/2";

// ✅ BON - Navigation sans rechargement
const navigate = useNavigate();
navigate("/blog/2");
```

### ✅ Routes imbriquées

```typescript
// Structure recommandée pour /blog et /blog/:id
<Route path="blog">
  <Route index element={<Blog />} />        {/* /blog */}
  <Route path=":id" element={<BlogItem />} />  {/* /blog/123 */}
</Route>
```

---

## 🔍 Auto-évaluation

Vérifiez que vous avez bien compris:

- [ ] Je sais définir des routes avec `<Route>`
- [ ] Je sais naviguer avec `<Link>`
- [ ] Je sais récupérer les paramètres d'URL avec `useParams()`
- [ ] Je sais naviguer programmatiquement avec `useNavigate()`
- [ ] Je comprends les routes imbriquées (index + routes enfants)
- [ ] Je sais conditionner l'affichage de boutons (suivant/précédent)

---

## 🌟 Pourquoi React Router?

### Navigation traditionnelle (Multi-Page App)

```
User clique sur "Blog"
  ↓
Browser fait une requête HTTP vers /blog.html
  ↓
Serveur renvoie une nouvelle page HTML complète
  ↓
Browser recharge toute la page (écran blanc)
  ↓
JavaScript, CSS, images rechargés
  ↓
Page affichée (lent 😢)
```

### Navigation avec React Router (SPA)

```
User clique sur <Link to="/blog">
  ↓
React Router change l'URL (History API)
  ↓
Pas de requête HTTP au serveur
  ↓
React affiche le composant <Blog />
  ↓
Page change instantanément (rapide 😊)
```

**React Router = Navigation instantanée sans rechargement!** 🚀

---

## 📚 Ressources utiles

- [React Router Docs](https://reactrouter.com/)
- [useParams](https://reactrouter.com/docs/en/v6/hooks/use-params)
- [useNavigate](https://reactrouter.com/docs/en/v6/hooks/use-navigate)
