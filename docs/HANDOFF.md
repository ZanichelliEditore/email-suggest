# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T17:04:57+02:00`
- **Describes commit:** `527b150`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36587515575
  (jobs `quality` and `checks` both success; observed with `gh run watch`).

- **Current task:** T-010 (`docs/tasks/T-010-ci-make-quality.md`),
  `done (2026-09-29)`.
  - `405bb34`: `quality.yml`'s `quality` job runs `make quality` as its one
    gate step, with `fetch-depth: 0`; the `checks` job is unchanged.
  - CI run for `405bb34`:
    https://github.com/ZanichelliEditore/email-suggest/actions/runs/36587270115
    green (jobs `quality` and `checks`). Its log shows the full gate:
    - Biome and ruff clean;
    - `tools/checks` 5 tests;
    - vitest 59 tests;
    - pack-smoke passing;
    - both gitleaks scans passing.

- **Next action:** `/resume`, then take T-011
  (`docs/tasks/T-011-publish-workflow.md`). Its entry condition, "T-010's CI run is
  green", is met by run 36587270115 above.

- **Read before anything else:**
  - The owner decisions in PLAN.md § Phase 2 re-plan note still apply.
  - Owner actions outside the repo:
    - Before T-012: the repo variable `GEMFURY_ACCOUNT` and the secret
      `GEMFURY_PUSH_TOKEN`.
    - At T-012: an explicit go for the tag push.
    - Before T-013: a Gemfury read token and the account slug in the
      gitignored `.env`.
  - `quality.yml` is a managed file: an `agent-native-setup update` may
    restore the ruff-only job (`docs/journal.md`, 2026-09-29, T-010).

- **Reviews:** one full `code-reviewer` round: 0 blockers, 2 should-fix,
  3 nits.
  - Should-fix 1, applied: the old CI item in `docs/improvements.md` is
    struck as resolved by T-010.
  - Should-fix 2, applied: `docs/journal.md` warns that an update may undo
    the change.
  - Nit 1, applied: the `fetch-depth` comment is reworded.
  - Nit 2, parked: unpinned `pipx install ruff` (`docs/improvements.md`).
  - Nit 3, dismissed: the dev-stack RFC (lines 143-145) is worded
    conditionally, so it stands as a point-in-time record.
  - Docs and a comment only, no mechanism change, so no scoped round.
  - `/security-review` was not run. The diff changes the CI steps only: no
    new secret, permission or trigger, and it runs the repo's own gate.

- **Proposed plan changes:** none.

- **Open doubts:**
  - New: the unpinned ruff in CI versus pre-commit's pin v0.15.17
    (parked).
  - Resolved: the gate running as a user other than 1000 (CI runner, run
    36587270115).
  - Carried:
    - A boxed `new String(...)` returns `null`; no test covers it.
    - The no-Node demo shims `/usr/bin`, and `/usr/local/bin/node` also
      exists on this host. `make quality-no-node` stays parked.
    - Dependabot `docker`/`npm` grouping is reasoned, not observed.
    - The repo is public, although the owner said "internal use".
    - arm64 is unverified.
    - The first secret-scanning history scan (enabled 2026-09-29) hasn't
      been re-checked.
    - Whether Gemfury allows deleting a published version is unverified
      (matters for T-012).

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality` exit 0:
  - Biome check "Checked 15 files … No fixes applied." and ruff "All
    checks passed!";
  - Biome format "Checked 15 files … No fixes applied.";
  - `tools/checks` "Ran 5 tests … OK";
  - vitest: 4 files passed, 59 tests passed;
  - pack-smoke: npm pack reports 11 files, then "pack-smoke: import, call
    and consumer typecheck passed";
  - gitleaks (tree) and gitleaks (history) Passed.
