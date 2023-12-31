import {firstPart} from './firstPart';

describe('firstWord', () => {
  it('Returns empty string when the string is empty', () => {
    expect(firstPart('')).toEqual('');
  });

  it('Returns empty string when the string consists of whitespace and dashes only', () => {
    expect(firstPart(' ')).toEqual('');
    expect(firstPart('-')).toEqual('');
    expect(firstPart(' - ')).toEqual('');
    expect(firstPart(' ')).toEqual('');
    expect(firstPart('--')).toEqual('');
  });

  it('Returns the first part', () => {
    expect(firstPart('lorem ipsum dolor sit amet')).toEqual('lorem');
    expect(firstPart('lorem  ipsum')).toEqual('lorem');
    expect(firstPart('lorem  ipsum  ')).toEqual('lorem');
    expect(firstPart('  lorem  ipsum  ')).toEqual('lorem');
    expect(firstPart('lorem  ipsum')).toEqual('lorem');
    expect(firstPart('lorem-ipsum dolor sit amet')).toEqual('lorem');
    expect(firstPart('lorem--ipsum')).toEqual('lorem');
    expect(firstPart('lorem- ipsum  ')).toEqual('lorem');
    expect(firstPart('--lorem  ipsum  ')).toEqual('lorem');
    expect(firstPart('lorem  -ipsum')).toEqual('lorem');
  });
});