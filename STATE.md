# STATE.md — Live Session State

> The black box recorder. Overwritten constantly during work — every meaningful step, always
> before anything risky/irreversible. Never describe something as done unless verified done.

---

**Last updated:** 2026-09-29 (session restarted after crash; unattended run)
**Status:** `IN_PROGRESS`

**Working on:** Phase 1 — brand-designer (resumed) writing DESIGN.md, src/styles/tokens.css, public/fonts, docs/swatches.html. Scaffold + tooling committed as fddd820.

**Last command run:** `npx -y pnpm@10.34.6 astro check` → 0 errors; `pnpm build` → 1 page built

**Last known-good checkpoint:** scaffold builds clean, 2026-09-29 00:20

**Next exact step:** When brand-designer returns, verify: `pnpm build` passes, `ls public/fonts` shows WOFF2 + OFL files, dist CSS contains `@font-face` and `543fca`. Then write the DESIGN.md/swatch summary under "Needs the user's eyes" below, tick the phase-1 items, commit "Phase 1: design tokens and fonts", and start phase 2 from QUEUE.md.
**Watch out for:** pnpm must run as `npx -y pnpm@10.34.6` with npm_config_cache and XDG_* dirs pointed at $TMPDIR (corepack and pnpm 12 fail in the sandbox). `.claude/skills/ui-ux-pro-max` (catalog-only copy) still on disk; deletion was denied at the permission gate — user to remove by hand. ffmpeg not installed.

---

## Needs the user's eyes

- `.claude/skills/ui-ux-pro-max` (catalog-only copy from nexu-io/open-design) is still on disk; the subagent's delete was denied at the permission gate. Remove it by hand so it doesn't shadow the full ui-ux-pro-max plugin.

---

## Verification steps (only fill this in if Status is CRASHED_ASSUME_STALE)

