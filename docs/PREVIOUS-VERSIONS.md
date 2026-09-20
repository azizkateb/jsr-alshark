# جسر الشرق للاستقدام

نسخة أولى من مصدر المشروع: Astro + TypeScript + Pages CMS، نشر ثابت على Cloudflare Pages.

## جاهز في المصدر

تصميم عربي RTL مستند إلى ترتيب فيديو نخلة، بهوية المكتب الزرقاء. الفيديو مرجع الجوال، وليس قياسًا مطابقًا لكل بكسل. نسخة الكمبيوتر تكييف للتصميم نفسه.
قائمة جوال، تعريف وخطوات وخدمات وجنسيات وملفات وأخبار وتواصل. الأخبار والسير الذاتية فارغة دون بيانات وهمية؛ الأخبار ورابطها مخفيان حتى نشر أول خبر.
إعداد `.pages.yml` للنصوص والشعارات وأرقام التواصل والخدمات والأخبار وملفات PDF.
عرض ملفات السير الذاتية وتنزيلها والاستفسار عنها عبر واتساب، بدون بحث أو حسابات زوار أو نظام طلبات.
النموذج يجهّز رابط رسالة واتساب فقط: لا يرسل بريدًا أو يخزن طلبات، ولا يرسل الرسالة تلقائيًا.
رابط Google Maps لموقع المكتب، وليس خريطة مضمنة. لا روابط تواصل اجتماعي مختلقة.
لا Pixels أو لوحة تحليلات أو ربط كول سنتر، ولا اتصال بحسابات العميل.

## التشغيل

يتطلب Node.js 22.12+ ومدير npm. الحزمة لا تشمل node_modules أو dist أو ملف قفل.

```sh
npm install
npm run verify:source
npm run dev
npm run build
npm run preview
```

احفظ package-lock.json الناتج بعد تثبيت وبناء واختبارات ناجحة. نطاقات الحزم ليست ملف قفل إنتاج مجرّب.
تم فحص المصدر وJSON وصياغة JavaScript محليًا فقط. لم يُشغّل Astro build أو فحص متصفح آلي: بيئة التحضير لا تتيح تثبيت الحزم عبر الإنترنت.

## Pages CMS

1. ارفع المشروع إلى مستودع GitHub خاص بحساب يملكه العميل.
2. افتح https://app.pagescms.org وسجّل الدخول، وامنح التطبيق صلاحية لهذا المستودع فقط.
3. افتح المستودع والفرع، وسيقرأ `.pages.yml`. الملف بصيغة JSON الصالحة أيضًا داخل YAML.
4. جرّب تعديل نص وحفظه وتحقق من commit والنشر.
5. جرّب رفع ملف PDF مسموح بنشره وإضافته لقسم السير الذاتية، وتحقق من عرضه وتنزيله.

اللوحة المستضافة منفصلة وليست صفحة `/admin` داخل موقع العميل. الإعداد موجود لكنه لم يُختبر بحساب فعلي.
التعديلات لا تظهر فورًا: الحفظ ينشئ commit ثم تبدأ دورة البناء والنشر.
الأخبار والملفات محفوظة كمصفوفات في src/data/news.json وsrc/data/profiles.json.

## النشر على Cloudflare Pages

اربط مستودع العميل، واختر `npm run build` للبناء و`dist` للمخرجات وجذر المستودع كجذر المشروع.
حدد Node 22.23.1 أو إصدارًا متوافقًا، واضبط SITE_URL على رابط HTTPS النهائي.
اختبر رابط المعاينة ثم أضف الدومين وDNS. البناء الثابت لا يحتاج Cloudflare adapter.
API ديناميكي لاحقًا يمكن أن يعمل على Workers منفصل؛ هذا لا يضمن مجانية قواعد البيانات والتحليلات مهما كان الاستخدام.

## قبل الإطلاق

- launchReady افتراضيًا false: ملاحظة مراجعة ومنع فهرسة عبر meta وrobots.txt. هذا ليس حماية بكلمة مرور.
- اعتمد النصوص والخدمات والجنسيات مع المكتب. لم تُنسخ وعود نخلة عن 24 ساعة أو 60 يومًا أو ضمان سنتين.
- ساعات الدوام غير مزودة فتُركت فارغة بدل اختلاقها.
- شعار المكتب قُص من PDF، وشعار الرؤية قُص من لقطة العميل للمعاينة. استبدلهما بملفات أصلية عالية الجودة واعتمد حقوق وإرشادات الاستخدام.
- راجع أي التزامات تنظيمية أو سياسة خصوصية؛ طلب العميل إخفاء بيانات الترخيص لا يثبت عدم وجوب عرضها.
- اعتمد واتساب 0599510111 والبريد والموقع الجغرافي مع العميل.
- اختبر القائمة والنموذج والهواتف على أجهزة فعلية، والعرض على 360 و390 و768 و1440 بكسل.
- لا تفعّل launchReady إلا بعد اعتماد المحتوى وإعداد الدومين. أضف sitemap قبل التوسع لصفحات مستقلة.

## خصوصية السير الذاتية

كل ملفات public/media عامة قابلة للوصول بعد النشر، حتى إن كان published=false؛ هذا الخيار يخفي الرابط فقط.
لا ترفع هويات أو جوازات أو بيانات حساسة. انشر نسخًا منقحة ومعتمدة وبموافقة أصحابها.
خصوصية مستودع GitHub لا تحمي ملفات الموقع العامة. حذف ملف لا يمحو تاريخ Git أو نسخ الزوار.
استخدم أسماء لاتينية بلا مسافات مثل CV-001.pdf، ولا تستخدم معلومات شخصية في اسم الملف.
منع فهرسة media إجراء لتقليل الظهور وليس حماية وصول.

## التحليلات لاحقًا

React لواجهة منفصلة، وAPI على Cloudflare Workers يتحقق من الهوية والصلاحيات قبل جلب التقارير.
حدد مصدر التحليلات مع المسوّق واستخدم UTM للحملات وأحداثًا منفصلة للاتصال والواتساب والطلبات.
Pixels وحدها لا تعرض تقارير الحملات أو تكلفتها؛ قراءة حسابات الإعلان تتطلب صلاحيات APIs.
الأسرار على الخادم فقط، وليست في GitHub أو كود المتصفح. لا تخزن الطلبات الشخصية في CMS.
حدّث سياسة الخصوصية والموافقات عند تفعيل التتبع. لن تسترجع زيارات قديمة لم يتم تتبعها.

## الهيكل

.pages.yml: لوحة المحتوى
src/pages/index.astro: الصفحة
src/pages/robots.txt.ts: الفهرسة
src/data/: المحتوى والأخبار والملفات
src/lib/: التحقق من البيانات والروابط
src/styles/global.css: التصميم المتجاوب
public/media/: ملفات عامة فقط
public/scripts/site.js: التفاعلات
scripts/verify-source.mjs: فحوص المصدر دون اعتماديات

التوثيق: https://docs.astro.build/ و https://pagescms.org/docs/ و https://developers.cloudflare.com/pages/

## تحديث v3: صورة المكتب والأعلام

أضيفت صورة واجهة المكتب الأصلية 440×240 أعلى التعريف بدون قص أو كتابة تغطيها. جودة المصدر محدودة؛ يفضل تزويد نسخة أكبر قبل الإطلاق.
الأعلام الآن صور فعلية دائرية بدل رموز emoji التي ظهرت كأحرف PH وBD في بعض الأجهزة؛ تصميم الأزرار مستوحى من المرجع بالأزرق.
تمت إضافة حقول heroImage وheroAlt وheroCaption وcountries.flagImage إلى Pages CMS والتحقق من البيانات.
احتُفظ بالدول الخمس الحالية ولم تضاف خدمات أو دول لم يعتمدها المكتب.
الرقم في لوحة المبنى مختلف عن رقمي التواصل المسجلين؛ لم يتم تغيير روابط الاتصال أو واتساب. يرجى التحقق قبل النشر.

## v5: alternating whole-section slides

Supersedes v4 child fades. Every visible main section travels as ONE block from fully outside the viewport to x=0. Directions alternate left/right in DOM order, skipping hidden news. No rotation, scale, perspective, or opacity animation.

Production: gsap dependency, bundled from src/scripts/gsap-entry.js with ScrollTrigger. Start: top 88%; duration 0.8s; ease power2.inOut; once per page load. Triggers use stationary wrappers, not transformed sections. Initial visible sections reveal immediately.

Preview: preview.html is self-contained and uses IntersectionObserver + Web Animations with the same sampled cubic easing. It demonstrates the motion WITHOUT loading GSAP. Actual GSAP runs in the Astro project after npm install/build. Neither production build nor real-browser visual parity has been verified in this sandbox.

Only viewport horizontal overflow is clipped. Reduced motion, anchor navigation, focus, resize, and print restore readable sections. No child staggering. No new CMS fields or data collection.

## v6: slower cinematic slide + fade

Replaces the v5 0.8-second transform-only reveal with a 1.2-second whole-section slide AND opacity 0→1 using power2.inOut. Alternating directions and one-shot ScrollTrigger activation are unchanged. No blur, scale, or rotation.

The self-contained preview uses browser-native animation with the same duration and sampled easing; the Astro project bundles GSAP + ScrollTrigger.

Reduced motion, print, anchor navigation, resize interruption, and focus restore opacity to fully readable content. Cleanup removes all temporary opacity styles. Static and simulated lifecycle checks pass; full Astro build and browser visual comparison remain unverified in this environment.

## v7: stationary sections, moving content

Supersedes whole-section motion in v5/v6. Sections remain in normal document flow: backgrounds, padding, anchors and layout do NOT move or become fixed-position. A single runtime `.section-motion-content` wrapper groups each section's existing child nodes and receives the alternating slide plus fade. The stationary section itself remains the ScrollTrigger target.

Duration remains 1.2s, ease power2.inOut; opacity 0→1; no blur, rotation, scaling, or child staggering. Reduced-motion cleanup unwraps content without replacing the original nodes or their event listeners. Initial visible content reveals immediately.

Astro uses GSAP/ScrollTrigger; standalone preview uses the equivalent browser-native driver. Full build and real-browser animation checks remain outstanding.

## v8: floating blue contact buttons

Replaced the mobile bottom contact bar and original float controls with two circular blue controls, stacked at the bottom left. Phone uses the lighter brand blue; WhatsApp uses the primary blue. Hover expands a pill background, shifts the icon and fades/slides in its Arabic label. Press retains the 2px translation effect. Design adapted from the user-provided Uiverse.io component by Gaurang7717; credit retained in source.

Expansion uses transform/opacity layers rather than width transitions to avoid layout shifts. Keyboard focus gets the same expansion. Touch devices use immediate one-tap phone/WhatsApp links without requiring hover. Reduced-motion preference disables transitions, not access to the actions.

Existing content-reveal controller and GSAP entry are byte-for-byte unchanged. Preview continues to use browser-native equivalent section motion, while the Astro source uses GSAP/ScrollTrigger. Full browser hover/rendering and production build remain unverified in this environment.

## v9: original hover behavior restored

Replaces v8 transform-based expansion with the user's supplied width/radius animation: 45px circle to 150px pill, 0.3s default CSS ease, icon width 100% to 30%, label width 0% to 70%, original padding and press translation. WhatsApp green restored; phone remains brand blue. Keyboard focus uses the same expansion. Reduced-motion preference still disables transitions. Section reveal scripts are unchanged. Browser rendering and Astro build remain unverified.

## v10: desktop density and reveal visibility

Desktop-only CSS starts at 1024px. Content grows to 1480px, or up to 1720px on ultrawide screens. About text and identity sit side by side; services use four columns and countries use five. Section padding is reduced and typography scales up on ultrawide screens. Mobile CSS and contact hover rules are unchanged.

Desktop reveal content travels only 80px with the same 1.2s fade/easing. Content visible at initialization appears immediately. Offscreen sections trigger at the viewport bottom, and rapid scrolling immediately reveals content that has crossed the top 28% of the viewport. This prevents large blank regions from offscreen animation on desktop. Mobile retains the original full-distance alternating slide and 88% trigger.

Tests are static and simulated DOM tests; browser rendering and Astro compilation still require external dependency installation.

## v11: flying-text scroll reveal

Replaces content-group slides with the reverse-reveal concept from the supplied flying-text demo. Uses measured word positions, seeded scatter, 3D rotation/depth, endpoint-pinned gusts, a right-to-left stagger and scroll-scrubbed progress. Scroll upward reverses the effect. Headings and selected introductory paragraphs animate; images, flags, forms, contact links and section backgrounds remain stationary.

Arabic words are measured with Range rather than splitting characters, preserving joined letterforms. Existing coloured spans and line breaks are retained in the original placeholder. On completion the original text becomes visible for exact natural shaping; screen readers get one accessible full-text copy. Fonts are awaited and width changes trigger remeasurement. Reduced-motion and print restore readable text.

The site's Cairo font, mobile layout, desktop spacing and Uiverse contact button hover animation are preserved. No demo 100vh panels or English fonts were added. GSAP ScrollTrigger in Astro uses top 92%→35% with scrub 0.65. Standalone preview uses native scroll smoothing, not the actual GSAP bundle.

This is an Arabic-aware adaptation, not a literal character-by-character copy. Real-browser typography and scroll rendering plus full Astro build remain unverified; test on actual phones and desktop before publishing.

## v12: calm opening and slower flying text

The entire hero, About and introductory steps are excluded from flying text, on both desktop and mobile. Original text remains fully visible without generated word overlays. The new effect begins in later sections.

The remaining scroll window extends from top 92% to top 15% (previously 35%), with GSAP scrub 1.1 (previously 0.65). Word flights occupy more of the normalized progress window: duration .78 and stagger spread .20. This is scroll-controlled motion, not a fixed-time entrance. Native preview smoothing changed correspondingly.

Layout, contact buttons, photo, flags and CMS configuration are unchanged. Browser visual verification and Astro build remain outstanding.

## v13: About-only exclusion

Only #about (من نحن) remains explicitly excluded from flying-text reveals. Introductory steps headings animate again. Hero image stays unchanged because the effect targets text, not images. Slower v12 timing is retained.
