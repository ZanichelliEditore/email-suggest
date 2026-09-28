# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-28T12:33:12+02:00`
- **Describes commit:** `<hash>`, pushed to `origin/main`. **CI:**
  `<pending>`.

- **Current task:** `T-000` Project design (SPEC) and onboarding,
  `done (2026-09-28)`. See `docs/tasks/T-000-design-and-onboarding.md`.

- **Next action:** `/plan Phase 1` (SPEC.md §13). There is no `todo` task
  yet: PLAN.md's Phase 1 still holds the `T-NNN` placeholder row.

- **Read before anything else:**
  - The owner may rename the directory `~/Workspace/toy` →
    `~/Workspace/email-suggest` between sessions; nothing in the repo
    depends on the path.
  - Phase 1's first task must be the stack RFC (SPEC §6, §12): no
    `package.json` or dev dependency before it is Active.
  - Two §4 trade-offs await the owner's call before Phase 1 code (see
    Open doubts); `/plan` should surface them.
  - `.github/workflows/quality.yml` carries a local edit (`fd14a91`) to a
    managed file; an `agent-native-setup update` may drop it
    (`docs/journal.md`, 2026-09-28).

- **Reviews:** `code-reviewer`, one full round on `ffdd7ef..HEAD`: 0
  blockers, 9 should-fix, 10 nits. All SPEC should-fix and nits applied in
  the handoff commit, except #9 (foreign ccTLD → `.it`), parked as an owner
  decision. Only mechanism change: the single-label guard in §4 step 2,
  checked with the `x@con` row; no scoped round run. Dependabot-secret
  finding is an owner action (below).

- **Proposed plan changes:** none.

- **Open doubts:**
  - §4: `gmail.it` / `gmail.ti` → `email.it`; `yahoo.fr` → `yahoo.it`
    (and other foreign ccTLDs of listed `.it` providers). Keep as
    documented trade-offs, or add a rule?
  - Repo `ZanichelliEditore/email-suggest` is public; owner said "internal
    use". Confirm intended.
  - Onboarding step 6 (Dependabot security updates) unverified: no `gh`.
    On by default for public repos; owner to check Settings → Code security.
  - Dependabot PR #1 red on gitleaks until `GITLEAKS_LICENSE` is also a
    Dependabot secret; then `@dependabot rebase`.

- **Dead ends:** adding the `GITLEAKS_LICENSE` secret without mapping it
  into the step's `env` (run 36408753886 stayed red).

- **Known red:** none locally. Dependabot PR #1 CI red (see Open doubts);
  not on `main`.

- **Checkpoint:** `make quality`: ruff "All checks passed!", 2 files
  already formatted, `tools/checks` 5 tests OK, gitleaks (tree) Passed,
  gitleaks (history) Passed. No project tests yet.
