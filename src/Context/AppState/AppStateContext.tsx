import { createContext } from "react";

export type AppStateType = "Landing" | "Editing";

type AppStateContextType = {
  state: AppStateType;
  changeState: (state: AppStateType) => void;
};

const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined,
);
export default AppStateContext;
