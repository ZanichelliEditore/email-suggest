# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T15:16:52+02:00`
- **Describes commit:** `0774cd4`, pushed to `origin/main`. **CI:**
  green on `quality.yml`, run
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36574003789
  (jobs `quality` and `checks` both success; observed with `gh run view`).

- **Current task:** T-006 (TLD typo map, with its guard),
  `done (2026-09-29)`. See `docs/tasks/T-006-tld-typos.md` § Done.

- **Next action:** `/resume`, then T-007 (`suggest()` and Phase 1 close),
  `docs/tasks/T-007-suggest.md`. All its dependencies (T-004, T-005, T-006) are
  done.

- **Read before anything else:**
  - `src/tld-typos.ts` exports `tldTypos: ReadonlyMap<string, string>`.
    Look up with `tldTypos.get(label)` / `.has(label)`; it is a Map so an
    untrusted label like `constructor` finds nothing (journal, T-006).
  - `src/domains.ts` exports `domains: readonly string[]`, SPEC §5 order.
    The content of both lists is proven only by T-007's §10 rows.
  - Tests import sources as `../src/<name>.js` (NodeNext); vitest maps it
    to the `.ts`.
  - CI (`quality.yml`) runs neither Biome, tsc nor vitest; only local
    `make quality` does, until Phase 2.

- **Reviews:** `code-reviewer`, full round on the T-006 diff: 0 blockers,
  0 should-fix, 2 nits. Owner's call: guard comment overclaimed
  completeness (applied: reworded to "hand-picked", added `itv ntt ong tj
  tl tn`); guard passes an empty map (dismissed: T-007's §10 rows catch
  it, same call as T-005). No scoped round: the fix changed no mechanism.

- **Proposed plan changes:** none.

- **Open doubts:**
  - Carried: Dependabot `docker`/`npm` grouping reasoned, not observed;
    repo is public although the owner said "internal use"; arm64
    unverified; first secret-scanning history scan (enabled 2026-09-29)
    not re-checked.

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality`: Biome check "Checked 10 files … No fixes
  applied.", ruff "All checks passed!", 2 files already formatted, Biome
  format "Checked 10 files … No fixes applied.", tsc typecheck exit 0,
  `tools/checks` 5 tests OK, vitest 3 files passed, 12 tests passed
  (`distance` 9, `domains` 2, `tld-typos` 1), gitleaks (tree) Passed,
  gitleaks (history) Passed. `make build`: `dist/{distance,domains,
  tld-typos}.{js,d.ts}`.
