# T-002 — Docker dev environment

- **Type:** build
- **Phase:** 1
- **Status:** done (2026-09-28)
- **Depends on:** T-001
- **Created:** 2026-09-28

## Goal
A `node:24-alpine` dev container, driven by `compose.yaml`, that every
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
`docker compose run --rm -T dev node --version` prints `v24.`;
`make help` lists `shell`; `make quality` green.

---
*Filled at `/handoff`:*

## Done
- `Dockerfile` (RFC Decision 3 pin), `compose.yaml` (service `dev`, repo at
  `/app`, `node_modules` named volume), `.dockerignore` (`*`: nothing is
  copied), `.gitignore` `node_modules/`, `make shell`, Dependabot `docker`
  entry. One commit, `T-002: Docker dev environment` (hash in HANDOFF.md).
- Run user: **host UID:GID**, not `node`; why in `docs/journal.md`
  (2026-09-28, T-002) and the comments at `Dockerfile:5-10`,
  `compose.yaml:4-6`. So `/app/node_modules` is `0777`, not owned by the
  run user as "In scope" said: that UID is unknown at build time.
- Acceptance, run 2026-09-28: `docker compose run --rm -T dev node --version`
  → `v24.21.0`; `make shell` (under a pty) → `/app $` prompt, `node
  --version` `v24.21.0`, `id -u` `1000`; `make help` → `shell  open a shell
  in the dev container`; `make quality` green. Extra probes: a file written
  in `/app` is `andrea:andrea` on the host; `HOST_UID=1234` writes the
  volume and `$HOME`.
- `docs/improvements.md` digest-grouping entry resolved and removed: the
  group has no `update-types` filter, so digest refreshes land in it
  (`.github/dependabot.yml`, comment above the `docker` entry).
- No automated test: acceptance is the commands above.

## Dead ends
none

## Open doubts
- Dependabot `docker` grouping is reasoned, not observed: the first weekly
  run confirms it.
- `HOME=/tmp` plus `--rm` drops npm's cache after every run; T-003 judges
  whether `npm ci` wants a cache volume.

## Context pressure
ok

## Next action
none (done)
