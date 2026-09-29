/**
 * Damerau-Levenshtein distance, optimal-string-alignment variant (SPEC §4
 * step 1.3): insertion, deletion, substitution and a swap of two adjacent
 * characters each cost 1, and no substring is edited twice.
 */
export function distance(a: string, b: string): number {
  // d[i][j]: distance between the first i characters of a and the first j of b.
  const d: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    d.push([i]);
  }
  for (let j = 1; j <= b.length; j++) {
    d[0].push(j);
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let best = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost,
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        best = Math.min(best, d[i - 2][j - 2] + 1);
      }
      d[i].push(best);
    }
  }
  return d[a.length][b.length];
}
