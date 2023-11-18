import {MatchPredicate} from '../types/MatchPredicate';

export const containsAllCharacters: MatchPredicate = (search) => (value) => {
  if (search.length > value.length) return false;
  const searchCharacters = search.split('');
  const valueCharacters = value.split('');
  for (const char of searchCharacters) {
    const index = valueCharacters.indexOf(char);
    if (index === -1) return false;
    valueCharacters.splice(index, 1);
  }
  return true;
}