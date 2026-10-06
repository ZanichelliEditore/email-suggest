# T-016 — npm publishing: workflow, Gemfury removal, `0.1.0` bootstrap

- **Type:** build
- **Phase:** owner request (outside SPEC §13)
- **Status:** todo (2026-10-06)
- **Depends on:** T-015
- **Created:** 2026-10-06

## Goal
`publish.yml` publishes to the public npm registry, every Gemfury path is
gone from tracked code, and `0.1.0` is on its way to npm through the
bootstrap token (RFC `docs/rfc/active/2026-10-06-publish-to-npm.md`).

## In scope
- RFC Decision 1: `publish.yml` with `actions/setup-node`, `id-token:
  write`, `npm publish .pack/*.tgz --access public --provenance`, the
  single-tarball guard, and `NODE_AUTH_TOKEN` from `secrets.NPM_TOKEN` for
  the bootstrap.
- Decision 2: `repository` and `"license": "MIT"` in `package.json`.
- Decision 4, code side: remove the `curl` step, `consumer-check/.npmrc`,
  and Gemfury from README, SPEC §9/§11, `docs/architecture/overview.md`,
  the Makefile and `consumer-check/*.js`; a dated SPEC §13 amendment.
- Decision 5: `make consumer-check` installs from npm, checks the
  `resolved` URL and runs `npm audit signatures` (written here, first run
  in T-017).
- Decision 6: README "Installing".
- Decision 3.1–3.2: the owner creates the token and the `NPM_TOKEN`
  secret; `7f3dc30` and the re-run `git diff` go into `docs/journal.md`;
  on the owner's go, `v0.1.0` is moved and pushed.
- `/review` and `/security-review` (publish path, secrets) on the diff.

## Out of scope
- Trusted publisher setup, token revocation, removal of `NODE_AUTH_TOKEN`
  (T-017).
- Revoking the Gemfury tokens and deleting the repo variable/secret: the
  owner's, listed in the handoff.
- Dependabot PR #2 (T-018).

## Spec sections to read
- SPEC.md §8
- SPEC.md §9
- SPEC.md §11
- SPEC.md §13

## Files expected to change
- `.github/workflows/publish.yml`
- `package.json`
- `README.md`, `SPEC.md`, `docs/architecture/overview.md`
- `Makefile` (`consumer-check`)
- `consumer-check/.npmrc` (deleted), `consumer-check/main.js`,
  `consumer-check/check.js`
- `docs/journal.md`

## Acceptance
`git grep -ni fury -- ':!docs' ':!SPEC.md'` empty; SPEC §9/§11 name no
Gemfury and §13 has a dated amendment; `make quality` green; CI green on
the commit to tag; `v0.1.0` moved to it and pushed after the owner's go
(the task ends at the wait for the publish run).

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
