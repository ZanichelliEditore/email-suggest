# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-28T17:03:57+02:00`
- **Describes commit:** `<hash>`, pushed to `origin/main`. **CI:**
  `<pending>`

- **Current task:** T-002 (Docker dev environment), `done (2026-09-28)`.
  See `docs/tasks/T-002-docker-dev-env.md` § Done.

- **Next action:** `/resume`, then T-003 (JS toolchain; Biome in the gate
  and the pre-commit hook), `docs/tasks/T-003-js-toolchain-biome.md`.

- **Read before anything else:**
  - Every JS step runs through `docker compose run --rm dev …` (SPEC §7).
    The container runs as the host UID:GID: the Makefile exports
    `HOST_UID`/`HOST_GID` globally, and `compose.yaml` falls back to 1000.
    Why: `docs/journal.md` 2026-09-28 (T-002).
  - `HOME=/tmp` in the image and `--rm` on every run: npm's cache does not
    survive a run. T-003 decides whether `npm ci` needs a cache volume.
  - `node_modules` lives in the named volume `email-suggest_node_modules`.
    The empty root-owned `./node_modules/` on the host is Docker's mount
    point and is gitignored.
  - T-003 must add the `npm` Dependabot entry the same way as `docker`
    (`.github/dependabot.yml`: ignore semver-major, one group with no
    `update-types` filter), and settle `docs/improvements.md`'s entry on
    whether the major ignore suppresses security PRs.

- **Reviews:** `code-reviewer`, one full round on the T-002 diff:
  0 blockers, 2 should-fix, 3 nits. Applied: the run-user decision is
  recorded (journal and task file); the improvements digest-grouping entry
  is closed; the Dependabot comment now says "digest refreshes only".
  Handed to T-003: the npm cache nit. Dismissed: the Makefile global
  `export` nit (intended, T-003's targets need it). Every fix changed
  wording only, not a mechanism, so no scoped round (rule 9).

- **Proposed plan changes:** none.

- **Open doubts:**
  - Dependabot `docker` grouping is reasoned, not observed: the first
    weekly run confirms it.
  - Carried from T-001: the repo is public although the owner said
    "internal use"; Dependabot security updates are unverified (no `gh`);
    arm64 is unverified (x86_64 host only).

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality`: ruff "All checks passed!", 2 files
  already formatted, `tools/checks` 5 tests OK, gitleaks (tree) Passed,
  gitleaks (history) Passed. T-002 acceptance by hand:
  `docker compose run --rm -T dev node --version` printed `v24.21.0`.
