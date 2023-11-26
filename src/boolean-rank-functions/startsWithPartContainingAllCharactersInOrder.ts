import {MatchPredicate} from '../types/MatchPredicate';
import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';
import {splitInParts} from '../utils/splitInParts';

export const startsWithPartContainingAllCharactersInOrder: MatchPredicate = search => text => {
  if (!search) return true;
  const parts = splitInParts(text);
  if (parts.length === 0) return false;
  const firstPart = parts[0];
  return containsAllCharactersInOrder(search)(firstPart);
};