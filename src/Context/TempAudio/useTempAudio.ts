import { useContext } from "react";
import TempAudioContext from "./TempAudioContext";

const useTempAudio = () => {
  const context = useContext(TempAudioContext);
  if (!context) {
    throw new Error("Cannot use 'useTempAudio' outside TempAudioProvidor");
  }
  return context;
};

export default useTempAudio;
