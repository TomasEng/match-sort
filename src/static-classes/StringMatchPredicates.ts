import {StringMatchPredicate} from '../types/StringMatchPredicate';
import {StringMatchPredicateBuilders} from './StringMatchPredicateBuilders';

export class StringMatchPredicates {

  static containsAllCharacters: StringMatchPredicate = (search) => (value) => {
    if (search.length > value.length) return false;
    const searchCharacters = search.split('');
    const valueCharacters = value.split('');
    for (const char of searchCharacters) {
      const index = valueCharacters.indexOf(char);
      if (index === -1) return false;
      valueCharacters.splice(index, 1);
    }
    return true;
  };

  static containsAllCharactersInOrder: StringMatchPredicate = (search) => (value): boolean => {
    if (!search) return true;
    let searchIndex = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === search[searchIndex]) {
        searchIndex++;
        if (searchIndex === search.length) return true;
      }
    }
    return false;
  };

  static contains: StringMatchPredicate = search => text => {
    if (!search) return true;
    return text.includes(search);
  };

  static equals: StringMatchPredicate = (search) => (value) => value === search;

  static startsWith: StringMatchPredicate = (str) => (value) => value.startsWith(str);

  static hasAcronym: StringMatchPredicate =
    StringMatchPredicateBuilders.acronym(this.equals);

  static hasPart: StringMatchPredicate =
    StringMatchPredicateBuilders.somePart(this.equals);

  static hasWord: StringMatchPredicate =
    StringMatchPredicateBuilders.someWord(this.equals);
}