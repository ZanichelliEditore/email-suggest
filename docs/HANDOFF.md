# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T19:35:16+02:00`
- **Describes commit:** `<hash>`, pushed to `origin/main`. **CI:**
  `<pending>`.

- **Current task:** T-013 (`docs/tasks/T-013-consumer-check.md`),
  `done (2026-09-29)`. **Phase 2 closed**, and with it every phase in
  SPEC §13.
  - `make consumer-check` exit 0: `0.1.0` from Gemfury, `vite build`,
    `deepStrictEqual` passed; failure path shown (task file "Done").
  - CI green for tagged commit `7f3dc30`: runs 36600709140 (`quality`),
    36601141874 (`publish`).

- **Next action:** `/resume`. PLAN has no `todo` row left: ask the owner
  whether to `/plan` a new phase (SPEC §13 would need one first) or to
  triage `docs/improvements.md`.

- **Read before anything else:**
  - `make consumer-check` needs a Gemfury **deploy** token and the account
    slug in the gitignored `.env` (`GEMFURY_TOKEN`, `GEMFURY_ACCOUNT`); a
    push token gets 401 (`docs/journal.md`, 2026-09-29, T-013).
  - `consumer-check/.npmrc` is tracked on purpose: only `${…}`
    placeholders (task file note, owner-reviewed 2026-09-29).
  - `/security-review` can't see pushed work (`origin/HEAD` unset); redo it
    in the main session (`docs/journal.md`, T-013).

- **Reviews:** `/review` (code-reviewer) on `git diff e33392a` + T-013:
  0 blockers; 5 findings fixed (SPEC §11 wording on the owner's go, task
  note, Biome hook pattern, gitleaks with fixture staged, overview entry).
  Security review in the main session: no exploitable findings; publish
  build/upload job split parked in `docs/improvements.md`.

- **Proposed plan changes:** none.

- **Open doubts:**
  - New: the first `.env` token may have been the repo push token (now on
    the laptop); the push token created 2026-09-29 19:23 is unused.
    Rotation/revocation of either: not confirmed.
  - New: `make consumer-check` relies on vitest's Vite hoisted to
    `node_modules/.bin/vite`.
  - Carried:
    - `vars.GEMFURY_ACCOUNT` has never run; first test is the next tag.
    - Gemfury's error body is not printed on a failed upload (parked).
    - Whether Gemfury allows deleting a published version is unverified.
    - Rotation of the token pasted in chat on 2026-09-29: not confirmed.
    - The unpinned ruff in CI versus pre-commit's pin v0.15.17 (parked).
    - A boxed `new String(...)` returns `null`; no test covers it.
    - `make quality-no-node` stays parked; `/usr/local/bin/node` on host.
    - Dependabot `docker`/`npm` grouping is reasoned, not observed.
    - The repo is public, although the owner said "internal use".
    - arm64 is unverified.
    - The first secret-scanning history scan hasn't been re-checked.

- **Dead ends:** two push tokens as the read token: 401 on `npm.fury.io`
  despite 200 on `api.fury.io` (task file).

- **Known red:** none.

- **Checkpoint:** `make quality` exit 0:
  - Biome check "Checked 19 files … No fixes applied." and ruff "All
    checks passed!";
  - Biome format "Checked 19 files … No fixes applied.";
  - `tools/checks` "Ran 17 tests … OK";
  - vitest: 4 files passed, 59 tests passed;
  - pack-smoke: npm pack reports 11 files, then "pack-smoke: import, call
    and consumer typecheck passed";
  - gitleaks (tree) and gitleaks (history) Passed.
  - Outside the gate: `make consumer-check` exit 0 (needs `.env`).
