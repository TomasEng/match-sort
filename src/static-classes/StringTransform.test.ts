import {StringTransform} from './StringTransform';

describe('StringTransform', () => {
  describe('trim', () => {
    it('Trims the string', () => {
      expect(StringTransform.trim(' abc ')).toBe('abc');
      expect(StringTransform.trim('  abc')).toBe('abc');
      expect(StringTransform.trim('abc  ')).toBe('abc');
      expect(StringTransform.trim('\tabc\t')).toBe('abc');
      expect(StringTransform.trim('\nabc\n')).toBe('abc');
    });

    it('Does not remove whitespaces in the middle of the string', () => {
      expect(StringTransform.trim('a b c')).toBe('a b c');
    });

    it('Returns the string as is when it does not start or end with whitespace', () => {
      expect(StringTransform.trim('abc')).toBe('abc');
    });
  });

  describe('lowercase', () => {
    it('Converts the string to lowercase', () => {
      expect(StringTransform.lowercase('ABC')).toBe('abc');
      expect(StringTransform.lowercase('AbC')).toBe('abc');
    });

    it('Returns the string as is when it is already lowercase', () => {
      expect(StringTransform.lowercase('abc')).toBe('abc');
    });
  });

  describe('removeAccents', () => {
    it('Removes accents from the string', () => {
      expect(StringTransform.removeAccents('áéíóú')).toBe('aeiou');
      expect(StringTransform.removeAccents('àèìòù')).toBe('aeiou');
      expect(StringTransform.removeAccents('âêîôû')).toBe('aeiou');
      expect(StringTransform.removeAccents('äëïöü')).toBe('aeiou');
      expect(StringTransform.removeAccents('ãõ')).toBe('ao');
      expect(StringTransform.removeAccents('ñ')).toBe('n');
      expect(StringTransform.removeAccents('ç')).toBe('c');
    });
  });

  describe('removePunctuation', () => {
    it('Removes punctuation from the string', () => {
      expect(StringTransform.removePunctuation('a,b.c!d?e')).toBe('abcde');
    });
  });

  describe('removeWhitespace', () => {
    it('Removes whitespace from the string', () => {
      expect(StringTransform.removeWhitespace(' a b c ')).toBe('abc');
      expect(StringTransform.removeWhitespace('a\nb')).toBe('ab');
      expect(StringTransform.removeWhitespace('a\tb')).toBe('ab');
    });
  });
});