import {StringTransformationKey} from '../types/StringTransformationKey';
import {StringTransformationFunction} from '../types/StringTransformationFunction';

export const namedTransformationFunctions: {[key in StringTransformationKey]: StringTransformationFunction} = {
  trim: (value: string) => value.trim(),
  lowercase: (value: string) => value.toLowerCase(),
  removeAccents: (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC'),
  removePunctuation: (value: string) => value.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g,""),
  removeWhitespace: (value: string) => value.replace(/\s/g, ''),
};