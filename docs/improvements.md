# Improvements backlog

Deferred ideas and known gaps — things not yet decided (so not an RFC) and not
current state (so not `architecture/`). Keep entries concrete; promote anything
that needs a real decision into an RFC in `docs/rfc/proposed/`.

**Start each entry with the short commit you're at (`git rev-parse --short HEAD`) and today's date, separated by ` · `, in square brackets**, so every idea is anchored to both the code it refers to and when it was raised.

`make improvement TEXT="<idea>"` appends a correctly-stamped entry here.

## Known gaps

- [a1b2c3d · YYYY-MM-DD] _Add the first gap or deferred idea here._
- [5d46e69 · 2026-09-28] docs/rfc/active/2026-09-28-dev-stack.md:125 — arm64 bullet says 'all three tools' publish arm64 builds; the native binaries are TypeScript, Biome and rolldown (vitest's native part), not vitest itself. Wording only (T-001 scoped rfc-reviewer round, parked).
- ~~[3eab034 · 2026-09-29] .github/workflows/quality.yml:24-26 — CI runs ruff and gitleaks directly, never Biome: CI green does not mean Biome passed until CI runs make quality through Docker (SPEC §8, Phase 2) (T-003 scoped review, parked).~~ Resolved 2026-09-29 by T-010: the `quality` job's one gate step is `make quality`.
- [3eab034 · 2026-09-29] Makefile:62 — a Dockerfile change alters the deps stamp, but docker compose run does not rebuild the image, so npm ci reruns in the old image; a rebuild is still manual (docker compose build) (T-003 scoped review, parked).
- [3eab034 · 2026-09-29] Makefile:69 — --error-on-warnings does not fail on info-level diagnostics; unchecked whether any Biome 2.5 recommended rule defaults to info (T-003 scoped review, parked).
- [3eab034 · 2026-09-29] Makefile:59-61 — deps comment says 'only when package.json or the lockfile differ' then adds .npmrc and Dockerfile; wording lags DEPS_INPUTS (T-003 scoped review, parked).
- ~~[30f8fc4 · 2026-09-29] package.json:1 — no "files" field and no .npmignore, so npm pack falls back to .gitignore, which lists dist/: the tarball would ship without dist/ and ./dist/index.js would not resolve; add "files": ["dist"] in the Phase 2 pack-smoke-test task (T-004 review, parked).~~ Resolved 2026-09-29 by T-009: `"files": ["dist"]`, guarded by `make pack-smoke`.
- [eb8ddda · 2026-09-29] test/domains.test.ts:8-12: lowercase guard passes malformed entries (" gmail.com", "gmail.com ", "gmail.com."); SPEC §5 asks only lowercase (T-005 review, parked).
- [1975748 · 2026-09-29] test/suggest.test.ts:69-72 — the 1 MB timing cases do not pin the step-1.2 bound on its own: without it, distance(long label, "com") is still linear (~3M cells) and may pass under 500 ms; unmeasured (T-007 scoped review, parked).
- [1975748 · 2026-09-29] No make target for the no-Node gate (T-007 acceptance): the PATH shim of symlinks minus node/nodejs/npm/npx/corepack is rebuilt by hand each time (docs/journal.md, T-007). Candidate: make quality-no-node (T-007, parked).
- [14e7bf1 · 2026-09-29] .github/workflows/quality.yml:27 — pipx install ruff is unpinned while .pre-commit-config.yaml pins ruff v0.15.17; now that ruff runs inside CI's make quality, a ruff release changing format style or default rules can turn CI red with the local gate green (T-010 review, parked).
