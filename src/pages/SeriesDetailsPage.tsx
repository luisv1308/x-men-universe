import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { useCharacterDetailsStore } from "../store/useCharacterDetailsStore";

const SeriesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { series, loading, error, fetchResources } = useCharacterDetailsStore();

  useEffect(() => {
    if (id) {
      fetchResources(id, "series");
    }
  }, [id, fetchResources]);

  if (loading)
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white p-6">
        <p>Cargando detalles...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (series.length === 0)
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white p-6">
        <p>No se encontraron series.</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold">Series</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {series.map((serie) => (
          <div
            key={serie.id}
            className="bg-gray-700 p-4 rounded-lg text-center shadow-lg"
          >
            <Link
              to={`/series/${serie.id}`}
              className="text-blue-400 hover:underline"
            >
              <img
                src={`${serie.thumbnail?.path}.${serie.thumbnail?.extension}`}
                alt={serie.title}
                className="w-32 h-32 mx-auto rounded-lg"
              />
              <p className="mt-2 font-semibold">{serie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
