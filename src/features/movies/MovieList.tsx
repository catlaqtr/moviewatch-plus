import { useMoviesContext } from "../context/useMoviesContext";
import MovieItem from "./MovieItem";

function MovieList() {
  const { state } = useMoviesContext();
  const { movies, minYear } = state;

  const filteredMovies = movies.filter((movie) => {
    const year = parseInt(movie.Year);
    return !isNaN(year) && year >= minYear;
  });

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {filteredMovies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
