# Architecture overview

## Components

### Tooling & process

- **`AGENTS.md`** — the contract every contributor (human or AI) works from: the navigation map, the command surface, and the four execution principles.
- **`docs/`** — `architecture/` (this map, reflecting the active RFCs) and `rfc/` (the decision lifecycle `proposed/` → `active/` → `superseded/`/`retired/`).
- **`tools/checks/`** — scripts that enforce the RFC/docs conventions mechanically (e.g. keeping each RFC in the folder its Status names).
- **Quality gate** — linters/formatters wired at the pre-commit, command-surface, and CI layers so violations are caught mechanically.
- **CI** (`.github/workflows/`) — the quality gate plus a secrets + dependency scan on every push/PR.
- **Publish** (`.github/workflows/publish.yml`) — on a `v*.*.*` tag only: `tools/checks/check_tag_version.py` fails unless the tag is `v` + `package.json` `version`, then `make quality`, whose `pack-smoke` leaves the tested tarball in `.pack/`, then `curl` uploads that tarball to `https://push.fury.io/<account>/` with the `GEMFURY_PUSH_TOKEN` secret, from the runner (the dev image has no curl). The account is the repo variable `GEMFURY_ACCOUNT`, not a secret, so the log does not mask the package scope (T-014). No `make` target publishes (SPEC §9). Phase 2 (T-011).
- **Dev stack** ([RFC](../rfc/active/2026-09-28-dev-stack.md)) — TypeScript 7 (`tsc`), vitest 5 and Biome 2, exact-pinned with a committed `package-lock.json` and installed only by `npm ci`, inside a digest-pinned `node:24-alpine` container; Node never runs on the host. `.npmrc` blocks install scripts, so `package.json` has no lifecycle or `pre`/`post` scripts and every step is a `make` target. Dependabot bumps minor, patch and digest; majors amend the RFC. Lands in T-002 to T-004.

### Product

A zero-dependency library ([SPEC](../../SPEC.md) §3–§5). Phase 1 (T-004 to T-007).

- **`src/index.ts`** — `suggest()` and the `Suggestion` type, the package's only exports: parses the address and runs the two matching steps of SPEC §4.
- **`src/distance.ts`** — Damerau-Levenshtein, optimal-string-alignment variant.
- **`src/domains.ts`** — the known-domain list, in priority order (SPEC §5).
- **`src/tld-typos.ts`** — the TLD typo map, typo to fix (SPEC §5).
- **`pack-smoke/`** — a consumer fixture, not shipped. `make pack-smoke`, part of `make quality`, packs the tarball into `.pack/` (`"files": ["dist"]` keeps it to `dist/` plus npm's defaults), installs it in a scratch dir inside the container, runs `consumer.ts` with Node and typechecks it with the repo's `tsc` against the shipped `.d.ts` (SPEC §10). Phase 2 (T-009).
- **`consumer-check/`** — a consumer fixture, not shipped. `make consumer-check`, outside `make quality` (it needs the network and a read token), copies it to the container's `/tmp`, installs the published `0.1.0` from Gemfury with the fixture's `.npmrc` (the README's form: `${GEMFURY_ACCOUNT}` and `${GEMFURY_TOKEN}` from the gitignored `.env`), checks the package came from `npm.fury.io`, runs `vite build` with the Vite vitest pins in the lockfile, then `check.js` with Node (SPEC §13). Phase 2 (T-013).

## Dependency rules

- `index.ts` imports the other three; they import nothing.
- Only `index.ts` is public: `package.json` `exports` maps `.` to `dist/index.*` and nothing else, and `test/suggest.test.ts` checks that `suggest` is its only runtime export. The import direction is not enforced mechanically.
