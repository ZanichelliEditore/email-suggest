# T-010 — CI runs `make quality` through Docker

- **Type:** build
- **Phase:** 2
- **Status:** todo
- **Depends on:** T-009
- **Created:** 2026-09-29

## Goal
GitHub Actions runs the same gate as local, `make quality` through Docker,
so CI green means Biome, tsc, vitest and the pack smoke test passed (parked
item, `docs/improvements.md`, T-003 review).

## In scope
- `.github/workflows/quality.yml`: the `quality` job installs what the host
  side of the gate needs (ruff, pre-commit), checks out with
  `fetch-depth: 0` (`gitleaks-history`), and runs `make quality` as its one
  gate step.
- Keep the `checks` job (`gitleaks-action`) as is (owner, plan review
  2026-09-29).

## Out of scope
- Publishing (T-011). Docker layer caching. `make quality-no-node` (stays
  parked).
- Waiting for the CI run: the task ends at the push (§14.1); T-011 checks
  the result first.

## Spec sections to read
- SPEC.md §7
- SPEC.md §8

## Files expected to change
- `.github/workflows/quality.yml`
- maybe `Makefile`

## Acceptance
`quality.yml`'s `quality` job has exactly one gate step, `make quality`;
`make quality` green locally; commit pushed to `main`.

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
