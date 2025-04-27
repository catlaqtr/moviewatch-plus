import { useEffect } from "react";
import { Action } from "../context/MovieTypes";
function useFetchMovies(query: string, dispatch: React.Dispatch<Action>) {
  useEffect(() => {
    const controller = new AbortController();
    if (query.length < 3) {
      return () => controller.abort();
    }

    dispatch({ type: "startSearching" });

    fetch(`https://www.omdbapi.com/?apikey=5df2db86&s=${query}`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.Search);

        if (data.Response === "False") {
          dispatch({ type: "searchError", payload: "Movie not found" });
        } else {
          dispatch({ type: "searchSuccess", payload: data.Search });
        }
      })

      .catch((err) => {
        if (err.name === "AbortError") return;
        dispatch({ type: "searchError", payload: err.message });
      });
    return () => controller.abort();
  }, [query]);
}

export default useFetchMovies;
