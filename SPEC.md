# SPEC — @zanichelli/email-suggest

The project's contract: product, architecture, phases. Sessions read only
the sections their task names. Design agreed with the owner on 2026-09-28.

## 1. Purpose and audience

A small browser-side library that spots likely typos in the domain of an
email address and suggests a correction ("Did you mean mario@gmail.com?").

- **Audience:** Zanichelli front-end teams, for internal forms.
- **Consumers:** modern bundled front-ends (React, Vue, Angular, Svelte)
  built with Vite or webpack, installing from npm.
- **Where it runs:** in the browser, with no server round-trip. It is a
  library, not a hosted service: the check is pure string logic, and an API
  would only add latency, hosting and uptime.

## 2. Scope and non-goals

In scope:
- Domain typos against a known list (`lgmai.com` → `gmail.com`,
  `icolud.com` → `icloud.com`).
- TLD typos on any domain (`studio-rossi.con` → `studio-rossi.com`).
- International and Italian consumer providers, and Italian school domains.

Non-goals (v1):
- **No syntax validation.** The form's `type="email"` or the team's own
  validator owns that. Malformed input never causes an error. Since nothing
  checks syntax, a malformed address may still get a domain suggestion
  (`mario rossi@gmial.com` → `mario rossi@gmail.com`).
- **No blocking.** A typo produces a suggestion only; the user may keep
  what they typed. The library never declares an address invalid.
- No UI component: each team renders its own hint.
- No options, no custom lists, no runtime configuration. Teams that need a
  domain added open a PR on the shared list (§5).
- No hosted API, no network access of any kind.
- Zanichelli's own domains are not in the list.

## 3. Public API

```ts
export interface Suggestion {
  address: string; // full corrected address, e.g. "mario@gmail.com"
  domain: string;  // corrected domain only, e.g. "gmail.com"
}

export function suggest(email: string): Suggestion | null;
```

`suggest` is the package's only runtime export; `Suggestion` is its only
type export.

- The input is trimmed, then split on the **last** `@`. If there is no `@`,
  or the local part or domain is empty, the result is `null`.
- `suggest` never throws, whatever the input string.
- The local part is returned exactly as typed, case included
  (`Mario.Rossi@lgmai.com` → `Mario.Rossi@gmail.com`).
- The domain is compared and returned lowercase.
- A domain already in the known list returns `null`. No match within the
  thresholds of §4 returns `null`.
- Synchronous, no side effects, no access to `window` or the DOM: safe under
  server-side rendering.

Usage, as the README shows it:

```ts
const s = suggest(input.value);
hint.textContent = s ? `Did you mean ${s.address}?` : "";
```

## 4. Matching

Runs on the lowercased domain, in two steps; the first step that yields a
match wins.

**Step 1: whole-domain match.**
1. If the domain is in the known list (§5), return `null`.
2. **Same name, other TLD.** Split the domain at its last dot into a
   *name* and a *last label* (`posta.istruzione.it` → `posta.istruzione`,
   `it`). If both are non-empty, the last label is not a key of the TLD
   typo map (§5), at least one known domain has the same
   name, and the typed last label is at least 2 edits (the distance of
   step 3) from the last label of every such known domain, return `null`.
   A listed provider on a TLD 2 or more edits away is taken as a different,
   real domain (`gmail.it`, `yahoo.fr`, `hotmail.de`); a TLD 1 edit away is
   a typo and goes on to step 3 (`gmail.co`, `gmail.cm`, `libero.ot`).
   Decided by the owner at Phase 1 plan review, 2026-09-28.
3. Compute the edit distance from the domain to every known domain, using
   Damerau-Levenshtein in its optimal-string-alignment variant: insertion,
   deletion, substitution and a swap of two adjacent characters each cost 1
   (`icolud.com` → `icloud.com` = 1).
4. Take the closest known domain. Accept it if its distance is within the
   threshold, which depends on the length of the **typed** domain:
   - 6 characters or fewer: at most 1 edit;
   - longer: at most 2 edits (`lgmai.com` → `gmail.com` = 2).
5. On a tie, the entry earlier in the list wins. The list is ordered by
   expected popularity.

**Step 2: TLD fix.** Only when step 1 found nothing, and only when the
name and last label of step 1.2 are both non-empty (`x@con` gets no
suggestion). If the domain's last
label is a key of the TLD typo map (§5), replace it with the mapped value.
The map is explicit, not a distance search, because many real TLDs sit one
edit apart (`.co`, `.cm`, `.om`, `.de`) and must never be "corrected".

**Known trade-offs**, accepted because suggestions are dismissable:
- A real but unlisted domain close to a listed one gets a suggestion
  (`libro.it` → `libero.it`).
- A typo-map TLD on a listed provider can land on a different listed
  provider rather than the intended one: `gmail.ti` → `email.it` (2 edits).
  Step 1.2 skips typo-map keys, and `gmail.ti` to `gmail.com` is 3 edits.

Cost: 32 domains of short strings per call, microseconds. Safe to call
on every keystroke.

## 5. Lists

Both lists are typed constants in the source (an array and a map), shipped
in the package, and change only by release:
- `src/domains.ts`: the known domains, ordered by priority;
- `src/tld-typos.ts`: the TLD typo map.

**Known domains**, in this order:
- Global: gmail.com, outlook.com, hotmail.com, live.com, icloud.com,
  yahoo.com, me.com, msn.com, googlemail.com, mac.com, aol.com,
  protonmail.com, proton.me, gmx.com, gmx.net, mail.com
- Italian consumer: libero.it, virgilio.it, alice.it, tim.it, tin.it,
  tiscali.it, hotmail.it, live.it, outlook.it, yahoo.it, fastwebnet.it,
  email.it, inwind.it, iol.it
- Italian schools: istruzione.it, posta.istruzione.it

`mail.com` is a real provider one edit from `gmail.com`. It is listed so its
users are not told to switch to Gmail.

**TLD typo map:**

| Typo | Fix |
|---|---|
| con, cmo, ocm, vom, xom, comm | com |
| ti, iy, itt | it |
| nte, ent, ner | net |
| ogr, rog | org |

**Guards**, each enforced by a test:
- No duplicates in the domain list, and every entry is lowercase.
- No list entry is ever suggested a correction.
- No key of the TLD typo map is a real TLD, checked against a hard-coded
  set of real TLDs near the keys (at least `co`, `cm`, `om`, `de`, `io`,
  `in`, `is`, `nl`, `ne`, `ec`, `er`). No current key collides; the guard
  protects future PRs.

**Changing a list:** a PR adding the entry plus a test case (`typo →
domain`), released as a patch version. The README explains how.

## 6. Package and build

- Name `@zanichelli/email-suggest`. Zero runtime dependencies.
- TypeScript, `strict`. `tsc` emits ES2020 ES modules plus `.d.ts` files.
  No bundler: consumers bundle.
- `package.json` sets `"type": "module"`, an `exports` map pointing at the
  compiled entry and its types, and `"sideEffects": false`.
- Dev dependencies: `typescript`, `vitest`, `@biomejs/biome` (lint and
  format). All three go through one RFC before any code (AGENTS.md rule 3).
- Source layout:

  ```
  src/index.ts        suggest()
  src/distance.ts     Damerau-Levenshtein (OSA)
  src/domains.ts      domain list
  src/tld-typos.ts    TLD typo map
  test/*.test.ts      vitest, table-driven
  ```

- Versioning: semver, starting at `0.1.0`; `1.0.0` once a first Zanichelli
  form uses it. A list change is a patch.

## 7. Local environment

Docker is the only local path; Node is not needed on the host.

- `Dockerfile`: a `node:24-alpine` dev image.
- `compose.yaml`: one service `dev`, with the repo mounted and
  `node_modules` in a named volume.
- The existing `make lint`, `make format` and `make test` targets keep their
  ruff and Python steps for `tools/` and gain the JS steps, which run through
  `docker compose run --rm dev …`. New targets `make build` and `make shell`
  run through the same container. Every target keeps a one-line `make help`
  description.
- The pre-commit hook runs Biome through the same container.

## 8. Quality gate and CI

- `make quality` gains the JS gate next to the existing ruff and gitleaks
  steps: Biome check, typecheck, tests, and the pack smoke test (§10).
- GitHub Actions runs `make quality` on every push to `main` and on every
  pull request (the existing `quality.yml` triggers), through the same Docker
  path as local. The Node version is pinned in one place: the Dockerfile.

## 9. Publishing

- Registry: Zanichelli's Gemfury npm registry.
- Only CI publishes, never a laptop. Pushing a tag matching `v*.*.*` runs
  the publish job:
  1. fail unless the tag without its leading `v` equals `package.json`
     `version`;
  2. `make quality`;
  3. build;
  4. `npm publish` to Gemfury.
- The push token is the repo secret `GEMFURY_PUSH_TOKEN`. The account name
  is the repo variable `GEMFURY_ACCOUNT`, never written in tracked files
  (AGENTS.md rule 2).
- The README documents the consumer's `.npmrc` scope line using the
  `<account>` placeholder, and where to get a read token.

## 10. Testing

**Unit tests (vitest, table-driven).** These cases are the acceptance table:

| Input | Expected |
|---|---|
| `mario@lgmai.com` | `mario@gmail.com` |
| `Mario.Rossi@icolud.com` | `Mario.Rossi@icloud.com` |
| `mario@Lgmai.com` | `mario@gmail.com` |
| `x@hotmial.com` | `x@hotmail.com` |
| `x@libero.ti` | `x@libero.it` |
| `x@istruzone.it` | `x@istruzione.it` |
| `x@yaho.it` | `x@yahoo.it` |
| `x@gmail.con` | `x@gmail.com` |
| `x@studio-rossi.con` | `x@studio-rossi.com` |
| `x@gmal.co` | `x@gmail.com` (7 characters, 2 edits) |
| `x@me.co` | `x@me.com` (5 characters, 1 edit) |
| `a@b@lgmai.com` | `a@b@gmail.com` (split on the last `@`) |
| `x@studio-rossi.ti` | `x@studio-rossi.it` (step 2) |
| `x@libro.it` | `x@libero.it` (documented trade-off, §4) |
| `x@gmail.ti` | `x@email.it` (documented trade-off, §4) |
| `x@gmail.co` | `x@gmail.com` (TLD 1 edit away, step 1.3) |
| `x@gmail.cm` | `x@gmail.com` (TLD 1 edit away, step 1.3) |
| `x@libero.ot` | `x@libero.it` (TLD 1 edit away, step 1.3) |
| `x@gmail.cim` | `x@gmail.com` (TLD 1 edit away, step 1.3) |
| `x@proton.` | `x@proton.me` (empty last label: step 1.2 skipped) |
| `x@ti.it` | `x@tim.it` (tie with `tin.it`: earlier entry wins) |
| `x@gmail.com` | `null` |
| `  x@GMAIL.COM  ` | `null` |
| `x@tin.it` | `null` |
| `x@mail.com` | `null` |
| `x@studio-rossi.co` | `null` (real TLD) |
| `x@studio-rossi.it` | `null` |
| `x@gmx.de` | `null` (step 1.2) |
| `x@ali.it` | `null` (6 characters, 2 edits from `alice.it`) |
| `x@gmail.it` | `null` (step 1.2) |
| `x@yahoo.fr` | `null` (step 1.2) |
| `x@hotmail.de` | `null` (step 1.2) |
| `x@con` | `null` (single label) |
| `""`, `mario`, `@gmail.com`, `mario@` | `null` |

Plus the list guards of §5, and unit tests of the distance function
(both strings empty, one empty, identical strings, a single swap, and
`ca`/`abc` = 3, which tells OSA from unrestricted Damerau-Levenshtein).

**Integration: pack smoke test.** `npm pack`, install the tarball into a
scratch directory inside the container, import `suggest` and call it once,
and typecheck a consumer file against the shipped `.d.ts`. This proves the
published `exports` map and types work, not just the source.

## 11. Safety core and data

- **Safety core: none.** `suggest` is a pure string function with no I/O,
  no network, no storage and no side effects. There is no dangerous
  capability to route through a core.
- The library handles email addresses only in memory and never stores or
  sends them.
- Personal data: the Gemfury account name and tokens stay out of git (§9).

## 12. Change process

- The dev-dependency stack (§6) is decided by an RFC in
  `docs/rfc/proposed/`, accepted before Phase 1's first code.
- Any runtime dependency, any option or configuration surface, and any
  network access each need an RFC first: each one reverses a non-goal of §2.

## 13. Phases with acceptance

### Phase 1: core library

The stack RFC is accepted, the Docker dev environment works, and `suggest()`
with its lists and unit tests is in place, with the JS gate part of
`make quality`.

**Acceptance:** on a host without Node, `make quality` passes, running the
JS gate inside Docker; the tests include every row of the §10 table, every
§5 guard and the distance-function tests; `make build` and `make shell` run
through the container; the pre-commit hook runs Biome.

### Phase 2: distribution

CI runs on every push, the pack smoke test is in the gate, and a version tag
publishes to Gemfury.

**Acceptance:** CI is green on GitHub for the tagged commit. Inside the dev
container, `0.1.0` installs from Gemfury into a scratch Vite project,
`vite build` succeeds, and a script in that project checks that
`suggest("mario@lgmai.com")` deep-equals `{ address: "mario@gmail.com",
domain: "gmail.com" }`.

## 14. Session discipline

The rules in `AGENTS.md` apply in full. Project-specific additions:

- Every JS/Node step goes through Docker (§7); the Python tooling targets
  (`tools/`, `install`, `rfc-sync`, `gitleaks`) stay on the host. A session
  that finds itself running `npm` or `node` on the host has stepped off the
  path: stop and fix the make target instead.
- A change to a list (§5) always ships with its test row in the same commit.

### 14.1. Sizing a task to one session

- One task is one of: a single `src/` module with its tests, one piece of
  infrastructure (Docker, CI workflow, publish job), or one RFC.
- A task expected to touch more than about six files, or to cross both the
  Docker setup and CI, gets a split point drawn at planning.
- Any task that waits on something outside the repo (a GitHub secret, a
  Gemfury token, a green CI run) ends at that wait: the rest is the next
  task.
