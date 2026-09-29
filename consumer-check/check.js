// Runs in the scratch Vite project after `vite build` (make consumer-check):
// imports the package installed from Gemfury and checks SPEC §13's call.
import assert from "node:assert/strict";
import { suggest } from "@zanichelli/email-suggest";

assert.deepStrictEqual(suggest("mario@lgmai.com"), {
  address: "mario@gmail.com",
  domain: "gmail.com",
});
console.log("consumer-check: suggest() from the Gemfury package passed");
