# Architecture overview

## Components

### Tooling & process

- **`AGENTS.md`** — the contract every contributor (human or AI) works from: the navigation map, the command surface, and the four execution principles.
- **`docs/`** — `architecture/` (this map, reflecting the active RFCs) and `rfc/` (the decision lifecycle `proposed/` → `active/` → `superseded/`/`retired/`).
- **`tools/checks/`** — scripts that enforce the RFC/docs conventions mechanically (e.g. keeping each RFC in the folder its Status names).
- **Quality gate** — linters/formatters wired at the pre-commit, command-surface, and CI layers so violations are caught mechanically.
- **CI** (`.github/workflows/`) — the quality gate plus a secrets + dependency scan on every push/PR.
- **Publish** (`.github/workflows/publish.yml`) — on a `v*.*.*` tag only: `tools/checks/check_tag_version.py` fails unless the tag is `v` + `package.json` `version`, then `make quality`, whose `pack-smoke` leaves the tested tarball in `.pack/`; that job (`gate`, `contents: read` only) uploads it as an artifact. A second job (`publish`, the only one with `id-token: write` and the npm credential, no checkout) downloads it, checks its name and version against the tag, and `npm publish --access public --provenance` sends it to the public npm registry, from the runner with `actions/setup-node`'s Node 24 (npm needs the runner's OIDC variables; the gate and the tarball still use the Dockerfile's Node). `id-token: write` gives trusted publishing (OIDC, the only credential since T-017: no token exists) and provenance. No `make` target publishes (SPEC §9). Phase 2 (T-011); npm since [RFC 2026-10-06](../rfc/active/2026-10-06-publish-to-npm.md) (T-016); two jobs since its Decision 7 (T-019).
- **Dev stack** ([RFC](../rfc/active/2026-09-28-dev-stack.md)) — TypeScript 7 (`tsc`), vitest 5 and Biome 2, exact-pinned with a committed `package-lock.json` and installed only by `npm ci`, inside a digest-pinned `node:24-alpine` container; Node never runs on the host. `.npmrc` blocks install scripts, so `package.json` has no lifecycle or `pre`/`post` scripts and every step is a `make` target. Dependabot bumps minor, patch and digest; majors amend the RFC. Lands in T-002 to T-004.

### Product

A zero-dependency library ([SPEC](../../SPEC.md) §3–§5). Phase 1 (T-004 to T-007).

- **`src/index.ts`** — `suggest()` and the `Suggestion` type, the package's only exports: parses the address and runs the two matching steps of SPEC §4.
- **`src/distance.ts`** — Damerau-Levenshtein, optimal-string-alignment variant.
- **`src/domains.ts`** — the known-domain list, in priority order (SPEC §5).
- **`src/tld-typos.ts`** — the TLD typo map, typo to fix (SPEC §5).
- **`pack-smoke/`** — a consumer fixture, not shipped. `make pack-smoke`, part of `make quality`, packs the tarball into `.pack/` (`"files": ["dist"]` keeps it to `dist/` plus npm's defaults), installs it in a scratch dir inside the container, runs `consumer.ts` with Node, runs `legacy-fields.js` (fails unless the installed manifest's top-level `main` and `types` name shipped files, T-020) and typechecks `consumer.ts` with the repo's `tsc` against the shipped `.d.ts` (SPEC §10). Phase 2 (T-009).
- **`consumer-check/`** — a consumer fixture, not shipped. `make consumer-check`, outside `make quality` (it needs the network), copies it to the container's `/tmp`, installs the latest release, `0.1.2` since T-020 (`0.1.1`, T-017, was the first OIDC-published version), from the public npm registry (no token), checks the package came from `registry.npmjs.org`, runs `npm audit signatures` and requires its output to report a verified provenance attestation (the command alone exits 0 without one), then `vite build` with the Vite vitest pins in the lockfile, then `check.js` with Node (SPEC §13). Phase 2 (T-013); npm since T-016.
- **`examples/demo/`** — a demo page, not shipped. `make demo`, outside `make quality`, builds `dist/` and serves the page with the Vite vitest pins in the lockfile, on `127.0.0.1:5180` (`DEMO_PORT` overrides); `main.js` imports `../../dist/index.js`, which Vite serves as `/@fs/app/dist/index.js`. Owner request (T-015).

## Dependency rules

- `index.ts` imports the other three; they import nothing.
- Only `index.ts` is public: `package.json` `exports` maps `.` to `dist/index.*` and nothing else, and `test/suggest.test.ts` checks that `suggest` is its only runtime export. The import direction is not enforced mechanically.
