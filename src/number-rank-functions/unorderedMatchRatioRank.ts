import {MatchRankFunction} from '../types/MatchRankFunction';
import {numberRank} from '../utils/numberRank';
import {fullUnorderedMatchRatioRank} from './fullUnorderedMatchRatioRank';
import {fullAcronymUnorderedMatchRatioRank} from './fullAcronymUnorderedMatchRatioRank';
import {acronymUnorderedMatchRatioRank} from './acronymUnorderedMatchRatioRank';

export const unorderedMatchRatioRank: MatchRankFunction = (search) => (value) => {
  if (search.length > value.length) return false;
  const smallestUnit = 1 / value.length;
  const fullRank = numberRank(fullUnorderedMatchRatioRank(search)(value));
  const fullAcronymRank = numberRank(fullAcronymUnorderedMatchRatioRank(search)(value));
  const acronymRank = numberRank(acronymUnorderedMatchRatioRank(search)(value));
  const rank = Math.min(fullAcronymRank, acronymRank, fullRank);
  if (rank >= 1) return 1;
  if (rank === acronymRank) return acronymRank + smallestUnit / 2;
  if (rank === fullAcronymRank) return fullAcronymRank + smallestUnit / 4;
  return rank;
};