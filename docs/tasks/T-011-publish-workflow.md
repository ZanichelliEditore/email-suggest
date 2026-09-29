# T-011 — Publish workflow; README consumer docs

- **Type:** build
- **Phase:** 2
- **Status:** doing (2026-09-29)
- **Depends on:** T-010
- **Created:** 2026-09-29

## Goal
A tag matching `v*.*.*` publishes the package to Gemfury from CI (§9), and
the README tells consumers how to install it.

## In scope
- First step: `gh run list` shows T-010's `quality` run green. If red, see
  the split point below.
- `.github/workflows/publish.yml`, on `v*.*.*` tags only: fail unless the
  tag minus `v` equals `package.json` `version`; `make quality`; build;
  publish the smoke-tested tarball inside the container. Registry URL from
  `vars.GEMFURY_ACCOUNT`, token from `secrets.GEMFURY_PUSH_TOKEN`, via an
  npmrc under `/tmp`, never the bind-mounted repo. Check Gemfury's push
  URL against its docs. The checkout needs `fetch-depth: 0`: `make quality`
  runs `gitleaks-history`.
  - *Superseded 2026-09-29 by owner decision (SPEC §9 amended):* the
    upload is `curl` to `https://push.fury.io/<account>/` from the runner,
    not `npm publish` in the container (Gemfury documents push tokens only
    for that endpoint; the dev image has no curl), with no npmrc; the
    account is `secrets.GEMFURY_ACCOUNT`, not a variable.
- The tag/version check may be a `tools/checks` script with its unittest.
- README: consumer `.npmrc` scope line with the `<account>` placeholder,
  and where to get a read token.
- No `make publish` target: only CI publishes (§9).

## Out of scope
- Pushing a tag (T-012). Setting the two secrets (owner).

## Spec sections to read
- SPEC.md §9
- SPEC.md §6
- SPEC.md §8

## Files expected to change
- `.github/workflows/publish.yml`
- `README.md`
- maybe `tools/checks/` (tag/version check and its test)
- maybe `compose.yaml` (passing the token into the container)
- `docs/architecture/overview.md` (the publish job)

## Acceptance
T-010's CI run green on entry; `publish.yml` triggers only on `v*.*.*`
and runs tag/version check, `make quality`, build, publish; every
`fury.io` hit in tracked files uses `<account>` or `secrets.GEMFURY_ACCOUNT`; `make quality` green; pushed. The task ends
at the owner setting `GEMFURY_ACCOUNT` and `GEMFURY_PUSH_TOKEN`.

**Split point:** if T-010's CI run is red on entry, fixing it is this
session's whole work (T-010's leftover): push the fix, end the session at
that wait, and the publish workflow moves to the next session.

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
