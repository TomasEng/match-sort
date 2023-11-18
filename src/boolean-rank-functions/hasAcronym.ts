import {MatchPredicate} from '../types/MatchPredicate';
import {acronym} from '../utils/string-utils/acronym';
import {fullAcronym} from '../utils/string-utils/fullAcronym';

export const hasAcronymPredicate: MatchPredicate = search => text => {
  const wordsAcronym = acronym(text);
  const partsAcronym = fullAcronym(text);
  return wordsAcronym === search || partsAcronym === search;
};