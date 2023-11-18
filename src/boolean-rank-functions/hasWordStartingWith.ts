import {MatchPredicate} from '../types/MatchPredicate';
import {startsWith} from './startsWith';
import {splitInWords} from '../utils/string-utils/splitInWords';

export const hasWordStartingWith: MatchPredicate = search => text => {
    const words = splitInWords(text);
    return words.some(w => startsWith(search)(w));
};