import {StringMatchPredicateBuilder} from '../types/StringMatchPredicateBuilder';
import {splitInWords} from '../utils/splitInWords';
import {splitInParts} from '../utils/splitInParts';
import { wordAcronym } from '../utils/wordAcronym';
import { fullAcronym } from '../utils/fullAcronym';
import { firstWord } from '../utils/firstWord';
import { firstPart } from '../utils/firstPart';

export class StringMatchPredicateBuilders {
  public static someWord: StringMatchPredicateBuilder = predicate => search => value => {
    const words = splitInWords(value);
    return words.some(predicate(search));
  };

  public static somePart: StringMatchPredicateBuilder = predicate => search => value => {
    const parts = splitInParts(value);
    return parts.some(predicate(search));
  };

  public static wordAcronym: StringMatchPredicateBuilder = predicate => search => value => {
    const valueAcronym = wordAcronym(value);
    return predicate(search)(valueAcronym);
  };

  public static fullAcronym: StringMatchPredicateBuilder = predicate => search => value => {
    const valueAcronym = fullAcronym(value);
    return predicate(search)(valueAcronym);
  };

  public static acronym: StringMatchPredicateBuilder = predicate => search => value =>
    this.wordAcronym(predicate)(search)(value) || this.fullAcronym(predicate)(search)(value);

  public static firstWord: StringMatchPredicateBuilder = predicate => search => value => {
    const firstWordOfValue = firstWord(value);
    return predicate(search)(firstWordOfValue);
  };

  public static firstPart: StringMatchPredicateBuilder = predicate => search => value => {
    const firstPartOfValue = firstPart(value);
    return predicate(search)(firstPartOfValue);
  };
}