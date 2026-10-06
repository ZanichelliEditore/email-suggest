# T-017 — npm publishing: switch to OIDC, release `0.1.1`, close

- **Type:** build
- **Phase:** owner request (outside SPEC §13)
- **Status:** done (2026-10-06)
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
- `90c763e`: `NODE_AUTH_TOKEN` and its check removed from `publish.yml`
  (RFC Decision 3.4); `package.json`/lockfile `0.1.1`; `consumer-check`
  pinned to `0.1.1`; SPEC §9/§11/§13 and `docs/architecture/overview.md`
  describe OIDC-only; journal (step 3.3).
- Owner step 3.3 (2026-10-06): trusted publisher, disallow tokens, both
  T-016 tokens revoked (owner's word); `NPM_TOKEN` secret gone (observed,
  `gh secret list`).
- `quality.yml` green on `90c763e`:
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37481521141
- Tag `v0.1.1` (annotated, on `90c763e`) pushed at the owner's go. Publish
  run https://github.com/ZanichelliEditore/email-suggest/actions/runs/37482040329:
  attempts 1–2 `E404` on the `PUT` (trusted-publisher config, see Dead
  ends); attempt 3 green, both jobs, `+ @zanichelli/email-suggest@0.1.1`,
  Sigstore `logIndex=3111343852`. First run of T-019's two-job workflow.
- `npm view @zanichelli/email-suggest@0.1.1` answers (`latest` = `0.1.1`);
  `make consumer-check` exit 0: "1 package has a verified attestation",
  `vite build` ok, "consumer-check: suggest() from the npm package passed".
- Reviews: `code-reviewer` full (4 findings, all fixed before commit: both
  T-016 tokens in the acceptance; SPEC §13 amendment version; SPEC/overview
  wording gated on step 3.3; a `publish.yml` comment). No mechanism change,
  so no scoped round. `/security-review` on `90c763e`: no finding; two
  hardening notes parked in `docs/improvements.md`.

## Dead ends
- Attempts 1–2 of the publish run: trusted publisher saved with Repository
  `/email-suggest` and "Allow npm publish" unticked. Fixed by the owner
  (delete and re-add) after reading the screenshots. Journal, 2026-10-06.
- A `gh run rerun --debug` would not have shown the reason: npm's log level
  is its own (`verbose`), not the Actions step debug.

## Open doubts
- The split point ("a red `v0.1.1` run ends the session") was passed at
  the owner's explicit go after the diagnosis; the fix was owner config,
  no code.
- "Disallow tokens" and the revocation of both T-016 tokens are the
  owner's word; the screenshots stop above *Publishing access*.
- RFC Decision 5 still names `0.1.0` for `consumer-check`: accepted RFC,
  left as history.

## Context pressure
ok

## Next action
