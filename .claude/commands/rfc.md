---
description: Scaffold a new RFC in docs/rfc/proposed/
---

Create a new RFC for: $ARGUMENTS

1. Pick a short kebab-case slug and today's date.
2. Copy `docs/rfc/TEMPLATE.md` to `docs/rfc/proposed/<YYYY-MM-DD>-<slug>.md`.
3. Fill in Context, Decision, and Consequences. Leave status as `Proposed`.
4. Run the `rfc-reviewer` subagent on the draft and resolve its findings.
5. **Re-run it if resolving those findings changed a decision's mechanism** —
   how it works, not how it reads. A round that only rewords is done; a round
   that replaces the means (a parser becomes a text scan, a net diff becomes a
   per-commit replay) has produced a draft the reviewer has not seen, and its
   consequences and alternatives are the parts most likely to be stale.
6. Show me the reviewed draft before considering it done.
