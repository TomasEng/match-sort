import {SearchFunction} from '../types/SearchFunction';

export class SearchListIndex {

  private readonly index: Map<string[], SearchListIndexInstance> = new Map();
  private readonly searchFunction: SearchFunction;

  constructor(searchFunction: SearchFunction) {
    this.searchFunction = searchFunction;
  }

  public run(values: string[], search: string): string[] {
    return this.get(values).run(search);
  }

  private get(values: string[]): SearchListIndexInstance {
    if (!this.index.has(values)) this.set(values);
    return this.index.get(values)!;
  }

  private set(values: string[]): void {
    this.index.set(values, new SearchListIndexInstance(this.searchFunction, values));
  }
}

class SearchListIndexInstance {

  private readonly values: string[];
  private readonly searchFunction: SearchFunction;
  private currentResult: string[];
  private lastSearch: string = '';

  constructor(sortFn: SearchFunction, list: string[]) {
    this.searchFunction = sortFn;
    this.values = list;
    this.currentResult = list;
  }

  public run(search: string): string[] {
    const list = search.startsWith(this.lastSearch) ? this.currentResult : this.values;
    if (search === this.lastSearch) return this.currentResult;
    this.currentResult = this.searchFunction(search, list);
    this.lastSearch = search;
    return this.currentResult;
  }
}