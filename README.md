# email-suggest

`@zanichelli/email-suggest` suggests a correction for a mistyped email
domain (`mario@lgmai.com` → `mario@gmail.com`). See [`SPEC.md`](./SPEC.md) §3
for the API.

## Installing

The package is on Zanichelli's private Gemfury npm registry. Ask the
package's maintainers for the account name (`<account>` below) and a
read-only **deploy token**, which they create in the Gemfury dashboard under
*Settings → Tokens*. Do not use a push token to install.

Add the scope to your project's `.npmrc`, and keep the token out of git by
reading it from the environment:

```ini
@zanichelli:registry=https://npm.fury.io/<account>/
//npm.fury.io/<account>/:_authToken=${GEMFURY_TOKEN}
```

```bash
GEMFURY_TOKEN=<deploy token> npm install @zanichelli/email-suggest
```

Releases are published only by CI, from a `v*.*.*` tag
(`.github/workflows/publish.yml`, SPEC §9).

## Getting started

This repository follows an agent-native setup. **Start with
[`AGENTS.md`](./AGENTS.md)** — the project map and command surface, which points at
[`INSTRUCTION.md`](./INSTRUCTION.md) for the standard contract (the four execution
principles).

Requires [`pre-commit`](https://pre-commit.com); the command surface also calls `ruff` directly, so put it on your PATH (pipx/uv/pip). The JS steps (Biome, tsc, vitest, and the pre-commit hook for `src/`, `test/` and root JSON) run in Docker: `make` needs Docker Compose, not Node.

```bash
make install   # set up git hooks (once)
make quality   # run the full local gate
```
