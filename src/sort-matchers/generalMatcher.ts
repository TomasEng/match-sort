import {matchRatioRank} from '../number-rank-functions/matchRatioRank';
import {StringTransformation} from '../types/StringTransformation';
import {MatchSort} from '../classes/MatchSort';
import {unorderedMatchRatioRank} from '../number-rank-functions/unorderedMatchRatioRank';
import {StringMatchPredicate} from '../static-classes/StringMatchPredicate';

const defaultTransformations: StringTransformation[] = ['trim', 'lowercase', 'removeAccents', 'removePunctuation'];

const matcher = new MatchSort();

export const generalMatcher = matcher
  .chain(StringMatchPredicate.equals, defaultTransformations)
  .chain(StringMatchPredicate.startsWith, defaultTransformations)
  .chain(StringMatchPredicate.hasWord, defaultTransformations)
  .chain(StringMatchPredicate.hasPart, defaultTransformations)
  .chain(StringMatchPredicate.hasWordStartingWith, defaultTransformations)
  .chain(StringMatchPredicate.hasPartStartingWith, defaultTransformations)
  .chain(StringMatchPredicate.contains, defaultTransformations)
  .chain(StringMatchPredicate.hasAcronym, defaultTransformations)
  .chain(matchRatioRank, defaultTransformations)
  .chain(unorderedMatchRatioRank, defaultTransformations)
  .setFilter(StringMatchPredicate.containsAllCharacters, defaultTransformations);
