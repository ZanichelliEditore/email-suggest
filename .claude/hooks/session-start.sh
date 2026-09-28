#!/usr/bin/env bash
# SessionStart hook: ground the session in time, then show the handoff.
# The date comes first: /resume states the handoff's age from it.
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
marker='.claude/.compacted'
echo "now: $(date -Iseconds)"
echo '--- docs/HANDOFF.md ---'
cat docs/HANDOFF.md 2>/dev/null || echo '(no handoff yet)'
if [ -f "$marker" ]; then
  echo "WARNING: $marker exists: a context was compacted since the last handoff; treat docs/HANDOFF.md as possibly behind."
fi
exit 0
