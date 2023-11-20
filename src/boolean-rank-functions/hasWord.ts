import {MatchPredicate} from '../types/MatchPredicate';
import {splitInWords} from '../utils/splitInWords';

export const hasWord: MatchPredicate = word => text => {
  const words = splitInWords(text);
  return words.some(w => w === word);
}