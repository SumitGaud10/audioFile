export type SongFormat = {
  id?: string;

  title: string;
  artist: string;

  album?: string;
  albumArtist?: string;

  track?: number;
  disc?: number;

  date?: string;
  year?: number;

  genre?: string;

  imageUrl?: string;
  previewImageUrl?: string;

  composer?: string;
  comment?: string;
};
