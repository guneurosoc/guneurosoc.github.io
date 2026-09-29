# STATE.md — Live Session State

> The black box recorder. Overwritten constantly during work — every meaningful step, always
> before anything risky/irreversible. Never describe something as done unless verified done.

---

**Last updated:** 2026-09-29 (session restarted after crash; unattended run)
**Status:** `IN_PROGRESS`

**Working on:** Phase 4 QA fixes in flight: page-builder (credits libs, Instagram image via astro:assets, nav labels, 404 canonical, unused Lottie removal, avatar caption, logo-96/192) and motion-3d (Lottie inline styles). QA static pass otherwise clean (see CHANGELOG once committed).

**Last command run:** `pnpm build` → 11 pages; all wave B pages verified and committed

**Last known-good checkpoint:** d6589af, 11 pages build clean, 2026-09-29 01:00

**Next exact step:** verify both fix reports (astro check, build, html-validate no unique-landmark, no noto-brain in dist, generated webp sizes), commit "Phase 4: QA fixes", then write FINAL-REPORT.md (phase 5) and finish STATE.md.

**Watch out for:** pnpm must run as `npx -y pnpm@10.34.6` with npm_config_cache and XDG_* dirs pointed at $TMPDIR (corepack and pnpm 12 fail in the sandbox). `.claude/skills/ui-ux-pro-max` (catalog-only copy) still on disk; deletion was denied at the permission gate — user to remove by hand. ffmpeg not installed.

---

## Needs the user's eyes

- **Lighthouse, screenshots and the keyboard test were NOT RUN.** qa-auditor installed Playwright Chromium 153 into $TMPDIR/qa and fixed its missing libs, but Chromium cannot open sockets inside the Bash sandbox (`socket() failed: Operation not permitted`) and the sandbox-off retry was denied by the permission classifier. To run them yourself outside the sandbox: `npx -y pnpm@10.34.6 build && npx -y serve dist -l 4321` in one terminal, then `npx -y playwright install chromium` and `npx -y lighthouse http://localhost:4321/ --preset=mobile --chrome-flags="--headless" --output=json --output-path=$TMPDIR/lh-home.json` for each of the 11 routes; or allow socket access via `/sandbox` and ask the next session to re-run qa-auditor step 10. Targets: Home Performance ≥ 90, others ≥ 95; Accessibility, Best Practices, SEO 100.

- **Phase-1 design review (replaced the BRIEF.md stop because this run is unattended).** Read `DESIGN.md` (236 lines) and open `docs/swatches.html` in a browser (standalone, no build; loads fonts from ../public/fonts). Summary: dark theme = night bg, #161033 surface, #EEEBFF text, mist secondary, electric-blue links (sky inside cards), pink CTAs with night label, yellow chips with black border, cream headlines with navy hard shadow. Light theme = cream bg, white surface, navy text, indigo secondary/headlines, deep-violet links (electric blue fails 4.5:1 on cream/white), pink CTA with navy border and navy label, pink focus ring with navy halo. Fonts: Unbounded 800–900 variable (subset to Latin-1, 38.9 KB), Poppins 400/600/700i, Archivo Black; all WOFF2 self-hosted with OFL text. DESIGN.md §6 lists 24 decisions BRAND.md doesn't cover, for the committee. Spot-checked contrast claims: they match.
- **The join video shows pre-2026 dates on screen** ("Black History Month 2023" at ~8–9 s, "Your existing membership expires on 31 Aug 2024" at ~30–33 s) and an "(it's free)" overlay at 31–34 s. The scope rule says nothing dated before 2026 appears on the site, and the price is still {{PRICE}}. Options: re-record, or accept that the video (committee-supplied content) is exempt. The poster frame chosen (title card at 1.5 s) shows neither.
- BRAND.md marks the fonts PROPOSED; the committee still needs to confirm them or name the poster's Canva fonts.

- `.claude/skills/ui-ux-pro-max` (catalog-only copy from nexu-io/open-design) is still on disk; the subagent's delete was denied at the permission gate. Remove it by hand so it doesn't shadow the full ui-ux-pro-max plugin.

---

## Verification steps (only fill this in if Status is CRASHED_ASSUME_STALE)

