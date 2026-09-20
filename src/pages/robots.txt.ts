import type { APIRoute } from 'astro';
import site from '../data/site.json';
export const GET: APIRoute = () => new Response(site.launchReady ? 'User-agent: *\nAllow: /\nDisallow: /media/\n' : 'User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});
