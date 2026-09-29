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
- Phase 4 (docs/deploy): README.md, HANDOVER.md, CONTRIBUTING.md, PR template, .github/workflows/deploy.yml (pnpm, --ignore-scripts to skip ffmpeg download, upload/deploy-pages), public/_headers. Verified: YAML parses, astro check/build pass. Workflow not yet run on GitHub.
- Phase 3: motion-3d built src/components/fx (BrainHero + lazy brain-scene.ts with three 0.186.1, ActionPotential DrawSVG divider, fx.ts with gsap 3.15 + Lenis 1.3.26 SplitText/magnetic/tilt, Lottie.astro with lottie_light), public/hero-poster.svg (procedural from the model; Playwright CDN blocked), synapse-glow CSS, fx/README.md. Verified: astro check + tsc 0 errors, 11 pages, eager JS 54.6–57.1 KB gz per page, CSP unchanged, poster viewed. Not verified: any in-browser behaviour.
- Phase 2 complete: build-time OG images (src/pages/og/[slug].png.ts, satori 0.33.5 + @resvg/resvg-js 2.6.2, derived Unbounded-900.ttf), Head derives /og/<slug>.png per page. Verified: 12 PNGs 1200×630, og:image tags per page, no renderer code in client JS.
- Phase 4 QA: static audit passed (astro check 0, 11 pages, all internal links resolve, 16 external URLs 200, CSP exact on every page, no inline scripts, one h1/page, alt/names/landmarks OK, 23 placeholders all in TODO.md, only year 2026, eager JS ≤ 57 KB gz). Fixes applied and verified: runtime libs + sharp credited (Credits, ASSETS.md), Instagram grid via astro:assets webp (34/91/142 KB), drawer nav label, no canonical/og:url on 404, "Placeholder avatar", unused noto-brain.json removed, logo-96/192 copies, Lottie sizes via classes. NOT RUN: Lighthouse, screenshots, keyboard test (Chromium blocked by sandbox sockets).
- Phase 5: FINAL-REPORT.md written (placeholders, licences, skills used, decisions outside BRAND.md, unverified list). STATE.md set to STOPPING_CLEAN.
