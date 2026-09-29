# T-006 — TLD typo map, with its guard

- **Type:** build
- **Phase:** 1
- **Status:** done (2026-09-29)
- **Depends on:** T-004
- **Created:** 2026-09-28

## Goal
`src/tld-typos.ts`, the typed map of §5, and the guard that no key is a
real TLD.

## In scope
- `src/tld-typos.ts`: the map of the §5 table.
- `test/tld-typos.test.ts`: no key is in a
  hard-coded set of real TLDs near the keys (at least `co`, `cm`, `om`,
  `de`, `io`, `in`, `is`, `nl`, `ne`, `ec`, `er`).

## Out of scope
- The domain list (T-005); `suggest()` (T-007). The map's content is
  proven by the §10 rows in T-007, not by a copy in the test.

## Spec sections to read
- SPEC.md §5
- SPEC.md §4 (step 2)

## Files expected to change
- `src/tld-typos.ts`
- `test/tld-typos.test.ts`

## Acceptance
`make quality` green with `test/tld-typos.test.ts` passing.

---
*Filled at `/handoff`:*

## Done
- Commit `T-006: TLD typo map with its guard` (hash in `docs/HANDOFF.md`).
- `src/tld-typos.ts::tldTypos`, `ReadonlyMap<string, string>`, 14 entries
  in SPEC.md §5 table order. A Map rather than a Record, so T-007's lookup
  of an untrusted label (`constructor`) cannot hit `Object.prototype`.
- `test/tld-typos.test.ts::no typo key is a real TLD`, against a
  hand-picked set of 32 real TLDs: the 11 SPEC requires, the 4 fixes
  (`com it net org`), and neighbours of the keys (`cn et gr iq ir itv no
  ntt ong ro tj tl tn to tr tt tv`).
- Mutation probe: adding key `co` fails the guard with `co: expected true
  to be false`.
- `make build` emits `dist/tld-typos.js` + `dist/tld-typos.d.ts`.

## Dead ends
none

## Open doubts
none

## Context pressure
low

## Next action
none (done).
