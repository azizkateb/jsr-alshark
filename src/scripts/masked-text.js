/** Masked word reveal, adapted from the user-supplied Osmo example.
 * Section layout stays unchanged. Words remain joined in Arabic.
 */
export const MASKED_SELECTOR=[
 'main section h1','main section h2','main section h3',
 'main section .step-top b','main section .large-brand strong','main section .location-heading strong'
].join(',');
export function maskedSettings(raw={}){
 const bounded=(v,min,max,fallback)=>typeof v==='number'&&Number.isFinite(v)?Math.min(max,Math.max(min,v)):fallback;
 return {enabled:raw.enabled!==false,duration:bounded(raw.duration,.2,2,.9),stagger:bounded(raw.stagger,0,.2,.08),start:bounded(raw.start,60,100,90)};
}
export function installMaskedText(driver){
 const root=document.getElementById('jasr-site');if(!root)return ()=>{};
 // Keep approved desktop About layout, even with motion disabled.
 root.querySelectorAll('main > section').forEach(section=>{
  if(section.querySelector(':scope > .section-motion-content'))return;
  const group=document.createElement('div');group.className='section-motion-content';
  while(section.firstChild)group.appendChild(section.firstChild);section.appendChild(group);
 });
 let raw={};try{raw=JSON.parse(document.getElementById('site-runtime')?.textContent||'{}').animations||{}}catch{}
 const config=maskedSettings(raw),reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(!config.enabled||reduced.matches)return ()=>{};
 let disposed=false;const records=[];
 function finishTarget(target){records.forEach(r=>{if(target===r.el||target.contains?.(r.el)||r.el.contains?.(target))r.api.finish()})}
 function onClick(e){const a=e.target.closest?.('a[href^="#"]');if(!a)return;try{const t=document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));if(t)finishTarget(t)}catch{}}
 function onFocus(e){finishTarget(e.target)}
 function onHash(){try{const t=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(t)finishTarget(t)}catch{}}
 function onPrint(){records.forEach(r=>r.api.finish())}
 function dispose(){
  if(disposed)return;disposed=true;records.forEach(r=>r.api.destroy());records.length=0;driver.destroy?.();
  root.removeEventListener('click',onClick);root.removeEventListener('focusin',onFocus);
  window.removeEventListener('hashchange',onHash);window.removeEventListener('beforeprint',onPrint);
  reduced.removeEventListener?.('change',onPreference);
 }
 function onPreference(e){if(e.matches)dispose()}
 reduced.addEventListener?.('change',onPreference);
 (document.fonts?.ready||Promise.resolve()).then(()=>{
  if(disposed)return;
  const candidates=Array.from(root.querySelectorAll(MASKED_SELECTOR));
  for(const el of candidates){
   // Headings and prominent titles only; small body text, captions and labels stay static. No section exclusions. Keep interactive controls and live status messages intact.
   if(el.closest('[hidden]')||!el.getClientRects().length||!el.textContent.trim())continue;
   if(el.matches('[role="status"],[aria-live]')||el.querySelector('a,button,input,textarea,select'))continue;
   if(candidates.some(other=>other!==el&&other.contains(el)))continue;
   const original=el.innerHTML;
   try{const api=driver.mount(el,config);records.push({el,api})}
   catch(error){el.innerHTML=original;el.classList.remove('masked-reveal-text');console.warn('Text reveal skipped; text restored.',error)}
  }
  root.addEventListener('click',onClick);root.addEventListener('focusin',onFocus);
  window.addEventListener('hashchange',onHash);window.addEventListener('beforeprint',onPrint);
  driver.refresh?.();if(location.hash)onHash();
 });
 return dispose;
}
