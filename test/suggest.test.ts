import { expect, test } from "vitest";
import { domains } from "../src/domains.js";
import * as index from "../src/index.js";
import { suggest } from "../src/index.js";

// The SPEC §10 acceptance table, in its order.
test.each([
  ["mario@lgmai.com", "mario@gmail.com"],
  ["Mario.Rossi@icolud.com", "Mario.Rossi@icloud.com"],
  ["mario@Lgmai.com", "mario@gmail.com"],
  ["x@hotmial.com", "x@hotmail.com"],
  ["x@libero.ti", "x@libero.it"],
  ["x@istruzone.it", "x@istruzione.it"],
  ["x@yaho.it", "x@yahoo.it"],
  ["x@gmail.con", "x@gmail.com"],
  ["x@studio-rossi.con", "x@studio-rossi.com"],
  ["x@gmal.co", "x@gmail.com"],
  ["x@me.co", "x@me.com"],
  ["a@b@lgmai.com", "a@b@gmail.com"],
  ["x@studio-rossi.ti", "x@studio-rossi.it"],
  ["x@libro.it", "x@libero.it"],
  ["x@gmail.ti", "x@email.it"],
  ["x@gmail.co", "x@gmail.com"],
  ["x@gmail.cm", "x@gmail.com"],
  ["x@libero.ot", "x@libero.it"],
  ["x@gmail.cim", "x@gmail.com"],
  ["x@proton.", "x@proton.me"],
  ["x@ti.it", "x@tim.it"],
  // Not in §10: the address of a suggestion is trimmed too (§3).
  ["  x@lgmai.com  ", "x@gmail.com"],
])("suggest(%j) = %j", (input, address) => {
  expect(suggest(input)).toEqual({
    address,
    domain: address.slice(address.lastIndexOf("@") + 1),
  });
});

test.each([
  "x@gmail.com",
  "  x@GMAIL.COM  ",
  "x@tin.it",
  "x@mail.com",
  "x@studio-rossi.co",
  "x@studio-rossi.it",
  "x@gmx.de",
  "x@ali.it",
  "x@gmail.it",
  "x@yahoo.fr",
  "x@hotmail.de",
  "x@con",
  // Not in §10: an empty name skips step 2 (§4).
  "x@.con",
  "",
  "mario",
  "@gmail.com",
  "mario@",
])("suggest(%j) = null", (input) => {
  expect(suggest(input)).toBeNull();
});

// §3: any non-string argument returns null, not a throw. The signature
// stays `email: string`, so the cast gets past the type as plain JS would.
// The object stringifies to a typo address, so a `String(email)` coercion
// would suggest for it instead of returning null.
test.each([null, undefined, 42, { toString: () => "x@lgmai.com" }])(
  "suggest(%j) = null for a non-string",
  (input) => {
    expect(suggest(input as unknown as string)).toBeNull();
  },
);

test("no list entry is ever suggested", () => {
  for (const domain of domains) {
    expect(suggest(`x@${domain}`), domain).toBeNull();
  }
});

// Security review, 2026-09-29: before the length bound, a 1 MB domain took
// 13 s and 714 MB. The first reaches step 1.3; the second, with a known
// name, ends at step 1.2.
test.each([
  `x@${"a".repeat(1_000_000)}.com`,
  `x@gmail.${"a".repeat(1_000_000)}`,
])("a 1 MB domain returns null quickly (%#)", (input) => {
  const start = performance.now();
  expect(suggest(input)).toBeNull();
  expect(performance.now() - start).toBeLessThan(500);
});

test("suggest is the only runtime export", () => {
  expect(Object.keys(index)).toEqual(["suggest"]);
});
