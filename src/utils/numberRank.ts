export const numberRank = (rank: number | boolean): number => {
  switch (rank) {
    case true:
      return 0;
    case false:
      return 1;
    default:
      return rank;
  }
}