// Runs in the scratch copy after the tarball is installed (make pack-smoke).
// TypeScript with `moduleResolution` `node10` ignores the "exports" map and
// finds the types only through top-level "main" and "types" (T-020), so the
// installed manifest must carry both, each naming a file the tarball shipped.
import { readFileSync, statSync } from "node:fs";

const dir = "node_modules/@zanichelli/email-suggest";
const manifest = JSON.parse(readFileSync(`${dir}/package.json`, "utf8"));
for (const field of ["main", "types"]) {
  const path = manifest[field];
  if (
    typeof path !== "string" ||
    !statSync(`${dir}/${path}`, { throwIfNoEntry: false })?.isFile()
  ) {
    throw new Error(
      `package.json "${field}" is ${JSON.stringify(path)}: not a shipped file`,
    );
  }
}
