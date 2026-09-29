// Runs in a scratch copy next to the installed tarball (make pack-smoke), not
// against src/: the import resolves through the package's "exports" map and
// the types through the shipped .d.ts. Node 24 (pinned in the Dockerfile)
// strips the types itself, so there is no compile step before `node`.
import { type Suggestion, suggest } from "@zanichelli/email-suggest";

const result: Suggestion | null = suggest("mario@lgmai.com");
if (result?.address !== "mario@gmail.com" || result.domain !== "gmail.com") {
  throw new Error(`unexpected suggestion: ${JSON.stringify(result)}`);
}
