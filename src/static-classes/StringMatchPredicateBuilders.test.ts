import {StringMatchPredicateBuilders} from './StringMatchPredicateBuilders';
import {StringMatchPredicates} from './StringMatchPredicates';

describe('StringMatchPredicateBuilders', () => {

  const {equals} = StringMatchPredicates;

  test('someWord', () => {
    const predicate = StringMatchPredicateBuilders.someWord(equals);
    expect(predicate('foo')('foo bar')).toBe(true);
    expect(predicate('foo')('bar foo')).toBe(true);
    expect(predicate('foo')('bar')).toBe(false);
    expect(predicate('foo')('foo-bar')).toBe(false);
  });

  test('somePart', () => {
    const predicate = StringMatchPredicateBuilders.somePart(equals);
    expect(predicate('foo')('foo-bar')).toBe(true);
    expect(predicate('foo')('bar-foo')).toBe(true);
    expect(predicate('foo')('bar')).toBe(false);
    expect(predicate('foo')('foobar')).toBe(false);
  });

  test('acronym', () => {
    const predicate = StringMatchPredicateBuilders.wordAcronym(equals);
    expect(predicate('fb')('foo bar')).toBe(true);
    expect(predicate('fb')('bar foo')).toBe(false);
    expect(predicate('fb')('foo-bar')).toBe(false);
  });

  test('fullAcronym', () => {
    const predicate = StringMatchPredicateBuilders.fullAcronym(equals);
    expect(predicate('fb')('foo bar')).toBe(true);
    expect(predicate('fb')('foo-bar')).toBe(true);
    expect(predicate('fb')('bar foo')).toBe(false);
  });

  test('firstWord', () => {
    const predicate = StringMatchPredicateBuilders.firstWord(equals);
    expect(predicate('foo')('foo bar')).toBe(true);
    expect(predicate('foo')('bar foo')).toBe(false);
    expect(predicate('foo')('foo-bar')).toBe(false);
  });

  test('firstPart', () => {
    const predicate = StringMatchPredicateBuilders.firstPart(equals);
    expect(predicate('foo')('foo-bar')).toBe(true);
    expect(predicate('foo')('foo bar')).toBe(true);
    expect(predicate('foo')('bar-foo')).toBe(false);
    expect(predicate('foo')('foobar')).toBe(false);
  });
});
