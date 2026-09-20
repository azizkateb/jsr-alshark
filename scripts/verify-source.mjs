import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {validateConfig,makeThemeCss,contrast} from '../src/lib/customization.js';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const parse=p=>JSON.parse(read(p));
const cms=parse('.pages.yml');
for(const c of cms.content){const data=parse(c.path);if(!c.list)for(const f of c.fields)assert.ok(f.name in data,'Missing field '+c.name+'.'+f.name)}
const cfg=Object.fromEntries(['theme','layout','copy','animations'].map(k=>[k,parse('src/data/'+k+'.json')]));validateConfig(cfg);
const css=makeThemeCss(cfg.theme,cfg.layout);assert.ok(css.includes('--primary:oklch'));
assert.ok(contrast('#eeeeee','#111111')>10);
const page=read('src/pages/index.astro')+read('src/components/SiteSection.astro');
assert.ok(!page.includes('ASTRO_SLOT_'));assert.ok(!page.includes('nakhlah-hr.com'));
for(const [,key] of page.matchAll(/copy\.([A-Za-z0-9_]+)/g))assert.ok(key in cfg.copy,'Unknown copy '+key);
new vm.Script(read('public/scripts/site.js'));
console.log('PASS: CMS fields, validated theme/layout/copy/animation settings, bound UI strings and client JS syntax.');
console.log('Full Astro build, Pages CMS login and published deployment still require live setup.');
