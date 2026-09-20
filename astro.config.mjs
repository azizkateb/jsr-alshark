import { defineConfig } from 'astro/config';
const site = process.env.SITE_URL?.trim();
if(site && !site.startsWith('https://')) throw new Error('SITE_URL must be an HTTPS origin');
export default defineConfig({output:'static',...(site ? {site} : {})});
