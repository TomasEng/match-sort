import {RankFunction} from './RankFunction';

export type MatchRankFunction<T> = (value: string) => RankFunction<T>;