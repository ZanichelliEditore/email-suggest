# T-007 — `suggest()` and Phase 1 close

- **Type:** build
- **Phase:** 1
- **Status:** todo
- **Depends on:** T-004, T-005, T-006
- **Created:** 2026-09-28

## Goal
The public `suggest()` of §3, matching per §4, with the §10 acceptance
table, and Phase 1's acceptance demonstrated.

## In scope
- `src/index.ts`: `suggest` and `Suggestion`, the only exports; trim,
  split on last `@`, lowercase domain, step 1 (including the step 1.2
  same-name rule) then step 2; never throws.
- `test/suggest.test.ts`, table-driven: every §10 row (the step 1.2 rows
  were added at Phase 1 plan review, 2026-09-28); the guard "no list entry is ever suggested"
  (every domain in `domains.ts` → `null`).
- Phase close: `/review` on the Phase 1 diff, and `/security-review`
  (`suggest` takes untrusted input).
- The no-Node demonstration: run `make quality` with any Node install
  removed from `PATH` and `command -v node` empty; paste the output in
  HANDOFF.

## Out of scope
- Pack smoke test, CI changes, publishing (Phase 2).

## Spec sections to read
- SPEC.md §3
- SPEC.md §4
- SPEC.md §10

## Files expected to change
- `src/index.ts`
- `test/suggest.test.ts`

## Acceptance
With Node's directories removed from `PATH` (`command -v node` empty),
`make quality` green and vitest passes the `suggest`, `domains`,
`tld-typos` and `distance` test files, covering every §10 row and the
"no list entry is suggested" guard; `make build` emits `dist/index.js` and
`dist/index.d.ts`.

**Split point:** if the session gets tight, the Phase 1 close (phase-wide
review, security review, no-Node demonstration) becomes its own task.

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
