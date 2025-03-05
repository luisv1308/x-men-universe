// src/pages/CharacterDetailPage.tsx
import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { useCharacterStore } from "../store/useCharacterStore";
import Loading from "../components/Loading";

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedCharacter, loading, error, fetchCharacterDetails } =
    useCharacterStore();

  useEffect(() => {
    if (id) {
      fetchCharacterDetails(Number(id));
    }
  }, [id, fetchCharacterDetails]);

  if (loading)
    return (
      <Loading />
    );
  if (error)
    return (
      <div className="flex flex-col items-center min-h-screen  text-white p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (!selectedCharacter)
    return (
      <div className="flex flex-col items-center min-h-screen  text-white p-6">
        <p>No se encontró el personaje.</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen  text-white p-6">
      <h1 className="text-3xl font-bold">{selectedCharacter.name}</h1>
      <img
        src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
        alt={selectedCharacter.name}
        className="w-48 h-48 my-4 rounded-lg"
      />
      <p className="max-w-2xl text-center">
        {selectedCharacter.description || "Sin descripción disponible."}
      </p>
      <div className="mt-6 flex gap-4">
        <Link
          to={`/character/${selectedCharacter.id}/series`}
          className="px-4 py-2 bg-blue-600 rounded-lg"
        >
          Ver Series
        </Link>
        <Link
          to={`/character/${selectedCharacter.id}/comics`}
          className="px-4 py-2 bg-green-600 rounded-lg"
        >
          Ver Cómics
        </Link>
      </div>

      <Link to="/catalog" className="mt-6 px-4 py-2 bg-red-600 rounded-lg">
        Volver al catálogo
      </Link>
    </div>
  );
};

export default CharacterDetailPage;
