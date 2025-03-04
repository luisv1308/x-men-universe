import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import CatalogPage from "./pages/CatalogPage.tsx";
import PlaceholderPage from "./pages/PlaceholderPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import CharacterDetailPage from "./pages/CharacterDetailPage.tsx";

const App: React.FC = () => {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
};

export default App;
