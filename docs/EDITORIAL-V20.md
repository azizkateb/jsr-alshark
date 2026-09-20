# v20: process, Why Us and services editorial redesign

## Scope and content
Only #steps, #why and #services have been restructured. The single-photo hero, navbar, announcement bars, footer, news, CVs, contact/map and floating contact buttons remain unchanged. The local studio keeps its v19 visual design; its embedded site preview now renders the three new structures.
Existing Arabic headings, body paragraphs, step labels, checklist copy, service descriptions and links are preserved verbatim. The existing fourth service remains "الاستفسارات والمتابعة", rather than being silently renamed to "الاستشارات والمتابعة". The existing Why Us description is retained instead of adding unverified quality or experience claims from the reference.

## Reference-driven design
- Shared 1280px grid, brand blue/navy, Tajawal typography and pale atmospheric backgrounds.
- RTL timeline: first step on the right, 56px numbered circles on a thin connecting line; not cards. Mobile uses a vertical line and 46px circles.
- Centered process heading at 36px desktop; clear subtitle and reduced empty space to match the reference's proportions.
- Why Us: large 48px heading and existing text on the right; divided editorial checklist on the left; 112px desktop gap; subtle geometric background; two pill buttons with original destinations.
- Services: four open columns, 46px line-icon circles, thin separators, original titles and descriptions. Icons lift 4px, arrows shift subtly, and a faint background tint appears on hover/focus.
- Explore links are functional: CV service opens #cvs when enabled; other services open the office WhatsApp with the relevant enquiry prefilled. When CVs are hidden, that link falls back to a WhatsApp enquiry. No message is sent automatically.
- At 1568px viewport, the three sections measure about 341px, 368px and 415px high with the tested fallback font and original content. Internet-loaded Tajawal metrics may alter wrapping.
- At <=767px, timeline is vertical, Why Us stacks, services use two columns; at <360px services use one column. No horizontal overflow was found at the tested widths.

## Motion
Only these three sections use restrained 720ms whole-element fade/up reveals (14px movement), with short per-item staggers capped at 300ms. They are excluded from the existing masked-word controller to avoid double animation. All other sections keep their approved motion.
The enabled setting and prefers-reduced-motion remain respected. No content is permanently hidden when JS fails or animations are off. Anchor navigation, focus and printing finish/skip motion. Hover transitions are 320-400ms with no bounce, spin or parallax.

## CMS
Existing site.steps, site.benefits, site.services, title/description fields, theme heading scale and servicesColumns remain bound. No existing JSON, media or Pages CMS schema is replaced. Arbitrary list edits still render, including an additional process step.
The dashboard accepts saved versions 14 through 20. v19 imports preserve timing and custom settings. v18 and earlier still disable the old duplicated hero per the previous release's migration rule. Four service items are defaults, not hardcoded placeholders.
New Explore link label is in PremiumSections.astro and the local preview helper; the Pages CMS schema was not expanded for that new label.
The studio remains local: save is local storage; export produces a ZIP. This release does not connect GitHub, authenticate Pages CMS or deploy the site.

## Apply to an existing v19 project
From the extracted upgrade folder:
`node scripts/apply-editorial-v20.mjs "FULL PATH TO YOUR jasr-alsharq"`
The helper checks the expected old three-section block, makes a sibling backup, replaces only that block with the new component, appends scoped styles and motion, and updates the local editor preview. It refuses an unrecognized customized block before writing. No existing content/media file is deleted or overwritten.
Then from your project:
`npm run verify:source`
`npm run build`
`npm run dev`
Install dependencies first if absent. Import your saved editor JSON backup into the new tools/site-customizer.html if you have editor-only drafts.
The full source ZIP is the complete reference website plus dashboard, not a copy of your local edits. Prefer the upgrade for your edited project.

## Verification
Real Chromium tests passed at viewport widths 320, 390, 600, 767, 768, 834, 1024, 1366 and 1568: RTL numbering, desktop split, mobile stacking, service separators, button bounds, no horizontal overflow. Actual studio iframe import/edit/save/export tested with a fifth process step, custom service title, custom animation duration, and hidden CVs with working link fallback. Non-reduced reveals settled with no masked-word interference. Original text and unrelated sections were compared, and source data/media verified byte-identical.
External Google Fonts/Maps requests were deliberately blocked because the sandbox has no internet access. The screenshots use local font fallback; live Tajawal font metrics and Google Maps still need internet checks. A full Astro production build and actual GSAP plugin rendering were not run because project dependencies are not installed here. Prior version verification notes are historical.
