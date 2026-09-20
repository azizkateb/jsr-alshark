# v15: Osmo-style masked word reveal

Adapted from the user-provided Osmo (https://osmo.supply/) example. Source attribution retained. GSAP + SplitText + CustomEase + ScrollTrigger are bundled by Astro from the existing `gsap` npm dependency (3.13+).

## Motion
- SplitText type: lines,words. Arabic letters are not individually split.
- mask: lines; yPercent 110 → 0.
- duration: 0.6 seconds per word; stagger: 0.06 seconds.
- CustomEase: 0.625, 0.05, 0, 1.
- Time-based once-on-enter, starting at top 90%; not scroll-scrubbed and not a scatter effect.
- Every visible main section is eligible, including the hero caption, About, steps, services, CVs, news and contact text. Empty/hidden sections and interactive fields, links, live-status messages are not destructively split.
- Original typography, mobile/desktop layout, photo, flags, and button hover remain unchanged.
- Reduced motion restores ordinary text. Font loading, line reflow, anchors, focus and printing are handled.

## CMS migration
`animations.json` now contains enabled, duration, stagger and start. Old flight, depth, rotation, scrub and About-exclusion controls were removed from `.pages.yml` and the validation spec.
The updated local editor imports v14 JSON backup files, preserving content/theme/media while migrating animation settings. Native preview approximates the actual SplitText layout with Range-measured words and line masks. The Astro project uses the actual requested GSAP plugins.

## Applying the update to your working project
Back up your current project or commit it first. The full archive is a new complete project with the original supplied content, not a copy of any local edits made on your computer. To keep local work, use `masked-reveal-upgrade.zip` instead:
1. Run `node scripts/apply-masked-v15.mjs` from the extracted upgrade folder, passing the path to your existing project. It validates the expected v14 structure and creates a backup before applying.
2. From your project run `npm install`, `npm run verify:source`, `npm run build`, then `npm run dev`.
3. Test Arabic wrapping, word clipping and reduced motion on an actual phone and desktop. Update the live Pages CMS fields by committing the generated `.pages.yml` changes with the source changes.

Static checks and simulated plugin lifecycle tests passed. Real GSAP rendering, npm installation and full Astro compilation were not run in this sandbox. You reported the prior v14 project worked locally; this v15 update still needs a local build and browser test.
