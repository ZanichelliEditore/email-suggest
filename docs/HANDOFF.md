# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T12:27:26+02:00`
- **Describes commit:** `4da9193`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36555738896
  (jobs `quality` and `checks` both success; observed via the public
  Actions API, no `gh`). CI does not run tsc or vitest (see below).

- **Current task:** T-004 (`distance.ts`; typecheck, vitest and
  `make build` join the gate), `done (2026-09-29)`. See
  `docs/tasks/T-004-distance.md` § Done.

- **Next action:** `/resume`, then T-005 (known-domain list, with its
  guards), `docs/tasks/T-005-domains.md`. T-006 is also unblocked; PLAN
  order takes T-005 first.

- **Read before anything else:**
  - New targets: `make typecheck` (`tsconfig.json`, `src/` + `test/`, no
    emit), `make build` (`tsconfig.build.json`, `src/` only, `rm -rf dist`
    first), `make test` now runs vitest too. All via
    `$(DEV) node_modules/.bin/<tool>` (`Makefile`, `TSC`/`VITEST`).
  - Tests import sources as `../src/<name>.js` (NodeNext); vitest maps it
    to the `.ts`.
  - `tsconfig.build.json` needs `rootDir: "src"`: without it tsc 7 errors
    TS5011 and emits into `dist/src/` (`docs/journal.md` 2026-09-29).
  - CI (`quality.yml`) runs neither Biome, tsc nor vitest; only local
    `make quality` does, until Phase 2.

- **Reviews:** `code-reviewer`, full round on the T-004 diff: 0 blockers,
  2 should-fix (test table did not pin substitution cost or a swap at
  position 1; both confirmed by mutation probe and fixed with rows
  `gmail.cim`/`gmail.com` and `ab`/`ba`), 4 nits: README tool list fixed,
  task status dated, RFC `Implemented` ticked, missing `files` in
  `package.json` parked in `docs/improvements.md`. No scoped round: the
  fixes added test rows only, no mechanism change.

- **Proposed plan changes:** none.

- **Open doubts:**
  - Carried: whether repo security updates are enabled is unverified (no
    `gh`); Dependabot `docker`/`npm` grouping reasoned, not observed; repo
    is public although the owner said "internal use"; arm64 unverified.

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality`: Biome check "Checked 6 files … No fixes
  applied.", ruff "All checks passed!", 2 files already formatted, Biome
  format "Checked 6 files … No fixes applied.", tsc typecheck exit 0,
  `tools/checks` 5 tests OK, vitest `test/distance.test.ts` 9 passed (9),
  gitleaks (tree) Passed, gitleaks (history) Passed. `make build`: only
  `dist/distance.js` + `dist/distance.d.ts`.
