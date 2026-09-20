# v18: About section only, reference-inspired composition

## Design scope
Only the About section is redesigned. Header, navbar, announcement/ribbon, existing hero photo section, steps, Why Us, services, countries/CVs, CTA section, news, contact/map, footer, drawer and floating contact buttons retain their v17 markup and behavior.
The local Tajawal studio retains its v17 design and functions; only its website preview renderer is updated to understand the new About section.

## About section
- Asymmetric 1380px-wide composition: actual office image on the left, Arabic content on the right.
- Image first on mobile, then content, with a 2x2 feature arrangement.
- Original جسر الشرق brand, logo, full Arabic paragraph and English office name retained. No replacement with the reference's جسر الأفق identity or generated storefront.
- Heading split visually into جسر الشرق and للاستقدام, from the existing editable aboutTitle value.
- Original image reused without cropping, recoloring or filters. Its original resolution is 440x240; large desktop display cannot invent detail. A higher-resolution original will improve sharpness.
- Existing hero image section stays unchanged, so the same office photograph now also appears in About. This is intentional to honor the About-only scope.
- Location card opens the existing exact Google Maps link and displays the editable office address.
- Four compact feature labels summarize supported services/process, not unverified speed, experience or guarantees. No carousel dots for a single photograph.
- Contact button navigates to the contact section; if disabled in layout, it opens the office's WhatsApp instead.
- Small brand signature retains the office logo and English name; showAboutLogo continues to control its visibility.
- About uses soft whole-element fade/up reveals; every other section retains the approved v16 masked-heading behavior and timing.
- Reduced-motion, disabled animation setting, print, focus and About-anchor safeguards are retained.

## CMS and local studio
Existing site content, image, logo, map link, address, aboutTitle, about description, heading scale and section visibility remain connected to existing settings. No site/theme/layout/copy/animations/news/profiles JSON has been replaced in an upgrade. To keep existing studio drafts, import your saved JSON backup into the new tools/site-customizer.html. The editor accepts v14 through v18 backups and preserves v16+ animation values.
Four concise feature labels live in src/lib/about-data.js; the existing CMS schema was not expanded for these new labels. They can be edited in that file.
This is still a local editor, not an authenticated publishing CMS. It makes no automatic GitHub or deployment changes.

## Upgrade an existing v17 project
From this extracted upgrade folder:
`node scripts/apply-about-v18.mjs "FULL PATH TO YOUR jasr-alsharq"`
The helper checks the existing About implementation, creates a sibling backup, swaps only the About branch for its new component, installs scoped CSS and motion, and updates the studio preview. It preserves data and media and refuses an unrecognized customized About block rather than replacing it silently.
Then run `npm run verify:source`, `npm run build`, and `npm run dev` from your project. If dependencies are absent, run `npm install` first.
Full source ZIP is a complete reference project; use the upgrade to retain edits on your computer.

## Verification
Passed: CMS/source validation; all inline JS syntax; exact non-About section DOM comparisons; unchanged data/media and navbar/footer source; full original About description and photo retained; simulated studio controls/import/export; mocked existing GSAP lifecycle and About motion safeguards; title split fallback; upgrade equivalence and idempotency.
Not performed: full Astro build, actual browser rendering or Google map/font network loading. The sandbox has no internet access or installed browser executable. Run a build and check mobile/tablet/desktop in your browser before publishing.
