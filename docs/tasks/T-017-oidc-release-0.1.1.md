# T-017 — npm publishing: switch to OIDC, release `0.1.1`, close

- **Type:** build
- **Phase:** owner request (outside SPEC §13)
- **Status:** doing (2026-10-06)
- **Depends on:** T-016, T-019
- **Created:** 2026-10-06

## Goal
OIDC (trusted publishing) is the only way to publish: no npm token exists
in the repo or on npmjs.com, and `0.1.1` is on npm, published by the
two-job `publish.yml` with OIDC alone and a verified provenance attestation.

## In scope
- Owner, on npmjs.com, first (RFC `docs/rfc/active/2026-10-06-publish-to-npm.md`
  Decision 3.3): add the trusted publisher (GitHub Actions,
  `ZanichelliEditore/email-suggest`, workflow `publish.yml`), set
  *Publishing access* to "Require two-factor authentication and disallow
  tokens", revoke both T-016 npm tokens (the first, non-bypass one,
  replaced after the `E403`, and the one in `NPM_TOKEN`), delete the
  `NPM_TOKEN` repo secret.
- `.github/workflows/publish.yml`: remove `NODE_AUTH_TOKEN` and its check
  (Decision 3.4); comments that name the bootstrap or T-017 follow.
- `package.json` (and the lockfile's own version) to `0.1.1`.
- `Makefile` `consumer-check`: pin and `resolved` URL to `0.1.1`.
- Tag `v0.1.1`, pushed only on the owner's explicit go at that moment;
  wait for the publish run; `npm view`; `make consumer-check`.
- SPEC §9 / `docs/architecture/overview.md` only where they still describe
  the bootstrap token.
- `/review` and `/security-review` (publish path, credentials) on the diff.

## Out of scope
- T-018 (Dependabot PR #2).
- Pinning Actions to commit SHAs (`docs/improvements.md`).
- Deleting `0.1.0` from Gemfury; Gemfury token revocation (owner's, carried
  from T-016).
- Any `src/` change: `0.1.1` ships the same library code as `0.1.0`.

## Spec sections to read
- SPEC.md §9

## Files expected to change
- `.github/workflows/publish.yml`
- `package.json`, `package-lock.json`
- `Makefile`
- `SPEC.md` (§9), `docs/architecture/overview.md` (if they name the token)
- `docs/journal.md`

## Acceptance
Owner's RFC step 3.3 done (trusted publisher added, tokens disallowed,
both T-016 npm tokens revoked, `NPM_TOKEN` secret deleted); `NODE_AUTH_TOKEN` gone from
`publish.yml`; `package.json` `version` is `0.1.1`; tag `v0.1.1` pushed
after the owner's explicit go; publish run for `v0.1.1` green (both jobs)
and `npm view @zanichelli/email-suggest@0.1.1` answers; `make
consumer-check` exits 0 against `0.1.1` with `npm audit signatures`
passing; `make quality` green.

Split point: a red `v0.1.1` publish run ends the session at its diagnosis.

---
*Filled at `/handoff`:*

## Done

## Dead ends
none

## Open doubts
none

## Context pressure

## Next action
