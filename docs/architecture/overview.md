# Architecture overview

> Brand-new project — only the agent-native scaffolding exists so far. The tooling
> components below are pre-filled (the wizard built them); add the product
> components and dependency rules as real code lands.

## Components

### Tooling & process

- **`AGENTS.md`** — the contract every contributor (human or AI) works from: the navigation map, the command surface, and the four execution principles.
- **`docs/`** — `architecture/` (this map, reflecting the active RFCs) and `rfc/` (the decision lifecycle `proposed/` → `active/` → `superseded/`/`retired/`).
- **`tools/checks/`** — scripts that enforce the RFC/docs conventions mechanically (e.g. keeping each RFC in the folder its Status names).
- **Quality gate** — linters/formatters wired at the pre-commit, command-surface, and CI layers so violations are caught mechanically.
- **CI** (`.github/workflows/`) — the quality gate plus a secrets + dependency scan on every push/PR.
- **Dev stack** ([RFC](../rfc/active/2026-09-28-dev-stack.md)) — TypeScript 7 (`tsc`), vitest 5 and Biome 2, exact-pinned with a committed `package-lock.json` and installed only by `npm ci`, inside a digest-pinned `node:24-alpine` container; Node never runs on the host. `.npmrc` blocks install scripts, so `package.json` has no lifecycle or `pre`/`post` scripts and every step is a `make` target. Dependabot bumps minor, patch and digest; majors amend the RFC. Lands in T-002 to T-004.

### Product

_TODO: list the application's own components and their responsibilities as they land._

## Dependency rules

_TODO: state which parts may depend on which. Enforce mechanically (e.g. with an
architecture test) once the boundaries stabilize._
