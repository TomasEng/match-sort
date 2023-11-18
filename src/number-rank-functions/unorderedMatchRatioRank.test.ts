import {numberRank} from '../utils/numberRank';
import {unorderedMatchRatioRank} from './unorderedMatchRatioRank';

describe('unorderedMatchRatioRank', () => {
  it('Returns 0 when the match is exact', () => {
    expect(unorderedMatchRatioRank('abc')('cba')).toBe(0);
  });

  it('Returns a better rank if the match is exact than if the acronym match is exact', () => {
    const search = 'abc';
    const exactMatch = 'cba';
    const acronymMatch = 'cd bd ad';
    const exactRank = unorderedMatchRatioRank(search)(exactMatch);
    const acronymRank = unorderedMatchRatioRank(search)(acronymMatch);
    expect(numberRank(exactRank)).toBeLessThan(numberRank(acronymRank));
  });

  it('Returns a better rank for a value of which the acronym matches best and better than a value of which the full match matches best', () => {
    const search = 'abc';
    const acronymMatch = 'dd cd bd ad';
    const fullMatch = 'edcba';
    const acronymRank = unorderedMatchRatioRank(search)(acronymMatch);
    const fullMatchRank = unorderedMatchRatioRank(search)(fullMatch);
    expect(numberRank(acronymRank)).toBeLessThan(numberRank(fullMatchRank));
  });

  it('Returns a better rank for a value of which the full match matches best and better than a value of which the acronym matches best', () => {
    const search = 'abc';
    const acronymMatch = 'ed dd cd bd ad';
    const fullMatch = 'dcba';
    const acronymRank = unorderedMatchRatioRank(search)(acronymMatch);
    const fullMatchRank = unorderedMatchRatioRank(search)(fullMatch);
    expect(numberRank(fullMatchRank)).toBeLessThan(numberRank(acronymRank));
  });

  test('General ranking', () => {
    const us = 'us';
    const usa = 'usa';
    const usoa = 'usoa';
    const unitedStates = 'united states';
    const unitedStatesAmerica = 'united states america';
    const unitedStatesOfAmerica = 'united states of america';
    const unitedStatesWithDash = 'united-states';
    const values = [us, usa, usoa, unitedStates, unitedStatesAmerica, unitedStatesOfAmerica, unitedStatesWithDash];

    const search = 'su';
    const rankFunction = unorderedMatchRatioRank(search);

    const sorted = values.sort((a, b) => {
      const rankA = rankFunction(a);
      const rankB = rankFunction(b);
      return numberRank(rankA) - numberRank(rankB);
    });

    const expectedResult = [us, unitedStatesWithDash, unitedStates, usa, unitedStatesAmerica, usoa, unitedStatesOfAmerica];

    expect(sorted).toEqual(expectedResult);
  });
});