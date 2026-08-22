# MIPS School of Technology

The website for the School of Technology at [Michigan International Prep
School](https://www.miprepschool.org/) — a tuition-free K-12 online public
charter school in Michigan. A landing page, the 2026–2027 course catalog, and
printable syllabi for ten courses across five pathways.

Instructor: Eric Muenchen · `muenchen@miprepschool.org`

## Run it locally

Static site, no build step:

```bash
python3 -m http.server 8000    # http://localhost:8000
```

Serve over HTTP rather than opening files directly — `file://` breaks the
stylesheet path and the landing-page bundle.

## Pathways

| Pathway | Courses |
| --- | --- |
| Foundations of Programming | Exploring Technology and Art · Intro to Python |
| Cybersecurity | Intro to Cybersecurity · Ethical Hacker · CyberDefense Pro |
| IT & Hardware | IT Fundamentals · PC Pro A · PC Pro B |
| Web Development | Web Design and Dev I · Web Design and Dev II |
| Emerging Technology | Artificial Intelligence |

## Documentation

- **[`docs/HANDOFF.md`](docs/HANDOFF.md)** — the complete handoff: architecture,
  the design system, print rules, known gaps, and how to ship a change. Start here.
- **[`CLAUDE.md`](CLAUDE.md)** — the short operating brief, loaded automatically
  by Claude Code.
- **`_ds/mips-design-system-course-syllabi-*/readme.md`** — the brand bible:
  colour, type, voice, and syllabus authoring rules.

## Before you edit

`index.html` is a **generated bundle**, not source — hand-editing it will
corrupt it. The syllabi and catalog are plain HTML and can be edited directly.
`docs/HANDOFF.md` §2 explains the difference.
