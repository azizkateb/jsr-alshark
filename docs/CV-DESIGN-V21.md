# v21: visual-only nationality / CV / CTA redesign

## Scope
Only #cvs and #cta are redesigned. Hero, navbar, announcement bars, timeline, Why Us, services, news, contact/map, footer, floating contact buttons, and their existing motion remain unchanged. The local studio retains its design; its iframe renderer now displays the redesigned CV/CTA area.
All existing Arabic content is preserved, including the availability disclaimer omitted from the reference. Original five flag files and all country names remain unchanged. No fake CVs have been added.

## Visual changes
- 1320px shared max-width, centered editorial heading with a small blue rule, navy/blue typography, Tajawal, and subtle background depth.
- Five white nationality cards: 20px corners, genuine circular flags, light border, restrained hover lift. On mobile the row swipes horizontally without page overflow.
- Intentional empty panel with 26px corners, existing copy on the right, original WhatsApp enquiry button plus a small document/profile graphic on the left. It stacks on mobile.
- A rounded, inset blue CTA banner instead of an edge-to-edge strip: 30px corners, subtle curves, white heading, original text, white primary and outlined secondary buttons.
- Hover/focus transitions around 300ms. Existing section-heading reveal settings remain in place. Reduced-motion rules are retained.

## Functionality unchanged
This release intentionally adds NO country filtering, NO fake selected country and NO new data-fetching behavior. Country cards still open their original country-specific WhatsApp enquiries in a new tab. Focus/press styling echoes the reference without falsely implying that the CV list was filtered.
The empty-state WhatsApp URL, CTA #contact and #cvs links, published/unpublished CV behavior, PDF viewing, downloading and per-profile WhatsApp enquiries are preserved. Nothing sends a WhatsApp message automatically.
Published CVs replace the empty panel content with styled file rows; the empty visual never hides published files. Existing files and all media are untouched.

## Local editor
Open tools/site-customizer.html. It still saves only locally and exports update files; it is not an authenticated publishing dashboard. Existing backups v14-v21 are accepted. Older hero-duplication migration follows the prior release behavior; importing v20 preserves values.
The underlying content fields and .pages.yml have not changed. No GitHub authentication, hosting deployment or analytics connection is performed.

## Upgrade an existing v20 project
Extract the upgrade folder. From that folder run:
`node scripts/apply-cv-v21.mjs "FULL PATH TO YOUR jasr-alsharq"`
The script checks the original CV/CTA block, creates a sibling backup, replaces only those branches with a new component, appends scoped styles and updates the studio preview. It refuses an unrecognized customized block before writing. It does not replace your JSON data or media.
Then run from your project:
`npm run verify:source`
`npm run build`
`npm run dev`
If needed, install dependencies first. Import your prior editor JSON backup to retain editor-only drafts. Full source ZIP is a fresh reference project; prefer the upgrade when you have local edits.

## Checks and limits
Chromium checks passed at 320, 390, 600, 767, 768, 834, 1024, 1366, and 1568px: no page overflow, desktop five-card row, bounded enquiry/CTA buttons, inset banner and working RTL horizontal scroll. The real studio was tested with an unpublished profile and a published test PDF (fixtures only, not shipped): one visible CV, view/download/enquiry actions, import/save/export and return to empty state.
Country native anchor URLs and non-prevented clicks were verified with test interception; no WhatsApp messages were sent. Live WhatsApp destination loading was not tested. Original text, URLs and flags were compared; all unrelated DOM sections and source data/media/script files were verified unchanged.
External Google Fonts and Maps requests were blocked because the sandbox has no internet access. Screenshots use a local fallback font; live Tajawal rendering needs internet verification. Full Astro build and actual GSAP plugin rendering were not run here because project dependencies are not installed. Run a local build before publication.
