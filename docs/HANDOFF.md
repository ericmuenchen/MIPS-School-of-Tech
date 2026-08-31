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
| `src/index.template.html` | The landing page's real markup, decoded from the bundle. Edit this, not `index.html`. |
| `tools/index-bundle.py` | Extracts, rebuilds and verifies the `index.html` / `src/` pair. |
| `Course-Catalog.html` | The 2026–2027 catalog as a printable HTML document. |
| `<Course-Name>.html` | Ten course syllabi, one file each, hand-authored. |
| `2026-2027-Course-Catalog.pdf` | PDF catalog, offered as a download. |
| `School-of-Technology-Program-Guide.pdf` | Program guide, offered as a download. |
| `_ds/mips-design-system/` | The design system, in full source. Every syllabus and the catalog link its `styles.css`. |
| `assets/logo/` | School of Technology lockup, reversed lockup, standalone mark. |
| `assets/course-logos/` | Eleven per-course hexagon marks. |
| `assets/logo-lockup.png` | The MIPS parent-school lockup. |

---

## 2. The two kinds of HTML in this repo

This is the single most important thing to understand before editing anything.
The files look alike and are edited in completely different ways.

### 2a. `index.html` — generated; edit `src/index.template.html` instead

`index.html` is a **Claude Design canvas export**, not source. It is ~2 MB
across 397 lines because it is a self-contained bundle. Its structure:

- a loader script that unpacks the bundle on `DOMContentLoaded`
- `<script type="__bundler/manifest">` — **50 embedded base64 assets**: React
  18.3.1, ReactDOM, Babel Standalone (~880 KB), 40+ `woff2` font files, and
  the MIPS logo PNG
- `<script type="__bundler/ext_resources">` — maps the original unpkg CDN URLs
  to those embedded blobs
- `<script type="__bundler/template">` — the actual page markup and logic,
  JSON-encoded onto **one 76 KB line**

Consequences:

- **The landing page has zero network dependencies.** Fonts and React are
  embedded. It renders offline and cannot break because a CDN changed.
- **Hand-editing the bundle is still a mistake.** Four of its lines are
  enormous, the markup is JSON-encoded rather than plain, and a stray quote or
  newline breaks the page in ways that fail silently rather than loudly.

#### The editing path

`tools/index-bundle.py` splits the bundle from the markup so ordinary copy
changes are ordinary file edits:

```bash
python3 tools/index-bundle.py extract   # index.html -> src/index.template.html
# edit src/index.template.html with any tool
python3 tools/index-bundle.py build     # src/index.template.html -> index.html
python3 tools/index-bundle.py verify    # render index.html, check it unpacks
```

`src/index.template.html` is that 76 KB line decoded: 1,464 lines of readable
HTML and JSX, greppable and safe to edit line by line. Commit it alongside
`index.html`.

What makes this trustworthy rather than a dressed-up find-and-replace:

- **`build` touches exactly one line.** Everything else — all 50 base64 assets —
  is copied through byte for byte. `git diff --numstat index.html` reports
  `1 1` after a copy change; anything else means something went wrong.
- **The encoder is byte-exact.** Extract-then-build with no edits reproduces
  `index.html` with an identical checksum. The one non-obvious rule it
  reproduces: the exporter escapes every `</` as `/` so no closing tag
  inside the JSON string can end the `<script>` element early. `build` refuses
  to write if a raw `</` or a newline survives into the encoded line.
- **`build` renders the result.** It runs headless Chromium against the rebuilt
  file, waits for the loader, and dumps the post-JavaScript DOM. It fails if the
  bundle did not unpack, or if the site title, the course cards, or the contact
  address are missing. Set `CHROME_BIN` if Chromium is somewhere unusual; the
  check is skipped with a warning if none is found.

**Re-exporting from the canvas is still the right move for structural work** —
new sections, layout changes, anything visual. The export replaces `index.html`
wholesale, which leaves `src/index.template.html` stale, so run
`python3 tools/index-bundle.py extract --force` straight afterwards to bring it
back in step. Plain `extract` refuses to overwrite a template holding edits that
were never built in, so it will not silently eat work.

If the export format ever changes, `extract` fails loudly rather than guessing:
it checks that the template line round-trips through its own encoder before
writing anything.

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

- links the design system: `<link rel="stylesheet" href="_ds/mips-design-system/styles.css">`
- wraps content in `.doc-page` — an 8.5in-wide sheet with 0.7in padding
- carries a substantial, well-commented `@media print` block

Edit these directly. They are the easy files.

---

## 3. The design system

One system, in full source, at **`_ds/mips-design-system/`**. Link one file:

```html
<link rel="stylesheet" href="_ds/mips-design-system/styles.css">
```

That is the only runtime dependency — it imports the five token files in order.
Read `readme.md` in that folder; it is the brand bible, and its colour values are
verified against `tokens/colors.css`.

It was consolidated from two Claude Design projects that had diverged:

| Source project | Covered | Fate in the merge |
| --- | --- | --- |
| `6fe64d3a` "MIPS Design System" | `index.html`, marketing surfaces | Base layer: the fuller UI kit (forms, feedback, navigation, `Card`) and the marketing-site template |
| `7626282b` "…— Course Syllabi" | the syllabi and catalog | Overlaid on top and **wins every conflict** |

The syllabi project was the derived, newer one: same 74 tokens byte-for-byte,
same five `@import`s in `styles.css`, but more developed components and specimen
cards. Where the two disagreed, it was right — most importantly on colour, where
the parent's readme claimed `#1B2A63` navy and `#FFE200` maize while its own
token files said `#02225A` and `#FFE000`. The merged readme carries only the
verified values.

What the merge contains: 15 components (the document vocabulary — `AccentRule`,
`Badge`, `Button`, `IconSwatch`, `InfoCard` — plus `Card`, forms, feedback, and
navigation), 15 guideline cards, 2 templates, the academic calendar, and 74
tokens. Forms, feedback, and navigation are unused by the current site; they are
the sanctioned versions should those surfaces ever be built.

**No page uses the JSX components at runtime.** The syllabi are hand-authored
HTML with inline styles, and `index.html` bundles its own copies. The components
are source and reference material.

Two artefacts were deliberately dropped: `_ds_bundle.js` (the two projects'
compiled bundles carried conflicting namespaces, so shipping either would have
been a lie) and the per-project canvas thumbnails. `_ds_manifest.json` was
rebuilt by hand and every path in it verified against disk. Both the bundle and
`_adherence.oxlintrc.json` should be regenerated by Claude Design on the next
export of the consolidated project.

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

8. **The syllabus template is behind the shipped syllabi.**
   `_ds/mips-design-system/templates/syllabus/Syllabus.dc.html` still uses the
   MIPS parent lockup rather than the School of Technology mark, carries no
   course mark, has none of the print work (forced background colours,
   ink-light printing, page margins), and still calls the weekly meetup
   "optional" rather than recommended. Its six `<h2>` sections still match, so
   the drift is in the detail, not the shape.

   Treat it as historical. **To author a new syllabus, copy the closest shipped
   `<Course-Name>.html`** — those are the current reference. Re-derive the
   template from a current syllabus before using it as a starting point again.

9. **~~The landing page's Intro to Cybersecurity summary is stale.~~ Fixed.**
   That course was rebuilt on the CodeHS *Fundamentals of Cybersecurity*
   content (modules 1–5); `Intro-to-Cybersecurity.html` and
   `Course-Catalog.html` were updated to match, and the landing page card now
   is too, through `src/index.template.html` and the §2a build.

   `2026-2027-Course-Catalog.pdf` **was** regenerated from the HTML and is
   current. `School-of-Technology-Program-Guide.pdf` is **not** — see gap 10.

   Still open, and related: CyberDefense Pro lists "Pass Intro to Cybersecurity
   or Ethical Hacker first" as its prerequisite, and the program guide repeats
   it as "Either one opens the track." Intro to Cybersecurity is now a beginner
   foundations course rather than a network-defense course, so decide whether
   that prerequisite still does the work it used to.

10. **The program guide PDF has no source in this repo.**
    `School-of-Technology-Program-Guide.pdf` was exported from Google Docs
    (`/Producer: Skia/PDF … Google Docs Renderer`), and its text is drawn with
    subset CID fonts, so it cannot be edited in place or regenerated from
    anything in git. The Cybersecurity track blurb in §4 still opens with the
    retired course:

    > **What you'll do:** Build and defend a business network, configure
    > firewalls and VPNs, and manage identity and encryption. Learn the
    > professional process for testing systems, …

    The first sentence describes Intro to Cybersecurity and is now wrong; the
    second describes Ethical Hacker and still stands. Suggested replacement for
    the first sentence, to be made in the Google Doc and re-exported:

    > Start with your own digital life, your data, your privacy, and the attacks
    > to watch for, then make and break codes, set up and secure a computer, and
    > follow a message across the internet.

    Longer term, the guide belongs in this repo as hand-authored HTML like the
    catalog, so it can be edited and re-printed alongside everything else.

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
   (The design system's `Syllabus.dc.html` template is in the repo but behind
   the shipped syllabi — see §5.8 — so copying a sibling file is the better
   route.)
2. Add the course mark to `assets/course-logos/` as a `viewBox="0 0 200 176"`
   SVG, navy `#02225A` hexagon with a maize `#FFE000` inner outline, named as a
   lowercase hyphenated slug.
3. Add the course to the right track's `courses` array in
   `src/index.template.html`, then `python3 tools/index-bundle.py build` (§2a).
   Do not edit `index.html` itself.
4. Update `Course-Catalog.html`, then regenerate the catalog PDF from it (see
   below).

### Regenerating the catalog PDF

`2026-2027-Course-Catalog.pdf` is a headless-Chrome print of
`Course-Catalog.html` — nothing more. Serve the site, then print the page with
`printBackground` on and `preferCSSPageSize` on so the document's own
`@page{ size:letter; margin:0.7in }` rule wins, and write the result over the
existing PDF. Any change to the catalog HTML should be followed by this, or the
downloadable PDF drifts. It had drifted by three course descriptions before it
was last regenerated.

### Syllabus authoring rules

From the design system readme, and fixed for every MIPS syllabus:

- **One semester per syllabus** — Fall (S1, 18 instructional weeks) or Winter
  (S2, 20 weeks). Fit the content to that semester's week grid, inserting each
  break (Labor Day, Thanksgiving, Winter, Spring, State Testing,
  Presidents'/Memorial Day) as a "no new lessons" row. The week grids are in
  the repo: `_ds/mips-design-system/calendar/calendar-2026-2027.json`
  (structured) and `calendar.md` (readable).
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

**2. Nothing else.** Both design-system projects have been exported and merged
into `_ds/mips-design-system/` (§3), so the whole system — components, tokens,
guidelines, calendar, both templates — is in git and travels with the repo.

### Do this before switching

1. **Decide what happens to the landing page.** Copy edits and course-list
   changes no longer need the canvas at all — `src/index.template.html` plus
   `tools/index-bundle.py` (§2a) cover those in either account. What a canvas
   still buys is visual and structural work. So either re-create it in the new
   account from `MarketingSite.dc.html` plus the current `index.html`, or
   re-author the page as plain HTML. Given that every other page in this repo
   is hand-authored HTML, re-authoring the landing page to match is a
   reasonable simplification, not a downgrade — `src/index.template.html` is
   already most of the way there, being the real markup in readable form.
2. **Re-authorise GitHub on the new account** for
   `ericmuenchen/MIPS-School-of-Tech`, and confirm the account can push.
3. **Check Settings → Pages still points at `main`** from the repository root.
   Pages belongs to the GitHub repository, not to any Claude account, so it
   should be unaffected — confirm rather than assume.
4. **Carry nothing else by hand.** Conversation history and Project knowledge
   in the old account are not worth migrating; this document is the handoff.
   If something in the old account turns out to matter, it belongs in this
   repo — add it here rather than recreating it as Project knowledge.
