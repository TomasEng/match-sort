import {MatchPredicate} from './MatchPredicate';

export type MatchPredicateBuilder<T> = (matchPredicate: MatchPredicate<T>) => MatchPredicate<T>;