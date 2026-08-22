# MIPS School of Technology — site handoff

Everything needed to pick this site up cold: what it is, how it is built, the
rules that keep it on brand, what is unfinished, and how to ship a change.

Owner and instructor of record: **Eric Muenchen**, `muenchen@miprepschool.org`.
Repository: `ericmuenchen/MIPS-School-of-Tech`.

---

## 0. How work reaches the site

**Claude Code sessions never commit to `main`.** Each session is assigned its
own `claude/<slug>` branch and pushes there. Merging is a manual step, and it
is easy to forget: this repository once accumulated three days of work across
20 commits on a branch while `main` — and therefore the published site — sat
unchanged.

So make this the habit at the end of any session that changed something:

```bash
git fetch origin
git checkout main
git merge --ff-only claude/<the-session-branch>
git push origin main
```

If `--ff-only` refuses, `main` has moved independently; merge normally and
resolve, rather than forcing.

Check for stragglers at any time:

```bash
git fetch origin
for b in $(git branch -r | grep 'origin/claude/'); do
  echo "$b: $(git rev-list --count origin/main..$b) unmerged"
done
```

Anything reporting `0` is fully merged and the branch can be deleted. Since
this repository has a single maintainer, pull requests are optional ceremony —
merging straight to `main` is fine.

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
| `_ds/mips-design-system-6fe64d3a-…/` | The parent design system, in full source. Behind `index.html`; not linked at runtime. |
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

## 3. The design systems

There are **two**, and they serve the two kinds of page in §2.

| Directory | Namespace | Serves | State |
| --- | --- | --- | --- |
| `_ds/mips-design-system-6fe64d3a-…/` | `MIPSDesignSystem_6fe64d` | `index.html`, the landing page | **Full source** — components, guidelines, tokens, marketing-site template, `SKILL.md` |
| `_ds/mips-design-system-course-syllabi-7626282b-…/` | `DesignSystem_762628` | the syllabi and catalog | **Compiled only** — see §5.8 |

The syllabi one is the derived system: it was built from the reference syllabus
and copied the parent's tokens, fonts, and brand rules verbatim, then narrowed
the component set to the document vocabulary (`AccentRule`, `Badge`, `Button`,
`IconSwatch`, `InfoCard`). The parent carries a fuller UI kit — forms, feedback,
navigation — that the site does not currently use.

Both declare the same 74 tokens, so the colour, type, and spacing rules below
hold across both. In each, `styles.css` is the single entry point and imports
every token file, and `readme.md` is the brand bible — the syllabi system's is
the more thorough of the two and the one to read first.

Only the syllabi system is linked by any page. The parent is in the repo as
**source**, so the landing page can be edited and re-exported; nothing loads it
at runtime.

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

8. **The syllabi design system is compiled output, not source.** Of the two
   systems in `_ds/` (§3), the **course-syllabi** one
   (`…-course-syllabi-7626282b-…`) contains only `styles.css`, `tokens/`, and
   the compiled `_ds_bundle.js`. Its own `readme.md` and `_ds_manifest.json`
   describe fifteen files that are **not present**:

   - `components/core/{AccentRule,Badge,Button,IconSwatch,InfoCard}.jsx`
   - `guidelines/*.card.html` (seven specimen cards)
   - `templates/syllabus/Syllabus.dc.html` — the syllabus template
   - `calendar/calendar.card.html`, and with it
     `calendar/calendar-2026-2027.json` and `calendar/calendar.md`
   - `SKILL.md`, the Agent-Skill wrapper

   Consequence: the syllabi and catalog **render** correctly — the compiled
   bundle and the CSS tokens are all those pages need — but that system cannot
   be **edited or extended** from this repository, and the two artefacts the
   authoring rules depend on (the syllabus template and the academic-year week
   grid) are unavailable.

   The parent system (`…-6fe64d3a-…`) *is* complete here, and it supplies
   `Badge`, `Button`, and `IconSwatch` in full source. Only `AccentRule` and
   `InfoCard` — the two components unique to the syllabi vocabulary — plus the
   syllabus template and the calendar have no source anywhere in the repo.

   **Fix:** export design-system project `7626282b-bb17-4e1e-9830-1ee9b84a2c82`
   ("MIPS Design System — Course Syllabi") the same way `6fe64d3a` was
   exported, and unpack it over its existing `_ds/` directory.

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

1. Author the syllabus by copying the closest existing `<Course-Name>.html`.
   Name the new file in Title-Case with hyphens, matching the existing files.
   (The design system's `Syllabus.dc.html` template is *not* in this repo —
   see §5.8 — so copying a sibling file is the only route that works here.)
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
  (S2, 20 weeks). Fit the content to that semester's week grid, inserting each
  break (Labor Day, Thanksgiving, Winter, Spring, State Testing,
  Presidents'/Memorial Day) as a "no new lessons" row. The machine-readable
  week grid (`calendar/calendar-2026-2027.json`) lives in the design system
  project, not in this repo (§5.8); until it is exported here, take the dates
  from an existing syllabus's schedule table.
- **Instructor is always Eric Muenchen**, `muenchen@miprepschool.org`.
- **Never invent a grading scale.** If one is not supplied, ask for it.

### Deploying

Pushing to the branch GitHub Pages serves is the deploy. The evidence points to
Pages serving `main` from the repository root: there is a root `.nojekyll`, no
`CNAME`, and no `.github/workflows/`. **Confirm this in Settings → Pages before
relying on it.**

Which means the merge in §0 *is* the deploy. Work that stays on a `claude/*`
branch is not published, however finished it looks in the repository.

---

## 7. Working on this with Claude

`CLAUDE.md` at the repository root is loaded automatically by Claude Code every
session; it carries the short version of the rules above. Keep it accurate — it
is the highest-leverage file in the repo for AI-assisted work.

If you connect this repository to a claude.ai Project, the Project will read
`CLAUDE.md` and this handoff as knowledge and stay in sync as they change. Keep
the documents here in git; do not fork a second copy into Project knowledge,
where it will drift out of date invisibly.

---

## 8. Moving this to a different Claude account

Connecting the GitHub repository to the new account is necessary but **not
sufficient.** Two things this site depends on were made inside Claude and do
not live in git.

### What travels with the repo

Everything published: all HTML, both PDFs, `assets/`, the CSS tokens, the
compiled design-system bundle, and these documents. A new account with repo
access can read, edit the syllabi, edit the catalog, and deploy.

### What does not travel

**1. The live design canvases.** The repo now holds the parent system's full
source, including `templates/marketing-site/MarketingSite.dc.html`, so the
landing page can be rebuilt from source in any account. What does not transfer
is the *live canvas* — the saved, editable document in the originating
account's Claude Design workspace, carrying the accumulated edits that turned
that generic template into the current `index.html`. Rebuilding from source is
possible; resuming the old canvas is not.

**2. The syllabi design system source.** See §5.8. Still outstanding: export
project `7626282b-…` before switching, and this stops being an issue.

### Do this before switching

1. **Export design-system project `7626282b-…` into the repo** — the fifteen
   files listed in §5.8, at the paths `_ds_manifest.json` already expects. This
   is the last piece; the parent system `6fe64d3a-…` is already done.
2. **Decide what happens to the landing page.** Either re-create the canvas in
   the new account from `MarketingSite.dc.html` plus the current `index.html`,
   or re-author the page as plain HTML. Given that every other page in this
   repo is hand-authored HTML, re-authoring the landing page to match is a
   reasonable simplification, not a downgrade — and it would retire the
   "never hand-edit this file" rule entirely.
3. **Re-authorise GitHub on the new account** for
   `ericmuenchen/MIPS-School-of-Tech`, and confirm the account can push.
4. **Check Settings → Pages still points at `main`** from the repository root.
   Pages belongs to the GitHub repository, not to any Claude account, so it
   should be unaffected — confirm rather than assume.
5. **Carry nothing else by hand.** Conversation history and Project knowledge
   in the old account are not worth migrating; this document is the handoff.
   If something in the old account turns out to matter, it belongs in this
   repo — add it here rather than recreating it as Project knowledge.
