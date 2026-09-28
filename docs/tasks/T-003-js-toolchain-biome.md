# T-003 — JS toolchain; Biome in the gate and the pre-commit hook

- **Type:** build
- **Phase:** 1
- **Status:** todo
- **Depends on:** T-002
- **Created:** 2026-09-28

## Goal
`package.json` with the RFC's pinned dev dependencies, installed inside the
container, and Biome running in `make lint`/`format`/`format-check` and
the pre-commit hook.

## In scope
- `package.json`: name, version `0.1.0`, `"type": "module"`, `exports`
  map to `./dist/index.js` and its types, `"sideEffects": false`, the
  three dev dependencies at their RFC pins.
- `package-lock.json` generated inside the container.
- How `node_modules` gets installed: the host cannot see into the named
  volume, so a host-side sentinel won't work. Options: a `make deps`
  target, or `npm ci` when the lockfile changes. Decide and record why.
- `biome.json` scoped to `src/`, `test/` and root JSON configs; excludes
  the lockfile, `docs/`, `.claude/`, `tools/`.
- Biome steps in `make lint`, `format`, `format-check` via
  `docker compose run --rm -T dev …`.
- A `language: system` Biome hook, id `biome`, in `.pre-commit-config.yaml` through
  the container. Check-only or `--write`: decide and record why.
- `make gitleaks` passes on the lockfile.
- An `npm` entry in `.github/dependabot.yml`.

## Out of scope
- `tsconfig.json`, typecheck, vitest, `make build` (T-004: `tsc` and
  vitest both fail with no inputs, and `--passWithNoTests` is a weakened
  check, not allowed).

## Spec sections to read
- SPEC.md §6
- SPEC.md §7
- SPEC.md §8

## Files expected to change
- `package.json`
- `package-lock.json`
- `biome.json`
- `Makefile`
- `.pre-commit-config.yaml`
- `.gitignore` (`dist/`)
- `.github/dependabot.yml`

## Acceptance
`make quality` green and its output shows Biome's check;
`pre-commit run biome --all-files` passes;
`grep -nE '^\s+(npm|npx|node) ' Makefile` prints nothing.

**Split point:** seven files. If the session gets tight, the pre-commit
hook and its `pre-commit run biome` acceptance move to T-004.

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
