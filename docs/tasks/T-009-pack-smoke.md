# T-009 — Pack smoke test in the gate; `"files": ["dist"]`

- **Type:** build
- **Phase:** 2
- **Status:** todo
- **Depends on:** T-008
- **Created:** 2026-09-29

## Goal
The §10 pack smoke test runs in `make quality`, and the tarball ships
`dist/` (parked item, `docs/improvements.md`, T-004 review).

## In scope
- `package.json`: `"files": ["dist"]`.
- `make pack-smoke` (one-line `make help` entry), part of `quality`: build,
  `npm pack`, install the tarball into a scratch dir under the container's
  `/tmp`, import `suggest` and call it once, and typecheck a consumer file
  against the shipped `.d.ts` with the repo's own `tsc`. All inside
  Docker; `ignore-scripts=true` means every step is explicit.
- A small tracked consumer fixture outside the `tsconfig.json` and vitest
  globs (e.g. `pack-smoke/`).
- Mutation probe: with `"files"` removed, `make pack-smoke` fails (record
  in HANDOFF).

## Out of scope
- CI changes (T-010), publishing (T-011).

## Spec sections to read
- SPEC.md §6
- SPEC.md §8
- SPEC.md §10 (pack smoke test paragraph)

## Files expected to change
- `package.json`
- `Makefile`
- `pack-smoke/` fixture (consumer file, its tsconfig)
- `docs/architecture/overview.md`

## Acceptance
`make quality` green and its output shows `pack-smoke` passing (import,
one call, consumer typecheck against the shipped `.d.ts`); with `"files"`
removed, `make pack-smoke` fails.

**Split point:** if the fixture layout fights Biome or tsconfig, ship
`"files"` plus a tarball-contents check first; the consumer import and
typecheck become the next task.

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
