import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/Layout.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import CatalogPage from "./pages/CatalogPage.tsx";
import PlaceholderPage from "./pages/PlaceholderPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import CharacterDetailPage from "./pages/CharacterDetailPage.tsx";
import SeriesDetailsPage from "./pages/SeriesDetailsPage.tsx";
import ComicsDetailsPage from "./pages/ComicsDetailsPage.tsx";
import SingleSeriesPage from "./pages/SingleSeriesPage.tsx";
import SingleComicsPage from "./pages/SingleComicsPage.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop /> {/* Asegura que el scroll suba al cambiar de página */}
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
          <Route
            path="/battle"
            element={<PlaceholderPage title="Battle Simulator" />}
          />
          <Route path="/quiz" element={<PlaceholderPage title="Quiz" />} />
          <Route
            path="/timeline"
            element={<PlaceholderPage title="Línea de Tiempo" />}
          />
          <Route path="/character/:id/series" element={<SeriesDetailsPage />} />
          <Route path="/character/:id/comics" element={<ComicsDetailsPage />} />
          <Route path="/series/:id" element={<SingleSeriesPage />} />
          <Route path="/comics/:id" element={<SingleComicsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
