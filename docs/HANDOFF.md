# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-10-08T11:06:50+02:00`
- **Describes commit:** `2e1cc59`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37754445595.

- **Current task:** T-021 (`scuola.istruzione.it`, release `0.1.3`),
  `done (2026-10-08)`. No `doing`, `todo` or `proposed` row left in
  `docs/tasks/PLAN.md`. `0.1.3` is the published release (publish run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37753993594,
  gate and publish green; `make consumer-check` exit 0).

- **Next action:** none. A new session starts only on a new owner request:
  `/resume`, then the owner names it.

- **Read before anything else:** none.

- **Reviews:** `code-reviewer` on `0ea5a3b`'s diff: no findings; optional
  nit (`null` row for `x@scuola.istruzione.com`) dismissed, step 1.2 is
  pinned by `x@gmail.it`/`x@yahoo.fr`/`x@hotmail.de`. See
  `docs/tasks/T-021-scuola-istruzione.md`.

- **Proposed plan changes:** none.

- **Open doubts:**
  - Owner decision 2026-10-08: `posta.istruzione.it` stays listed although
    its mailboxes were switched off 2023-12-20.
  - Carried, not to be pursued (owner, 2026-10-07): T-020 `node10`
    consumer never observed.
  - Carried from T-017: "disallow tokens" and revocation of both T-016 npm
    tokens: owner's word, not observed.
  - Parked, not tasks: `make demo` relies on vitest's hoisted Vite; a
    boxed `new String(...)` returns `null` untested; `make quality-no-node`;
    unpinned ruff in CI vs pre-commit v0.15.17; arm64 unverified; first
    secret-scanning history scan not re-checked; the demo's click handler
    unobserved in a browser.

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality` exit 0 on 2026-10-08 (tree of `0ea5a3b`):
  Biome "All checks passed!", ruff clean; `tools/checks` "Ran 17 tests …
  OK"; vitest 4 files, 60 tests passed; pack-smoke passed; gitleaks (tree
  and history) Passed.
