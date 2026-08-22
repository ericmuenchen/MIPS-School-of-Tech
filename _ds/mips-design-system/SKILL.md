---
name: mips-design
description: Use this skill to generate well-branded interfaces, documents, and assets for Michigan International Prep School (MIPS) and its School of Technology, either for production or throwaway prototypes/mocks. Contains the brand guidelines, colors, type, fonts, logo, academic calendar, course-syllabus rules, and UI kit components.
user-invocable: true
---

Read `readme.md` in this skill first, then explore the other files.

If the user invokes this skill without other guidance, ask what they want to
build, then act as an expert designer who outputs static HTML artifacts or
production code, depending on the need.

## Key files

- **`styles.css` + `tokens/`** — link `styles.css` to inherit every colour, type,
  spacing, radius, and shadow token. This is the only runtime dependency.
- **`readme.md`** — the brand bible: colour, type, voice, iconography, and the
  course-authoring rules. The colour values there are verified against
  `tokens/colors.css`.
- **`components/`** — `core/` is the document vocabulary (AccentRule, Badge,
  Button, IconSwatch, InfoCard, Card); `forms/`, `feedback/`, and `navigation/`
  cover marketing and app surfaces. Each ships `.jsx`, `.d.ts`, and
  `.prompt.md`.
- **`guidelines/`** — specimen cards for colour, type, spacing, radius/shadow.
- **`calendar/calendar-2026-2027.json`** and **`calendar.md`** — the MIPS
  academic year. Syllabus schedules are built from these week grids.
- **`templates/marketing-site/MarketingSite.dc.html`** — the marketing homepage.

## Authoring a course syllabus

**Start from a current syllabus in the site repository, not from
`templates/syllabus/Syllabus.dc.html`.** That template is behind the shipped
syllabi: it predates the School of Technology mark, the course marks, and all of
the print work. `readme.md` has the details under Caveats.

Three rules are fixed and must not be invented: one semester per syllabus, the
instructor is always Eric Muenchen (`muenchen@miprepschool.org`), and the grading
scale must come from the user — ask if it is not supplied.

## Notes

Fonts (Poppins, Source Serif Pro) and icons (Lucide) are flagged substitutions.
See "Caveats" in `readme.md` before treating them as final or licensed assets.
