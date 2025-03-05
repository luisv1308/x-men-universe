import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useCharacterDetailsStore } from "../store/useCharacterDetailsStore";
import Loading from "../components/Loading";

const SeriesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { series, loading, error, fetchResources } = useCharacterDetailsStore();

  useEffect(() => {
    if (id) {
      fetchResources(id, "series");
    }
  }, [id, fetchResources]);

  if (loading)
    return (
      <div className="flex flex-col items-center min-h-screen  text-white p-6">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center min-h-screen  text-white p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (series.length === 0)
    return (
      <div className="flex flex-col items-center min-h-screen  text-white p-6">
        <p>No se encontraron series.</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen  text-white p-6">
      <h1 className="text-3xl font-bold">Series</h1>
      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-gray-700 cursor-pointer"
        >
          Volver
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {series.map((serie) => (
          <Link
            to={`/series/${serie.id}`}
            className="text-blue-400 hover:underline x-men-link"
          >
            <img
              src={`${serie.thumbnail?.path}.${serie.thumbnail?.extension}`}
              alt={serie.title}
              className="w-32 h-32 mx-auto rounded-lg"
            />
            <p className="mt-2 font-semibold text-center text-lg">{serie.title}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-gray-700 cursor-pointer"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
