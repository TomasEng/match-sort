import {acronym} from './acronym';

test('acronym', () => {
  expect(acronym('Lorem ipsum dolor sit amet')).toBe('Lidsa');
});