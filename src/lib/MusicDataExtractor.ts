import type { SongFormat } from "../Types/SongFormat";

const ExtractInfo = async (audio: ArrayBuffer): Promise<SongFormat> => {
  const { parseBlob } = await import("music-metadata");
  const blob = new Blob([audio]);
  const reader = await parseBlob(blob);

  const tags = reader.common;

  let imageUrl: undefined | string = undefined;

  if (tags.picture?.[0]) {
    const imageArray = new Uint8Array(tags.picture[0].data);
    const imageBlob = new Blob([imageArray], {
      type: tags.picture[0].format,
    });
    imageUrl = URL.createObjectURL(imageBlob);
  }

  const result: SongFormat = {
    title: tags.title || "",
    artist: tags.artist || "",
    album: tags.album || undefined,
    albumArtist: tags.albumartist || undefined,
    track: tags.track.no || undefined,

    date: tags.date || undefined,
    year: tags.year ? tags.year : undefined,

    genre: tags.genre?.join("; ") || undefined,

    imageUrl,
  };

  return result;
};

export default ExtractInfo;
