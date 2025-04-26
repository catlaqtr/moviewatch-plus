import { createContext } from "react";
import { State, Action } from "./MovieTypes";

export const MovieContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);
