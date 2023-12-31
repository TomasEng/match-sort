import {RankSort} from './RankSort';

describe('RankSort', () => {
  describe('sort', () => {
    it('Sorts the items that make the rank function return true before the ones that make the rank function return false', () => {
      const array = [1, 2, 3, 4, 5];
      const is2Or4 = (value: number) => value === 2 || value === 4;
      const rankSort = new RankSort<number>(is2Or4);
      const result = rankSort.sort(array);
      expect(result).toEqual([2, 4, 1, 3, 5]);
    });

    it('Sorts the items by the value returned by the rank function', () => {
      const array = [1, 2, 3, 4, 5];
      const distanceTo3 = (value: number) => Math.abs(value - 3);
      const rankSort = new RankSort<number>(distanceTo3);
      const result = rankSort.sort(array);
      expect(result).toEqual([3, 2, 4, 1, 5]);
    });
  });

  describe('chain', () => {
    it('Applies the chained function if the first return false', () => {
      const strIsLowercaseA = (value: string) => value === 'a';
      const strIsLowercasOrUppercaseA = (value: string) => value.toLowerCase() === 'a';
      const caseSensitiveRankSort = new RankSort<string>(strIsLowercaseA);
      const rankSort = caseSensitiveRankSort.chain(strIsLowercasOrUppercaseA);
      const array = ['B', 'b', 'A', 'a'];
      const result = rankSort.sort(array);
      expect(result).toEqual(['a', 'A', 'B', 'b']);
    });

    it('Applies the chained function as expected when it returns a number', () => {
      const strContainsAAndB = (value: string) => value.includes('a') && value.includes('b');
      const positionOfA = (value: string) => value.includes('a') ? value.indexOf('a') : Infinity;
      const array = ['abc', 'bcd', 'cba', 'iea', 'aei'];
      const rankSort = new RankSort<string>(strContainsAAndB).chain(positionOfA);
      const result = rankSort.sort(array);
      expect(result).toEqual(['abc', 'cba', 'aei', 'iea', 'bcd']);
    });
  });
});