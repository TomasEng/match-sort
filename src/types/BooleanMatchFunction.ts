import {BooleanRankFunction} from './BooleanRankFunction';

export type BooleanMatchFunction<T> = (search: string) => BooleanRankFunction<T>;