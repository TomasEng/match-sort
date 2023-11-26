import {matchRatioRank} from '../number-rank-functions/matchRatioRank';
import {hasAcronym} from '../boolean-rank-functions/hasAcronym';
import {contains} from '../boolean-rank-functions/contains';
import {hasPartStartingWith} from '../boolean-rank-functions/hasPartStartingWith';
import {hasWordStartingWith} from '../boolean-rank-functions/hasWordStartingWith';
import {hasPart} from '../boolean-rank-functions/hasPart';
import {hasWord} from '../boolean-rank-functions/hasWord';
import {startsWith} from '../boolean-rank-functions/startsWith';
import {StringTransformation} from '../types/StringTransformation';
import {MatchSort} from '../classes/MatchSort';
import {equals} from '../boolean-rank-functions/equals';
import {unorderedMatchRatioRank} from '../number-rank-functions/unorderedMatchRatioRank';

const defaultTransformations: StringTransformation[] = ['trim', 'lowercase', 'removeAccents', 'removePunctuation'];

const matcher = new MatchSort();

export const generalMatcher = matcher
  .chain(equals, defaultTransformations)
  .chain(startsWith, defaultTransformations)
  .chain(hasWord, defaultTransformations)
  .chain(hasPart, defaultTransformations)
  .chain(hasWordStartingWith, defaultTransformations)
  .chain(hasPartStartingWith, defaultTransformations)
  .chain(contains, defaultTransformations)
  .chain(hasAcronym, defaultTransformations)
  .chain(matchRatioRank, defaultTransformations)
  .chain(unorderedMatchRatioRank, defaultTransformations);