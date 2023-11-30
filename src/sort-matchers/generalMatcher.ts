import {MatchSort} from '../classes/MatchSort';
import {StringMatchPredicate} from '../static-classes/StringMatchPredicate';
import {StringTransform} from '../static-classes/StringTransform';
import {StringTransformationFunction} from '../types/StringTransformationFunction';
import {StringMatchRank} from '../static-classes/StringMatchRank';

const defaultTransformations: StringTransformationFunction[] = [
  StringTransform.trim,
  StringTransform.lowercase,
  StringTransform.removeAccents,
  StringTransform.removePunctuation
];

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
  .chain(StringMatchRank.orderedMatchRatioRank, defaultTransformations)
  .chain(StringMatchRank.unorderedMatchRatioRank, defaultTransformations)
  .setFilter(StringMatchPredicate.containsAllCharacters, defaultTransformations);
