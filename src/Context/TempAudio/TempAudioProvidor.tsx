import { useState, type ReactNode } from "react";
import TempAudioContext from "./TempAudioContext";
import type { SongFormat } from "../../Types/SongFormat";
import ExtractInfo from "../../lib/MusicDataExtractor";

function TempAudioProvidor({ children }: { children: ReactNode }) {
  const [audio, setAudio] = useState<undefined | SongFormat>(undefined);
  const [audioBuffer, setAudioBuffer] = useState<undefined | ArrayBuffer>();
  const [fileExtension, setFileExtension] = useState<undefined | string>();

  const changeAudio = async (newAudio: File) => {
    const newAudioBuffer = await newAudio.arrayBuffer();
    setFileExtension(newAudio.name.split(".").pop());
    if (audio?.imageUrl && audio.imageUrl.startsWith("blob")) {
      URL.revokeObjectURL(audio.imageUrl);
    }
    const data = await ExtractInfo(newAudioBuffer);
    setAudio(data);
    setAudioBuffer(newAudioBuffer);
  };

  return (
    <TempAudioContext.Provider
      value={{ audio, audioBuffer, changeAudio, fileExtension }}
    >
      {children}
    </TempAudioContext.Provider>
  );
}

export default TempAudioProvidor;
