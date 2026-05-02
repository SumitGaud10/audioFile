export type Explicitness = "notExplicit" | "explicit" | "cleaned";

export interface ITunesTrack {
  wrapperType: "track";
  kind: "song";

  // IDs
  artistId?: number;
  collectionId?: number;
  trackId: number;

  // Names
  artistName: string;
  collectionName?: string;
  trackName: string;

  collectionCensoredName?: string;
  trackCensoredName?: string;

  // Album Artist (IMPORTANT)
  collectionArtistId?: number;
  collectionArtistName?: string;

  // URLs
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  collectionArtistViewUrl?: string;

  previewUrl?: string;

  // Artwork
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;

  // Pricing (can be weird like -1)
  collectionPrice?: number;
  trackPrice?: number;

  // Dates
  releaseDate: string; // ISO string

  // Explicitness
  collectionExplicitness?: Explicitness;
  trackExplicitness?: Explicitness;

  // Track structure
  discCount?: number;
  discNumber?: number;

  trackCount?: number;
  trackNumber?: number;

  // Duration
  trackTimeMillis?: number;

  // Region
  country?: string;
  currency?: string;

  // Genre
  primaryGenreName?: string;

  // Playback
  isStreamable?: boolean;
}

export type ITunesSearchResponse = {
  resultCount: number;
  results: ITunesTrack[];
};
