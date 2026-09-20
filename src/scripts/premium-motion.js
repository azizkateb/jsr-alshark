/** Once-on-entry, whole-element motion scoped to the three editorial sections. */
export function installPremiumMotion(){
 const sections=Array.from(document.querySelectorAll('#jasr-site .premium-section'));if(!sections.length)return;
 let config={};try{config=JSON.parse(document.getElementById('site-runtime')?.textContent||'{}').animations||{}}catch{}
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');if(config.enabled===false||reduce.matches||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
 const nodes=sections.flatMap(s=>Array.from(s.querySelectorAll('[data-premium-reveal]'))).filter(el=>!el.matches('h1,h2,h3,.step-top b,.large-brand strong,.location-heading strong')&&!el.querySelector('h1,h2,h3,.step-top b,.large-brand strong,.location-heading strong')),seen=new Set(),running=new Map();
 const finish=(scope)=>nodes.forEach(el=>{if(scope&&scope!==el&&!scope.contains(el))return;seen.add(el);observer.unobserve(el);const a=running.get(el);if(a){a.cancel();running.delete(el)}});
 const observer=new IntersectionObserver(entries=>entries.forEach(({target:el,isIntersecting})=>{if(!isIntersecting||seen.has(el))return;seen.add(el);observer.unobserve(el);const delay=Math.min(300,Math.max(0,Number(el.dataset.premiumDelay)||0));const a=el.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:720,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});running.set(el,a);a.onfinish=()=>{a.cancel();running.delete(el)}}),{threshold:.08,rootMargin:'0px 0px -4% 0px'});
 nodes.forEach(el=>observer.observe(el));
 const hash=()=>{try{const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target?.matches('.premium-section'))finish(target)}catch{}};
 document.addEventListener('click',e=>{const a=e.target.closest?.('a[href^="#"]');if(!a)return;try{const target=document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));if(target?.matches('.premium-section'))finish(target)}catch{}});
 sections.forEach(s=>s.addEventListener('focusin',()=>finish(s)));window.addEventListener('hashchange',hash);window.addEventListener('beforeprint',()=>finish());reduce.addEventListener?.('change',e=>{if(e.matches){observer.disconnect();finish()}});hash();
}
