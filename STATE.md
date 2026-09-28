# STATE.md — Live Session State

> The black box recorder. Overwritten constantly during work — every meaningful step, always
> before anything risky/irreversible. Never describe something as done unless verified done.

---

**Last updated:** 2026-09-29 (phase 1 started)
**Status:** `IN_PROGRESS`

**Working on:** Phase 1 — brand-designer writing DESIGN.md, src/styles/tokens.css, self-hosted fonts. Scaffold (Astro 7.3.5, Tailwind 4.3.3, pnpm 10.34.6) and docs/TOOLING.md are done and verified; not yet committed.

**Last command run:** `npx -y pnpm@10.34.6 astro check` → 0 errors; `pnpm build` → 1 page built

**Last known-good checkpoint:** scaffold builds clean, 2026-09-29 00:20

**Next exact step:** Pull the first Phase 1 item from QUEUE.md ("List installed plugins, skills
and MCP servers into /docs/TOOLING.md"). Do not start until the user says to begin building.

**Watch out for:** pnpm must run as `npx -y pnpm@10.34.6` with npm_config_cache and XDG_* dirs pointed at $TMPDIR (corepack and pnpm 12 fail in the sandbox). `.claude/skills/ui-ux-pro-max` (catalog-only copy) still on disk; deletion was denied at the permission gate — user to remove by hand. ffmpeg not installed.
show the user DESIGN.md and the token swatches.

---

## Verification steps (only fill this in if Status is CRASHED_ASSUME_STALE)

