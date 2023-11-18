import {splitInWords} from './splitInWords';

export const acronym = (text: string) => {
  const words = splitInWords(text);
  return  words.map(word => word[0]).join('');
};