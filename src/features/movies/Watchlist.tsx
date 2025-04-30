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

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {watchlist.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default Watchlist;
