import {wordAcronym} from './wordAcronym';

test('acronym', () => {
  expect(wordAcronym('Lorem ipsum dolor sit amet')).toBe('Lidsa');
});