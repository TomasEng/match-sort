import {RankFunction} from '../types/RankFunction';
import {StrictRankFunction} from '../types/StrictRankFunction';
import {numberRank} from '../utils/numberRank';

export class RankSort<T> {
  private readonly rankFunctionList: StrictRankFunction<T>[];

  constructor(rankFunction?: RankFunction<T> | RankFunction<T>[]) {
    if (!rankFunction) this.rankFunctionList = [];
    else {
      const rankFunctionList: RankFunction<T>[] = Array.isArray(rankFunction) ? rankFunction : [rankFunction];
      this.rankFunctionList = rankFunctionList.map((rankFunction) => (value: T) => numberRank(rankFunction(value)));
    }
  }

  public chain(rankFunction: RankFunction<T>): RankSort<T> {
    this.rankFunctionList.push((value: T) => numberRank(rankFunction(value)));
    return this;
  }

  public sort(array: T[]): T[] {
    const rankMap = new Map<T, number>();
    array.forEach((value) => {
      rankMap.set(value, this.rankFunction(value)); // This way, the rank function is only run once per value.
    });
    return array.sort((a, b) => rankMap.get(a)! - rankMap.get(b)!);
  }

  private rankFunction(value: T): number {
    let rank = 0;
    for (const rankFunction of this.rankFunctionList) {
      rank += rankFunction(value);
      if (rank === 0) break;
    }
    return rank;
  }
}