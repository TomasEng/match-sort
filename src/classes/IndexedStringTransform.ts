import {StringTransformationFunction} from '../types/StringTransformationFunction';
import {MatchRankFunction} from '../types/MatchRankFunction';
import {numberRank} from '../utils/numberRank';

type FunctionToResultMap = Map<StringTransformationFunction, string>;
type InputToTransformationsMap = Map<string, FunctionToResultMap>;

export class IndexedStringTransform {

  private transforms: InputToTransformationsMap;

  constructor() {
    this.transforms = new Map<string, FunctionToResultMap>();
  }

  public get(input: string): FunctionToResultMap | undefined {
    return this.transforms.get(input);
  }

  public getResult(input: string, transformation: StringTransformationFunction): string | undefined {
    return this.get(input)?.get(transformation);
  }

  public run(input: string, transformation: StringTransformationFunction): string {
    const results = this.get(input);
    if (results === undefined) {
      const result = transformation(input);
      const newMap = new Map<StringTransformationFunction, string>([[transformation, result]]);
      this.transforms.set(input, newMap);
      return result;
    } else {
      const result = results.get(transformation);
      if (result === undefined) {
        const finalResult = transformation(input);
        results.set(transformation, finalResult);
        return finalResult;
      } else {
        return result;
      }
    }
  }

  public runMultiple(input: string, transformations: StringTransformationFunction[]): string {
    return transformations.reduce((previousValue, transform) => this.run(previousValue, transform), input);
  }

  public runOnProperty<P extends string, O extends { [key in P]: string }>(object: O, property: P, transformation: StringTransformationFunction): string {
    return this.run(object[property], transformation);
  }

  public runMultipleOnProperty<P extends string, O extends { [key in P]: string }>(object: O, property: P, transformations: StringTransformationFunction[]): string {
    return this.runMultiple(object[property], transformations);
  }

  public matchRankWithTransformations(matchRankFunction: MatchRankFunction<string>, transformations: StringTransformationFunction[]): MatchRankFunction<string> {
    return (search: string) => (value: string) => {
      let rank = numberRank(matchRankFunction(search)(value));
      if (rank === 0) return 0;

      let transformedSearch: string = search;
      let transformedValue: string = value;
      for (const transformation of transformations) {
        transformedSearch = this.run(transformedSearch, transformation);
        transformedValue = this.run(transformedValue, transformation);
        const result = numberRank(matchRankFunction(transformedSearch)(transformedValue));
        if (result === 0) return rank;
        rank = rank + result;
      }
      return rank;
    }
  }
}