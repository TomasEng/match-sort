import {MatchPredicate} from '../types/MatchPredicate';

export const contains: MatchPredicate = search => text => {
  if (!search) return true;
  return text.includes(search);
};