# GU NeuroSoc website — final report (2026-09-29)

Build orchestrated by the lead session (Claude Fable 5.1); all site work done by the Opus 5.5 subagents in `.claude/agents/`. Every claim below was checked by the lead against files on disk or command output, except where marked **unverified**.

## 1. What exists

- Astro 7.3.5 static site, TypeScript strict, Tailwind 4.3.3, pnpm 10.34.6, Node ≥ 22. Eleven pages: Home, About, Join, Committee, Contact, Code of Conduct, Complaints, Constitution, Privacy, Credits, 404. `astro check` and `tsc` report 0 errors; `pnpm build` produces 11 pages plus 12 OG images.
- Brand applied per `brand/BRAND.md` via `DESIGN.md` and `src/styles/tokens.css` (dark default, light theme, self-hosted WOFF2 fonts).
- Preview mode on (`PREVIEW = true` in `site.config.ts`): banner, `noindex`, robots.txt disallow-all.
- Motion: lazy Three.js brain hero (CC BY model), GSAP SplitText/DrawSVG/magnetic/tilt, Lenis, two Lotties; static SVG poster for reduced motion / no WebGL / Save-Data. Eager JS 54.6–57.1 KB gzipped per page; brain scene 155 KB gzipped, lazy.
- Join video: MP4 1,867,429 B (≤ 2 MB) + WebM + poster + 7-cue VTT; `pnpm video:build` regenerates.
- Docs: README.md, HANDOVER.md, CONTRIBUTING.md, PR template, `docs/TOOLING.md`, `docs/VIDEO.md`, `src/components/fx/README.md`, `.github/workflows/deploy.yml`, `public/_headers`.
- CSP meta exactly as specified on every page, never widened. No third-party runtime requests, no cookies, no forms.

## 2. Every `{{PLACEHOLDER}}` (all listed in TODO.md)

| Placeholder | Where | Needed from the committee |
|---|---|---|
| `{{GITHUB_ORG}}` | `site.config.ts` (all absolute URLs, appears lowercased as `{{github_org}}` in built URLs) | GitHub organisation name |
| `{{MS_FORMS_URL}}`, `{{CHAT_URL}}` | Join | mailing-list and group-chat links |
| `{{VP_EMAIL}}` | Complaints | Vice-President's email |
| `{{WELFARE_EMAIL}}` | Contact | Welfare Officer contact |
| `{{CONSTITUTION_DOWNLOAD}}` | Constitution | the constitution file in `/content` (renderer not built; fallback page shows adoption date 14 August 2026) |
| `{{PRESIDENT_COURSE_YEAR}}`, `{{PRESIDENT_ASK_ME_ABOUT}}` | Committee | President's course/year, "ask me about" |
| `{{<ROLE>_NAME}}`, `{{<ROLE>_COURSE_YEAR}}`, `{{<ROLE>_ASK_ME_ABOUT}}` for VICE_PRESIDENT, TREASURER, SECRETARY, ACADEMIC_EVENTS_COORDINATOR, WELFARE_OFFICER | Committee (`src/content/committee.json`) | 15 fields |
| `{{DOMAIN_REGISTRAR}}`, `{{DOMAIN_RENEWAL_DATE}}` | HANDOVER.md | once a domain is bought |
| "source logo file" | TODO.md | the original vector/Canva logo (only a 375×375 PNG exists) |

23 placeholders are visible on pages; qa-auditor confirmed each is in TODO.md.

## 3. Lighthouse scores

Run 2026-09-29 (Lighthouse 13, mobile preset, headless Chrome 153, served locally with gzip like GitHub Pages).

| Page | Perf | A11y | Best pr. | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Home | 95 | 100 | 100 | 69 | 2.5 s | 0.033 |
| About | 97 | 100 | 100 | 69 | 2.2 s | 0 |
| Join | 95 | 100 | 100 | 69 | 2.6 s | 0 |
| Committee | 97 | 100 | 100 | 69 | 2.2 s | 0.024 |
| Contact | 97 | 100 | 100 | 69 | 2.2 s | 0.001 |
| Code of Conduct | 97 | 100 | 100 | 69 | 2.2 s | 0.028 |
| Complaints | 97 | 100 | 100 | 69 | 2.2 s | 0.002 |
| Constitution | 97 | 100 | 100 | 69 | 2.3 s | 0 |
| Privacy | 97 | 100 | 100 | 69 | 2.2 s | 0.024 |
| Credits | 96 | 100 | 100 | 69 | 2.2 s | 0.072 |
| 404 | 100 | 100 | 100 | 66 | 1.7 s | 0.027 |

SEO fails only `is-crawlable`, which is preview mode's deliberate `noindex`; it clears when `PREVIEW` is set to false at launch. Headless Chrome has no GPU, so Home was measured with the static brain poster (software WebGL is now skipped); the 3D scene's cost on a real phone is **unverified**. Keyboard test passed: skip link first, visible focus on every stop, theme toggle and mobile menu work by keyboard, Escape closes the menu and returns focus. No console errors and no horizontal scroll on any page at 360 px in either theme.

Fixes made during this run: long placeholders and URLs overflowed Committee and Credits at 360 px (now wrap); the logo link's visible text read "UofGNeuroscience Society" (space added); software-rendered WebGL froze the main thread (now gets the poster); the Join video poster is preloaded; six links site-wide had no space before them; below 400 px the menu button is icon-only so the logo fits.

## 4. Assets and licences (`brand/ASSETS.md`)

| Asset | Author | Source | Licence | Local file |
|---|---|---|---|---|
| Brain (3D model) | dgallichan (Sketchfab) | https://sketchfab.com/3d-models/brain-cadd2bde67404c43b2359a6a3281d84a via NIH 3D 3DPX-021161 | CC BY 4.0 (stated on both pages) | `public/assets/models/brain.glb`, simplified to 75,487 tris, 1,578,356 B |
| High voltage animated emoji | Google, Animated Noto Emoji | https://googlefonts.github.io/noto-emoji-animation/ | CC BY 4.0 | `public/assets/lottie/noto-high-voltage.json` |
| Sparkles animated emoji | Google, Animated Noto Emoji | same | CC BY 4.0 | `public/assets/lottie/noto-sparkles.json` |
| Brain animated emoji | Google | same | CC BY 4.0 | downloaded, unused, removed |
| Fonts Unbounded, Poppins, Archivo Black | project authors | Google Fonts | SIL OFL 1.1 (licence files in `public/fonts`) | WOFF2, Unbounded subset + derived `Unbounded-900.ttf` for OG cards |
| Software: astro, tailwindcss, @astrojs/*, three, lenis, lottie-web (MIT); gsap (Standard no-charge licence); satori, @resvg/resvg-js (MPL-2.0); sharp (Apache-2.0); typescript (Apache-2.0); ffmpeg-static (GPL-3.0-or-later, dev only) | | | as read from each package.json | Credits page |

Rejected candidates (CC-BY-SA, NC, login-only, oversized, labelled teaching models) are listed in ASSETS.md. LottieFiles itself was unreachable from the sandbox (Cloudflare challenge), so no LottieFiles animation was used; no neuron/synapse Lottie exists on the site.

## 5. Skills and plugins actually used

- Installed for this project (`skills-lock.json`, in `.claude/skills/`, git-ignored): 8 GSAP skills from `greensock/gsap-skills` and `creative-director`, `frontend-design`, `threejs`, `web-design-guidelines` from `nexu-io/open-design`. `ui-ux-pro-max` (catalog-only copy) was removed from the lock file, but its directory is still on disk because deleting it was denied at the permission gate.
- Reported as invoked by subagents: `find-skills` (tooling), `gsap-core`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-performance` (motion-3d). motion-3d reported the `threejs` skill is a catalogue stub and did not use it. brand-designer's report did not state which skills it invoked (**unverified**).
- Plugins present (user scope): claude-security, frontend-design, modern-web-guidance, ponytail, security-guidance, superpowers, typescript-lsp, ui-ux-pro-max. No MCP servers configured. Full list with versions in `docs/TOOLING.md`.

## 6. Decisions outside BRAND.md (for the committee to add to the guide)

`DESIGN.md` §6 lists 26 numbered decisions. The main ones: light-theme palette (cream bg, white surface, navy text, indigo secondary); deep-violet links in light theme and sky links on dark surfaces (electric blue fails 4.5:1 there); pink focus ring with night/navy halo; navy border on CTAs in light theme and on indigo bands; outline-only secondary buttons; black border on yellow chips; no muted text on indigo; lock-up on a night pill in both themes; logo sizes 48/96 px, favicons are the whole logo downscaled (a square crop clips the wordmark; a text-free mark would allow a cleaner favicon); heading casing/weights and fluid scale; headline shadow 0.04 em; striped-border geometry; no OS theme auto-switch; Unbounded subset; motion colour roles; Noto Lottie colours are off-palette (exception recorded).

## 7. Things that need the committee or the user

1. ~~Run Lighthouse, screenshots and the keyboard test~~ Done 2026-09-29 (§3). Still worth a look on a real phone for the 3D brain.
2. The join video shows pre-2026 dates on screen ("Black History Month 2023", "expires on 31 Aug 2024"). Re-record, or accept the committee-supplied video as exempt from the "nothing dated before 2026" rule. Its "(it's free)" overlay is now corrected by an asterisked note under the video (2026-09-29): £1 Standard, £2 Associate, log in to the SRC website to buy.
3. ~~Confirm the fonts~~ Confirmed by the committee 2026-09-29. Remove the PROPOSED label in BRAND.md (agents may not edit it).
4. Supply every placeholder in §2 and the constitution file.
5. ~~Delete `.claude/skills/ui-ux-pro-max`~~ Done 2026-09-29.
6. First deploy: set Pages source to GitHub Actions; the workflow (`--ignore-scripts` install) has never run on GitHub.

## 8. Not verified

- Anything requiring a browser: WebGL rendering, bloom, drag/firing, SplitText/DrawSVG/Lenis/magnetic/tilt behaviour, Lottie playback, theme toggle, drawer, no-JS fallback, video/captions playback, srcset selection, real contrast over composites, runtime network requests, mailto/clipboard on Contact.
- The 3D brain on a real GPU (Lighthouse ran without one). HTML validation by the W3C validator (no Java), Cloudflare `_headers` syntax, GitHub Actions workflow, `pnpm install` outside the sandbox (ffmpeg-static binary needed a manual curl here; pnpm 12 and corepack failed in the sandbox).
- Whether the simplified brain model has holes/artefacts; whether the SVG poster matches the scene's first frame.
- Whether the Sketchfab original and the NIH copy are byte-identical (matched by face/vertex counts only).
- ffmpeg binary licence inside ffmpeg-static (dev only, not deployed).
