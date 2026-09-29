# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T11:29:38+02:00`
- **Describes commit:** `37fae0e`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36549576024
  (jobs `quality` and `checks` both success; observed via the public
  Actions API, no `gh`). Dependabot's first `npm_and_yarn` update job, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36549584074,
  succeeded and opened no PR (0 open PRs; the pins are current).

- **Current task:** T-003 (JS toolchain; Biome in the gate and the
  pre-commit hook), `done (2026-09-29)`. See
  `docs/tasks/T-003-js-toolchain-biome.md` § Done.

- **Next action:** `/resume`, then T-004 (`distance.ts`; typecheck, vitest
  and `make build` join the gate), `docs/tasks/T-004-distance.md`.

- **Read before anything else:**
  - JS tools run as `$(DEV) node_modules/.bin/<tool>` (see `BIOME`),
    never `npx <tool>`: `docs/journal.md` 2026-09-29. T-004's `tsc` and
    vitest targets follow the same pattern and depend on `make deps`.
  - `make deps` reinstalls only when `DEPS_INPUTS` (`Makefile`) change; a
    `Dockerfile` change still needs a manual `docker compose build`
    (`docs/improvements.md`).
  - `make biome` passes `--error-on-warnings`: Biome exits 0 on warnings.
  - CI (`quality.yml`) does not run Biome; only local `make quality` and
    the hook do, until Phase 2 moves CI onto `make quality`.

- **Reviews:** `code-reviewer`, full round on the T-003 diff: 0 blockers,
  2 should-fix (both confirmed by probe and fixed: `npx biome` would fetch
  npm's unrelated `biome` package; warnings exited 0), 6 nits applied.
  Scoped round on the mechanism fixes (binary path, `--error-on-warnings`,
  stamp inputs, hook `files`/`stages`): nothing falsifies an acceptance
  line or fails open; 4 items parked in `docs/improvements.md`
  (2026-09-29).

- **Proposed plan changes:** none.

- **Open doubts:**
  - Dependabot `ignore` also covering security updates is documented, not
    observed; whether security updates are enabled in repo settings is
    unverified (no `gh`).
  - Carried: Dependabot `docker`/`npm` grouping reasoned, not observed;
    the repo is public although the owner said "internal use"; arm64
    unverified (x86_64 host only).

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality`: Biome check "Checked 2 files … No fixes
  applied.", ruff "All checks passed!", 2 files already formatted, Biome
  format "Checked 2 files … No fixes applied.", `tools/checks` 5 tests OK,
  gitleaks (tree) Passed, gitleaks (history) Passed.
  `pre-commit run biome --all-files` Passed.
