# CHANGELOG.md — Ledger

> Append-only record of completed, verified work. One line per unit of work.

---

## 2026-09-29
- Resume system set up: CLAUDE.md, PLAN.md, QUEUE.md, STATE.md filled from BRIEF.md v6.
- Phase 1 partial: Astro 7.3.5 + Tailwind 4.3.3 scaffold (pnpm 10.34.6), 13 project skills installed (8 GSAP, 4 Open Design kept), docs/TOOLING.md. Verified: astro check 0 errors, build 1 page.
- Phase 3 (early): asset-scout sourced brain.glb (CC BY 4.0, dgallichan via NIH 3D, simplified to 75k tris, 1.58 MB) and 3 Animated Noto Emoji Lotties (CC BY 4.0); brand/ASSETS.md written. Verified: file/ls/JSON parse.
- Phase 1 complete: brand-designer wrote DESIGN.md, src/styles/tokens.css (Tailwind v4 @theme + dark/light semantic tokens), public/fonts (5 WOFF2 + OFL), docs/swatches.html. Verified: build clean, 5 @font-face + brand hexes in dist CSS, contrast claims spot-checked.
- Phase 2 (early): join video pipeline — ffmpeg-static, scripts/build-video.mjs (`pnpm video:build`), public/video/how-to-join.{mp4 1,867,429 B, webm, vtt 7 cues, poster.jpg}, docs/VIDEO.md. Verified: file/stat/grep, build passes.
- Phase 2 wave A: Base layout, Head (SEO, canonical, OG, JSON-LD, CSP meta exact), Lockup, Header (nav, theme toggle, drawer; bundled script), Footer, PREVIEW flag (banner + noindex + robots.txt endpoint), content collections + Zod + seeds, sitemap, 404, favicons (full logo). Verified: astro check 0 errors, 2 pages built, scripts all external/JSON-LD, PREVIEW artefacts present.
- Phase 2 wave B: all eleven pages built (Home, About, Join with video, Committee from collection, Contact mailto builder, Code of Conduct, Complaints, Constitution fallback, Privacy, Credits, 404). Verified: astro check 0 errors, 11 pages built, one h1 each, no inline scripts, no pre-2026 years, placeholders visible and listed in TODO.md.
