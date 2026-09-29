# T-005 — Known-domain list, with its guards

- **Type:** build
- **Phase:** 1
- **Status:** done (2026-09-29)
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
- Commit `T-005: known-domain list with its guards` (hash in
  `docs/HANDOFF.md`).
- `src/domains.ts::domains`, `readonly string[]`, 32 entries; diffed
  mechanically against SPEC.md §5 lines 123-131: same content, same order.
- `test/domains.test.ts::no domain is listed twice` and
  `::every domain is lowercase`.
- Mutation probes, each failing only its own test: `iol.it` replaced by a
  second `gmail.com` → duplicate test; `iol.it` → `IOL.it` → lowercase test.
- `make build` emits `dist/domains.js` + `dist/domains.d.ts` beside the
  distance files.

## Dead ends
none

## Open doubts
none

## Context pressure
low

## Next action
none (done).
