import {MatchRankFunction} from '../types/MatchRankFunction';
import {MatchSort} from './MatchSort';

describe('MatchSort', () => {
  const match: MatchRankFunction<string> = (search: string) => (value: string) => search === value;
  const filter = () => (value: string) => value !== 'ghi';
  const matchSorter = new MatchSort<string>().chain(match).setFilter(filter);
  const array = ['ABC', 'abc', 'DEF', 'def', 'GHI', 'ghi'];

  describe('makeSorter', () => {
    it('Creates a sorter object that applies the given match function', () => {
      const sorter = matchSorter.makeSorter('def');
      expect(sorter.sort(array)).toEqual(['def', 'ABC', 'abc', 'DEF', 'GHI', 'ghi']);
    });
  });

  describe('sort', () => {
    it('Sorts the items using the match function', () => {
      const result = matchSorter.sort('def', array);
      expect(result).toEqual(['def', 'ABC', 'abc', 'DEF', 'GHI']);
    });
  });

  describe('onProperty', () => {
    it('Creates a new MatchSort that applies the match function to the given property', () => {
      const array = [
        {id: '1', name: 'ABC'},
        {id: '2', name: 'abc'},
        {id: '3', name: 'DEF'},
        {id: '4', name: 'def'},
        {id: '5', name: 'GHI'},
        {id: '6', name: 'ghi'},
      ];
      const sorter = matchSorter.onProperty('name');
      const result = sorter.sort('def', array);
      expect(result).toEqual([
        {id: '4', name: 'def'},
        {id: '1', name: 'ABC'},
        {id: '2', name: 'abc'},
        {id: '3', name: 'DEF'},
        {id: '5', name: 'GHI'},
      ]);
    });
  });
});