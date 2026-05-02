export interface MusicBrainzRecordingResponse {
  created: string; // ISO date string
  count: number;
  offset: number;
  recordings: Recording[];
}
export interface Recording {
  id: string;
  score: number;
  title: string;
  length?: number;
  video: boolean | null;
  "first-release-date"?: string;
  "artist-credit-id": string;
  "artist-credit": ArtistCredit[];
  releases?: Release[];
  isrcs?: string[];
}

export interface ArtistCredit {
  name: string;
  joinphrase?: string;
  artist: Artist;
}

export interface Artist {
  id: string;
  name: string;
  "sort-name": string;
  disambiguation?: string;
  aliases?: Alias[];
}

export interface Alias {
  name: string;
  "sort-name": string;
  locale?: string | null;
  type?: string | null;
  primary?: boolean | null;
  "begin-date"?: string | null;
  "end-date"?: string | null;
  "type-id"?: string;
}

export interface Release {
  id: string;
  title: string;
  status: string;
  count: number;
  date?: string;
  country?: string;
  disambiguation?: string;
  "artist-credit-id"?: string;
  "artist-credit"?: ArtistCredit[];
  "release-group": ReleaseGroup;
  "release-events"?: ReleaseEvent[];
  "track-count"?: number;
  media?: Media[];
}

export interface ReleaseGroup {
  id: string;
  title: string;
  "primary-type": string;
  "primary-type-id": string;
  "type-id": string;
  "secondary-types"?: string[];
  "secondary-type-ids"?: string[];
}

export interface ReleaseEvent {
  date?: string;
  area: Area;
}

export interface Area {
  id: string;
  name: string;
  "sort-name": string;
  "iso-3166-1-codes"?: string[];
}

export interface Media {
  id: string;
  position: number;
  format: string;
  "track-count": number;
  "track-offset": number;
  track: Track[];
}

export interface Track {
  id: string;
  number: string;
  title: string;
  length?: number;
}
