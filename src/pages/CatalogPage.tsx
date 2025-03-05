// src/pages/CatalogPage.tsx
import { useEffect } from "react";
import { Link } from "react-router";
import { useCharacterStore } from "../store/useCharacterStore";
import SearchBar from "../components/SearchBar";

const CatalogPage: React.FC = () => {
  const {
    filteredCharacters,
    loading,
    error,
    page,
    setPage,
    searchCharacter,
    fetchXMenCharacters,
  } = useCharacterStore();

  useEffect(() => {
    fetchXMenCharacters(page);
  }, [page]);

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold">Catálogo de Personajes</h1>
      <SearchBar onSearch={searchCharacter} />
      <h3 className="mt-6 ">Page number: {page + 1}</h3>
      {loading && <p className="mt-4">Cargando personajes...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {filteredCharacters.map((char) => (
          <Link
            to={`/character/${char.id}`}
            key={char.id}
            className="bg-gray-700 p-4 rounded-lg text-center shadow-lg x-men-link"
          >
            <img
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
              alt={char.name}
              className="w-32 h-32 mx-auto rounded-lg"
            />
            <p className="mt-2 font-semibold">{char.name}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0 || loading}
          className="px-4 py-2 bg-red-600 rounded-lg disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={loading}
          className="px-4 py-2 bg-red-600 rounded-lg"
        >
          Siguiente
        </button>
      </div>
      {loading && <p className="mt-4">Cargando personajes...</p>}

      <Link to="/" className="mt-6 px-4 py-2 bg-red-600 rounded-lg">
        Volver
      </Link>
    </div>
  );
};

export default CatalogPage;
