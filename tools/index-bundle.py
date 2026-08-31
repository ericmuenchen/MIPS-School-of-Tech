#!/usr/bin/env python3
"""Edit the generated landing page without hand-editing the bundle.

`index.html` is a Claude Design canvas export: a ~2 MB self-contained bundle
whose 50 base64 assets and real page markup sit on four enormous single lines.
The markup lives JSON-encoded on one of them, which is why hand-editing the
file corrupts it silently.

This script separates the two. `extract` decodes the markup into
`src/index.template.html`, an ordinary readable HTML file you can edit with any
tool. `build` re-encodes that file back into `index.html`, touching only the
template line and leaving every asset byte untouched. `verify` renders the
result in headless Chromium and checks the page actually unpacks.

    python3 tools/index-bundle.py extract   # index.html  -> src/index.template.html
    python3 tools/index-bundle.py build     # src/index.template.html -> index.html
    python3 tools/index-bundle.py verify    # render index.html and check it

`build` self-checks by decoding what it wrote and comparing it to the source,
then runs `verify` unless you pass --no-verify. See docs/HANDOFF.md.
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUNDLE = os.path.join(ROOT, "index.html")
TEMPLATE = os.path.join(ROOT, "src", "index.template.html")

MARKER = '<script type="__bundler/template">'

# The exporter escapes every "</" as "</" so that no closing tag inside the
# JSON string can terminate the <script> element early. Reproduce that exactly:
# with it, encode(decode(line)) == line byte for byte.
CLOSING_TAG = "</"
CLOSING_TAG_ESCAPED = "<\\u002F"


def fail(msg):
    sys.exit("error: " + msg)


def read_bundle():
    with open(BUNDLE, encoding="utf-8") as fh:
        lines = fh.read().split("\n")
    idx = [i for i, ln in enumerate(lines) if ln.strip() == MARKER]
    if len(idx) != 1:
        fail(
            "expected exactly one %s line in index.html, found %d. The export "
            "format changed; update tools/index-bundle.py before going further."
            % (MARKER, len(idx))
        )
    payload = idx[0] + 1
    if payload >= len(lines):
        fail("index.html ends immediately after the template marker")
    return lines, payload


def decode(line):
    try:
        value = json.loads(line)
    except json.JSONDecodeError as exc:
        fail("the template line is not a JSON string (%s). Do not edit "
             "index.html by hand; restore it from git and re-run." % exc)
    if not isinstance(value, str):
        fail("the template line decoded to %s, not a string" % type(value).__name__)
    return value


def encode(text):
    return json.dumps(text, ensure_ascii=False).replace(CLOSING_TAG, CLOSING_TAG_ESCAPED)


def cmd_extract(args):
    lines, payload = read_bundle()
    markup = decode(lines[payload])
    if encode(markup) != lines[payload]:
        fail("index.html does not round-trip through this script's encoder. "
             "The export format changed; update tools/index-bundle.py.")
    if os.path.exists(TEMPLATE) and not args.force:
        with open(TEMPLATE, encoding="utf-8") as fh:
            if fh.read() != markup:
                fail("%s exists and differs from what index.html contains. "
                     "Build your edits in first, or pass --force to discard them."
                     % os.path.relpath(TEMPLATE, ROOT))
    os.makedirs(os.path.dirname(TEMPLATE), exist_ok=True)
    with open(TEMPLATE, "w", encoding="utf-8") as fh:
        fh.write(markup)
    print("extracted %d chars of markup -> %s"
          % (len(markup), os.path.relpath(TEMPLATE, ROOT)))
    print("edit that file, then: python3 tools/index-bundle.py build")


def cmd_build(args):
    if not os.path.exists(TEMPLATE):
        fail("%s does not exist. Run `python3 tools/index-bundle.py extract` first."
             % os.path.relpath(TEMPLATE, ROOT))
    with open(TEMPLATE, encoding="utf-8") as fh:
        markup = fh.read()

    lines, payload = read_bundle()
    before = lines[payload]
    line = encode(markup)

    # Overwriting the template line repairs a corrupted one, which is useful,
    # but it would also paper over an export whose format has moved on. Say so
    # rather than replacing it quietly; verify() below is the real backstop.
    try:
        stale = json.loads(before)
    except json.JSONDecodeError:
        stale = None
    if not isinstance(stale, str):
        print("warning: the template line in index.html was not a JSON string. "
              "Rebuilding it from %s. If the canvas export format changed, "
              "update this script." % os.path.relpath(TEMPLATE, ROOT),
              file=sys.stderr)

    # Self-check: what we are about to write must decode back to exactly the
    # source file, and must not contain a raw closing tag that would end the
    # <script> element early.
    if decode(line) != markup:
        fail("internal encoder round-trip failed; index.html left untouched")
    if CLOSING_TAG in line:
        fail("encoded template still contains a raw '</'; index.html left untouched")
    if "\n" in line:
        fail("encoded template contains a newline; index.html left untouched")

    if line == before:
        print("no change: %s already matches index.html"
              % os.path.relpath(TEMPLATE, ROOT))
    else:
        lines[payload] = line
        with tempfile.NamedTemporaryFile(
            "w", encoding="utf-8", dir=ROOT, delete=False, suffix=".tmp"
        ) as tmp:
            tmp.write("\n".join(lines))
            staged = tmp.name
        os.replace(staged, BUNDLE)
        delta = len(line) - len(before)
        print("rebuilt index.html (template line %+d chars, assets untouched)" % delta)

    if not args.no_verify:
        verify()


def chrome_binary():
    env = os.environ.get("CHROME_BIN")
    if env and os.path.exists(env):
        return env
    for path in (
        "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
        "/opt/pw-browsers/chromium/chrome-linux/chrome",
    ):
        if os.path.exists(path):
            return path
    for name in ("chromium", "chromium-browser", "google-chrome", "chrome"):
        found = shutil.which(name)
        if found:
            return found
    for parent in ("/opt/pw-browsers",):
        if os.path.isdir(parent):
            for dirpath, _, filenames in os.walk(parent):
                if "chrome" in filenames:
                    return os.path.join(dirpath, "chrome")
    return None


def verify():
    """Render index.html for real and confirm the bundle still unpacks."""
    chrome = chrome_binary()
    if chrome is None:
        print("verify: skipped, no Chromium found (set CHROME_BIN to force)")
        return
    with tempfile.TemporaryDirectory() as profile:
        proc = subprocess.run(
            [
                chrome, "--headless", "--disable-gpu", "--no-sandbox",
                "--user-data-dir=" + profile,
                "--virtual-time-budget=15000",
                "--dump-dom", "file://" + BUNDLE,
            ],
            capture_output=True, text=True, timeout=180,
        )
    dom = proc.stdout
    if proc.returncode != 0 and not dom:
        fail("verify: Chromium exited %d\n%s" % (proc.returncode, proc.stderr[-2000:]))

    # After the loader runs, the bundle scripts are gone and the real page is
    # in the DOM. If the template were corrupt, neither would be true.
    problems = []
    if MARKER in dom:
        problems.append("the bundle never unpacked (template script still present)")
    for needle, what in (
        ("School of Technology", "the site title"),
        ("Intro to Cybersecurity", "the course cards"),
        ("muenchen@miprepschool.org", "the contact address"),
    ):
        if needle not in dom:
            problems.append("%s is missing from the rendered page" % what)
    if len(dom) < 20000:
        problems.append("rendered DOM is only %d chars, far too small" % len(dom))
    if problems:
        fail("verify failed:\n  - " + "\n  - ".join(problems))
    print("verify: page renders, %d chars of DOM, bundle unpacked cleanly" % len(dom))


def cmd_verify(args):
    verify()


def main():
    parser = argparse.ArgumentParser(
        description="Extract, rebuild and verify the generated index.html.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    sub = parser.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("extract", help="decode index.html -> src/index.template.html")
    p.add_argument("--force", action="store_true",
                   help="overwrite src/index.template.html even if it has unbuilt edits")
    p.set_defaults(func=cmd_extract)

    p = sub.add_parser("build", help="encode src/index.template.html -> index.html")
    p.add_argument("--no-verify", action="store_true",
                   help="skip the headless-Chromium render check")
    p.set_defaults(func=cmd_build)

    p = sub.add_parser("verify", help="render index.html and check it unpacks")
    p.set_defaults(func=cmd_verify)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
