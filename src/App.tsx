import LandingPage from "./Pages/LandingPage";
import EditingPage from "./Pages/EditingPage";
import useAppState from "./Context/AppState/useAppState";
import TempAudioProvidor from "./Context/TempAudio/TempAudioProvidor";

function App() {
  const { state } = useAppState();
  return (
    <TempAudioProvidor>
      {state == "Landing" && <LandingPage />}
      {state == "Editing" && <EditingPage />}
    </TempAudioProvidor>
  );
}

export default App;
