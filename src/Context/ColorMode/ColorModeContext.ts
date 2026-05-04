import { createContext } from "react";

export type ThemeType = "light" | "dark";

type ColorModeContextType = {
  mode: ThemeType;
  themeChanger: (newTheme: ThemeType) => void;
};

const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined,
);
export default ColorModeContext;
