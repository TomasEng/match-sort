import {MatchRankFunction} from '../types/MatchRankFunction';
import {RankSort} from './RankSort';
import {StringTransformation} from '../types/StringTransformation';
import {createTransformation} from '../transformations/createTransformation';
import {RankFunction} from '../types/RankFunction';
import {IndexedStringTransform} from './IndexedStringTransform';
import {SearchListIndex} from './SearchListIndex';
import {BooleanMatchFunction} from '../types/BooleanMatchFunction';
import {SearchFunction} from '../types/SearchFunction';

export class MatchSort {

  private indexedStringTransform: IndexedStringTransform;
  private matchRankFunctionList: MatchRankFunction[];
  private filter: BooleanMatchFunction = () => () => true;
  private searchListIndex: SearchListIndex;

  constructor(
    exactRankFunction?: MatchRankFunction,
    transformations: StringTransformation[] = [],
  ) {
    this.indexedStringTransform = new IndexedStringTransform();
    this.matchRankFunctionList = [];
    this.searchListIndex = new SearchListIndex(this.searchFunction);
    if (exactRankFunction) this.chain(exactRankFunction, transformations);
  }

  private searchFunction: SearchFunction = (search: string, values: string[]) => {
    const filteredValues = values.filter(this.filter(search));
    return this.makeSorter(search).sort(filteredValues);
  }

  public chain(exactRankFunction: MatchRankFunction, transformations: StringTransformation[] = []): MatchSort {
    const transformFunctions = transformations.map(createTransformation);
    const newRankFunction = this.indexedStringTransform.matchRankWithTransformations(exactRankFunction, transformFunctions);
    this.matchRankFunctionList.push(newRankFunction);
    return this;
  }

  public setFilter(filter: BooleanMatchFunction, transformations: StringTransformation[] = []): MatchSort {
    this.filter = (search: string) => (value: string) => {
      const transformFunctions = transformations.map(createTransformation);
      const transformedSearch = this.indexedStringTransform.runMultiple(search, transformFunctions);
      const transformedValue = this.indexedStringTransform.runMultiple(value, transformFunctions);
      return filter(transformedSearch)(transformedValue);
    };
    return this;
  }

  public sort(search: string, values: string[]): string[] {
    return this.searchListIndex.run(values, search);
  }

  public makeSorter(search: string): RankSort<string> {
    return new RankSort(this.makeRankFunctions(search));
  }

  private makeRankFunctions = (search: string): RankFunction<string>[] => {
    return this.matchRankFunctionList.map((matchRankFunction) => matchRankFunction(search));
  }
}