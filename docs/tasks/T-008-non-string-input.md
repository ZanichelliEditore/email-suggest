# T-008 — `suggest` returns null for non-string input; SPEC §3 amendment

- **Type:** build
- **Phase:** 2
- **Status:** done (2026-09-29)
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
- `SPEC.md` §3: "never throws, whatever the argument"; any non-string
  argument returns `null`; the signature stays `email: string`.
- `src/index.ts:16`: `typeof email !== "string"` guard before the trim.
- `test/suggest.test.ts`: `suggest(%j) = null for a non-string` ×4
  (`null`, `undefined`, `42`, `{ toString: () => "x@lgmai.com" }`). All 4
  red with `TypeError` on `.trim` before the guard.
- Mutation probe, caught: guard replaced by `email == null` +
  `String(email).trim()`; the `toString` object case goes red.
- `make quality` exit 0, vitest 59 tests.
- Commit: see HANDOFF.md "Describes commit".

## Dead ends
none

## Open doubts
- A boxed `new String("x@lgmai.com")` returns `null` (`typeof` is
  `"object"`). The reviewer judged it within "any non-string"; not tested.

## Context pressure
low

## Next action
none (done).
