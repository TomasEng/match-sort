import {MatchPredicate} from '../types/MatchPredicate';
import {containsAllCharactersInOrder} from './containsAllCharactersInOrder';
import {fullAcronym} from '../utils/fullAcronym';

export const fullAcronymContainsAllCharacters: MatchPredicate = search => value => {
  const acronym = fullAcronym(value);
  return containsAllCharactersInOrder(search)(acronym);
};