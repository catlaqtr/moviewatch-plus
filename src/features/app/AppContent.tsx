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
  }, [dispatch]);

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

  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8 mx-auto py-10">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">
          MovieWatch Plus
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Find and save your favorite movies
        </p>
      </header>

      {/* Tabs */}
      <div
        className="flex items-center gap-2 mb-6"
        role="tablist"
        aria-label="Views"
      >
        <button
          role="tab"
          aria-selected={tab === "search"}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${
            tab === "search"
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "text-gray-200 hover:bg-white/5"
          }`}
          onClick={() => dispatch({ type: "switchTab", payload: "search" })}
        >
          Search
        </button>
        <button
          role="tab"
          aria-selected={tab === "watchlist"}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${
            tab === "watchlist"
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "text-gray-200 hover:bg-white/5"
          }`}
          onClick={() => dispatch({ type: "switchTab", payload: "watchlist" })}
        >
          Watchlist
        </button>
      </div>

      {tab === "search" && (
        <section
          aria-labelledby="search-heading"
          className="rounded-2xl border border-gray-700/60 bg-gray-800/80 backdrop-blur shadow-xl p-6"
        >
          <h2 id="search-heading" className="sr-only">
            Search Movies
          </h2>
          <div className="flex flex-col items-center gap-4">
            <input
              ref={inputRef}
              className="w-full max-w-xl rounded-full border border-gray-600 bg-gray-900/70 px-4 py-3 text-base placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Search by title (min 3 characters)"
              value={query}
              onChange={(e) =>
                dispatch({ type: "setQuery", payload: e.target.value })
              }
              aria-label="Search movies"
            />

            {state.isLoading && (
              <div className="w-full max-w-xl mt-2" aria-live="polite">
                <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #22c55e, #16a34a)",
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  Loading movies…
                </p>
              </div>
            )}

            {!state.isLoading && state.error && (
              <p className="text-sm text-red-400">{state.error}</p>
            )}

            {/* Filters */}
            <div className="mt-2 w-full max-w-xl text-left">
              <label htmlFor="yearRange" className="block text-indigo-300 mb-1">
                Minimum Year:{" "}
                <span className="font-bold text-white">{state.minYear}</span>
              </label>
              <input
                id="yearRange"
                type="range"
                min={1950}
                max={currentYear}
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

            <div className="w-full mt-4">
              <h3 className="text-xl font-semibold text-indigo-300 mb-3">
                Results
              </h3>
              {state.movies.length === 0 &&
              query.length >= 3 &&
              !state.isLoading ? (
                <p className="text-sm text-gray-400">
                  No movies found. Try a different search.
                </p>
              ) : (
                <MovieList />
              )}
            </div>
          </div>
        </section>
      )}

      {tab === "watchlist" && (
        <section
          aria-labelledby="watchlist-heading"
          className="rounded-2xl border border-gray-700/60 bg-gray-800/80 backdrop-blur shadow-xl p-6"
        >
          <h2
            id="watchlist-heading"
            className="text-xl font-semibold text-indigo-300 mb-4"
          >
            Watchlist
          </h2>
          <Watchlist />
        </section>
      )}
    </div>
  );
}
export default AppContent;
