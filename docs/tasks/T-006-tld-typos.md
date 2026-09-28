# T-006 — TLD typo map, with its guard

- **Type:** build
- **Phase:** 1
- **Status:** todo
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
Commits and tests, not narration.

## Dead ends
none

## Open doubts
none

## Context pressure
low | ok | tight | overflowed — and, if tight or overflowed, how it should
have been split.

## Next action
Only if the status is still `doing`: the exact first step for the next
session.
