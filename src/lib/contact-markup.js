/** Shared, escaped contact markup for Astro and the local studio. */
export function renderContact(site,copy,embedUrl){
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const paths={user:'M20 21v-2a7 7 0 0 0-14 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',phone:'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z',mail:'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm-2 2 10 7L22 6',chat:'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z',message:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2ZM7 7h10M7 11h7',pin:'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6',map:'m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3ZM9 3v15M15 6v15',arrow:'M19 12H5m6 6-6-6 6-6',clock:'M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',shield:'M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z',send:'m22 2-7 20-4-9-9-4ZM22 2 11 13'};
 const icon=k=>`<svg class="contact-icon icon-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[k]}"/></svg>`;
 const field=(id,label,type,placeholder,max,required=true,autocomplete='')=>`<div class="field"><label for="${id}">${esc(label)}${required?'<span class="required-mark" aria-hidden="true">*</span>':''}</label><div class="contact-input-wrap">${icon({name:'user',phone:'phone',email:'mail',subject:'chat',message:'message'}[id])}${type==='textarea'?`<textarea id="${id}" name="${id}" maxlength="${max}" placeholder="${esc(placeholder)}" required></textarea>`:`<input id="${id}" name="${id}" type="${type}" maxlength="${max}" placeholder="${esc(placeholder)}" ${required?'required':''} ${autocomplete?`autocomplete="${autocomplete}"`:''} ${id==='phone'?'inputmode="tel"':id==='email'?'inputmode="email"':''}>`}</div></div>`;
 const tel=p=>'tel:'+String(p).replace(/[^+\d]/g,'');
 const mapLink=/^https:\/\//.test(site.mapUrl)?site.mapUrl:'#';
 return `<section class="section contact-section contact-editorial" id="contact" data-section="contact"><div class="container contact-layout">
 <div class="contact-details" data-contact-reveal><header class="customer-heading"><p class="eyebrow">${esc(copy.text006)}</p><h2>${esc(copy.text022)}</h2></header>
 <div class="contact-phones">${site.phones.map(p=>`<a class="phone-link" href="${esc(tel(p.international))}">${icon('phone')}<span dir="ltr">${esc(p.display)}</span></a>`).join('')}</div>
 ${site.workingHours?`<p class="working-hours">${icon('clock')}<span>${esc(site.workingHours)}</span></p>`:''}
 <div class="contact-email"><p class="contact-label">${esc(copy.text023)}</p><a class="email" dir="ltr" href="mailto:${esc(site.email)}">${esc(site.email)}</a></div>
 <div class="map-panel"><div class="location-heading"><span class="location-icon">${icon('pin')}</span><div><strong>${esc(site.name)}</strong><p>${esc(site.address)}</p></div></div>
 <a class="btn map-action" data-map-link href="${esc(mapLink)}" rel="noopener noreferrer" target="_blank">${icon('map')}<span>${esc(copy.text024)}</span>${icon('arrow')}</a>
 <div class="office-map-frame"><iframe data-office-map src="${esc(embedUrl)}" title="${esc('خريطة موقع '+site.name)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
 <small class="map-network-note">${icon('pin')}<span>الخريطة من Google وتحتاج اتصالًا بالإنترنت. إذا لم تظهر، استخدم زر فتح الموقع.</span></small></div>
 <p class="contact-policy">${icon('shield')}<span>${esc(copy.text025)}</span></p></div>
 <form class="contact-form" id="contact-form" data-contact-reveal><header class="form-heading"><h2>${esc(copy.text006)}</h2><p>${esc(copy.text021)}</p></header>
 ${field('name',copy.text026,'text',copy.text048,80,true,'name')}
 ${field('phone',copy.text027,'tel',copy.phonePlaceholder,20,true,'tel')}
 ${field('email',copy.text023,'email','',254,false,'email')}
 ${field('subject',copy.text028,'text',copy.text049,120)}
 ${field('message',copy.text029,'textarea',copy.text050,1500)}
 <button class="btn primary contact-submit" type="submit">${icon('send')}<span>${esc(copy.text031)}</span></button>
 <p class="form-note">${icon('shield')}<span>${esc(copy.text030)}</span></p>
 <p aria-live="polite" class="form-status" id="form-status" role="status"></p>
 <a class="form-result" hidden id="form-result" rel="noopener noreferrer" target="_blank">${esc(copy.text032)}</a>
 <details class="privacy"><summary>${esc(copy.text033)}</summary><p>${esc(site.privacyNote)}</p></details></form>
 </div></section>`;
}
function enhanceContact(d,bundle){const previous=d.querySelector('#contact');if(!previous)return;const t=d.createElement('template');t.innerHTML=renderContact(bundle.site,bundle.copy,mapEmbedUrl(bundle.site.mapUrl,bundle.site.name+' '+bundle.site.address));previous.replaceWith(t.content.firstElementChild)}
