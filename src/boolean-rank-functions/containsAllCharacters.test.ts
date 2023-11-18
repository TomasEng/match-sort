import {containsAllCharacters} from './containsAllCharacters';

describe('containsAllCharacters', () => {
  it('Returns true if the value contains all characters in the search parameter', () => {
    expect(containsAllCharacters('abc')('abc')).toBe(true);
    expect(containsAllCharacters('abc')('abcd')).toBe(true);
    expect(containsAllCharacters('abc')('dabc')).toBe(true);
    expect(containsAllCharacters('cba')('abc')).toBe(true);
    expect(containsAllCharacters('cba')('dabce')).toBe(true);
  });

  it('Returns false if the value does not contain all characters in the search parameter', () => {
    expect(containsAllCharacters('abc')('def')).toBe(false);
    expect(containsAllCharacters('abc')('ab')).toBe(false);
    expect(containsAllCharacters('abc')('bc')).toBe(false);
    expect(containsAllCharacters('abc')('ac')).toBe(false);
    expect(containsAllCharacters('aabc')('abc')).toBe(false);
    expect(containsAllCharacters('aabc')('abcde')).toBe(false);
  });
});