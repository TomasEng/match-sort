import {generalMatcher} from './generalMatcher';
import {iso3166countries} from '../test-data/countries';

describe('generalMatcher', () => {
  it('Sorts strings as expected', () => {
    const result = generalMatcher.sort('nor', iso3166countries);
    const expectedResultStart = [
      'Norway', // Starts with 'nor'
      'Norfolk Island', // Starts with 'nor'
      'North Macedonia', // Starts with 'nor'
      'Northern Mariana Islands (the)', // Starts with 'nor'
      'United Kingdom Of Great Britain And Northern Ireland (the)', // Has word starting with 'nor'
      'United States Minor Outlying Islands (the)', // Contains 'nor'
      'Andorra', // Has all characters in same order as 'nor'
      'Singapore', // Has all characters in same order as 'nor'
      'Jordan', // Has all charactars in 'nor'
      'Cameroon', // Has all characters in 'nor'
      'Honduras', // Has all characters in 'nor'
      'Montenegro', // Has all characters in 'nor'
    ];
    expect(result.slice(0, expectedResultStart.length)).toEqual(expectedResultStart);
  });

  it('Sorts acronyms as expected', () => {
    const result = generalMatcher.sort('USA', iso3166countries);
    const expectedResultStart = [
      'United States Of America (the)',
      'Austria',
      'Tunisia',
    ];
    expect(result.slice(0, expectedResultStart.length)).toEqual(expectedResultStart);
  });

  it('Ignores accents and special symbols', () => {
    const result = generalMatcher.sort('cote divoire', iso3166countries);
    const expectedResultStart = ['Côte d\'Ivoire'];
    expect(result.slice(0, expectedResultStart.length)).toEqual(expectedResultStart);
  });

  it('Hits when characters are in the wrong order', () => {
    const result = generalMatcher.sort('nowray', iso3166countries);
    const expectedResultStart = ['Norway'];
    expect(result.slice(0, expectedResultStart.length)).toEqual(expectedResultStart);
  });

  it('Returns the array unchanged when no search is given', () => {
    const result = generalMatcher.sort('', iso3166countries);
    expect(result).toEqual(iso3166countries);
  });
});