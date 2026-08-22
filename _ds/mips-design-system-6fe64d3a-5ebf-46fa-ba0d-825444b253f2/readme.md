# MIPS Design System

Design system for **Michigan International Prep School (MIPS)**, a tuition-free, K-12 online public charter school in Michigan.

## Sources

No codebase, Figma file, or slide deck was attached for this project. This system was built entirely from a written brand brief provided by the user (company description + brand notes), reproduced in full context at the top of this project's history. There is no existing product surface (site, app, or deck) to read code from, everything here is a first-pass interpretation of that brief, built to be iterated on.

**If you have a real MIPS codebase, Figma file, logo files, or webfonts, please attach them**, this system should be rebuilt from those sources rather than the brief alone. See "Caveats" at the bottom.

## Brand summary

MIPS is friendly, energetic, and approachable, but credible enough for parents making a real schooling decision, bright and encouraging, not corporate. The identity runs on a maize-and-navy Michigan pairing (echoing University of Michigan colors): golden yellow as a high-energy accent, deep navy as the structural anchor. Centered layouts, lots of white space, big confident headlines, yellow accent circles behind simple navy line icons, and pill-shaped outline buttons define the look.

## Editorial policy: em dashes sparingly

Em dashes are fine in moderation, for the occasional aside or emphasis, but don't overuse them. Default to a colon for definitions, a period to split sentences, parentheses for asides, or "and"/"to" for ranges, and reach for an em dash only when it genuinely reads best. Applies to everything authored here and to copy generated from the system.

## Index

- `styles.css`, root stylesheet, imports every token/font file below. Link this one file to consume the system.
- `tokens/`, `colors.css`, `typography.css`, `spacing.css`, `fonts.css` (Google Fonts import), `base.css` (resets).
- `components/core/`, Button, Card, Badge, IconSwatch
- `components/forms/`, Input, Select, Checkbox, Radio, Switch
- `components/feedback/`, Tooltip, Toast, Dialog
- `components/navigation/`, Tabs
- `guidelines/`, foundation specimen cards (colors, type, spacing, radius/shadow, brand motifs)
- `ui_kits/marketing-site/`, click-through recreation of the MIPS marketing website (Home, Enroll, Student Login)
- `assets/logo-lockup.png`, real MIPS logo lockup (hexagon + Mackinac Bridge mark, wordmark), provided by the user

## Components

Full inventory (no source library was attached, so this is a from-scratch standard set sized to a marketing/enrollment site's needs, see "Intentional additions" below):

- **Core:** Button (pill, outline/solid/maize), Card, Badge, IconSwatch
- **Forms:** Input, Select, Checkbox, Radio, Switch
- **Feedback:** Tooltip, Toast, Dialog
- **Navigation:** Tabs

### Intentional additions

- **IconSwatch**, not requested explicitly, but codifies the brief's single most-repeated visual device (a hand-painted yellow paint-swatch shape behind a navy line icon). Needed so every consumer doesn't hand-roll this shape differently.

## Typography

Sampled from the live site: **Poppins** (400–700) is the primary sans, used for both display and body. **Source Serif Pro** is the editorial serif for pull quotes and long-form article copy. Both are loaded from Google Fonts CDN in `tokens/fonts.css` (`--font-display`, `--font-body`, `--font-serif`).

## Content fundamentals

**Voice:** direct, warm, student-first. Short declarative sentences ("Free, K-12 Online School.", "Quick Facts"). Copy speaks to the parent/family reader but centers the student.

**Casing:** sentence case throughout, including headlines ("Free, K-12 Online School." not "Free, K-12 Online School"). Section labels like "Quick Facts" are title case.

**Tone words:** free, flexible, made to fit, your pace, your schedule, real public school (used to reassure parents this isn't a lesser alternative to a physical school).

**Emoji:** none. The brand's warmth comes from color, shape, and typography, not emoji.

**Numerals:** used plainly for facts ("K-12", grade levels), no invented statistics. Avoid data-slop; MIPS copy stays qualitative and reassuring rather than stat-heavy.

**CTAs:** short imperative pairs, "Get Started" / "Learn More", "Student Login" / "Enroll Now", never more than 2-3 words.

## Visual foundations

**Color:** White is the dominant background, the design breathes on white, not on tinted surfaces. Navy (`--color-navy-700`, #1B2A63) is the anchor color: wordmark, line-art icons, most structural UI, body of buttons when filled. Maize (`--color-maize-500`, #FFE200) is an accent/energy color only, paint-swatch shapes behind icons, highlight badges, one CTA per screen at most. Never use maize for body text or large text blocks (contrast fails and it reads as clutter, not brand). Red is reserved exclusively for form validation (required-field asterisks, error states), never decorative.

**Type:** two roles, deliberately contrasting. Display/headline text is heavy, rounded, and tight-tracked, sitting in near-black (`--color-ink-900`, #141414), not navy. Body copy is light-to-regular weight, roomy line-height (1.6+), soft gray (`--color-gray-600`, #555). The gap between chunky display and clean body is the core typographic personality, don't soften the display weight or tighten the body leading.

**Spacing:** base unit 4px, scaling to large section gaps (`--section-gap-sm` 64px, `--section-gap-lg` 128px). Layouts are centered with generous vertical whitespace between sections, this is a defining rhythm, not incidental padding. Avoid dense, edge-to-edge layouts.

**Backgrounds:** flat white, no gradients, no photographic full-bleed hero imagery in the source brief (imagery wasn't described/provided), the "imagery" the brand actually uses is the hand-painted yellow paint-swatch shape, an abstract blob, not a photo. No repeating patterns or textures were described.

**Animation:** none specified in the brief. Treat this as a calm, mostly-static brand, if animating (e.g. a hover), keep it subtle (short ease, no bounce/spring) rather than playful/bouncy, since nothing in the source suggests motion is part of the identity.

**Hover states:** outline buttons get a soft muted-gray fill on hover; solid/maize buttons darken one step (see `--brand-primary-hover`, `--accent-primary-hover`). No lightening, no opacity fades, a color-step change reads more confidently at this weight.

**Press states:** not specified; treat consistently with hover (no separate scale/shrink effect described in the brief).

**Borders:** thin (1.5–2px), navy, single-weight, used on outline buttons, checkboxes, radios. No heavy or double borders.

**Shadows:** soft and shallow (`--shadow-sm/md/lg`), used only on cards, dialogs, and toasts to lift them off white, never on buttons or icons.

**Corner radii:** buttons are always full pill (`--radius-pill`). Cards/dialogs use large soft rounding (`--radius-lg`, 20px). Form fields use small rounding (`--radius-sm`, 8px). Nothing in the system is sharp-cornered.

**Cards:** plain white surface, soft shadow, no border, generous internal padding, large rounding, never a colored left-border accent bar.

**Transparency/blur:** only used for the dialog scrim (45% black, no blur), no frosted-glass or backdrop-blur treatments described.

**Imagery color vibe:** not specified in the brief (no imagery provided), see Caveats.

## Iconography

No icon codebase, sprite, or icon font was provided. The brief describes "simple navy single-weight line icons (medal, handshake, laptop, theatre masks, etc.)" but supplies no actual icon files. **Substitution: [Lucide](https://lucide.dev) is loaded from CDN** (`unpkg.com/lucide`) as the closest freely-available match, single-weight outline strokes, no fill, recolorable via `currentColor`, used throughout components and the marketing-site UI kit (`award`, `handshake`, `laptop`, `medal`, `graduation-cap`, `drama`). This is a flagged substitution, not a confirmed match to MIPS's real icon set. Icons are always shown at single weight and colored navy, generally inside an `IconSwatch` (the paint-swatch motif). No emoji or unicode-character icons are used.

## Logo

The real MIPS logo lockup was provided and lives at `assets/logo-lockup.png`, hexagon containing the Mackinac Bridge silhouette in navy-on-maize, paired with "MICHIGAN" (heavier weight) over "INTERNATIONAL PREP SCHOOL" (lighter weight) in navy. It's transparent-background PNG, used in the marketing-site header and `guidelines/brand-logo.card.html`. The footer (navy background) still uses a plain-text wordmark, since the lockup's navy type isn't legible on navy, a reversed/white lockup would be needed for dark backgrounds; flag if one exists.

## Caveats, please help me iterate

- **No reversed/white logo lockup for dark backgrounds.** The navy-lockup logo isn't legible on the navy footer, so the footer still uses a plain-text wordmark. If a white/reversed version exists, please attach it.
- **No real icon set.** I substituted Lucide icons from CDN. If MIPS has its own icon SVGs, please attach them so I can swap the substitution out.
- **Fonts now match the live site** (miprepschool.org): Poppins (primary sans) + Source Serif Pro (serif), both from Google Fonts. Colors are sampled from the site too.
- **No photography/illustration assets.** The brief doesn't describe or include any photos/illustrations, so none are used, everything is type, color, and the paint-swatch/icon motif. If MIPS uses photography on the real site, please share samples.
- **Only one UI kit (marketing website) was built**, since the brief only describes a marketing/enrollment site, no app, portal, or additional product surface was mentioned. Let me know if there's a student/parent portal to design as well.
- **No source codebase or Figma was attached**, so every visual decision here is inferred from the written brief rather than verified against a real product. Treat this as a strong first draft, not a ground-truth recreation.
