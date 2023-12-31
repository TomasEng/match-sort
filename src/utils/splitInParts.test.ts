import {splitInParts} from './splitInParts';

test('splitInParts', () => {
  expect(splitInParts('lorem ipsum dolor sit amet')).toEqual(['lorem', 'ipsum', 'dolor', 'sit', 'amet']);
  expect(splitInParts('lorem-ipsum-dolor-sit-amet')).toEqual(['lorem', 'ipsum', 'dolor', 'sit', 'amet']);
  expect(splitInParts('lorem_ipsum_dolor_sit_amet')).toEqual(['lorem', 'ipsum', 'dolor', 'sit', 'amet']);
  expect(splitInParts('lorem_ipsum-dolor_sit-amet')).toEqual(['lorem', 'ipsum', 'dolor', 'sit', 'amet']);
  expect(splitInParts('lorem  ipsum')).toEqual(['lorem', 'ipsum']);
  expect(splitInParts('lorem  ipsum  ')).toEqual(['lorem', 'ipsum']);
  expect(splitInParts('  lorem  ipsum  ')).toEqual(['lorem', 'ipsum']);
  expect(splitInParts('lorem--ipsum_-_')).toEqual(['lorem', 'ipsum']);
});