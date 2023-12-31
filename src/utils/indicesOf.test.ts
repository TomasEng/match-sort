import {indicesOf} from './indicesOf';

describe('indicesOf', () => {
  it('Returns indices of given char in given string', () => {
    expect(indicesOf('a', 'abc')).toEqual([0]);
    expect(indicesOf('b', 'abc')).toEqual([1]);
    expect(indicesOf('a', 'abca')).toEqual([0, 3]);
  });

  it('Returns empty array if character does not exist in given string', () => {
    expect(indicesOf('d', 'abc')).toEqual([]);
    expect(indicesOf('e', '')).toEqual([]);
  });
});