import { useEffect, useRef } from "react";
import { useMoviesContext } from "../../features/context/useMoviesContext";
import MovieList from "../movies/MovieList";
import useFetchMovies from "../movies/useFetchMovies";

function AppContent() {
  const { state, dispatch } = useMoviesContext();
  const { query, tab } = state;
  const inputRef = useRef<HTMLInputElement>(null);

  useFetchMovies(query, dispatch);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") inputRef.current?.focus();
      if (e.key === "Escape") dispatch({ type: "setQuery", payload: "" });
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 pt-8 text-white min-h-screen p-4 text-center mx-auto max-w-2xl bg-gradient-to-b from-gray-900 to-gray-700">
      <h1 className="text-3xl font-bold mb-4">Search Movies</h1>
      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all"
          onClick={() => dispatch({ type: "switchTab", payload: "search" })}
        >
          Search Movies
        </button>
        <button
          className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all"
          onClick={() => dispatch({ type: "switchTab", payload: "watchlist" })}
        >
          Watchlist
        </button>
      </div>
      {tab === "search" && (
        <div>
          <input
            ref={inputRef}
            className="w-full max-w-md p-3 text-lg rounded-full border border-gray-500 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            value={query}
            onChange={(e) =>
              dispatch({ type: "setQuery", payload: e.target.value })
            }
          />
          <h2 className="text-xl font-semibold text-indigo-300 mt-8 mb-4">
            Movies List
          </h2>
          <MovieList />
        </div>
      )}

      {tab === "watchlist" && (
        <div>
          <h2 className="text-xl font-semibold text-indigo-300 mt-8 mb-4">
            Watchlist
          </h2>
          <ul className="space-y-4"></ul>
        </div>
      )}
    </div>
  );
}
export default AppContent;
