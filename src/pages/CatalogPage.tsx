import { useEffect } from "react";
import { useCharacterStore } from "../store/useCharacterStore";
import { BrowserRouter as Link } from "react-router";

const CatalogPage: React.FC = () => {
  const { characters, loading, error, loadCharacters } = useCharacterStore();

  useEffect(() => {
    if (characters.length === 0) {
      loadCharacters();
    }
  }, [characters.length, loadCharacters]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold">Catálogo de Personajes</h1>
      {loading && <p className="mt-4">Cargando personajes...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {characters.map((char) => (
          <div key={char.id} className="bg-gray-700 p-4 rounded-lg text-center shadow-lg">
            <img
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
              alt={char.name}
              className="w-32 h-32 mx-auto rounded-lg"
            />
            <p className="mt-2 font-semibold">{char.name}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="mt-6 px-4 py-2 bg-red-600 rounded-lg">Volver</Link>
    </div>
  );
};

export default CatalogPage;