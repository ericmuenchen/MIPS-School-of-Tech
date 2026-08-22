# MIPS School of Technology — website

Static, no-build site for the MIPS School of Technology: a landing page, a
course catalog, and ten printable course syllabi. No framework, no package
manager, no compile step. Files are served as they sit.

Full context: **`docs/HANDOFF.md`**. Read it before any non-trivial change.

## Hard rules

**Never hand-edit `index.html`.** It is a generated Claude Design canvas export
— a self-contained bundle with 50 base64 assets (React, Babel, 40+ woff2 fonts)
and the real markup HTML-escaped inside a `<script type="__bundler/template">`
tag. Find-and-replace corrupts it silently. Change it through the design canvas
and re-export, or replace the file wholesale.

**Never delete `.nojekyll`.** It is what lets GitHub Pages serve `_ds/`; without
it every syllabus loses its stylesheet.

**Never change the instructor.** Always Eric Muenchen,
`muenchen@miprepschool.org`.

**Never invent a grading scale, a statistic, or a date.** Ask instead.

## Layout

- `index.html` — landing page. Generated. See above.
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
