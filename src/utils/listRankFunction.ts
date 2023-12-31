import {RankFunction} from '../types/RankFunction';
import {numberRank} from './numberRank';

export const listRankFunction = <T>(fun: RankFunction<T>): RankFunction<T[]> => {
  return (list: T[]) => {
    const ranks = list.map(v => numberRank(fun(v)));
    return Math.min(...ranks);
  }
}