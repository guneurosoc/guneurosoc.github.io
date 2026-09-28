# DESIGN.md: how BRAND.md applies to the website

`brand/BRAND.md` is the source of truth. This file only says how it maps onto the site. Where the two disagree, BRAND.md wins. Everything BRAND.md doesn't cover is listed at the end under "Decisions not covered by BRAND.md", for the committee to add to the guide.

Tokens live in `src/styles/tokens.css`. Use the semantic utilities (`bg-bg`, `bg-surface`, `text-text`, `text-text-muted`, `text-link`, `bg-cta`, `bg-chip`, `text-headline`, `border-border`, ...). The 14 brand colours are also available by name (`bg-indigo`, `text-cream`, `var(--color-hot-pink)`). Tailwind's default palette is switched off, so only brand colours exist.

Contrast ratios below are WCAG 2.x, computed from the hex values (sRGB relative luminance). Ratios marked (B) are the ones BRAND.md already lists. All the others were computed for this file.

## 1. Colour roles

Dark is the default (`:root`). Light is `:root[data-theme="light"]`, set by the header toggle and kept in localStorage. There is no `prefers-color-scheme` switching, because the brief says dark by default.

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--bg` | night `#0A0716` | cream `#FEFADD` | page background |
| `--surface` | `#161033` (role.surface) | white `#FFFFFF` | cards, header, drawer |
| `--surface-2` | navy `#241D52` | `#EEEBFF` (text-on-dark) | nested panels, secondary-button hover |
| `--text` | `#EEEBFF` | navy | body text |
| `--text-muted` | mist `#B4AED6` | indigo `#543FCA` | secondary text, captions |
| `--primary` | indigo | indigo | full-width bands and panels ("poster" sections) |
| `--on-primary` | cream | cream | the only text colour on indigo (white is also fine) |
| `--cta` / `--cta-text` / `--cta-border` | hot pink / night / hot pink | hot pink / navy / navy | primary buttons |
| `--secondary` | electric blue | electric blue | secondary-button border, outlines |
| `--link` | electric blue | deep violet `#5D16E9` | inline links on `--bg` |
| `--link-on-surface` | sky `#8AD2FE` | deep violet | inline links on `--surface`, `--surface-2` |
| `--focus-ring` / `--focus-ring-halo` | hot pink / night | hot pink / navy | focus indicator |
| `--chip` / `--chip-text` | poster yellow / black | poster yellow / black | chips and date strips only |
| `--headline` / `--headline-shadow` | cream / navy | indigo / navy | display headlines |
| `--glow` | lavender | lavender | synapse glow, soft highlights |
| `--border` | navy | lavender | decorative dividers, card edges |
| `--border-strong` | mist | indigo | form-control edges, anything that must be seen |

### Contrast checks, dark theme

| Pair | Ratio | Verdict |
|---|---|---|
| text `#EEEBFF` on night | 17.03 (B) | any text |
| text on surface `#161033` | 15.54 | any text |
| text on navy | 13.09 | any text |
| mist on night | 9.45 (B) | any text |
| mist on surface | 8.62 | any text |
| mist on navy | 7.26 | any text |
| electric blue on night | 4.78 (B) | links on `--bg`, normal text passes (just) |
| electric blue on surface | 4.36 | **fails** normal text, so links on surfaces use sky |
| electric blue on navy | 3.67 | **fails** normal text, so links on surfaces use sky |
| sky on night / surface / navy | 12.07 (B) / 11.01 / 9.27 | any text |
| night on hot pink (CTA label) | 7.56 | any text |
| hot pink on night / surface / navy | 7.56 (B) / 6.89 / 5.81 | any text; also ≥3:1 for focus ring |
| black on poster yellow (chip) | 14.60 (B) | any text |
| cream on night / surface | 18.90 / 17.24 | headlines |
| cream on indigo | 6.78 (B) | headlines and body on bands |
| `#EEEBFF` on indigo | 6.11 | any text |
| mist on indigo | 3.39 | **not for text**: no muted text on indigo bands |
| electric blue on indigo | 1.71 | **never**: no blue links on bands, use cream + underline |
| mist (`--border-strong`) on night | 9.45 | form-control edge, ≥3:1 |
| electric blue (secondary border) on night / surface / navy | 4.78 / 4.36 / 3.67 | ≥3:1 non-text |
| navy (`--border`) on night | 1.30 | decorative only |
| indigo band on night | 2.79 | decorative only (the text on it is what matters) |

### Light theme derivation

- Background: **cream**. Surface: **white**. Surface-2: **`#EEEBFF`**. Text: **navy**. Secondary text: **indigo**.
- Links: **deep violet**, because electric blue fails on white (4.17, B) and on cream (3.96).
- Pink stays a fill (CTA, focus ring), never text (BRAND.md: pink on white 2.63).

| Pair | Ratio | Verdict |
|---|---|---|
| navy on cream / white / `#EEEBFF` | 14.52 / 15.30 (B) / 13.09 | any text |
| indigo on cream / white / `#EEEBFF` | 6.78 / 7.14 (B) / 6.11 | any text (muted, headlines) |
| deep violet on cream / white / `#EEEBFF` | 7.23 / 7.62 / 6.52 | links |
| navy on hot pink (CTA label) | 5.81 | any text |
| hot pink on cream / white | 2.50 / 2.63 (B) | **never text**; CTA gets a navy border, focus ring gets a navy halo |
| navy (CTA border, focus halo) on cream | 14.52 | ≥3:1 non-text |
| black on poster yellow (chip) | 14.60 (B) | any text |
| poster yellow on cream | 1.37 | chips need their black border |
| electric blue (secondary border) on cream / white | 3.96 / 4.17 | ≥3:1 non-text |
| indigo (`--border-strong`) on cream | 6.78 | ≥3:1 non-text |
| lavender (`--border`, `--glow`) on cream / white | 1.94 / 2.04 | decorative only |
| cream on indigo (bands, both themes) | 6.78 (B) | any text |
| navy / black on lavender | 7.49 (B) / 10.27 (B) | if lavender is ever a fill |

## 2. Type

| Role | Font | Weight | Case | Token / utility |
|---|---|---|---|---|
| Hero line | Unbounded | 900 | CAPS | `font-display text-hero font-black uppercase` |
| h1 | Unbounded | 900 | CAPS | `text-h1` |
| h2 | Unbounded | 800 | CAPS | `text-h2 font-extrabold` |
| h3 | Unbounded | 800 | Sentence | `text-h3` |
| Lead / pitch | Poppins | 400 | Sentence | `text-lead` |
| Body | Poppins | 400 | Sentence | `text-base` (1rem / 1.6) |
| Labels, nav, dates, buttons | Poppins | 600 | Sentence (chips CAPS) | `font-semibold` |
| Taglines ("everyone welcome!") | Poppins | 700 italic | lower | `font-bold italic` |
| Chunky alternative | Archivo Black | 400 | CAPS | `font-display-alt` |

Fluid sizes, computed from the clamps in tokens.css:

| Token | 360 px | 768 px | 1440 px |
|---|---|---|---|
| `text-hero` | 42.2 | 64.6 | 96 |
| `text-h1` | 31.4 | 45.3 | 64 |
| `text-h2` | 28.8 | 37.0 | 44 |
| `text-h3` | 20.3 | 23.4 | 26 |
| `text-lead` | 18.2 | 19.9 | 21 |

- The minimums are measured against a 328 px column (360 px screen minus 16 px padding on each side). In Unbounded 900, "NEUROSCIENCE" sets 10.30 em wide and fits up to 31.9 px; "CONSTITUTION" sets 9.90 em and fits up to 33.1 px; "NEUROSOC" sets 7.33 em and fits up to 44.7 px. Keep hero lines to words of 8 letters or fewer, or switch that heading to `font-display-alt` (Archivo Black is about 13% narrower).
- The display stack is `Unbounded, Archivo Black, system-ui`. Any glyph outside the Unbounded subset (for example ŵ) falls back to Archivo Black, not to the system font.
- Only these faces ship: Unbounded 800–900 (one variable file), Poppins 400, 600 and 700 italic, and Archivo Black 400. Don't use `font-bold` non-italic or `font-medium`, because the browser would synthesise them.

### Font files (`public/fonts/`, OFL-1.1, licence `.txt` beside each family)

| File | Bytes | Route |
|---|---|---|
| `Unbounded-Variable.woff2` | 38,908 | `subset-font` 2.9.0 (harfbuzz wasm, npm) in $TMPDIR: unicodes U+0000-00FF, U+2013-2014, U+2018-201D, U+2026, U+20AC, U+2122; wght axis narrowed to 800–900 and kept variable. The full, unsubset file was 261,028 bytes. |
| `Poppins-Regular.woff2` | 51,528 | `wawoff2` 2.0.1 (`npx -p wawoff2 woff2_compress.js`), not subset |
| `Poppins-SemiBold.woff2` | 51,456 | wawoff2, not subset |
| `Poppins-BoldItalic.woff2` | 57,844 | wawoff2, not subset |
| `ArchivoBlack-Regular.woff2` | 31,228 | wawoff2, not subset |

The pip / fonttools route was not available: there was no pip or ensurepip in the environment. The Unbounded `@font-face` uses `font-weight: 800 900`, so weight maps onto the wght axis automatically and no `font-variation-settings` is needed. All faces use `font-display: swap`.

## 3. Spacing, radius, shadow

- **Spacing:** Tailwind's default 0.25 rem scale.
  - Section rhythm: `py-16 md:py-24`.
  - Content width: `max-w-6xl px-4 sm:px-6`. Prose: `max-w-prose`.
  - Grid gap: `gap-6`. Card padding: `p-6`.
- **Radius:**
  - `rounded-card` (1 rem) for cards and panels, matching the swatch corners on brand-sheet.png.
  - `rounded-full` for buttons and chips, matching the poster's pill labels.
  - Logo: `rounded-full`.
- **Shadows (only two kinds, no soft grey shadows):**
  - `shadow-poster`: hard 4 px offset in `--headline-shadow` (navy). This is the "sticker" look.
  - Glow: blurred `--glow` (lavender), used only by synapse-glow.
- **Headline drop-shadow:** `text-shadow-poster` = `max(2px, 0.04em)` down-right in navy. Unbounded's cap height is 0.75 em, so 0.04 em is about 5% of letter height (BRAND.md asks for 4–6%).

## 4. Components

- **Tap targets:** every interactive element is at least 44×44 px (`min-h-11 min-w-11`).
- **Primary button (CTA):**
  - `bg-cta text-cta-text border-2 border-cta-border rounded-full font-semibold px-6 min-h-11`.
  - Light theme adds `shadow-poster`.
  - On an indigo band, use a navy border (pink on indigo is 2.71).
  - Hover: shadow in `--glow` (dark) or `shadow-poster` (light). Never lighten or darken the pink, because that makes an off-palette colour.
- **Secondary button:**
  - Transparent fill, `border-2 border-secondary text-text rounded-full`, hover `bg-surface-2`.
  - Don't use electric blue as a fill behind text: white on blue is 4.17 (B) and `#EEEBFF` on blue is 3.57, so neither passes for normal text.
- **Links:**
  - `text-link` on `--bg`, `text-link-on-surface` inside cards, header and footer.
  - On indigo bands, cream.
  - Always underlined (`underline underline-offset-4`), thicker on hover, so colour is never the only signal.
- **Focus ring:**
  - `:focus-visible` gets `outline: 3px solid var(--focus-ring); outline-offset: 2px; box-shadow: 0 0 0 8px var(--focus-ring-halo)`.
  - The navy halo gives the ring its 3:1 on light backgrounds (pink on cream is 2.50).
  - Never remove the outline without replacing it.
- **Chips and date strips:**
  - `bg-chip text-chip-text border-2 border-black rounded-full font-semibold uppercase text-sm px-3`.
  - Date strips are full-width `bg-chip` bars with black Poppins SemiBold caps, as on the poster.
  - Yellow is used for nothing else apart from lightning bolts.
- **Cards:**
  - `bg-surface rounded-card border border-border p-6`.
  - Links inside cards use `text-link-on-surface`.
  - Hover and `:focus-within` get synapse-glow (see Motion).
- **Headline treatment:**
  - `font-display uppercase text-headline text-shadow-poster`, for the hero, h1 and headlines on indigo bands.
  - On an indigo band: `text-on-primary` with the navy shadow, in both themes.
- **Striped border:**
  - Alternating lavender and black blocks, `repeating-linear-gradient(90deg, var(--color-lavender) 0 2.5rem, var(--color-black) 2.5rem 5rem)`, 1 rem tall on mobile and 1.5 rem from `md`.
  - Top of the footer and bottom of the hero only.
  - Decorative (a CSS background or `aria-hidden`).
- **Other motifs:**
  - Lightning bolts: poster yellow, decorative, `aria-hidden`, no more than two per view.
  - Line-art brain: lavender.
  - Network texture: pink, electric blue, sky and deep violet nodes, low opacity.
  - Use one or two motifs per section (BRAND.md).
- **Logo mark:**
  - `brand/logo.png` (375×375) exactly as supplied: `<img>` with equal width and height, `rounded-full`, and no filter, border, shadow or recolouring.
  - The PNG's corners are opaque white and the blue ring's outer edge is 12 px in, so the circle mask keeps a thin white rim. That rim is the logo's own white fill (BRAND.md: keep the white circle on dark).
  - Rendered sizes: 48 px in the header, 96 px in the footer, never above 375 px.
  - Clear space around it: at least 10% of its diameter.
  - When the lock-up text is next to it, alt is `""`; otherwise the alt is "UofG Neuroscience Society logo".
- **Horizontal lock-up (header):**
  - Layout: `[mark 48px] gap-3 [two lines: "UofG" Poppins 600 0.875rem hot pink / "Neuroscience Society" Poppins 600 1rem electric blue]`.
  - The whole lock-up sits on a **night pill** (`bg-night rounded-full pr-4`) in both themes. Pink and blue text are only legible on night (pink 7.56 (B), blue 4.78 (B)). In dark the pill is invisible; in light it reads as a poster sticker.
  - It is wrapped in the home link, with accessible name "UofG Neuroscience Society, home".
- **Favicon plan (from the brain-and-nodes mark):**
  - Crop, don't redraw. The brain's dark pixels span x 63–307, y 62–263 in logo.png. Crop a square around that area (with node padding, about 270 px) on the logo's own white.
  - Export `favicon.ico` (16, 32, 48) and `apple-touch-icon.png` (180).
  - No SVG favicon, because that would mean redrawing the logo.
  - No 192/512 manifest icons, because they would upscale beyond the 375 px source.
  - Built 2026-09-29: `public/favicon.ico` (16/32/48, PNG-in-ICO), `public/favicon-32.png`, `public/apple-touch-icon.png` (180). Crop box used: x 50–320, y 28–298 (270 px square centred on the brain, flattened on white, Lanczos downscale only).

## 5. Motion principles

- **Reduced motion first:** the static, final state is the default. Effects are added only under `prefers-reduced-motion: no-preference`, and the page is complete without them.
- **Pause when not visible:** everything pauses offscreen and when the tab is hidden.
- **No strobing:** "firing" pulses never flash more than 3 times per second (WCAG 2.3.1).
- **Colour:** motion never introduces an off-palette colour, and never carries meaning on its own.
- **Timing:** UI transitions last 150–250 ms and ease out. The only continuous loop is the brain's idle rotation.

| Effect | Colours it may use | Notes |
|---|---|---|
| SplitText hero line | `--headline` + `--headline-shadow` | letters animate position and opacity only; reduced motion shows the line set |
| DrawSVG action-potential divider | stroke hot pink; spike tip may use poster yellow | decorative, `aria-hidden`; reduced motion draws it fully |
| Magnetic buttons | none beyond the button's own tokens | translate ≤ 6 px; off for reduced motion and coarse pointers |
| Synapse-glow on card hover/focus | `--glow` (lavender) blur + border to `--glow` | on `:focus-within` it adds to the pink focus ring, never replaces it |
| Poster-tilt on chips | chip tokens unchanged | rotate ≤ 3°; none for reduced motion |
| 3D brain hero | black surface; nodes hot pink, electric blue, sky, deep violet; "firing" pulses hot pink; bloom subtle | static poster image for reduced motion and no-WebGL |

## 6. Decisions not covered by BRAND.md

For the committee to confirm and add to the guide.

1. **Light theme palette:** cream background, white surface, `#EEEBFF` surface-2, navy text, indigo secondary text, indigo headlines with the navy drop-shadow.
2. **Light-theme links are deep violet,** because electric blue fails for body text on white and cream.
3. **Dark-theme links on surfaces are sky.** Electric blue on `#161033` is 4.36 and on navy 3.67, both below 4.5, so electric blue is kept for links on the night background only.
4. **Focus ring:** 3 px hot pink plus an 8 px halo (night in dark, navy in light), so it passes 3:1 on light backgrounds.
5. **The CTA button has a navy border in light theme and on indigo bands,** because pink on cream is 2.50 and pink on indigo is 2.71.
6. **CTA label colours:** night on pink in dark, navy on pink in light.
7. **Secondary buttons are outline-only** (electric-blue border, theme text colour). Electric blue is never used as a fill behind text.
8. **Chips always have a 2 px black border** (poster pills are outlined; yellow on cream is 1.37).
9. **No muted (mist) text or blue links on indigo bands.** Use cream only.
10. **Header lock-up sits on a night pill in both themes,** so the pink "UofG" is never on a light background.
11. **Lock-up typography:** Poppins 600, 0.875 rem for "UofG" and 1 rem for "Neuroscience Society", mark at 48 px.
12. **Logo sizes:** 48 px in the header, 96 px in the footer, 375 px maximum. Mask with `border-radius: 50%` and keep the white rim.
13. **Favicon:** cropped from the PNG (brain area), ICO plus a 180 px touch icon. No SVG and no large manifest icons.
14. **Headline casing:** hero, h1 and h2 in capitals; h3 in sentence case (BRAND.md only says "capitals for poster headlines").
15. **Weights per heading level:** 900 for hero and h1, 800 for h2 and h3.
16. **Fluid type scale and minimum sizes** as tabled above.
17. **Headline shadow offset is `max(2px, 0.04em)`** (about 5% of cap height).
18. **Radii:** 1 rem for cards, pills for buttons and chips.
19. **Only two shadow kinds:** the hard navy "sticker" offset and the lavender glow.
20. **Striped border geometry:** 2.5 rem blocks, 1–1.5 rem tall, used at the hero bottom and footer top only.
21. **Tailwind's default colour palette is removed,** so only the 14 brand colours are available.
22. **No automatic OS theme switching.** Dark is the default until the user toggles.
23. **Unbounded is subset to Latin-1 plus common punctuation, €, ™.** Glyphs outside it fall back to Archivo Black.
24. **Motion colour roles** as tabled above (pink divider stroke, lavender glow, pink firing pulses).
