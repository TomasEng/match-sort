import {fullAcronym} from '../utils/fullAcronym';
import {MatchPredicate} from '../types/MatchPredicate';
import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';

export const fullAcronymContainsAllCharactersInOrder: MatchPredicate = search => value => {
  const acronym = fullAcronym(value);
  return containsAllCharactersInOrder(search)(acronym);
}