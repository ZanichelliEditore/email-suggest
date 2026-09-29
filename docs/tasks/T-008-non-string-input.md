# T-008 — `suggest` returns null for non-string input; SPEC §3 amendment

- **Type:** build
- **Phase:** 2
- **Status:** todo
- **Depends on:** T-007
- **Created:** 2026-09-29

## Goal
`suggest` returns `null` for any non-string argument instead of throwing,
and SPEC §3 says so. Owner decision, 2026-09-29; no RFC (owner SPEC
amendment, as with step 1.2, decided at Phase 2 plan review).

## In scope
- SPEC §3: "never throws" covers any argument; a non-string returns `null`.
- `src/index.ts`: a runtime `typeof` guard before the trim.
- `test/suggest.test.ts`: `null`, `undefined`, a number, an object →
  `null`, no throw (cast past the type, since the signature stays).

## Out of scope
- Changing the `.d.ts` signature: it stays `email: string` (owner, plan
  review 2026-09-29).
- Anything else in §3 or §4.

## Spec sections to read
- SPEC.md §3
- SPEC.md §10

## Files expected to change
- `SPEC.md`
- `src/index.ts`
- `test/suggest.test.ts`

## Acceptance
SPEC §3 says `suggest` never throws and returns `null` for any non-string
argument; vitest passes `test/suggest.test.ts` cases for `null`,
`undefined`, a number and an object; `make quality` green.

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
