import { createTheme, ThemeProvider } from "@mui/material";
import { useMemo, useState, type ReactNode } from "react";
import { ColorModeContext, type ThemeType } from "./ColorModeContext";



export const ColorModeProvider = ({children}:{children:ReactNode}) => {
    const [mode, setMode] = useState<ThemeType>(()=>{
      let currentTheme = localStorage.getItem("theme") as ThemeType;
      if(!currentTheme) currentTheme = "light";
      return currentTheme
    });

    const themeChanger = (newTheme:ThemeType) => {
        localStorage.setItem("theme",newTheme);
        setMode(newTheme);
    }

    const theme = useMemo(()=>createTheme({palette: {mode}}),[mode]); 

    return (
        <ColorModeContext.Provider value={{mode, themeChanger}}>
          <ThemeProvider theme={theme}>

            {children}
          </ThemeProvider>
        </ColorModeContext.Provider>
    )
}