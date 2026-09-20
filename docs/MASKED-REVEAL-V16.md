# v16: slower masked word reveal

Retains the user-supplied Osmo-style line masks, word-only splitting and CustomEase (0.625, 0.05, 0, 1).

## Changes
- Duration: 0.9 seconds per word (previously 0.6).
- Stagger: 0.08 seconds between words (previously 0.06).
- Reveal headings h1/h2/h3, step titles and the large office title in every section, including About.
- Keep body paragraphs, eyebrow labels, captions, checklist copy, small print and controls static.
- No section exclusions. Layout, images, colors, contact buttons and their hover behavior are unchanged.
- Reduced-motion, print, keyboard and anchor safeguards are retained.
- Pages CMS and the local editor use the same updated defaults and heading-only scope.

## Keep your local changes
Use the upgrade archive instead of replacing your project with the full reference source.
From the extracted upgrade folder run:
`node scripts/apply-masked-v16.mjs "FULL PATH TO YOUR jasr-alsharq"`
The helper makes a sibling backup, updates animation-related files, and explicitly sets duration to 0.9 and stagger to 0.08. It preserves the enabled setting, trigger position, site content, colors, layout, copy, news, profiles and media. It does not publish anything.
Then run `npm run verify:source` and `npm run build` in your project. Use `npm install` first if dependencies are missing.
The local editor accepts v14/v15/v16 JSON backups; importing older backups keeps their content and replaces obsolete animation settings with these defaults.

The downloadable preview and local editor use browser-native approximations; the Astro project uses actual GSAP SplitText, CustomEase and ScrollTrigger.
Static and mocked lifecycle checks are not a substitute for a local Astro build and real-browser checks. npm installation, the full build, and visual browser testing were not run in this sandbox.
