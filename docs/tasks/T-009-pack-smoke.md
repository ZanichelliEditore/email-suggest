# T-009 — Pack smoke test in the gate; `"files": ["dist"]`

- **Type:** build
- **Phase:** 2
- **Status:** done (2026-09-29)
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
- `package.json`: `"files": ["dist"]`. The tarball holds `dist/*.{js,d.ts}`
  plus npm's defaults (LICENSE, README.md, package.json), 11 files.
- `Makefile` `pack-smoke` (in `make help`, part of `quality`): build,
  `npm pack` into a `mktemp -d` scratch dir in the container, copy
  `pack-smoke/*` there, `npm install ./*.tgz`, `node consumer.ts`, then
  the repo's `tsc -p` on the scratch `tsconfig.json`.
- `pack-smoke/consumer.ts`, `package.json`, `tsconfig.json`: the fixture.
  Biome and the pre-commit `biome` hook now cover `pack-smoke/`.
- Mutation probes, all caught (`make pack-smoke` exit 2, restored after):
  - `"files"` removed: `ERR_MODULE_NOT_FOUND` on `dist/index.js`.
  - `"files": ["dist/*.js"]` (no `.d.ts`): `TS7016` on the import.
  - `export const wrong: number = suggest("x")` in the consumer: `TS2322`.
- `make quality` exit 0, with "pack-smoke: import, call and consumer
  typecheck passed".
- Commit: see HANDOFF.md "Describes commit".

## Dead ends
none

## Open doubts
- The work was started in an earlier session on 2026-09-29 that stopped
  before its handoff. This session found it staged, re-ran the gate, the
  probes and the review; nothing records what that session tried.

## Context pressure
low

## Next action
none (done).
