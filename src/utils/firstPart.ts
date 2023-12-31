import {splitInParts} from './splitInParts';

export const firstPart = (text: string): string => {
  const parts = splitInParts(text);
  if (!parts.length) return '';
  return parts[0];
};