# v19: one hero, reference-matched proportions

## Visible changes
- The separate centered office image circled in red no longer renders. Its existing `hero` layout entry is disabled; the original media file is retained for the new hero. This is a reversible display change, not file deletion.
- The split About section is now the single main hero. Desktop: larger photo left, Arabic copy right. Mobile: photo first, content second, features in a 2x2 arrangement.
- Brand name, original photo, full description, logo and link destinations are unchanged. Navbar, announcement bars, footer, contact section/map, other sections and dashboard styling are not redesigned.

## Reference details (default settings)
- 1280px desktop content container, 96px gap, 1.62:1 image/content column ratio.
- At a 1568px viewport: image approximately 732x436px; 452px content column; 64px heading.
- Image frame ratio 1.68:1, 28px corners, restrained shadow. Existing 440x240 photo is gently cropped to the reference's taller shape, not stretched. The photo is not AI-replaced, filtered or relabeled.
- Hero-only Tajawal 400/500/600/700. The rest of the website retains its configured font; the existing studio remains Tajawal.
- Two-line heading, navy/brand blue; 16px paragraph with 1.85 line height; 44px feature icon circles; approximately 180x46px CTA; compact lower-left location card.
- At 390px viewport: 350x208px image, approximately 45px heading, image-first stacking and no horizontal overflow.
- Top spacing remains below the existing navbar and announcement elements. Their combined height is unchanged, so this site's content begins lower than the reference with only one thin navbar.
- Original paragraph is longer than the reference. It is retained in full; hero height grows rather than clipping or rewriting it.
- One real photograph means no misleading carousel indicators.
- Existing small office-name/logo signature remains, preserving content.

## Image quality
The provided original is 440x240px. Scaling it to about 732px wide cannot recreate missing detail. A high-resolution original of the same office will make this layout substantially sharper. Do not substitute the reference's different storefront or phone number. The phone number visible in the original image differs from the confirmed contact links; confirmed links are intentionally unchanged.

## Use
Open `tools/site-customizer.html` for the local dashboard. It has the updated hero preview. Importing v14-v18 backups disables the old separate photo while retaining other values; v19 imports preserve explicit settings. You may deliberately re-enable the legacy image section under layout, but doing so brings the duplicate back.
This is not an authenticated publishing dashboard. Saving is local, and export writes a ZIP for your project; nothing is automatically published.

## Upgrade current v18 project
Extract the upgrade folder, then run from it:
`node scripts/apply-hero-v19.mjs "FULL PATH TO YOUR jasr-alsharq"`
The helper creates a sibling backup, disables only the old hero entry, appends scoped CSS, adds a hero-only Tajawal stylesheet link, prioritizes the main photo load, and updates the local editor. No existing image or content file is deleted. The full source ZIP is a separate reference project; prefer the upgrade if you made local edits.
Then run from your project:
`npm run verify:source`
`npm run build`
`npm run dev`

## Verification
The standalone website and actual studio iframe were tested in Chromium with external network requests blocked, at widths 320, 390, 767, 768, 834, 1024, 1366 and 1568. Checks covered exactly one hero photo, desktop left/right composition, mobile stacking, no horizontal overflow, visible location card, real editor edit/apply/save and mobile workspace tabs, and settled non-reduced-motion reveals. Screenshots were inspected at desktop and mobile widths.
CSS specifies Tajawal, but external font requests were blocked during tests, so visual screenshots use local font fallback. Exact Tajawal rasterization and live Google Maps still require internet testing. Astro dependencies are not installed here; the full Astro production build and actual GSAP plugin rendering were not run. Prior verification notes apply to their historical versions, not all of these v19 checks.
