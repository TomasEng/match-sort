import {MatchRankFunction} from '../types/MatchRankFunction';
import {fullAcronym} from '../utils/fullAcronym';
import {fullMatchRatioRank} from './fullMatchRatioRank';

export const fullAcronymMatchRatioRank: MatchRankFunction = (search) => (value) => {
  const acronym = fullAcronym(value);
  return fullMatchRatioRank(search)(acronym);
}