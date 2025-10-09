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
    <div className="overflow-hidden p-4 transition-transform duration-300 hover:-translate-y-0.5 rounded-2xl border border-gray-700/60 bg-gray-800/80 backdrop-blur shadow-xl">
      <img
        className="w-full h-64 object-cover rounded-lg"
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.Title}
      />
      <h3 className="text-lg font-semibold mt-3 truncate" title={movie.Title}>
        {movie.Title}
      </h3>
      <p className="text-sm text-gray-400">{movie.Year}</p>

      {isInWatchlist ? (
        <button
          onClick={handleRemove}
          aria-label={`Remove ${movie.Title} from watchlist`}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 text-white bg-red-500 hover:bg-red-600"
        >
          Remove from Watchlist ❌
        </button>
      ) : (
        <button
          onClick={() => dispatch({ type: "addToWatchlist", payload: movie })}
          aria-label={`Add ${movie.Title} to watchlist`}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 text-white bg-green-500 hover:bg-green-600"
        >
          Add to Watchlist ⭐
        </button>
      )}
    </div>
  );
}

export default MovieItem;
