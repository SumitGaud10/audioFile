import { createContext } from "react";
import type { SongFormat } from "../../Types/SongFormat";

type TempAudioContextType = {
  audio: SongFormat | undefined;
  audioBuffer: ArrayBuffer | undefined;
  changeAudio: (audio: File) => Promise<void>;
  fileExtension: string | undefined;
};

const TempAudioContext = createContext<undefined | TempAudioContextType>(
  undefined,
);

export default TempAudioContext;
