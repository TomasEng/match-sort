import {StringMatchPredicates} from './StringMatchPredicates';

describe('StringMatchPredicates', () => {

  describe('contains', () => {
    it('Returns true when the text contains the search string', () => {
      expect(StringMatchPredicates.contains('')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicates.contains('lorem')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicates.contains('or')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not contain the search string', () => {
      expect(StringMatchPredicates.contains('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('containsAllCharacters', () => {
    it('Returns true if the value contains all characters in the search parameter', () => {
      expect(StringMatchPredicates.containsAllCharacters('abc')('abc')).toBe(true);
      expect(StringMatchPredicates.containsAllCharacters('abc')('abcd')).toBe(true);
      expect(StringMatchPredicates.containsAllCharacters('abc')('dabc')).toBe(true);
      expect(StringMatchPredicates.containsAllCharacters('cba')('abc')).toBe(true);
      expect(StringMatchPredicates.containsAllCharacters('cba')('dabce')).toBe(true);
    });

    it('Returns false if the value does not contain all characters in the search parameter', () => {
      expect(StringMatchPredicates.containsAllCharacters('abc')('def')).toBe(false);
      expect(StringMatchPredicates.containsAllCharacters('abc')('ab')).toBe(false);
      expect(StringMatchPredicates.containsAllCharacters('abc')('bc')).toBe(false);
      expect(StringMatchPredicates.containsAllCharacters('abc')('ac')).toBe(false);
      expect(StringMatchPredicates.containsAllCharacters('aabc')('abc')).toBe(false);
      expect(StringMatchPredicates.containsAllCharacters('aabc')('abcde')).toBe(false);
    });
  });

  describe('containsAllCharactersInOrder', () => {
    it('Returns true if the parameters are equal', () => {
      expect(StringMatchPredicates.containsAllCharactersInOrder('abc')('abc')).toBe(true);
      expect(StringMatchPredicates.containsAllCharactersInOrder('Lorem ipsum')('Lorem ipsum')).toBe(true);
    });

    it('Returns true if all characters in the first parameter are found in the second parameter in the same order', () => {
      expect(StringMatchPredicates.containsAllCharactersInOrder('ac')('abc')).toBe(true);
      expect(StringMatchPredicates.containsAllCharactersInOrder('ipsum sit')('Lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicates.containsAllCharactersInOrder('Lipsum')('Lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false if there is no match', () => {
      expect(StringMatchPredicates.containsAllCharactersInOrder('abc')('def')).toBe(false);
      expect(StringMatchPredicates.containsAllCharactersInOrder('The')('quick brown fox')).toBe(false);
    });

    it('Returns false if some characters do not match', () => {
      expect(StringMatchPredicates.containsAllCharactersInOrder('abc')('cde')).toBe(false);
      expect(StringMatchPredicates.containsAllCharactersInOrder('Lorem ipsum')('Lipsum')).toBe(false);
    });

    it('Returns false if all characters match, but not in the given order', () => {
      expect(StringMatchPredicates.containsAllCharactersInOrder('abc')('cba')).toBe(false);
      expect(StringMatchPredicates.containsAllCharactersInOrder('Lorem ipsum')('ipsum Lorem')).toBe(false);
    });

    it('Returns true if the first parameter is empty', () => {
      expect(StringMatchPredicates.containsAllCharactersInOrder('')('abc')).toBe(true);
      expect(StringMatchPredicates.containsAllCharactersInOrder('')('')).toBe(true);
    });
  });

  describe('equals', () => {
    it('Returns true when the text equals the search string', () => {
      expect(StringMatchPredicates.equals('lorem ipsum dolor sit amet')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not equal the search string', () => {
      expect(StringMatchPredicates.equals('lorem ipsum')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasAcronym', () => {
    it('Returns true when the text has an wordAcronym that matches the search string', () => {
      expect(StringMatchPredicates.hasAcronym('lidsa')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns true for both full acronyms and word acronyms', () => {
      expect(StringMatchPredicates.hasAcronym('lisa')('lorem ipsum-dolor sit amet')).toBe(true);
      expect(StringMatchPredicates.hasAcronym('lidsa')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have an wordAcronym that matches the search string', () => {
      expect(StringMatchPredicates.hasAcronym('lisa')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasPart', () => {
    it('Returns true when the text has a part that matches the search string', () => {
      expect(StringMatchPredicates.hasPart('lorem')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicates.hasPart('ipsum')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicates.hasPart('ipsum')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a part that matches the search string', () => {
      expect(StringMatchPredicates.hasPart('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicates.hasPart('lipsum')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasWord', () => {
    it('Returns true when the text has a word that matches the search string', () => {
      expect(StringMatchPredicates.hasWord('lorem')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicates.hasWord('ipsum')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a word that matches the search string', () => {
      expect(StringMatchPredicates.hasWord('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicates.hasWord('ipsum')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('startsWith', () => {
    it('Returns true when the text starts with the search string', () => {
      expect(StringMatchPredicates.startsWith('')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicates.startsWith('l')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicates.startsWith('lorem')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not start with the search string', () => {
      expect(StringMatchPredicates.startsWith('ipsum')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });
});