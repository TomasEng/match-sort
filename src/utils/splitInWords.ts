export const splitInWords = (str: string): string[] => {
  const trimmedString = str.trim();
  if (trimmedString === '') return [];
  return trimmedString.split(/\s+/);
};