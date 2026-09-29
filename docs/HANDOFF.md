# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T18:55:36+02:00`
- **Describes commit:** `<hash>`. **CI:** `<pending>`

- **Current task:** T-012 (`docs/tasks/T-012-release-0.1.0.md`),
  `done (2026-09-29)`.
  - Annotated tag `v0.1.0` on `7f3dc30` pushed on the owner's go
    (2026-09-29). CI on `7f3dc30` green:
    https://github.com/ZanichelliEditore/email-suggest/actions/runs/36600709140
  - Publish run queued, not observed:
    https://github.com/ZanichelliEditore/email-suggest/actions/runs/36601141874

- **Next action:** `/resume`, then take T-013
  (`docs/tasks/T-013-consumer-check.md`); its first step is checking publish run
  `36601141874` (`gh run view 36601141874`).

- **Read before anything else:**
  - The upload is `curl` to `push.fury.io` and `GEMFURY_ACCOUNT` is a
    secret (owner decisions 2026-09-29, SPEC §9).
  - T-013 needs a Gemfury read (deploy) token and the account slug in the
    gitignored `.env`: ask the owner before starting.
  - If the publish run is red, the version may or may not be on Gemfury:
    check the upload step's log before any retag.
  - `quality.yml` is managed: an update may restore the ruff-only job
    (`docs/journal.md`, 2026-09-29, T-010).

- **Reviews:** `/review` dismissed: no diff since the task started (only
  a tag, and this handoff's doc edits).

- **Proposed plan changes:** none.

- **Open doubts:**
  - New: none.
  - Carried:
    - The publish run is the first real upload to Gemfury.
    - Whether Gemfury allows deleting a published version is unverified.
    - Rotation of the token pasted in chat on 2026-09-29: not confirmed.
    - The Gemfury account looks personal; SPEC §9 says "Zanichelli's".
    - The unpinned ruff in CI versus pre-commit's pin v0.15.17 (parked).
    - A boxed `new String(...)` returns `null`; no test covers it.
    - The no-Node demo shims `/usr/bin`, and `/usr/local/bin/node` also
      exists on this host. `make quality-no-node` stays parked.
    - Dependabot `docker`/`npm` grouping is reasoned, not observed.
    - The repo is public, although the owner said "internal use".
    - arm64 is unverified.
    - The first secret-scanning history scan (enabled 2026-09-29) hasn't
      been re-checked.

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality` exit 0:
  - Biome check "Checked 15 files … No fixes applied." and ruff "All
    checks passed!";
  - Biome format "Checked 15 files … No fixes applied.";
  - `tools/checks` "Ran 17 tests … OK";
  - vitest: 4 files passed, 59 tests passed;
  - pack-smoke: npm pack reports 11 files, then "pack-smoke: import, call
    and consumer typecheck passed";
  - gitleaks (tree) and gitleaks (history) Passed.
