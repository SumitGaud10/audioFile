import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeProvider from "./Context/ColorMode/ColorModeProvider.tsx";
import AppStateProvider from "./Context/AppState/AppState.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <AppStateProvider>
        <CssBaseline />
        <App />
      </AppStateProvider>
    </ColorModeProvider>
  </StrictMode>,
);
