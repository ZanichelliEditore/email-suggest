# T-019 — Split `publish.yml` into a gate job and a publish job

- **Type:** build
- **Phase:** owner request (outside SPEC §13)
- **Status:** doing (2026-10-06)
- **Depends on:** T-016
- **Created:** 2026-10-06

## Goal
Only a job that runs no repo code can request an OIDC token or read the
npm credential: `publish.yml` has a gate job that tests and uploads the
tarball, and a publish job that downloads and publishes it. Lands before
T-017 makes OIDC the only credential.

## In scope
- RFC `docs/rfc/active/2026-10-06-publish-to-npm.md`: a dated amendment
  (Decision 7) for the split and its two new Actions; `rfc-reviewer` on
  it; the owner's acceptance before any workflow change.
- `.github/workflows/publish.yml`: workflow-level `permissions: {}`; job
  `gate` (`contents: read`: tag/version check, `make quality`, upload of
  `.pack/*.tgz`); job `publish` (`needs: gate`, `id-token: write` only, no
  checkout: download, single-tarball guard, `npm publish`), keeping the
  bootstrap `NODE_AUTH_TOKEN` that T-017 removes.
- SPEC §9 and `docs/architecture/overview.md`: the two jobs.
- `/review` and `/security-review` (publish path, credentials) on the diff.

## Out of scope
- T-017's OIDC switch, token removal and `make consumer-check`.
- Pinning Actions to commit SHAs (`docs/improvements.md`, 2026-09-29).
- SPEC §8/§14 nits (`docs/improvements.md`, 2026-10-06).

## Spec sections to read
- SPEC.md §9

## Files expected to change
- `docs/rfc/active/2026-10-06-publish-to-npm.md`
- `.github/workflows/publish.yml`
- `SPEC.md` (§9)
- `docs/architecture/overview.md`
- `docs/improvements.md` (close the two split entries)

## Acceptance
RFC amended and accepted by the owner; in `publish.yml`, `gate` holds only
`contents: read` and uploads `.pack/*.tgz`, `publish` alone holds
`id-token: write` and `secrets.NPM_TOKEN` and has no `actions/checkout`;
`make quality` green; `quality.yml` green on the pushed commit and no
"workflow file" error run for `publish.yml`.

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
