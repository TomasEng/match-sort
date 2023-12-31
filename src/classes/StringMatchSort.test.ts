import {MatchRankFunction} from '../types/MatchRankFunction';
import {StringTransform} from '../static-classes/StringTransform';
import {StringMatchSort} from './StringMatchSort';

const replaceGreekLowercaseLetters = (value: string) => value
  .replace('α', 'a')
  .replace('β', 'b')
  .replace('γ', 'g')
  .replace('δ', 'd')
  .replace('ε', 'e')
  .replace('ζ', 'z')
  .replace('η', 'i')
  .replace('θ', 'th')
  .replace('ι', 'i')
  .replace('κ', 'k')
  .replace('λ', 'l')
  .replace('μ', 'm')
  .replace('ν', 'n')
  .replace('ξ', 'ks')
  .replace('ο', 'o')
  .replace('π', 'p')
  .replace('ρ', 'r')
  .replace('σ', 's')
  .replace('ς', 's')
  .replace('τ', 't')
  .replace('υ', 'y')
  .replace('φ', 'f')
  .replace('χ', 'ch')
  .replace('ψ', 'ps')
  .replace('ω', 'o');

describe('StringMatchSort', () => {
  const exactMatch: MatchRankFunction<string> = (search: string) => (value: string) => search === value;
  const exactMatchSorter = StringMatchSort.from(exactMatch);
  const array = ['ABC', 'abc', 'DEF', 'def', 'GHI', 'ghi'];

  describe('makeSorter', () => {
    it('Creates a sorter object that applies the given match function', () => {
      const sorter = exactMatchSorter.makeSorter('def');
      expect(sorter.sort(array)).toEqual(['def', 'ABC', 'abc', 'DEF', 'GHI', 'ghi']);
    });
  });

  describe('sort', () => {
    it('Sorts the items using the match function', () => {
      const result = exactMatchSorter.sort('def', array);
      expect(result).toEqual(['def', 'ABC', 'abc', 'DEF', 'GHI', 'ghi']);
    });
  });

  test('transformations', () => {
    const array = () => ['ABC', 'abc', 'ΔΕΦ', 'DEF', 'δεφ', 'def', 'GHI', 'ghi'];
    const sorter = StringMatchSort.from(exactMatch, [StringTransform.lowercase, replaceGreekLowercaseLetters]);
    const greekResult = sorter.sort('δεφ', array());
    const latinResult = sorter.sort('def', array());
    const greekUpperResult = sorter.sort('ΔΕΦ', array());
    const latinUpperResult = sorter.sort('DEF', array());
    expect(greekResult).toEqual(['δεφ', 'ΔΕΦ', 'DEF', 'def', 'ABC', 'abc', 'GHI', 'ghi']);
    expect(latinResult).toEqual(['def', 'DEF', 'ΔΕΦ', 'δεφ', 'ABC', 'abc', 'GHI', 'ghi']);
    expect(greekUpperResult).toEqual(['ΔΕΦ', 'δεφ', 'DEF', 'def', 'ABC', 'abc', 'GHI', 'ghi']);
    expect(latinUpperResult).toEqual(['DEF', 'def', 'ΔΕΦ', 'δεφ', 'ABC', 'abc', 'GHI', 'ghi']);
  });

  it('Applies default transformations if no transformations are given', () => {
    const array = () => ['ABC', 'abc', 'ΔΕΦ', 'DEF', 'δεφ', 'def', 'GHI', 'ghi'];
    const sorter = new StringMatchSort([StringTransform.lowercase, replaceGreekLowercaseLetters]);
    sorter.chain(exactMatch);
    const greekResult = sorter.sort('δεφ', array());
    const latinResult = sorter.sort('def', array());
    expect(greekResult).toEqual(['δεφ', 'ΔΕΦ', 'DEF', 'def', 'ABC', 'abc', 'GHI', 'ghi']);
    expect(latinResult).toEqual(['def', 'DEF', 'ΔΕΦ', 'δεφ', 'ABC', 'abc', 'GHI', 'ghi']);
  });

  describe('onProperty', () => {
    const array = () => [
      {id: '1', name: 'ABC'},
      {id: '2', name: 'abc'},
      {id: '3', name: 'DEF'},
      {id: '4', name: 'def'},
      {id: '5', name: 'GHI'},
      {id: '6', name: 'ghi'},
    ];

    it('Sorts the items using the match function', () => {
      const result = exactMatchSorter.onProperty('name').sort('def', array());
      expect(result).toEqual([
        {id: '4', name: 'def'},
        {id: '1', name: 'ABC'},
        {id: '2', name: 'abc'},
        {id: '3', name: 'DEF'},
        {id: '5', name: 'GHI'},
        {id: '6', name: 'ghi'},
      ]);
    });

    it('Applies transformations', () => {
      const sorter = StringMatchSort.from(exactMatch, [StringTransform.lowercase]);
      const result = sorter.onProperty('name').sort('def', array());
      expect(result).toEqual([
        {id: '4', name: 'def'},
        {id: '3', name: 'DEF'},
        {id: '1', name: 'ABC'},
        {id: '2', name: 'abc'},
        {id: '5', name: 'GHI'},
        {id: '6', name: 'ghi'},
      ]);
    });
  });
});