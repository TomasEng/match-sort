import {StringMatchPredicates} from '../static-classes/StringMatchPredicates';
import {StringTransform} from '../static-classes/StringTransform';
import {StringTransformationFunction} from '../types/StringTransformationFunction';
import {StringMatchRank} from '../static-classes/StringMatchRank';
import {StringMatchPredicateBuilders} from '../static-classes/StringMatchPredicateBuilders';
import {StringMatchSort} from '../classes/StringMatchSort';

const defaultTransformations: StringTransformationFunction[] = [
  StringTransform.trim,
  StringTransform.lowercase,
  StringTransform.removeAccents,
  StringTransform.removePunctuation
];

export const generalTextMatcher = new StringMatchSort(defaultTransformations)
  .chain(StringMatchPredicates.equals)
  .chain(StringMatchPredicates.startsWith)
  .chain(StringMatchPredicates.hasWord)
  .chain(StringMatchPredicates.hasPart)
  .chain(StringMatchPredicateBuilders.someWord(StringMatchPredicates.startsWith))
  .chain(StringMatchPredicateBuilders.somePart(StringMatchPredicates.startsWith))
  .chain(StringMatchPredicates.contains)
  .chain(StringMatchPredicates.hasAcronym)
  .chain(StringMatchRank.orderedMatchRatioRank)
  .chain(StringMatchRank.unorderedMatchRatioRank)
  .setFilter(StringMatchPredicates.containsAllCharacters);
