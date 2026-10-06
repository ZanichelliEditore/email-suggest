# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-10-06T15:52:09+02:00`
- **Describes commit:** `a76b480`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37474330066
  (jobs `quality` and `checks` both success; observed with `gh run view`).

- **Current task:** T-016 (`docs/tasks/T-016-npm-publish.md`),
  `done (2026-10-06)`. `@zanichelli/email-suggest@0.1.0` is on npm with
  provenance: publish run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37472987047
  (attempt 2 green; attempt 1 `E403`, nothing published). `v0.1.0` now
  points at `beafb90`.

- **Next action:** `/resume`; the owner confirms or re-plans the
  `proposed` rows. Suggested order: T-019 (job split) before T-017, since
  T-017 makes OIDC the only credential; T-018 is independent.

- **Read before anything else:**
  - T-016 task file, "Open doubts".
  - `docs/improvements.md`, the two 2026-10-06 entries (job-wide
    `id-token`; SPEC §8/§14 nits).
  - `docs/journal.md`, 2026-10-06: the `E403` and the 2FA-bypass
    deprecation notice.
  - RFC `docs/rfc/active/2026-10-06-publish-to-npm.md` Decision 3.3–3.4
    (T-017's steps; the owner's npmjs.com part comes first).

- **Reviews:** `code-reviewer` full round on `beafb90`'s diff: 0 high,
  2 medium, 4 low; 3 fixed, 1 closed by check (`setup-node` `v7` exists),
  2 parked in `docs/improvements.md`. The fixes added checks without
  changing a mechanism, so there was no scoped round. `/security-review`:
  no finding at or above the bar; its below-bar note (the container can
  write the `.npmrc` that `npm publish` reads) is in the task's open
  doubts. The handoff commit is docs only: not reviewed, for that reason.

- **Proposed plan changes:**
  - New: T-019, split `publish.yml` into gate and publish jobs, before T-017
    (needs an RFC amendment or an owner decision).
  - Still `proposed` from 2026-10-06: T-017 (OIDC switch and close), T-018
    (Dependabot PR #2).

- **Open doubts:**
  - npm says 2FA-bypass tokens "are being restricted for ... direct
    publishing"; it worked on 2026-10-06.
  - Owner actions not observed: revoke the first npm token (no bypass);
    revoke the Gemfury tokens; delete the `GEMFURY_PUSH_TOKEN` secret and
    `GEMFURY_ACCOUNT` variable; remove `.env`'s Gemfury entries. The
    bypass token stays in `NPM_TOKEN` until T-017.
  - Whether Gemfury allows deleting `0.1.0` there, and whether the account
    serves other packages: owner's call (RFC Decision 4).
  - `make consumer-check` has not yet run against the published package
    (T-017's acceptance).
  - Carried, unchanged: `make demo` relies on vitest's hoisted Vite; a
    boxed `new String(...)` returns `null` untested; `make quality-no-node`
    parked; unpinned ruff in CI vs pre-commit v0.15.17 (parked); Dependabot
    grouping reasoned, not observed; arm64 unverified; first
    secret-scanning history scan not re-checked; the demo's click handler
    unobserved in a browser.

- **Dead ends:** bootstrap token without "bypass 2FA": `E403` at the
  `PUT`; fixed by a bypass token and `gh run rerun` (no tag move).

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
