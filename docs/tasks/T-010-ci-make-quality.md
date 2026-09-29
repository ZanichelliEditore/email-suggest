# T-010 — CI runs `make quality` through Docker

- **Type:** build
- **Phase:** 2
- **Status:** done (2026-09-29)
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
- `405bb34`: `.github/workflows/quality.yml` `quality` job checks out
  with `fetch-depth: 0`, installs ruff and pre-commit with pipx, and runs
  `make quality` as its one gate step. The `checks` job is unchanged.
- Local: `make quality` exit 0. The same gate also passed on a fresh clone
  with a fresh compose project (new image, empty `node_modules` volume), and
  actionlint passed.
- CI: run https://github.com/ZanichelliEditore/email-suggest/actions/runs/36587270115
  green. Its log shows Biome, ruff, `tools/checks` (5), vitest (59),
  pack-smoke and both gitleaks scans passing, as the runner's UID rather
  than 1000.
- Review follow-ups in `405bb34`: `docs/improvements.md` (old CI item
  struck; unpinned ruff parked), `docs/journal.md` (managed-file warning).

## Dead ends
none

## Open doubts
- `pipx install ruff` is unpinned while pre-commit pins v0.15.17
  (`docs/improvements.md`, parked).
- `quality.yml` is a managed file: `agent-native-setup update` may restore
  the ruff-only job (`docs/journal.md`, 2026-09-29).

## Context pressure
low

## Next action
none (done).
