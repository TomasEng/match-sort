import {splitInWords} from './splitInWords';

export const firstWord = (text: string): string => {
  const words = splitInWords(text);
  if (!words.length) return '';
  return words[0];
};