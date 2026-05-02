export const normalizeArtists = (artist: string): string => {
  if (!artist) return "";

  return artist
    // unify all separators → comma
    .replace(/\s*(feat\.?|ft\.?|featuring)\s*/gi, ",")
    .replace(/\s*&\s*/g, ",")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s*\+\s*/g, ",")
    .replace(/\s*and\s*/gi, ",")

    // split into array
    .split(",")

    // clean each artist
    .map((a) => a.trim())

    // remove empty values
    .filter(Boolean)

    // remove duplicates
    .filter((a, i, arr) => arr.indexOf(a) === i)

    // join in your format
    .join("; ");
};