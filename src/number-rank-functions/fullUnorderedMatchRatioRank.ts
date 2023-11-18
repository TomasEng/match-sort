import {MatchRankFunction} from '../types/MatchRankFunction';
import {containsAllCharacters} from '../boolean-rank-functions/containsAllCharacters';

export const fullUnorderedMatchRatioRank: MatchRankFunction = (search) => (value) => {
  if (!containsAllCharacters(search)(value)) return 1;
  else return 1 - (search.length / value.length);
};