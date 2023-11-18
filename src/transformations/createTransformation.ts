import {namedTransformationFunctions} from './namedTransformationFunctions';
import {StringTransformation} from '../types/StringTransformation';

export const createTransformation = (transformation: StringTransformation) => {
  if (typeof transformation === 'string') {
    return namedTransformationFunctions[transformation];
  } else {
    return  transformation;
  }
}