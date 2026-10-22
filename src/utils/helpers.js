import {toJalaali} from 'jalaali-js';
export const digits=s=>String(s??'').replace(/[۰-۹]/g,c=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))).replace(/[٠-٩]/g,c=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(c)));
export function normalizePhone(raw){let n=digits(raw).replace(/[^\d+]/g,'');if(n.startsWith('+98'))n='0'+n.slice(3);else if(n.startsWith('0098'))n='0'+n.slice(4);else if(n.startsWith('98')&&n.length===12)n='0'+n.slice(2);else if(n.startsWith('9')&&n.length===10)n='0'+n;return /^09\d{9}$/.test(n)?n:null;}
export const faDate=iso=>{const d=new Date(iso+'T12:00:00');return Number.isNaN(d.getTime())?'':new Intl.DateTimeFormat('fa-IR-u-ca-persian',{year:'numeric',month:'long',day:'numeric'}).format(d)};
export const todayISO=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
export const datePlus=n=>{const d=new Date();d.setDate(d.getDate()+n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
export const money=n=>Number(n).toLocaleString('fa-IR')+' تومان';
export const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
export const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
