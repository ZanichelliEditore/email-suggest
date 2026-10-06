# T-020 — Top-level `main` and `types`; release `0.1.2`

- **Type:** build
- **Phase:** owner request (outside SPEC §13)
- **Status:** done (2026-10-06)
- **Depends on:** T-017
- **Created:** 2026-10-06

## Goal
A consumer whose TypeScript ignores `exports` (`moduleResolution`
`node`/`node10`) finds the package's types: `package.json` carries
top-level `main` and `types` beside `exports`, and `0.1.2` is on npm.

Reported 2026-10-06 by a consumer's webpack + ts-loader build: `TS2307:
Cannot find module '@zanichelli/email-suggest' or its corresponding type
declarations.` Webpack itself resolved the module (no "Module not found"):
only the type lookup failed.

## In scope
- `package.json`: `"main": "./dist/index.js"`, `"types":
  "./dist/index.d.ts"`; `version` `0.1.2`.
- `pack-smoke`: fail when `main` or `types` is missing from the packed
  manifest or names a file absent from the tarball (the regression test).
- SPEC §6: a dated amendment naming the two fields and why.
- `make consumer-check`: pin moves to `0.1.2`.
- Tag `v0.1.2` only after the owner's explicit go; publish by OIDC.
- `/review` on the diff.

## Out of scope
- `"module"` field: `main` already points at ESM (`"type": "module"`), so
  it would name the same file.
- A CommonJS build (`require()` on Node before 20.19 / 22.12 still fails
  with `ERR_REQUIRE_ESM`): a separate decision, RFC first.
- A typecheck under an older TypeScript with `node10` resolution: needs a
  second TypeScript, i.e. a new dependency (RFC).
- T-018 (Dependabot PR #2).

## Spec sections to read
- SPEC.md §6
- SPEC.md §9

## Files expected to change
- `package.json`
- `Makefile` (`pack-smoke`, `consumer-check`)
- `SPEC.md` (§6)
- `docs/journal.md`

## Acceptance
`make pack-smoke` fails with `main` or `types` removed from
`package.json` and passes with both; `npm view
@zanichelli/email-suggest@0.1.2 main types` prints `./dist/index.js` and
`./dist/index.d.ts`; publish run for `v0.1.2` green (both jobs); `make
consumer-check` exits 0 against `0.1.2`; `make quality` green.

---
*Filled at `/handoff`:*

## Done
- `3e74367`: `package.json` top-level `main`/`types`, version `0.1.2`
  (lockfile root lines too); `pack-smoke/legacy-fields.js` run by
  `make pack-smoke`; `consumer-check` pinned to `0.1.2`; SPEC §6
  amendment, §13 pin; `docs/architecture/overview.md`; journal.
- Regression shown before the fix: `make pack-smoke` red with `Error:
  package.json "main" is undefined: not a shipped file`. After it, red
  with `main` removed, `types` removed, `types` = `./dist/nope.d.ts`,
  `types` = `./dist` (directory); green with both.
- CI on `3e74367` green:
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37489101644
- Tag `v0.1.2` (annotated, on `3e74367`) pushed after the owner's go;
  publish run green (`gate`, `publish`):
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/37489298158
  (`+ @zanichelli/email-suggest@0.1.2` at 15:40:30Z, provenance signed).
- `npm view @zanichelli/email-suggest@0.1.2 main types`: `main =
  './dist/index.js'`, `types = './dist/index.d.ts'` (registry showed it
  at 2026-10-06T17:44:58+02:00).
- `make consumer-check` exit 0 against `0.1.2`: "1 package has a
  verified attestation", "consumer-check: suggest() from the npm package
  passed".
- `code-reviewer` full round: no blocker. Fixed: overview `0.1.1` pin
  and missing `legacy-fields.js` mention; `existsSync` accepted a
  directory (now `statSync(...)?.isFile()`). Dismissed: compare
  `main`/`types` with `exports` (not in acceptance; the `NodeNext`
  typecheck already exercises the `exports` types); SPEC §10 wording
  (§6 amendment states it). No mechanism change, no scoped round. No
  `/security-review`: manifest fields and a test script, no code path.

## Dead ends
none

## Open doubts
- Not observed: a real `node10` consumer (TypeScript 7.0.2 rejects it,
  `TS5108`); the manifest check stands in. The reporting consumer's
  build was not re-run here.

## Context pressure
low

## Next action
none: task done.
