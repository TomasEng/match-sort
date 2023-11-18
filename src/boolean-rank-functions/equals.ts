import {MatchPredicate} from '../types/MatchPredicate';

export const equals: MatchPredicate = (search) => (value) => value === search;