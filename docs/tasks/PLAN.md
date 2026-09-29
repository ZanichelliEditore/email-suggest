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
taken: 0 · split points set at planning and not needed: 4.

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
| T-001 | Dev-stack RFC (typescript, vitest, biome, node image) | plan | none | RFC in `docs/rfc/active/` with `- **Status:** Active`, rfc-reviewer findings resolved, owner acceptance recorded; `make quality` green | done (2026-09-28) |
| T-002 | Docker dev environment | build | T-001 | `make shell` opens a container shell; `docker compose run --rm -T dev node --version` prints `v24.`; `make help` lists `shell`; `make quality` green | done (2026-09-28) |
| T-003 | JS toolchain; Biome in the gate and the pre-commit hook | build | T-002 | `make quality` green and shows Biome's check; `pre-commit run biome --all-files` passes; `grep -nE '^\s+(npm\|npx\|node) ' Makefile` empty | done (2026-09-29) |
| T-004 | `distance.ts`; typecheck, vitest and `make build` join the gate | build | T-003 | `make quality` green with vitest passing `test/distance.test.ts` (both empty, `""`/`abc` = 3, identical, one swap, `lgmai.com`/`gmail.com` = 2, `ca`/`abc` = 3) and typecheck run; `make build` emits `dist/distance.js` + `.d.ts` | done (2026-09-29) |
| T-005 | Known-domain list, with its guards | build | T-004 | `make quality` green with `test/domains.test.ts` passing: no duplicates, all lowercase | done (2026-09-29) |
| T-006 | TLD typo map, with its guard | build | T-004 | `make quality` green with `test/tld-typos.test.ts` passing: no key in the real-TLD set | done (2026-09-29) |
| T-007 | `suggest()` and Phase 1 close | build | T-004, T-005, T-006 | `make quality` green with Node's dirs removed from `PATH` (`command -v node` empty); vitest passes every §10 row and the "no list entry is suggested" guard; `make build` emits `dist/index.js` + `.d.ts` | done (2026-09-29) |

## Phase 2: distribution

*Re-plan note (2026-09-29):* planned by `/plan Phase 2`, approved by the
owner the same day. T-008, raised `proposed` at T-007's handoff, is sized
here as the phase's first row: it lands before `0.1.0` is packed. Owner
decisions at plan review: T-008 needs no RFC (owner SPEC amendment, as with
step 1.2) and keeps `email: string` in the `.d.ts`; T-013 reuses the
lockfile-pinned Vite (no new dependency) and imports the installed package
with Node; `consumer-check` is a make target outside `quality`; CI keeps its
`gitleaks-action` job; a wait on a green CI run ends the task (§14.1, read
literally); `make quality-no-node` stays parked. Split points drawn: T-009,
T-011, T-013. At the plan's `code-reviewer` round (2026-09-29): T-011 got
its split point (a red T-010 run ends the session) and a checkable
account-name line; T-013's `.env` holds the account slug too; T-013's row
now asks findings resolved.

| Id | Title | Type | Depends | Acceptance | Status |
|---|---|---|---|---|---|
| T-008 | `suggest` returns null for non-string input; SPEC §3 amendment | build | T-007 | SPEC §3 says `suggest` never throws and returns `null` for any non-string argument; `test/suggest.test.ts` covers `null`, `undefined`, a number and an object; `make quality` green | done (2026-09-29) |
| T-009 | Pack smoke test in the gate; `"files": ["dist"]` | build | T-008 | `make quality` green and shows `pack-smoke` passing (import, one call, consumer typecheck against the shipped `.d.ts`); with `"files"` removed, `make pack-smoke` fails | done (2026-09-29) |
| T-010 | CI runs `make quality` through Docker | build | T-009 | `quality.yml`'s `quality` job has one gate step, `make quality`; `make quality` green locally; pushed to `main` (the task ends at the push) | todo |
| T-011 | Publish workflow; README consumer docs | build | T-010 | T-010's CI run is green on entry; `publish.yml` triggers only on `v*.*.*` and runs tag/version check, `make quality`, build, publish; every `fury.io` hit in tracked files uses `<account>` or `vars.GEMFURY_ACCOUNT`; `make quality` green; pushed (ends at the owner setting `GEMFURY_ACCOUNT` and `GEMFURY_PUSH_TOKEN`) | todo |
| T-012 | Release `v0.1.0` | build | T-011 | CI green on the commit to tag; `package.json` `version` is `0.1.0`; tag `v0.1.0` pushed after the owner's explicit go (ends at the wait for the publish run) | todo |
| T-013 | Consumer check and Phase 2 close | build | T-012 | publish run for `v0.1.0` green; `make consumer-check` exits 0 (0.1.0 from Gemfury into a scratch Vite project in the container's `/tmp`, `vite build` succeeds, `deepStrictEqual` on `suggest("mario@lgmai.com")`); CI green for the tagged commit; `/review` and `/security-review` run, findings resolved or dismissed with a reason | todo |
