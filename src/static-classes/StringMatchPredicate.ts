import {MatchPredicate} from '../types/MatchPredicate';
import {acronym} from '../utils/acronym';
import {fullAcronym} from '../utils/fullAcronym';
import {splitInParts} from '../utils/splitInParts';
import {splitInWords} from '../utils/splitInWords';
import {firstPart} from '../utils/firstPart';
import {firstWord} from '../utils/firstWord';

export class StringMatchPredicate {
  static acronymContainsAllCharacters: MatchPredicate = (search) => (value) => {
    const wordAcronym = acronym(value);
    return this.containsAllCharacters(search)(wordAcronym);
  };

  static acronymContainsAllCharactersInOrder: MatchPredicate = (search) => (value): boolean => {
    const wordAcronym = acronym(value);
    return this.containsAllCharactersInOrder(search)(wordAcronym);
  }

  static acronymStartsWith: MatchPredicate = search => text => {
    const wordAcronym = acronym(text);
    const partsAcronym = fullAcronym(text);
    return wordAcronym.startsWith(search) || partsAcronym.startsWith(search);
  };

  static contains: MatchPredicate = search => text => {
    if (!search) return true;
    return text.includes(search);
  };

  static containsAllCharacters: MatchPredicate = (search) => (value) => {
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

  static containsAllCharactersInOrder: MatchPredicate = (search) => (value): boolean => {
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

  static equals: MatchPredicate = (search) => (value) => value === search;

  static fullAcronymContainsAllCharacters: MatchPredicate = search => value => {
    const acronym = fullAcronym(value);
    return this.containsAllCharacters(search)(acronym);
  };

  static fullAcronymContainsAllCharactersInOrder: MatchPredicate = search => value => {
    const acronym = fullAcronym(value);
    return this.containsAllCharactersInOrder(search)(acronym);
  };

  static hasAcronym: MatchPredicate = search => text => {
    const wordsAcronym = acronym(text);
    const partsAcronym = fullAcronym(text);
    return wordsAcronym === search || partsAcronym === search;
  };

  static hasPart: MatchPredicate = (part) => (value) =>
    splitInParts(value).some(p => p === part);

  static hasPartContainingAllCharacters: MatchPredicate = (part) => (text) =>
    splitInParts(text).some(p => this.containsAllCharacters(part)(p));

  static hasPartContainingAllCharactersInOrder: MatchPredicate = (part) => (text) =>
    splitInParts(text).some(p => this.containsAllCharactersInOrder(part)(p));

  static hasPartStartingWith: MatchPredicate = (search) => (value) =>
    splitInParts(value).some(p => p.startsWith(search));

  static hasWord: MatchPredicate = word => text => {
    const words = splitInWords(text);
    return words.some(w => w === word);
  };

  static hasWordContainingAllCharacters: MatchPredicate = (search) => (text) =>
    splitInWords(text).some(word => this.containsAllCharacters(search)(word));

  static hasWordContainingAllCharactersInOrder: MatchPredicate = (search) => (text) =>
    splitInWords(text).some(word => this.containsAllCharactersInOrder(search)(word));

  static hasWordStartingWith: MatchPredicate = search => text => {
    const words = splitInWords(text);
    return words.some(w => this.startsWith(search)(w));
  };

  static startsWith: MatchPredicate = (str) => (value) => value.startsWith(str);

  static startsWithPartContainingAllCharacters: MatchPredicate = search => text => {
    if (!search) return true;
    const part = firstPart(text);
    return this.containsAllCharacters(search)(part);
  };

  static startsWithPartContainingAllCharactersInOrder: MatchPredicate = search => text => {
    if (!search) return true;
    const part = firstPart(text);
    return this.containsAllCharactersInOrder(search)(part);
  };

  static startsWithWordContainingAllCharacters: MatchPredicate = search => text => {
    if (!search) return true;
    const word = firstWord(text);
    return this.containsAllCharacters(search)(word);
  };

  static startsWithWordContainingAllCharactersInOrder: MatchPredicate = search => text => {
    if (!search) return true;
    const word = firstWord(text);
    return this.containsAllCharactersInOrder(search)(word);
  };
}