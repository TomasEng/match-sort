export const indicesOf = (char: string, data: string): number[] => {
  if (char.length !== 1) {
    throw new Error('Char must be a single character.');
  }
  const indices: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] === char) indices.push(i);
  }
  return indices;
};