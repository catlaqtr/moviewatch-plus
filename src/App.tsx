import { useEffect } from "react";
import { MovieProvider } from "./features/context/MovieProvider";
import { useMoviesContext } from "./features/context/useMoviesContext";

function AppContent() {
  const { state, dispatch } = useMoviesContext();
  const { query } = state;
  useEffect(() => {
    if (query.length < 3) return;

    dispatch({ type: "startSearching" });

    fetch(`https://www.omdbapi.com/?apikey=5df2db86&s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "False") {
          dispatch({ type: "searchError", payload: "Movie not found" });
        } else {
          dispatch({ type: "searchSuccess", payload: data.Search });
        }
      })
      .catch((err) => dispatch({ type: "searchError", payload: err.message }));
  }, [query]);

  return (
    <>
      <h1>Search Movies</h1>
      <input
        value={query}
        onChange={(e) =>
          dispatch({ type: "setQuery", payload: e.target.value })
        }
      />
      <h2>Movies List</h2>
      <ul></ul>
      <h2>Watchlist</h2>
      <ul></ul>
    </>
  );
}

export default function App() {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
}
