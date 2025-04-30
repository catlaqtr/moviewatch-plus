import { useEffect, useRef, useState } from "react";
import { useMoviesContext } from "../../features/context/useMoviesContext";
import MovieList from "../movies/MovieList";
import useFetchMovies from "../movies/useFetchMovies";
import Watchlist from "../movies/Watchlist";

function AppContent() {
  const { state, dispatch } = useMoviesContext();
  const { query, tab } = state;
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    if (!state.isLoading) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 5 : prev));
    }, 100);

    return () => clearInterval(interval);
  }, [state.isLoading]);

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
        <div className="flex flex-col items-center">
          <input
            ref={inputRef}
            className="w-full max-w-md p-3 text-lg rounded-full border border-gray-500 bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            value={query}
            onChange={(e) =>
              dispatch({ type: "setQuery", payload: e.target.value })
            }
          />

          {state.isLoading && (
            <div className="w-full max-w-md mt-4">
              <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-1 text-center">
                Loading movies...
              </p>
            </div>
          )}
          <div className="mt-6 w-full max-w-md text-left">
            <label htmlFor="yearRange" className="block text-indigo-300 mb-2">
              Minimum Year:{" "}
              <span className="font-bold text-white">{state.minYear}</span>
            </label>
            <input
              id="yearRange"
              type="range"
              min={1950}
              max={2023}
              step={1}
              value={state.minYear}
              onChange={(e) =>
                dispatch({
                  type: "setMinYear",
                  payload: Number(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

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
          <ul className="space-y-4">
            <Watchlist />
          </ul>
        </div>
      )}
    </div>
  );
}
export default AppContent;
