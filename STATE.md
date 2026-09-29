# STATE.md — Live Session State

> The black box recorder. Overwritten constantly during work — every meaningful step, always
> before anything risky/irreversible. Never describe something as done unless verified done.

---

**Last updated:** 2026-09-29 09:20 (deleted stray `.claude/skills/ui-ux-pro-max` catalog copy; tsc and astro check still clean)
**Status:** `STOPPING_CLEAN`

**Working on:** Nothing in progress. All five phases of BRIEF.md are done to the extent possible in this sandbox; FINAL-REPORT.md written. QUEUE.md is empty apart from the two NOT RUN QA items that need a browser.

**Last command run:** `pnpm build` → 11 pages + 12 OG PNGs; `astro check` 0 errors; `tsc` clean; committed as phase 4/5

**Last known-good checkpoint:** phase 5 commit (HEAD), build clean, 2026-09-29 01:40

**Next exact step:** nothing queued. If the user grants browser/socket access: re-run qa-auditor step 10 (Lighthouse on 11 routes, screenshots at 360/1280 in both themes, keyboard pass) and route findings to the owning subagent. Otherwise wait for the committee inputs listed in FINAL-REPORT.md §2 and §7.

**Watch out for:** pnpm runs as `npx -y pnpm@10.34.6` with npm_config_cache and XDG_*_HOME in $TMPDIR (corepack and pnpm 12 fail in the sandbox). Chromium cannot open sockets in the sandbox. `.claude/skills` is git-ignored (only skills-lock.json is tracked). The 1.6 MB source Instagram PNG is still copied into dist/instagram (unlinked). ffmpeg-static binary was fetched by hand here.

---

## Needs the user's eyes

- **Lighthouse, screenshots and the keyboard test were NOT RUN.** qa-auditor installed Playwright Chromium 153 into $TMPDIR/qa and fixed its missing libs, but Chromium cannot open sockets inside the Bash sandbox (`socket() failed: Operation not permitted`) and the sandbox-off retry was denied by the permission classifier. To run them yourself outside the sandbox: `npx -y pnpm@10.34.6 build && npx -y serve dist -l 4321` in one terminal, then `npx -y playwright install chromium` and `npx -y lighthouse http://localhost:4321/ --preset=mobile --chrome-flags="--headless" --output=json --output-path=$TMPDIR/lh-home.json` for each of the 11 routes; or allow socket access via `/sandbox` and ask the next session to re-run qa-auditor step 10. Targets: Home Performance ≥ 90, others ≥ 95; Accessibility, Best Practices, SEO 100.

- **Phase-1 design review (replaced the BRIEF.md stop because this run is unattended).** Read `DESIGN.md` (236 lines) and open `docs/swatches.html` in a browser (standalone, no build; loads fonts from ../public/fonts). Summary: dark theme = night bg, #161033 surface, #EEEBFF text, mist secondary, electric-blue links (sky inside cards), pink CTAs with night label, yellow chips with black border, cream headlines with navy hard shadow. Light theme = cream bg, white surface, navy text, indigo secondary/headlines, deep-violet links (electric blue fails 4.5:1 on cream/white), pink CTA with navy border and navy label, pink focus ring with navy halo. Fonts: Unbounded 800–900 variable (subset to Latin-1, 38.9 KB), Poppins 400/600/700i, Archivo Black; all WOFF2 self-hosted with OFL text. DESIGN.md §6 lists 24 decisions BRAND.md doesn't cover, for the committee. Spot-checked contrast claims: they match.
- **The join video shows pre-2026 dates on screen** ("Black History Month 2023" at ~8–9 s, "Your existing membership expires on 31 Aug 2024" at ~30–33 s) and an "(it's free)" overlay at 31–34 s. The scope rule says nothing dated before 2026 appears on the site, and the price is still {{PRICE}}. Options: re-record, or accept that the video (committee-supplied content) is exempt. The poster frame chosen (title card at 1.5 s) shows neither.
- BRAND.md marks the fonts PROPOSED; the committee still needs to confirm them or name the poster's Canva fonts.

---

## Verification steps (only fill this in if Status is CRASHED_ASSUME_STALE)

