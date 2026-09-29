# T-014 — Diagnose and fix the failed Gemfury upload of `v0.1.0`

- **Type:** build
- **Phase:** 2
- **Status:** done (2026-09-29)
- **Depends on:** T-012
- **Created:** 2026-09-29 (raised `proposed` at T-012's handoff; owner
  confirmed it at `/resume`, 2026-09-29)

## Goal
`0.1.0` is on Gemfury, published by the `v0.1.0` publish run.

## In scope
- Read the failed upload step's log before any re-run or retag.
- Fix the cause; re-run the failed run if the fix needs no workflow change.
- Owner addition (2026-09-29): `GEMFURY_ACCOUNT` becomes a repo variable,
  not a secret, so the log stops masking the package scope (SPEC §9).

## Out of scope
- Printing Gemfury's error body on a failed upload: parked
  (`docs/improvements.md`, `publish.yml` bash `-e` entry).
- T-013's consumer check.

## Spec sections to read
- SPEC.md §9

## Files expected to change
- `.github/workflows/publish.yml`, SPEC §9, `docs/architecture/overview.md`
- `docs/journal.md`, `docs/tasks/PLAN.md`

## Acceptance
Publish run for `v0.1.0` (re-run or new tag) green, and `0.1.0` listed on
Gemfury; `make quality` green.

---
*Filled at `/handoff`:*

## Done
- Cause: HTTP 403 from `push.fury.io` (`curl: (22)`), from a wrong
  account slug in `GEMFURY_ACCOUNT` (personal instead of organization).
  Owner fixed the slug; `gh run rerun 36601141874 --failed` green, upload
  step printed `...-email-suggest-0.1.0.tgz ... ok`:
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36601141874
- Owner confirmed `0.1.0` on the organization's Gemfury package list
  (2026-09-29).
- Owner addition: `publish.yml` reads `vars.GEMFURY_ACCOUNT`; SPEC §9 and
  `docs/architecture/overview.md` amended. Repo variable
  `GEMFURY_ACCOUNT` set, secret `GEMFURY_ACCOUNT` deleted (`gh variable
  list`, `gh secret list`: secrets `GEMFURY_PUSH_TOKEN`,
  `GITLEAKS_LICENSE` only). Commit `T-014: account as repo variable;
  handoff` (hash in `docs/HANDOFF.md`).
- `make quality` green before and after.

## Dead ends
- Suspected Gemfury wants `USER:TOKEN` auth (current docs show
  `https://USER:TOKEN@push.fury.io/ACCOUNT/`): wrong, the token-as-user
  form worked once the slug was right.

## Open doubts
- `vars.GEMFURY_ACCOUNT` path never ran: the green run was a re-run, which
  uses the tagged commit's workflow (secret). First real test is the next
  tag. With the secret deleted, run 36601141874 can no longer be re-run.

## Context pressure
low

## Next action
none (done).
