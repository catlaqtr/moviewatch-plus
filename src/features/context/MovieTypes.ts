export interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

export interface State {
  movies: Movie[];
  query: string;
  watchlist: Movie[];
  selectedId: string | null;
  isLoading: boolean;
  error: string;
}

export type Action =
  | { type: "startSearching" }
  | { type: "searchSuccess"; payload: Movie[] }
  | { type: "searchError"; payload: string }
  | { type: "selectMovie"; payload: string }
  | { type: "closeMovie" }
  | { type: "addToWatchlist"; payload: Movie }
  | { type: "removeFromWatchlist"; payload: string }
  | { type: "setQuery"; payload: string };

export const initialState: State = {
  movies: [],
  query: "",
  watchlist: [],
  selectedId: null,
  isLoading: false,
  error: "",
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "startSearching":
      return { ...state, isLoading: true, error: "" };
    case "searchSuccess":
      return { ...state, isLoading: false, movies: action.payload };
    case "searchError":
      return { ...state, isLoading: false, error: action.payload };
    case "selectMovie":
      return { ...state, selectedId: action.payload };
    case "closeMovie":
      return { ...state, selectedId: null };
    case "addToWatchlist":
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case "removeFromWatchlist":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case "setQuery":
      return { ...state, query: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}
