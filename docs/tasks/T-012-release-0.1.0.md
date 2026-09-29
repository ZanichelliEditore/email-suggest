# T-012 — Release `v0.1.0`

- **Type:** build
- **Phase:** 2
- **Status:** todo
- **Depends on:** T-011, owner: `GEMFURY_ACCOUNT` variable and
  `GEMFURY_PUSH_TOKEN` secret set
- **Created:** 2026-09-29

## Goal
Tag `v0.1.0` is pushed and the publish run starts.

## In scope
- Confirm T-011's CI run green, the variable and secret exist
  (`gh variable list`, `gh secret list`), and `package.json` `version` is
  `0.1.0`.
- Push tag `v0.1.0` only after the owner's explicit go in this session:
  a published version cannot be taken back. The owner may push it instead.

## Out of scope
- Waiting for or checking the publish run: the task ends at the push
  (§14.1); T-013 checks it first.

## Spec sections to read
- SPEC.md §9

## Files expected to change
- none (`package.json` is already `0.1.0`; if a bump were ever needed,
  it is a commit with its own CI wait, and ends the task)

## Acceptance
CI green on the commit to tag; `package.json` `version` is `0.1.0`; tag
`v0.1.0` pushed after the owner's explicit go.

---
*Filled at `/handoff`:*

## Done
Commits and tests, not narration.

## Dead ends
none

## Open doubts
none

## Context pressure
low | ok | tight | overflowed — and, if tight or overflowed, how it should
have been split.

## Next action
Only if the status is still `doing`: the exact first step for the next
session.
