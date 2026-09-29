# TODO

Placeholders and things the committee must supply.

- `{{GITHUB_ORG}}`: the GitHub organisation name that will host the site (`{{GITHUB_ORG}}/{{GITHUB_ORG}}.github.io`). Used in `site.config.ts` (`SITE_URL`).
- source logo file (the original Canva/vector design; only the 375×375 PNG exists)
- Committee 2026/27 (`src/content/committee.json`), one placeholder per field:
  - `{{PRESIDENT_COURSE_YEAR}}`, `{{PRESIDENT_ASK_ME_ABOUT}}`
  - `{{VICE_PRESIDENT_NAME}}`, `{{VICE_PRESIDENT_COURSE_YEAR}}`, `{{VICE_PRESIDENT_ASK_ME_ABOUT}}`
  - `{{TREASURER_NAME}}`, `{{TREASURER_COURSE_YEAR}}`, `{{TREASURER_ASK_ME_ABOUT}}`
  - `{{SECRETARY_NAME}}`, `{{SECRETARY_COURSE_YEAR}}`, `{{SECRETARY_ASK_ME_ABOUT}}`
  - `{{ACADEMIC_EVENTS_COORDINATOR_NAME}}`, `{{ACADEMIC_EVENTS_COORDINATOR_COURSE_YEAR}}`, `{{ACADEMIC_EVENTS_COORDINATOR_ASK_ME_ABOUT}}`
  - `{{WELFARE_OFFICER_NAME}}`, `{{WELFARE_OFFICER_COURSE_YEAR}}`, `{{WELFARE_OFFICER_ASK_ME_ABOUT}}`
- Previous committees (`src/content/previous-committees.json`): empty; add past years if the committee wants them listed.
- `{{PRICE}}`: Standard membership price (Join page). The committee's video shows £0.00 at checkout and an "(it's free)" overlay; the site keeps the placeholder until confirmed.
- `{{MS_FORMS_URL}}`: mailing-list sign-up link (Join page; shown as text, no link, until supplied).
- `{{CHAT_URL}}`: group chat link (Join page; shown as text until supplied).
- `{{VP_EMAIL}}`: Vice-President's email for complaints that concern someone with inbox access (Complaints page).
- `{{WELFARE_EMAIL}}`: Welfare Officer contact (Contact page).
- `{{CONSTITUTION_DOWNLOAD}}`: the constitution file. Put `constitution.md` or `constitution.docx` in `/content` and the Constitution page should render it verbatim with a TOC and download links (renderer not built yet; see the TODO comment in src/pages/constitution.astro).
