import {MatchRankFunction} from '../types/MatchRankFunction';
import {RankSort} from './RankSort';
import {RankFunction} from '../types/RankFunction';
import {SearchListIndex} from './SearchListIndex';
import {BooleanMatchFunction} from '../types/BooleanMatchFunction';
import {SearchFunction} from '../types/SearchFunction';

export class MatchSort<T> {

  private matchRankFunctionList: MatchRankFunction<T>[];
  private filter: BooleanMatchFunction<T> = () => () => true;
  private searchListIndex: SearchListIndex<T>;

  constructor() {
    this.matchRankFunctionList = [];
    this.searchListIndex = new SearchListIndex(this.searchFunction);
  }

  private searchFunction: SearchFunction<T> = (search: string, values: T[]) => {
    const filteredValues = values.filter(this.filter(search));
    return this.makeSorter(search).sort(filteredValues);
  }

  public makeSorter(search: string): RankSort<T> {
    return new RankSort(this.makeRankFunctions(search));
  }

  private makeRankFunctions = (search: string): RankFunction<T>[] => {
    return this.matchRankFunctionList.map((matchRankFunction) => matchRankFunction(search));
  }

  public chain(rankFunction: MatchRankFunction<T>): MatchSort<T> {
    this.matchRankFunctionList.push(rankFunction);
    return this;
  }

  public setMatchRankFunctionList(matchRankFunctionList: MatchRankFunction<T>[]): MatchSort<T> {
    this.matchRankFunctionList = matchRankFunctionList;
    return this;
  }

  public setFilter(filter: BooleanMatchFunction<T>): MatchSort<T> {
    this.filter = filter;
    return this;
  }

  public sort(search: string, values: T[]): T[] {
    return this.searchListIndex.run(values, search);
  }

  public onProperty<P extends string, O extends { [key in P]: T }>(property: P): MatchSort<O> {
    const newMatcher = new MatchSort<O>();
    const convertRankFunction = (matchRankFunction: MatchRankFunction<T>) => (search: string) => (value: O) => matchRankFunction(search)(value[property]);
    const newRankFunctions = this
      .matchRankFunctionList
      .map(convertRankFunction);
    newMatcher.setMatchRankFunctionList(newRankFunctions);
    const newFilter = (search: string) => (value: O) => this.filter(search)(value[property]);
    newMatcher.setFilter(newFilter);
    return newMatcher;
  }
}