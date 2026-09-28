# T-004 — `distance.ts`; typecheck, vitest and `make build` join the gate

- **Type:** build
- **Phase:** 1
- **Status:** todo
- **Depends on:** T-003
- **Created:** 2026-09-28

## Goal
The OSA Damerau-Levenshtein function with its unit tests, and the first
real source that lets typecheck, vitest and `make build` join the gate.

## In scope
- `src/distance.ts`: OSA variant; insertion, deletion, substitution and
  adjacent swap each cost 1.
- `test/distance.test.ts`, table-driven: both empty, `""`/`abc` = 3,
  identical strings, one swap (`icolud.com`/`icloud.com` = 1),
  `lgmai.com`/`gmail.com` = 2, `ca`/`abc` = 3 (OSA, not unrestricted
  Damerau-Levenshtein, which gives 2).
- `tsconfig.json` (`strict`, ES2020 ESM, `.d.ts`); a separate build
  config only if typechecking `test/` and emitting only `src/` need it.
- `make test` gains vitest, `make quality` gains typecheck, new
  `make build`; all via the container, each with a `make help` line.

## Out of scope
- Lists, `suggest()`.

## Spec sections to read
- SPEC.md §4 (step 1.3)
- SPEC.md §6
- SPEC.md §10 (the paragraph after the table)

## Files expected to change
- `tsconfig.json` (+ `tsconfig.build.json` if needed)
- `src/distance.ts`
- `test/distance.test.ts`
- `Makefile`

## Acceptance
`make quality` green, showing typecheck and vitest passing
`test/distance.test.ts`; `make build` emits `dist/distance.js` and
`dist/distance.d.ts`.

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
