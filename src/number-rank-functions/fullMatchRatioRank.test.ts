import {fullMatchRatioRank} from './fullMatchRatioRank';

describe('fullMatchRatioRank', () => {
  it('Returns 1 if the value does not contain all characters in order', () => {
    expect(fullMatchRatioRank('abc')('def')).toBe(1);
    expect(fullMatchRatioRank('Lorem ipsum')('Lipsum')).toBe(1);
  });

  it('Returns 0 if the match is exact', () => {
    expect(fullMatchRatioRank('abc')('abc')).toBe(0);
    expect(fullMatchRatioRank('Lorem ipsum')('Lorem ipsum')).toBe(0);
  });

  it('Returns a number between 0 and 1 according to the ratio of characters matched, where 0 means an exact match', () => {
    expect(fullMatchRatioRank('Lrmpu')('Loremipsum')).toBe(0.5);
    expect(fullMatchRatioRank('a')('abcd')).toBe(0.75);
    expect(fullMatchRatioRank('abc')('abcd')).toBe(0.25);
  });
});