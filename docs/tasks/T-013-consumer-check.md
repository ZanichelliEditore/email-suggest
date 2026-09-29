# T-013 — Consumer check and Phase 2 close

- **Type:** build
- **Phase:** 2
- **Status:** done (2026-09-29)
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
  - *Changed (2026-09-29, owner-reviewed):* the npmrc is a tracked
    fixture file, `consumer-check/.npmrc`, copied to `/tmp`. It holds only
    the README's two lines with `${GEMFURY_ACCOUNT}` and `${GEMFURY_TOKEN}`,
    which npm expands from the environment, so no value is ever written to
    disk and the check tests the form the README documents.
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
- `consumer-check/.npmrc`, `biome.json`, `.pre-commit-config.yaml`,
  `docs/architecture/overview.md`, `SPEC.md` §11 (review, 2026-09-29)
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
Commit: see `docs/HANDOFF.md` "Describes commit".
- Publish run for `v0.1.0` green (T-014): run 36601141874.
- `make consumer-check` (`Makefile`, fixture `consumer-check/`) exit 0,
  2026-09-29: "added 1 package", `vite v8.3.1` "8 modules transformed",
  "consumer-check: suggest() from the Gemfury package passed".
  Failure path shown: without the install, `vite build` exits 1 and
  `check.js` throws `ERR_MODULE_NOT_FOUND`.
- CI green for the tagged commit `7f3dc30`: `quality` run 36600709140,
  `publish` run 36601141874.
- `/review` (code-reviewer): 0 blockers, 2 should-fix, 3 nits, all fixed
  (SPEC §11 wording on the owner's go, this file's npmrc note, Biome hook
  pattern, gitleaks run with the fixture staged, overview entry).
- Security review redone in the main session (the skill diffs
  `origin/HEAD...`, unset here and empty with Phase 2 on `main`): no
  exploitable findings; one hardening item parked in
  `docs/improvements.md` (split publish into build and upload jobs).

## Dead ends
- Two push tokens tried as the read token: both authenticate on
  `api.fury.io` (users/me, package list 200) but get 401 on `npm.fury.io`
  in every auth form. A deploy token works (`docs/journal.md`).

## Open doubts
- The first token placed in `.env` may have been the repo's push token,
  now also on the owner's laptop; the push token created at 19:23 is
  unused. Rotation or revocation of either: not confirmed.
- The check relies on vitest's Vite being hoisted to
  `node_modules/.bin/vite`; a vitest release that nests it fails the target
  loudly.

## Context pressure
ok

## Next action
none (done).
