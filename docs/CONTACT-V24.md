# v24: contact redesign and three-photo hero

## Delivered
- Contact section only: form on the left, customer service/location/map on the right; mobile stacks customer service and map before the form. Scoped Tajawal styling, soft blue background, roomy layout, line icons, rounded fields, accessible focus states, restrained 600ms contact-only reveal.
- Existing phone numbers remain 0599510111 and 0530720010. Their original tel links, WhatsApp number 966599510111, email, address, office name and Google Maps query/place identifier are unchanged. No opening hours or detailed address were invented. The actual Google Maps iframe remains, not an image.
- Existing name, phone, subject and message fields retain their validation. Added optional email field as requested, included in the WhatsApp message if supplied. Submit label is إرسال الرسالة. Submit opens WhatsApp directly in a new tab/app with the encoded message; there is no second generated link. The visitor must still press Send inside WhatsApp. The website does not send a message on its own, store a lead, send email or claim delivery.
- Existing privacy statement, Musaned note and map fallback link remain. All other sections, navbar, footer, country links and floating contact buttons are unchanged.
- Hero order: supplied storefront, interior 1, interior 2. Previous first photo removed only from the active slider; media library file retained. 4-second progress indicators, crossfade, keyboard/swipe, reduced-motion handling and automatic hover/focus/offscreen pauses remain. No pause button.

## Full project
The ZIP contains the Astro source and tools/site-customizer.html. Follow the existing project setup for Node/dependencies, then run npm run verify:source, npm run build and npm run dev. Open the local studio HTML for editing. Nothing has been deployed or published.

## Preserve an existing v23 project
Export any current local studio draft as JSON before switching files. Extract the upgrade and run:
node scripts/apply-contact-v24.mjs "FULL PATH TO YOUR jasr-alsharq"

The helper checks known component/form structures, prepares edits and makes a sibling backup before writing. It preserves source contact data and other settings, changes only the known default photo order, updates the submit label only when still the old default, adds the scoped contact source, and updates the local dashboard. Unrecognized local component/form/editor changes are refused before writes, not overwritten. Local draft settings remain importable. The v24 editor uses a new storage key and can import v14-v24 JSON; known v22/v23 photo defaults migrate while existing local text and phone numbers are retained.

## Verification and limits
Source validation and browser tests passed at 320, 390, 767, 768, 834, 1024, 1366 and 1568px: no page overflow, correct desktop/mobile ordering, all original contact destinations, Google Maps place identity, 16:9 frame, three-photo order, ~4-second advance/fill, phone validation, optional email and encoded WhatsApp handoff without a second link. WhatsApp navigation was intercepted during tests; no message was sent. Local editor backup import/save tested. Original media and unrelated rendered sections compared for preservation.

Sandbox has no internet access: external fonts/maps were blocked in browser tests. Studio test fixture removed external font links and the map iframe to avoid blocked-resource loading; shipped files retain both. Production Astro build and live Google Maps/WhatsApp opening still need a local connected browser and installed project dependencies. Browser popup restrictions may affect new-tab handoff.
