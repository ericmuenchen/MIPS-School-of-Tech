# MIPS Design System — Course Syllabi

A design system for **Michigan International Prep School (MIPS)**, a tuition-free K-12 online public charter school in Michigan. This system exists to author **course syllabi** (and other MIPS documents) on brand, so every teacher's syllabus shares one confident, maize-and-navy look.

## Sources

- **`Exploring Technology & Art Syllabus/`** — a mounted project (read-only) containing the reference syllabus this system is built from. It shipped with its own bound design system at `_ds/mips-design-system-6fe64d3a-…/`; the tokens, fonts, and brand rules here were copied verbatim from that closure, and the syllabus template reproduces its structure.
- **`assets/logo-lockup.png`** — the real MIPS logo lockup (maize hexagon with the Mackinac Bridge silhouette in navy, plus the wordmark), provided in that project.
- No Figma file or public codebase was attached; the reference syllabus is the ground truth.

## Index (manifest of this project)

- **`styles.css`** — global entry point. Link this one file to consume the system. Imports every token/font file below.
- **`tokens/`** — `colors.css`, `typography.css`, `spacing.css`, `fonts.css` (Google Fonts import), `base.css` (resets).
- **`components/core/`** — reusable primitives: **Button**, **Badge**, **IconSwatch**, **AccentRule**, **InfoCard**.
- **`guidelines/`** — foundation specimen cards (colors, type, spacing, radius/shadow) for the Design System tab.
- **`templates/syllabus/`** — the **Course Syllabus** template (`Syllabus.dc.html`), a one-page, edit-in-place syllabus with a Fall/Winter semester toggle. Ships `ds-base.js` (loads the system) and `doc-page.js` (paged/printable shell).
- **`calendar/`** — the **MIPS academic calendar** for 2026–2027: `calendar-2026-2027.json` (structured), `calendar.md` (reference), and a Calendar specimen card. Source PDF in `uploads/`.
- **`assets/`** — `logo-lockup.png`.
- **`SKILL.md`** — Agent-Skill wrapper so this system can be downloaded and used in Claude Code.

## Components

A focused set matching the syllabus's visual vocabulary (the reference is a document, not a component library, so this is intentionally small rather than a full form/dialog kit):

- **Button** — pill button; `solid` (navy), `maize` (one CTA per screen), `outline` (secondary).
- **Badge** — small uppercase pill label; `navy` / `maize` / `muted`.
- **IconSwatch** — the signature motif: navy line icon on a maize rounded square.
- **AccentRule** — the short maize pill that marks the start of every section.
- **InfoCard** — surface panel; `plain` (white + shadow), `maize` (highlight), `navy` (inverted emphasis).

### Intentional additions

- **AccentRule** and **IconSwatch** codify the two most-repeated devices in MIPS documents (the section-start pill and the paint-swatch icon) so consumers don't hand-roll them inconsistently.

## Content fundamentals

**Instructor & contact:** always **Eric Muenchen**, `muenchen@miprepschool.org`. Fixed across all syllabi.

**Voice:** direct, warm, student-first. The syllabus speaks to the student as **"you"** ("build your own interactive games", "work at your own pace") and the instructor as **"I"**. Short declarative sentences.

**Casing:** section headings are title case ("Course Description", "Semester Schedule"); eyebrows and labels are UPPERCASE with wide letter-spacing ("UNIT 1 · GAMES", "INSTRUCTOR").

**Tone words:** your pace, no penalty for late work, revise and resubmit, stay on track, learn to think like a programmer. Encouraging and growth-oriented, never punitive.

**Em dashes:** used sparingly. Prefer a colon for definitions, a period to split sentences, parentheses for asides, or "and"/"to" for ranges. A middot ( · ) is the workhorse separator in eyebrows and table cells.

**Emoji:** none. Warmth comes from color, shape, and type. A filled star (★) is the one glyph used, marking project/capstone milestones in schedule tables.

**Numerals:** plain and factual (dates, lesson numbers, grade levels). No invented statistics or data-slop.

## Visual foundations

**Color:** white is the dominant background; documents breathe on white, not tinted surfaces. **Navy (#02225A)** is the structural anchor: headings-as-eyebrows, table headers, the AI-policy block, icons. **Maize (#FFE000)** is accent/energy only: the section-start pill, icon swatches, the highlight panel, the quick-facts band. Never maize for body text. **Red (#A71000)** is validation-only, never decorative. Body text is soft gray (#333); headlines are near-black ink (#32373C), not navy.

**Type:** two deliberately contrasting roles. Display/headings are **Poppins**, heavy (600–700), tight tracking (-0.02em), in ink. Body is **Source Serif Pro** at 18px, weight 400, roomy 1.6+ leading, in gray. UI chrome (eyebrows, labels, table headers, buttons) is Poppins. The chunky-display / clean-serif-body gap is the core typographic personality.

**Spacing:** 4px base unit. Sections are separated by generous vertical whitespace (~40px between a section and the next AccentRule). Layouts are centered and unhurried.

**Backgrounds:** flat white. No gradients, no photographic hero imagery, no textures. The only "imagery" is the maize/navy motif system (swatches, pills, hexagon logo).

**Borders:** thin (1–1.5px) gray hairlines on the quick-facts grid and schedule tables; 2px navy on outline buttons. Schedule table headers are solid navy with white text; alternating rows use gray-100.

**Shadows:** soft and shallow (`--shadow-sm/md/lg`), on cards and the quick-facts panel only. Never on buttons or icons.

**Corner radii:** buttons are full pill; cards/panels use large soft rounding (20px); the quick-facts band and grading box use medium/large rounding; icon swatches use 14px. Nothing is sharp-cornered.

**Cards:** plain white surface, soft shadow, no border, generous padding, large rounding. **Never** a colored left-border accent bar.

**Animation:** minimal. Buttons transition background on hover (~140ms ease, no bounce). Treat the brand as calm and mostly static.

**Hover / press:** outline buttons get a soft gray fill; solid/maize deepen one color step. No opacity fades, no scale/shrink.

## Iconography

Icons are **single-weight outline** (Lucide-style), always navy, drawn as inline SVG with `stroke="currentColor"`. In the reference syllabus they appear inline in the quick-facts grid (refresh, calendar, clock, monitor, user, mail) and inside `IconSwatch` (calendar, message). **Substitution:** no MIPS icon set was provided; [Lucide](https://lucide.dev) is the closest freely-available match and the recommended source. This is a flagged substitution. No emoji or unicode-character icons (except the ★ milestone marker in schedule tables).

## Logo

`assets/logo-lockup.png` — maize hexagon containing the Mackinac Bridge silhouette in navy, paired with "MICHIGAN" (heavy) over "INTERNATIONAL PREP SCHOOL" (light) in navy. Transparent PNG. Used in the syllabus running header at ~26px tall. **The navy wordmark is not legible on a navy background** — on dark surfaces (like the AI-policy block or a footer) use plain reversed/white type instead. Flag if a white lockup exists.

## Course authoring rules

These are fixed for every MIPS syllabus:

1. **One semester per syllabus.** A syllabus covers exactly one term: **Fall (Semester 1)** or **Winter (Semester 2)**. Ask the user which one, then fit all uploaded course content into that semester's instructional weeks from `calendar/calendar-2026-2027.json` — inserting each break (Labor Day, Thanksgiving, Winter, Spring, State Testing, Presidents'/Memorial Day) as a "no new lessons" row. Fall has 18 instructional weeks; Winter has 20.
2. **Instructor is always Eric Muenchen** — `muenchen@miprepschool.org`. The template hard-codes these; do not change them unless the user explicitly asks.
3. **Semester toggle.** The template's `semester` prop (`fall` / `winter`) auto-sets the running-header label, the title eyebrow, and the quick-facts term dates. Set it first, then author the schedule tables against that semester's week grid.
4. **Grading scale.** If the user does not provide a grading scale, **prompt for it** before finishing — how the final grade is composed (e.g. equal-weight projects, letter-grade bands, points). Do not invent one silently.

## How to make a new syllabus

Open `templates/syllabus/Syllabus.dc.html` (or copy the folder). Pick the **semester** tweak (Fall/Winter). Every heading, paragraph, list item, and table row is directly click-editable — replace the placeholder copy with the course's content, and build the schedule from the matching week grid in `calendar/calendar.md`. The `meetingUrl` (1:1 scheduling link) is a tweakable prop. Print/export via the built-in `doc-page` shell (Letter, 0.7in margins).

## Caveats — help me iterate

- **No white/reversed logo** for dark backgrounds. Please attach one if it exists.
- **No real icon set.** Lucide is substituted; attach MIPS's own SVGs to swap it in.
- **Fonts load from Google Fonts CDN** (Poppins + Source Serif Pro), matching the reference. No self-hosted `@font-face` files, so the system reports 0 fonts — this is expected.
- **Small component set by design.** If you want a fuller kit (forms, dialogs, a marketing-site UI kit), say so and I'll build it out.
- The reference syllabus is the only source; treat everything here as a strong first draft to refine against your real MIPS brand assets.
