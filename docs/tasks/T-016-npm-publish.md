# T-016 — npm publishing: workflow, Gemfury removal, `0.1.0` bootstrap

- **Type:** build
- **Phase:** owner request (outside SPEC §13)
- **Status:** done (2026-10-06)
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
- `beafb90`: RFC Decisions 1, 2, 4 (code), 5, 6 and the journal part of
  3.2. `publish.yml` publishes `.pack/*.tgz` with `npm publish --access
  public --provenance` (setup-node@v7, `id-token: write`, bootstrap
  `NODE_AUTH_TOKEN` with a missing-secret guard); `package.json` gains
  `license` and `repository`; `consumer-check/.npmrc` deleted; Gemfury gone
  from README, SPEC §9/§11 (§13 amendment dated 2026-10-06), overview,
  Makefile, `consumer-check/*.js`. `git grep -ni fury -- ':!docs'
  ':!SPEC.md'` empty.
- `make consumer-check` now requires `npm audit signatures` to report a
  verified attestation: checked by hand in the dev container, semver@7.8.5
  passes, semver@5.7.1 (no provenance) fails with "has no verified
  provenance attestation". Against npm before the publish it failed closed
  with a 404 (expected). First real run: T-017.
- CI green on `beafb90`: run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37472697582.
- `v0.1.0` moved from `7f3dc30` (tag object `abdb05d`) to `beafb90` (tag
  object `1eb4679`) on the owner's go. Publish run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37472987047:
  attempt 1 `E403` (token without 2FA bypass, nothing published), attempt 2
  green after the owner replaced `NPM_TOKEN`. Registry: `0.1.0` `latest`,
  `MIT`, repository URL, `dist.attestations` present, shasum `7523b2c…`
  equal to the run's packed tarball.
- Reviews: `code-reviewer` 0 high, 2 medium, 4 low. Fixed: attestation
  check, token guard, anchored lockfile grep. Closed by check: setup-node
  `v7` ref exists. Parked in `docs/improvements.md`: job-wide `id-token`
  (split the job before T-017), SPEC §8/§14 nits. `/security-review`: no
  finding at or above the bar.

## Dead ends
- Bootstrap token without "bypass 2FA" (owner said the org did not require
  it): `E403` at the `PUT`. Fixed by a new token with the bypass, then
  `gh run rerun`.

## Open doubts
- npm warned that 2FA-bypass tokens "are being restricted for ... direct
  publishing" (gh.io/npm-gat-bypass2fa-deprecation). It worked on
  2026-10-06; nothing after T-017 should depend on such a token.
- `id-token: write` covers the gate's unpinned `pipx` installs and
  pre-commit hooks; the security review adds that the dev container can
  write the project `.npmrc` that `npm publish` then reads. Both close with
  the parked two-job split, which should land before T-017 drops the token
  (owner decision or RFC amendment).
- The owner's revocations: first npm token (no bypass), Gemfury tokens,
  `GEMFURY_*` repo secret/variable, `.env` Gemfury entries. Not observed.

## Context pressure
ok

## Next action
none (done)
