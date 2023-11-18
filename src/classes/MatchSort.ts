import {MatchRankFunction} from '../types/MatchRankFunction';
import {RankSort} from './RankSort';
import {StringTransformation} from '../types/StringTransformation';
import {createTransformation} from '../transformations/createTransformation';
import {RankFunction} from '../types/RankFunction';
import {IndexedStringTransform} from './IndexedStringTransform';

export class MatchSort {

  private indexedStringTransform: IndexedStringTransform;
  private matchRankFunctionList: MatchRankFunction[];

  constructor(
    exactRankFunction?: MatchRankFunction,
    transformations: StringTransformation[] = [],
  ) {
    this.indexedStringTransform = new IndexedStringTransform();
    this.matchRankFunctionList = [];
    if (exactRankFunction) this.chain(exactRankFunction, transformations);
  }

  public chain(exactRankFunction: MatchRankFunction, transformations: StringTransformation[] = []): MatchSort {
    const transformFunctions = transformations.map(createTransformation);
    const newRankFunction = this.indexedStringTransform.matchRankWithTransformations(exactRankFunction, transformFunctions);
    this.matchRankFunctionList.push(newRankFunction);
    return this;
  }

  public sort(search: string, values: string[]): string[] {
    return this.makeSorter(search).sort(values);
  }

  public makeSorter(search: string): RankSort<string> {
    return new RankSort(this.makeRankFunctions(search));
  }

  private makeRankFunctions = (search: string): RankFunction<string>[] => {
    return this.matchRankFunctionList.map((matchRankFunction) => matchRankFunction(search));
  }
}