import {MatchRankFunction} from '../types/MatchRankFunction';
import {fullMatchRatioRank} from './fullMatchRatioRank';
import {fullAcronymMatchRatioRank} from './fullAcronymMatchRatioRank';
import {acronymMatchRatioRank} from './acronymMatchRatioRank';
import {numberRank} from '../utils/numberRank';

export const matchRatioRank: MatchRankFunction = (search) => (value) => {
  if (search.length > value.length) return false;
  const smallestUnit = 1 / value.length;
  const fullRank = numberRank(fullMatchRatioRank(search)(value));
  const fullAcronymRank = numberRank(fullAcronymMatchRatioRank(search)(value));
  const acronymRank = numberRank(acronymMatchRatioRank(search)(value));
  const rank = Math.min(fullAcronymRank, acronymRank, fullRank);
  if (rank >= 1) return 1;
  if (rank === acronymRank) return acronymRank + smallestUnit / 2;
  if (rank === fullAcronymRank) return fullAcronymRank + smallestUnit / 4;
  return rank;
};