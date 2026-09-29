# Handover

For the outgoing and incoming committees. The website is only a GitHub repository; there is no
server, database or hosting account to hand over beyond what is listed here.

## Committee changeover checklist

Do this at or straight after the AGM.

- [ ] **GitHub organisation owners.** The organisation `guneurosoc` must always have at least
      two owners, so the site is never locked to one person. At the AGM, add at least two incoming
      committee members as owners, then remove owners who are leaving (see below for where).
- [ ] **Society email account** (neurosciencesoc@src.gla.ac.uk). Hand over access to the incoming
      committee in line with the SRC's arrangements, and make sure the GitHub organisation's
      contact and recovery details use the society email, not a personal one.
- [ ] **Brand kit.** `brand/BRAND.md` in this repository is the source of truth for colours,
      type, logo use and tone, with the brand files alongside it in `brand/`. Tell the incoming
      committee where it is. It is not edited as part of website work; web-only design decisions
      go in `DESIGN.md`.
- [ ] **Archive the outgoing committee.** Add the outgoing committee to the top of
      `src/content/previous-committees.json` (format in `README.md`, section (b)).
- [ ] **New committee cards.** Update `src/content/committee.json` with the incoming committee
      (format in `README.md`, section (a)). Only publish names and details the people concerned
      have agreed to.
- [ ] **Placeholders.** Go through `TODO.md` and fill in anything the new committee can confirm.

## GitHub organisation ownership

- **Owners:** on GitHub, open the organisation → **Settings** → **People** (or the **People**
  tab), filter by role **Owner**. Change a member's role to Owner, or remove a leaver, from the
  menu next to their name. Keep at least two owners at all times.
- **Pages:** in the repository `guneurosoc/guneurosoc.github.io`, **Settings** →
  **Pages** → **Build and deployment** → **Source** must be **GitHub Actions**. The workflow in
  `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.
- **Branch protection (optional):** **Settings** → **Branches** → add a rule for `main` that
  requires a pull request before merging, so changes get a second pair of eyes.

## Domain

No domain has been bought yet; the site lives at `https://guneurosoc.github.io`.

When one is bought:

1. Set it in the repository's **Settings** → **Pages** → **Custom domain**, and follow GitHub's
   instructions for the DNS records at the registrar. Do **not** add a `CNAME` file to the
   repository: with a GitHub Actions deploy, GitHub ignores it.
2. Change `SITE_URL` in `site.config.ts` to the new address (e.g. `https://example.org`, no
   trailing slash) and merge to `main`.
3. Record the details here:
   - Registrar: `{{DOMAIN_REGISTRAR}}`
   - Renewal date: `{{DOMAIN_RENEWAL_DATE}}`
   - Paid from / account held by: the society, not a personal account

Put the renewal date in the society calendar. If a domain lapses, the site becomes unreachable at
that address and the name can be bought by someone else.

## If the site breaks

1. Open the repository's **Actions** tab. A red cross on the latest "Deploy to GitHub Pages" run
   means the build failed and the live site is still the previous good version. Click the run to
   see which step failed; an invalid JSON file is the usual cause.
2. If the failure looks temporary (a network error while installing), click **Re-run jobs**.
3. To roll back, open the commit that caused the problem (**Commits** on the repository page, or
   the merged pull request) and use **Revert** to create a pull request that undoes it; merge it
   and the site redeploys. Using git locally: `git revert <commit>` then push to `main`.
4. You can also redeploy the current `main` by hand: **Actions** → "Deploy to GitHub Pages" →
   **Run workflow**.
