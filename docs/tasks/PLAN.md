# PLAN

Ordered task list. One task = one session (SPEC.md
§14.1). Statuses: `proposed | todo | doing | done | dropped`.

- **Every status change carries its date:** `doing (YYYY-MM-DD)`, never a
  bare `doing`. A session can't tell how much time has passed unless the
  documents say.
- A **`proposed`** row has been raised but not yet sized, whoever raised
  it: a `/handoff`, the owner, or an RFC accepted in session. It has no
  task file, and no session may take it until `/plan` or the owner
  confirms it as `todo`.
- A **`dropped`** row is kept, with one line saying where its work went.
- Only `/plan` reorders, re-scopes, merges or drops rows, or changes their
  dependencies or acceptance. `/handoff` may change only its own row's
  status and add `proposed` rows, except at the end of a `plan` task,
  where `/plan`'s authority carries through the handoff.
- The owner reviews every plan before its first task.

**Sizing calibration:** tasks that overflowed: 0 · tasks split after the
fact: 0 · sessions that ran two tasks: 1 · split points set at planning and
taken: 0 · split points set at planning and not needed: 0.

## Phase 0: setup

| Id | Title | Type | Depends | Acceptance | Status |
|---|---|---|---|---|---|
| T-000 | Project design (SPEC) and onboarding | plan | none | SPEC.md reviewed by owner; CI green on GitHub for pushed `main` | done (2026-09-28) |

## Phase 1: core library

*Re-plan note (2026-09-28):* planned by `/plan Phase 1`, approved by the
owner the same day. At plan review the owner split the lists task per list
(T-005, T-006) and settled the §4 foreign-TLD doubt: SPEC §4 gained step 1.2
and §10 gained its rows. After the handoff review: T-002/T-003 gained the
Dependabot entries, T-004 the OSA-telling distance tests, T-005/T-006 lost
their list-copy tests. At T-001's RFC acceptance (2026-09-28) the owner chose
Node 24 over 22: SPEC §7 and T-002's acceptance now say `v24.`.

| Id | Title | Type | Depends | Acceptance | Status |
|---|---|---|---|---|---|
| T-001 | Dev-stack RFC (typescript, vitest, biome, node image) | plan | none | RFC in `docs/rfc/active/` with `- **Status:** Active`, rfc-reviewer findings resolved, owner acceptance recorded; `make quality` green | doing (2026-09-28) |
| T-002 | Docker dev environment | build | T-001 | `make shell` opens a container shell; `docker compose run --rm -T dev node --version` prints `v24.`; `make help` lists `shell`; `make quality` green | todo |
| T-003 | JS toolchain; Biome in the gate and the pre-commit hook | build | T-002 | `make quality` green and shows Biome's check; `pre-commit run biome --all-files` passes; `grep -nE '^\s+(npm\|npx\|node) ' Makefile` empty | todo |
| T-004 | `distance.ts`; typecheck, vitest and `make build` join the gate | build | T-003 | `make quality` green with vitest passing `test/distance.test.ts` (both empty, `""`/`abc` = 3, identical, one swap, `lgmai.com`/`gmail.com` = 2, `ca`/`abc` = 3) and typecheck run; `make build` emits `dist/distance.js` + `.d.ts` | todo |
| T-005 | Known-domain list, with its guards | build | T-004 | `make quality` green with `test/domains.test.ts` passing: no duplicates, all lowercase | todo |
| T-006 | TLD typo map, with its guard | build | T-004 | `make quality` green with `test/tld-typos.test.ts` passing: no key in the real-TLD set | todo |
| T-007 | `suggest()` and Phase 1 close | build | T-004, T-005, T-006 | `make quality` green with Node's dirs removed from `PATH` (`command -v node` empty); vitest passes every §10 row and the "no list entry is suggested" guard; `make build` emits `dist/index.js` + `.d.ts` | todo |
