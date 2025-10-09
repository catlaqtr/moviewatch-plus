import { useMoviesContext } from "../context/useMoviesContext";
import MovieItem from "./MovieItem";

function Watchlist() {
  const { state } = useMoviesContext();

  const { watchlist } = state;

  const count = watchlist.length;
  const emoji = count > 0 ? "🎉" : "😢";

  return (
    <div className="w-full">
      <div className="text-lg text-indigo-300 mb-4">
        You have <span className="font-bold">{count}</span> movie
        {count !== 1 ? "s" : ""} in your watchlist {emoji}
      </div>

      {count === 0 ? (
        <p className="text-sm text-gray-400">
          Your watchlist is empty. Add movies from the search tab.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-2">
          {watchlist.map((movie) => (
            <MovieItem key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Watchlist;
