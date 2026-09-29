"""Fail unless a release tag equals `v` + package.json's version (SPEC §9 step 1).

Run by `.github/workflows/publish.yml` as its first step:

    python3 tools/checks/check_tag_version.py "$GITHUB_REF_NAME"

Exit codes: 0 match, 1 mismatch, 2 usage error.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

PACKAGE_JSON = Path(__file__).resolve().parents[2] / "package.json"


def mismatch(tag: str, version: str) -> str | None:
    """Return why `tag` does not name `version`, or None when it does."""
    if not version:
        return "package.json has no version"
    if tag == f"v{version}":
        return None
    return f"tag {tag!r} does not match package.json version {version!r} (expected 'v{version}')"


def main(argv: list[str], package_json: Path = PACKAGE_JSON) -> int:
    if len(argv) != 1:
        print("usage: check_tag_version.py <tag>", file=sys.stderr)
        return 2
    version = json.loads(package_json.read_text()).get("version", "")
    error = mismatch(argv[0], version)
    if error:
        print(f"check_tag_version: {error}", file=sys.stderr)
        return 1
    print(f"check_tag_version: {argv[0]} matches package.json")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
