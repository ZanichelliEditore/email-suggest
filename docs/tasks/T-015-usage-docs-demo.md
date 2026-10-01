# T-015 — Usage docs: README Usage section and demo page

- **Type:** build
- **Phase:** none (owner request, outside SPEC §13)
- **Status:** doing (2026-10-01)
- **Depends on:** T-013
- **Created:** 2026-10-01

## Goal
A consumer can see how to call `suggest` without reading SPEC: the README
has a Usage section, and `make demo` serves a page that shows the hint live.

## In scope
- README `## Usage`: the import, SPEC §3's input→hint snippet (§3 says "as
  the README shows it"; the README did not), the `Suggestion` shape, the
  inputs that return `null`. First commit (split point).
- `examples/demo/` (`index.html`, `main.js`): an email field and a "Did you
  mean …?" hint that applies the suggestion on click. It imports the built
  `dist/index.js`, so it shows what ships.
- `make demo`: build, then Vite's dev server in the container, published on
  `127.0.0.1:5173` only. Vite is the lockfile's (via vitest): no new
  dependency. `examples/**` joins Biome's includes.

## Out of scope
- A UI component in the package (SPEC §2 non-goal): the demo is not in
  `"files"` and is not published.
- Running the demo in `quality` or CI.

## Spec sections to read
- SPEC.md §3
- SPEC.md §2 (the "No UI component" non-goal)

## Files expected to change
- `README.md`, `examples/demo/index.html`, `examples/demo/main.js`,
  `Makefile`, `biome.json`, `docs/tasks/PLAN.md`

## Acceptance
README has `## Usage` with SPEC §3's snippet; `make demo` serves
`http://127.0.0.1:5173/`, and `curl` of it returns the page and of
`/main.js` the module; `make quality` green.

---
*Filled at `/handoff`:*

## Done
Commits and tests, not narration.

## Dead ends
none

## Open doubts
none

## Context pressure
low | ok | tight | overflowed — and, if tight or overflowed, how it should
have been split.

## Next action
Only if the status is still `doing`: the exact first step for the next
session.
