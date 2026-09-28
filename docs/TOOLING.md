# Tooling

What tooling this project has, as actually observed on 2026-09-29. Anything not observed is marked "unverified".

Sources: commands run by the lead session and by the tooling subagent on 2026-09-29. Re-check before relying on any of this later; versions drift.

## Runtime and toolchain

| Tool | Version / status | How observed |
| --- | --- | --- |
| Claude Code | 2.1.284 | `claude --version` |
| Lead session model | claude-fable-5-1 | `.claude/settings.json` `"model"` |
| Subagent model | claude-opus-5-5, forced | `.claude/settings.json`: `CLAUDE_CODE_SUBAGENT_MODEL=claude-opus-5-5`, `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1`; `Agent(fork)` is denied |
| git | 2.53.0 | `git --version` |
| Node | v24.19.0 | `node -v` |
| npm | 12.0.2 | `npm -v` |
| corepack | 0.35.0 | `corepack -v` |
| pnpm | 10.34.6, run as `npx -y pnpm@10.34.6` with `npm_config_cache` and `XDG_*_HOME` pointed at `$TMPDIR` (`packageManager` in package.json). Not installed globally. corepack fails in the sandbox (its fetch bypasses the proxy: `getaddrinfo EAI_AGAIN registry.npmjs.org`); pnpm 12.6.0 fails with `ERR_PNPM_STORE_DIR_OPEN_OPERATION_LOCK ... Read-only file system`. | scaffold subagent, 2026-09-29 |
| ffmpeg | Not installed (`ffmpeg: command not found`) | `ffmpeg -version` |
| skills CLI (skills.sh) | 1.7.0, run through `npx -y skills` (not installed globally) | version in the npx cache `package.json` |

## Site stack (from `pnpm list --depth 0` after scaffold)

| Package | Version |
| --- | --- |
| astro | 7.3.5 |
| tailwindcss / @tailwindcss/vite | 4.3.3 |
| @astrojs/check | 0.9.10 |
| typescript | 6.0.3 (pinned to ^6: `astro check` refuses TypeScript 7.0) |

## Claude Code plugins

From `claude plugin list`. All are user scope and enabled.

| Plugin | Version |
| --- | --- |
| claude-security@claude-plugins-official | 0.12.0 |
| frontend-design@claude-plugins-official | fbe07fb6ce7d |
| modern-web-guidance@claude-plugins-official | 0.0.190 |
| ponytail@ponytail | 4.10.0 |
| security-guidance@claude-plugins-official | 2.0.8 |
| superpowers@claude-plugins-official | 6.4.1 |
| typescript-lsp@claude-plugins-official | 1.0.0 |
| ui-ux-pro-max@ui-ux-pro-max-skill | 2.13.0 |

## Skills

### Installed before this project

User-level skills directory `~/.claude/skills` (from `ls`): `find-skills`, `ui-ux-pro-max`, `synced` (skills synced from claude.ai).

Skills the lead session could see (from plugins, user skills and built-ins):

- find-skills
- ui-ux-pro-max, with sub-skills banner-design, brand, design, design-system, slides, ui-styling
- frontend-design
- modern-web-guidance (+ chrome-extensions)
- superpowers: brainstorming, writing-plans, executing-plans, subagent-driven-development, test-driven-development, systematic-debugging, verification-before-completion, requesting-code-review, receiving-code-review, finishing-a-development-branch, using-git-worktrees, dispatching-parallel-agents, writing-skills, diagnosing-superpowers
- ponytail (+ audit, debt, gain, help, review)
- claude-security
- dataviz, artifact-design, artifact-diagramming, artifact-capabilities
- update-config, keybindings-help, code-review, simplify, fewer-permission-prompts, loop, schedule, claude-api, run, init, security-review
- anthropic-skills: docs, docx, import-memory, morning, pdf, pptx, skill-creator, xlsx

### How the repositories were found

BRIEF.md `<motion>` asks for "GreenSock's official GSAP skills and the Open Design skills (`frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`, `creative-director`, `threejs`) if the repositories exist".

`npx skills find <query>` returned "No skills found" for every query in the sandbox, including the control query `react`: its request to skills.sh failed silently. So the same endpoint the CLI calls (`https://skills.sh/api/search?q=...`) was queried with curl. Both repositories exist:

| Repo | Skill | Installs shown |
| --- | --- | --- |
| greensock/gsap-skills | gsap-core | 60,302 |
| greensock/gsap-skills | gsap-scrolltrigger | 58,065 |
| greensock/gsap-skills | gsap-performance | 55,927 |
| greensock/gsap-skills | gsap-timeline | 55,686 |
| greensock/gsap-skills | gsap-plugins | 54,343 |
| greensock/gsap-skills | gsap-react | 53,459 |
| greensock/gsap-skills | gsap-utils | 53,167 |
| greensock/gsap-skills | gsap-frameworks | 50,950 |
| nexu-io/open-design | ui-ux-pro-max | 5,182 |
| nexu-io/open-design | frontend-design | 4,469 |
| nexu-io/open-design | web-design-guidelines | 3,678 |
| nexu-io/open-design | creative-director | 3,165 |
| nexu-io/open-design | threejs | 3,127 |

Searching for `open design` / `opendesign` returned `nexu-io/open-design`, which contains all five skills named in the brief. That is the repo treated here as "Open Design".

### Installed for this project

Project scope, Claude Code agent, files copied into `.claude/skills/`. The install also created `skills-lock.json` in the project root, recording the source and hash for each skill.

| Skill | Repo | Install command | Result |
| --- | --- | --- | --- |
| creative-director | nexu-io/open-design | `npx -y skills add nexu-io/open-design -s frontend-design ui-ux-pro-max web-design-guidelines creative-director threejs -a claude-code --copy -y` | Installed. The sandboxed attempt failed with `ENOTDIR: not a directory, mkdir '.../.claude/skills/<skill>'`; the single retry with the sandbox disabled succeeded. |
| frontend-design | nexu-io/open-design | same command | Installed (same as above) |
| threejs | nexu-io/open-design | same command | Installed (same as above) |
| ui-ux-pro-max | nexu-io/open-design | same command | Installed, then removed from the lock file; the directory is still on disk (see Removed below). Its SKILL.md says it is "Catalog-only ... The full upstream templates, data, and search workflow are not bundled in OpenDesign." The full version is the user-level ui-ux-pro-max plugin listed above. |
| web-design-guidelines | nexu-io/open-design | same command | Installed (same as above). Includes `references/guidelines.md`. |

Listing of `.claude/skills/` after the Open Design install: `creative-director/`, `frontend-design/`, `threejs/`, `ui-ux-pro-max/`, `web-design-guidelines/`, each with a `SKILL.md`.

Final listing of `.claude/skills/` (after the GSAP install and the ui-ux-pro-max removal attempt): creative-director, frontend-design, gsap-core, gsap-frameworks, gsap-performance, gsap-plugins, gsap-react, gsap-scrolltrigger, gsap-timeline, gsap-utils, threejs, ui-ux-pro-max (leftover, see Removed), web-design-guidelines.

Unverified: whether a Claude Code session or subagent picks these up. Skills load at session start, and no new session has been started since the install.

### GSAP skills (installed in the second round)

| Skills | Repo | Install command | Result |
| --- | --- | --- | --- |
| gsap-core, gsap-frameworks, gsap-performance, gsap-plugins, gsap-react, gsap-scrolltrigger, gsap-timeline, gsap-utils | greensock/gsap-skills | `npx -y skills add greensock/gsap-skills -s '*' -a claude-code --copy -y` | Installed. First round: `ENOTDIR: not a directory, mkdir '/home/poatri/projects/neurosoc-site/.claude/skills/gsap-core'` for all 8, both in the sandbox and on the retry with the sandbox disabled. Second round (after `.claude/skills` became a real directory): the sandboxed attempt failed with `ENOENT: no such file or directory, mkdir '.../.claude/skills/gsap-core'` for all 8; the retry with the sandbox disabled printed `Installed 8 skills` with a check mark for each one. |

Verified: `ls .claude/skills` lists all 8 gsap-* directories, and `grep -c gsap skills-lock.json` gives 24.

### Removed

ui-ux-pro-max from nexu-io/open-design was installed then removed because it is catalog-only and would shadow the full ui-ux-pro-max@ui-ux-pro-max-skill 2.13.0 plugin; the full plugin is the one to use.

What actually happened: `npx -y skills remove ui-ux-pro-max -a claude-code -y` removed its entry from `skills-lock.json` (`grep -c ui-ux-pro-max skills-lock.json` gives 0). It could not delete the directory: `EROFS: read-only file system, rmdir '/home/poatri/projects/neurosoc-site/.claude/skills/ui-ux-pro-max'`. A retry with the sandbox disabled was denied by the permission gate. **The directory `.claude/skills/ui-ux-pro-max` is still on disk and must be deleted by hand** (`rm -rf .claude/skills/ui-ux-pro-max`). Until then, the project-level copy may still shadow the plugin.

## MCP servers

- `claude mcp list` reports: "No MCP servers configured."
- The project `.mcp.json` could not be parsed: "MCP config is not a regular file or exceeds 2097152 bytes". Inside the sandbox it is a device node, not a real file.
- The lead session has the claude.ai connectors Claude Docs, Gmail, Google Calendar and Google Drive. Only the Claude Docs tools are loaded. None of them are used for the build.

## Subagents

In `.claude/agents/`, all with `model: claude-opus-5-5`:

- asset-scout
- brand-designer
- motion-3d
- page-builder
- qa-auditor

## Gaps

- **pnpm**: not installed globally. It is being provided through corepack/npx; see the `packageManager` field in `package.json` for the version.
- **ffmpeg**: not installed. It is needed in phase 2 to transcode the join video (MP4 + WebM) and to extract the poster frame. There is no sudo, so the suggested route is the `ffmpeg-static` npm package as a dev dependency. Nothing has been installed for it yet.
- **Leftover `.claude/skills/ui-ux-pro-max`**: the directory still needs to be deleted by hand (see Removed above).
- **`npx skills find` in the sandbox**: returns no results because its network call fails silently. Query `https://skills.sh/api/search` directly instead.
