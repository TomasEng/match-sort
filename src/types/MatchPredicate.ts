import {SimplePredicate} from './SimplePredicate';

export type MatchPredicate = (search: string) => SimplePredicate<string>;