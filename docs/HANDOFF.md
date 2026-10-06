# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-10-06T15:15:41+02:00`
- **Describes commit:** `<hash>`, pushed to `origin/main`. **CI:** `<run>`.

- **Current task:** RFC `docs/rfc/active/2026-10-06-publish-to-npm.md`
  (owner request at `/resume`; no PLAN row of its own, it precedes T-016),
  `done (2026-10-06)`: written, one `rfc-reviewer` round, accepted by the
  owner with the `v0.1.0` tag move (`a287128`).

- **Next action:** `/resume`, then T-016 (`docs/tasks/T-016-npm-publish.md`,
  `todo (2026-10-06)`). Before its step 3.1, ask the owner to create the
  npm granular token and the `NPM_TOKEN` repo secret (RFC Decision 3.1:
  `@zanichelli` scope only, ≤ 7 days, 2FA bypass if the org requires it).

- **Read before anything else:**
  - RFC Decisions 1–6: T-016 does 1, 2, 4, 5, 6 and 3.1–3.2; T-017 does
    3.3–3.4 and the first `consumer-check` against npm.
  - Old `v0.1.0` commit: `7f3dc30`; goes into the journal before the move.
    `git diff v0.1.0 HEAD -- src/ tsconfig*.json package.json
    package-lock.json` was empty on 2026-10-06.
  - The owner already accepted the tag move (2026-10-06); still confirm
    the go at the moment of the push.

- **Reviews:** `rfc-reviewer` full round on the RFC: 2 high, 2 medium,
  2 low, all resolved (RFC "Review and acceptance"); no mechanism change,
  so no scoped round. `code-reviewer` not run on `a287128`: the diff is the
  reviewed RFC plus PLAN rows and a task file, no code; dismissed for that
  reason.

- **Proposed plan changes:** T-017 (switch to OIDC and close) and T-018
  (Dependabot PR #2: biome 2.5.15, vitest 5.0.3) are `proposed
  (2026-10-06)`; the owner confirms them.

- **Open doubts:**
  - Unverified: that npm prefers OIDC over `NODE_AUTH_TOKEN` when both
    exist; harmless for the bootstrap (no trusted publisher yet).
  - Unverified: whether the npm org `zanichelli` requires 2FA for writes
    (decides the token's bypass setting).
  - Whether Gemfury allows deleting `0.1.0`, and whether the Gemfury
    account serves other Zanichelli packages: owner's call (RFC Decision 4).
  - Gemfury token rotation (from T-013): to be closed by revocation in
    T-016/T-017.
  - Carried, unchanged: `make consumer-check`/`make demo` rely on vitest's
    hoisted Vite; a boxed `new String(...)` returns `null` untested;
    `make quality-no-node` parked; unpinned ruff in CI vs pre-commit
    v0.15.17 (parked); Dependabot grouping reasoned, not observed; arm64
    unverified; first secret-scanning history scan not re-checked; the demo's
    click handler unobserved in a browser.
  - Settled 2026-10-06: "repo public vs internal use" (owner: public).

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality` exit 0:
  - Biome check "Checked 21 files … No fixes applied." and ruff "All
    checks passed!";
  - ruff format "4 files already formatted", Biome format "Checked 21
    files … No fixes applied.";
  - `tools/checks` "Ran 17 tests … OK";
  - vitest: 4 files passed, 59 tests passed;
  - pack-smoke: npm pack reports 11 files, then "pack-smoke: import, call
    and consumer typecheck passed";
  - gitleaks (tree) and gitleaks (history) Passed.
