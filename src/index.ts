import { distance } from "./distance.js";
import { domains } from "./domains.js";
import { tldTypos } from "./tld-typos.js";

export interface Suggestion {
  address: string;
  domain: string;
}

/**
 * A corrected address for a likely typo in `email`'s domain, or null (SPEC
 * §3, matching per §4). Never throws: a non-string argument returns null.
 */
export function suggest(email: string): Suggestion | null {
  // The type says string; plain-JS callers may pass anything (§3).
  if (typeof email !== "string") {
    return null;
  }
  const trimmed = email.trim();
  const at = trimmed.lastIndexOf("@");
  if (at <= 0 || at === trimmed.length - 1) {
    return null;
  }
  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1).toLowerCase();
  // In §4, steps 1.1 and 1.2 end the call; here they fall through to step 2,
  // which finds nothing for them: 1.2 skips typo-map TLDs, and the
  // "no list entry is ever suggested" test covers 1.1.
  const fixed = matchDomain(domain) ?? fixTld(domain);
  return fixed === null
    ? null
    : { address: `${local}@${fixed}`, domain: fixed };
}

// Step 1: whole-domain match.
function matchDomain(domain: string): string | null {
  if (domains.includes(domain)) {
    return null;
  }
  const parts = splitLastLabel(domain);
  if (parts !== null && !tldTypos.has(parts.last)) {
    const sameNameTlds = domains.flatMap((known) => {
      const knownParts = splitLastLabel(known);
      return knownParts?.name === parts.name ? [knownParts.last] : [];
    });
    const otherTld = sameNameTlds.every(
      (last) => boundedDistance(parts.last, last, 1) >= 2,
    );
    if (sameNameTlds.length > 0 && otherTld) {
      return null;
    }
  }
  const threshold = domain.length <= 6 ? 1 : 2;
  let best: string | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const known of domains) {
    const d = boundedDistance(domain, known, threshold);
    // Strict: on a tie the earlier entry wins.
    if (d < bestDistance) {
      best = known;
      bestDistance = d;
    }
  }
  return bestDistance <= threshold ? best : null;
}

// Step 2: TLD fix.
function fixTld(domain: string): string | null {
  const parts = splitLastLabel(domain);
  if (parts === null) {
    return null;
  }
  const fix = tldTypos.get(parts.last);
  return fix === undefined ? null : `${parts.name}.${fix}`;
}

// The distance, or Infinity when the length difference alone exceeds max:
// the distance is never less than it, so no result changes, and a long input
// stays linear (security review, 2026-09-29).
function boundedDistance(a: string, b: string, max: number): number {
  return Math.abs(a.length - b.length) > max
    ? Number.POSITIVE_INFINITY
    : distance(a, b);
}

// Split at the last dot; null unless both sides are non-empty.
function splitLastLabel(domain: string): { name: string; last: string } | null {
  const dot = domain.lastIndexOf(".");
  if (dot <= 0 || dot === domain.length - 1) {
    return null;
  }
  return { name: domain.slice(0, dot), last: domain.slice(dot + 1) };
}
