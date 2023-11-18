import {MatchPredicate} from '../types/MatchPredicate';
import {acronym} from '../utils/acronym';
import {fullAcronym} from '../utils/fullAcronym';

export const acronymStartsWith: MatchPredicate = search => text => {
  const wordAcronym = acronym(text);
  const partsAcronym = fullAcronym(text);
  return wordAcronym.startsWith(search) || partsAcronym.startsWith(search);
}