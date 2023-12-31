import {numberRank} from './numberRank';

describe('numberRank' , () => {
  it('Returns 0 if value is true', () => {
    expect(numberRank(true)).toBe(0);
  });

  it('Returns 1 if value is false', () => {
    expect(numberRank(false)).toBe(1);
  });

  it('Returns the value if it is a number', () => {
    expect(numberRank(1)).toBe(1);
    expect(numberRank(0)).toBe(0);
    expect(numberRank(-1)).toBe(-1);
    expect(numberRank(1.5)).toBe(1.5);
  });
});