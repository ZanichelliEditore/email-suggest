# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-28T12:57:41+02:00`
- **Describes commit:** `<pending>`. **CI:** `<pending>`.

- **Current task:** none. This session ran `/plan Phase 1`: T-001–T-007
  written, `todo`, approved by the owner 2026-09-28. See the re-plan note
  in `docs/tasks/PLAN.md` § Phase 1.

- **Next action:** `/resume`, then T-001 (dev-stack RFC),
  `docs/tasks/T-001-dev-stack-rfc.md`.

- **Read before anything else:**
  - SPEC §4 step 1.2 is new (owner decision at plan review, 2026-09-28):
    same name on a TLD ≥2 edits away → `null` (`gmail.it`, `yahoo.fr`);
    1 edit away → corrected (`gmail.co`, `libero.ot`). §10 gained 12 rows.
    All 34 rows were checked against a scratch Python model of §4
    (not committed; T-007's vitest table is the real proof).
  - No `package.json` or dev dependency before T-001's RFC is Active.
  - `.github/workflows/quality.yml` carries a local edit (`fd14a91`) to a
    managed file; an `agent-native-setup update` may drop it
    (`docs/journal.md`, 2026-09-28).

- **Reviews:** `code-reviewer`, full round on the plan + SPEC diff: 1
  blocker (the first step 1.2 draft silenced `libero.ot`/`gmail.cm`),
  7 should-fix, 7 nits; blocker fixed by the owner-approved ≥2-edit rule,
  all should-fix and nits applied. Scoped round on step 1.2: 0 row
  contradictions, 1 ambiguity (empty last label, `x@proton.`), fixed by
  wording plus a §10 row; wording only, no mechanism change, so no third
  round.

- **Proposed plan changes:** none.

- **Open doubts:**
  - Repo `ZanichelliEditore/email-suggest` is public; owner said "internal
    use". Confirm intended.
  - Onboarding step 6 (Dependabot security updates) unverified: no `gh`.
    Owner to check Settings → Code security.
  - Dependabot PR #1 red on gitleaks until `GITLEAKS_LICENSE` is also a
    Dependabot secret; then `@dependabot rebase`.

- **Dead ends:** step 1.2 as "two-letter last label, `co` exempt"
  (adopted, then replaced: it silenced 1-edit typos like `libero.ot`).

- **Known red:** none locally. Dependabot PR #1 CI red (see Open doubts);
  not on `main`.

- **Checkpoint:** `make quality`: ruff "All checks passed!", 2 files
  already formatted, `tools/checks` 5 tests OK, gitleaks (tree) Passed,
  gitleaks (history) Passed. No project tests yet.
