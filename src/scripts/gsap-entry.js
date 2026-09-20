// Masked word reveal adapted from the user-supplied Osmo / osmo.supply example.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { installMaskedText } from './masked-text.js';

gsap.registerPlugin(ScrollTrigger,SplitText,CustomEase);
CustomEase.create('jasr-masked-ease','0.625, 0.05, 0, 1');
installMaskedText({
 mount(el,config){
  let split,tween,trigger,finished=false,started=false,destroyed=false;
  el.classList.add('masked-reveal-text');
  try{
   split=SplitText.create(el,{
    type:'lines,words',mask:'lines',linesClass:'masked-line',wordsClass:'masked-word',
    autoSplit:true,aria:'auto',
    onSplit(self){
     trigger?.kill();
     tween=gsap.fromTo(self.words,{yPercent:110},{
      yPercent:0,duration:config.duration,stagger:config.stagger,
      ease:'jasr-masked-ease',paused:true,
      onComplete:()=>{finished=true;gsap.set(self.words,{clearProps:'willChange'})}
     });
     if(finished){tween.progress(1);return tween}
     if(started){tween.play();return tween}
     const start=()=>{if(destroyed)return;started=true;tween.play()};
     trigger=ScrollTrigger.create({trigger:el,start:`top ${config.start}%`,once:true,onEnter:start});
     // Text already in view reveals on entry; it never waits for a first scroll.
     if(el.getBoundingClientRect().top<window.innerHeight*config.start/100)start();
     return tween;
    }
   });
  }catch(error){trigger?.kill();tween?.kill();split?.revert();el.classList.remove('masked-reveal-text');throw error}
  return {
   finish(){finished=true;started=true;trigger?.kill();tween?.progress(1).pause()},
   destroy(){destroyed=true;trigger?.kill();tween?.kill();split?.revert();el.classList.remove('masked-reveal-text')}
  };
 },
 refresh(){ScrollTrigger.refresh()}
});

import {installAboutMotion} from './about-motion.js';
installAboutMotion();

import {installPremiumMotion} from './premium-motion.js';
installPremiumMotion();

import {installHeroSliders} from './hero-slider.js';
installHeroSliders();

import {installContactMotion} from './contact-motion.js';
installContactMotion();
