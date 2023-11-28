import {MatchRankFunction} from '../types/MatchRankFunction';
import {StringMatchPredicate} from '../static-classes/StringMatchPredicate';

export const fullMatchRatioRank: MatchRankFunction = (search) => (value) => {
  if (!StringMatchPredicate.containsAllCharactersInOrder(search)(value)) return 1;
  else return 1 - (search.length / value.length);
};