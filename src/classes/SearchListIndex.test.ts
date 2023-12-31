import {SearchFunction} from '../types/SearchFunction';
import {SearchListIndex} from './SearchListIndex';

describe('SearchListIndex', () => {
  describe('run', () => {
    const array1 = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const array2 = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    const searchFunction: SearchFunction<string> = (search: string, values: string[]) =>
      values.filter((value) => value.includes(search));

    it('Returns the correct result', () => {
      const searchListIndex = new SearchListIndex(searchFunction);
      const result1 = searchListIndex.run(array1, 'ur');
      expect(result1).toEqual(['thursday', 'saturday']);
      const result2 = searchListIndex.run(array2, 'ber');
      expect(result2).toEqual(['september', 'october', 'november', 'december']);
    });

    it('Caches the result', () => {
      const searchListIndex = new SearchListIndex(searchFunction);
      const result1 = searchListIndex.run(array1, 'ur');
      const result2 = searchListIndex.run(array1, 'ur');
      expect(result1).toBe(result2);
    });

    it('Distinguishes between different arrays', () => {
      const searchListIndex = new SearchListIndex(searchFunction);
      const result1 = searchListIndex.run(array1, 'ur');
      const result2 = searchListIndex.run(array2, 'ur');
      expect(result1).not.toBe(result2);
    });

    it('Runs the search function on the previous result when the search string starts with the previous search string', () => {
      const searchFunctionMock = jest.fn().mockImplementation(searchFunction);
      const searchListIndex = new SearchListIndex(searchFunctionMock);
      const result1 = searchListIndex.run(array2, 'ju');
      const result2 = searchListIndex.run(array2, 'jun');
      expect(result1).toEqual(['june', 'july']);
      expect(result2).toEqual(['june']);
      expect(searchFunctionMock).toHaveBeenCalledTimes(2);
      expect(searchFunctionMock).toHaveBeenLastCalledWith('jun', result1);
    });

    it('Returns the correct result when the search string does not start with the previous search string', () => {
      const searchListIndex = new SearchListIndex(searchFunction);
      const result1 = searchListIndex.run(array2, 'ju');
      const result2 = searchListIndex.run(array2, 'fe');
      expect(result1).toEqual(['june', 'july']);
      expect(result2).toEqual(['february']);
    });
  });
});