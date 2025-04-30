import { Movie } from "../context/MovieTypes";
import { useMoviesContext } from "../context/useMoviesContext";

function MovieItem({ movie }: { movie: Movie }) {
  const { state, dispatch } = useMoviesContext();
  const { watchlist } = state;

  const isInWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  function handleRemove() {
    dispatch({ type: "removeFromWatchlist", payload: movie.imdbID });
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 p-4">
      <img
        className="w-full h-64 object-cover rounded"
        src={movie.Poster}
        alt={movie.Title}
      />
      <h3 className="text-lg font-semibold mt-2">{movie.Title}</h3>
      <p className="text-sm text-gray-400">{movie.Year}</p>

      {isInWatchlist ? (
        <button
          onClick={handleRemove}
          className="mt-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm transition-all"
        >
          Remove from Watchlist ❌
        </button>
      ) : (
        <button
          onClick={() => dispatch({ type: "addToWatchlist", payload: movie })}
          className="mt-4 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm transition-all"
        >
          Add to Watchlist ⭐
        </button>
      )}
    </div>
  );
}

export default MovieItem;
