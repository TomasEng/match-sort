import {MatchPredicate} from '../types/MatchPredicate';
import {splitInParts} from '../utils/splitInParts';

export const hasPartStartingWith: MatchPredicate = (search) => (value) =>
  splitInParts(value).some(p => p.startsWith(search));