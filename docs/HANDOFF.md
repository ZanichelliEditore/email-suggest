# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T18:55:36+02:00`
- **Describes commit:** `3bb8175`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36601311183
  (jobs `quality` and `checks` both success; observed with `gh run watch`).

- **Current task:** T-012 (`docs/tasks/T-012-release-0.1.0.md`),
  `done (2026-09-29)`.
  - Annotated tag `v0.1.0` on `7f3dc30` pushed on the owner's go
    (2026-09-29). CI on `7f3dc30` green:
    https://github.com/ZanichelliEditore/email-suggest/actions/runs/36600709140
  - Publish run **failed** at step `upload to Gemfury` (seen
    2026-09-29 with `gh run view --json jobs`; log not read):
    https://github.com/ZanichelliEditore/email-suggest/actions/runs/36601141874

- **Next action:** `/resume`; owner decides on proposed row T-014 (fix
  the upload) before T-013. Its first step: `gh run view 36601141874
  --log-failed`, and check whether `0.1.0` reached Gemfury anyway.

- **Read before anything else:**
  - The upload is `curl` to `push.fury.io` and `GEMFURY_ACCOUNT` is a
    secret (owner decisions 2026-09-29, SPEC §9).
  - T-013 needs a Gemfury read (deploy) token and the account slug in the
    gitignored `.env`: ask the owner before starting.
  - The publish run is red: `0.1.0` may or may not be on Gemfury. Read
    the upload step's log before any re-run or retag; a re-run of the same
    run re-uploads the same tarball.
  - `quality.yml` is managed: an update may restore the ruff-only job
    (`docs/journal.md`, 2026-09-29, T-010).

- **Reviews:** `/review` dismissed: no diff since the task started (only
  a tag, and this handoff's doc edits).

- **Proposed plan changes:**
  - T-014 (`proposed`, PLAN.md): diagnose and fix the failed Gemfury
    upload of `v0.1.0`. T-013's first acceptance line ("publish run for
    `v0.1.0` green") cannot hold until then; T-014 should run first.

- **Open doubts:**
  - New: why the upload failed (token, account slug, endpoint, or the
    2xx check): not investigated.
  - Carried:
    - Whether Gemfury allows deleting a published version is unverified.
    - Rotation of the token pasted in chat on 2026-09-29: not confirmed.
    - The Gemfury account looks personal; SPEC §9 says "Zanichelli's".
    - The unpinned ruff in CI versus pre-commit's pin v0.15.17 (parked).
    - A boxed `new String(...)` returns `null`; no test covers it.
    - The no-Node demo shims `/usr/bin`, and `/usr/local/bin/node` also
      exists on this host. `make quality-no-node` stays parked.
    - Dependabot `docker`/`npm` grouping is reasoned, not observed.
    - The repo is public, although the owner said "internal use".
    - arm64 is unverified.
    - The first secret-scanning history scan (enabled 2026-09-29) hasn't
      been re-checked.

- **Dead ends:** none.

- **Known red:** `make quality` and `quality.yml` green. `publish.yml`
  run `36601141874` for tag `v0.1.0`: red, step `upload to Gemfury`;
  cause unknown (proposed T-014).

- **Checkpoint:** `make quality` exit 0:
  - Biome check "Checked 15 files … No fixes applied." and ruff "All
    checks passed!";
  - Biome format "Checked 15 files … No fixes applied.";
  - `tools/checks` "Ran 17 tests … OK";
  - vitest: 4 files passed, 59 tests passed;
  - pack-smoke: npm pack reports 11 files, then "pack-smoke: import, call
    and consumer typecheck passed";
  - gitleaks (tree) and gitleaks (history) Passed.
