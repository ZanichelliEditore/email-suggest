# T-007 — `suggest()` and Phase 1 close

- **Type:** build
- **Phase:** 1
- **Status:** done (2026-09-29)
- **Depends on:** T-004, T-005, T-006
- **Created:** 2026-09-28

## Goal
The public `suggest()` of §3, matching per §4, with the §10 acceptance
table, and Phase 1's acceptance demonstrated.

## In scope
- `src/index.ts`: `suggest` and `Suggestion`, the only exports; trim,
  split on last `@`, lowercase domain, step 1 (including the step 1.2
  same-name rule) then step 2; never throws.
- `test/suggest.test.ts`, table-driven: every §10 row (the step 1.2 rows
  were added at Phase 1 plan review, 2026-09-28); the guard "no list entry is ever suggested"
  (every domain in `domains.ts` → `null`).
- Phase close: `/review` on the Phase 1 diff, and `/security-review`
  (`suggest` takes untrusted input).
- The no-Node demonstration: run `make quality` with any Node install
  removed from `PATH` and `command -v node` empty; paste the output in
  HANDOFF.

## Out of scope
- Pack smoke test, CI changes, publishing (Phase 2).

## Spec sections to read
- SPEC.md §3
- SPEC.md §4
- SPEC.md §10

## Files expected to change
- `src/index.ts`
- `test/suggest.test.ts`

## Acceptance
With Node's directories removed from `PATH` (`command -v node` empty),
`make quality` green and vitest passes the `suggest`, `domains`,
`tld-typos` and `distance` test files, covering every §10 row and the
"no list entry is suggested" guard; `make build` emits `dist/index.js` and
`dist/index.d.ts`.

**Split point:** if the session gets tight, the Phase 1 close (phase-wide
review, security review, no-Node demonstration) becomes its own task.

---
*Filled at `/handoff`:*

## Done
- `src/index.ts`: `suggest`, `Suggestion`; step 1 (1.1–1.5), step 2,
  `boundedDistance` length bound (security-review fix, result-preserving).
- `test/suggest.test.ts`: `suggest(%j) = %j` (21 §10 rows + trimmed
  suggestion), `suggest(%j) = null` (16 §10 rows + `x@.con`),
  `no list entry is ever suggested`, `a 1 MB domain returns null quickly
  (%#)` ×2, `suggest is the only runtime export`.
- Mutation probes, each caught: step 1.2 off, tie `<=`, threshold 6→5,
  typo-key exemption off, bound `>=`, bound off, step-1.2 max 0.
- No-Node run: `command -v node` empty, `make quality` exit 0 (4 files,
  55 tests), `make build` exit 0 with `dist/index.{js,d.ts}`. Method in
  `docs/journal.md` (2026-09-29).
- `docs/architecture/overview.md`: Product components and dependency rules.
- Commit: see HANDOFF.md "Describes commit".

## Dead ends
- The `/security-review` skill failed: it runs `git diff origin/HEAD...`,
  `origin/HEAD` isn't set, and it only sees committed work. I redid the
  review in the main session.

## Open doubts
- `suggest(null)` from untyped JavaScript throws `TypeError`. I dismissed
  this because §3 promises no throw only for strings. Owner to confirm.
- The no-Node demo shims `/usr/bin` rather than removing it (Node sits
  beside bash, make and docker there). `command -v node` is empty, but no
  directory was actually taken out of `PATH`.

## Context pressure
ok

## Next action
none (done).
