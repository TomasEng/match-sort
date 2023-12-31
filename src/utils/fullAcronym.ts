import {splitInParts} from './splitInParts';

export const fullAcronym = (text: string) => {
  const parts = splitInParts(text);
  return parts.map(part => part[0]).join('');
}