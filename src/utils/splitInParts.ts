import {splitInWords} from './splitInWords';

export const splitInParts = (str: string): string[] => {
  const stringWithWhitespaceSeparators = str.replace(/[-_]/g, ' ');
  return splitInWords(stringWithWhitespaceSeparators);
};