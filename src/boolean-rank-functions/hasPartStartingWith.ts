import {MatchPredicate} from '../types/MatchPredicate';
import {splitInParts} from '../utils/string-utils/splitInParts';

export const hasPartStartingWith: MatchPredicate = (search) => (value) =>
  splitInParts(value).some(p => p.startsWith(search));