# First-run setup — toy

This repo was scaffolded by the `agent-native-setup` wizard — an agent-native setup. The
tooling is in place but hasn't been activated yet; the steps below are the
one-time bootstrap. If you're an AI assistant starting here for the first time,
do them now. The standing rules live in `AGENTS.md`; this file is only the
bootstrap, so **delete it once every step is done.**

> **Work the independent parts concurrently.** The big costs here are one-time —
> building hook environments, installing deps, waiting on CI. If your assistant
> can, start those installs in the background up front and run independent steps in
> parallel; but keep the baseline → commit → push → CI chain in order, and pause
> for the human-gated calls (adding secrets, repo-wide reformatting).

1. Read **AGENTS.md** — the contract for all work here. Everything below assumes you've read it. That plus this runbook is all you need to start — don't pre-read the whole repo; open other files only when a step calls for them.
2. Set up the toolchain: if `pre-commit` isn't on your PATH, install it first (`pipx install pre-commit`, or `pip install pre-commit`), then run `make install` — it installs the git hooks (lint, format, and the secret scan run before every commit). The commit-time guard hooks run `python3` helpers, so `python3` must be on your PATH too.
3. Run `make quality` once to establish a clean baseline. `make quality` runs `ruff` directly, so install it on your PATH first — the scaffold doesn't (e.g. `pipx install ruff`, or `uv tool install` each).
4. Commit the scaffold and your changes **directly to `main`** (the initial bootstrap, so no branch/PR is needed for the first commit), then push — that's what triggers CI (add a git remote first if there isn't one). An agent harness may pause for your approval on the direct-to-`main` push — that's expected for the first commit.
5. After your first push, confirm CI is green (`gh run watch`, or ask the maintainer to check the Actions tab) — local checks can't catch a missing action tag or a deprecated runner.
6. Turn on Dependabot's security (vuln-fix) updates — a repo setting `dependabot.yml` can't set (on by default for public repos; manual for private). With repo admin: `gh api --method PUT repos/{owner}/{repo}/vulnerability-alerts` then `gh api --method PUT repos/{owner}/{repo}/automated-security-fixes` (idempotent — a no-op where already on), else Settings → Code security.
7. **Delete this file**, remove the first-run banner from `AGENTS.md` (the `agent-native-setup:first-run` block at the top; `CLAUDE.md` and `GEMINI.md` symlink to `AGENTS.md`, so edit `AGENTS.md` only — all update together), and remove the `/onboard` trigger(s) (`.claude/commands/onboard.md`, `.cursor/commands/onboard.md`, `.github/prompts/onboard.prompt.md`, `.gemini/commands/onboard.toml`), then commit and push — this last commit only removes setup scaffolding, so no CI watch is needed — setup is done and `AGENTS.md` carries the standing rules.
