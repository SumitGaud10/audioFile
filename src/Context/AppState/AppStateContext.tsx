import { createContext } from "react";

export type AppStateType = "Landing"|"Editing";

type AppStateContextType = {
    state: AppStateType;
    changeState: (state:AppStateType)=>void
}

export const AppStateContext = createContext<AppStateContextType|undefined>(undefined);