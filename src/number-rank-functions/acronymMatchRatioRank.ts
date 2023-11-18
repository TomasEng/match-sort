import {MatchRankFunction} from '../types/MatchRankFunction';
import {acronym} from '../utils/acronym';
import {fullMatchRatioRank} from './fullMatchRatioRank';

export const acronymMatchRatioRank: MatchRankFunction = (search) => (value) => {
  const wordAcronym = acronym(value);
  return fullMatchRatioRank(search)(wordAcronym);
}