# T-001 — Dev-stack RFC (typescript, vitest, biome, node image)

- **Type:** plan
- **Phase:** 1
- **Status:** done (2026-09-28)
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
- `49d4081`: RFC `docs/rfc/active/2026-09-28-dev-stack.md`, Status
  Active, with both rfc-reviewer rounds and the owner's acceptance
  (2026-09-28, Node 24 chosen) recorded in its "Review and acceptance".
  SPEC §7 and T-002's acceptance now say `node:24-alpine` / `v24.`;
  `docs/architecture/overview.md` gained the dev-stack entry.
- Handoff commit: `code-reviewer` fixes in the RFC (vitest's real Node
  range, stale "node:24 as alternative" line, wording) and the T-003
  Dependabot check parked in `docs/improvements.md`.
- No project tests: `plan` task. Proof is the acceptance grep
  (`grep -l '^- \*\*Status:\*\* Active' docs/rfc/active/*dev-stack*.md`
  matches) and the out-of-repo spike on both Node digests, recorded in
  the RFC's Decision.
- This task's own scope line (above) still says `node:22-alpine`: it is
  the task as planned; the RFC and the PLAN note record the change.

## Dead ends
none

## Open doubts
- arm64 is unverified: the spike ran on x86_64 only (no emulation on
  this host). First arm64 contributor confirms.
- Whether Dependabot's major-version ignore also suppresses security PRs:
  handed to T-003 via `docs/improvements.md`, not in T-003's task file.

## Context pressure
ok

## Next action
none (done).
