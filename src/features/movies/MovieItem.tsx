import { Movie } from "../context/MovieTypes";

function MovieItem({ movie }: { movie: Movie }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
      <img
        className="w-full h-64 object-cover"
        src={movie.Poster}
        alt={movie.Title}
      />

      <h3 className="text-lg font-semibold mt-2">{movie.Title}</h3>
      <p className="text-sm text-gray-400 mb-4">{movie.Year}</p>
    </div>
  );
}
export default MovieItem;
