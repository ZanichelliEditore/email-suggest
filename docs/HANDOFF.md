# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-10-06T17:46:01+02:00`
- **Describes commit:** `<hash>`, pushed to `origin/main`. **CI:** `<run>`.

- **Current task:** T-020 (`docs/tasks/T-020-legacy-resolution-fields.md`),
  `done (2026-10-06)`. Code in `3e74367`; tag `v0.1.2` published,
  run https://github.com/ZanichelliEditore/email-suggest/actions/runs/37489298158
  (both jobs green); `npm view …@0.1.2 main types` and
  `make consumer-check` against `0.1.2` verified (task file "Done").

- **Next action:** `/resume`; no `todo` or `proposed` row exists, so the
  owner names the next request.

- **Read before anything else:**
  - `docs/journal.md`, 2026-10-06, last two entries (T-020).

- **Reviews:** `code-reviewer` full on the T-020 diff: no blocker; 2
  should-fix and 1 nit fixed, 2 nits dismissed with reasons (task file
  "Done"). No mechanism change, no scoped round. No `/security-review`:
  manifest fields and a test script only. Handoff commit docs only: not
  reviewed.

- **Proposed plan changes:** none.

- **Open doubts:**
  - From T-020: a real `node10` consumer was not observed (TypeScript
    7.0.2 rejects `node10`, `TS5108`); the reporting consumer's build
    not re-run here.
  - Carried from T-017: "disallow tokens" and revocation of both T-016 npm
    tokens: owner's word, not observed.
  - Carried from T-016: Gemfury leftovers observed on 2026-10-06 (repo
    secret `GEMFURY_PUSH_TOKEN`, variable `GEMFURY_ACCOUNT` still set);
    Gemfury token revocation, `.env` cleanup and Gemfury `0.1.0` deletion
    are the owner's.
  - Carried, unchanged: `make demo` relies on vitest's hoisted Vite; a
    boxed `new String(...)` returns `null` untested; `make quality-no-node`
    parked; unpinned ruff in CI vs pre-commit v0.15.17 (parked); arm64
    unverified; first secret-scanning history scan not re-checked; the
    demo's click handler unobserved in a browser.

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality` exit 0 on 2026-10-06 (tree of `3e74367`):
  - Biome check "Checked 22 files … No fixes applied." and ruff "All
    checks passed!";
  - ruff format "4 files already formatted", Biome format "Checked 22
    files … No fixes applied.";
  - `tools/checks` "Ran 17 tests … OK";
  - vitest: 4 files passed, 59 tests passed;
  - pack-smoke: npm pack reports 11 files, then "pack-smoke: import,
    call, main/types and consumer typecheck passed";
  - gitleaks (tree) and gitleaks (history) Passed.
