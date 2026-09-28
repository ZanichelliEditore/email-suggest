# T-005 — Known-domain list, with its guards

- **Type:** build
- **Phase:** 1
- **Status:** todo
- **Depends on:** T-004
- **Created:** 2026-09-28

## Goal
`src/domains.ts`, the typed array of §5, and the guards on it that can be
tested without `suggest()`.

## In scope
- `src/domains.ts`: the 32 known domains, in §5 order.
- `test/domains.test.ts`: no duplicates; every entry lowercase. The
  content and order are proven by behaviour in T-007 (§10 rows, the tie
  row `ti.it` → `tim.it`), not by a copy of the list in the test.

## Out of scope
- The TLD typo map (T-006).
- The guard "no list entry is ever suggested a correction": it needs
  `suggest()`, so it lands in T-007.
- The §10 rows: they need `suggest()`. §14's "a list change ships with its
  test row" governs changes after the list exists.

## Spec sections to read
- SPEC.md §5

## Files expected to change
- `src/domains.ts`
- `test/domains.test.ts`

## Acceptance
`make quality` green with `test/domains.test.ts` passing.

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
