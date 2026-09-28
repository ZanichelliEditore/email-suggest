#!/usr/bin/env bash
# PreCompact hook: leave a marker so /resume and /handoff know this session's
# context was compacted before a handoff was written. Non-blocking.
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
marker='.claude/.compacted'
mkdir -p "$(dirname "$marker")"
echo "$(date -Iseconds) compaction" >> "$marker"
cat <<MSG
CONTEXT COMPACTION IS ABOUT TO HAPPEN. Before continuing after compaction:
re-read docs/HANDOFF.md and the current task file, and update the task
file's "Next action" now. A marker was written to $marker;
/handoff will clear it.
MSG
exit 0
