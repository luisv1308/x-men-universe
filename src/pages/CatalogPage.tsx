import { useEffect, useState } from "react";
import { useCharacterStore } from "../store/useCharacterStore";
import { Link } from "react-router";

const CatalogPage: React.FC = () => {
  const { characters, loading, error, loadCharacters } = useCharacterStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (characters.length === 0) {
      loadCharacters();
    }
  }, [characters.length, loadCharacters]);

  // Filter just x-men characters
  const xMenCharacters = characters.filter(
    (char) =>
      char.name.toLowerCase().includes("x-men") ||
      [
        "Wolverine",
        "Cyclops",
        "Storm",
        "Rogue",
        "Jean Grey",
        "Beast",
        "Gambit",
        "Nightcrawler",
        "Colossus",
        "Professor X",
        "Magneto",
      ].some((name) => char.name.toLowerCase().includes(name.toLowerCase()))
  );

  // Filter by search
  const filteredCharacters = xMenCharacters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold">Catálogo de X-Men</h1>
      <input
        type="text"
        placeholder="Buscar personaje..."
        className="mt-4 p-2 rounded-lg text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p className="mt-4">Cargando personajes...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {filteredCharacters.map((char) => (
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
