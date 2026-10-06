# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-10-06T16:14:33+02:00`
- **Describes commit:** `f99aa99`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37477363794
  (jobs `quality` and `checks` both success; observed with `gh run view`).

- **Current task:** T-019 (`docs/tasks/T-019-publish-job-split.md`),
  `done (2026-10-06)`. Work commit `6e9b0f0`: `publish.yml` is two jobs,
  `gate` (`contents: read`) and `publish` (`id-token: write` only, no
  checkout), per RFC `docs/rfc/active/2026-10-06-publish-to-npm.md`
  Decision 7 (amendment accepted 2026-10-06, option A). `quality.yml`
  green on `6e9b0f0`:
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37477021298

- **Next action:** `/resume`; the owner re-plans T-017's acceptance (see
  "Proposed plan changes") and confirms T-017 / T-018.

- **Read before anything else:**
  - T-019 task file, "Open doubts".
  - RFC Decision 7 and its "Review and acceptance" entries; Decision
    3.3–3.4 for T-017 (the owner's npmjs.com part comes first).
  - `docs/journal.md`, 2026-10-06: the `./` tarball path and
    `include-hidden-files` entries.

- **Reviews:** `rfc-reviewer` full + scoped round on the amendment (scoped
  fail-open went to the owner: option A); `code-reviewer` full on the diff
  (1 high fixed, the `./tarball/` path; no mechanism change, so no scoped
  round); `/security-review`: no finding ≥ 8. Details in the task file's
  "Done". The handoff commit is docs only: not reviewed, for that reason.

- **Proposed plan changes:**
  - T-017's acceptance "publish run for `v0.1.0` green" cannot be met
    again (`0.1.0` is on npm; a re-run fails "cannot publish over"). It
    needs a new acceptance, e.g. the first OIDC-only run at the next
    release tag, or OIDC proven another way. Owner / `/plan` decision.
  - Still `proposed` from 2026-10-06: T-017 (OIDC switch and close), T-018
    (Dependabot PR #2; its branch was force-updated on 2026-10-06, CI to
    re-check).

- **Open doubts:**
  - The two-job `publish.yml` has never run on GitHub; first run at the
    next release tag. Both jobs fail closed.
  - The name/version guard catches honest mismatches, not a crafted
    tarball (owner decision A).
  - Carried from T-016: npm's 2FA-bypass token restriction notice; owner
    actions not observed (revoke first npm token and Gemfury tokens,
    delete `GEMFURY_PUSH_TOKEN` / `GEMFURY_ACCOUNT`, clean `.env`); Gemfury
    `0.1.0` deletion is the owner's call; `make consumer-check` not yet run
    against npm (T-017).
  - Carried, unchanged: `make demo` relies on vitest's hoisted Vite; a
    boxed `new String(...)` returns `null` untested; `make quality-no-node`
    parked; unpinned ruff in CI vs pre-commit v0.15.17 (parked); Dependabot
    grouping reasoned, not observed; arm64 unverified; first
    secret-scanning history scan not re-checked; the demo's click handler
    unobserved in a browser.

- **Dead ends:** `npm publish tarball/x.tgz` without `./` is GitHub
  shorthand to npm; caught in review before any run.

- **Known red:** none.

- **Checkpoint:** `make quality` exit 0 on 2026-10-06 (tree of `6e9b0f0`):
  - Biome check "Checked 21 files … No fixes applied." and ruff "All
    checks passed!";
  - ruff format "4 files already formatted", Biome format "Checked 21
    files … No fixes applied.";
  - `tools/checks` "Ran 17 tests … OK";
  - vitest: 4 files passed, 59 tests passed;
  - pack-smoke: npm pack reports 11 files, then "pack-smoke: import, call
    and consumer typecheck passed";
  - gitleaks (tree) and gitleaks (history) Passed.
