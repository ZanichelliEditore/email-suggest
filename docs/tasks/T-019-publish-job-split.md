# T-019 — Split `publish.yml` into a gate job and a publish job

- **Type:** build
- **Phase:** owner request (outside SPEC §13)
- **Status:** done (2026-10-06)
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
- `6e9b0f0`: RFC `2026-10-06-publish-to-npm` amendment (Decision 7),
  accepted by the owner with option A on 2026-10-06; `publish.yml` split
  into `gate` (`contents: read`, uploads `.pack/*.tgz` with
  `include-hidden-files`) and `publish` (`id-token: write` only, no
  checkout, name/version guard, `npm publish ./tarball/*.tgz
  --ignore-scripts`); SPEC §9, `docs/architecture/overview.md`; two parked
  entries closed in `docs/improvements.md`; journal.
- Evidence: pre-commit `actionlint` passed on the new workflow;
  `quality.yml` green on `6e9b0f0`
  (https://github.com/ZanichelliEditore/email-suggest/actions/runs/37477021298),
  no workflow-file error run for `publish.yml`; guard lines taken from the
  workflow pass for `v0.1.0` and exit 1 for `v0.1.1`, two tarballs, none;
  `npm publish ./tarball/<tgz> --dry-run` in the dev container read the
  local tarball (shasum `7523b2cf…`) and stopped at "cannot publish over
  ... 0.1.0".
- Reviews: `rfc-reviewer` full (2 high, 3 low, fixed) and scoped (1
  fail-open → owner chose A; 1 parked); `code-reviewer` full (1 high fixed:
  `tarball/x.tgz` parsed as GitHub shorthand, confirmed with
  `npm-package-arg`; 2 low: 1 fixed, 1 needs no change);
  `/security-review`: no finding at or above confidence 8.

## Dead ends
- `npm publish tarball/x.tgz` (no leading `./`): npm reads it as the
  GitHub repo `tarball/x.tgz`. Caught in review, before any run.

## Open doubts
- The two-job workflow has never run on GitHub; its first run is the next
  release tag. Both jobs fail closed (red gate skips `publish`; a failed
  download or guard stops before `npm publish`).
- The guard catches honest mismatches only, not a crafted tarball (owner
  decision A, RFC Decision 7).
- T-017's PLAN acceptance asks for "publish run for `v0.1.0` green", which
  cannot happen again: `0.1.0` is on npm and any re-run fails with "cannot
  publish over". Needs re-planning before T-017 is taken.

## Context pressure
ok

## Next action
none (done)
