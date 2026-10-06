# Publish to the public npm registry with trusted publishing; retire Gemfury

- **Status:** Active
- **Date:** 2026-10-06
- **Author:** email-suggest team
- [ ] Implemented

## Context

SPEC §9 publishes `@zanichelli/email-suggest` to Zanichelli's private
Gemfury registry: on a `v*.*.*` tag, `publish.yml` runs the gate in Docker,
then `curl` uploads the tested tarball from `.pack/` to
`https://push.fury.io/<account>/` with the repo secret
`GEMFURY_PUSH_TOKEN`. Consumers need a read token and an `.npmrc` scope line
(README "Installing"). `0.1.0` is on Gemfury (T-012, T-014).

On 2026-10-06 the owner decided:

1. the package moves to the **public npm registry** (`registry.npmjs.org`);
   the npm organization `zanichelli`, which owns the `@zanichelli` scope,
   already exists. The package is public: this settles the open doubt
   "the repo is public although the owner said internal use";
2. Gemfury is **retired** for this package, not kept in parallel;
3. the first npm version is **`0.1.0`**, the version already released.

Constraints:

- **Only CI publishes, and only from a tag** (SPEC §9). This RFC keeps that.
- **npm publishing is close to irreversible.** `npm unpublish` works only
  within 72 hours and only without dependents, and a `name@version` can
  never be reused, even after an unpublish.
- **Trusted publishing (OIDC)** lets a GitHub-hosted runner publish with no
  stored token, and generates a provenance attestation automatically for a
  public repo and package. It needs npm ≥ 11.5.1, Node ≥ 22.14.0 and
  `permissions: id-token: write`
  ([npm docs](https://docs.npmjs.com/trusted-publishers)).
- **A trusted publisher can only be added to a package that already exists
  on the registry** ([`npm trust`](https://docs.npmjs.com/cli/v11/commands/npm-trust/)).
  The very first publish of `@zanichelli/email-suggest` therefore cannot
  use OIDC.
- npm checks the provenance attestation against `package.json`'s
  `repository.url`; `package.json` has no `repository` field today.
- The `v0.1.0` tag already exists and points at a commit whose
  `publish.yml` uploads to Gemfury. A tag-triggered run uses the workflow
  file of the tagged commit, so re-running that tag's workflow would upload
  to Gemfury again.

## Decision

**1. `publish.yml` runs `npm publish` on the runner, with Node from
`actions/setup-node`.** Steps 1–3 of SPEC §9 are unchanged: tag/version
check, then `make quality` in Docker, whose `pack-smoke` leaves the tested
tarball in `.pack/`. Step 4 changes: the `curl` upload becomes

```yaml
permissions:
  contents: read
  id-token: write
# ...
- uses: actions/setup-node@<current major>
  with:
    node-version: "24"            # the Dockerfile's major
    registry-url: https://registry.npmjs.org
- run: npm publish .pack/*.tgz --access public --provenance
```

The publish step keeps the `curl` step's guard: exactly one `.tgz` in
`.pack/`, or it fails.

It publishes the same tarball the gate tested, as the `curl` step does
today, and it runs on the runner for the same reason `curl` does: it needs
the runner's environment (here the OIDC request variables). `"24"` floats
within the major: setup-node takes the runner's cached Node 24. Early 24.x
releases bundled npm 11.3, below the 11.5.1 that OIDC needs; current ones
are above it (the dev image's npm is 11.19.0). A too-old npm fails the OIDC
exchange before uploading anything.

**2. `package.json` gains `repository`**
(`git+https://github.com/ZanichelliEditore/email-suggest.git`), so the
provenance check passes, and `"license": "MIT"`, matching `LICENSE`, so the
public npm page names it. The npm `0.1.0` tarball therefore differs from
the Gemfury `0.1.0` in `package.json` and in `README.md` (npm always packs
it; it gained T-015's Usage section and changes again under Decision 6).
`dist/` is built from the same `src/` with the same toolchain:
`git diff v0.1.0 HEAD -- src/ tsconfig*.json package.json
package-lock.json` is empty on 2026-10-06.

**3. Bootstrap `0.1.0` with one short-lived token, then switch to OIDC.**

1. The owner creates an npm **granular access token**: read and write on
   the `@zanichelli` scope only, expiry 7 days or less, with "bypass
   two-factor authentication" set if the account or the org requires 2FA
   for writes (otherwise the CI publish fails with `EOTP`, before
   uploading), and stores it as the
   repo secret `NPM_TOKEN`. During the bootstrap only, the publish step
   reads it as `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`.
2. The `v0.1.0` tag is moved to the commit that carries this RFC's
   workflow: delete the remote tag, re-tag, push. **This happens only on the
   owner's explicit go at that moment** (as T-012's tag push did).
   Before the delete: the old tag's commit (`7f3dc30`) goes into
   `docs/journal.md`, and the `git diff` of Decision 2, re-run against the
   new commit, must show no change to `src/` or the build toolchain
   other than the `package.json` fields above; anything else is listed in
   the journal before the go. The publish run puts `0.1.0` on npm with a
   provenance attestation.
3. The owner adds the trusted publisher on npmjs.com (package *Settings →
   Trusted publishing*: GitHub Actions, `ZanichelliEditore/email-suggest`,
   workflow `publish.yml`), then sets *Publishing access* to "Require
   two-factor authentication and disallow tokens", revokes the token and
   deletes the `NPM_TOKEN` secret.
4. A follow-up commit removes the `NODE_AUTH_TOKEN` line. From then on
   only OIDC can publish. Its first real run is the next release tag.

**4. Gemfury is retired.** Removed: the `curl` step,
the repo variable `GEMFURY_ACCOUNT`, the repo secret `GEMFURY_PUSH_TOKEN`,
`.env`'s Gemfury entries, `consumer-check/.npmrc` (it maps `@zanichelli`
to Gemfury), and every Gemfury mention in README, SPEC §9/§11,
`docs/architecture/overview.md`, the Makefile's `consumer-check` target and
comments, and `consumer-check/main.js` and `check.js`. SPEC §13's Phase 2
acceptance, already demonstrated against Gemfury, is not rewritten: it gets
a dated amendment citing this RFC. Task files and the journal keep their
history. The owner revokes the Gemfury push and deploy tokens, which also
closes HANDOFF's open doubt on rotating them. Deleting `0.1.0` from Gemfury
is the owner's call: whether Gemfury allows it is unverified, and the
account may serve other Zanichelli packages.

**5. `make consumer-check` installs from npm.** No token and no `.env`: it
installs `@zanichelli/email-suggest@0.1.0` into the scratch Vite project,
checks the lockfile's `resolved` URL starts with
`https://registry.npmjs.org/`, runs `npm audit signatures` (which verifies
the registry signature and the provenance attestation), then `vite build`
and `check.js` as today. It stays outside `make quality`: it needs the
network.

**6. README "Installing" becomes `npm install @zanichelli/email-suggest`.**
No `.npmrc`, no token.

The simplest viable option: the change replaces one upload step with npm's
documented publish path and removes every stored credential once the
bootstrap is done.

## Consequences

- **Easier:** consumers install with no token and no `.npmrc`. No
  long-lived publish credential exists after the bootstrap. Every release
  from `0.1.0` on carries a provenance attestation linking it to its commit
  and workflow run.
- **Harder or irreversible:** a published version cannot be taken back after
  72 hours, and its number is burned forever. The release tag is the only
  gate before that, so SPEC §9's tag/version check and the owner's go on
  each tag matter more than before.
- **The `v0.1.0` tag moves once.** Anyone who fetched it keeps the old
  object until they `git fetch --tags --force`. No GitHub release is
  attached to it.
- **Two Node installs on the publish path.** The gate and the tarball use
  the Dockerfile's Node; the upload uses setup-node's Node 24 on the runner.
  SPEC §8's "the Node version is pinned in one place" still holds for
  everything that builds or tests; the runner's Node only sends a finished
  tarball, as `curl` does today.
- **New Action dependency:** `actions/setup-node`, kept fresh by the
  existing Dependabot `github-actions` entry.
- **OIDC is unproven until the next tag.** The bootstrap publishes with the
  token; the OIDC-only path first runs at the next release. If it fails, it
  fails before uploading anything.
- **The `@zanichelli` scope on consumers' machines:** a consumer whose
  `.npmrc` maps `@zanichelli` to Gemfury for other packages would resolve
  this one from Gemfury too, where it stops at `0.1.0`. No known consumer
  installs it today besides `consumer-check`.
- **Public package:** anyone can read the code and the domain lists. Both are
  already public on GitHub.

## Alternatives considered

- **Keep Gemfury, or publish to both.** The owner chose to retire Gemfury
  (2026-10-06). Both would keep two credentials and two install paths.
- **A long-lived npm token instead of OIDC.** Simpler bootstrap, but a stored
  publish credential forever, and provenance would still need
  `id-token: write`. Rejected.
- **Publish from the dev container**, passing the runner's OIDC and
  provenance variables in with `-e`. Keeps one Node, but the set of
  `GITHUB_*`, `RUNNER_*` and `ACTIONS_*` variables npm and sigstore read is
  undocumented as a set and cannot be tested locally; each failed try costs
  another tag move. Rejected.
- **The runner's preinstalled Node, without setup-node.** Its version and
  bundled npm change with the runner image, unpinned. Rejected.
- **Owner publishes `0.1.0` by hand from a laptop** (`npm login`, then the
  tarball). No tag move, but it breaks "only CI publishes" and `0.1.0`
  would have no provenance. Rejected.
- **A `workflow_dispatch` trigger to publish `0.1.0` from `main`.** Avoids
  rewriting a published tag, and step 3.4's follow-up commit could remove
  the trigger again. But `check_tag_version.py` reads the tag from
  `GITHUB_REF_NAME`, so a run from `main` needs a version input or a
  bypass of SPEC §9's first check, for the one run that matters most.
  Moving one tag with no release attached costs less. Rejected.
- **Publish as `0.1.1` with a new tag.** No tag move, but the owner chose
  `0.1.0` (2026-10-06).

## Review and acceptance

- **rfc-reviewer, full round (2026-10-06):** 2 high, 2 medium, 2 low,
  all resolved in this draft. `consumer-check/.npmrc` joins Decision 4's
  removals. The npm `0.1.0` differs from Gemfury's in `README.md` too, the
  `src/`/toolchain diff since `v0.1.0` is checked and empty, and the old
  tag's commit is recorded before the move. The `workflow_dispatch`
  rejection now rests on the tag/version check. The token's 2FA bypass,
  Node 24's floating npm, the single-tarball guard, the `license` field and
  a dated SPEC §13 amendment are added. The fixes add steps and correct
  claims; no mechanism changed, so there is no scoped round (AGENTS.md
  rule 9).
- **Owner acceptance (2026-10-06):** accepted as reviewed, including the
  `v0.1.0` tag move (Decision 3.2), which still needs the owner's explicit
  go at the moment it happens.
