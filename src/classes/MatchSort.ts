import {MatchRankFunction} from '../types/MatchRankFunction';
import {RankSort} from './RankSort';
import {RankFunction} from '../types/RankFunction';
import {SearchListIndex} from './SearchListIndex';
import {BooleanMatchFunction} from '../types/BooleanMatchFunction';
import {SearchFunction} from '../types/SearchFunction';
import {listRankFunction} from '../utils/listRankFunction';

/**
 * A class that allows to build and run a sorting algorithm on a list of items with type T.
 * @public
 */
export class MatchSort<T> {

  private matchRankFunctionList: MatchRankFunction<T>[];
  private filter: BooleanMatchFunction<T> = () => () => true;
  private searchListIndex: SearchListIndex<T>;

  /**
   * Instantiates a MatchSort object.
   */
  constructor() {
    this.matchRankFunctionList = [];
    this.searchListIndex = new SearchListIndex(this.searchFunction);
  }

  private searchFunction: SearchFunction<T> = (search: string, values: T[]) => {
    const filteredValues = values.filter(this.filter(search));
    return this.makeSorter(search).sort(filteredValues);
  }

  /**
   * Instantiates a RankSort object for the given search term.
   * @param search The search term.
   * @returns The RankSort object.
   */
  public makeSorter(search: string): RankSort<T> {
    return new RankSort(this.makeRankFunctions(search));
  }

  private makeRankFunctions = (search: string): RankFunction<T>[] => {
    return this.matchRankFunctionList.map((matchRankFunction) => matchRankFunction(search));
  }

  /**
   * Chains a new rank function to the sorting algorithm.
   * If a chained rank function returns a rank of 0 or true, the next rank functions in the chain will be ignored.
   * Otherwise, the resulting number will be added to the rank. If the rank function returns false, a value of 1 will be added.
   * The final sort function will order the values by the rank, with the lowest number first.
   * @param rankFunction The rank function to chain.
   */
  public chain(rankFunction: MatchRankFunction<T>): MatchSort<T> {
    this.matchRankFunctionList.push(rankFunction);
    return this;
  }

  /**
   * Allows to set all the rank functions at once.
   * This will override any previously chained rank functions.
   * @param matchRankFunctionList The rank functions to set.
   */
  public setMatchRankFunctionList(matchRankFunctionList: MatchRankFunction<T>[]): MatchSort<T> {
    this.matchRankFunctionList = matchRankFunctionList;
    return this;
  }

  /**
   * Sets the filter function.
   */
  public setFilter(filter: BooleanMatchFunction<T>): MatchSort<T> {
    this.filter = filter;
    return this;
  }

  /**
   * Runs the sorting algorithm on the given values.
   *
   * @remarks
   * The result is cached, so that if the search term starts with the previous search term, the previous result is used as the input to the sort function.
   * This applies as long as the given values array is the same object.
   *
   * @param search The search term.
   * @param values The values to sort.
   * @returns The sorted values.
   */
  public sort(search: string, values: T[]): T[] {
    return this.searchListIndex.run(values, search);
  }

  /**
   * Generates a MatchSort object that applies the sorting algorithm to the given property of the values.
   * @param property The key of the property that holds the value to sort by.
   * @returns The generated MatchSort object.
   */
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

  /**
   * Generates a MatchSort object that applies the sorting algorithm to a two-dimensional array, where the best ranking item in each list is used in the final algorithm.
   * This can be used to sort lists of items with multiple searchable keywords.
   * @returns The generated MatchSort object.
   */
  public onList(): MatchSort<T[]> {
    const newMatcher = new MatchSort<T[]>();
    const convertRankFunction = (matchRankFunction: MatchRankFunction<T>) => (search: string) => {
      const rankFunction = matchRankFunction(search);
      return listRankFunction(rankFunction);
    };
    const newRankFunctions = this
      .matchRankFunctionList
      .map(convertRankFunction);
    newMatcher.setMatchRankFunctionList(newRankFunctions);
    const newFilter = (search: string) => (values: T[]) => values.some(this.filter(search));
    newMatcher.setFilter(newFilter);
    return newMatcher;
  }
}