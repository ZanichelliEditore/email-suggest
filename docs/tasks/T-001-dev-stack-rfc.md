# T-001 — Dev-stack RFC (typescript, vitest, biome, node image)

- **Type:** plan
- **Phase:** 1
- **Status:** doing (2026-09-28)
- **Depends on:** none
- **Created:** 2026-09-28

## Goal
An Active RFC deciding the dev-dependency stack, so later tasks may add
`package.json` and dev dependencies (AGENTS.md rule 3, SPEC §12).

## In scope
- The three dev dependencies (`typescript`, `vitest`, `@biomejs/biome`):
  why each, alternatives weighed, exact-version pinning and a lockfile.
- The base image `node:22-alpine` and how it is pinned (tag or digest).
- Honest consequences: musl native binaries (Biome, rollup) in Alpine;
  Docker must be running for every commit (pre-commit Biome hook) and
  every `make quality`; how Dependabot keeps the pins fresh (T-002 adds
  its `docker` entry, T-003 its `npm` entry).
- `rfc-reviewer` on the draft, findings resolved, owner acceptance, then
  `make rfc-sync` to move it to `docs/rfc/active/`.

## Out of scope
- Any `package.json`, `Dockerfile` or source file.
- CI changes (Phase 2).

## Spec sections to read
- SPEC.md §6
- SPEC.md §7
- SPEC.md §12

## Files expected to change
- `docs/rfc/proposed/2026-09-28-dev-stack.md` → `docs/rfc/active/`
- `docs/architecture/overview.md` (reflect the active RFC)

## Acceptance
`grep -l '^- \*\*Status:\*\* Active' docs/rfc/active/*dev-stack*.md`
matches; the RFC records
the rfc-reviewer findings as resolved and the owner's acceptance;
`make quality` green.

**Split point:** the task ends at the wait for the owner's acceptance. If it
does not come in-session, the status stays `doing (YYYY-MM-DD)` and the only next action
is flipping the RFC's Status.

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
