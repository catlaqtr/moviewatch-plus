import { ReactNode, useReducer } from "react";
import { MovieContext } from "./MovieContext";
import { initialState, reducer } from "./MovieTypes";

export function MovieProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
}
