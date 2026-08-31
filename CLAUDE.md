# MIPS School of Technology — website

Static, no-build site for the MIPS School of Technology: a landing page, a
course catalog, and ten printable course syllabi. No framework, no package
manager, no compile step. Files are served as they sit.

Full context: **`docs/HANDOFF.md`**. Read it before any non-trivial change.

## Hard rules

**Never hand-edit `index.html`.** It is a generated Claude Design canvas export:
a self-contained bundle with 50 base64 assets (React, Babel, 40+ woff2 fonts)
and the real markup JSON-encoded onto a single 76 KB line inside a
`<script type="__bundler/template">` tag. Find-and-replace corrupts it silently.

Edit `src/index.template.html` instead. It is that markup, decoded into an
ordinary 1,464-line HTML file, and `tools/index-bundle.py` moves between the two:

```bash
python3 tools/index-bundle.py extract   # index.html -> src/index.template.html
# edit src/index.template.html like any other file
python3 tools/index-bundle.py build     # src/index.template.html -> index.html
```

`build` rewrites only the template line, leaving every asset byte untouched, and
then renders the result in headless Chromium to prove the bundle still unpacks.
Commit both files together. Re-export from the design canvas is still fine for
structural work: it replaces `index.html` wholesale, so run `extract --force`
afterwards to bring `src/` back in step.

**Never delete `.nojekyll`.** It is what lets GitHub Pages serve `_ds/`; without
it every syllabus loses its stylesheet.

**Never change the instructor.** Always Eric Muenchen,
`muenchen@miprepschool.org`.

**Never invent a grading scale, a statistic, or a date.** Ask instead.

## Layout

- `index.html` — landing page. Generated. See above.
- `src/index.template.html` — the landing page's real markup, decoded. This is
  the file you edit; `index.html` is built from it.
- `tools/index-bundle.py` — extract / build / verify for the pair above.
- `Course-Catalog.html`, `<Course-Name>.html` — plain hand-authored HTML. Edit
  these freely. Each links `_ds/mips-design-system/styles.css` and wraps content
  in `.doc-page` (8.5in, 0.7in padding).
- `_ds/mips-design-system/` — the design system, in full source: tokens,
  components, guidelines, the academic calendar, both templates. `styles.css`
  is the only runtime dependency; its `readme.md` is the brand bible.
- `assets/logo/`, `assets/course-logos/` — vector brand marks, each with a README.

## Brand

Navy `#02225A` anchors structure (headings, table headers, icons). Maize
`#FFE000` is accent only — never body text. Headlines in ink `#32373c`, body in
gray `#333`. Red `#a71000` is validation only.

Poppins for display and all UI chrome; Source Serif Pro 18px/1.65 for prose.
4px spacing base. Pill buttons, 20px card rounding, shallow shadows on cards
only. Flat white backgrounds — no gradients, no photo heroes, no textures.
Cards never get a coloured left-border accent bar.

Icons: single-weight outline (Lucide-style), always navy, inline SVG with
`stroke="currentColor"`. **No emoji.** ★ is the only decorative glyph, and only
for milestones in schedule tables.

## Voice

Direct, warm, student-first. Student is "you", instructor is "I". Short
declarative sentences. Title case for headings; UPPERCASE with wide tracking
for eyebrows and labels. Em dashes sparingly — prefer a colon, a period,
parentheses, or "and"/"to". The middot ( · ) is the workhorse separator.

## Printing

The syllabi and catalog are print deliverables. Print CSS forces
`print-color-adjust: exact` (Chrome disables background graphics by default)
and converts filled navy/maize elements to outlined ones so a seven-page
catalog does not empty a cartridge. `.pill` padding is offset by the added
border width so the page count does not shift.

**If you touch print styles, print to PDF and compare the page count before and
after.** That is the regression test.

## Local preview

```bash
python3 -m http.server 8000
```

Serve over HTTP, not `file://`.
