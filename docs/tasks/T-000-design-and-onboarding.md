# T-000 — Project design (SPEC) and onboarding

- **Type:** plan
- **Phase:** 0 (setup, before `/plan`)
- **Status:** done (2026-09-28)
- **Depends on:** none
- **Created:** 2026-09-28

## Goal
Agree the product and architecture with the owner and record them in
`SPEC.md`; bring the scaffold online (remote, CI, onboarding removed).

## In scope
- Brainstorm and write `SPEC.md` (§1–14).
- Rename the project from `toy` to `email-suggest`.
- Tie the repo to its GitHub remote and run `ONBOARDING.md`.

## Out of scope
- Any library code, the stack RFC, `/plan Phase 1`.

## Spec sections to read
- SPEC.md §13, §14

## Files expected to change
- `SPEC.md`, `AGENTS.md`, `README.md`, `.agent-native-setup.json`,
  `.github/workflows/quality.yml`, onboarding files (deleted)

## Acceptance
`SPEC.md` reviewed by the owner; CI green on GitHub for the pushed `main`.

---
*Filled at `/handoff`:*

## Done
- `2f2b924` SPEC.md: design agreed with the owner, 21-row acceptance table
  (§10) checked against the §4 algorithm with a throwaway script.
- `6c2d9f8` rename `toy` → `email-suggest` in 5 files.
- Remote `origin` = `ZanichelliEditore/email-suggest`; local history rebased
  onto the remote's `1f81a6d Initial commit` (LICENSE, MIT).
- `fd14a91` CI fix: map `GITLEAKS_LICENSE` into the gitleaks-action step;
  run 36409777167 green (both jobs).
- `a02a59d` onboarding scaffolding removed (ONBOARDING.md, 4 `onboard`
  triggers, AGENTS.md banner).
- Handoff commit: `code-reviewer` findings applied to SPEC.md (boundary and
  step-2 rows added to §10, §2/§7/§14 wording, Phase 1/2 acceptance made
  container-only, single-label guard in §4); `docs/CONTRACT.md` removed
  after its merge into SPEC.md.

## Dead ends
- Adding the `GITLEAKS_LICENSE` secret alone and re-running: still failed,
  because the workflow never passed the secret to the step.

## Open doubts
- Onboarding step 6 (Dependabot security updates) not verified: no `gh`.
  Public repo, so on by default; owner to confirm in Settings → Code security.
- Dependabot PR #1 is red on gitleaks: Dependabot PRs can't read Actions
  secrets. Owner to add `GITLEAKS_LICENSE` under Dependabot secrets and
  comment `@dependabot rebase`.
- The repo is public. Owner said "internal use"; confirm public is intended.
- Two §4 trade-offs need the owner's call before Phase 1 code:
  `gmail.it`/`gmail.ti` → `email.it`, and foreign ccTLDs of listed `.it`
  providers → `.it` (`yahoo.fr` → `yahoo.it`). Neither is in §10.

## Context pressure
ok. The session ran two tasks (design, then onboarding at the owner's
request); they should have been two sessions.
