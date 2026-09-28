# Journal

Append-only, dated. Learnings too small for an RFC. Newest at the bottom.

Use absolute dates only: a heading per day (`## YYYY-MM-DD`), and never
"today", "yesterday", "last session" or "next week" without the date it
stands for. End an entry with the task id it came from.

## YYYY-MM-DD
- <what was learned, and the observation that proves it>. (T-NNN)

## 2026-09-28
- gitleaks-action on an organization repo needs a `GITLEAKS_LICENSE`
  secret, and the secret reaches the action only if the workflow maps it
  into the step's `env`. Creating the secret alone left run 36408753886 red;
  `fd14a91` added the mapping and run 36409777167 went green. (T-000)
- Dependabot PRs cannot read Actions secrets; they read Dependabot secrets.
  So Dependabot PR #1 stays red on gitleaks until the license is also added
  there (expected, not yet observed green). (T-000)
- `ZanichelliEditore/email-suggest` is public: its Actions API answers
  without authentication, which is how CI was observed without `gh`. (T-000)
- `.github/workflows/quality.yml` is a managed file in
  `.agent-native-setup.json` (hash-tracked), so `agent-native-setup update`
  may flag or overwrite the `GITLEAKS_LICENSE` line from `fd14a91`; re-apply
  it if an update drops it. (T-000)
- `docs/CONTRACT.md` was a faigo seed telling us to merge §13/§14 into
  `SPEC.md`; once merged it was deleted. `.agent-native-setup.json` still
  has `"first_run_banner": true` after the banner's removal; unverified
  whether an update re-adds the banner. (T-000)
