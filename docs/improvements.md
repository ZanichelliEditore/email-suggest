# Improvements backlog

Deferred ideas and known gaps — things not yet decided (so not an RFC) and not
current state (so not `architecture/`). Keep entries concrete; promote anything
that needs a real decision into an RFC in `docs/rfc/proposed/`.

**Start each entry with the short commit you're at (`git rev-parse --short HEAD`) and today's date, separated by ` · `, in square brackets**, so every idea is anchored to both the code it refers to and when it was raised.

`make improvement TEXT="<idea>"` appends a correctly-stamped entry here.

## Known gaps

- [a1b2c3d · YYYY-MM-DD] _Add the first gap or deferred idea here._
- [5d46e69 · 2026-09-28] docs/rfc/active/2026-09-28-dev-stack.md:125 — arm64 bullet says 'all three tools' publish arm64 builds; the native binaries are TypeScript, Biome and rolldown (vitest's native part), not vitest itself. Wording only (T-001 scoped rfc-reviewer round, parked).
- [5d46e69 · 2026-09-28] T-002: when writing the docker Dependabot group's update-types, check that digest refreshes land in the same grouped PR as minor/patch updates (docs/rfc/active/2026-09-28-dev-stack.md Decision 4; T-001 scoped rfc-reviewer round, parked).
