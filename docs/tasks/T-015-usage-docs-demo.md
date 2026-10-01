# T-015 — Usage docs: README Usage section and demo page

- **Type:** build
- **Phase:** none (owner request, outside SPEC §13)
- **Status:** done (2026-10-01)
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
  `127.0.0.1:5180` only (`DEMO_PORT` overrides). Vite is the lockfile's
  (via vitest): no new dependency. `examples/**` joins Biome's includes and
  the pre-commit hook's pattern.
  - *Changed (2026-10-01):* 5180, not 5173: another project's container
    holds 5173 on this host, and the first `make demo` failed with "port is
    already allocated". Acceptance follows.

## Out of scope
- A UI component in the package (SPEC §2 non-goal): the demo is not in
  `"files"` and is not published.
- Running the demo in `quality` or CI.

## Spec sections to read
- SPEC.md §3
- SPEC.md §2 (the "No UI component" non-goal)

## Files expected to change
- `README.md`, `examples/demo/index.html`, `examples/demo/main.js`,
  `Makefile`, `biome.json`, `.pre-commit-config.yaml`, `docs/tasks/PLAN.md`

## Acceptance
README has `## Usage` with SPEC §3's snippet; `make demo` serves
`http://127.0.0.1:5180/`, and `curl` of it returns the page, of `/main.js`
the module importing `/@fs/app/dist/index.js`, and of that URL a 200 with
`export function suggest`; `make quality` green.

---
*Filled at `/handoff`:*

## Done
- `abbe4f5`: README `## Usage` (import, SPEC §3 snippet, `Suggestion`,
  `null` cases); examples checked against `dist/` in the container.
- `0940097`: `examples/demo/{index.html,main.js}`, `make demo`
  (`Makefile` `demo:`), `examples/**` in `biome.json` and the pre-commit
  Biome pattern, `docs/architecture/overview.md` entry, review fixes.
- Acceptance shown 2026-10-01 with `make demo` running: `/` 200 with
  `id="email"`; `/main.js` has `from "/@fs/app/dist/index.js"`; that URL
  200 with `export function suggest`. Ctrl-C (`\003` through a pty)
  stopped it, no container left. `/@fs/app/.env` and `/@fs/etc/passwd`
  403.
- No unit test: README prose and a demo page (owner request); the README
  examples were run against `dist/`, and `make quality` covers `suggest`.

## Dead ends
- Port 5173: another project's container holds it on this host, so the
  first `make demo` failed ("port is already allocated"). Moved to 5180,
  `DEMO_PORT` overrides.

## Open doubts
- The demo was checked with `curl`, not in a browser (the Playwright MCP
  did not connect this session): the hint's click handler is unobserved.
- `make format` doesn't apply the `<style>` formatting `make format-check`
  requires (parked in `docs/improvements.md`).

## Context pressure
low

## Next action
none (done).
