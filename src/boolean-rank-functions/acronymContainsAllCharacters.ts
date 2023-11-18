import {MatchPredicate} from '../types/MatchPredicate';
import {acronym} from '../utils/acronym';
import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';

export const acronymContainsAllCharacters: MatchPredicate = (search) => (value) => {
  const wordAcronym = acronym(value);
  return containsAllCharactersInOrder(search)(wordAcronym);
};