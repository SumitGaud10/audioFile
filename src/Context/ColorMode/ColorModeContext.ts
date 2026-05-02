import { createContext } from "react";

export type ThemeType = "light" | "dark";

type ColorModeContextType = {
    mode: ThemeType;
    themeChanger: (newTheme:ThemeType)=>void;
}

export const ColorModeContext = createContext<ColorModeContextType|undefined>(undefined);