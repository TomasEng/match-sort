import {fullAcronym} from './fullAcronym';

test('fullAcronym', () => {
  expect(fullAcronym('Lorem-ipsum dolor sit amet')).toBe('Lidsa')
});