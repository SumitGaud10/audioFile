import { useState, type ReactNode } from "react";
import AppStateContext, { type AppStateType } from "./AppStateContext";

const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppStateType>("Landing");

  const changeState = (state: AppStateType) => {
    setState(state);
  };

  return (
    <AppStateContext.Provider value={{ state, changeState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
