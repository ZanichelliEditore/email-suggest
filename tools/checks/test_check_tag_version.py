"""Tests for the publish job's tag/version check (stdlib unittest)."""

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

_HELPER = Path(__file__).resolve().parent / "check_tag_version.py"
_spec = importlib.util.spec_from_file_location("check_tag_version", _HELPER)
assert _spec and _spec.loader
check_tag_version = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(check_tag_version)


class Mismatch(unittest.TestCase):
    def test_matching_tag_passes(self) -> None:
        self.assertIsNone(check_tag_version.mismatch("v0.1.0", "0.1.0"))

    def test_other_version_fails(self) -> None:
        self.assertIsNotNone(check_tag_version.mismatch("v0.1.1", "0.1.0"))

    def test_tag_without_leading_v_fails(self) -> None:
        self.assertIsNotNone(check_tag_version.mismatch("0.1.0", "0.1.0"))

    def test_only_one_leading_v_is_dropped(self) -> None:
        self.assertIsNotNone(check_tag_version.mismatch("vv0.1.0", "0.1.0"))

    def test_suffix_after_version_fails(self) -> None:
        # The trigger's glob `v*.*.*` also matches `v0.1.0-rc.1`.
        self.assertIsNotNone(check_tag_version.mismatch("v0.1.0-rc.1", "0.1.0"))

    def test_empty_tag_fails(self) -> None:
        self.assertIsNotNone(check_tag_version.mismatch("", "0.1.0"))

    def test_empty_version_fails_even_for_a_bare_v(self) -> None:
        self.assertIsNotNone(check_tag_version.mismatch("v", ""))

    def test_message_names_both_values(self) -> None:
        message = check_tag_version.mismatch("v0.2.0", "0.1.0")
        assert message is not None
        self.assertIn("v0.2.0", message)
        self.assertIn("0.1.0", message)


class Main(unittest.TestCase):
    def _run(self, argv: list[str], package: dict[str, str]) -> int:
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "package.json"
            path.write_text(json.dumps(package))
            return check_tag_version.main(argv, path)

    def test_exit_zero_on_match(self) -> None:
        self.assertEqual(self._run(["v0.1.0"], {"version": "0.1.0"}), 0)

    def test_exit_one_on_mismatch(self) -> None:
        self.assertEqual(self._run(["v0.1.1"], {"version": "0.1.0"}), 1)

    def test_exit_two_without_a_tag_argument(self) -> None:
        self.assertEqual(self._run([], {"version": "0.1.0"}), 2)

    def test_exit_one_when_package_has_no_version(self) -> None:
        self.assertEqual(self._run(["v0.1.0"], {}), 1)


if __name__ == "__main__":
    unittest.main()
