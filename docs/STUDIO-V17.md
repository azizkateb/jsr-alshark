# v17: embedded office map + redesigned local studio

## What changed
- An embedded Google map appears in the contact section. It uses the office's existing Google Maps query and place identifier; the original full-map link remains available.
- The map URL stays editable in Site settings. The existing showMap toggle hides the map panel. For short Google Maps links, the embed falls back to the office name and address: prefer the existing full link with its query/place identifier.
- The local studio uses Tajawal, a light neutral palette, a quieter sidebar, grouped controls, clear empty states, an inline reset confirmation, search, phone/desktop preview controls and an expanded-preview mode.
- Mobile has separate customization and preview tabs instead of shrinking three desktop columns.
- Import/export, local save, images/PDF uploads, content editing, section order/visibility and theme controls are retained. Ctrl/Cmd+S saves locally.
- Existing v14/v15/v16/v17 JSON backups can be imported. v16 values, including animation settings, are preserved.
- Site theme and the approved word reveal and floating contact-button behavior are unchanged. News and CV lists remain empty until you add content.

## Try it
Open `tools/site-customizer.html` directly in a browser. Change settings and press Update Preview. Save is local storage, not publication. Export produces a ZIP of data, uploaded media and a JSON backup.
The redesigned UI is your local studio, not a reskin of the hosted Pages CMS application. It does not log in, publish, or modify GitHub. Pages CMS continues to use the project's existing .pages.yml configuration.
Google Maps and Google Fonts (Tajawal) need internet access. Their requests go to Google. If maps cannot load or are restricted inside the editor's sandboxed preview, use the full-map link or the actual local Astro site. The iframe sandbox remains intact. Do not publish sensitive CVs.

## Upgrade your existing v16 project
From this extracted upgrade folder run:
`node scripts/apply-studio-v17.mjs "FULL PATH TO YOUR jasr-alsharq"`
The helper validates expected files, creates a sibling backup, inserts the map into the existing section component, appends map-only CSS, and installs the new studio. It does not replace site/theme/layout/copy/animations/news/profiles JSON or media. Your current map URL remains authoritative. Import your saved JSON backup into the new editor to retain drafts that were only in your old editor.
Then run `npm run verify:source`, `npm run build` and `npm run dev` from your project. Install dependencies first only if needed.
The full source ZIP is the reference project, not a copy of your computer's local edits. Prefer the upgrade for an existing project.

## Verification boundary
Static validation, script syntax checks, simulated local editor interactions and safe-upgrade checks are run for this release. A browser executable and installed Astro dependencies are not available here: real browser rendering, live Google map loading and a full Astro build must be checked locally. This is not a claim of visual/browser verification.
