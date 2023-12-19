import {MatchRankFunction} from '../types/MatchRankFunction';
import {IndexedStringTransform} from './IndexedStringTransform';
import {BooleanMatchFunction} from '../types/BooleanMatchFunction';
import {StringTransformationFunction} from '../types/StringTransformationFunction';
import {MatchSort} from './MatchSort';

/**
 * A class that allows to build and run a sorting algorithm on a list of strings.
 */
export class StringMatchSort extends MatchSort<string> {

  private indexedStringTransform: IndexedStringTransform;
  private readonly defaultTransformations: StringTransformationFunction[] | null = null;

  /**
   * Instantiates a StringMatchSort object.
   *
   * @param defaultTransformations
   * Transformation functions to apply to all strings.
   * If a rank function is not successful, it will try again with the transformations applied both to the search term and to the value.
   * It will first try only with the first transformations, then with the first and second together, and so on.
   * The more transformations necessary, the greater the resulting rank number will be.
   */
  constructor(defaultTransformations?: StringTransformationFunction[]) {
    super();
    this.indexedStringTransform = new IndexedStringTransform();
    if (defaultTransformations) this.defaultTransformations = defaultTransformations;
  }

  /**
   * Instantiates a StringMatchSort object from a single rank function.
   * @param matchRankFunction The rank function.
   * @param transformations Transformation functions to apply to the rank function.
   * @returns The StringMatchSort object.
   */
  public static from(matchRankFunction: MatchRankFunction<string>, transformations?: StringTransformationFunction[]): StringMatchSort {
    return new StringMatchSort().chain(matchRankFunction, transformations);
  }

  /**
   * Chains a new rank function to the sorting algorithm.
   * @see MatchSort.chain
   * @param exactRankFunction The rank function to chain.
   * @param transformations Transformation functions to apply to the rank function. If not provided, the default transformations will be used.
   */
  public chain(exactRankFunction: MatchRankFunction<string>, transformations?: StringTransformationFunction[]): StringMatchSort {
    const transformationsToApply = transformations || this.defaultTransformations || [];
    const newRankFunction = this
      .indexedStringTransform
      .matchRankWithTransformations(exactRankFunction, transformationsToApply);
    super.chain(newRankFunction);
    return this;
  }

  /**
   * Sets the filter function.
   *
   * @param filter The filter function.
   *
   * @param transformations
   * Transformation functions to apply to the filter function. If not provided, the default transformations will be used.
   * The filter function will apply all transformations at once to both the search term and the value before filtering.
   *
   * @returns The StringMatchSort object.
   */
  public setFilter(filter: BooleanMatchFunction<string>, transformations?: StringTransformationFunction[]): StringMatchSort {
    const transformationsToApply = transformations || this.defaultTransformations || [];
    const filterFunction = (search: string) => (value: string) => {
      const transformedSearch = this.indexedStringTransform.runMultiple(search, transformationsToApply);
      const transformedValue = this.indexedStringTransform.runMultiple(value, transformationsToApply);
      return filter(transformedSearch)(transformedValue);
    };
    super.setFilter(filterFunction);
    return this;
  }
}