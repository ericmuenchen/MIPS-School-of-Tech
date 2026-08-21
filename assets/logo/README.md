# MIPS School of Technology logo

Drop-in assets for the website. Everything is vector; nothing here is a raster
trace, so it scales cleanly at any size.

## Files

| File | Use it for |
| --- | --- |
| `school-of-technology-logo.svg` | The full lockup as one file. Self-contained, needs Poppins installed or webfont-loaded to render the wordmark exactly. |
| `school-of-technology-logo-reversed.svg` | Same lockup with a white wordmark, for navy or photo backgrounds. |
| `school-of-technology-mark.svg` | The diamond mark alone — favicon, app icon, avatar, tight spaces. |
| `Logo.jsx` | React component. Text is live HTML, so it always renders with the real webfont. `height` prop sets the mark height; everything scales from it. |
| `logo.html` | Same lockup in plain HTML + CSS with a `--sot-mark-h` custom property. |
| `school-of-technology-logo.png` | 6544×1816 raster, for anywhere SVG isn't an option (social cards, slides, email). |

Prefer `Logo.jsx` or `logo.html` on the site: the wordmark is real text, so it
stays selectable, accessible, and correct even before the SVG font resolves.
Use the SVG files for downloads, README badges, and third-party embeds.

## Colors

| Name | Hex | Where |
| --- | --- | --- |
| MIPS navy | `#1E2759` | Diamond fill, wordmark |
| MIPS maize | `#FEE003` | Border, circuit traces, node rings |

Both are sampled from the existing MIPS horizontal logo — no new colors.

## Type

Poppins. `School of` is Regular (400), `Technology` is Bold (700). The two
lines are set to the same width: line 1 uses `letter-spacing: 0.089em` and
`word-spacing: 0.2em` at 156/438 of the mark height, line 2 uses
`letter-spacing: 0.01em` at 148/438.

```html
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap">
```

## Proportions and spacing

All measurements are relative to the mark height (`438` units in the source):

- Gap between mark and wordmark: `88 / 438`
- Gap between the two text lines: `24 / 438`
- The two text lines together are 75% of the mark height.
- Clear space on all sides: at least 25% of the mark height.

## Minimum size

Don't render the mark below 32px tall in the full lockup — below that, use
`school-of-technology-mark.svg` on its own.

## Don't

- Recolor the mark or wordmark outside navy, white, and maize.
- Re-stack the wordmark or change the two-line break.
- Add effects (shadows, gradients, outlines) or place the navy version on a
  dark background — use the reversed file instead.
