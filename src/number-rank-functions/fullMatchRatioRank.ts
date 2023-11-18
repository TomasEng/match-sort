import {MatchRankFunction} from '../types/MatchRankFunction';
import {containsAllCharactersInOrder} from '../boolean-rank-functions/containsAllCharactersInOrder';

export const fullMatchRatioRank: MatchRankFunction = (search) => (value) => {
  if (!containsAllCharactersInOrder(search)(value)) return 1;
  else return 1 - (search.length / value.length);
};