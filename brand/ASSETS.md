# Third-party assets

Every third-party asset used on the site. The Credits page lists these from this file.
Date checked for all entries: 2026-09-29.

## Accepted

| Title | Author | Source URL | Licence (as stated on the page) and licence URL | Required attribution text (Credits page) | Local file | File size | Date checked |
|---|---|---|---|---|---|---|---|
| Brain (3D model, hero) | dgallichan (Sketchfab user) | https://sketchfab.com/3d-models/brain-cadd2bde67404c43b2359a6a3281d84a (original). File downloaded from the NIH 3D copy: https://3d.nih.gov/entries/3DPX-021161 | Sketchfab page: "CC Attribution" / "Creative Commons Attribution", linking http://creativecommons.org/licenses/by/4.0/. NIH 3D page: "Licensing:" with CC-BY badge, linking https://creativecommons.org/licenses/by/4.0/ | "Brain" by dgallichan (https://sketchfab.com/3d-models/brain-cadd2bde67404c43b2359a6a3281d84a), licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Simplified and compressed for the web by GU NeuroSoc. | `/public/assets/models/brain.glb` | 1,578,356 bytes (derived; original 13,161,040 bytes) | 2026-09-29 |
| Animated Noto Emoji: Brain (U+1F9E0) | Google, Noto Emoji project (the page names no individual author) | https://googlefonts.github.io/noto-emoji-animation/ (file: https://fonts.gstatic.com/s/e/notoemoji/latest/1f9e0/lottie.json) | "Animated Noto Emoji is licensed under CC BY 4.0. See the full license for all details." linking https://creativecommons.org/licenses/by/4.0/legalcode | Brain animated emoji from Animated Noto Emoji by Google (https://googlefonts.github.io/noto-emoji-animation/), licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). | `/public/assets/lottie/noto-brain.json`: downloaded, not used on the site, file removed 2026-09-29 | 115,765 bytes | 2026-09-29 |
| Animated Noto Emoji: High voltage (U+26A1) | Google, Noto Emoji project (the page names no individual author) | https://googlefonts.github.io/noto-emoji-animation/ (file: https://fonts.gstatic.com/s/e/notoemoji/latest/26a1/lottie.json) | as above: "Animated Noto Emoji is licensed under CC BY 4.0. See the full license for all details." linking https://creativecommons.org/licenses/by/4.0/legalcode | High voltage animated emoji from Animated Noto Emoji by Google (https://googlefonts.github.io/noto-emoji-animation/), licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). | `/public/assets/lottie/noto-high-voltage.json` | 89,096 bytes | 2026-09-29 |
| Animated Noto Emoji: Sparkles (U+2728) | Google, Noto Emoji project (the page names no individual author) | https://googlefonts.github.io/noto-emoji-animation/ (file: https://fonts.gstatic.com/s/e/notoemoji/latest/2728/lottie.json) | as above: "Animated Noto Emoji is licensed under CC BY 4.0. See the full license for all details." linking https://creativecommons.org/licenses/by/4.0/legalcode | Sparkles animated emoji from Animated Noto Emoji by Google (https://googlefonts.github.io/noto-emoji-animation/), licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). | `/public/assets/lottie/noto-sparkles.json` | 15,584 bytes | 2026-09-29 |

### Notes on the brain model

- The NIH 3D entry 3DPX-021161 ("Detailed Human Brain Model (3D)", uploader shown as "Johnson J",
  description says "Produced By: Schmidt's") is a re-upload. Its mesh has exactly the same counts
  as dgallichan's Sketchfab model (377,701 faces, 188,749 vertices; Sketchfab published
  2018-01-12, NIH 2025-03-24), so credit goes to dgallichan. The Sketchfab description reads
  "Generated with Freesurfer ( https://surfer.nmr.mgh.harvard.edu/ ) from a T1-weighted MRI scan."
  Both pages state CC BY 4.0. The files were not compared byte for byte, because Sketchfab
  downloads need a login.
- Downloaded from https://3d.nih.gov/api/submissions/27696/runs/b660a11c-e73d-41ae-a254-b07b8e0d4678/output-files/659764
  (sha256 of original 5d3bec40...085b2d). The NIH S3 links (persist-3d-media.s3.amazonaws.com) returned AccessDenied.
- Changes made (CC BY 4.0 asks for changes to be indicated) with @gltf-transform/cli: `weld`,
  `simplify --ratio 0.2 --error 0.01`, `quantize`. The result has 4 meshes and 75,487 triangles
  (23,739 + 23,480 + 23,015 + 5,253), down from 377,701. It has no textures and no labels, and
  keeps vertex colours (COLOR_0).

## Rejected

| Candidate | Source URL | Reason |
|---|---|---|
| NIH 3D "3D model of the Brain" (nevitdilmen) | https://3d.nih.gov/entries/3DPX-003765 | Licence CC-BY-SA (links by-sa/4.0). Also 1.3M to 4M polys. |
| NIH 3D "Brain Model" (brain MRI, nevitdilmen) | https://3d.nih.gov/entries/3dpx-003455 | Licence CC-BY-SA (links by-sa/4.0). |
| NIH 3D "Full brain" (Benjamin MENARD) | https://3d.nih.gov/entries/3dpx-000320 | Licence CC-BY-NC-SA (links by-nc-sa/4.0). |
| NIH 3D "Well Explained Brain Model (3D)" (Johnson J, "Model Produced By: ScrapSpy") | https://3d.nih.gov/entries/3DPX-021159 | Page says CC-BY, but it is a re-upload. It matches Sketchfab "Brain" by maheshshinde777 (9,528 faces, CC Attribution, https://sketchfab.com/3d-models/brain-735ca31a3b22433281e6fa9606792faa), whose description is just "brain" and gives no provenance. The page credits yet another producer, so the origin is unclear. |
| Wikimedia Commons "File:Brain AS.stl" (AgnieszkaStarostecka) | https://commons.wikimedia.org/wiki/File:Brain_AS.stl | Licence is fine (CC BY 4.0), but the file is 152,856,084 bytes, far too large. |
| Sketchfab "Model of a human brain" (Science Museum Group) | https://sketchfab.com/3d-models/model-of-a-human-brain-fc7ae7b989f94c80a50152e71f44e47c | CC0, but it is a sectioned teaching model with numbered and labelled parts (743,676 faces). The brief says no labels or regions. |
| Sketchfab "Human Brain" (AH / agher), CC Attribution, 74,590 faces | https://sketchfab.com/3d-models/human-brain-c9c9d4d671b94345952d012cc2ea7a24 | Suitable licence, but downloading needs a Sketchfab login, which was not available. Backup option. |
| Sketchfab "Brain Areas" (versal) | https://sketchfab.com/3d-models/none-d64608a3978b47d8a39c5a15795ca8c4 | Divided into regions, against the brief. Download also needs a login. |
| Sketchfab "Brain" (milton.sesarego) | https://sketchfab.com/3d-models/brain-f1dfc4e6b83b4ccca55fe8df6616db77 | Its description says it is the brain from "Pinky and the Brain", a third-party character, so rights are unclear. |
| LottieFiles animations (e.g. https://lottiefiles.com/84627-neurallink, https://lottiefiles.com/75454-brain, https://lottiefiles.com/3009-sparkles, https://lottiefiles.com/free-animation/neural-network-loading-JLFLS47ab1) | lottiefiles.com | Could not open the pages. Every request returned HTTP 403 with a Cloudflare "Just a moment..." challenge (curl and WebFetch alike), so the licence shown on each page could not be confirmed. |

## Software

Versions and `license` fields as read from `node_modules/<pkg>/package.json` on 2026-09-29.

| Package | Version | Licence (as stated) | Where it runs |
|---|---|---|---|
| gsap | 3.15.0 | "Standard 'no charge' license: https://gsap.com/standard-license." | Browser (runtime) |
| lenis | 1.3.26 | MIT | Browser (runtime) |
| lottie-web | 5.13.0 | MIT | Browser (runtime) |
| three | 0.186.1 | MIT | Browser (runtime) |
| satori | 0.33.5 | MPL-2.0 | Build time (OG images) |
| @resvg/resvg-js | 2.6.2 | MPL-2.0 | Build time (OG images) |
| sharp | 0.35.5 | Apache-2.0 | Build time (astro:assets image optimisation) |
