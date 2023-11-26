import {MatchPredicate} from '../types/MatchPredicate';
import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';
import {splitInWords} from '../utils/splitInWords';

export const hasWordContainingAllCharactersInOrder: MatchPredicate = (search) => (text) =>
  splitInWords(text).some(word => containsAllCharactersInOrder(search)(word));