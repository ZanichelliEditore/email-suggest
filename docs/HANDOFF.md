# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T16:00:22+02:00`
- **Describes commit:** `cd0e16a`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36579430330
  (jobs `quality` and `checks` both success; observed with `gh run view`).

- **Current task:** `/plan Phase 2` (a plan session with no PLAN row),
  `done (2026-09-29)`. Phase 2 is planned: T-008 to T-013 are `todo` in
  `docs/tasks/PLAN.md` § Phase 2, each with its task file. The owner
  approved the plan on 2026-09-29, and the re-plan note records the
  owner's decisions.

- **Next action:** `/resume`, then take T-008
  (`docs/tasks/T-008-non-string-input.md`).

- **Read before anything else:**
  - Owner decisions (PLAN.md § Phase 2 re-plan note):
    - T-008: no RFC, and `email: string` stays in the `.d.ts`.
    - T-013: Vite is the lockfile-pinned `node_modules/.bin/vite` (confirmed
      present). It comes in through vitest, so it isn't a new dependency.
    - `consumer-check` is a make target outside `quality`.
    - A wait on a green CI run ends the task.
  - Split points drawn: T-009, T-011 (a red T-010 run on entry is the
    whole session), T-013 (the phase close becomes T-014).
  - Owner actions outside the repo:
    - Before T-012: the repo variable `GEMFURY_ACCOUNT` and the secret
      `GEMFURY_PUSH_TOKEN`.
    - At T-012: an explicit go for the tag push.
    - Before T-013: a Gemfury read token and the account slug in the
      gitignored `.env`.

- **Reviews:** `planner` proposed the decomposition. One `code-reviewer`
  round on the plan diff: 0 blockers, 4 should-fix, 3 nits, all applied.
  - Should-fix:
    - T-011 split point.
    - The `fury.io` placeholder grep replaces the unrunnable "grep the real
      account name".
    - T-013 `.env` needs the account slug.
    - T-011 files gain `overview.md`, `compose.yaml` and `fetch-depth: 0`.
  - Nits:
    - T-012 version-bump branch.
    - T-013 row's findings clause.
    - The T-014 split carries the findings clause.

- **Proposed plan changes:** none.

- **Open doubts:**
  - Carried from T-007: the no-Node demo shims `/usr/bin`, but this host
    also has `/usr/local/bin/node`. `command -v node` stays non-empty after
    stripping nvm from `PATH` (seen at `/resume` on 2026-09-29).
    `make quality-no-node` stays parked.
  - Carried:
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
  - Biome check "Checked 12 files … No fixes applied." and ruff "All
    checks passed!";
  - 2 files already formatted; Biome format "Checked 12 files … No fixes
    applied.";
  - tsc exit 0;
  - `tools/checks`: 5 tests OK;
  - vitest: 4 files passed, 55 tests passed (`suggest` 43, `distance` 9,
    `domains` 2, `tld-typos` 1);
  - gitleaks (tree) and gitleaks (history) Passed.
