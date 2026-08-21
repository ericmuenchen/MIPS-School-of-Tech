# MIPS School of Tech — course marks

Eleven course logos for the MIPS School of Tech syllabi. Each is a School of Tech hexagon
(navy `#02225A` fill, maize `#FFE000` inner outline) carrying that course's pathway icon
in maize line art.

## Files

- `*.svg` — transparent, `viewBox="0 0 200 176"`, no fixed width/height. Scale with CSS
  (`width`/`height`) or an `<img>`. Colors are hard-coded brand values, not `currentColor`.
- `png/<slug>-128.png`, `png/<slug>-512.png` — transparent PNGs for raster contexts.

Aspect ratio is 200 : 176 (≈1.136 : 1). In the syllabus running header the mark sits at
about 26–34px tall, matching the MIPS logo lockup.

## Course map

| Course | File |
| --- | --- |
| Exploring Technology and Art | `exploring-technology-and-art.svg` |
| Intro to Python | `intro-to-python.svg` |
| Intro to Cybersecurity | `intro-to-cybersecurity.svg` |
| Ethical Hacker | `ethical-hacker.svg` |
| CyberDefense Pro | `cyberdefense-pro.svg` |
| IT Fundamentals | `it-fundamentals.svg` |
| PC Pro A | `pc-pro-a.svg` |
| PC Pro B | `pc-pro-b.svg` |
| Web Design and Development I | `web-design-and-development-i.svg` |
| Web Design and Development II | `web-design-and-development-ii.svg` |
| Artificial Intelligence | `artificial-intelligence.svg` |

## Usage

```html
<img src="logos/intro-to-python.svg" alt="" style="height: 32px; width: auto;">
```

Inline the SVG instead if you need the paths in the document (e.g. for print color control).
