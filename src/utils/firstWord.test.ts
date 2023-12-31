import {firstWord} from './firstWord';

describe('firstWord', () => {
  it('Returns empty string when the string is empty', () => {
    expect(firstWord('')).toEqual('');
  });

  it('Returns empty string when the string is whitespace only', () => {
    expect(firstWord(' ')).toEqual('');
    expect(firstWord('  ')).toEqual('');
    expect(firstWord(' ')).toEqual('');
  });

  it('Returns the first word', () => {
    expect(firstWord('lorem ipsum dolor sit amet')).toEqual('lorem');
    expect(firstWord('lorem  ipsum')).toEqual('lorem');
    expect(firstWord('lorem  ipsum  ')).toEqual('lorem');
    expect(firstWord('  lorem  ipsum  ')).toEqual('lorem');
    expect(firstWord('lorem  ipsum')).toEqual('lorem');
    expect(firstWord('lorem-ipsum dolor sit amet')).toEqual('lorem-ipsum');
  });
});