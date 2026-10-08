# T-021 — Known domain `scuola.istruzione.it`; release `0.1.3`

- **Type:** build
- **Phase:** owner request (outside SPEC §13)
- **Status:** doing (2026-10-08)
- **Depends on:** none
- **Created:** 2026-10-08

## Goal
`scuola.istruzione.it` is a known domain: typing it gives no hint, and a
near miss such as `scuola.istruzioni.it` is suggested it. `0.1.3` is on npm.

Owner request, 2026-10-08. Checked the same day: since the Ministry's
mail migration (switch-off of the old mailboxes, 2023-12-20) teachers and
ATA staff use `@scuola.istruzione.it`; head teachers, DSGA and Ministry
staff keep `@istruzione.it` (already listed). Sources: orizzontescuola.it
"Nuova e-mail @scuola.istruzione.it" articles; lentepubblica.it "posta
elettronica docenti ata switch off 20 dicembre 2023".

## In scope
- `src/domains.ts`: add `scuola.istruzione.it` under "Italian schools".
- `test/suggest.test.ts`: the `scuola.istruzioni.it` row, written first.
- SPEC §5 list, §4 cost line, §10 table row.
- `package.json` / lockfile `version` `0.1.3`; `make consumer-check` pin,
  SPEC §13 amendment and `docs/architecture/overview.md` follow.
- Tag `v0.1.3` only after the owner's explicit go.
- `/review` on the diff.

## Out of scope
- Dropping `posta.istruzione.it` (retired mailboxes, 2023-12-20): the
  owner's call, raised in the report.
- `scuola.istruzione.com` and other other-TLD forms: step 1.2 returns
  `null` for a TLD 2+ edits away, by design (SPEC §4).

## Spec sections to read
- SPEC.md §4
- SPEC.md §5
- SPEC.md §10

## Files expected to change
- `src/domains.ts`
- `test/suggest.test.ts`
- `SPEC.md`
- `package.json`, `package-lock.json`
- `Makefile` (`consumer-check`)
- `docs/architecture/overview.md`

## Acceptance
`test/suggest.test.ts` passes `x@scuola.istruzioni.it` →
`x@scuola.istruzione.it` and the "no list entry is ever suggested" guard;
`make quality` green; tag `v0.1.3` pushed after the owner's explicit go;
publish run for `v0.1.3` green (both jobs); `make consumer-check` exits 0
against `0.1.3`.

---
*Filled at `/handoff`:*

## Done

## Dead ends
none

## Open doubts
none

## Context pressure

## Next action
