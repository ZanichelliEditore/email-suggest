# T-011 — Publish workflow; README consumer docs

- **Type:** build
- **Phase:** 2
- **Status:** done (2026-09-29)
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
- `584a650`: `.github/workflows/publish.yml` (tag check → `make quality`
  → curl upload of `.pack/*.tgz`, non-2xx fails);
  `tools/checks/check_tag_version.py` with
  `tools/checks/test_check_tag_version.py` (12 tests, e.g.
  `Mismatch::test_suffix_after_version_fails`); `make pack-smoke` keeps its
  tarball in `.pack/`; README consumer install; SPEC §9 amended (curl
  upload, account as secret).
- CI for `584a650` green:
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36590272213
- Upload step checked by hand against a local stub server (not
  in the gate: it needs a live HTTP endpoint): token arrives as the
  basic-auth user; 200 → exit 0, 302 → exit 1, 404 → curl exit 22; missing
  secret or tarball → exit 1.
- Owner set secrets `GEMFURY_ACCOUNT` and `GEMFURY_PUSH_TOKEN`
  (`gh secret list`, 2026-09-29T16:48Z).

## Dead ends
- `npm publish` with an npmrc under `/tmp` in the container (the task's
  plan): Gemfury documents push tokens only for `push.fury.io`, and the
  dev image has no curl, so the upload runs on the runner (owner
  decision, SPEC §9).

## Open doubts
- The upload has never hit the real Gemfury: first proof is T-012's tag.
- Whether the token pasted in chat on 2026-09-29 was rotated before
  `GEMFURY_PUSH_TOKEN` was set: not confirmed.
- The owner's Gemfury account looks personal, while SPEC §9 says
  "Zanichelli's Gemfury": not settled.

## Context pressure
ok

## Next action
none (done).
