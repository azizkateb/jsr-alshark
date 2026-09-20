import spec from '../data/customization-spec.json' with { type: 'json' };
const sectionIds=['hero','about','steps','why','services','cvs','cta','news','contact'];
export function validateFields(value,fields,path='config'){
 if(!value||typeof value!=='object'||Array.isArray(value))throw Error(path+': object required');
 for(const field of fields){
  const v=value[field.name],at=path+'.'+field.name;
  if(v===undefined)throw Error(at+': missing value');
  function check(item){
   if(field.type==='object')return validateFields(item,field.fields,at);
   if(field.type==='boolean'){if(typeof item!=='boolean')throw Error(at+': boolean required');return}
   if(field.type==='number'){
    if(typeof item!=='number'||!Number.isFinite(item)||item<field.options.min||item>field.options.max)throw Error(at+': number out of bounds');return;
   }
   if(typeof item!=='string')throw Error(at+': text required');
   if(field.required&&!item.trim())throw Error(at+': required');
   if(item.length>12000)throw Error(at+': too long');
   if(field.pattern&&!new RegExp(field.pattern).test(item))throw Error(at+': invalid format');
   if(field.type==='select'&&!field.options.values.map(v=>typeof v==='string'?v:v.name).includes(item))throw Error(at+': invalid option');
  }
  if(field.list){
   if(!Array.isArray(v)||v.length>100)throw Error(at+': invalid list');
   if(typeof field.list==='object'&&((field.list.min&&v.length<field.list.min)||(field.list.max&&v.length>field.list.max)))throw Error(at+': wrong list length');
   v.forEach(check);
  }else check(v);
 }
}
export function validateConfig(config){
 for(const key of ['theme','layout','copy','animations'])validateFields(config[key],spec[key],key);
 const ids=config.layout.sections.map(s=>s.id);
 if(ids.length!==9||new Set(ids).size!==9||!sectionIds.every(id=>ids.includes(id)))throw Error('Keep every section once; use visibility to hide a section.');
 for(const k of ['servicesColumns','countriesColumns'])if(!Number.isInteger(config.theme[k]))throw Error(k+': whole number required');
 return config;
}
export function hexToOklch(hex){
 const lin=x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4};
 const [r,g,b]=[1,3,5].map(i=>lin(parseInt(hex.slice(i,i+2),16)));
 const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
 const L=.2104542553*l+.793617785*m-.0040720468*s,a=1.9779984951*l-2.428592205*m+.4505937099*s,bb=.0259040371*l+.7827717662*m-.808675766*s;
 return `oklch(${(L*100).toFixed(4)}% ${Math.hypot(a,bb).toFixed(5)} ${((Math.atan2(bb,a)*180/Math.PI+360)%360).toFixed(3)})`;
}
export function contrast(a,b){
 const lum=h=>{const v=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722};
 const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
export function fontUrl(font){return font==='system'?'':'https://fonts.googleapis.com/css2?family='+encodeURIComponent(font)+':wght@400;500;600;700;800&display=swap'}
export function makeThemeCss(t,l){
 const map={primary:'primary',accent:'bright',deep:'deep',background:'paper',surface:'surface',soft:'pale',text:'ink',muted:'muted',border:'border',onPrimary:'on-primary',onAccent:'on-accent',whatsapp:'whatsapp',onWhatsapp:'on-whatsapp'};
 const vars=Object.entries(map).map(([k,v])=>'--'+v+':'+hexToOklch(t.colors[k])).join(';');
 const font=t.font==='system'?'Tahoma,Arial,sans-serif':`'${t.font}',Tahoma,Arial,sans-serif`;
 let css=`:root{${vars}}#jasr-site{${vars};font-family:${font};font-size:${t.bodyMobile}px}#jasr-site button,#jasr-site input,#jasr-site textarea{font-family:inherit}
#jasr-site .container{width:calc(100% - ${t.gutterMobile*2}px)}
#jasr-site .header .brand img{width:${t.logoWidthMobile}px}
#jasr-site .office-hero figure{max-width:${t.heroWidth}px}
#jasr-site .office-hero img{border-radius:${t.imageRadius}px}
#jasr-site .btn{border-radius:${t.buttonRadius}px}
#jasr-site .country{border-radius:${t.countryRadius}px}
#jasr-site .top-btn{background:var(--bright);color:var(--on-accent)}
#jasr-site .btn.primary,#jasr-site .country,#jasr-site .ribbon,#jasr-site .footer,#jasr-site .callout{color:var(--on-primary)}
#jasr-site .callout .btn{border-color:var(--on-primary);color:var(--on-primary)}
#jasr-site .callout .btn.primary{background:var(--on-primary);color:var(--primary)}
#jasr-site .contact-float.call{background:var(--primary);color:var(--on-primary)}
#jasr-site .contact-float.whatsapp{background:var(--whatsapp);color:var(--on-whatsapp)}
#jasr-site .contact-float .sign svg path{fill:currentColor}
#jasr-site .contact-float .text{color:inherit}
#jasr-site .contact-float,#jasr-site .contact-float .sign,#jasr-site .contact-float .text,#jasr-site .contact-float:hover,#jasr-site .contact-float:hover .sign,#jasr-site .contact-float:hover .text{transition-duration:${t.hoverDuration}s}
#jasr-site .contact-dock{left:${t.contactPosition==='left'?'max(14px,env(safe-area-inset-left))':'auto'};right:${t.contactPosition==='right'?'max(14px,env(safe-area-inset-right))':'auto'}}
#jasr-site .top-btn{right:${t.contactPosition==='left'?'16px':'auto'};left:${t.contactPosition==='right'?'16px':'auto'}}
#jasr-site .contact-dock a:focus-visible .sign,#jasr-site .contact-dock a:focus-visible .text{transition-duration:${t.hoverDuration}s}
#jasr-site h1{font-size:calc(30px * ${t.headingScale})!important}#jasr-site h2{font-size:calc(25px * ${t.headingScale})!important}#jasr-site h3{font-size:calc(22px * ${t.headingScale})!important}
@media(min-width:1024px){#jasr-site{font-size:${t.bodyDesktop}px}#jasr-site .container,#jasr-site .header-inner{width:min(${t.widthDesktop}px,calc(100% - ${t.gutterDesktop*2}px))}#jasr-site .header .brand img{width:${t.logoWidthDesktop}px}
#jasr-site .intro>.section-motion-content>#about-text,#jasr-site .section-heading p{font-size:${t.bodyDesktop}px}
#jasr-site .services{grid-template-columns:repeat(${t.servicesColumns},minmax(0,1fr))}#jasr-site .countries{grid-template-columns:repeat(${t.countriesColumns},minmax(0,1fr))}
#jasr-site h1,#jasr-site .intro>.section-motion-content>h1{font-size:calc(40px * ${t.headingScale})!important}#jasr-site h2,#jasr-site .section-heading h2,#jasr-site .why h2,#jasr-site .callout h2{font-size:calc(34px * ${t.headingScale})!important}}
@media(min-width:1800px){#jasr-site .container,#jasr-site .header-inner{width:min(${t.widthWide}px,calc(100% - ${t.gutterDesktop*2}px))}}
`;
 const bgvar={background:'paper',surface:'surface',soft:'pale',primary:'primary',deep:'deep'};
 for(const s of l.sections){
  const sel=`#jasr-site [data-section="${s.id}"]`;
  css+=`${sel}{padding-block:${s.paddingMobile}px!important;background:var(--${bgvar[s.background]})} @media(min-width:1024px){${sel}{padding-block:${s.paddingDesktop}px!important}}`;
  if(['primary','deep'].includes(s.background))css+=`${sel},${sel} p,${sel} h1,${sel} h2,${sel} h3,${sel} .eyebrow,${sel} .contact-label{color:var(--on-primary)}`;
 }
 const toggles={showHeader:'.header',showRibbon:'.ribbon',showDate:'#today',showFooter:'.footer',showPhoneButton:'.contact-float.call',showWhatsappButton:'.contact-float.whatsapp',showContactForm:'.contact-form',showMap:'.map-panel',showAboutLogo:'.large-brand'};
 for(const [key,sel]of Object.entries(toggles))if(!l[key])css+=`#jasr-site ${sel}{display:none!important}`;
 if(l.showTicker)css+='#jasr-site .ticker{display:block}';
 if(!l.showContactForm)css+='#jasr-site .contact-layout{grid-template-columns:minmax(0,1fr)}';
 return css.replaceAll('#jasr-site','#jasr-site#jasr-site');
}
