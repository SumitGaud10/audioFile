import { useContext } from "react";
import { AppStateContext } from "./AppStateContext";

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if(!context){
        throw new Error("useAppState can only be used inside AppStateProvider")
    }
    return context;
}