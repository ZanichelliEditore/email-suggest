# email-suggest

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
