// App.tsx - Configuration React Router v6
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "./Layout";
import { Home, About, Dashboard, NotFound } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { ProtectedRoute } from "./ProtectedRoute";
import { Blog, BlogItem } from "./pages/jerome/Blog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route avec Layout */}
        <Route path="/" element={<Layout />}>
          {/* Route index = route par défaut */}
          <Route index element={<Home />} />

          {/* Route simple */}
          <Route path="about" element={<About />} />

          {/* Routes imbriquées */}
          <Route path="products">
            <Route index element={<Products />} />
            {/* Route avec paramètre dynamique */}
            <Route path=":productId" element={<ProductDetail />} />
          </Route>

          {/* Routes imbriquées */}
          <Route path="blog">
            <Route index element={<Blog />} />
            {/* Route avec paramètre dynamique */}
            <Route path=":blogId" element={<BlogItem />} />
          </Route>

          {/* Route protégée */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirection */}
          <Route path="old-page" element={<Navigate to="/about" replace />} />

          {/* Route 404 - catch all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
