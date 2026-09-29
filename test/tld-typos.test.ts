import { expect, test } from "vitest";
import { tldTypos } from "../src/tld-typos.js";

// A hand-picked set of real TLDs near the keys (SPEC §5 guard), and the
// map's own fixes: a key equal to any of them would "correct" a real domain.
const realTlds = new Set([
  "co",
  "cm",
  "om",
  "de",
  "io",
  "in",
  "is",
  "nl",
  "ne",
  "ec",
  "er",
  "com",
  "it",
  "net",
  "org",
  "cn",
  "et",
  "gr",
  "iq",
  "itv",
  "ir",
  "no",
  "ntt",
  "ong",
  "ro",
  "tj",
  "tl",
  "tn",
  "to",
  "tr",
  "tt",
  "tv",
]);

test("no typo key is a real TLD", () => {
  for (const key of tldTypos.keys()) {
    expect(realTlds.has(key), key).toBe(false);
  }
});
