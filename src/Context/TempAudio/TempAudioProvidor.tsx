import { useState, type ReactNode } from "react";
import TempAudioContext from "./TempAudioContext";
import type { SongFormat } from "../../Types/SongFormat";
import ExtractInfo from "../../lib/MusicDataExtractor";

function TempAudioProvidor({ children }: { children: ReactNode }) {
  const [audio, setAudio] = useState<undefined | SongFormat>(undefined);
  const [audioBuffer, setAudioBuffer] = useState<undefined | ArrayBuffer>();

  const changeAudio = (newAudio: ArrayBuffer) => {
    const data = ExtractInfo(newAudio);
    setAudio(data);
    setAudioBuffer(newAudio);
  };

  return (
    <TempAudioContext.Provider value={{ audio, audioBuffer, changeAudio }}>
      {children}
    </TempAudioContext.Provider>
  );
}

export default TempAudioProvidor;
