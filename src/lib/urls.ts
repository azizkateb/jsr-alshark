export function assetUrl(value: string): string {
 return /^\/media\/[A-Za-z0-9_\-./%]+$/.test(value) && !value.includes('..') ? value : '';
}
export function webUrl(value: string): string {
 try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; }
}
export function telLink(value: string): string { return 'tel:' + value.replace(/[^+0-9]/g, ''); }
