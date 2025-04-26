import { useContext } from "react";
import { MovieContext } from "./MovieContext";

export function useMoviesContext() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMoviesContext must be used within a MovieProvider");
  }
  return context;
}
