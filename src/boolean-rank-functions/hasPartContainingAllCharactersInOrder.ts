import {MatchPredicate} from '../types/MatchPredicate';
import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';
import {splitInParts} from '../utils/splitInParts';

export const hasPartContainingAllCharactersInOrder: MatchPredicate = (part) => (text) =>
  splitInParts(text).some(p => containsAllCharactersInOrder(part)(p));