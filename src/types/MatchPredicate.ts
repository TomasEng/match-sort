import {SimplePredicate} from './SimplePredicate';

export type MatchPredicate<T> = (search: string) => SimplePredicate<T>;