import { ReactNode, useReducer, useEffect } from "react";
import { MovieContext } from "./MovieContext";
import { initialState, reducer } from "./MovieTypes";

export function MovieProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const stored = localStorage.getItem("watchlist");
    return stored
      ? { ...initialState, watchlist: JSON.parse(stored) }
      : initialState;
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
}
