import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';

describe('containsAllCharactersInOrder', () => {
  it('Returns true if the parameters are equal', () => {
    expect(containsAllCharactersInOrder('abc')('abc')).toBe(true);
    expect(containsAllCharactersInOrder('Lorem ipsum')('Lorem ipsum')).toBe(true);
  });

  it('Returns true if all characters in the first parameter are found in the second parameter in the same order', () => {
    expect(containsAllCharactersInOrder('ac')('abc')).toBe(true);
    expect(
      containsAllCharactersInOrder('ipsum sit')('Lorem ipsum dolor sit amet'),
    ).toBe(true);
    expect(
      containsAllCharactersInOrder('Lipsum')('Lorem ipsum dolor sit amet'),
    ).toBe(true);
  });

  it('Returns false if there is no match', () => {
    expect(containsAllCharactersInOrder('abc')('def')).toBe(false);
    expect(containsAllCharactersInOrder('The')('quick brown fox')).toBe(false);
  });

  it('Returns false if some characters do not match', () => {
    expect(containsAllCharactersInOrder('abc')('cde')).toBe(false);
    expect(containsAllCharactersInOrder('Lorem ipsum')('Lipsum')).toBe(false);
  });

  it('Returns false if all characters match, but not in the given order', () => {
    expect(containsAllCharactersInOrder('abc')('cba')).toBe(false);
    expect(containsAllCharactersInOrder('Lorem ipsum')('ipsum Lorem')).toBe(false);
  });

  it('Returns true if the first parameter is empty', () => {
    expect(containsAllCharactersInOrder('')('abc')).toBe(true);
    expect(containsAllCharactersInOrder('')('')).toBe(true);
  });
});