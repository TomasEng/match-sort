import {MatchPredicate} from '../types/MatchPredicate';
import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';
import {splitInWords} from '../utils/splitInWords';

export const startsWithWordContainingAllCharactersInOrder: MatchPredicate = search => text => {
  if (!search) return true;
  const words = splitInWords(text);
  if (words.length === 0) return false;
  const firstWord = words[0];
  return containsAllCharactersInOrder(search)(firstWord);
};