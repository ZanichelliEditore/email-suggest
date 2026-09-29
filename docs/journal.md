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
