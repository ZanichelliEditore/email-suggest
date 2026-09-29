import { expect, test } from "vitest";
import { domains } from "../src/domains.js";

test("no domain is listed twice", () => {
  expect(new Set(domains).size).toBe(domains.length);
});

test("every domain is lowercase", () => {
  for (const domain of domains) {
    expect(domain).toBe(domain.toLowerCase());
  }
});
