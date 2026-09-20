# v23: hero slider without the pause button

Removed the visible pause/resume button and its unused event handling/styles. The four photos, 4000ms active playback, filling/clickable indicators, crossfade, vertical centering, keyboard and touch navigation are unchanged. Automatic pauses on hover, focus, hidden tabs and offscreen remain. Reduced-motion and animations-disabled modes still use manual navigation.

All website content, media, CMS fields and configuration files are unchanged. The local editor deliberately retains the v22 backup format and storage key so existing local drafts can still load. When switching local HTML file paths, export/import a settings backup if your browser does not share file storage.

## Safe upgrade from v22
Export any unsaved editor draft first. Extract the upgrade ZIP, then run:

`node scripts/apply-no-pause-v23.mjs "FULL PATH TO YOUR jasr-alsharq"`

The helper backs up changed files before writing, removes only the pause button and its own handling/styles, and updates the local studio. It leaves site/theme/layout/copy/animations/news/profiles and all photographs untouched. Re-running is supported.

Then run `npm run verify:source` and `npm run build` in your project. Open `tools/site-customizer.html` for the local dashboard. Nothing is deployed or published by this upgrade.

Historical v22 notes below this release may mention the now-removed explicit pause button. Full Astro production build is not run in this sandbox because project dependencies are not installed. Browser tests block external fonts/maps and therefore use fallback fonts.
