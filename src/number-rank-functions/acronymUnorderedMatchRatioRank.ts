import {MatchRankFunction} from '../types/MatchRankFunction';
import {acronym} from '../utils/acronym';
import {fullUnorderedMatchRatioRank} from './fullUnorderedMatchRatioRank';

export const acronymUnorderedMatchRatioRank: MatchRankFunction = (search) => (value) => {
  const wordAcronym = acronym(value);
  return fullUnorderedMatchRatioRank(search)(wordAcronym);
}