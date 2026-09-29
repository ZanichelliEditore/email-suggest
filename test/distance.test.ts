import { expect, test } from "vitest";
import { distance } from "../src/distance.js";

test.each([
  ["", "", 0],
  ["", "abc", 3],
  ["abc", "", 3],
  ["gmail.com", "gmail.com", 0],
  ["gmail.cim", "gmail.com", 1],
  ["ab", "ba", 1],
  ["icolud.com", "icloud.com", 1],
  ["lgmai.com", "gmail.com", 2],
  // OSA gives 3; unrestricted Damerau-Levenshtein gives 2.
  ["ca", "abc", 3],
])("distance(%j, %j) = %i", (a, b, expected) => {
  expect(distance(a, b)).toBe(expected);
});
