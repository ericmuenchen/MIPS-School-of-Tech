# MIPS Design System

The design system for **Michigan International Prep School (MIPS)**, a tuition-free
K-12 online public charter school in Michigan, and its School of Technology.

One system, two surfaces: the **marketing pages** (the School of Technology site)
and the **printable documents** (course syllabi and the catalog). Where a rule
differs between them, this file says which surface it applies to.

## Consuming it

Link one file:

```html
<link rel="stylesheet" href="_ds/mips-design-system/styles.css">
```

`styles.css` imports the five token files in order (fonts, colors, typography,
spacing, base resets). Nothing else is required at runtime.

## Index

- **`styles.css`** — the entry point. Imports every token file below.
- **`tokens/`** — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`
  (Google Fonts import), `base.css` (resets). 74 tokens.
- **`components/core/`** — the document vocabulary: **AccentRule**, **Badge**,
  **Button**, **IconSwatch**, **InfoCard**, plus **Card**.
- **`components/forms/`** — Input, Select, Checkbox, Radio, Switch.
- **`components/feedback/`** — Tooltip, Toast, Dialog.
- **`components/navigation/`** — Tabs.
- **`guidelines/`** — 15 foundation specimen cards (colors, type, spacing,
  radius/shadow, brand motifs).
- **`templates/marketing-site/`** — `MarketingSite.dc.html`, the marketing
  homepage the School of Technology landing page was built from.
- **`templates/syllabus/`** — `Syllabus.dc.html`, the one-page syllabus with a
  Fall/Winter toggle. **Read the caveat below before using it.**
- **`calendar/`** — the MIPS academic calendar for 2026–2027:
  `calendar-2026-2027.json` (structured), `calendar.md` (reference).
- **`assets/logo-lockup.png`** — the MIPS parent-school lockup.
- **`SKILL.md`** — Agent-Skill wrapper so this system can be used in Claude Code.

Each component ships `.jsx`, `.d.ts`, and `.prompt.md` alongside.

## Components

Forms, feedback, and navigation exist for marketing and app surfaces. The current
site does not use them — its pages are hand-authored HTML — but they are the
sanctioned versions if those surfaces are ever built.

### Intentional additions

- **AccentRule** and **IconSwatch** codify the two most-repeated devices in MIPS
  documents (the section-start pill and the paint-swatch icon) so consumers do
  not hand-roll them inconsistently.
- **InfoCard** is the document-surface panel (plain / maize / navy). **Card** is
  the plainer marketing-surface surface. Prefer `InfoCard` in documents.

## Brand summary

MIPS is friendly, energetic, and approachable, but credible enough for parents
making a real schooling decision: bright and encouraging, not corporate. The
identity runs on a maize-and-navy Michigan pairing. Centered layouts, generous
white space, confident headlines, maize accent shapes behind navy line icons,
and pill buttons define the look.

## Visual foundations

**Color.** White is the dominant background; the design breathes on white, not on
tinted surfaces. **Navy `#02225A`** (`--color-navy-700`) is the structural anchor:
headings-as-eyebrows, table headers, the AI-policy block, icons, wordmark.
**Maize `#FFE000`** (`--color-maize-500`) is accent and energy only: the
section-start pill, icon swatches, the highlight panel, the quick-facts band, at
most one CTA per screen. **Never maize for body text.** Body text is soft gray
`#333` (`--color-gray-600`); headlines are near-black ink `#32373c`
(`--color-ink-900`), not navy. Red `#a71000` (`--color-red-500`) is
validation-only, never decorative.

**Type.** Two deliberately contrasting roles. Display and headings are
**Poppins**, heavy (600–700), tight tracking (-0.02em), in ink. All UI chrome
(eyebrows, labels, table headers, buttons) is Poppins. Body prose is **Source
Serif Pro** at 18px, weight 400, 1.65 leading, in gray. The chunky-display /
clean-serif-body gap is the core typographic personality: do not soften the
display weight or tighten the body leading.

**Spacing.** 4px base unit. Sections are separated by generous vertical
whitespace (~40px between a section and the next AccentRule; `--section-gap-sm`
64px, `--section-gap-lg` 128px on marketing pages). Layouts are centered and
unhurried. Avoid dense, edge-to-edge layouts.

**Backgrounds.** Flat white. No gradients, no photographic hero imagery, no
textures. The only "imagery" is the maize/navy motif system (swatches, pills,
hexagon logo).

**Borders.** Thin (1–1.5px) gray hairlines on the quick-facts grid and schedule
tables; 2px navy on outline buttons, checkboxes, and radios. Schedule table
headers are solid navy with white text; alternating rows use gray-100. No heavy
or double borders.

**Shadows.** Soft and shallow (`--shadow-sm/md/lg`), on cards, dialogs, and
toasts only. Never on buttons or icons.

**Corner radii.** Buttons are full pill (`--radius-pill`). Cards, panels, and
dialogs use large soft rounding (`--radius-lg`, 20px). Form fields use
`--radius-sm` (8px); icon swatches use 14px. Nothing is sharp-cornered.

**Cards.** Plain white surface, soft shadow, no border, generous padding, large
rounding. **Never** a coloured left-border accent bar.

**Animation.** Minimal. Buttons transition background on hover (~140ms ease, no
bounce). Treat the brand as calm and mostly static.

**Hover and press.** Outline buttons get a soft gray fill; solid and maize deepen
one colour step (`--brand-primary-hover`, `--accent-primary-hover`). No opacity
fades, no scale or shrink.

**Transparency.** Only the dialog scrim (45% black, no blur). No frosted glass.

## Content fundamentals

**Instructor and contact:** always **Eric Muenchen**,
`muenchen@miprepschool.org`. Fixed across all syllabi.

**Voice:** direct, warm, student-first. Short declarative sentences. In documents
the syllabus speaks to the student as **"you"** and the instructor as **"I"**. On
marketing pages the copy addresses the parent or family reader but keeps the
student at the centre.

**Casing:** in documents, section headings are title case ("Course Description",
"Semester Schedule"). On marketing pages, headlines are sentence case ("Free,
K-12 online school."). In both, eyebrows and labels are UPPERCASE with wide
letter-spacing ("UNIT 1 · GAMES", "INSTRUCTOR").

**Tone words:** your pace, no penalty for late work, revise and resubmit, stay on
track, learn to think like a programmer. On marketing pages: free, flexible, made
to fit, your schedule, real public school. Encouraging and growth-oriented, never
punitive.

**CTAs:** short imperative pairs, two or three words. "Get Started" / "Learn
More", "Student Login" / "Enroll Now".

**Em dashes:** used sparingly. Prefer a colon for definitions, a period to split
sentences, parentheses for asides, or "and"/"to" for ranges. The middot ( · ) is
the workhorse separator in eyebrows and table cells.

**Emoji:** none. Warmth comes from colour, shape, and type. A filled star (★) is
the one glyph used, marking project and capstone milestones in schedule tables.

**Numerals:** plain and factual (dates, lesson numbers, grade levels). No
invented statistics, no data-slop.

## Iconography

Icons are **single-weight outline** (Lucide-style), always navy, drawn as inline
SVG with `stroke="currentColor"`. They appear inline in the quick-facts grid
(refresh, calendar, clock, monitor, user, mail) and inside `IconSwatch`. No emoji
or unicode-character icons, except the ★ milestone marker.

**Substitution:** no MIPS icon set was provided. [Lucide](https://lucide.dev) is
the closest freely-available match and the recommended source. This is a flagged
substitution.

## Logo

`assets/logo-lockup.png` is the MIPS parent-school lockup: maize hexagon with the
Mackinac Bridge silhouette in navy, paired with "MICHIGAN" (heavy) over
"INTERNATIONAL PREP SCHOOL" (light) in navy. Transparent PNG, used in the
document running header at ~26px tall.

**The navy wordmark is not legible on navy.** On dark surfaces use reversed or
white type instead.

The School of Technology has its own mark set — including a proper reversed
lockup — outside this system, in the site repository at `assets/logo/`. Prefer
those for School of Technology surfaces; see that folder's README for
proportions, clear space, and minimum sizes.

## Course authoring rules

Fixed for every MIPS syllabus:

1. **One semester per syllabus.** Fall (Semester 1, 18 instructional weeks) or
   Winter (Semester 2, 20 weeks). Fit the course content to that semester's
   instructional weeks from `calendar/calendar-2026-2027.json`, inserting each
   break (Labor Day, Thanksgiving, Winter, Spring, State Testing,
   Presidents'/Memorial Day) as a "no new lessons" row.
2. **Instructor is always Eric Muenchen** — `muenchen@miprepschool.org`.
3. **Semester toggle.** The template's `semester` prop (`fall` / `winter`)
   auto-sets the running-header label, the title eyebrow, and the quick-facts
   term dates. Set it first, then author the schedule against that week grid.
4. **Never invent a grading scale.** If the user does not provide one, ask how
   the final grade is composed before finishing.

## How to make a new syllabus

**Copy the closest existing syllabus from the site repository**, not the template
below. The shipped syllabi are ahead of `Syllabus.dc.html` (see Caveats) and are
the current reference for structure, print rules, and copy.

Build the schedule from the matching week grid in `calendar/calendar.md`. Print
via the `.doc-page` shell (US Letter, 0.7in margins).

## Caveats — help me iterate

- **`templates/syllabus/Syllabus.dc.html` is behind the shipped syllabi.** It
  still uses the MIPS parent lockup rather than the School of Technology mark,
  carries no course mark, has none of the print work (forced background colours,
  ink-light printing, page margins), and still describes the weekly meetup as
  "optional" rather than recommended. Treat it as historical. Re-derive it from a
  current syllabus before using it as a starting point again.
- **`_ds_bundle.js` is not present.** The two source systems were merged here,
  and their compiled bundles carried conflicting namespaces
  (`MIPSDesignSystem_6fe64d` and `DesignSystem_762628`). Rather than ship a
  contradictory artefact, the bundle was dropped; `_ds_manifest.json` was rebuilt
  by hand and verified against the files actually on disk. Both the bundle and
  `_adherence.oxlintrc.json` should be regenerated by Claude Design on the next
  export of the consolidated project.
- **No real icon set.** Lucide is substituted; attach MIPS's own SVGs to swap it.
- **Fonts load from the Google Fonts CDN** (Poppins + Source Serif Pro), matching
  the live site. No self-hosted `@font-face` files, so the system reports 0 fonts
  — this is expected.
- **No photography or illustration assets.** Everything is type, colour, and the
  maize/navy motif system.
- **The source systems were built from a written brand brief and one reference
  syllabus**, not from a codebase or Figma file. Treat the visual decisions as a
  strong, well-tested draft rather than a ground-truth recreation.
