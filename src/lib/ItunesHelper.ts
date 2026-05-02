import type { ITunesSearchResponse } from "../Types/itunes";
import { type SongFormat } from "../Types/SongFormat";
import { normalizeArtists } from "../utils/normalizeArtist";

const ItunesHelper = async (name: string) => {
  const params = new URLSearchParams({
    limit: "20",
    entity: "song",
    term: name,
  });

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`iTunes ${response.status}: ${text.slice(0, 100)}`);
    }

    const data = (await response.json()) as ITunesSearchResponse;

    if (data.results.length === 0) {
      throw new Error("iTunes: No Song Found");
    }

    const result: SongFormat[] = data.results.map((value) => ({
      id: value.trackId.toString(),
      title: value.trackName,
      artist: normalizeArtists(value.artistName),
      album: value.collectionName,
      track: value.trackNumber,
      year: value.releaseDate
        ? new Date(value.releaseDate).getFullYear()
        : undefined,
      imageUrl: value.artworkUrl100?.replace("100x100bb", "1000x1000bb"),
      date: value.releaseDate
        ? new Date(value.releaseDate).toISOString()
        : undefined,
      albumArtist: value.collectionArtistName
        ? normalizeArtists(value.collectionArtistName)
        : undefined,
      disc: value.discNumber,
      genre: value.primaryGenreName,
      previewImageUrl: value.artworkUrl100,
    }));

    return result;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("iTunes: Unexpected error occured");
  }
};

export default ItunesHelper;
