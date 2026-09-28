# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-28T14:16:15+02:00`
- **Describes commit:** `<hash>`, pushed to `origin/main`. **CI:**
  `<pending>`.

- **Current task:** T-001 (dev-stack RFC), `done (2026-09-28)`. See
  `docs/tasks/T-001-dev-stack-rfc.md` § Done.

- **Next action:** `/resume`, then T-002 (Docker dev environment),
  `docs/tasks/T-002-docker-dev-env.md`.

- **Read before anything else:**
  - The RFC `docs/rfc/active/2026-09-28-dev-stack.md` is the contract for
    T-002 to T-004: exact pins (TypeScript 7.0.2, vitest 5.0.2, Biome
    2.5.14), committed lockfile, `npm ci` only, `.npmrc` with
    `save-exact` and `ignore-scripts`, no lifecycle or `pre`/`post`
    scripts in `package.json`.
  - Owner chose **Node 24** at acceptance (2026-09-28). Pin:
    `node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1`
    (Node 24.21.0). SPEC §7 and T-002's acceptance now check `v24.`.
  - RFC Decision 4 binds T-002/T-003: their Dependabot `docker` and `npm`
    entries ignore `version-update:semver-major`, minor/patch grouped. Two
    checks for them are in `docs/improvements.md` (digest-refresh grouping
    for T-002; whether the major ignore suppresses security PRs for
    T-003); neither is in their task files.

- **Reviews:** `rfc-reviewer` full round: 0 blockers, 4 should-fix,
  3 nits, all resolved. Scoped round: 1 fail-open (`ignore-scripts` skips
  `pre`/`post` hooks) and 1 false claim, resolved; 1 check handed to
  T-003; 2 nits parked. Node 24 switch after acceptance: version swap
  only, no third round (rule 9). `code-reviewer` on `5d46e69..49d4081`:
  0 blockers, 3 should-fix, 3 nits; all applied in the handoff commit
  except the nit on T-001's own scope line, left as the task as planned.

- **Proposed plan changes:** none.

- **Open doubts:**
  - Repo `ZanichelliEditore/email-suggest` is public; owner said "internal
    use". Confirm intended.
  - Onboarding step 6 (Dependabot security updates) unverified: no `gh`.
    Owner to check Settings → Code security.
  - arm64 unverified: spikes ran on x86_64 only, no emulation on this host.

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality`: ruff "All checks passed!", 2 files
  already formatted, `tools/checks` 5 tests OK, gitleaks (tree) Passed,
  gitleaks (history) Passed. No project tests yet.
