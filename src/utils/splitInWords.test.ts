import {splitInWords} from './splitInWords';

describe('splitInWords', () => {
  it('Returns empty array when the string is empty', () => {
    expect(splitInWords('')).toEqual([]);
  });

  it('Returns empty array when the string is whitespace only', () => {
    expect(splitInWords(' ')).toEqual([]);
    expect(splitInWords('  ')).toEqual([]);
    expect(splitInWords(' ')).toEqual([]);
  });

  it('Splits the string on whitespace', () => {
    expect(splitInWords('lorem ipsum dolor sit amet')).toEqual(['lorem', 'ipsum', 'dolor', 'sit', 'amet']);
    expect(splitInWords('lorem  ipsum')).toEqual(['lorem', 'ipsum']);
    expect(splitInWords('lorem  ipsum  ')).toEqual(['lorem', 'ipsum']);
    expect(splitInWords('  lorem  ipsum  ')).toEqual(['lorem', 'ipsum']);
    expect(splitInWords('lorem  ipsum')).toEqual(['lorem', 'ipsum']);
  });

  it('Does not split on dashes', () => {
    expect(splitInWords('lorem-ipsum-dolor-sit-amet')).toEqual(['lorem-ipsum-dolor-sit-amet']);
  });
});