/** Known domains, ordered by priority (SPEC §5). */
export const domains: readonly string[] = [
  // Global
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "yahoo.com",
  "me.com",
  "msn.com",
  "googlemail.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "gmx.com",
  "gmx.net",
  // A real provider one edit from gmail.com, listed so its users are not
  // told to switch to Gmail.
  "mail.com",
  // Italian consumer
  "libero.it",
  "virgilio.it",
  "alice.it",
  "tim.it",
  "tin.it",
  "tiscali.it",
  "hotmail.it",
  "live.it",
  "outlook.it",
  "yahoo.it",
  "fastwebnet.it",
  "email.it",
  "inwind.it",
  "iol.it",
  // Italian schools
  "istruzione.it",
  "scuola.istruzione.it",
  "posta.istruzione.it",
];
