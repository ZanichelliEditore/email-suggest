# T-003 — JS toolchain; Biome in the gate and the pre-commit hook

- **Type:** build
- **Phase:** 1
- **Status:** done (2026-09-29)
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
- `package.json` (SPEC §6, RFC Decision 1 pins), `package-lock.json`
  (39 packages; 90/90 `resolved` on `registry.npmjs.org` with sha512;
  vite 8.3.1, rolldown 1.2.11), `.npmrc` (RFC Decision 2, plus
  `update-notifier=false`), `biome.json`, `.gitignore` `dist/`, Dependabot
  `npm` entry, README prerequisite line. One commit,
  `T-003: JS toolchain, Biome in the gate and pre-commit hook` (hash in
  HANDOFF.md).
- **Install:** `make deps`, run in the container: `npm ci` only when
  `package.json`, the lockfile, `.npmrc` or the `Dockerfile` differ from
  `node_modules/.deps-stamp` (`Makefile`, `DEPS_INPUTS`). Why in the
  container: the host cannot see the volume. So no npm cache volume: a
  reinstall happens only on an input change (T-002's cache nit, closed).
- **Targets:** `make biome` = `biome check --error-on-warnings` (lint,
  format, import order); `lint` depends on it; `format` =
  `biome check --write --linter-enabled=false`; `format-check` =
  `biome format`. All call `node_modules/.bin/biome`, never `npx biome`
  (why: `docs/journal.md` 2026-09-29).
- **Hook:** `biome`, `entry: make biome`, check-only: the hook runs the
  gate's own step, so a commit that passes it passes Biome in
  `make quality`; `make format` fixes. `stages: [pre-commit]`.
- **biome.json:** `useEditorconfig: true` (Biome's default is tabs;
  `.editorconfig` and npm both write 2 spaces); includes `src/**`,
  `test/**`, root `*.json`; excludes the lockfile and root `.*.json`
  (`.faigo.json`, `.agent-native-setup.json`: their tools own the format).
- **Dependabot security question** (from `docs/improvements.md`): settled
  from GitHub docs, recorded in the dev-stack RFC "Majors are manual";
  the improvements entry is removed.
- Acceptance, run 2026-09-29: `make quality` green, printing both Biome
  steps (`Checked 2 files … No fixes applied.`); `pre-commit run biome
  --all-files` Passed; the Makefile grep empty. Probes (then deleted):
  `src/probe.ts` with `==` and bad format failed `lint`, `format-check`
  and the hook, and `make format` fixed format and import order; an
  unused import alone exits 2; `node_modules/.bin/biome` moved away exits
  2; a second `make deps` is a no-op, an `.npmrc` edit reinstalls.
- No automated test: acceptance is the commands above.

## Dead ends
none

## Open doubts
- The Dependabot security-update behaviour under `ignore` is documented,
  not observed; whether Dependabot security updates are enabled in the
  repo settings is unverified (no `gh`).
- CI does not run Biome yet (`quality.yml` calls ruff and gitleaks
  directly): parked in `docs/improvements.md`; SPEC §8 / Phase 2.

## Context pressure
ok

## Next action
none (done)
