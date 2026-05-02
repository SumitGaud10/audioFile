import type { SongFormat } from "../Types/SongFormat";
import { ID3Writer } from "browser-id3-writer";
export const ExportAudio = async (
  data: SongFormat,
  audioBuffer: ArrayBuffer,
) => {
  let imageArrayBuffer: ArrayBuffer | undefined;

  if (data.imageUrl) {
    imageArrayBuffer = await fetch(data.imageUrl)
      .then((res) => res.blob())
      .then((blob) => blob.arrayBuffer());
  }

  const writer = new ID3Writer(audioBuffer);

  // 🎵 Basic tags
  if (data.title) writer.setFrame("TIT2", data.title);
  if (data.artist) writer.setFrame("TPE1", data.artist.split("; "));
  if (data.album) writer.setFrame("TALB", data.album);
  if (data.albumArtist) writer.setFrame("TPE2", data.albumArtist);
  if (data.genre) writer.setFrame("TCON", [data.genre]);
  if (data.composer) writer.setFrame("TCOM", [data.composer]);

  // 📅 Date / year
  if (data.year) writer.setFrame("TYER", data.year);
  if (data.date) writer.setFrame("TDAT", data.date);

  // 💿 Track / disc
  if (data.track) writer.setFrame("TRCK", data.track.toString());
  if (data.disc) writer.setFrame("TPOS", data.disc.toString());

  // 💬 Comment
  if (data.comment) {
    writer.setFrame("COMM", {
      description: "",
      text: data.comment,
    });
  }

  // 🖼️ Cover image
  if (imageArrayBuffer) {
    writer.setFrame("APIC", {
      type: 3, // front cover
      data: imageArrayBuffer,
      description: "Cover",
    });
  }

  // ✅ Finalize tags
  writer.addTag();

  const url = writer.getURL();

  const a = document.createElement("a");
  a.href = url;
  a.download = `${data.title || "audio"}.mp3`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  writer.revokeURL();
};

export default ExportAudio;
