import {MatchRankFunction} from '../types/MatchRankFunction';
import {RankSort} from './RankSort';
import {RankFunction} from '../types/RankFunction';
import {IndexedStringTransform} from './IndexedStringTransform';
import {SearchListIndex} from './SearchListIndex';
import {BooleanMatchFunction} from '../types/BooleanMatchFunction';
import {SearchFunction} from '../types/SearchFunction';
import {StringTransformationFunction} from '../types/StringTransformationFunction';
import {MatchSort} from './MatchSort';

export class StringMatchSort extends MatchSort<string> {

  private indexedStringTransform: IndexedStringTransform;
  private readonly defaultTransformations: StringTransformationFunction[] | null = null;

  constructor(defaultTransformations?: StringTransformationFunction[]) {
    super();
    this.indexedStringTransform = new IndexedStringTransform();
    if (defaultTransformations) this.defaultTransformations = defaultTransformations;
  }

  public static from(matchRankFunction: MatchRankFunction<string>, transformations?: StringTransformationFunction[]): StringMatchSort {
    return new StringMatchSort().chain(matchRankFunction, transformations);
  }

  public chain(exactRankFunction: MatchRankFunction<string>, transformations?: StringTransformationFunction[]): StringMatchSort {
    const transformationsToApply = transformations || this.defaultTransformations || [];
    const newRankFunction = this
      .indexedStringTransform
      .matchRankWithTransformations(exactRankFunction, transformationsToApply);
    super.chain(newRankFunction);
    return this;
  }

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