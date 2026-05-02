import type { MusicBrainzRecordingResponse } from "../Types/musicbrainzreponse";
import type { SongFormat } from "../Types/SongFormat";

const MusicBrainzHelper = async (query: string) => {
  const params = new URLSearchParams({
    query,
    fmt: "json",
  });

  try {
    const response = await fetch(
      `https://musicbrainz.org/ws/2/recording?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "User-Agent": "audiofile/0.1.0 (srgthegreat2006@gmail.com)",
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const data = await response.text();
      throw new Error(`MusicBrainz ${response.status}: ${data.slice(0, 100)}`);
    }

    const data = (await response.json()) as MusicBrainzRecordingResponse;

    const result: SongFormat[] = data.recordings.map((recording) => ({
      id: recording.id,
      artist: recording["artist-credit"].map((value) => value.name).join("; "),
      title: recording.title,
      album: recording.releases?.[0].title,
      imageUrl: recording.releases?.[0].id
        ? `https://coverartarchive.org/release/${recording.releases?.[0].id}/front-1200`
        : undefined,
      track: recording.releases?.[0]["track-count"],
      date: recording.releases?.[0].date
        ? new Date(recording.releases?.[0].date).toISOString()
        : undefined,
      year: recording.releases?.[0].date
        ? new Date(recording.releases?.[0].date).getFullYear()
        : undefined,
      albumArtist: recording["artist-credit"][0].name,
      previewImageUrl: `https://coverartarchive.org/release/${recording.releases?.[0].id}/front-250`,
    }));

    return result;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("MusicBrainz: Unexpected error occured");
  }
};

export default MusicBrainzHelper;
