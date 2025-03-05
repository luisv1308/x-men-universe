import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useCharacterDetailsStore } from "../store/useCharacterDetailsStore";
import Resource from "../interfaces/Resource";
import Loading from "../components/Loading";

const ComicsDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { comics, loading, error, fetchResources } = useCharacterDetailsStore();

  useEffect(() => {
    if (id) {
      fetchResources(id, "comics");
    }
  }, [id, fetchResources]);

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
  if (comics.length === 0)
    return (
      <div className="flex flex-col items-center min-h-screen  text-white p-6">
        <p>No se encontraron comics.</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen  text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Comics</h1>
      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-gray-700 cursor-pointer"
        >
          Volver
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {comics.map((comic: Resource) => (
          
            <Link
              to={`/comics/${comic.id}`}
              className="text-blue-400 hover:underline x-men-link"
            >
              <img
                src={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                alt={comic.title}
                className="w-32 h-32 mx-auto rounded-lg"
              />
              <p className="mt-2 font-semibold text-center">{comic.title}</p>
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

export default ComicsDetailsPage;
