import {RankFunction} from '../types/RankFunction';
import {listRankFunction} from './listRankFunction';

describe('listRankFunction', () => {
  it('Creates a function that returns the rank of the best ranked item in the list', () => {
    const rankFunction: RankFunction<string> = value => value.length;
    const list = ['testtest', 'test', 'testtesttest'];
    const fun = listRankFunction(rankFunction);
    expect(fun(list)).toEqual(4);
  });
});