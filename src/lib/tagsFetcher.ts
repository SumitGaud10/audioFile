import ItunesHelper from "./ItunesHelper";
import MusicBrainzHelper from "./MusicBrainzHelper";

const tagsFetcher = { MusicBrainzHelper, ItunesHelper };
export default tagsFetcher;

export type tagsFetcherKey = keyof typeof tagsFetcher;
