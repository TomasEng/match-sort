import {MatchPredicate} from '../types/MatchPredicate';
import {splitInParts} from '../utils/splitInParts';

export const hasPart: MatchPredicate = (part) => (value) =>
  splitInParts(value).some(p => p === part);