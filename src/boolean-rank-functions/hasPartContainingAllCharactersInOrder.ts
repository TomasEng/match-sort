import {MatchPredicate} from '../types/MatchPredicate';
import {splitInParts} from '../utils/string-utils/splitInParts';
import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';

export const hasPartContainingAllCharactersInOrder: MatchPredicate = (part) => (text) =>
  splitInParts(text).some(p => containsAllCharactersInOrder(part)(p));