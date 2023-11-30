import {MatchRankFunction} from '../types/MatchRankFunction';
import {RankSort} from './RankSort';
import {RankFunction} from '../types/RankFunction';
import {IndexedStringTransform} from './IndexedStringTransform';
import {SearchListIndex} from './SearchListIndex';
import {BooleanMatchFunction} from '../types/BooleanMatchFunction';
import {SearchFunction} from '../types/SearchFunction';
import {StringTransformationFunction} from '../types/StringTransformationFunction';

export class MatchSort {

  private indexedStringTransform: IndexedStringTransform;
  private matchRankFunctionList: MatchRankFunction[];
  private filter: BooleanMatchFunction = () => () => true;
  private searchListIndex: SearchListIndex;
  private readonly defaultTransformations: StringTransformationFunction[] | null = null;

  constructor(defaultTransformations?: StringTransformationFunction[]) {
    this.indexedStringTransform = new IndexedStringTransform();
    this.matchRankFunctionList = [];
    this.searchListIndex = new SearchListIndex(this.searchFunction);
    if (defaultTransformations) this.defaultTransformations = defaultTransformations;
  }

  public static from(matchRankFunction: MatchRankFunction, transformations?: StringTransformationFunction[]): MatchSort {
    return new MatchSort().chain(matchRankFunction, transformations);
  }

  private searchFunction: SearchFunction = (search: string, values: string[]) => {
    const filteredValues = values.filter(this.filter(search));
    return this.makeSorter(search).sort(filteredValues);
  }

  public chain(exactRankFunction: MatchRankFunction, transformations?: StringTransformationFunction[]): MatchSort {
    const transformationsToApply = transformations || this.defaultTransformations || [];
    const newRankFunction = this
      .indexedStringTransform
      .matchRankWithTransformations(exactRankFunction, transformationsToApply);
    this.matchRankFunctionList.push(newRankFunction);
    return this;
  }

  public setFilter(filter: BooleanMatchFunction, transformations?: StringTransformationFunction[]): MatchSort {
    const transformationsToApply = transformations || this.defaultTransformations || [];
    this.filter = (search: string) => (value: string) => {
      const transformedSearch = this.indexedStringTransform.runMultiple(search, transformationsToApply);
      const transformedValue = this.indexedStringTransform.runMultiple(value, transformationsToApply);
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