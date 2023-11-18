import {MatchRankFunction} from '../types/MatchRankFunction';
import {fullAcronym} from '../utils/fullAcronym';
import {fullUnorderedMatchRatioRank} from './fullUnorderedMatchRatioRank';

export const fullAcronymUnorderedMatchRatioRank: MatchRankFunction = (search) => (value) => {
  const acronym = fullAcronym(value);
  return fullUnorderedMatchRatioRank(search)(acronym);
}