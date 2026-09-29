# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T18:49:18+02:00`
- **Describes commit:** `<hash>`, pushed to `origin/main`. **CI:**
  `<run>`.

- **Current task:** T-011 (`docs/tasks/T-011-publish-workflow.md`),
  `done (2026-09-29)`.
  - `584a650`: `publish.yml`, `tools/checks/check_tag_version.py` + its
    test, `.pack/` from `make pack-smoke`, README consumer install,
    SPEC §9 amended. CI green:
    https://github.com/ZanichelliEditore/email-suggest/actions/runs/36590272213
  - Secrets `GEMFURY_ACCOUNT` and `GEMFURY_PUSH_TOKEN` set by the owner
    (`gh secret list`, 2026-09-29T16:48Z).

- **Next action:** `/resume`, then take T-012
  (`docs/tasks/T-012-release-0.1.0.md`). The tag push waits for the
  owner's explicit go.

- **Read before anything else:**
  - Owner decisions 2026-09-29 (SPEC §9, PLAN § Phase 2 re-plan note):
    - the upload is `curl` to `push.fury.io` from the runner, not
      `npm publish`;
    - `GEMFURY_ACCOUNT` is a repo **secret**, not a variable.
  - T-013 still needs a Gemfury read (deploy) token and the account slug
    in the gitignored `.env`.
  - `quality.yml` is managed: an update may restore the ruff-only job
    (`docs/journal.md`, 2026-09-29, T-010).

- **Reviews:**
  - `code-reviewer` full round: 0 blockers, 2 should-fix, 4 nits.
    - Should-fix 1: task file contradicted the build. Fixed (Superseded
      note).
    - Should-fix 2: account name visible in the public log as a variable.
      Fixed by owner choice: now a secret.
    - Nit, redirect passes silently: fixed with the 2xx check.
    - Nit, `GEMFURY_PUSH_URL` redundant: dismissed; the `fury.io` line has
      to name `secrets.GEMFURY_ACCOUNT` for the acceptance grep.
    - Nit, no gate test for the upload: stub-server check recorded in the
      task file's Done section.
    - Nit, SHA-pin actions: parked (`docs/improvements.md`).
  - Scoped round: nothing falsifies acceptance or fails open. 4xx body
    not printed: parked. Task-file wording: fixed.
  - `/security-review` skill failed (no `origin/HEAD`), so it was done in
    the main session: no high-confidence issue. Tag ruleset parked.

- **Proposed plan changes:** none.

- **Open doubts:**
  - New:
    - The upload has never hit the real Gemfury: T-012's tag is the first
      proof.
    - Rotation of the token pasted in chat on 2026-09-29: not confirmed.
    - The Gemfury account looks personal; SPEC §9 says "Zanichelli's".
  - Carried:
    - The unpinned ruff in CI versus pre-commit's pin v0.15.17 (parked).
    - A boxed `new String(...)` returns `null`; no test covers it.
    - The no-Node demo shims `/usr/bin`, and `/usr/local/bin/node` also
      exists on this host. `make quality-no-node` stays parked.
    - Dependabot `docker`/`npm` grouping is reasoned, not observed.
    - The repo is public, although the owner said "internal use".
    - arm64 is unverified.
    - The first secret-scanning history scan (enabled 2026-09-29) hasn't
      been re-checked.
    - Whether Gemfury allows deleting a published version is unverified
      (matters for T-012).

- **Dead ends:** `npm publish` from the container (task's plan): no
  documented push-token support, and no curl in the image.

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
