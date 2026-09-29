# Journal

Append-only, dated. Learnings too small for an RFC. Newest at the bottom.

Use absolute dates only: a heading per day (`## YYYY-MM-DD`), and never
"today", "yesterday", "last session" or "next week" without the date it
stands for. End an entry with the task id it came from.

## YYYY-MM-DD
- <what was learned, and the observation that proves it>. (T-NNN)

## 2026-09-28
- gitleaks-action on an organization repo needs a `GITLEAKS_LICENSE`
  secret, and the secret reaches the action only if the workflow maps it
  into the step's `env`. Creating the secret alone left run 36408753886 red;
  `fd14a91` added the mapping and run 36409777167 went green. (T-000)
- Dependabot PRs cannot read Actions secrets; they read Dependabot secrets.
  So Dependabot PR #1 stays red on gitleaks until the license is also added
  there (expected, not yet observed green). (T-000)
- `ZanichelliEditore/email-suggest` is public: its Actions API answers
  without authentication, which is how CI was observed without `gh`. (T-000)
- `.github/workflows/quality.yml` is a managed file in
  `.agent-native-setup.json` (hash-tracked), so `agent-native-setup update`
  may flag or overwrite the `GITLEAKS_LICENSE` line from `fd14a91`; re-apply
  it if an update drops it. (T-000)
- `docs/CONTRACT.md` was a faigo seed telling us to merge §13/§14 into
  `SPEC.md`; once merged it was deleted. `.agent-native-setup.json` still
  has `"first_run_banner": true` after the banner's removal; unverified
  whether an update re-adds the banner. (T-000)
- A matching rule checked only against the §10 table can still be wrong
  off the table: the first step 1.2 draft ("any two-letter label") passed
  every row in a scratch Python model, yet silenced `libero.ot` and
  `gmail.cm`; `code-reviewer` found it by probing inputs outside the table.
  When amending §4, probe neighbours of each new row, not just the rows.
  (Phase 1 plan)
- Adding `GITLEAKS_LICENSE` as a Dependabot secret fixed Dependabot PR #1:
  after `@dependabot rebase`, run 36414045331 went green and the owner
  merged it (`5d46e69`). Confirms the Dependabot-secrets entry above.
  (T-001)
- npm's `ignore-scripts=true` is silent and wider than install scripts: it
  also skips the package's own `prepack`/`prepublishOnly` and the
  `pre`/`post` hooks of any script run by name. Anything that must run
  belongs in a `make` target, not in `package.json` scripts. (T-001)
- A Docker Hub tag's multi-arch index digest comes from the registry API
  without `docker pull`: token from `auth.docker.io`, then a `HEAD` on
  `/v2/library/node/manifests/<tag>` with the OCI index `Accept` header;
  `docker-content-digest` is the pin. (T-001)
- `make rfc-sync` exits 1 whenever it moves an RFC, by design (it asks you
  to review and `git add` the move); a non-zero exit there is not a
  failure. (T-001)
- The dev container runs as the host's UID:GID (`compose.yaml` `user:`,
  exported by the Makefile), not the image's fixed `node` user (UID 1000):
  on a Linux host whose UID is not 1000, `node` could not write the
  bind-mounted repo. So `/app/node_modules` is `0777` in the image rather
  than "owned by the run user" (unknown at build time), and `HOME=/tmp`
  gives a UID with no passwd entry a writable home. Probed with
  `HOST_UID=1234`: volume and `$HOME` writable. (T-002)
- A named volume mounted inside a bind mount makes Docker create the
  mount point on the host, root-owned: `./node_modules/` appears empty and
  owned by root after the first `docker compose run`. It is gitignored;
  `git clean` can still remove it. (T-002)

## 2026-09-29

- `npx <name>` with the tool missing from `node_modules` fetches the
  registry package of that *name* and, with no TTY (`-T`), installs it
  without a prompt. npm's `biome` is an unrelated package (0.3.3, env
  vars), not `@biomejs/biome`: a gate on `npx biome` could pass with no
  Biome run. Call `node_modules/.bin/<tool>` instead. (T-003)
- `biome check` exits 0 on warnings, and `noUnusedImports` is a
  warn-level recommended rule in Biome 2.5: the gate needs
  `--error-on-warnings`. (T-003)
- Biome 2.5 formats with tabs by default and ignores `.editorconfig`
  unless `formatter.useEditorconfig` is `true`. (T-003)
- `npm ci` works with `node_modules` as a named-volume mount point (no
  `EBUSY`), probed on the T-002 image. (T-003)
- Dependabot: `ignore` rules apply to security updates as well as version
  updates; GitHub's "security updates are always created regardless of
  `update-types`" note is under `allow`, not `ignore`. (T-003)
- TypeScript 7 `tsc` with `outDir` and no `rootDir` fails with TS5011
  ("common source directory … `rootDir` must be explicitly set") yet
  still emits, into `dist/src/`; `tsconfig.build.json` sets
  `rootDir: "src"`. Probed with `tsc -p` on the T-004 config. (T-004)
- The distance cases picked to tell OSA from Levenshtein and from
  unrestricted Damerau-Levenshtein did not pin the substitution cost or a
  swap at position 1: a cost-2 substitution and a `i > 2` swap guard both
  passed them. Mutation-probe each cost of a metric, not just the case
  that tells variants apart. (T-004)
- A lookup table keyed by untrusted input should be a `Map`, not an
  object literal: `obj["constructor"]` returns `Object.prototype`'s member,
  so a `Record` lookup fails open unless every call site uses
  `Object.hasOwn`. `src/tld-typos.ts` is a `ReadonlyMap`. (T-006)
- The no-Node gate can't just drop Node's directories from `PATH` on this
  host: `node` is also in `/usr/bin` and `/usr/local/bin`, beside `bash`,
  `make` and `docker`. The T-007 demo used a scratch directory of symlinks
  to every executable there except `node`, `nodejs`, `npm`, `npx` and
  `corepack`, plus `~/.local/bin` (pre-commit), so `command -v node` was
  empty. (T-007)
- `/security-review` diffs `origin/HEAD...`: it fails when `origin/HEAD`
  isn't set, and even then it sees only committed work. For an uncommitted
  task, run the review in the main session. (T-007)
- `distance()` is linear in the longer input when the other is short, but
  it allocates a row array per character. A 1 MB domain against the 32
  known ones took 13 s and 714 MB. `suggest` skips the computation when
  the length difference alone exceeds the bound, which changes no result
  because OSA distance ≥ the length difference. (T-007 security review)
- To test a "non-string returns null" guard, the object case should
  stringify to an input that would otherwise produce a result
  (`{ toString: () => "x@lgmai.com" }`). A plain object can't tell a
  `typeof` guard from a `String(x)` coercion: both give `null` for
  `"[object Object]"`. (T-008 review)
- `npm install` in a scratch dir reads project config from the scratch
  dir's own `package.json` folder, not the repo's, so the repo's `.npmrc`
  is silently dropped. `make pack-smoke` passes it as `--userconfig`.
  Node 24 runs the `.ts` consumer directly by stripping types, so the
  fixture needs no compile step. (T-009)
- A pack smoke test has two halves to probe: drop `"files"` (the import
  fails at runtime) and ship only `dist/*.js` (the typecheck fails with
  `TS7016`). A deliberate type error in the consumer alone proves `tsc`
  runs, not that it reads the shipped `.d.ts`. (T-009 review)
- `quality.yml`'s `quality` job now runs `make quality` with
  `fetch-depth: 0`. The file is managed (`.agent-native-setup.json`), so an
  `agent-native-setup update` that restores the template brings back the
  ruff-only job: CI stays green but stops running Biome, tsc, vitest and
  pack-smoke. Re-apply the `make quality` step and `fetch-depth: 0` if an
  update drops them. (T-010 review)
- Gemfury documents push tokens for `https://<token>@push.fury.io/<account>/`
  (`curl -F package=@<tgz>`), not for `npm publish`. The token goes to
  curl as `user = "<token>:"` on `--config -` stdin, so it never enters
  argv. A 3xx exits 0 even with `--fail-with-body`: check
  `%{http_code}`. (T-011)
- GitHub prints each step's `env:` in the run log and masks only
  secrets, not `vars.*`: on a public repo, a value that must stay out of
  sight goes in a secret even if it isn't a credential. (T-011 review)
- In a local test, `curl --output /dev/stderr` into a redirected file
  reopens the file and overwrites earlier output; capture the body on
  stdout instead. (T-011)
- A 403 from `push.fury.io` (`curl: (22) … error: 403`) came from a wrong
  account slug: the personal account where the organization's belonged.
  The token-as-user form (`user = "<token>:"`) was right; after the owner
  fixed the slug, a re-run of run 36601141874 uploaded `0.1.0` ("... ok").
  A re-run reads the current secrets and variables, but the workflow file
  of the tagged commit. (T-014)
- A secret is masked wherever its value appears, not only where it is
  used: with the account slug as a secret, the scope in
  `<scope>-email-suggest-0.1.0.tgz` printed as `***`. A value that is also
  the package scope can't usefully be secret. (T-014)
- A Gemfury push token authenticates on `api.fury.io` (`/1/users/me` and
  `/1/packages` return 200) yet gets 401 from `npm.fury.io` in every auth
  form (`_authToken`, Basic `token:`, Bearer, token in the URL). An API 200
  does not prove install access: installing needs a deploy token. (T-013)
- `/security-review` diffs against `origin/HEAD...`. In this clone
  `origin/HEAD` is unset, and once work is pushed to `main` the range is
  empty anyway, so a phase-close security review is done in the main
  session over `git diff <phase-start>`. (T-013)
- Biome's `check --error-on-warnings` passed an `index.html` whose
  `<meta charset="utf-8" />` `biome format` then rejected: the HTML
  formatter wants void elements without ` /`. `make quality` runs both, so
  the gate caught it; the pre-commit hook runs only `check`. (T-013)
