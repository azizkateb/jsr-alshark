# Latest update: v25

Consistent masked word reveals on all titles, including the redesigned sections. Content/layout/contact information unchanged. See `docs/TITLE-REVEALS-V25.md`. Prior release notes are historical.

# Latest update: v24

Reference-inspired contact section, direct WhatsApp handoff and reordered three-photo hero. Phone numbers and all other contact information are unchanged. See `docs/CONTACT-V24.md`. Older release notes below are historical.

# Latest update: v23

Pause button removed; slider and filling indicators unchanged. See `docs/NO-PAUSE-V23.md`. Earlier release notes are historical.

# Latest update: v22

Centered four-photo hero slider, 4-second progress indicators and CMS image management. See `docs/HERO-SLIDER-V22.md`. Prior notes below are historical.

# Latest update: v21

Visual-only redesign of nationalities/CVs and CTA; all prior sections and behavior preserved. See `docs/CV-DESIGN-V21.md`. Prior notes below are historical.

# Latest update: v20

Editorial process timeline, Why Us and services. Website plus local Tajawal dashboard. See `docs/EDITORIAL-V20.md`. Prior notes below are historical.

# Latest update: v19

One reference-proportioned hero; duplicate centered image disabled. See `docs/HERO-V19.md`. Full source includes the website and Tajawal studio. Prior version notes below are historical.

# Latest update: v18

Reference-inspired About section only; v17 Tajawal dashboard retained with updated preview. See `docs/ABOUT-V18.md`. Older notes below are historical.

# Latest update: v17

Embedded office map and redesigned Tajawal local studio. Open `tools/site-customizer.html`. See `docs/STUDIO-V17.md`. Previous notes below are historical.

# Latest update: v16

Slower masked headings; small text stays static. See `docs/MASKED-REVEAL-V16.md` for current behavior and upgrade instructions. Older version notes below are historical.

# جسر الشرق: موقع قابل للتخصيص مع Pages CMS (v14)

## ما تم تنفيذه في المصدر

- الألوان: الرئيسي والمساند والداكن والخلفيات والنصوص والحدود ونص الأزرار وواتساب. اختيار HEX في اللوحة، وتحويله إلى OKLCH في CSS.
- الخطوط: Cairo أو Tajawal أو Noto Sans Arabic أو خطوط النظام. مقاسات الجوال والكمبيوتر ومقياس العناوين.
- الهوية: الاسم والشعار وشعار الرؤية وصورة المكتب ونصوصها، مع ضبط أحجام الشعار والصورة.
- التخطيط: تغيير ترتيب الأقسام التسعة وإخفائها، خلفية ومسافات كل قسم، قوائم التنقل، الأعمدة على الكمبيوتر، الهوامش والعرض واستدارة الأزرار والصور.
- المحتوى: الخدمات والخطوات والجنسيات والأعلام والأخبار وملفات PDF وأرقام التواصل والعناوين ورسائل النموذج والنصوص المساعدة.
- الحركة: تفعيل/تعطيل، استثناء من نحن، استثناء الفقرات، نطاق التمرير والنعومة والمسافة والتشتت والدوران والعمق.
- الأزرار العائمة: اللون والموضع والنص ومدة hover مع احترام تقليل الحركة.

هذه إعدادات مكونات الموقع الحالي وليست محرر سحب وإفلات حر. إنشاء أنواع أقسام جديدة أو تغيير بنية تصميم غير مهيأة يحتاج تعديلًا برمجيًا. إخفاء قسم لا يلغي وجود محتواه في ملفات المشروع.

## الملفات المهمة

- `.pages.yml`: إعداد Pages CMS الجاهز للربط، بسبعة أقسام تحرير.
- `src/data/site.json`: هوية الموقع ومحتواه.
- `src/data/theme.json`: الألوان والخطوط والمقاسات.
- `src/data/layout.json`: ترتيب الأقسام والإظهار والقوائم.
- `src/data/copy.json`: عناوين الواجهة والأزرار ورسائل النموذج.
- `src/data/animations.json`: حركة النصوص.
- `src/data/news.json` و`profiles.json`: الأخبار والسير الذاتية.
- `src/data/customization-spec.json`: مخطط تحقق إعدادات، ليس محتوى العميل.
- `src/components/SiteSection.astro`: العرض الحقيقي للأقسام بالترتيب المختار.
- `src/lib/customization.js`: التحقق والتحويل إلى CSS آمن.
- `tools/site-customizer.html`: محرر محلي قابل للفتح مباشرة، غير منشور ضمن public.
- `/admin`: صفحة إرشاد إلى Pages CMS وليست لوحة مصادقة أو محررًا عامًا.

## استوديو التخصيص المحلي

افتح `tools/site-customizer.html` في المتصفح. يمكن تعديل الحقول والقوائم، رفع صور/PDF محليًا، معاينة النتيجة على الجوال والكمبيوتر، حفظ نسخة على الجهاز، واستيراد/تصدير الإعدادات.
الملفات الجديدة حدها 5MB لكل ملف. حفظ الجهاز قد يفشل إذا تجاوزت مساحة التخزين؛ استخدم التصدير للاحتفاظ بنسخة.
زر التصدير ينتج ZIP يحوي ملفات `src/data` والوسائط الجديدة، و`site-settings-backup.json` لإعادة الاستيراد. هذا ZIP تحديث إعدادات وليس مشروعًا كاملًا.
انسخ ملفاته فوق مشروع v14 ثم شغّل التحقق والبناء. لا ينشر المحرر شيئًا ولا يتصل بـGitHub ولا يطلب كلمات مرور أو tokens.
المعاينة تستخدم حركة متصفح مشابهة؛ المصدر المنشور يستخدم GSAP ScrollTrigger.

## التشغيل والتحقق

Node.js 22.12 أو أحدث مطلوب.

```sh
npm install
npm run verify:source
npm run check
npm run build
npm run dev
```

بعد تثبيت ناجح احفظ `package-lock.json` في Git. النشر: Cloudflare Pages، build=`npm run build`، output=`dist`، واضبط SITE_URL على الدومين النهائي.
تم فحص صياغة JS والبيانات وربط الحقول والتحقق والتصدير محليًا. لم يتم تشغيل بناء Astro أو اختبار تفاعلات المحرر في متصفح فعلي: بيئة الإعداد لا تملك إنترنت لتثبيت الاعتماديات.

## ربط Pages CMS الفعلي

1. ارفع المشروع إلى مستودع GitHub خاص يملكه العميل، وتأكد من البناء أولًا.
2. افتح https://app.pagescms.org وسجّل الدخول بطريقة الخدمة المتاحة.
3. ثبّت GitHub App على المستودع المحدد فقط. لا تشارك كلمة المرور أو tokens.
4. اختر المستودع والفرع؛ ستقرأ اللوحة `.pages.yml` وتعرض الهوية والتصميم والأقسام والنصوص والحركة والأخبار والملفات.
5. اختبر تغيير لون ونص ورفع صورة وحفظها، ثم تحقق من commit ومن نتيجة بناء Cloudflare.
6. للأمان في العمل، ابدأ بفرع معاينة وربط نشر معاينة. اعتمد التغييرات قبل دمجها إلى فرع الإنتاج؛ قواعد الحماية الصارمة قد تمنع حفظ CMS المباشر.
7. أعط الوصول فقط للمحررين المطلوبين. اللوحة المحلية ليست بديلًا للمصادقة.

لم يتم إنشاء مستودع، أو تركيب التطبيق، أو نشر موقع، أو تفعيل حساب العميل من هذه المحادثة.

## حدود وتحذيرات

- اختيار أي لون قد يجعل النص غير مقروء: المحرر ينبه لبعض أزواج التباين، وليس تدقيق وصول شاملًا لكل الحالات.
- تعطيل قسم يخفي روابط التنقل إليه؛ بعض أزرار CTA الثابتة الوجهة تُخفى إذا غاب هدفها. وجهات هذه الأزرار هي تدفق الموقع الحالي، وليست URL حرة.
- الموقع عربي RTL؛ اختيار خط لا يغيّر اللغة أو اتجاه النص. الهاتف والأرقام معزولة LTR.
- ملفات public/media عامة عند النشر. إخفاء سيرة ذاتية من القائمة لا يحمي رابطها. لا ترفع جوازات أو هويات أو بيانات حساسة.
- رفع ملفات الصور مقصور على JPG/PNG/WebP وملفات السير على PDF. حذف ملف من المحتوى لا يمحو تاريخ Git أو نسخ الزوار.
- launchReady=false يمنع الفهرسة ويظهر تنبيه المراجعة، لكنه ليس حماية وصول. لا تفعّله قبل اعتماد العميل.
- بيانات الترخيص وحقوق شعار الرؤية وصحة نصوص الخدمات وأرقام الصورة تحتاج اعتمادًا من المكتب.
- النموذج يجهز رسالة واتساب، ولا يخزن طلبات ولا يرسل بريدًا. لا يزال ربط الكول سنتر والتحليلات غير منفذ.
- سجل النسخ السابقة في docs/PREVIOUS-VERSIONS.md؛ هذا الملف يصف السلوك الحالي.

## v15 animation update

The flying/scatter effect has been replaced with masked word reveals from the supplied Osmo example, using GSAP SplitText, CustomEase and ScrollTrigger. All main sections participate, including About. Default duration .6s, word stagger .06s, custom ease 0.625, 0.05, 0, 1. See docs/MASKED-REVEAL-V15.md for migration and verification details.
The local editor and Pages CMS animation controls are updated. v14 settings backups can be imported into the v15 local editor; content/media are preserved and old animation settings are migrated.
