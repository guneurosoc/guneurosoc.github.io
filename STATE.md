# STATE.md — Live Session State

> The black box recorder. Overwritten constantly during work — every meaningful step, always
> before anything risky/irreversible. Never describe something as done unless verified done.

---

**Last updated:** 2026-09-29 (session restarted after crash; unattended run)
**Status:** `IN_PROGRESS`

**Working on:** Phase 1 complete and committed. Phase 2 starting: page-builder (join video pipeline) still in flight; brand-designer building favicon files; layout/pages delegation next.

**Last command run:** `npx -y pnpm@10.34.6 build` with tokens.css → 1 page built; built CSS has 5 @font-face, 6× 543fca

**Last known-good checkpoint:** phase 1 committed, build clean, 2026-09-29 00:41

**Next exact step:** When the video page-builder returns, verify public/video (MP4 ≤ 2,000,000 bytes, VTT five steps), commit, then delegate phase-2 wave A to page-builder: BaseLayout, Header (lock-up per DESIGN.md §4, nav, theme toggle, drawer), skip link, Footer, PREVIEW flag, SEO head, CSP meta, content collections + Zod, sitemap, 404. No parallel `pnpm add` while another subagent is installing.

**Watch out for:** pnpm must run as `npx -y pnpm@10.34.6` with npm_config_cache and XDG_* dirs pointed at $TMPDIR (corepack and pnpm 12 fail in the sandbox). `.claude/skills/ui-ux-pro-max` (catalog-only copy) still on disk; deletion was denied at the permission gate — user to remove by hand. ffmpeg not installed.

---

## Needs the user's eyes

- **Phase-1 design review (replaced the BRIEF.md stop because this run is unattended).** Read `DESIGN.md` (236 lines) and open `docs/swatches.html` in a browser (standalone, no build; loads fonts from ../public/fonts). Summary: dark theme = night bg, #161033 surface, #EEEBFF text, mist secondary, electric-blue links (sky inside cards), pink CTAs with night label, yellow chips with black border, cream headlines with navy hard shadow. Light theme = cream bg, white surface, navy text, indigo secondary/headlines, deep-violet links (electric blue fails 4.5:1 on cream/white), pink CTA with navy border and navy label, pink focus ring with navy halo. Fonts: Unbounded 800–900 variable (subset to Latin-1, 38.9 KB), Poppins 400/600/700i, Archivo Black; all WOFF2 self-hosted with OFL text. DESIGN.md §6 lists 24 decisions BRAND.md doesn't cover, for the committee. Spot-checked contrast claims: they match.
- BRAND.md marks the fonts PROPOSED; the committee still needs to confirm them or name the poster's Canva fonts.

- `.claude/skills/ui-ux-pro-max` (catalog-only copy from nexu-io/open-design) is still on disk; the subagent's delete was denied at the permission gate. Remove it by hand so it doesn't shadow the full ui-ux-pro-max plugin.

---

## Verification steps (only fill this in if Status is CRASHED_ASSUME_STALE)

