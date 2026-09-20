/** Contact-only progressive reveal. Content remains visible without JavaScript. */
export function installContactMotion(){
 const section=document.querySelector('#contact.contact-editorial');if(!section)return;
 let config={};try{config=JSON.parse(document.getElementById('site-runtime')?.textContent||'{}').animations||{}}catch{}
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');if(reduce.matches||config.enabled===false||!('IntersectionObserver'in window)||!Element.prototype.animate)return;
 const active=new Map();const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;observer.unobserve(e.target);const a=e.target.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,easing:'cubic-bezier(.16,1,.3,1)'});active.set(e.target,a);a.onfinish=()=>active.delete(e.target)}),{threshold:.06});
 Array.from(section.querySelectorAll('[data-contact-reveal]')).filter(el=>!el.matches('h1,h2,h3,.step-top b,.large-brand strong,.location-heading strong')&&!el.querySelector('h1,h2,h3,.step-top b,.large-brand strong,.location-heading strong')).forEach(n=>observer.observe(n));const finish=()=>{observer.disconnect();active.forEach(a=>a.cancel());active.clear()};section.addEventListener('focusin',finish);reduce.addEventListener?.('change',e=>{if(e.matches)finish()});window.addEventListener('beforeprint',finish);
}
