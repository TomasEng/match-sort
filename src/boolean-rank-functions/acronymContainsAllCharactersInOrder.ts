import {MatchPredicate} from '../types/MatchPredicate';
import {acronym} from '../utils/acronym';
import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';

export const acronymContainsAllCharactersInOrder: MatchPredicate = (search) => (value): boolean => {
  const wordAcronym = acronym(value);
  return containsAllCharactersInOrder(search)(wordAcronym);
}