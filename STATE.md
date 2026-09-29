# STATE.md — Live Session State

> The black box recorder. Overwritten constantly during work — every meaningful step, always
> before anything risky/irreversible. Never describe something as done unless verified done.

---

**Last updated:** 2026-09-29 10:50
**Status:** `STOPPING_CLEAN`

**Working on:** Nothing in progress. Browser QA now run; all Lighthouse targets met except SEO, which is held at 69 by preview-mode noindex on purpose.

**Last command run:** astro build → 11 pages; astro check + tsc 0 errors; Lighthouse/screenshot/keyboard QA via /tmp/claude-1000/qa/run.mjs (needs sandbox off)

**Last known-good checkpoint:** HEAD after the QA commit, 2026-09-29 09:50

**Next exact step:** nothing queued. Wait for committee inputs (FINAL-REPORT.md §2, §7). Every push to main deploys; check the run with /tmp/claude-1000/gh-api.sh or the Actions page. Pushes and API calls need the sandbox off (credential helper lock file).

**Watch out for:** pnpm runs as `npx -y pnpm@10.34.6` with npm_config_cache and XDG_*_HOME in $TMPDIR (corepack and pnpm 12 fail in the sandbox). Chromium cannot open sockets in the sandbox. `.claude/skills` is git-ignored (only skills-lock.json is tracked). The 1.6 MB source Instagram PNG is still copied into dist/instagram (unlinked). ffmpeg-static binary was fetched by hand here.

---

## Deploy

- **Repo:** guneurosoc/guneurosoc.github.io, remote `origin` added 2026-09-29. `SITE_URL` = https://guneurosoc.github.io, PREVIEW on.
- **Live URL:** https://guneurosoc.github.io (live, preview banner + noindex + robots disallow-all confirmed)
- **Deploy results:**
  - 2026-09-29 10:10 push REJECTED by GitHub: "refusing to allow a Personal Access Token to create or update workflow `.github/workflows/deploy.yml` without `workflow` scope". Nothing reached GitHub, so no deploy ran. The user needs to add the workflow permission to the token.
  - 2026-09-29 10:30 second push REJECTED with the same error. The token sent still lacks workflow permission. Side effect: git's credential "approve" step rewrote both stores at 10:30, so the token is now also in ~/.git-credentials (global `store` helper in ~/.gitconfig). Not read; user told.
  - 2026-09-29 10:45 user supplied a new token with repo + workflow scopes; both credential stores updated. Push of 7716781 OK. Run 36550357426 (build + deploy) **success**: https://github.com/guneurosoc/guneurosoc.github.io/actions/runs/36550357426. /, /join/, /robots.txt return 200.
  - 2026-09-29 10:55 push of 60bee78 (STATE update): run 36550527132 **success**. This note is committed locally and goes up with the next push.

## Needs the user's eyes

- **Phase-1 design review:** the user accepted the colours without a detailed review on 2026-09-29. `DESIGN.md` §6 still lists the decisions for the committee to add to BRAND.md.
- **The join video shows pre-2026 dates on screen** ("Black History Month 2023" at ~8–9 s, "Your existing membership expires on 31 Aug 2024" at ~30–33 s) and an "(it's free)" overlay at 31–34 s. The scope rule says nothing dated before 2026 appears on the site. The price is now set (£1/£2) and an asterisked note under the video corrects the "(it's free)" overlay; the old dates are still on screen. Options: re-record, or accept that the video (committee-supplied content) is exempt. The poster frame chosen (title card at 1.5 s) shows neither.
- Fonts confirmed by the committee 2026-09-29; BRAND.md still says PROPOSED because agents may not edit it. Remove that label by hand.

---

## Verification steps (only fill this in if Status is CRASHED_ASSUME_STALE)

