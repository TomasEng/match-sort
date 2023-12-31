import {numberRank} from '../utils/numberRank';
import {StringMatchRank} from './StringMatchRank';

describe('StringMatchRank', () => {
  describe('orderedMatchRatioRank', () => {
    it('Returns 0 when the match is exact', () => {
      expect(StringMatchRank.orderedMatchRatioRank('abc')('abc')).toBe(0);
    });

    it('Returns a better rank if the match is exact than if the wordAcronym match is exact', () => {
      const search = 'abc';
      const acronymMatch = 'ad bd cd';
      const exactRank = StringMatchRank.orderedMatchRatioRank(search)(search);
      const acronymRank = StringMatchRank.orderedMatchRatioRank(search)(acronymMatch);
      expect(numberRank(exactRank)).toBeLessThan(numberRank(acronymRank));
    });

    it('Returns a better rank for a value of which the wordAcronym matches best and better than a value of which the full match matches best', () => {
      const search = 'abc';
      const acronymMatch = 'ad bd cd dd';
      const fullMatch = 'abcde';
      const acronymRank = StringMatchRank.orderedMatchRatioRank(search)(acronymMatch);
      const fullMatchRank = StringMatchRank.orderedMatchRatioRank(search)(fullMatch);
      expect(numberRank(acronymRank)).toBeLessThan(numberRank(fullMatchRank));
    });

    it('Returns a better rank for a value of which the full match matches best and better than a value of which the wordAcronym matches best', () => {
      const search = 'abc';
      const acronymMatch = 'ad bd cd dd ed';
      const fullMatch = 'abcd';
      const acronymRank = StringMatchRank.orderedMatchRatioRank(search)(acronymMatch);
      const fullMatchRank = StringMatchRank.orderedMatchRatioRank(search)(fullMatch);
      expect(numberRank(fullMatchRank)).toBeLessThan(numberRank(acronymRank));
    });

    test('General ranking', () => {
      const us = 'us';
      const usa = 'usa';
      const usoa = 'usoa';
      const unitedStates = 'united states';
      const theUnitedStates = 'the united states';
      const unitedStatesAmerica = 'united states america';
      const unitedStatesOfAmerica = 'united states of america';
      const theUnitedStatesOfAmerica = 'the united states of america';
      const unitedStatesWithDash = 'united-states';
      const unitedStatesAmericaWithDash = 'united-states-america';
      const unitedStatesOfAmericaWithDash = 'united-states-of-america';
      const theUnitedStatesOfAmericaWithDash = 'the-united-states-of-america';
      const values = [
        theUnitedStates,
        theUnitedStatesOfAmerica,
        theUnitedStatesOfAmericaWithDash,
        unitedStates,
        unitedStatesAmerica,
        unitedStatesAmericaWithDash,
        unitedStatesOfAmerica,
        unitedStatesOfAmericaWithDash,
        unitedStatesWithDash,
        us,
        usa,
        usoa,
      ];

      const search = 'us';
      const rankFunction = StringMatchRank.orderedMatchRatioRank(search);

      const sorted = values.sort((a, b) => {
        const rankA = rankFunction(a);
        const rankB = rankFunction(b);
        return numberRank(rankA) - numberRank(rankB);
      });

      const expectedResult = [
        us,
        unitedStatesWithDash,
        unitedStates,
        usa,
        unitedStatesAmericaWithDash,
        theUnitedStates,
        unitedStatesAmerica,
        usoa,
        unitedStatesOfAmericaWithDash,
        unitedStatesOfAmerica,
        theUnitedStatesOfAmericaWithDash,
        theUnitedStatesOfAmerica,
      ];

      expect(sorted).toEqual(expectedResult);
    });
  });

  describe('fullStringOrderedMatchRatioRank', () => {
    it('Returns 1 if the value does not contain all characters in order', () => {
      expect(StringMatchRank.fullStringOrderedMatchRatioRank('abc')('def')).toBe(1);
      expect(StringMatchRank.fullStringOrderedMatchRatioRank('Lorem ipsum')('Lipsum')).toBe(1);
    });

    it('Returns 0 if the match is exact', () => {
      expect(StringMatchRank.fullStringOrderedMatchRatioRank('abc')('abc')).toBe(0);
      expect(StringMatchRank.fullStringOrderedMatchRatioRank('Lorem ipsum')('Lorem ipsum')).toBe(0);
    });

    it('Returns a number between 0 and 1 according to the ratio of characters matched, where 0 means an exact match', () => {
      expect(StringMatchRank.fullStringOrderedMatchRatioRank('Lrmpu')('Loremipsum')).toBe(0.5);
      expect(StringMatchRank.fullStringOrderedMatchRatioRank('a')('abcd')).toBe(0.75);
      expect(StringMatchRank.fullStringOrderedMatchRatioRank('abc')('abcd')).toBe(0.25);
    });
  });

  describe('unorderedMatchRatioRank', () => {
    it('Returns 0 when the match is exact', () => {
      expect(StringMatchRank.unorderedMatchRatioRank('abc')('cba')).toBe(0);
    });

    it('Returns a better rank if the match is exact than if the wordAcronym match is exact', () => {
      const search = 'abc';
      const exactMatch = 'cba';
      const acronymMatch = 'cd bd ad';
      const exactRank = StringMatchRank.unorderedMatchRatioRank(search)(exactMatch);
      const acronymRank = StringMatchRank.unorderedMatchRatioRank(search)(acronymMatch);
      expect(numberRank(exactRank)).toBeLessThan(numberRank(acronymRank));
    });

    it('Returns a better rank for a value of which the wordAcronym matches best and better than a value of which the full match matches best', () => {
      const search = 'abc';
      const acronymMatch = 'dd cd bd ad';
      const fullMatch = 'edcba';
      const acronymRank = StringMatchRank.unorderedMatchRatioRank(search)(acronymMatch);
      const fullMatchRank = StringMatchRank.unorderedMatchRatioRank(search)(fullMatch);
      expect(numberRank(acronymRank)).toBeLessThan(numberRank(fullMatchRank));
    });

    it('Returns a better rank for a value of which the full match matches best and better than a value of which the wordAcronym matches best', () => {
      const search = 'abc';
      const acronymMatch = 'ed dd cd bd ad';
      const fullMatch = 'dcba';
      const acronymRank = StringMatchRank.unorderedMatchRatioRank(search)(acronymMatch);
      const fullMatchRank = StringMatchRank.unorderedMatchRatioRank(search)(fullMatch);
      expect(numberRank(fullMatchRank)).toBeLessThan(numberRank(acronymRank));
    });

    test('General ranking', () => {
      const us = 'us';
      const usa = 'usa';
      const usoa = 'usoa';
      const unitedStates = 'united states';
      const theUnitedStates = 'the united states';
      const unitedStatesAmerica = 'united states america';
      const unitedStatesOfAmerica = 'united states of america';
      const theUnitedStatesOfAmerica = 'the united states of america';
      const unitedStatesWithDash = 'united-states';
      const unitedStatesAmericaWithDash = 'united-states-america';
      const unitedStatesOfAmericaWithDash = 'united-states-of-america';
      const theUnitedStatesOfAmericaWithDash = 'the-united-states-of-america';
      const values = [
        theUnitedStates,
        theUnitedStatesOfAmerica,
        theUnitedStatesOfAmericaWithDash,
        unitedStates,
        unitedStatesAmerica,
        unitedStatesAmericaWithDash,
        unitedStatesOfAmerica,
        unitedStatesOfAmericaWithDash,
        unitedStatesWithDash,
        us,
        usa,
        usoa,
      ];

      const search = 'su';
      const rankFunction = StringMatchRank.unorderedMatchRatioRank(search);

      const sorted = values.sort((a, b) => {
        const rankA = rankFunction(a);
        const rankB = rankFunction(b);
        return numberRank(rankA) - numberRank(rankB);
      });

      const expectedResult = [
        us,
        unitedStatesWithDash,
        unitedStates,
        usa,
        unitedStatesAmericaWithDash,
        theUnitedStates,
        unitedStatesAmerica,
        usoa,
        unitedStatesOfAmericaWithDash,
        unitedStatesOfAmerica,
        theUnitedStatesOfAmericaWithDash,
        theUnitedStatesOfAmerica,
      ];

      expect(sorted).toEqual(expectedResult);
    });
  });
});