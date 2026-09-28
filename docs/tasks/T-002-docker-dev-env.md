# T-002 — Docker dev environment

- **Type:** build
- **Phase:** 1
- **Status:** todo
- **Depends on:** T-001
- **Created:** 2026-09-28

## Goal
A `node:22-alpine` dev container, driven by `compose.yaml`, that every
later JS step runs through; `make shell` opens it.

## In scope
- `Dockerfile` at the image pin the RFC chose; `/app/node_modules`
  pre-created and owned by the run user, so the named volume inherits it.
- `compose.yaml`: one service `dev`, repo mounted, `node_modules` in a
  named volume.
- Run as the host UID or the image's `node` user, so files the container
  writes (`dist/`, lockfile) are not root-owned on the host. Decide and
  record why.
- `make shell` with a one-line `make help` description.
- `.dockerignore`; `.gitignore` entries as needed.
- A `docker` entry in `.github/dependabot.yml` for the base image.

## Out of scope
- `package.json`, Biome, tsc, vitest (T-003, T-004).
- `make build` (T-004: `tsc` fails with no inputs).

## Spec sections to read
- SPEC.md §7
- SPEC.md §14

## Files expected to change
- `Dockerfile`
- `compose.yaml`
- `.dockerignore`
- `Makefile`
- `.gitignore`
- `.github/dependabot.yml`

## Acceptance
`make shell` opens a shell in the container;
`docker compose run --rm -T dev node --version` prints `v22.`;
`make help` lists `shell`; `make quality` green.

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
