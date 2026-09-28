# HANDOFF

*Rewritten from scratch at every `/handoff`. One page. Point at artifacts
(commits, `path::test`, run URLs); don't narrate. An empty section says
"none".*

- **Written:** `<YYYY-MM-DDTHH:MM:SS+HH:MM>`, from `date -Iseconds` at the
  moment of writing. `/resume` computes this handoff's age from it.
- **Describes commit:** `<hash>`, pushed to `origin/<branch>`. **CI:**
  `<green | red | unobserved>` for that hash on `quality.yml`, with the
  run URL. Never "green" for a run nobody saw. This file arrives in the
  stamp commit right after that hash.

- **Current task:** `T-NNN` `<title>`, `<status (YYYY-MM-DD)>`.
  See `docs/tasks/<file>`.

- **Next action:** the exact first step for the next session.

- **Read before anything else:** what the next session must know before it
  opens a file. Traps, not history.

- **Reviews:** which reviews ran on this task, how many findings, and
  where they were resolved.

- **Proposed plan changes:** `proposed` rows this task added to
  `docs/tasks/PLAN.md`, for the owner or `/plan` to confirm.

- **Open doubts:** what the next session or the owner should judge.

- **Dead ends:** what was tried and abandoned, and why.

- **Known red:** anything red in `make quality` or CI, stated exactly.

- **Checkpoint:** what `make quality` printed (counts, not "green"),
  and any test the next session should rerun first.
