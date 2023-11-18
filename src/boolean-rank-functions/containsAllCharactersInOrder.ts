import {MatchPredicate} from '../types/MatchPredicate';

export const containsAllCharactersInOrder: MatchPredicate = (search) => (value): boolean => {
  if (!search) return true;
  let searchIndex = 0;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === search[searchIndex]) {
      searchIndex++;
      if (searchIndex === search.length) return true;
    }
  }
  return false;
};