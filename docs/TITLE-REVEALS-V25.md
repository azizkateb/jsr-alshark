# v25: consistent masked word reveals for every title

## Fix
The shared heading animation controller explicitly skipped the redesigned hero/About, process, Why, services and contact sections. Removed those exclusions in both Astro source and local preview/dashboard. The existing GSAP SplitText line masks, word-based Arabic reveal, CustomEase and defaults (0.9 seconds, 0.08-second word stagger, 90% viewport trigger) remain unchanged.

All 19 visible default headings/prominent titles now participate, including hero, process step titles, Why, services, CV/CTA, customer service, form title and location title. Paragraphs, input labels, captions, phone links, form status, navigation and footer do not get split into animated words. Whole-element reveals are skipped on heading-containing containers to avoid double transforms/fades; separate photo/card/checklist reveals remain.

Reduced-motion and global animations-disabled settings still leave content static and readable. Print, keyboard, anchor-navigation and resize safeguards remain. Native browser approximation is used in the standalone preview and studio; real Astro uses the existing GSAP plugins.

No contact numbers, text, layout, styles, media, slideshow order/timing, WhatsApp behavior, map or other data changed. The local studio deliberately retains the v24 storage key and JSON backup format so drafts are not reset. Export/import your settings JSON if moving local file paths changes browser storage access.

## Upgrade an existing v24 project
Export your studio settings backup, extract the upgrade ZIP and run:
node scripts/apply-reveal-v25.mjs "FULL PATH TO YOUR jasr-alsharq"

Only four animation scripts and the local dashboard are updated, plus these notes. The helper checks these exact source files, refuses conflicting local code edits before writes, creates a sibling backup and is safe to rerun. All src/data and public/media files are left untouched.

Run npm run verify:source and npm run build in your project, then npm run dev. No publication or external account changes are performed.

## Verification
Browser tests passed at 320, 390, 768, 1024 and 1568px: all 19 current visible titles had masked word reveals, new-section headings animated at their scroll trigger points, no simultaneous ancestor animation, no horizontal overflow, no small-text splitting. Reduced-motion change restores original text; initial reduced-motion and animations-disabled states remain static. Print reveals all text. Studio preview checked across the newly included sections. Source validation and JavaScript syntax checks passed.

Sandbox has no internet access: external fonts/maps are blocked in browser tests. For studio tests only, network font links/map iframe were removed from the test document to avoid loading stalls; shipped files retain them. Actual Astro production build and GSAP rendering were not run because dependencies are unavailable here. Run the production build locally before publication.
