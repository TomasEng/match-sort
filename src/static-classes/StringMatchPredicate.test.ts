import {StringMatchPredicate} from './StringMatchPredicate';

describe('StringMatchPredicate', () => {
  describe('acronymContainsAllCharacters', () => {
    it('Returns true when the acronym contains all the characters in the search string', () => {
      expect(StringMatchPredicate.acronymContainsAllCharacters('ilsa')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the acronym does not contain all the characters in the search string', () => {
      expect(StringMatchPredicate.acronymContainsAllCharacters('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
    });

    it('Does not take dashes into account', () => {
      expect(StringMatchPredicate.acronymContainsAllCharacters('ilsa')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('acronymContainsAllCharactersInOrder', () => {
    it('Returns true when the acronym contains all the characters in the search string in the same order', () => {
      expect(StringMatchPredicate.acronymContainsAllCharactersInOrder('lisa')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the acronym does not contain all the characters in the search string', () => {
      expect(StringMatchPredicate.acronymContainsAllCharactersInOrder('ilsa')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.acronymContainsAllCharactersInOrder('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
    });

    it('Does not take dashes into account', () => {
      expect(StringMatchPredicate.acronymContainsAllCharactersInOrder('lisa')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('acronymStartsWith', () => {
    it('Returns true when the acronym starts with the search string', () => {
      expect(StringMatchPredicate.acronymStartsWith('')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.acronymStartsWith('l')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.acronymStartsWith('li')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.acronymStartsWith('lid')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.acronymStartsWith('lids')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.acronymStartsWith('lidsa')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the acronym does not start with the search string', () => {
      expect(StringMatchPredicate.acronymStartsWith('lis')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('contains', () => {
    it('Returns true when the text contains the search string', () => {
      expect(StringMatchPredicate.contains('')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.contains('lorem')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.contains('or')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not contain the search string', () => {
      expect(StringMatchPredicate.contains('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('containsAllCharacters', () => {
    it('Returns true if the value contains all characters in the search parameter', () => {
      expect(StringMatchPredicate.containsAllCharacters('abc')('abc')).toBe(true);
      expect(StringMatchPredicate.containsAllCharacters('abc')('abcd')).toBe(true);
      expect(StringMatchPredicate.containsAllCharacters('abc')('dabc')).toBe(true);
      expect(StringMatchPredicate.containsAllCharacters('cba')('abc')).toBe(true);
      expect(StringMatchPredicate.containsAllCharacters('cba')('dabce')).toBe(true);
    });

    it('Returns false if the value does not contain all characters in the search parameter', () => {
      expect(StringMatchPredicate.containsAllCharacters('abc')('def')).toBe(false);
      expect(StringMatchPredicate.containsAllCharacters('abc')('ab')).toBe(false);
      expect(StringMatchPredicate.containsAllCharacters('abc')('bc')).toBe(false);
      expect(StringMatchPredicate.containsAllCharacters('abc')('ac')).toBe(false);
      expect(StringMatchPredicate.containsAllCharacters('aabc')('abc')).toBe(false);
      expect(StringMatchPredicate.containsAllCharacters('aabc')('abcde')).toBe(false);
    });
  });

  describe('containsAllCharactersInOrder', () => {
    it('Returns true if the parameters are equal', () => {
      expect(StringMatchPredicate.containsAllCharactersInOrder('abc')('abc')).toBe(true);
      expect(StringMatchPredicate.containsAllCharactersInOrder('Lorem ipsum')('Lorem ipsum')).toBe(true);
    });

    it('Returns true if all characters in the first parameter are found in the second parameter in the same order', () => {
      expect(StringMatchPredicate.containsAllCharactersInOrder('ac')('abc')).toBe(true);
      expect(StringMatchPredicate.containsAllCharactersInOrder('ipsum sit')('Lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.containsAllCharactersInOrder('Lipsum')('Lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false if there is no match', () => {
      expect(StringMatchPredicate.containsAllCharactersInOrder('abc')('def')).toBe(false);
      expect(StringMatchPredicate.containsAllCharactersInOrder('The')('quick brown fox')).toBe(false);
    });

    it('Returns false if some characters do not match', () => {
      expect(StringMatchPredicate.containsAllCharactersInOrder('abc')('cde')).toBe(false);
      expect(StringMatchPredicate.containsAllCharactersInOrder('Lorem ipsum')('Lipsum')).toBe(false);
    });

    it('Returns false if all characters match, but not in the given order', () => {
      expect(StringMatchPredicate.containsAllCharactersInOrder('abc')('cba')).toBe(false);
      expect(StringMatchPredicate.containsAllCharactersInOrder('Lorem ipsum')('ipsum Lorem')).toBe(false);
    });

    it('Returns true if the first parameter is empty', () => {
      expect(StringMatchPredicate.containsAllCharactersInOrder('')('abc')).toBe(true);
      expect(StringMatchPredicate.containsAllCharactersInOrder('')('')).toBe(true);
    });
  });

  describe('equals', () => {
    it('Returns true when the text equals the search string', () => {
      expect(StringMatchPredicate.equals('lorem ipsum dolor sit amet')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not equal the search string', () => {
      expect(StringMatchPredicate.equals('lorem ipsum')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('fullAcronymContainsAllCharacters', () => {
    it('Returns true when the acronym contains all the characters in the search string', () => {
      expect(StringMatchPredicate.fullAcronymContainsAllCharacters('ilsa')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the acronym does not contain all the characters in the search string', () => {
      expect(StringMatchPredicate.fullAcronymContainsAllCharacters('lipsum')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('fullAcronymContainsAllCharactersInOrder', () => {
    it('Returns true when the acronym contains all the characters in the search string in the same order', () => {
      expect(StringMatchPredicate.fullAcronymContainsAllCharactersInOrder('lisa')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the acronym does not contain all the characters in the search string', () => {
      expect(StringMatchPredicate.fullAcronymContainsAllCharactersInOrder('ilsa')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.fullAcronymContainsAllCharactersInOrder('lipsum')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasAcronym', () => {
    it('Returns true when the text has an acronym that matches the search string', () => {
      expect(StringMatchPredicate.hasAcronym('lidsa')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns true for both full acronyms and word acronyms', () => {
      expect(StringMatchPredicate.hasAcronym('lisa')('lorem ipsum-dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasAcronym('lidsa')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have an acronym that matches the search string', () => {
      expect(StringMatchPredicate.hasAcronym('lisa')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasPart', () => {
    it('Returns true when the text has a part that matches the search string', () => {
      expect(StringMatchPredicate.hasPart('lorem')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPart('ipsum')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPart('ipsum')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a part that matches the search string', () => {
      expect(StringMatchPredicate.hasPart('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPart('lipsum')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasPartContainingAllCharacters', () => {
    it('Returns true when the text has a part that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.hasPartContainingAllCharacters('misu')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPartContainingAllCharacters('misu')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a part that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.hasPartContainingAllCharacters('lisa')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharacters('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharacters('lisa')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharacters('lipsum')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharacters('lorips')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasPartContainingAllCharactersInOrder', () => {
    it('Returns true when the text has a part that contains all the characters in the search string in the same order', () => {
      expect(StringMatchPredicate.hasPartContainingAllCharactersInOrder('isum')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPartContainingAllCharactersInOrder('isum')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a part that contains all the characters in the search string in the same order', () => {
      expect(StringMatchPredicate.hasPartContainingAllCharactersInOrder('misu')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharactersInOrder('lisa')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharactersInOrder('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharactersInOrder('misu')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharactersInOrder('lisa')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharactersInOrder('lipsum')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartContainingAllCharactersInOrder('lorips')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasPartStartingWith', () => {
    it('Returns true when the text has a part that starts with the search string', () => {
      expect(StringMatchPredicate.hasPartStartingWith('')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPartStartingWith('i')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPartStartingWith('ips')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPartStartingWith('ipsum')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPartStartingWith('')('lore-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPartStartingWith('i')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPartStartingWith('ips')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasPartStartingWith('ipsum')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a part that starts with the search string', () => {
      expect(StringMatchPredicate.hasPartStartingWith('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartStartingWith('psum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartStartingWith('lipsum')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasPartStartingWith('psum')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasWord', () => {
    it('Returns true when the text has a word that matches the search string', () => {
      expect(StringMatchPredicate.hasWord('lorem')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWord('ipsum')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a word that matches the search string', () => {
      expect(StringMatchPredicate.hasWord('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasWord('ipsum')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasWordContainingAllCharacters', () => {
    it('Returns true when the text has a word that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.hasWordContainingAllCharacters('misu')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordContainingAllCharacters('misu')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordContainingAllCharacters('lipsum')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordContainingAllCharacters('l-ipsum')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordContainingAllCharacters('ipsum-l')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordContainingAllCharacters('olo')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a word that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.hasWordContainingAllCharacters('lisa')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasWordContainingAllCharacters('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasWordContainingAllCharacters('lisa')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasWordContainingAllCharactersInOrder', () => {
    it('Returns true when the text has a word that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.hasWordContainingAllCharactersInOrder('lipsum')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordContainingAllCharactersInOrder('l-ipsum')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordContainingAllCharactersInOrder('olo')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordContainingAllCharactersInOrder('misu')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a word that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.hasWordContainingAllCharactersInOrder('lisa')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasWordContainingAllCharactersInOrder('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasWordContainingAllCharactersInOrder('lisa')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasWordContainingAllCharactersInOrder('misu')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasWordContainingAllCharactersInOrder('ipsum-l')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('hasWordStartingWith', () => {
    it('Returns true when the text has a word that starts with the search string', () => {
      expect(StringMatchPredicate.hasWordStartingWith('')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordStartingWith('i')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordStartingWith('ips')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.hasWordStartingWith('ipsum')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not have a word that starts with the search string', () => {
      expect(StringMatchPredicate.hasWordStartingWith('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasWordStartingWith('psum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.hasWordStartingWith('ips')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('startsWith', () => {
    it('Returns true when the text starts with the search string', () => {
      expect(StringMatchPredicate.startsWith('')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWith('l')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWith('lorem')('lorem ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not start with the search string', () => {
      expect(StringMatchPredicate.startsWith('ipsum')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('startsWithPartContainingAllCharacters', () => {
    it('Returns true when the text starts with a part that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.startsWithPartContainingAllCharacters('merol')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithPartContainingAllCharacters('merol')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not start with a part that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.startsWithPartContainingAllCharacters('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.startsWithPartContainingAllCharacters('lipsum')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('startsWithPartContainingAllCharactersInOrder', () => {
    it('Returns true when the text starts with a part that contains all the characters in the search string in the same order', () => {
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('lor')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('lorem')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('lor')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('lorem')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not start with a part that contains all the characters in the search string in the same order', () => {
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('lipsum')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('merol')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.startsWithPartContainingAllCharactersInOrder('merol')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  })

  describe('startsWithWordContainingAllCharacters', () => {
    it('Returns true when the text starts with a word that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.startsWithWordContainingAllCharacters('merol')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithWordContainingAllCharacters('mer-olips')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not start with a word that contains all the characters in the search string', () => {
      expect(StringMatchPredicate.startsWithWordContainingAllCharacters('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.startsWithWordContainingAllCharacters('lipsumdolor')('lorem-ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.startsWithWordContainingAllCharacters('dolor')('lorem-ipsum dolor sit amet')).toBe(false);
    });
  });

  describe('startsWithWordContainingAllCharactersInOrder', () => {
    it('Returns true when the text starts with a word that contains all the characters in the search string in the same order', () => {
      expect(StringMatchPredicate.startsWithWordContainingAllCharactersInOrder('')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithWordContainingAllCharactersInOrder('ore')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithWordContainingAllCharactersInOrder('lorem')('lorem ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithWordContainingAllCharactersInOrder('oremips')('lorem-ipsum dolor sit amet')).toBe(true);
      expect(StringMatchPredicate.startsWithWordContainingAllCharactersInOrder('orem-ips')('lorem-ipsum dolor sit amet')).toBe(true);
    });

    it('Returns false when the text does not start with a word that contains all the characters in the search string in the same order', () => {
      expect(StringMatchPredicate.startsWithWordContainingAllCharactersInOrder('lipsum')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.startsWithWordContainingAllCharactersInOrder('lipsumdolor')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.startsWithWordContainingAllCharactersInOrder('dolor')('lorem ipsum dolor sit amet')).toBe(false);
      expect(StringMatchPredicate.startsWithWordContainingAllCharactersInOrder('merol')('lorem ipsum dolor sit amet')).toBe(false);
    });
  });
});