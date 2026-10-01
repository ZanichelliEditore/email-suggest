# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-10-01T15:27:50+02:00`
- **Describes commit:** `<hash>` (filled by the stamp commit). **CI:**
  `<run>`.

- **Current task:** T-015 (`docs/tasks/T-015-usage-docs-demo.md`),
  `done (2026-10-01)`. Owner request outside SPEC §13: README `## Usage`
  (`abbe4f5`), `examples/demo/` + `make demo` on `127.0.0.1:5180`
  (`0940097`). Acceptance shown with `curl` (task file "Done").

- **Next action:** `/resume`. PLAN has no `todo` row: ask the owner for
  the next request, a `/plan`, or triage of `docs/improvements.md`.

- **Read before anything else:**
  - `make demo` is interactive (no `-T`); Ctrl-C stops it. Port 5180, not
    Vite's 5173 (held by another project's container on this host);
    `DEMO_PORT=<n>` overrides (`Makefile` `demo:`).
  - `make format` doesn't fix `<style>` formatting that `make
    format-check` rejects; use `biome format --write <file>` in the
    container (`docs/improvements.md`, 2026-10-01).

- **Reviews:** `/review` (code-reviewer) on `abbe4f5` + the staged demo
  diff: 0 blockers. Fixed: acceptance now curls the `/@fs` dist import,
  overview entry, README "only runtime export" and trimming, improvements
  citation. Dismissed with evidence: "Ctrl-C won't stop it" (measured: it
  does, journal 2026-10-01). No second round: fixes were docs only.

- **Proposed plan changes:** none.

- **Open doubts:**
  - New: the demo was checked with `curl`, not in a browser (Playwright
    MCP did not connect); the hint's click handler is unobserved.
  - Carried from T-013's handoff, unchanged:
    - Token rotation: the first `.env` token, the unused push token
      created 2026-09-29 19:23, and the token pasted in chat 2026-09-29:
      none confirmed.
    - `make consumer-check` and `make demo` rely on vitest's Vite hoisted
      to `node_modules/.bin/vite`.
    - `vars.GEMFURY_ACCOUNT` has never run; first test is the next tag.
    - Gemfury's error body is not printed on a failed upload (parked).
    - Whether Gemfury allows deleting a published version is unverified.
    - The unpinned ruff in CI versus pre-commit's pin v0.15.17 (parked).
    - A boxed `new String(...)` returns `null`; no test covers it.
    - `make quality-no-node` stays parked; `/usr/local/bin/node` on host.
    - Dependabot `docker`/`npm` grouping is reasoned, not observed.
    - The repo is public, although the owner said "internal use".
    - arm64 is unverified.
    - The first secret-scanning history scan hasn't been re-checked.

- **Dead ends:** `make demo` on 5173: "port is already allocated"
  (another project's container); moved to 5180.

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
  - Outside the gate: `make demo` acceptance curls (task file "Done").
