# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T19:12:58+02:00`
- **Describes commit:** `55598fe`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36603435083
  (jobs `quality` and `checks` both success; observed with `gh run watch`).

- **Current task:** T-014 (`docs/tasks/T-014-gemfury-upload-fix.md`),
  `done (2026-09-29)`.
  - Publish run for `v0.1.0` green on re-run (attempt 2); Gemfury printed
    `... 0.1.0.tgz ... ok`; owner saw `0.1.0` on the org package list:
    https://github.com/ZanichelliEditore/email-suggest/actions/runs/36601141874
  - Cause: wrong account slug (personal, not organization). No workflow
    change was needed for the upload itself.
  - Owner addition: `GEMFURY_ACCOUNT` is now a repo **variable**
    (`vars.`), not a secret; SPEC §9 amended.

- **Next action:** `/resume`; take T-013 (`todo`, depends on T-012 done).
  Before starting, ask the owner for the Gemfury read (deploy) token and
  the account slug in the gitignored `.env`.

- **Read before anything else:**
  - The upload is `curl` to `push.fury.io`; the account is
    `vars.GEMFURY_ACCOUNT`, the token `secrets.GEMFURY_PUSH_TOKEN`
    (SPEC §9, owner decision 2026-09-29, T-014).
  - T-013's first acceptance line (publish run for `v0.1.0` green) now
    holds.
  - A re-run uses the tagged commit's workflow file, not `main`'s
    (`docs/journal.md`, 2026-09-29, T-014).
  - `quality.yml` is managed: an update may restore the ruff-only job
    (`docs/journal.md`, 2026-09-29, T-010).

- **Reviews:** `/review` (code-reviewer) on the T-014 diff: 5 findings.
  SPEC §9 "never written in tracked files" false: reworded on the owner's
  go. `vars.` path untested: recorded as an open doubt. HANDOFF stale
  secret line: fixed by this rewrite. T-011 acceptance names
  `secrets.GEMFURY_ACCOUNT`: dismissed, historical record; PLAN note
  records the reversal. Task-file list and PLAN wrap: fixed.

- **Proposed plan changes:** none.

- **Open doubts:**
  - New: `vars.GEMFURY_ACCOUNT` has never run; first test is the next
    tag. With the secret deleted, run 36601141874 can't be re-run.
  - Carried:
    - Gemfury's error body is not printed on a failed upload (parked,
      `docs/improvements.md`, `publish.yml` bash `-e`).
    - Whether Gemfury allows deleting a published version is unverified.
    - Rotation of the token pasted in chat on 2026-09-29: not confirmed.
    - The unpinned ruff in CI versus pre-commit's pin v0.15.17 (parked).
    - A boxed `new String(...)` returns `null`; no test covers it.
    - The no-Node demo shims `/usr/bin`, and `/usr/local/bin/node` also
      exists on this host. `make quality-no-node` stays parked.
    - Dependabot `docker`/`npm` grouping is reasoned, not observed.
    - The repo is public, although the owner said "internal use".
    - arm64 is unverified.
    - The first secret-scanning history scan (enabled 2026-09-29) hasn't
      been re-checked.

- **Dead ends:** Gemfury `USER:TOKEN` auth hypothesis: wrong, the
  token-as-user form works (T-014 task file).

- **Known red:** none.

- **Checkpoint:** `make quality` exit 0:
  - Biome check "Checked 15 files … No fixes applied." and ruff "All
    checks passed!";
  - Biome format "Checked 15 files … No fixes applied.";
  - `tools/checks` "Ran 17 tests … OK";
  - vitest: 4 files passed, 59 tests passed;
  - pack-smoke: npm pack reports 11 files, then "pack-smoke: import, call
    and consumer typecheck passed";
  - gitleaks (tree) and gitleaks (history) Passed.
