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

## Usage

`suggest` is the only export. Pass it what the user typed; show the hint if
it returns something:

```ts
import { suggest } from "@zanichelli/email-suggest";

const s = suggest(input.value);
hint.textContent = s ? `Did you mean ${s.address}?` : "";
```

It returns a `Suggestion` or `null`:

```ts
suggest("Mario.Rossi@lgmai.com");
// { address: "Mario.Rossi@gmail.com", domain: "gmail.com" }

suggest("info@studio-rossi.con");
// { address: "info@studio-rossi.com", domain: "studio-rossi.com" }
```

- `address` is the full corrected address, with the local part exactly as
  typed; `domain` is the corrected domain alone, lowercase.
- `null` means no hint: the domain is already known (`mario@gmail.com`), no
  known domain is close enough (`mario@unknown-company.it`), there is no `@`
  or one side of it is empty (`mario`, `mario@`), or the argument is not a
  string.
- It never throws, is synchronous and does not touch `window` or the DOM,
  so it is safe under server-side rendering.
- It only suggests: it does not validate syntax and never blocks a submit
  (SPEC §2). Let the user keep what they typed.

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
