import {StringTransformationFunction} from '../types/StringTransformationFunction';

export class StringTransform {

  public static trim: StringTransformationFunction =
    (value: string) => value.trim();

  public static lowercase: StringTransformationFunction =
    (value: string) => value.toLowerCase();

  public static removeAccents: StringTransformationFunction =
    (value: string) => value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .normalize('NFC');

  public static removePunctuation: StringTransformationFunction =
    (value: string) => value.replace(/[.,\/#!?$%^&*;:{}=\-_`~()]/g,"");

  public static removeWhitespace: StringTransformationFunction =
    (value: string) => value.replace(/\s/g, '');
}