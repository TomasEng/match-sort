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

export const generalMatcher = new MatchSort(defaultTransformations)
  .chain(StringMatchPredicate.equals)
  .chain(StringMatchPredicate.startsWith)
  .chain(StringMatchPredicate.hasWord)
  .chain(StringMatchPredicate.hasPart)
  .chain(StringMatchPredicate.hasWordStartingWith)
  .chain(StringMatchPredicate.hasPartStartingWith)
  .chain(StringMatchPredicate.contains)
  .chain(StringMatchPredicate.hasAcronym)
  .chain(StringMatchRank.orderedMatchRatioRank)
  .chain(StringMatchRank.unorderedMatchRatioRank)
  .setFilter(StringMatchPredicate.containsAllCharacters);
