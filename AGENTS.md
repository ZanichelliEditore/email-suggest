<!-- agent-native-setup:first-run — remove this block once ONBOARDING.md is done -->
> **First run — setup pending.** This repo was scaffolded by the `agent-native-setup` wizard
> (an agent-native setup); the tooling is in place but the one-time onboarding hasn't run
> yet. **Before other work, complete [`ONBOARDING.md`](./ONBOARDING.md)** — then delete
> it and remove this block.
<!-- /agent-native-setup:first-run -->

# email-suggest — Agent Contract

**Read [`INSTRUCTION.md`](./INSTRUCTION.md) first** — the standard engineering contract (the four execution principles, when to write an RFC, how this repo stays agent-native), kept current by `agent-native-setup update`. This file is the project-specific map; `CLAUDE.md`, `GEMINI.md`,
`.cursor/rules/`, and `.github/copilot-instructions.md` all point here.
@INSTRUCTION.md

## Navigation

| Topic | Where |
| --- | --- |
| Project entry point | [`README.md`](./README.md) |
| Architecture & decisions | `docs/architecture/` |
| Proposals & decisions | `docs/rfc/` (`proposed/` → `active/`) |
| How to contribute | [`CONTRIBUTING.md`](./CONTRIBUTING.md) |
| Security policy | [`SECURITY.md`](./SECURITY.md) |

## Command surface

```bash
make install  # set up git hooks (once)
make lint  # run linters
make format  # auto-format
make quality  # full local gate
make rfc-sync  # sync RFCs to their Status folder
make improvement TEXT="<idea>"  # log an idea in docs/improvements.md
```

Run `make help` for the full, current set.

**When you work out a repeatable process — a build, check, migration, or fix sequence you'd otherwise rediscover — capture it as a `make` target with a one-line description, so the next contributor runs it deterministically instead of leaving the knowledge in a chat or a throwaway script.**

<!-- faigo:rules -->
## Working method

These are the session method's rules. `INSTRUCTION.md` (managed) is the
generic engineering contract; where the two overlap, this section wins.

| Document | Where |
| --- | --- |
| Contract: product, architecture, phases | `SPEC.md` |
| Session handoff | `docs/HANDOFF.md` |
| Task list and status | `docs/tasks/PLAN.md` |
| Learnings too small for an RFC | `docs/journal.md` |

### Hard rules

1. **The safety core: none.**
   - If that is not `none`: it is the one path the project's dangerous
     capability goes through. Never add a second path, a bypass flag, an
     environment override or an escape hatch, and never weaken its checks.
     A change to the core goes through `/rfc` first, even when the owner
     asks for it mid-session. If a task appears to need such a change,
     stop, explain why, and wait.
   - With `none`: that is an honest answer, not a gap. When a task would
     give the project its first genuinely dangerous capability, stop and
     raise an RFC on whether it needs a safety core, before that
     capability's first caller.
2. **Personal data stays out of git.** A gitignore protects paths, not
   contents: **a tracked file whose contents name a real account is
   personal data, whatever its path**: a script, a task file, a journal
   entry. Real values go in a gitignored file the tracked one reads, and
   committed prose names an account by its slug. If gitleaks fires, the
   secret is already in the working tree: rotate it, don't just unstage it.
3. **No way around the checks.** `--no-verify` is never acceptable. New
   dependencies go through `/rfc`.

### Session discipline (SPEC.md §14)

4. **One session, one task.** Start every session with `/resume` and do
   not write code until the owner says go. End every session with
   `/handoff`. Never begin a second task in the same session, even if
   there is context left. If a task is turning out bigger than one
   session, say so early and propose a split point; do not push through.
5. **Read what the task lists, not everything.** `AGENTS.md`,
   `docs/HANDOFF.md`, `docs/tasks/PLAN.md` and the current task file in
   full; of `SPEC.md`, only the sections the task names, unless
   the task is a `plan` or a `spike`. Read files with ranges and `grep`;
   never dump a large file into context.
6. **Handoffs point, they don't narrate.** "See commit `abc123` and
   `tests/test_x.py::test_y`" beats three paragraphs. Dead ends and open
   doubts are mandatory sections; an empty one must say "none".
7. **Time lives in the documents.** A session can't tell how much time has
   passed unless the documents say. HANDOFF's `Written:` line comes from
   `date -Iseconds`, and `/resume` states the handoff's age from it. Every
   status change carries its date: `doing (YYYY-MM-DD)`, never a bare
   `doing`. Durable documents use absolute dates only: never "today",
   "yesterday", "last session" or "next week" without the date they stand
   for.
8. **Sub-agents are read-only.** `code-reviewer`, `rfc-reviewer`,
   `planner` and any explore or search agent may report findings; only the
   main session writes code, files, or commits. Read-only means the whole
   machine, not just the repo: a reviewer does not run the suite, run a
   mutation harness, delete a cache or write a scratch file, and reads
   file contents with `Read`/`Grep`/`Glob` rather than shelling out. A
   reviewer that shells out costs the owner a permission prompt per call.
9. **At most two review rounds per row: one full, then one scoped to the
   fixes that changed a mechanism.** In the scoped round, take only a
   finding that **falsifies an acceptance line** or **opens a fail-open
   path**; park everything else in `docs/improvements.md` with its
   `file:line`. **If the scoped round's fixes change a mechanism again,
   stop and report to the owner**; do not open a third round on your own.
   Rounds that keep finding mechanism changes mean the mechanism is not
   settled, which is a decision, not a review.
10. **A red `make quality` is not a handoff.** Fix it or document
    exactly what is red and why in `docs/HANDOFF.md`, and say so to the
    owner.

### Before marking a phase done

- The phase's acceptance in `SPEC.md` §13 is met
  and demonstrated (test output, or a screenshot for UI phases).
- `/review` has been run on the diff and its findings resolved or
  explicitly dismissed with a reason. **A review agent that produced no
  output is a red gate, not a pending one**: rerun it, or redo the review
  in the main session and say so. Watch a delegated reviewer by its
  **transcript's size, following the link** (`stat -L -c %s` on the output
  path), never by plain `stat` and never by `ListAgents`. The output path
  is a symlink: plain `stat` measures the link, whose size never changes.
  No growth for two minutes changes the **action, not the threshold**:
  start the review's redo in the main session and **leave the agent
  running**; kill it only if it blocks the session. Stillness cannot tell a
  hang from a final report being written, so if its report arrives late,
  **compare it with the redo** rather than discarding it, and record both.
- `make quality` is green.
- No secrets or personal config in the diff.
<!-- /faigo:rules -->
