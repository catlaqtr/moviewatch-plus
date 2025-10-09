import { useEffect } from "react";
import { Action } from "../context/MovieTypes";

function useFetchMovies(query: string, dispatch: React.Dispatch<Action>) {
  useEffect(() => {
    const trimmed = query.trim();
    const controller = new AbortController();

    if (trimmed.length < 3) {
      return () => controller.abort();
    }

    const timer = setTimeout(() => {
      dispatch({ type: "startSearching" });
      fetch(
        `https://www.omdbapi.com/?apikey=5df2db86&s=${encodeURIComponent(
          trimmed
        )}`,
        { signal: controller.signal }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === "False") {
            dispatch({
              type: "searchError",
              payload: data.Error || "Movie not found",
            });
          } else {
            dispatch({ type: "searchSuccess", payload: data.Search });
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") return;
          dispatch({ type: "searchError", payload: err.message });
        });
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, dispatch]);
}

export default useFetchMovies;
