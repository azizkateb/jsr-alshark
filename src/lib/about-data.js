/** Preserve the exact editable title; only split its final recruitment word visually. */
export function aboutTitleParts(title){
 const match=String(title||'').match(/^(.*?)(\s+)(للاستقدام)\s*$/u);
 return match?{name:match[1],service:match[3]}:{name:String(title||''),service:''};
}
export const aboutFeatureLabels=['خيارات الاستقدام','تفاصيل واضحة','التعاقد عبر مساند','تواصل ومتابعة'];
export const aboutFeatureIcons=[
 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8m6 10v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
 'M8 3h8l4 4v14H4V3h4m8 0v5h4M8 12h8M8 16h6',
 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6',
 'M4 14v-3a8 8 0 0 1 16 0v3M4 12h3v7H4zM17 12h3v7h-3zM20 19c0 2-3 3-7 3'
];
