# STATE.md — Live Session State

> The black box recorder. Overwritten constantly during work — every meaningful step, always
> before anything risky/irreversible. Never describe something as done unless verified done.

---

**Last updated:** 2026-09-29 (session restarted after crash; unattended run)
**Status:** `IN_PROGRESS`

**Working on:** Phase 4 QA: qa-auditor running build checks, HTML validation, links, CSP, placeholder/facts audit, Lighthouse if a browser can be installed. Phases 1–3 committed.

**Last command run:** `pnpm build` → 11 pages; all wave B pages verified and committed

**Last known-good checkpoint:** d6589af, 11 pages build clean, 2026-09-29 01:00

**Next exact step:** read the QA report, route each finding to page-builder / motion-3d / brand-designer, re-run QA, commit phase 4, then write the phase-5 final report (STATE.md "Needs the user's eyes" + FINAL-REPORT.md).

**Watch out for:** pnpm must run as `npx -y pnpm@10.34.6` with npm_config_cache and XDG_* dirs pointed at $TMPDIR (corepack and pnpm 12 fail in the sandbox). `.claude/skills/ui-ux-pro-max` (catalog-only copy) still on disk; deletion was denied at the permission gate — user to remove by hand. ffmpeg not installed.

---

## Needs the user's eyes

- **Phase-1 design review (replaced the BRIEF.md stop because this run is unattended).** Read `DESIGN.md` (236 lines) and open `docs/swatches.html` in a browser (standalone, no build; loads fonts from ../public/fonts). Summary: dark theme = night bg, #161033 surface, #EEEBFF text, mist secondary, electric-blue links (sky inside cards), pink CTAs with night label, yellow chips with black border, cream headlines with navy hard shadow. Light theme = cream bg, white surface, navy text, indigo secondary/headlines, deep-violet links (electric blue fails 4.5:1 on cream/white), pink CTA with navy border and navy label, pink focus ring with navy halo. Fonts: Unbounded 800–900 variable (subset to Latin-1, 38.9 KB), Poppins 400/600/700i, Archivo Black; all WOFF2 self-hosted with OFL text. DESIGN.md §6 lists 24 decisions BRAND.md doesn't cover, for the committee. Spot-checked contrast claims: they match.
- **The join video shows pre-2026 dates on screen** ("Black History Month 2023" at ~8–9 s, "Your existing membership expires on 31 Aug 2024" at ~30–33 s) and an "(it's free)" overlay at 31–34 s. The scope rule says nothing dated before 2026 appears on the site, and the price is still {{PRICE}}. Options: re-record, or accept that the video (committee-supplied content) is exempt. The poster frame chosen (title card at 1.5 s) shows neither.
- BRAND.md marks the fonts PROPOSED; the committee still needs to confirm them or name the poster's Canva fonts.

- `.claude/skills/ui-ux-pro-max` (catalog-only copy from nexu-io/open-design) is still on disk; the subagent's delete was denied at the permission gate. Remove it by hand so it doesn't shadow the full ui-ux-pro-max plugin.

---

## Verification steps (only fill this in if Status is CRASHED_ASSUME_STALE)

