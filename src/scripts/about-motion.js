/** About-only whole-element reveal. Other sections keep their masked words. */
export function installAboutMotion(){
 const section=document.querySelector('#jasr-site #about.about-editorial');if(!section)return;
 let settings={};try{settings=JSON.parse(document.getElementById('site-runtime')?.textContent||'{}').animations||{}}catch{}
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(settings.enabled===false||reduce.matches||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
 const targets=Array.from(section.querySelectorAll('[data-about-reveal]')).filter(el=>!el.matches('h1,h2,h3,.step-top b,.large-brand strong,.location-heading strong')&&!el.querySelector('h1,h2,h3,.step-top b,.large-brand strong,.location-heading strong')),played=new Set(),running=new Map();
 const finishAll=()=>{observer.disconnect();targets.forEach(el=>{played.add(el);const a=running.get(el);if(a){a.finish();a.cancel();running.delete(el)}})};
 const enter=el=>{if(played.has(el))return;played.add(el);const isCard=el.dataset.aboutReveal==='card';const animation=el.animate([{opacity:0,transform:isCard?'translateY(10px)':'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:isCard?650:850,delay:isCard?120:0,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});running.set(el,animation);animation.onfinish=()=>{animation.cancel();running.delete(el)}};
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){enter(e.target);observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -5% 0px'});
 targets.forEach(el=>observer.observe(el));
 section.addEventListener('focusin',finishAll);window.addEventListener('beforeprint',finishAll);
 document.addEventListener('click',e=>{const a=e.target.closest?.('a[href="#about"]');if(a)finishAll()});
 window.addEventListener('hashchange',()=>{if(location.hash==='#about')finishAll()});
 reduce.addEventListener?.('change',e=>{if(e.matches)finishAll()});if(location.hash==='#about')finishAll();
}
