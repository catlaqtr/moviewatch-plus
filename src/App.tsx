import { MovieProvider } from "./features/context/MovieProvider";
import { useMoviesContext } from "./features/context/useMoviesContext";

function AppContent() {
  const { state, dispatch } = useMoviesContext();
  const { query } = state;

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
