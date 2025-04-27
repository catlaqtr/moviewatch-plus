import { useMoviesContext } from "../context/useMoviesContext";
import MovieItem from "./MovieItem";
function MovieList() {
  const { state } = useMoviesContext();
  const { movies } = state;
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
export default MovieList;
