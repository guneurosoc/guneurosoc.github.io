# GU NeuroSoc — Brand Guide (v1, 28 Sep 2026)

The single source of truth for how the Glasgow University Neuroscience Society looks and sounds: website, Instagram posts, stories, posters, slides, merch. If a design and this file disagree, this file wins, or this file gets updated.

## Where this came from

The colours were measured (k-means colour clustering) from two real files: the society logo and the 22 September 2026 pub-quiz Instagram post. The poster style below describes what that post actually does. The fonts are a **proposal**, not the original poster fonts: whoever designed the pub-quiz poster should say which Canva fonts they used, and if the committee prefers those, replace the proposal here. Everything marked PROPOSED needs committee sign-off.

## Personality

Friendly, loud, a bit nerdy, never corporate. The society's own copy talks like a mate inviting you along ("first social of the year!", "everyone welcome!"). Science is the reason we meet; fun is the reason people come back.

Voice rules: write the way a committee member would say it out loud. Short sentences. Exclamation marks are fine in moderation. Say the concrete thing (date, time, place, price) plainly. No jargon without explaining it. Never state a fact we can't back up.

## Colour

| Name | Hex | Job |
|---|---|---|
| Indigo | `#543FCA` | Primary. Big poster backgrounds, primary surfaces |
| Lavender | `#E698FD` | Soft highlights, striped borders, line-art brains, glows |
| Electric blue | `#4F6FFE` | The logo ring and wordmark. Links, secondary buttons, outlines |
| Hot pink | `#FE67C6` | "Firing". Calls to action, highlights, focus rings, network nodes |
| Sky | `#8AD2FE` | Glows, network nodes, small accents |
| Deep violet | `#5D16E9` | Network nodes, deep accents |
| Poster yellow | `#FDD403` | Banners, date/time strips, lightning bolts. The shout colour; use sparingly |
| Cream | `#FEFADD` | Big headline text on indigo |
| Navy | `#241D52` | Headline drop-shadows, dark surfaces |
| Night | `#0A0716` | Website page background (dark theme) |
| Black | `#000000` | The logo's brain, stripe borders |
| Mist | `#B4AED6` | Secondary text on dark backgrounds |

**Balance on a poster:** roughly indigo 50–60%, lavender and black stripes 15%, yellow 10–15%, cream type, one or two pink/blue accents. One dominant colour plus sharp accents, not everything equal.

**Contrast (measured, WCAG):**

- **Always fine for text:**
  - cream on indigo 6.8:1
  - white on indigo 7.1:1
  - black on yellow 14.6:1
  - navy on yellow 10.6:1
  - navy on lavender 7.5:1
  - black on lavender 10.3:1
  - light text `#EEEBFF` on night 17.0:1
  - mist on night 9.5:1
  - pink on night 7.6:1
  - sky on night 12.1:1
  - lavender on night 9.7:1
  - navy on white 15.3:1
  - indigo on white 7.1:1
- **Large bold text only:**
  - electric blue on white 4.2:1
  - white on electric blue 4.2:1
  - electric blue on night 4.8:1 (passes for normal text, just)
- **Never for text:** hot pink on white 2.6:1. Pink is for text only on dark backgrounds.

## Type (PROPOSED)

- **Display, for headlines:** Unbounded, Black or ExtraBold, set in capitals for poster headlines. It's wide, round and chunky, matching the pub-quiz poster's heavy headline.
- **Text, for everything else:** Poppins. It's close to the logo's wordmark style. Use Regular for body, SemiBold for labels and dates, and Bold Italic for playful taglines ("everyone welcome!").
- **Chunky alternative:** Archivo Black, if Unbounded feels too wide for a layout.

All three are free Google Fonts under the SIL Open Font License. The files and licences are in `fonts/`. Before relying on them in Canva, search Canva's font list for each name. Free Canva accounts can only use fonts already in Canva's library; uploading your own font files needs a paid or Education plan.

Poster headline treatment: cream text with a solid navy drop-shadow offset down-right (about 4–6% of the letter height). Dates and times go in poster yellow banners with black text.

## Logo

- Use the supplied circular logo exactly as it is: black brain with pink/blue/sky/violet network, "UofG" in pink, "Neuroscience Society" in blue, blue ring, white fill. Don't recolour it, redraw it, stretch it, add effects, or place it on a busy photo.
- On posters it sits as a round "sticker" in a corner (top-right in the pub-quiz post) with clear space around it of at least a tenth of its width.
- On dark backgrounds keep the white circle; don't cut the brain out.
- The original design file (Canva or other) should be found and stored with this guide. Only the PNG exists here, and it's only 375×375 px, too small for print.

## Neuro motifs

These are the recurring visual ideas; use one or two per design, not all.

- **The network:** dots joined by thin lines in pink, blue, sky and violet, from the logo. On the website it becomes the animated 3D brain; on posters it works as a background texture at low opacity.
- **The line-art brain:** an engraving-style brain in lavender, as on the pub-quiz post.
- **Lightning bolts** in poster yellow: neurons firing, energy, "something's happening".
- **The action-potential squiggle:** a spike-shaped line, useful as a divider.
- **Striped borders:** alternating lavender and black blocks along the top and bottom edges.

## Formats

- **Instagram feed post:** 1080×1350 (4:5). The pub-quiz post is this shape.
- **Instagram story:** 1080×1920 (9:16). Keep text out of the top and bottom ~250 px, where the app's UI sits.
- **Website:** dark theme by default (night background), light theme available. Implemented from `brand-tokens.json` and `brand.css` in this folder.
- **Every event post includes:** what, day + date, time, place (name + address), who it's for ("everyone welcome!"), and the logo sticker.

## Checklist before posting

1. Colours from the table only.
2. Headline in the display font; everything else in the text font.
3. No pink text on light backgrounds.
4. Logo unchanged, with clear space around it.
5. Date, time and place present and double-checked.
6. Nothing claimed that the committee hasn't confirmed.

## Using this guide

- **In Claude (chat):** upload `neurosoc-brand-skill.zip` as a skill (see the step-by-step guide), or attach this file to a chat or project and say "follow BRAND.md".
- **In Claude Code (website):** the website kit copies this folder into `brand/` and treats BRAND.md as the source of truth.
- **In Canva:**
  - Free accounts can only save 3 brand colours, so save indigo, lavender and yellow, and keep `brand-sheet.png` open for the rest.
  - Better: make one "GU NeuroSoc starter" design with all 12 swatches and the heading/body text styles, share it with the committee, and duplicate it for each new post.
  - A paid, Education or Nonprofit Canva plan unlocks a full Brand Kit with logo and font uploads.
