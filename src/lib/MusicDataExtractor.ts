import MP3Tag from "mp3tag.js";
import type { SongFormat } from "../Types/SongFormat";

const ExtractInfo = (audio: ArrayBuffer): SongFormat => {
  const mp3tag = new MP3Tag(audio, true);
  mp3tag.read();

  const tags = mp3tag.tags;
  const v2 = tags.v2;

  let imageUrl: undefined | string = undefined;

  if (v2?.APIC?.[0].data) {
    const imageArray = new Uint8Array(v2?.APIC?.[0].data);
    const imageBlob = new Blob([imageArray], {
      type: v2.APIC[0].format,
    });
    imageUrl = URL.createObjectURL(imageBlob);
  }

  // helpers
  const parseNumber = (value?: string) => {
    if (!value) return undefined;
    const num = parseInt(value.split("/")[0]); // handles "12/14"
    return isNaN(num) ? undefined : num;
  };

  const result: SongFormat = {
    title: tags.title || "",
    artist: tags.artist || "",

    album: tags.album || undefined,

    albumArtist:
      v2?.TPE2 || // ID3v2 album artist
      tags.v1?.artist || // fallback
      tags.artist ||
      undefined,

    track: parseNumber(tags.track),
    disc: parseNumber(v2?.TPOS),

    date: tags.year || undefined,
    year: tags.year ? parseInt(tags.year) : undefined,

    genre: tags.genre || undefined,

    imageUrl,
  };

  return result;
};

export default ExtractInfo;
