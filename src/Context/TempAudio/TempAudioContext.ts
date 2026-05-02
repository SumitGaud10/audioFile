import { createContext } from "react";
import type { SongFormat } from "../../Types/SongFormat";

type TempAudioContextType = {
  audio: SongFormat | undefined;
  audioBuffer: ArrayBuffer | undefined;
  changeAudio: (audio: ArrayBuffer) => void;
};

const TempAudioContext = createContext<undefined | TempAudioContextType>(
  undefined,
);

export default TempAudioContext;
