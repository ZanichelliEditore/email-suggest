# T-012 — Release `v0.1.0`

- **Type:** build
- **Phase:** 2
- **Status:** done (2026-09-29)
- **Depends on:** T-011, owner: `GEMFURY_ACCOUNT` and
  `GEMFURY_PUSH_TOKEN` secrets set
- **Created:** 2026-09-29

## Goal
Tag `v0.1.0` is pushed and the publish run starts.

## In scope
- Confirm T-011's CI run green, both secrets exist (`gh secret list`;
  `GEMFURY_ACCOUNT` became a secret at T-011, 2026-09-29), and
  `package.json` `version` is `0.1.0`.
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
- Checked on entry (2026-09-29): CI `quality` green on `7f3dc30`,
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36600709140;
  `package.json` `version` `0.1.0`; `gh secret list` shows
  `GEMFURY_ACCOUNT` and `GEMFURY_PUSH_TOKEN`.
- Annotated tag `v0.1.0` (object `abdb05d`) on `7f3dc30`, pushed on the
  owner's explicit go (2026-09-29). Publish run failed at step
  `upload to Gemfury` (seen at handoff, log not read):
  https://github.com/ZanichelliEditore/email-suggest/actions/runs/36601141874
- No code change; `make quality` green before and after.

## Dead ends
none

## Open doubts
- Why the upload failed, and whether `0.1.0` reached Gemfury: proposed
  T-014.
- Whether Gemfury allows deleting a published version: still unverified.

## Context pressure
low

## Next action
none (done).
