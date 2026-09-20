/** 4-second carousel, isolated to the About photo. No changes to contact links. */
export function installHeroSliders(){
 return Array.from(document.querySelectorAll('#jasr-site [data-hero-slider]')).map(root=>{
  if(root.dataset.sliderReady==='true')return;root.dataset.sliderReady='true';
  const slides=Array.from(root.querySelectorAll('[data-hero-slide]')),buttons=Array.from(root.querySelectorAll('[data-slide-to]')),fills=buttons.map(b=>b.querySelector('.hero-progress-fill'));
  const controls=root.querySelector('.hero-slider-controls'),status=root.querySelector('.hero-slider-status'),frame=root.querySelector('.about-photo-shell');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');let config={};try{config=JSON.parse(document.getElementById('site-runtime')?.textContent||'{}').animations||{}}catch{}
  let current=0,elapsed=0,raf=0,last=0,inView=true,hovered=false,focused=false,disposed=false;const failed=new Set(),interval=4000;
  const canAuto=()=>slides.length-failed.size>1&&!reduce.matches&&config.enabled!==false;
  const running=()=>canAuto()&&!hovered&&!focused&&inView&&!document.hidden;
  function paint(){
   const progress=canAuto()?Math.min(1,elapsed/interval):1;
   fills.forEach((f,i)=>{f.style.transform=`scaleX(${i===current?progress:0})`});
   buttons.forEach((b,i)=>{b.setAttribute('aria-current',String(i===current));b.disabled=failed.has(i)});
   if(controls)controls.hidden=slides.length-failed.size<2;
   root.dataset.activeSlide=String(current);root.dataset.sliderPaused=String(!running());
  }
  function candidate(index,direction=1){let n=((index%slides.length)+slides.length)%slides.length;for(let tries=0;tries<slides.length&&failed.has(n);tries++)n=(n+direction+slides.length)%slides.length;return n}
  function show(index,manual=false,direction=1){if(!slides.length)return;current=candidate(index,direction);elapsed=0;last=performance.now();slides.forEach((s,i)=>{s.classList.toggle('is-current',i===current);s.setAttribute('aria-hidden',String(i!==current))});paint();if(manual&&status)status.textContent=`الصورة ${current+1} من ${slides.length}: ${slides[current].querySelector('img')?.alt||''}`}
  function tick(now){raf=0;if(disposed)return;if(running()){elapsed+=Math.max(0,now-last);if(elapsed>=interval)show(current+1);paint();last=now;raf=requestAnimationFrame(tick)}}
  function sync(){if(raf){cancelAnimationFrame(raf);raf=0}paint();last=performance.now();if(running())raf=requestAnimationFrame(tick)}
  buttons.forEach((button,i)=>button.addEventListener('click',()=>{show(i,true);sync()}));
  root.addEventListener('keydown',e=>{if(!e.target.closest('[data-slide-to]'))return;let next;if(e.key==='ArrowLeft')next=candidate(current+1);else if(e.key==='ArrowRight')next=candidate(current-1,-1);else if(e.key==='Home')next=candidate(0);else if(e.key==='End')next=candidate(slides.length-1,-1);else return;e.preventDefault();show(next,true);buttons[next]?.focus();sync()});
  root.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;sync()}});root.addEventListener('pointerleave',()=>{hovered=false;sync()});
  root.addEventListener('focusin',()=>{focused=true;sync()});root.addEventListener('focusout',()=>queueMicrotask(()=>{focused=root.contains(document.activeElement);sync()}));
  let touch=null;frame?.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')touch={x:e.clientX,y:e.clientY}});frame?.addEventListener('pointerup',e=>{if(!touch)return;const dx=e.clientX-touch.x,dy=e.clientY-touch.y;touch=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.3){show(current+(dx>0?1:-1),true,dx>0?1:-1);sync()}});frame?.addEventListener('pointercancel',()=>{touch=null});
  slides.forEach((s,i)=>{const img=s.querySelector('img');if(!img)return;const onError=()=>{failed.add(i);if(i===current&&failed.size<slides.length)show(i+1);sync()};img.addEventListener('error',onError);if(img.complete&&img.naturalWidth===0)onError()});
  const onVisibility=()=>sync(),onReduced=()=>{elapsed=0;sync()};document.addEventListener('visibilitychange',onVisibility);reduce.addEventListener?.('change',onReduced);
  const observer='IntersectionObserver'in window?new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;sync()},{threshold:.15}):null;observer?.observe(root);
  show(0);sync();
  return ()=>{disposed=true;cancelAnimationFrame(raf);observer?.disconnect();document.removeEventListener('visibilitychange',onVisibility);reduce.removeEventListener?.('change',onReduced)};
 });
}
