import {SearchFunction} from '../types/SearchFunction';

/**
 * Maps values lists to corresponding SearchListIndexInstance objects.
 * @see SearchListIndexInstance
 * @internal
 */
export class SearchListIndex<T> {

  private readonly index: Map<T[], SearchListIndexInstance<T>> = new Map();
  private readonly searchFunction: SearchFunction<T>;

  constructor(searchFunction: SearchFunction<T>) {
    this.searchFunction = searchFunction;
  }

  public run(values: T[], search: string): T[] {
    return this.get(values).run(search);
  }

  private get(values: T[]): SearchListIndexInstance<T> {
    if (!this.index.has(values)) this.set(values);
    return this.index.get(values)!;
  }

  private set(values: T[]): void {
    this.index.set(values, new SearchListIndexInstance(this.searchFunction, values));
  }
}

/**
 * Caches the search result and uses it as the input for the next search if the search term starts with the previous search term.
 * @internal
 */
class SearchListIndexInstance<T> {

  private readonly values: T[];
  private readonly searchFunction: SearchFunction<T>;
  private currentResult: T[];
  private lastSearch: string = '';

  constructor(sortFn: SearchFunction<T>, list: T[]) {
    this.searchFunction = sortFn;
    this.values = list;
    this.currentResult = list;
  }

  public run(search: string): T[] {
    const list = search.startsWith(this.lastSearch) ? this.currentResult : this.values;
    if (search === this.lastSearch) return this.currentResult;
    this.currentResult = this.searchFunction(search, list);
    this.lastSearch = search;
    return this.currentResult;
  }
}