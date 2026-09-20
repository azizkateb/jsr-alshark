/** Embed a Google Maps query without accepting arbitrary iframe origins. */
export function mapEmbedUrl(raw, fallback) {
 let query=String(fallback||'').trim(), ftid='', cid='';
 try {
  const url=new URL(raw);
  if(url.protocol==='https:' && ['google.com','www.google.com','maps.google.com'].includes(url.hostname)){
   query=url.searchParams.get('q')||url.searchParams.get('query')||query;
   const id=url.searchParams.get('ftid')||'';
   if(/^0x[0-9a-f]+:0x[0-9a-f]+$/i.test(id))ftid=id;
   const place=url.searchParams.get('cid')||'';
   if(/^\d+$/.test(place))cid=place;
  }
 }catch{}
 const embed=new URL('https://www.google.com/maps');
 embed.searchParams.set('q',query);if(ftid)embed.searchParams.set('ftid',ftid);if(cid)embed.searchParams.set('cid',cid);
 embed.searchParams.set('output','embed');embed.searchParams.set('hl','ar');embed.searchParams.set('z','16');return embed.href;
}
