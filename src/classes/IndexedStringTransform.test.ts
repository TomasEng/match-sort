import {IndexedStringTransform} from './IndexedStringTransform';
import {MatchRankFunction} from '../types/MatchRankFunction';

describe('IndexedStringTransform', () => {

  describe('run', () => {

    it('Returns the expected result and inserts it to the index map', () => {
      const indexedStringTransform = new IndexedStringTransform();
      const transform = (input: string) => input.toLowerCase();
      const input = 'Test';
      const expectedResult = 'test';
      const result = indexedStringTransform.run(input, transform);
      expect(result).toBe(expectedResult);
      expect(indexedStringTransform.getResult(input, transform)).toBe(expectedResult);
    });

    it('Returns the expected result when called the second time', () => {
      const indexedStringTransform = new IndexedStringTransform();
      const transform = (input: string) => input.toLowerCase();
      const input = 'Test';
      const expectedResult = 'test';
      const result1 = indexedStringTransform.run(input, transform);
      expect(result1).toBe(expectedResult);
      const result2 = indexedStringTransform.run(input, transform);
      expect(result2).toBe(expectedResult);
    });

    it('Only runs the transform function once', () => {
      const indexedStringTransform = new IndexedStringTransform();
      const transform = jest.fn().mockImplementation((input: string) => input.toLowerCase());
      const input = 'Test';
      expect(transform).not.toHaveBeenCalled();
      indexedStringTransform.run(input, transform);
      expect(transform).toHaveBeenCalledTimes(1);
      indexedStringTransform.run(input, transform);
      expect(transform).toHaveBeenCalledTimes(1);
    });
  });

  describe('runMultiple', () => {

    // Test data:
    const transform1 = (input: string) => input.toLowerCase();
    const transform2 = (input: string) => input + 'TEST';
    const input = 'Test'
    const expectedFirstResult = 'test';
    const expectedResult = 'testTEST'; // Would be "testtest" if run in the reverse order

    it('Runs the given transformations in the correct order', () => {
      const indexedStringTransform = new IndexedStringTransform();
      const result = indexedStringTransform.runMultiple(input, [transform1, transform2]);
      expect(result).toBe(expectedResult);
    });

    it('Runs the transform functions only once and returns the expected value when called twice', () => {
      const indexedStringTransform = new IndexedStringTransform();
      const transform1Mock = jest.fn().mockImplementation(transform1);
      const transform2Mock = jest.fn().mockImplementation(transform2);

      expect(transform1Mock).not.toHaveBeenCalled();
      expect(transform2Mock).not.toHaveBeenCalled();

      const result1 = indexedStringTransform.runMultiple(input, [transform1Mock, transform2Mock]);
      expect(result1).toBe(expectedResult);
      expect(transform1Mock).toHaveBeenCalledTimes(1);
      expect(transform2Mock).toHaveBeenCalledTimes(1);

      const result2 = indexedStringTransform.runMultiple(input, [transform1Mock, transform2Mock]);
      expect(result2).toBe(expectedResult);
      expect(transform1Mock).toHaveBeenCalledTimes(1);
      expect(transform2Mock).toHaveBeenCalledTimes(1);
    });

    it('Puts both results in the index map', () => {
      const indexedStringTransform = new IndexedStringTransform();
      const result = indexedStringTransform.runMultiple(input, [transform1, transform2]);
      expect(result).toBe(expectedResult);
      expect(indexedStringTransform.getResult(input, transform1)).toBe(expectedFirstResult);
      expect(indexedStringTransform.getResult(expectedFirstResult, transform2)).toBe(expectedResult);
    });
  });

  describe('matchRankWithTransformations', () => {
    const testFunction: MatchRankFunction<string> = (search: string) => (value: string) => search === value;
    const transform1 = (input: string) => input.toLowerCase();
    const transform2 = (input: string) => input.replace('oa', 'e');
    const transformations = [transform1, transform2];

    it('Returns 0 when the matchRankFunction returns true', () => {
      const indexedStringTransform = new IndexedStringTransform();
      const result = indexedStringTransform.matchRankWithTransformations(testFunction, []);
      expect(result('test')('test')).toBe(0);
    });

    it('Returns 1 when the matchRankFunction returns true after the first transformation', () => {
      const indexedStringTransform = new IndexedStringTransform();
      const result = indexedStringTransform.matchRankWithTransformations(testFunction, transformations);
      expect(result('tesT')('Test')).toBe(1);
    });

    it('Returns 2 when the matchRankFunction returns true after the second transformation', () => {
      const indexedStringTransform = new IndexedStringTransform();
      const result = indexedStringTransform.matchRankWithTransformations(testFunction, transformations);
      expect(result('test')('toast')).toBe(2);
    });
  });

  describe('Performance', () => {
    const testInput = 'Lorem ipsum dolor sit amet';
    const removeAccents = (input: string) => input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    test('Without caching', () => {
      for (let i = 0; i < 100000; i++) {
        removeAccents(testInput);
      }
    });

    test('With caching', () => {
      const indexedStringTransform = new IndexedStringTransform();
      for (let i = 0; i < 100000; i++) {
        indexedStringTransform.run(testInput, removeAccents);
      }
    });
  });
});