# T-013 — Consumer check and Phase 2 close

- **Type:** build
- **Phase:** 2
- **Status:** todo
- **Depends on:** T-012, owner: Gemfury read token and account slug in the
  gitignored `.env`
- **Created:** 2026-09-29

## Goal
Phase 2's acceptance (§13) demonstrated: `0.1.0` installs from Gemfury
into a Vite project and works, and the phase is reviewed.

## In scope
- First step: the publish run for `v0.1.0` is green.
- `make consumer-check` (one-line `make help` entry, not part of
  `quality`: it needs the network and a token): inside the container, copy
  a small tracked fixture to `/tmp`, install `@zanichelli/email-suggest@0.1.0`
  from Gemfury with an npmrc written under `/tmp` from the `.env` read
  token and account slug (never a tracked file, AGENTS.md rule 2), `vite build` with the lockfile-pinned `node_modules/.bin/vite`
  (no new dependency), then a Node script imports the installed package
  and `assert.deepStrictEqual`s `suggest("mario@lgmai.com")` with
  `{ address: "mario@gmail.com", domain: "gmail.com" }`.
- Phase close: `/review` on the Phase 2 diff, `/security-review` (tokens,
  workflows).

## Out of scope
- Running the Vite-built bundle (owner chose the Node import, plan review
  2026-09-29). Adding Vite to `package.json`.

## Spec sections to read
- SPEC.md §13
- SPEC.md §9
- SPEC.md §11

## Files expected to change
- `Makefile`
- consumer fixture (`index.html`, `main.js`, check script)
- `compose.yaml` (maybe, to pass the token env var)

## Acceptance
Publish run for `v0.1.0` green; `make consumer-check` exits 0; CI green
for the tagged commit; `/review` and `/security-review` run and their
findings resolved or dismissed with a reason.

**Split point:** if the session gets tight, the phase close (`/review`,
`/security-review`, and their findings clause of the acceptance) becomes
T-014.

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
