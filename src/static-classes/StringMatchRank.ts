import {MatchRankFunction} from '../types/MatchRankFunction';
import {StringMatchPredicates} from './StringMatchPredicates';
import {wordAcronym} from '../utils/wordAcronym';
import {fullAcronym} from '../utils/fullAcronym';
import {DEEP_RANK_STRING_LENGTH_LIMIT} from '../constants';
import {numberRank} from '../utils/numberRank';

export class StringMatchRank {

  public static orderedMatchRatioRank: MatchRankFunction<string> = (search) => (value) => {
    if (search.length > value.length) return false;
    const smallestUnit = 1 / DEEP_RANK_STRING_LENGTH_LIMIT;
    const fullRank = numberRank(this.fullStringOrderedMatchRatioRank(search)(value));
    const fullAcronymRank = numberRank(this.fullAcronymOrderedMatchRatioRank(search)(value));
    const acronymRank = numberRank(this.acronymOrderedMatchRatioRank(search)(value));
    const rank = Math.min(fullAcronymRank, acronymRank, fullRank);
    if (rank >= 1 || value.length > DEEP_RANK_STRING_LENGTH_LIMIT) return rank;
    if (rank === acronymRank) return acronymRank + smallestUnit / 2;
    if (rank === fullAcronymRank) return fullAcronymRank + smallestUnit / 4;
    return rank;
  };

  public static fullStringOrderedMatchRatioRank: MatchRankFunction<string> = (search) => (value) => {
    if (!StringMatchPredicates.containsAllCharactersInOrder(search)(value)) return 1;
    else return 1 - (search.length / value.length);
  };

  public static fullAcronymOrderedMatchRatioRank: MatchRankFunction<string> = (search) => (value) => {
    const acronym = fullAcronym(value);
    return this.fullStringOrderedMatchRatioRank(search)(acronym);
  };

  public static acronymOrderedMatchRatioRank: MatchRankFunction<string> = (search) => (value) => {
    const acronym = wordAcronym(value);
    return this.fullStringOrderedMatchRatioRank(search)(acronym);
  };

  public static unorderedMatchRatioRank: MatchRankFunction<string> = (search) => (value) => {
    if (search.length > value.length) return false;
    const smallestUnit = 1 / DEEP_RANK_STRING_LENGTH_LIMIT;
    const fullRank = numberRank(this.fullStringUnorderedMatchRatioRank(search)(value));
    const fullAcronymRank = numberRank(this.fullAcronymUnorderedMatchRatioRank(search)(value));
    const acronymRank = numberRank(this.acronymUnorderedMatchRatioRank(search)(value));
    const rank = Math.min(fullAcronymRank, acronymRank, fullRank);
    if (rank >= 1 || value.length > DEEP_RANK_STRING_LENGTH_LIMIT) return rank;
    if (rank === acronymRank) return acronymRank + smallestUnit / 2;
    if (rank === fullAcronymRank) return fullAcronymRank + smallestUnit / 4;
    return rank;
  };

  public static fullStringUnorderedMatchRatioRank: MatchRankFunction<string> = (search) => (value) => {
    if (!StringMatchPredicates.containsAllCharacters(search)(value)) return 1;
    else return 1 - (search.length / value.length);
  };

  public static fullAcronymUnorderedMatchRatioRank: MatchRankFunction<string> = (search) => (value) => {
    const acronym = fullAcronym(value);
    return this.fullStringUnorderedMatchRatioRank(search)(acronym);
  };

  public static acronymUnorderedMatchRatioRank: MatchRankFunction<string> = (search) => (value) => {
    const acronym = wordAcronym(value);
    return this.fullStringUnorderedMatchRatioRank(search)(acronym);
  };
}