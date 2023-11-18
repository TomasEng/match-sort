import {MatchPredicate} from '../types/MatchPredicate';

export const startsWith: MatchPredicate = (str) => (value) => value.startsWith(str);