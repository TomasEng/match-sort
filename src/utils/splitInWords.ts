export const splitInWords = (str: string): string[] => {
  const trimmedString = str.trim();
  return trimmedString.split(/\s+/);
};