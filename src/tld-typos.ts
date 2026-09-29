/**
 * TLD typo map, typo to fix (SPEC §5). A Map, not an object, so looking up a
 * label such as "constructor" finds nothing rather than a prototype member.
 */
export const tldTypos: ReadonlyMap<string, string> = new Map([
  ["con", "com"],
  ["cmo", "com"],
  ["ocm", "com"],
  ["vom", "com"],
  ["xom", "com"],
  ["comm", "com"],
  ["ti", "it"],
  ["iy", "it"],
  ["itt", "it"],
  ["nte", "net"],
  ["ent", "net"],
  ["ner", "net"],
  ["ogr", "org"],
  ["rog", "org"],
]);
