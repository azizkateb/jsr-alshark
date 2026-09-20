# v22: vertically centered four-photo hero slider

## Photos and order
1. Existing original office photo (site.heroImage / site.heroAlt).
2. Uploaded office interior with desk and visitor seating.
3. Uploaded office with black visitor chairs.
4. Uploaded blue storefront.
The three uploaded photographs were converted to WebP (about 227 KB total) without recoloring or AI alterations. The existing 440x240 first photo is unchanged. Images fill the existing 1.68:1 hero frame with cover cropping, never stretch. Source photo detail is not invented. Different phone numbers/logos visible on supplied signage are left as photographed; the site's existing brand and confirmed phone/WhatsApp links are unchanged.

## Layout and interactions
- The image frame itself is vertically centered against the content column on desktop/tablet, not top-aligned. The controls sit beneath it without moving the image's center. On mobile the slider remains first, followed by the copy.
- One image every 4000ms of active, visible playback, with a restrained 450ms crossfade.
- Four clickable progress-bar indicators under the image fill right-to-left over the current 4-second cycle. Selecting an indicator resets that cycle.
- Pause/resume button, RTL left/right arrow keys on indicator buttons, Home/End, and touch swipe.
- Playback pauses while hovered, keyboard-focused, outside the viewport or on a hidden browser tab. The explicit pause button persists until resumed. A focused control keeps playback paused until focus leaves.
- Reduced-motion preference or the global animations.enabled=false disables autoplay. Manual navigation and an active filled indicator remain. Single-image configuration hides unnecessary controls.
- Slide image errors disable that indicator and skip the failed slide while retaining valid images. No new messaging, enquiries or external navigation is performed by the slider.
- Location card and its map link remain unchanged. Navbar, all body sections, footer, contact links and original content remain unchanged.

## Edit the photos
In Pages CMS, Site content now includes heroSlides (additional slider images), each with image and accessible alt text. The existing heroImage remains first. Reorder or remove additional entries as needed.
In the local editor open Site / صور السلايدر. Change the main image or add/reorder/upload extra image entries. The local upload remains local until you export and copy the files into the project. The editor supports v14-v22 JSON backups; earlier backups receive the new three-image list only if heroSlides was absent. An intentionally empty array stays empty.
Existing .pages.yml fields, site text and theme values remain. No GitHub login, deployment or publication is performed.

## Upgrade an existing v21 project
From the extracted upgrade folder:
`node scripts/apply-slider-v22.mjs "FULL PATH TO YOUR jasr-alsharq"`
The helper checks expected v21 structure, prepares edits and creates a sibling backup. It adds three WebP images, the slider component/script/styles, heroSlides data and CMS field, Zod validation, and the updated local editor. Existing original media are never replaced. It refuses an unrecognized customized About component or conflicting new image paths before writing.
Run from your project:
`npm run verify:source`
`npm run build`
`npm run dev`
Install dependencies first if needed. Import your prior editor JSON backup to retain editor-only drafts. The full ZIP is the reference project with the website and local dashboard; the upgrade is safer for a locally edited project.

## Verification
Real Chromium checks passed at widths 320, 390, 767, 768, 834, 1024, 1366 and 1568. Desktop image-center to text-center error was <0.01px in tested layouts; mobile controls were in bounds with no page overflow. All four images loaded. Timer verified half progress at about 2 seconds and automatic change after about 4 seconds; pause/resume, hover pause, offscreen pause, indicators, RTL keyboard navigation and single-image state were tested.
The actual local editor was tested for slider fields, v21 import migration, empty additional-image array, saving v22 and ZIP export. Unrelated page sections, old media and all site content except the added heroSlides field were compared for preservation.
Google Fonts/Maps network requests were blocked because the sandbox has no internet access. Browser tests use local fallback fonts. Full Astro production build and actual GSAP plugin rendering were not run here because dependencies are not installed; run the local build before publication.
