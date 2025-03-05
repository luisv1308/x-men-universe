import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useResourcesDetailsStore } from "../store/useResourcesDetailsStore";

const SingleSeriesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resource, loading, error, fetchResources } =
    useResourcesDetailsStore();

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
  if (!resource)
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white p-6">
        <p>No se encontraron series.</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold">{resource.title}</h1>
      <p className="mt-4 mx-auto text-center max-w-2xl">
        {resource.description}
      </p>
      {resource.thumbnail && (
        <img
          src={`${resource.thumbnail.path}.${resource.thumbnail.extension}`}
          alt={resource.title}
          className="mt-4"
        />
      )}

      {resource.urls && resource.urls.length > 0 ? (
        <div className="mt-4">
          <h4 className="text-lg font-bold mt-4">
            You can go to Marvel.com for more information:
          </h4>
          <a
            href={resource.urls[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2"
          >
            <h3 className="text-lg font-bold text-center">MARVEL.COM</h3>
          </a>
        </div>
      ) : (
        <p className="text-gray-400">No hay enlace disponible</p>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-yellow-500 rounded-lg"
      >
        Volver
      </button>
    </div>
  );
};

export default SingleSeriesPage;
