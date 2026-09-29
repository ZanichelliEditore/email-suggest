# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `2026-09-29T14:19:40+02:00`
- **Describes commit:** `<hash>`, pushed to `origin/main`. **CI:**
  `<pending>`

- **Current task:** T-005 (known-domain list, with its guards),
  `done (2026-09-29)`. See `docs/tasks/T-005-domains.md` § Done.

- **Next action:** `/resume`, then T-006 (TLD typo map, with its guard),
  `docs/tasks/T-006-tld-typos.md`. T-007 waits on T-006.

- **Read before anything else:**
  - `src/domains.ts` exports `domains: readonly string[]`, SPEC §5 order.
    Its content and order are proven only by T-007's §10 rows (task file
    § In scope), not by a copy in `test/domains.test.ts`.
  - Tests import sources as `../src/<name>.js` (NodeNext); vitest maps it
    to the `.ts`.
  - CI (`quality.yml`) runs neither Biome, tsc nor vitest; only local
    `make quality` does, until Phase 2.

- **Reviews:** `code-reviewer`, full round on the T-005 diff: 0 blockers,
  0 should-fix, 3 nits. Owner's call: empty list passes both guards
  (dismissed: T-007's §10 rows catch it); lowercase guard passes
  `" gmail.com"`/`"gmail.com."` (parked in `docs/improvements.md`);
  `mail.com` comment restates SPEC (dismissed). No scoped round: no fix.

- **Proposed plan changes:** none.

- **Open doubts:**
  - Carried: whether repo security updates are enabled is unverified (no
    `gh`); Dependabot `docker`/`npm` grouping reasoned, not observed; repo
    is public although the owner said "internal use"; arm64 unverified.

- **Dead ends:** none.

- **Known red:** none.

- **Checkpoint:** `make quality`: Biome check "Checked 8 files … No fixes
  applied.", ruff "All checks passed!", 2 files already formatted, Biome
  format "Checked 8 files … No fixes applied.", tsc typecheck exit 0,
  `tools/checks` 5 tests OK, vitest 2 files passed, 11 tests passed
  (`distance` 9, `domains` 2), gitleaks (tree) Passed, gitleaks (history)
  Passed. `make build`: `dist/distance.{js,d.ts}`, `dist/domains.{js,d.ts}`.
