Resume work at the start of a session. Follow these steps in order and do not skip any.

1. Read `AGENTS.md` in full.
2. Read `docs/HANDOFF.md` in full. Note the commit hash it claims to describe and its `Written:` timestamp.
3. Run `date -Iseconds` and state the handoff's **age**: now minus `Written:`, in hours if under two days, in days otherwise. Today's date alone is not an age. A missing or unparsable `Written:` line is a mismatch: report it. The one exception is the project's first session, when HANDOFF.md is still the unfilled skeleton (`<YYYY-...>` and `<hash>`): say so, and skip the age and the step 6 hash check.
4. Read `docs/tasks/PLAN.md`. Identify the task with status `doing`; if none, the first `todo` whose dependencies are `done`. A `proposed` row is never taken.
5. Read that task's file in `docs/tasks/`. Then read ONLY the `SPEC.md` sections it lists under "Spec sections to read".
6. Verify the repo matches the handoff:
   - `git log -1 --oneline` must show the stamp commit: exactly one commit after the hash HANDOFF.md describes, touching only `docs/HANDOFF.md`. Anything else is a mismatch unless HANDOFF explains it.
   - `git status` must be clean; if not, list what is dirty. Run `git fetch` and say whether the branch is in sync with its remote.
   - `.git/hooks/pre-commit` must exist (find it with `git rev-parse --git-path hooks/pre-commit`, which also works in a worktree). If it is absent, the hooks were never installed and every commit skips the gate without an error: that is a mismatch, and its fix is `make install`.
   - Run `make quality`. Run any test the handoff names as the checkpoint.
   - If `.claude/.compacted` exists, the previous session was compacted before its handoff: say so, treat HANDOFF.md as possibly incomplete, and delete the marker only after the owner acknowledges.
7. Report to the owner in at most 10 lines: the handoff's age, where the project is, which task this session takes and why, what you will do first, and every mismatch found in steps 3 and 6.
8. STOP and wait for the owner's go. Do not read further files and do not write anything before the go.
