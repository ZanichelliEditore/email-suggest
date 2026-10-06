# T-018 — Merge Dependabot PR #2 (biome 2.5.15, vitest 5.0.3)

- **Type:** build
- **Phase:** owner request (outside SPEC §13)
- **Status:** doing (2026-10-06)
- **Depends on:** none
- **Created:** 2026-10-06

## Goal
PR #2 (Dependabot `npm` group: `@biomejs/biome` 2.5.14 → 2.5.15, `vitest`
5.0.2 → 5.0.3, plus their lockfile transitives) is merged into `main`
after the gate passes on its branch.

## In scope
- PR #2 CI green on its head commit.
- On its branch: `make deps`, then `make quality`.
- Merge with a merge commit, as PR #1 was; pull `main`; `make deps` and
  `make quality` on the merged `main`; CI green on `main`.

## Out of scope
- T-020 (top-level `main`/`types`, `0.1.2`).
- Any code or config change the bump does not force; a change it does
  force stops the task for the owner's call.

## Spec sections to read
- SPEC.md §8

## Files expected to change
- `package.json`, `package-lock.json` (by the merge only)

## Acceptance
PR #2 CI green; `make deps` then `make quality` green on its branch;
merged.

---
*Filled at `/handoff`:*

## Done

## Dead ends
none

## Open doubts
none

## Context pressure

## Next action
