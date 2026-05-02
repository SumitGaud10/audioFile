import ItunesHelper from "./ItunesHelper";
import MusicBrainzHelper from "./MusicBrainzHelper";

const MusicInfoFetcher = { MusicBrainzHelper, ItunesHelper };
export default MusicInfoFetcher;

export type MusicInfoFetcherArgs = keyof typeof MusicInfoFetcher;
