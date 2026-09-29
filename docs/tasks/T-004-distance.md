# T-004 — `distance.ts`; typecheck, vitest and `make build` join the gate

- **Type:** build
- **Phase:** 1
- **Status:** done (2026-09-29)
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
- Commit `T-004: distance.ts; typecheck, vitest and make build join the gate`
  (hash in `docs/HANDOFF.md`).
- `src/distance.ts::distance`, OSA; `tsconfig.json` (typecheck `src/` +
  `test/`, no emit) and `tsconfig.build.json` (emit `src/` only; the split
  keeps `test/` out of `dist/`).
- `Makefile`: `typecheck`, `build` (`rm -rf dist` first), `test` gains
  vitest; `quality` gains `typecheck`.
- `test/distance.test.ts`, 9 rows: the 6 acceptance cases plus
  `abc`/`""` = 3, `gmail.cim`/`gmail.com` = 1 (substitution cost) and
  `ab`/`ba` = 1 (swap at the first position), the last two added at review.
- Mutation probes, each failing exactly the expected row: swap step
  removed → `icolud.com`; substitution cost 2 → `gmail.cim`; swap guard
  `i > 2 && j > 2` → `ab`/`ba`. A type error in `test/` fails
  `make typecheck` (exit 1).
- `make build` emits only `dist/distance.js` + `dist/distance.d.ts`.

## Dead ends
none

## Open doubts
- CI (`quality.yml`) runs neither tsc nor vitest: green CI does not mean
  the distance tests passed until Phase 2 moves CI onto `make quality`
  (same gap as Biome, `docs/improvements.md`).

## Context pressure
ok

## Next action
none (done).
