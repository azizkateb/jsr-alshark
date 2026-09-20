import { z } from 'zod';
const text = z.string().trim().min(1);
const asset = z.string().regex(/^\/media\/[A-Za-z0-9_\-./%]+$/).refine(v => !v.includes('..'), 'Invalid media path');
export const SiteSchema = z.object({
 launchReady:z.boolean(),name:text,shortName:text,brandSubtitle:text,englishName:text,
 heroSlides:z.array(z.object({image:asset,alt:text})).default([]),
 heroImage:asset,heroAlt:text,heroCaption:z.string().default(''),logo:asset,visionLogo:asset,showVision:z.boolean(),description:text,
 phones:z.array(z.object({display:text,international:z.string().regex(/^\+[1-9]\d{7,14}$/)})).min(1),
 whatsapp:z.string().regex(/^[1-9]\d{7,14}$/),email:z.string().email(),
 address:text,mapUrl:z.string().url().refine(v=>v.startsWith('https://')),workingHours:z.string().default(''),
 banner:text,welcome:text,aboutTitle:text,about:text,stepsTitle:text,stepsIntro:text,
 steps:z.array(z.object({title:text,description:text})).min(1),whyTitle:text,whyIntro:text,
 benefits:z.array(z.object({text})),services:z.array(z.object({title:text,description:text,icon:z.enum(['home','car','file','support'])})),
 countries:z.array(z.object({name:text,flagImage:asset})),ctaTitle:text,ctaText:text,privacyNote:text
});
export const ProfileSchema=z.object({
 reference:text,title:text,country:text,description:z.string().default(''),
 file:asset.refine(v=>/\.pdf$/i.test(v),'CV files must be PDFs'),published:z.boolean().default(false)
});
export const NewsSchema=z.object({
 title:text,date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>{const d=new Date(v+'T12:00:00Z');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===v;}),
 image:z.union([asset,z.literal('')]).default(''),body:text,published:z.boolean().default(false)
});
