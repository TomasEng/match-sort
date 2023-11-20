import {MatchPredicate} from '../types/MatchPredicate';
import {acronym} from '../utils/acronym';
import {fullAcronym} from '../utils/fullAcronym';

export const hasAcronym: MatchPredicate = search => text => {
  const wordsAcronym = acronym(text);
  const partsAcronym = fullAcronym(text);
  return wordsAcronym === search || partsAcronym === search;
};