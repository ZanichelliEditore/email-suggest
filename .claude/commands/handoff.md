Close the current task and prepare the next session. Follow these steps in order.

1. Run `make quality`. If anything is red, do NOT proceed to step 3: tell the owner what is red and ask whether to fix it now or record it. A recorded red state must be described precisely in HANDOFF.md under "Known red".
2. Run `/review` on the diff since the task started if not already done in this session; resolve or explicitly dismiss each finding.
3. Update the current task file in `docs/tasks/`:
   - "Done": what was delivered, pointing at commits (hashes) and tests (`path::name`), not narrating.
   - "Dead ends": what was tried and abandoned, and why. Write "none" if none.
   - "Open doubts": anything uncertain that the next session or the owner should judge. Write "none" if none.
   - "Context pressure": one of `low | ok | tight | overflowed`. If `tight` or `overflowed`, add a one-line suggestion on how the task should have been split.
   - Status: `done (YYYY-MM-DD)`, or `doing (YYYY-MM-DD)` with a precise "Next action" if unfinished. The date is the day of the change, from `date +%F`; never a bare status.
4. Update `docs/tasks/PLAN.md`: the task's status, dated the same way. If the task revealed missing or mis-sized later tasks, add them as rows with status `proposed` (no task file yet) and list them in HANDOFF.md under "Proposed plan changes" for the owner to confirm at the next `/resume` or `/plan`. Never change the status, order, acceptance or dependencies of other existing rows: that authority belongs to `/plan`. The one exception is when the current task is itself a `plan` task: then `/plan`'s authority extends through this handoff, and edits to rows created or re-planned in this session are in scope (record them in the re-plan note).
5. Run `date -Iseconds`, then rewrite `docs/HANDOFF.md` from scratch, one page at most. Its sections, in this order: "Written" (that timestamp, exactly as printed), "Describes commit" and its "CI" (filled in step 8), "Current task" with its dated status, "Next action" (the exact first step for the next session), "Read before anything else", "Reviews", "Proposed plan changes", "Open doubts", "Dead ends", "Known red", "Checkpoint" (what `make quality` printed: counts, not "green"). An empty section says "none".
6. Append to `docs/journal.md` any learning worth keeping that is too small for an RFC, under a `## YYYY-MM-DD` heading, each entry ending with the task id. Absolute dates only. Skip if nothing.
7. If `.claude/.compacted` exists, delete it now (the handoff you just wrote supersedes the compacted context).
8. Commit everything with the task id in the message (`T-NNN: <what changed>`). Never `--no-verify`. Then `git push`: **a handoff describes a pushed commit**, not a local one.

   Then observe CI for that commit (`gh run list --workflow=quality.yml --commit <hash>`, `gh run watch <id>`) and record in HANDOFF.md the hash, the run URL and `green`, or `red` with the reason under "Known red". The commit is already pushed by then, so record it in a follow-up stamp commit (`T-NNN: stamp handoff hash and CI`) and push that too; never amend a commit that is already on the remote. `/resume` expects HEAD to be exactly this stamp commit.

   If CI cannot be observed (no `gh`, no remote, no run appears), write exactly that in HANDOFF.md and say it to the owner. Never write "green" for a run you did not see. A red CI is a red `make quality`: fix it, or describe precisely what is red and why, and tell the owner. A fix is a new pushed commit: it becomes the hash HANDOFF.md describes, CI is observed again for it, and the stamp commit follows the last fix.
9. Tell the owner: "Handoff written at <hash>; CI <green | red | unobserved>. Close this session." Do not start anything else.
