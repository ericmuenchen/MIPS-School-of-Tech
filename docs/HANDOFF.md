# MIPS School of Technology — site handoff

Everything needed to pick this site up cold: what it is, how it is built, the
rules that keep it on brand, what is unfinished, and how to ship a change.

Owner and instructor of record: **Eric Muenchen**, `muenchen@miprepschool.org`.
Repository: `ericmuenchen/MIPS-School-of-Tech`.

---

## 0. Read this first: there is unmerged work

At the time this handoff was written, branch **`claude/concise-config-5ifm0q`
was 20 commits ahead of `main`, and no pull request had ever been opened on
this repository.** If GitHub Pages serves from `main`, the published site is
missing all of the following:

- the School of Technology logo set (`assets/logo/`) and the eleven course
  marks (`assets/course-logos/`)
- `School-of-Technology-Program-Guide.pdf`
- the rebuilt HTML course catalog (`Course-Catalog.html`)
- every print fix (ink-light printing, forced background colours, page margins)
- the header/footer logo work and the hero watermark

**First action for whoever picks this up:** decide whether that branch is good,
then open a PR and merge it to `main`. Until that happens, the repository and
the live site tell two different stories.

Verify current state with:

```bash
git fetch origin
git rev-list --count origin/main..origin/claude/concise-config-5ifm0q
```

Zero means it has been merged and this section is stale — delete it.

---

## 1. What this is

A **static, no-build website** for the MIPS School of Technology: a landing
page, a course catalog, and ten printable course syllabi. There is no
framework, no package manager, no CI, and no compile step. Files are served
exactly as they sit in the repository.

`.nojekyll` at the root disables Jekyll processing on GitHub Pages, which is
what lets the `_ds/` directory (leading underscore) be served — Jekyll would
otherwise hide it and every syllabus would lose its stylesheet.

### Site map

| Path | What it is |
| --- | --- |
| `index.html` | Landing page: hero, five pathway tracks, eleven course cards, resource CTAs, contact. **Generated — see §2.** |
| `Course-Catalog.html` | The 2026–2027 catalog as a printable HTML document. |
| `<Course-Name>.html` | Ten course syllabi, one file each, hand-authored. |
| `2026-2027-Course-Catalog.pdf` | PDF catalog, offered as a download. |
| `School-of-Technology-Program-Guide.pdf` | Program guide, offered as a download. |
| `_ds/mips-design-system-course-syllabi-7626282b-…/` | The design system every syllabus links to. |
| `assets/logo/` | School of Technology lockup, reversed lockup, standalone mark. |
| `assets/course-logos/` | Eleven per-course hexagon marks. |
| `assets/logo-lockup.png` | The MIPS parent-school lockup. |

---

## 2. The two kinds of HTML in this repo

This is the single most important thing to understand before editing anything.
The files look alike and are edited in completely different ways.

### 2a. `index.html` — generated, do not hand-edit

`index.html` is a **Claude Design canvas export**, not source. It is ~2 MB
across 397 lines because it is a self-contained bundle. Its structure:

- a loader script that unpacks the bundle on `DOMContentLoaded`
- `<script type="__bundler/manifest">` — **50 embedded base64 assets**: React
  18.3.1, ReactDOM, Babel Standalone (~880 KB), 40+ `woff2` font files, and
  the MIPS logo PNG
- `<script type="__bundler/ext_resources">` — maps the original unpkg CDN URLs
  to those embedded blobs
- `<script type="__bundler/template">` — the actual page markup and logic, HTML-escaped inside the attribute

Consequences:

- **The landing page has zero network dependencies.** Fonts and React are
  embedded. It renders offline and cannot break because a CDN changed.
- **Hand-editing it is a mistake.** The real markup is escaped inside a script
  tag; a find-and-replace will corrupt the bundle in ways that fail silently.
- Edit it by reopening the design canvas that produced it and re-exporting, or
  by replacing it wholesale with a hand-authored page. Do not split the
  difference.

The page's content model lives in the template as a `raw` array of **tracks**,
each holding **courses**:

```js
{ id: 'cybersecurity', name: 'Cybersecurity', icon: 'shield',
  courses: [
    { title: 'CyberDefense Pro', semester: 'S1 or S2', grades: 'Grades 9–12',
      syllabus: 'CyberDefense-Pro.html',
      prereq: 'Pass Intro to Cybersecurity or Ethical Hacker first.',
      summary: '…' },
  ] }
```

Course fields: `title`, `semester`, `grades`, `syllabus`, and the optional
`prereq`, `formerly`, `summary`. A course with no `syllabus` key falls back to
`'#'` — this is how the one syllabus-less course currently renders (§5).

### 2b. The syllabi and catalog — plain HTML, edit freely

`Course-Catalog.html` and the ten `<Course-Name>.html` files are ordinary,
readable, hand-authored HTML. Each one:

- links the design system: `<link rel="stylesheet" href="_ds/mips-design-system-course-syllabi-7626282b-…/styles.css">`
- wraps content in `.doc-page` — an 8.5in-wide sheet with 0.7in padding
- carries a substantial, well-commented `@media print` block

Edit these directly. They are the easy files.

---

## 3. The design system

Lives at `_ds/mips-design-system-course-syllabi-7626282b-bb17-4e1e-9830-1ee9b84a2c82/`.
`styles.css` is the single entry point; it imports every token file. Read
`readme.md` in that folder — it is thorough and it is the brand bible.

### Tokens that matter

| Token | Value | Role |
| --- | --- | --- |
| `--color-navy-700` | `#02225A` | Structural anchor: headings, table headers, icons |
| `--color-maize-500` | `#FFE000` | Accent only: section pills, swatches, highlights |
| `--color-ink-900` | `#32373c` | Headlines |
| `--color-gray-600` | `#333333` | Body text |
| `--color-red-500` | `#a71000` | Validation only, never decorative |
| `--font-display` | Poppins | Headings and all UI chrome |
| `--font-body` | Source Serif Pro, 18px / 1.65 | Prose |

Spacing is a 4px base unit (`--space-1` … `--space-10`). Radii: pill buttons
(`999px`), soft-rounded cards (`20px`), icon swatches (`14px`). Nothing is
sharp-cornered. Shadows are shallow and appear on cards only — never on buttons
or icons.

### Non-negotiable visual rules

- White backgrounds. No gradients, no photographic heroes, no textures.
- Maize is never body text.
- Cards are plain white with a soft shadow and **never** a coloured left-border
  accent bar.
- Icons are single-weight outline (Lucide-style), always navy, inline SVG with
  `stroke="currentColor"`.
- No emoji anywhere. A filled star (★) is the only decorative glyph, and only
  to mark project or capstone milestones in schedule tables.

### Writing voice

Direct, warm, student-first. The student is **"you"**; the instructor is
**"I"**. Short declarative sentences. Section headings are title case; eyebrows
and labels are UPPERCASE with wide letter-spacing.

Tone words: *your pace, no penalty for late work, revise and resubmit, stay on
track, learn to think like a programmer.* Encouraging, never punitive.

Em dashes are used sparingly — prefer a colon, a period, parentheses, or
"and"/"to" for ranges. The middot ( · ) is the workhorse separator in eyebrows
and table cells. Numerals stay plain and factual; invent no statistics.

---

## 4. Printing

The syllabi and catalog are meant to be printed, and the print CSS is doing
real work. Two things it handles:

1. **Chrome prints with "Background graphics" OFF by default**, which would
   drop the navy panels and land white text on white paper. Every printable
   page forces `print-color-adjust: exact`.
2. **Ink-light printing.** At full size the solid navy panels and maize discs
   flood a sheet with toner, so in print they become white with navy rules and
   navy text — borders and text colour carry the design instead of fills. The
   `.pill` padding is deliberately offset by the added border width so an
   outlined pill occupies the same box as a filled one and the page count does
   not shift.

**If you touch print styles, print to PDF and check the page count before and
after.** That is the whole regression test.

---

## 5. Known gaps and inconsistencies

Real, verified, and worth fixing. None are blocking.

1. **Web Design and Development II has no syllabus page.** The course is listed
   on the landing page and has a course mark
   (`assets/course-logos/web-design-and-development-ii.svg`), but there is no
   `Web-Design-and-Development-II.html`, so its card links to `#`. Ten syllabi
   exist for eleven listed courses.

2. **`assets/logo/README.md` documents three files that do not exist:**
   `Logo.jsx`, `logo.html`, and `school-of-technology-logo.png`. The README
   recommends `Logo.jsx` or `logo.html` as the preferred embed. Either create
   them or correct the README.

3. **`assets/course-logos/README.md` documents a `png/` directory that does not
   exist** (`png/<slug>-128.png`, `png/<slug>-512.png`). Only SVGs are present.

4. **Two brand palettes coexist.** The design system uses navy `#02225A` and
   maize `#FFE000`. `assets/logo/README.md` specifies navy `#1E2759` and maize
   `#FEE003`, sampled from the existing MIPS horizontal logo. These are close
   but not equal. Decide which is canonical and reconcile.

5. **No reversed/white MIPS parent lockup.** `assets/logo-lockup.png` has a
   navy wordmark that is illegible on navy. The School of Technology set *does*
   have `school-of-technology-logo-reversed.svg`; the parent lockup does not.
   On dark surfaces, use reversed type instead.

6. **Fonts load differently across the site.** `index.html` embeds its fonts
   and works offline. The syllabi `@import` Poppins and Source Serif Pro from
   the Google Fonts CDN and will fall back to Georgia and system sans without
   network access. Acceptable, but know it before demoing offline.

7. **No icon set of MIPS's own.** Lucide is a flagged substitution throughout.

---

## 6. Making a change

No install, no build, no dev server required.

```bash
git clone https://github.com/ericmuenchen/MIPS-School-of-Tech.git
cd MIPS-School-of-Tech
python3 -m http.server 8000      # then open http://localhost:8000
```

Use a server rather than opening files directly — `file://` can trip up the
stylesheet path and the bundle unpack.

### Adding a course

1. Author the syllabus. Copy the closest existing `<Course-Name>.html`, or use
   the design system's syllabus template
   (`_ds/…/templates/syllabus/Syllabus.dc.html`). Name the file in Title-Case
   with hyphens, matching the existing files.
2. Add the course mark to `assets/course-logos/` as a `viewBox="0 0 200 176"`
   SVG, navy `#02225A` hexagon with a maize `#FFE000` inner outline, named as a
   lowercase hyphenated slug.
3. Add the course to the right track's `courses` array in the `index.html`
   template — **via the design canvas, not by hand** (§2a).
4. Update `Course-Catalog.html` and, if it is being kept in sync, the catalog
   PDF.

### Syllabus authoring rules

From the design system readme, and fixed for every MIPS syllabus:

- **One semester per syllabus** — Fall (S1, 18 instructional weeks) or Winter
  (S2, 20 weeks). Fit the content to that semester's week grid from
  `_ds/…/calendar/calendar-2026-2027.json`, inserting each break (Labor Day,
  Thanksgiving, Winter, Spring, State Testing, Presidents'/Memorial Day) as a
  "no new lessons" row.
- **Instructor is always Eric Muenchen**, `muenchen@miprepschool.org`.
- **Never invent a grading scale.** If one is not supplied, ask for it.

### Deploying

Pushing to the branch GitHub Pages serves is the deploy. The evidence points to
Pages serving `main` from the repository root: there is a root `.nojekyll`, no
`CNAME`, and no `.github/workflows/`. **Confirm this in Settings → Pages before
relying on it.**

Then merge the branch described in §0 and the published site catches up with
the repository.

---

## 7. Working on this with Claude

`CLAUDE.md` at the repository root is loaded automatically by Claude Code every
session; it carries the short version of the rules above. Keep it accurate — it
is the highest-leverage file in the repo for AI-assisted work.

If you connect this repository to a claude.ai Project, the Project will read
`CLAUDE.md` and this handoff as knowledge and stay in sync as they change. Keep
the documents here in git; do not fork a second copy into Project knowledge,
where it will drift out of date invisibly.
