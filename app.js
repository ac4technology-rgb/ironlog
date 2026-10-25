(function(){
/* ---- app1.js ---- */
'use strict';
/* ================= utils ================= */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DAY=864e5, KG2LB=2.20462262, KM2MI=0.621371192, CM2IN=0.393700787;
const pad=n=>String(n).padStart(2,'0');
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function num(v){if(v==null)return null;v=String(v).trim().replace(',','.');if(v==='')return null;const n=parseFloat(v);return isFinite(n)?n:null}
const r2=n=>Math.round(n*100)/100;
function fmtN(n,d=1){if(n==null||!isFinite(n))return '';const p=Math.pow(10,d);return String(Math.round(n*p)/p)}
function compact(n){n=n||0;if(n>=1e6)return fmtN(n/1e6,1)+'M';if(n>=1e4)return fmtN(n/1e3,0)+'k';if(n>=1e3)return fmtN(n/1e3,1)+'k';return fmtN(n,0)}
const e1rm=(w,r)=>(!w||!r||r<=0)?0:(r===1?w:w*(1+r/30));
const brzycki=(w,r)=>(!w||!r||r>=37)?0:w*36/(37-r);

/* ================= icons ================= */
const ICO={
home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
hist:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
dumb:'<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
list:'<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
more:'<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
plus:'<path d="M12 5v14M5 12h14"/>',check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',
back:'<path d="m15 5-7 7 7 7"/>',chev:'<path d="m9 5 7 7-7 7"/>',dots:'<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
trash:'<path d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4.5v1.5A3.5 3.5 0 0 0 8 11M16 6h3.5v1.5A3.5 3.5 0 0 1 16 11M12 13v4M8.5 20h7M10 17h4v3h-4z"/>',
timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M9.5 2.5h5"/>',flame:'<path d="M12 21c4 0 7-2.7 7-6.6 0-3.2-2-5.4-3.6-7.1-.4 1.9-1.4 3-2.4 3.4.3-3.3-1.4-6.3-4-7.7.3 3-1.6 5-3 6.8C4.8 11.5 5 13 5 14.4 5 18.3 8 21 12 21z"/>',
cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',chart:'<path d="M4 20V4M4 20h16M8 16l4-5 3 3 5-7"/>',
scale:'<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8.5 9.5a5 5 0 0 1 7 0L13 12"/>',plate:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/>',
calc:'<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>',
edit:'<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/>',copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
up:'<path d="m6 15 6-6 6 6"/>',down:'<path d="m6 9 6 6 6-6"/>',swap:'<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',note:'<path d="M5 4h14v12l-4 4H5zM15 20v-4h4M8.5 9h7M8.5 13h4"/>',
play:'<path d="M7 4.5v15l12-7.5z"/>',save:'<path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6"/>',down2:'<path d="M12 4v11m-5-5 5 5 5-5M5 20h14"/>',up2:'<path d="M12 20V9m-5 5 5-5 5 5M5 4h14"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',bolt:'<path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12z"/>',
ruler:'<path d="M3 17 17 3l4 4L7 21zM7.5 12.5l2 2M10.5 9.5l2 2M13.5 6.5l2 2"/>'
};
const ic=(n,cls='')=>`<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICO[n]||''}</svg>`;

/* ================= library ================= */
const MUSCLES={chest:'Chest',back:'Back',shoulders:'Shoulders',traps:'Traps & Neck',biceps:'Biceps',triceps:'Triceps',forearms:'Forearms',core:'Core',quads:'Quads',hamstrings:'Hamstrings',glutes:'Glutes',adductors:'Adductors',calves:'Calves',cardio:'Cardio',fullbody:'Full Body'};
const MCOL={chest:'#ff6b6b',back:'#4dabf7',shoulders:'#ffa94d',traps:'#74c0fc',biceps:'#da77f2',triceps:'#9775fa',quads:'#69db7c',hamstrings:'#38d9a9',glutes:'#f783ac',adductors:'#e599f7',calves:'#3bc9db',core:'#ffd43b',forearms:'#a9e34b',cardio:'#ff8787',fullbody:'#c6ff33'};
const MABBR={chest:'CH',back:'BK',shoulders:'SH',traps:'TP',biceps:'BI',triceps:'TR',quads:'QD',hamstrings:'HM',glutes:'GL',adductors:'AD',calves:'CF',core:'CO',forearms:'FA',cardio:'CA',fullbody:'FB'};
const EQUIP={barbell:'Barbell',dumbbell:'Dumbbell',machine:'Machine',cable:'Cable',bodyweight:'Bodyweight',kettlebell:'Kettlebell',smith:'Smith Machine',ezbar:'EZ Bar',bands:'Bands',ball:'Ball',foamroll:'Foam Roller',cardio:'Cardio Machine',other:'Other'};
const CATS={strength:'Strength',stretch:'Stretching',plyo:'Plyometrics',olympic:'Olympic',strongman:'Strongman',cardio:'Cardio'};
const TYPES={wr:'Weight & reps',bw:'Bodyweight reps (+optional weight)',dur:'Timed hold (seconds)',cardio:'Cardio (time, distance, calories)'};
const DET2G={chest:'chest',shoulders:'shoulders',biceps:'biceps',triceps:'triceps',forearms:'forearms',abdominals:'core',quadriceps:'quads',hamstrings:'hamstrings',calves:'calves',glutes:'glutes',lats:'back','middle back':'back','lower back':'back',traps:'traps',neck:'traps',adductors:'adductors',abductors:'adductors'};
const G2DET={chest:['chest'],back:['lats','middle back'],shoulders:['shoulders'],traps:['traps'],biceps:['biceps'],triceps:['triceps'],forearms:['forearms'],core:['abdominals'],quads:['quadriceps'],hamstrings:['hamstrings'],glutes:['glutes'],adductors:['adductors'],calves:['calves'],cardio:['quadriceps','calves'],fullbody:['quadriceps','glutes','hamstrings','shoulders']};
const LIB=[],EXMAP={};
EXDB.forEach(o=>{const e={id:o.i,name:o.n,muscle:o.m,equip:o.e,type:o.t,cat:o.c||'strength',img:o.img||null,prim:o.p||[],sec:o.s||[],level:o.l||null,mech:o.k||null,force:o.f||null,steps:o.st||null,fx:!!o.x};LIB.push(e);EXMAP[e.id]=e});
function EX(id){return EXMAP[id]||D.custom.find(c=>c.id===id)||{id,name:'Deleted exercise',muscle:'fullbody',equip:'other',type:'wr',missing:true}}
const exByName=n=>{const id=slug(n);if(!EXMAP[id])throw new Error('Unknown exercise '+n);return id};
const allEx=()=>LIB.concat(D.custom.filter(c=>!c.hidden));
const primOf=e=>(e.prim&&e.prim.length?e.prim:(G2DET[e.muscle]||[]));
const secOf=e=>e.sec||[];

/* ================= data ================= */
const KEY='ironlog.data.v2',KEY_V1='ironlog.data.v1';
function builtinTemplates(){
  const T=(program,name,list)=>({id:'tpl-'+slug(program+'-'+name),program,name,builtin:true,exercises:list.map(([n,s,r])=>({exId:exByName(n),sets:s,reps:r}))});
  return [
    T('Push / Pull / Legs','Push',[['Barbell Bench Press',4,8],['Incline Dumbbell Press',3,10],['Shoulder Press Machine',3,10],['Dumbbell Lateral Raise',3,15],['Pec Deck',3,12],['Tricep Rope Pushdown',3,12]]),
    T('Push / Pull / Legs','Pull',[['Deadlift',3,5],['Lat Pulldown',3,10],['Seated Cable Row',3,10],['Face Pull',3,15],['Barbell Curl',3,10],['Hammer Curl',3,12]]),
    T('Push / Pull / Legs','Legs',[['Barbell Back Squat',4,6],['Leg Press',3,10],['Romanian Deadlift',3,8],['Leg Extension',3,12],['Lying Leg Curl',3,12],['Standing Calf Raise Machine',4,12]]),
    T('Upper / Lower','Upper A',[['Barbell Bench Press',4,6],['Barbell Row',4,6],['Overhead Press',3,8],['Lat Pulldown',3,10],['Dumbbell Curl',2,12],['Skull Crusher',2,12]]),
    T('Upper / Lower','Lower A',[['Barbell Back Squat',4,6],['Romanian Deadlift',3,8],['Leg Press',3,10],['Seated Leg Curl',3,12],['Standing Calf Raise Machine',3,12],['Hanging Leg Raise',3,12]]),
    T('Upper / Lower','Upper B',[['Incline Barbell Bench Press',4,8],['Pull-Up',4,8],['Seated Dumbbell Shoulder Press',3,10],['Seated Row Machine',3,10],['Cable Lateral Raise',3,15],['Tricep Bar Pushdown',3,12]]),
    T('Upper / Lower','Lower B',[['Deadlift',3,5],['Hack Squat',3,10],['Bulgarian Split Squat',3,10],['Barbell Hip Thrust',3,10],['Leg Extension',3,12],['Seated Calf Raise Machine',3,15]]),
    T('Full Body 3x','Full Body A',[['Barbell Back Squat',3,8],['Barbell Bench Press',3,8],['Seated Cable Row',3,10],['Dumbbell Lateral Raise',3,15],['Plank',3,null]]),
    T('Full Body 3x','Full Body B',[['Romanian Deadlift',3,8],['Overhead Press',3,8],['Lat Pulldown',3,10],['Leg Press',3,12],['Cable Crunch',3,15]]),
    T('Full Body 3x','Full Body C',[['Front Squat',3,8],['Incline Dumbbell Press',3,10],['Chest-Supported Dumbbell Row',3,10],['Lying Leg Curl',3,12],['Hammer Curl',3,12]]),
    T('StrongLifts 5x5','5x5 Workout A',[['Barbell Back Squat',5,5],['Barbell Bench Press',5,5],['Barbell Row',5,5]]),
    T('StrongLifts 5x5','5x5 Workout B',[['Barbell Back Squat',5,5],['Overhead Press',5,5],['Deadlift',1,5]])
  ];
}
function defaults(){return {version:2,settings:{unit:'kg',rest:90,autoRest:true,sound:true,vibrate:true,weeklyGoal:4,barKg:20,barLb:45,autoWarm:true,autoRec:true},profile:null,program:null,onboarded:false,custom:[],workouts:[],templates:builtinTemplates(),body:[],measures:[],active:null,restEnd:null,restTotal:0}}
function migrate(d){const def=defaults();const out=Object.assign(def,d,{settings:Object.assign(def.settings,d.settings||{})});
  if((d.version||1)<2){out.version=2;out.onboarded=!!(d.workouts&&d.workouts.length);out.migratedFrom=1;
    const have=new Set(out.templates.map(t=>t.id));builtinTemplates().forEach(t=>{if(!have.has(t.id))out.templates.push(t)})}
  return out}
function load(){try{let raw=localStorage.getItem(KEY),from2=true;if(!raw){raw=localStorage.getItem(KEY_V1);from2=false}
  const d=JSON.parse(raw);if(d&&d.version){const m=migrate(d);if(!from2){try{localStorage.setItem(KEY,JSON.stringify(m))}catch(e){}}return m}}catch(e){console.warn('load failed',e)}return defaults()}
let D=load();
let saveT=null;
function save(){invalidate();clearTimeout(saveT);saveT=null;try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){toast('Could not save — storage full or unavailable')}}
function saveSoon(){invalidate();clearTimeout(saveT);saveT=setTimeout(save,400)}
window.addEventListener('pagehide',()=>{if(saveT)save()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&saveT)save()});

/* ================= units ================= */
const isLb=()=>D.settings.unit==='lb';
const wU=()=>isLb()?'lb':'kg', dU=()=>isLb()?'mi':'km', lU=()=>isLb()?'in':'cm';
const toW=kg=>kg==null?null:(isLb()?kg*KG2LB:kg), fromW=v=>v==null?null:(isLb()?v/KG2LB:v);
const toD=km=>km==null?null:(isLb()?km*KM2MI:km), fromD=v=>v==null?null:(isLb()?v/KM2MI:v);
const toL=cm=>cm==null?null:(isLb()?cm*CM2IN:cm), fromL=v=>v==null?null:(isLb()?v/CM2IN:v);
const fW=(kg,d=1)=>fmtN(toW(kg),d);
const fWU=(kg,d=1)=>fW(kg,d)+' '+wU();

/* ================= dates ================= */
const sod=t=>{const d=new Date(t);d.setHours(0,0,0,0);return d.getTime()};
const sow=t=>{const d=new Date(sod(t));d.setDate(d.getDate()-((d.getDay()+6)%7));return d.getTime()};
const addDays=(t,n)=>{const d=new Date(t);d.setDate(d.getDate()+n);return d.getTime()};
const fmtD=(t,o={month:'short',day:'numeric'})=>new Date(t).toLocaleDateString(undefined,o);
const fmtDY=t=>fmtD(t,{month:'short',day:'numeric',year:'numeric'});
const fmtTime=t=>new Date(t).toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});
function fmtClock(ms){const s=Math.max(0,Math.floor(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return h?`${h}:${pad(m)}:${pad(x)}`:`${m}:${pad(x)}`}
function fmtDurShort(ms){const m=Math.round(ms/60000);return m>=60?`${Math.floor(m/60)}h ${m%60}m`:`${m}m`}
const fmtSec=s=>s>=60?`${Math.floor(s/60)}:${pad(Math.round(s%60))}`:`${Math.round(s)}s`;
const isoDate=t=>{const d=new Date(t);return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`};
const isoTime=t=>{const d=new Date(t);return `${pad(d.getHours())}:${pad(d.getMinutes())}`};
const parseIso=(s,tm='12:00')=>{const [y,m,d]=s.split('-').map(Number);const [h,mi]=tm.split(':').map(Number);return new Date(y,m-1,d,h||0,mi||0).getTime()};
function relDay(t){const d=Math.round((sod(Date.now())-sod(t))/DAY);if(d===0)return 'Today';if(d===1)return 'Yesterday';if(d<7)return fmtD(t,{weekday:'long'});return fmtD(t,{weekday:'short',month:'short',day:'numeric'})}

/* ================= metrics & records ================= */
const MET={
  wr:[{k:'e1rm',l:'Est. 1RM',u:'w'},{k:'maxw',l:'Heaviest',u:'w'},{k:'setvol',l:'Best set volume',u:'w'},{k:'vol',l:'Session volume',u:'w'},{k:'reps',l:'Total reps',u:'reps'}],
  bw:[{k:'maxreps',l:'Max reps',u:'reps'},{k:'reps',l:'Total reps',u:'reps'},{k:'maxw',l:'Added weight',u:'w'}],
  dur:[{k:'maxsec',l:'Longest',u:'sec'},{k:'totsec',l:'Total time',u:'sec'},{k:'maxw',l:'Added weight',u:'w'}],
  cardio:[{k:'dist',l:'Distance',u:'dist'},{k:'min',l:'Duration',u:'min'},{k:'cal',l:'Calories',u:'kcal'},{k:'pace',l:'Pace',u:'pace'}]
};
const KLABEL={maxw:'Heaviest weight',e1rm:'Est. 1RM',setvol:'Best set volume',repsAt:'Rep PR',vol:'Session volume',maxreps:'Most reps',reps:'Most total reps',maxsec:'Longest hold',totsec:'Most total time',dist:'Longest distance',min:'Longest session',cal:'Most calories'};
const isWork=s=>s.done&&s.t!=='w';
function sessMetrics(e){const m={e1rm:0,maxw:0,setvol:0,vol:0,reps:0,maxreps:0,maxsec:0,totsec:0,dist:0,min:0,cal:0,sets:0};
  for(const s of e.sets){if(!isWork(s))continue;m.sets++;const w=s.w||0,r=s.r||0;m.maxw=Math.max(m.maxw,w);m.e1rm=Math.max(m.e1rm,e1rm(w,r));m.setvol=Math.max(m.setvol,w*r);m.vol+=w*r;m.reps+=r;m.maxreps=Math.max(m.maxreps,r);m.maxsec=Math.max(m.maxsec,s.sec||0);m.totsec+=s.sec||0;m.dist+=s.dist||0;m.min+=s.min||0;m.cal+=s.cal||0}
  m.pace=m.dist>0&&m.min>0?m.min/m.dist:0;return m}
function dispVal(u,v){if(v==null)return v;switch(u){case 'w':return toW(v);case 'dist':return toD(v);case 'pace':return isLb()?v/KM2MI:v;default:return v}}
const unitLabel=u=>({w:wU(),reps:'reps',sec:'s',dist:dU(),min:'min',kcal:'kcal',pace:'min/'+dU()})[u]||'';
function fmtU(u,v){const d=dispVal(u,v);if(u==='sec')return fmtSec(d);if(u==='pace')return fmtSec(d*60)+' /'+dU();if(u==='w')return fmtN(d,1)+' '+wU();if(u==='dist')return fmtN(d,2)+' '+dU();return fmtN(d,u==='min'?1:0)+' '+unitLabel(u)}
const sessKey=t=>({wr:'vol',bw:'reps',dur:'totsec'})[t];
function newBest(){return {n:0,rec:{},raw:{}}}
function applyBest(type,b,s,t,apply){
  const ks=[],R=b.rec;const chk=(k,v,x)=>{if(v>0&&v>((R[k]&&R[k].v)||0)+1e-9){ks.push(k);if(apply)R[k]=Object.assign({v,t},x)}};
  const w=s.w||0,r=s.r||0;
  if(type==='wr'){chk('maxw',w,{w,r});chk('e1rm',e1rm(w,r),{w,r});chk('setvol',w*r,{w,r});
    if(w>0&&r>0){let prev=0,any=false;for(const k in b.raw){if(+k>=w-1e-6){any=true;prev=Math.max(prev,b.raw[k])}}if(any&&r>prev)ks.push('repsAt');if(apply){const key=r2(w);b.raw[key]=Math.max(b.raw[key]||0,r)}}}
  else if(type==='bw'){chk('maxreps',r,{w,r});if(w>0)chk('maxw',w,{w,r})}
  else if(type==='dur'){chk('maxsec',s.sec||0,{w})}
  else if(type==='cardio'){chk('dist',s.dist||0,{});chk('min',s.min||0,{});chk('cal',s.cal||0,{})}
  return ks}
let _idx=null;function invalidate(){_idx=null}
function idx(){if(_idx)return _idx;
  const ws=D.workouts.slice().sort((a,b)=>a.start-b.start),hist={},best={},events=[];
  for(const w of ws){w.exercises.forEach((e,ei)=>{const ex=EX(e.exId);const b=best[e.exId]||(best[e.exId]=newBest());const had=b.n>0;
    e.sets.forEach((s,si)=>{if(!isWork(s))return;const ks=applyBest(ex.type,b,s,w.start,true);if(had&&ks.length)events.push({wid:w.id,ei,si,exId:e.exId,kinds:ks,t:w.start,s})});
    const m=sessMetrics(e),sk=sessKey(ex.type);
    if(sk&&m[sk]>0&&m[sk]>((b.rec[sk]&&b.rec[sk].v)||0)+1e-9){if(had)events.push({wid:w.id,ei,si:-1,exId:e.exId,kinds:[sk],t:w.start,v:m[sk]});b.rec[sk]={v:m[sk],t:w.start}}
    if(m.sets){b.n++;b.last=w.start}
    (hist[e.exId]||(hist[e.exId]=[])).push({w,e,ei,m})})}
  _idx={ws,hist,best,events};return _idx}
function setPRs(wid){const o={};for(const ev of idx().events)if(ev.wid===wid){const k=ev.ei+':'+ev.si;o[k]=(o[k]||[]).concat(ev.kinds)}return o}
function prText(ev){const ex=EX(ev.exId);const k=ev.kinds[0];const s=ev.s;
  if(ev.si<0){return KLABEL[k]+': '+(k==='vol'?compact(toW(ev.v))+' '+wU():k==='totsec'?fmtSec(ev.v):fmtN(ev.v,0)+' reps')}
  if(ex.type==='wr'){if(ev.kinds.includes('maxw'))return `Heaviest: ${fW(s.w)} ${wU()} × ${s.r}`;if(ev.kinds.includes('e1rm'))return `Est. 1RM: ${fW(e1rm(s.w,s.r))} ${wU()}`;if(ev.kinds.includes('repsAt'))return `Rep PR: ${fW(s.w)} ${wU()} × ${s.r}`;return `Set volume: ${compact(toW(s.w*s.r))} ${wU()}`}
  if(ex.type==='bw')return ev.kinds.includes('maxreps')?`Most reps: ${s.r}`:`Added weight: ${fW(s.w)} ${wU()} × ${s.r}`;
  if(ex.type==='dur')return `Longest hold: ${fmtSec(s.sec)}`;
  return ev.kinds.map(k=>k==='dist'?`Distance ${fmtN(toD(s.dist),2)} ${dU()}`:k==='min'?`Time ${fmtN(s.min,1)} min`:`${fmtN(s.cal,0)} kcal`).join(' · ')}
function workoutVol(w){let v=0;for(const e of w.exercises){const t=EX(e.exId).type;if(t!=='wr')continue;for(const s of e.sets)if(isWork(s))v+=(s.w||0)*(s.r||0)}return v}
const workoutSets=w=>w.exercises.reduce((a,e)=>a+e.sets.filter(isWork).length,0);
function prevEntry(exId,w){const h=idx().hist[exId];if(!h)return null;for(let i=h.length-1;i>=0;i--){const x=h[i];if(x.w.id!==w.id&&x.w.start<w.start&&x.e.sets.some(s=>s.done))return x}return null}
function setText(type,s){if(!s)return '—';
  if(type==='wr')return `${fW(s.w,2)||0} × ${s.r??'—'}`;
  if(type==='bw')return (s.w?`+${fW(s.w,2)} × `:'')+`${s.r??'—'}${s.w?'':' reps'}`;
  if(type==='dur')return (s.w?`+${fW(s.w,2)} · `:'')+fmtSec(s.sec||0);
  const p=[];if(s.min)p.push(fmtN(s.min,1)+' min');if(s.dist)p.push(fmtN(toD(s.dist),2)+' '+dU());if(s.cal)p.push(fmtN(s.cal,0)+' kcal');return p.join(' · ')||'—'}

/* ================= charts ================= */
const CH={};let chSeq=0;
function niceStep(range,n){const raw=range/n,mag=Math.pow(10,Math.floor(Math.log10(raw))),f=raw/mag;return (f<1.5?1:f<3?2:f<7?5:10)*mag}
function emptyChart(msg){return `<div class="chart-empty">${msg}</div>`}
function lineChart(pts,o={}){
  if(!pts.length)return emptyChart(o.empty||'No data yet');
  if(pts.length===1&&!o.allowOne)return emptyChart(o.one||'Log one more session to see a trend line');
  const W=360,H=o.h||200,pl=42,pr=14,pt=16,pb=26,col=o.color||'#c6ff33';
  const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);let x0=Math.min(...xs),x1=Math.max(...xs);if(x1-x0<DAY){x0-=DAY*3;x1+=DAY*3}
  let mn=Math.min(...ys),mx=Math.max(...ys);let padv=(mx-mn)*.15||Math.max(1,Math.abs(mx)*.1);let y0=mn-padv,y1=mx+padv;if(mn>=0&&y0<0)y0=0;if(o.zero)y0=0;
  const st=niceStep(y1-y0,4);y0=Math.floor(y0/st)*st;y1=Math.ceil(y1/st)*st;
  const X=x=>pl+(x-x0)/(x1-x0)*(W-pl-pr),Y=y=>pt+(1-(y-y0)/(y1-y0))*(H-pt-pb);
  const id='c'+(++chSeq),f=o.fmt||(v=>fmtN(v,1));let g='';
  for(let v=y0;v<=y1+st*.01;v+=st){const yy=Y(v);g+=`<line class="grid" x1="${pl}" x2="${W-pr}" y1="${yy}" y2="${yy}"/><text x="${pl-7}" y="${yy+3.5}" text-anchor="end">${(o.tick||compact)(v)}</text>`}
  const nl=Math.min(4,pts.length);for(let i=0;i<nl;i++){const t=x0+(x1-x0)*(nl===1?.5:i/(nl-1));g+=`<text x="${X(t)}" y="${H-7}" text-anchor="${i===0?'start':i===nl-1?'end':'middle'}">${fmtD(t,(x1-x0)>300*DAY?{month:'short',year:'2-digit'}:{month:'short',day:'numeric'})}</text>`}
  const P=pts.map(p=>[X(p.x),Y(p.y)]);const line=P.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('');
  const area=line+`L${P[P.length-1][0].toFixed(1)} ${H-pb}L${P[0][0].toFixed(1)} ${H-pb}Z`;
  const dots=pts.length<=45?P.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="2.6" fill="#09090b" stroke="${col}" stroke-width="2"/>`).join(''):'';
  const L=P[P.length-1];
  CH[id]={P,pts,f,H,pb,pt,W};
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" data-cid="${id}"><defs><linearGradient id="g${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".32"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs>${g}<path d="${area}" fill="url(#g${id})"/><path d="${line}" fill="none" stroke="${col}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>${dots}<circle cx="${L[0]}" cy="${L[1]}" r="5" fill="${col}"/><g class="tip" style="display:none"><line y1="${pt}" y2="${H-pb}" stroke="rgba(255,255,255,.35)" stroke-dasharray="3 3"/><circle r="5.5" fill="${col}" stroke="#09090b" stroke-width="2"/><rect rx="7" height="22" fill="#30303a"/><text style="fill:#f5f5f7;font-weight:700;font-size:11px" y="0"></text></g><rect x="0" y="0" width="${W}" height="${H}" fill="transparent"/></svg>`}
function attachCharts(root){$$('svg.chart[data-cid]',root).forEach(svg=>{if(svg._b)return;svg._b=1;const c=CH[svg.dataset.cid];if(!c)return;const tip=$('.tip',svg);
  const show=ev=>{const r=svg.getBoundingClientRect();const x=(ev.clientX-r.left)*(c.W/r.width);let bi=0,bd=1e9;c.P.forEach((p,i)=>{const d=Math.abs(p[0]-x);if(d<bd){bd=d;bi=i}});const p=c.P[bi],pt=c.pts[bi];
    tip.style.display='';const ln=$('line',tip);ln.setAttribute('x1',p[0]);ln.setAttribute('x2',p[0]);const ci=$('circle',tip);ci.setAttribute('cx',p[0]);ci.setAttribute('cy',p[1]);
    const txt=c.f(pt.y)+' · '+(pt.label||fmtDY(pt.x));const tw=txt.length*6.1+16;let tx=Math.min(Math.max(p[0]-tw/2,2),c.W-tw-2);const ty=Math.max(p[1]-34,0);
    const rc=$('rect',tip);rc.setAttribute('x',tx);rc.setAttribute('y',ty);rc.setAttribute('width',tw);const t=$('text',tip);t.setAttribute('x',tx+8);t.setAttribute('y',ty+15);t.textContent=txt};
  svg.addEventListener('pointerdown',show);svg.addEventListener('pointermove',ev=>{if(ev.buttons||ev.pointerType==='mouse')show(ev)});svg.addEventListener('pointerleave',()=>{tip.style.display='none'})})}
function barChart(items,o={}){const W=360,H=o.h||170,pt=22,pb=24,pl=6,pr=6;const mx=Math.max(...items.map(i=>i.v),1);const bw=(W-pl-pr)/items.length;let g='';
  items.forEach((it,i)=>{const h=it.v/mx*(H-pt-pb),x=pl+i*bw+bw*.17,w=bw*.66,y=H-pb-h;g+=`<rect x="${x}" y="${H-pb-Math.max(h,0)}" width="${w}" height="${Math.max(h,it.v?2:0)}" rx="5" fill="${it.hl?'#c6ff33':'#3a3a46'}"><title>${esc(it.title||'')}</title></rect>`;
    if(it.v&&(it.hl||it.v===mx))g+=`<text x="${x+w/2}" y="${y-6}" text-anchor="middle" style="fill:${it.hl?'#c6ff33':'#a1a1ad'};font-weight:700">${o.fmt?o.fmt(it.v):compact(it.v)}</text>`;
    if(it.label)g+=`<text x="${x+w/2}" y="${H-7}" text-anchor="middle">${it.label}</text>`});
  g+=`<line class="grid" x1="0" x2="${W}" y1="${H-pb+.5}" y2="${H-pb+.5}"/>`;return `<svg class="chart" viewBox="0 0 ${W} ${H}">${g}</svg>`}
function heatmap(weeks=17){const now=Date.now(),end=sow(now),start=addDays(end,-(weeks-1)*7);const per={};
  for(const w of D.workouts){if(w.start<start)continue;const k=sod(w.start);per[k]=(per[k]||0)+workoutSets(w)+1}
  const cs=17,gap=3.5,pl=24,pt=16,W=pl+weeks*(cs+gap),H=pt+7*(cs+gap);let g='',lastM=-1;const lv=v=>!v?'#1d1d24':v<10?'#3d5a12':v<18?'#6b9a17':v<26?'#9fd61f':'#c6ff33';
  for(let c=0;c<weeks;c++){const ws=addDays(start,c*7);const m=new Date(ws).getMonth();if(m!==lastM){g+=`<text x="${pl+c*(cs+gap)}" y="10">${fmtD(ws,{month:'short'})}</text>`;lastM=m}
    for(let r=0;r<7;r++){const d=addDays(ws,r);if(d>now)continue;const v=per[d]||0;g+=`<rect x="${pl+c*(cs+gap)}" y="${pt+r*(cs+gap)}" width="${cs}" height="${cs}" rx="4" fill="${lv(v)}"${d===sod(now)?' stroke="#f5f5f7" stroke-width="1.3"':''}><title>${fmtDY(d)}${v?' · trained':''}</title></rect>`}}
  ['M','','W','','F','','S'].forEach((l,r)=>{if(l)g+=`<text x="2" y="${pt+r*(cs+gap)+12}">${l}</text>`});
  return `<svg class="chart" viewBox="0 0 ${W} ${H}">${g}</svg><div class="heat-legend">Less <i style="background:#1d1d24"></i><i style="background:#3d5a12"></i><i style="background:#6b9a17"></i><i style="background:#9fd61f"></i><i style="background:#c6ff33"></i> More</div>`}
function ringSvg(p,size=44){const r=size/2-4,c=2*Math.PI*r;return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="#25252d" stroke-width="5" fill="none"/><circle cx="${size/2}" cy="${size/2}" r="${r}" stroke="#c6ff33" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-Math.min(1,p))}" transform="rotate(-90 ${size/2} ${size/2})"/></svg>`}

/* ---- coach.js ---- */
/* ================= coaching content ================= */
// Movement-pattern coaching. Every exercise is classified into a pattern; pattern content is combined with
// the exercise's own step-by-step instructions (free-exercise-db, public domain) and equipment-specific setup.
const PAT={
squat:{n:'Squat',cls:'main',
 setup:['Bar on your upper traps (high-bar) or rear delts (low-bar), hands just outside shoulders, wrists straight.','Unrack with both feet under the bar, take 2–3 small steps back.','Feet about shoulder-width, toes turned out 15–30°.'],
 cues:['Big breath into your belly, brace like you are about to be punched — then descend.','Sit down between your heels; knees travel out over your toes.','Keep the whole foot planted: big toe, little toe, heel.','Chest proud, bar stays over mid-foot the whole rep.','Drive up by pushing the floor away; hips and chest rise together.'],
 mistakes:['Knees caving in on the way up (push them out).','Heels lifting or weight shifting to the toes.','Hips shooting up first so it turns into a good morning.','Cutting depth as the weight goes up — keep the same depth every rep.'],
 breath:'Inhale and brace at the top, hold through the descent and the hardest part of the ascent, exhale near lockout. Re-brace every rep.',
 vars:['Front Squat','Box Squat','Pause squat (2 s in the hole)','Safety-bar squat','Hack Squat'],acc:['Leg Press','Bulgarian Split Squat','Leg Extension','Romanian Deadlift','Plank']},
fsquat:{n:'Front Squat',cls:'main',
 setup:['Bar sits on the front delts touching your throat, elbows high — clean grip or cross-arm.','Feet shoulder-width, toes slightly out.'],
 cues:['Elbows up! Point them forward the whole rep so the bar does not roll.','Stay tall — a front squat is more upright than a back squat.','Knees forward and out; sit straight down.','Drive the elbows up out of the bottom.'],
 mistakes:['Elbows dropping and upper back rounding.','Letting the bar drift onto the hands/wrists only.','Losing the brace at the bottom.'],
 breath:'Big breath and brace before each rep, exhale at the top.',vars:['Goblet Squat','Zercher Squat','Barbell Back Squat'],acc:['Leg Extension','Hack Squat','Plank']},
gsquat:{n:'Goblet / Dumbbell Squat',cls:'comp',
 setup:['Hold one dumbbell or kettlebell vertically against your chest, elbows under the weight.','Feet shoulder-width or a little wider, toes slightly out.'],
 cues:['Sit between your heels and let your elbows brush the inside of your knees.','Chest up, weight stays glued to your chest.','Push knees out and stand up through the whole foot.'],
 mistakes:['Leaning forward and letting the weight pull you down.','Heels lifting off.','Bouncing out of the bottom without control.'],
 breath:'Inhale on the way down, exhale as you stand.',vars:['Front Squat','Barbell Back Squat','Heels-elevated goblet squat'],acc:['Bulgarian Split Squat','Leg Extension']},
mquad:{n:'Machine Squat / Leg Press',cls:'comp',
 setup:['Adjust the seat/back pad so you can reach full depth with your lower back staying on the pad.','Feet shoulder-width in the middle of the platform — higher = more glutes/hamstrings, lower = more quads.'],
 cues:['Lower under control until your knees are well bent (around 90° or deeper) without your hips peeling off the pad.','Push through the whole foot, knees tracking over the toes.','Stop just short of locking the knees out hard.'],
 mistakes:['Bouncing off the bottom.','Lower back rounding off the pad at depth.','Locking the knees out aggressively.','Partial reps with too much weight.'],
 breath:'Inhale on the way down, exhale as you press.',vars:['Hack Squat','Leg Press','Pendulum Squat','Belt Squat','Single-leg leg press'],acc:['Leg Extension','Lying Leg Curl','Standing Calf Raise Machine']},
lunge:{n:'Lunge / Split Squat',cls:'comp',
 setup:['Take a long enough stance that your front shin can stay fairly vertical at the bottom.','For Bulgarian split squats, rest the back foot laces-down on a bench about knee height.'],
 cues:['Drop straight down — the back knee goes toward the floor.','Most of the weight stays on the front heel and mid-foot.','Front knee tracks over the middle toes.','Slight forward torso lean = more glutes; upright = more quads.'],
 mistakes:['Stance too short so the heel lifts.','Pushing off the back leg instead of the front.','Front knee caving inward.','Rushing reps and losing balance.'],
 breath:'Inhale on the way down, exhale as you drive up.',vars:['Bulgarian Split Squat','Dumbbell Reverse Lunge','Dumbbell Walking Lunge','Dumbbell Step-Up'],acc:['Leg Extension','Barbell Hip Thrust']},
legext:{n:'Leg Extension',cls:'iso',
 setup:['Line your knee up with the machine’s pivot point.','Ankle pad sits just above the ankle; grab the handles and sit back.'],
 cues:['Kick up until the knees are straight and squeeze the quads for 1 second.','Lower slowly (2–3 s) to a deep bend.','Keep your hips down in the seat.'],
 mistakes:['Swinging the weight up with momentum.','Hips lifting off the seat.','Cutting the bottom of the range.'],
 breath:'Exhale as you extend, inhale as you lower.',vars:['Single-leg leg extension','Sissy Squat'],acc:['Leg Press','Hack Squat']},
hinge:{n:'Deadlift',cls:'main',
 setup:['Mid-foot under the bar (bar about 2–3 cm from your shins), feet hip-width.','Grip just outside your legs; double overhand until grip fails, then mixed grip or straps.','Shins to the bar, hips down until your back is flat and your shoulders are just in front of the bar.'],
 cues:['Pull the slack out: arms long, lats tight ("protect your armpits") before the bar leaves the floor.','Push the floor away with your legs; the bar drags up your shins and thighs.','Hips and shoulders rise at the same rate.','Finish tall by squeezing the glutes — do not lean back.','Lower by pushing the hips back first, then bend the knees once the bar passes them.'],
 mistakes:['Rounding the lower back.','Jerking the bar off the floor.','Bar drifting forward away from the legs.','Hips shooting up first (turns it into a stiff-leg pull).','Hyper-extending at the top.'],
 breath:'Big breath and brace on the floor before every rep; exhale at the top or after you set it down.',
 vars:['Trap Bar Deadlift','Sumo Deadlift','Deficit Deadlift','Pause deadlift (just below knee)','Rack Pull'],acc:['Romanian Deadlift','Barbell Row','Back Extension','Farmer\'s Walk']},
rdl:{n:'Romanian Deadlift / Hip Hinge',cls:'comp',
 setup:['Start standing with the weight, feet hip-width, soft knees.','Grip just outside the thighs.'],
 cues:['Push your hips straight back like closing a car door with your butt.','Weight stays close — slide it down your thighs.','Lower until you feel a strong hamstring stretch (usually just below the knee), back flat.','Drive the hips forward to stand, squeeze the glutes.'],
 mistakes:['Squatting the weight down instead of hinging.','Rounding the back to reach lower.','Letting the weight drift away from the legs.','Locking the knees completely straight.'],
 breath:'Inhale and brace at the top, hold on the way down, exhale as you stand.',vars:['Stiff-Leg Deadlift','Single-Leg Romanian Deadlift','Good Morning','Dumbbell Romanian Deadlift'],acc:['Lying Leg Curl','Barbell Hip Thrust','Back Extension']},
hipthrust:{n:'Hip Thrust / Glute Bridge',cls:'comp',
 setup:['Upper back on a bench at the bottom of your shoulder blades (floor for bridges).','Bar padded over the hip crease; feet flat, about hip-width.','At the top your shins should be vertical — adjust foot position until they are.'],
 cues:['Tuck the chin and keep your ribs down — look forward, not at the ceiling.','Drive through the heels and squeeze the glutes hard to lock out.','Hold the top for 1 second, lower under control.'],
 mistakes:['Over-arching the lower back at the top instead of using the glutes.','Feet too far out (hamstrings take over) or too close (quads take over).','Bouncing reps without a pause at the top.'],
 breath:'Inhale at the bottom, exhale as you drive up.',vars:['Glute Bridge','Single-Leg Glute Bridge','Hip Thrust Machine','B-stance hip thrust'],acc:['Romanian Deadlift','Bulgarian Split Squat','Cable Glute Kickback']},
legcurl:{n:'Leg Curl',cls:'iso',
 setup:['Line your knee up with the machine’s pivot point.','Pad sits just above the heels/back of the ankles.'],
 cues:['Curl the pad all the way in and squeeze the hamstrings.','Lower slowly (2–3 s) to almost straight.','Keep the hips pressed into the pad/seat.'],
 mistakes:['Hips lifting to cheat the weight up.','Short half reps.','Dropping the weight on the way down.'],
 breath:'Exhale as you curl, inhale as you lower.',vars:['Seated Leg Curl','Lying Leg Curl','Nordic Hamstring Curl','Glute-Ham Raise'],acc:['Romanian Deadlift']},
calf:{n:'Calf Raise',cls:'iso',
 setup:['Balls of the feet on the edge of a step/platform, heels free.','Knees straight for gastrocnemius (standing), bent for soleus (seated).'],
 cues:['Drop into a deep stretch and pause for 1–2 s at the bottom.','Rise as high as you can onto the big toe and hold 1 s.','Slow and controlled — no bouncing.'],
 mistakes:['Bouncing out of the stretch.','Tiny range of motion.','Rolling onto the little toes.'],
 breath:'Steady breathing; exhale on the way up.',vars:['Seated Calf Raise Machine','Standing Calf Raise Machine','Single-leg calf raise'],acc:['Tibialis raise']},
hipiso:{n:'Hip Abduction / Adduction / Kickback',cls:'iso',
 setup:['Adjust the machine or cable so the movement happens only at the hip.','Sit or stand tall, core braced.'],
 cues:['Move under control through the full range you own.','Squeeze for 1 second at the end range.','Lean slightly forward on abduction to bias the upper glutes.'],
 mistakes:['Using momentum.','Turning it into a lower-back movement.'],
 breath:'Exhale on the effort, inhale as you return.',vars:['Cable Hip Abduction','Band Lateral Walk','Glute Kickback Machine'],acc:['Barbell Hip Thrust']},
bench:{n:'Bench Press',cls:'main',
 setup:['Eyes under the bar, feet planted, slight arch with shoulder blades squeezed together and down.','Grip so your forearms are vertical at the bottom (usually just outside shoulder-width).','Unrack with straight arms and bring the bar over your shoulders.'],
 cues:['Bend the bar: think of pulling the bar apart to keep the shoulders tucked.','Lower to the lower chest/sternum with elbows about 45–70° from your torso.','Touch, then press back and up toward your face.','Keep the glutes on the bench and the feet driving into the floor (leg drive).'],
 mistakes:['Flaring the elbows to 90°.','Bouncing the bar off the chest.','Lifting the butt off the bench.','Shoulders rolling forward at lockout.','Wrists bent back.'],
 breath:'Big breath at the top, hold it on the way down and through the press, exhale at lockout.',
 vars:['Incline Barbell Bench Press','Close-Grip Bench Press','Pause bench (1 s on the chest)','Dumbbell Bench Press','Barbell Floor Press'],acc:['Incline Dumbbell Press','Tricep Rope Pushdown','Dumbbell Lateral Raise','Seated Cable Row']},
dbpress:{n:'Dumbbell Press',cls:'comp',
 setup:['Sit with the dumbbells on your knees, lie back and kick them up one at a time.','Shoulder blades back and down, feet planted.'],
 cues:['Lower until the dumbbells are level with your chest and you feel a stretch.','Elbows at about 45° — not flared.','Press up and slightly in; the dumbbells do not need to touch.'],
 mistakes:['Short range of motion.','Dumbbells drifting too wide or too far down toward the belly.','Losing the shoulder-blade position at the top.'],
 breath:'Inhale on the way down, exhale as you press.',vars:['Incline Dumbbell Press','Neutral-grip dumbbell press','Barbell Bench Press'],acc:['Cable Crossover','Tricep Rope Pushdown']},
mpress:{n:'Machine / Smith Press',cls:'comp',
 setup:['Set the seat so the handles line up with mid-chest (or shoulders for presses).','Shoulder blades back against the pad.'],
 cues:['Press smoothly and stop just short of locking out.','Take 2–3 s to lower back to a full stretch.','Keep the shoulders down away from the ears.'],
 mistakes:['Seat too high or too low.','Bouncing at the bottom.','Shoulders rolling forward.'],
 breath:'Exhale as you press, inhale on the return.',vars:['Dumbbell Bench Press','Smith Machine Bench Press','Chest Press Machine'],acc:['Pec Deck','Tricep Bar Pushdown']},
pushup:{n:'Push-Up',cls:'comp',
 setup:['Hands just outside shoulder-width, fingers spread.','Body in a straight line from head to heels, glutes and abs tight.'],
 cues:['Lower your chest to a fist-height from the floor with elbows about 45°.','Screw your hands into the floor to keep the shoulders stable.','Push the floor away and finish with the upper back slightly rounded (protraction).'],
 mistakes:['Hips sagging or piking.','Elbows flared to 90°.','Head dropping forward.','Half reps.'],
 breath:'Inhale down, exhale up.',vars:['Incline Push-Up (easier)','Decline Push-Up (harder)','Diamond Push-Up','Weighted push-up (plate on the back)'],acc:['Chest Dip','Plank']},
dip:{n:'Dip',cls:'comp',
 setup:['Grip the bars, jump up to straight arms, shoulders down.','Lean forward slightly for chest, stay upright for triceps.'],
 cues:['Lower until your shoulders are just below your elbows (or as far as is comfortable).','Keep the shoulders pulled down and back.','Press up to straight arms without shrugging.'],
 mistakes:['Going too deep with rounded shoulders.','Kicking the legs.','Shrugging at the top.'],
 breath:'Inhale down, exhale up.',vars:['Assisted dip / Seated Dip Machine','Weighted dip','Bench Dip'],acc:['Close-Grip Bench Press','Tricep Rope Pushdown']},
fly:{n:'Chest Fly',cls:'iso',
 setup:['Slight bend in the elbows that stays fixed throughout.','Shoulder blades back, chest up.','Cables: handles at the height that matches the angle (high = lower chest, low = upper chest).'],
 cues:['Open wide until you feel a stretch across the chest.','Hug a big tree — bring the hands together in an arc.','Squeeze the chest for a second when the hands meet.'],
 mistakes:['Turning it into a press by bending the elbows.','Going too heavy and losing the stretch.','Shoulders rolling forward at the end.'],
 breath:'Inhale as you open, exhale as you squeeze.',vars:['Pec Deck','Cable Crossover','Dumbbell Fly','Low-to-High Cable Fly'],acc:['Incline Dumbbell Press']},
pullover:{n:'Pullover',cls:'iso',
 setup:['Lie across or along a bench, one dumbbell held over the chest with both hands.','Slight bend in the elbows.'],
 cues:['Lower the weight behind your head in an arc until you feel a stretch in lats and chest.','Pull it back over the chest using the lats, ribs down.'],
 mistakes:['Bending the elbows more and more (turns into a triceps extension).','Over-arching the lower back.'],
 breath:'Inhale as you lower, exhale as you pull over.',vars:['Straight-Arm Pulldown','Cable pullover'],acc:['Lat Pulldown']},
ohp:{n:'Overhead Press',cls:'main',
 setup:['Bar on the front delts, grip just outside shoulders, forearms vertical.','Feet hip-width, glutes and abs squeezed.'],
 cues:['Move your head back slightly and press the bar straight up.','Once it passes your forehead, push your head "through the window".','Finish with the bar over mid-foot, biceps by your ears.','Squeeze glutes so the lower back does not arch.'],
 mistakes:['Leaning back into a standing incline press.','Pressing the bar forward around the face.','Elbows flared out behind the bar at the start.','Using leg drive (that is a push press).'],
 breath:'Breathe and brace at the bottom, press, exhale at the top.',
 vars:['Push Press','Seated Dumbbell Shoulder Press','Landmine Press','Arnold Press'],acc:['Dumbbell Lateral Raise','Face Pull','Tricep Rope Pushdown']},
shpress:{n:'Shoulder Press',cls:'comp',
 setup:['Seat upright, back against the pad (if available).','Start with hands at shoulder height, forearms vertical.'],
 cues:['Press up and slightly in until the arms are almost straight.','Lower under control to chin level or a little lower.','Ribs down — do not arch away from the pad.'],
 mistakes:['Excessive back arch.','Half reps from the top.','Elbows drifting behind the body.'],
 breath:'Exhale as you press, inhale as you lower.',vars:['Overhead Press','Arnold Press','Shoulder Press Machine','Kettlebell Overhead Press'],acc:['Dumbbell Lateral Raise','Bent-Over Rear Delt Fly']},
lateral:{n:'Lateral Raise',cls:'iso',
 setup:['Slight bend in the elbows, slight forward lean.','Cables: pulley at hand height or lower, handle crossing in front or behind the body.'],
 cues:['Lead with the elbows and raise out to the side to shoulder height.','Think "pour the water out" only slightly — keep the thumb roughly level.','Lower over 2–3 s; keep tension at the bottom.'],
 mistakes:['Swinging the weight up with the hips.','Shrugging (traps take over).','Raising far above shoulder height with heavy weight.','Going too heavy — lateral raises respond to clean reps.'],
 breath:'Exhale up, inhale down.',vars:['Cable Lateral Raise','Lateral Raise Machine','Lean-away lateral raise','Band Lateral Raise'],acc:['Face Pull','Overhead Press']},
frontraise:{n:'Front Raise',cls:'iso',
 setup:['Stand tall, weights in front of the thighs, slight elbow bend.'],
 cues:['Raise to eye level in front of you with straight-ish arms.','Lower slowly; no swinging.'],
 mistakes:['Leaning back to swing the weight.','Going too heavy.'],
 breath:'Exhale up, inhale down.',vars:['Cable Front Raise','Plate front raise'],acc:['Dumbbell Lateral Raise']},
rear:{n:'Rear Delt / Face Pull',cls:'iso',
 setup:['Face pulls: rope at upper-chest to face height, thumbs toward you.','Flyes: chest supported or hinged forward with a flat back.'],
 cues:['Pull the hands wide and back — think "show your biceps" at the end.','Keep the shoulders down; move from the shoulder joint, not the lower back.','Pause and squeeze the back of the shoulders.'],
 mistakes:['Using too much weight and rowing with the upper back.','Shrugging.','Swinging the torso.'],
 breath:'Exhale as you pull, inhale as you return.',vars:['Face Pull','Reverse Pec Deck','Cable Rear Delt Fly','Band Pull-Apart'],acc:['Dumbbell Lateral Raise','Seated Cable Row']},
upright:{n:'Upright Row',cls:'comp',
 setup:['Grip about shoulder-width or slightly wider (narrow grips stress the shoulders).'],
 cues:['Lead with the elbows, pull up to lower-chest height.','Elbows stay higher than the hands.','Stop where it feels comfortable for your shoulders.'],
 mistakes:['Grip too narrow.','Pulling too high with internal rotation if it pinches.'],
 breath:'Exhale up, inhale down.',vars:['Cable Upright Row','Dumbbell Lateral Raise'],acc:['Barbell Shrug']},
shrug:{n:'Shrug',cls:'iso',
 setup:['Stand tall holding the weight at arm’s length; straps help when grip limits you.'],
 cues:['Lift the shoulders straight up toward the ears.','Pause 1–2 s at the top, lower fully.','Arms stay long — do not bend the elbows.'],
 mistakes:['Rolling the shoulders (no benefit).','Tiny bouncing reps with too much weight.'],
 breath:'Exhale up, inhale down.',vars:['Dumbbell Shrug','Smith Machine Shrug','Farmer\'s Walk'],acc:['Face Pull']},
pullup:{n:'Pull-Up / Chin-Up',cls:'comp',
 setup:['Grip just outside shoulder-width (pull-up, palms away) or shoulder-width (chin-up, palms toward you).','Start from a dead hang with straight arms.'],
 cues:['Start by pulling the shoulder blades down ("put them in your back pockets").','Drive the elbows down toward your ribs and pull your chest to the bar.','Lower all the way to straight arms with control.','Keep legs still — slightly in front, glutes squeezed.'],
 mistakes:['Kipping or swinging.','Half reps without full extension.','Craning the chin over the bar instead of pulling the chest up.'],
 breath:'Exhale as you pull up, inhale on the way down.',vars:['Assisted Pull-Up Machine / band assistance','Negative (slow lowering) reps','Chin-Up','Weighted pull-up'],acc:['Lat Pulldown','Face Pull','Dumbbell Curl']},
pulldown:{n:'Lat Pulldown',cls:'comp',
 setup:['Thigh pad tight on your legs, grip a little wider than shoulders (or the handle of choice).','Lean back slightly (10–20°), chest up.'],
 cues:['Pull the elbows down and back toward your hips.','Bring the bar/handle to the upper chest.','Let the arms go fully straight at the top to stretch the lats.','Control the return — 2 s up.'],
 mistakes:['Leaning way back and rowing it.','Pulling behind the neck.','Using momentum from the torso.','Not reaching full stretch at the top.'],
 breath:'Exhale as you pull, inhale as the bar rises.',vars:['Close-Grip Lat Pulldown','Single-Arm Lat Pulldown','Pull-Up','Straight-Arm Pulldown'],acc:['Seated Cable Row','Face Pull']},
row:{n:'Row',cls:'comp',
 setup:['Brace with a flat back — hinge to ~45° or lower for bent-over rows, chest on the pad for supported rows.','Let the weight hang with long arms and shoulder blades stretched forward.'],
 cues:['Pull the elbows back toward your hips, not your shoulders.','Squeeze the shoulder blades together at the top for a beat.','Lower to a full stretch every rep.','Torso stays still — no jerking.'],
 mistakes:['Using body English to swing the weight up.','Rounding the lower back.','Shrugging the shoulders to the ears.','Cutting the stretch at the bottom.'],
 breath:'Exhale as you row, inhale as you lower.',vars:['Chest-Supported Dumbbell Row','Seated Cable Row','Barbell Row','One-Arm Dumbbell Row','T-Bar Row'],acc:['Lat Pulldown','Face Pull','Hammer Curl']},
backext:{n:'Back Extension',cls:'iso',
 setup:['Hip pad just below the hip crease so you can hinge freely.','Arms crossed on the chest (hold a plate to add load).'],
 cues:['Hinge down with a neutral spine until you feel the hamstrings stretch.','Rise by squeezing the glutes until your body is in a straight line.','Do not hyper-extend at the top.'],
 mistakes:['Over-arching at the top.','Swinging fast.'],
 breath:'Inhale down, exhale up.',vars:['45° back extension','Reverse hyperextension','Good Morning'],acc:['Romanian Deadlift']},
curl:{n:'Biceps Curl',cls:'iso',
 setup:['Stand or sit tall, elbows by your sides, shoulders back.','Grip just outside your hips for barbell curls.'],
 cues:['Curl by bending only at the elbow — upper arms stay still.','Squeeze at the top, then lower over 2–3 s.','Get to a full stretch at the bottom each rep.'],
 mistakes:['Swinging the torso.','Elbows drifting forward to make it easier.','Half reps.','Dropping the weight on the way down.'],
 breath:'Exhale as you curl, inhale as you lower.',vars:['Incline Dumbbell Curl','Hammer Curl','EZ-Bar Preacher Curl','Bayesian Cable Curl'],acc:['Hammer Curl','Reverse EZ-Bar Curl']},
pushdown:{n:'Triceps Pushdown',cls:'iso',
 setup:['Pulley high, stand close with a slight forward lean.','Elbows tucked to your sides.'],
 cues:['Push down until the arms are fully straight; squeeze the triceps.','Elbows stay pinned — only the forearms move.','Control the weight back up to about 90° or a bit more.'],
 mistakes:['Elbows flaring or drifting forward.','Using the body weight to push down.','Short reps.'],
 breath:'Exhale as you push, inhale on the way up.',vars:['Tricep Rope Pushdown','Single-Arm Cable Pushdown','Overhead Cable Tricep Extension'],acc:['Close-Grip Bench Press']},
triext:{n:'Triceps Extension',cls:'iso',
 setup:['Upper arms stay still and point up (lying) or overhead (overhead extensions).'],
 cues:['Lower the weight behind your head or to your forehead by bending at the elbows.','Get a deep stretch — overhead work trains the long head.','Extend fully and squeeze.'],
 mistakes:['Elbows flaring way out.','Moving the upper arms so it becomes a press or pullover.','Going too heavy and hurting the elbows.'],
 breath:'Inhale down, exhale as you extend.',vars:['Skull Crusher','Overhead Cable Tricep Extension','Dumbbell Kickback'],acc:['Tricep Rope Pushdown','Close-Grip Bench Press']},
cgbench:{n:'Close-Grip Press',cls:'comp',
 setup:['Grip about shoulder-width (not super narrow).','Same setup as bench: shoulder blades pinched, feet planted.'],
 cues:['Elbows tucked close to the body.','Touch the lower chest, press up to lockout using the triceps.'],
 mistakes:['Grip too narrow (wrist pain).','Elbows flaring out.'],
 breath:'Inhale down, exhale at lockout.',vars:['JM Press','Diamond Push-Up','Barbell Bench Press'],acc:['Tricep Rope Pushdown']},
forearm:{n:'Forearm / Grip',cls:'iso',
 setup:['Forearms supported on your thighs or a bench, wrists over the edge.'],
 cues:['Move only at the wrist through the full range.','Slow, controlled reps; high reps work well.'],
 mistakes:['Using the whole arm.','Partial range of motion.'],
 breath:'Breathe steadily.',vars:['Farmer\'s Walk','Plate Pinch','Dead Hang','Wrist Roller'],acc:['Hammer Curl']},
carry:{n:'Loaded Carry',cls:'comp',
 setup:['Deadlift the weights up with a flat back.','Stand tall, shoulders back and down.'],
 cues:['Walk with short, quick steps.','Squeeze the handles hard and keep the ribs down.','Do not let the weights swing or tilt you sideways.'],
 mistakes:['Leaning or shrugging.','Rounding the back when picking up or putting down.'],
 breath:'Short controlled breaths behind a braced core.',vars:['Suitcase carry (one side)','Trap bar carry','Overhead carry'],acc:['Deadlift','Barbell Shrug']},
plank:{n:'Plank / Hold',cls:'core',
 setup:['Elbows under the shoulders, body in a straight line.'],
 cues:['Squeeze glutes and pull the ribs toward the hips (slight posterior tilt).','Push the floor away with the forearms.','Hold a perfect position — stop the set when it breaks.'],
 mistakes:['Hips sagging or piking up.','Holding the breath.','Looking up.'],
 breath:'Breathe slowly behind a braced core.',vars:['Side Plank','Weighted plank','RKC plank (max tension, shorter)','Ab Wheel Rollout'],acc:['Dead Bug','Pallof Press']},
crunch:{n:'Crunch / Sit-Up',cls:'core',
 setup:['Lie on your back, knees bent (or on the cable/machine set-up), hands lightly by the head or holding the attachment.'],
 cues:['Curl the ribcage toward the pelvis — think "roll up", not "sit up".','Pause and squeeze at the top.','Lower slowly.'],
 mistakes:['Pulling on the neck.','Using hip flexors to yank up.','Rushing reps.'],
 breath:'Exhale hard as you crunch, inhale as you return.',vars:['Cable Crunch','Decline Sit-Up','Ab Crunch Machine'],acc:['Hanging Leg Raise','Plank']},
legraise:{n:'Leg / Knee Raise',cls:'core',
 setup:['Hang from a bar, sit in a captain’s chair or lie flat with hands under the hips.'],
 cues:['Tilt the pelvis up and curl the hips toward the ribs at the top.','Control the lowering — no swinging.','Bent knees = easier; straight legs = harder.'],
 mistakes:['Swinging with momentum.','Only lifting the legs with hip flexors (no pelvic curl).','Arching the lower back (lying versions).'],
 breath:'Exhale as you raise, inhale as you lower.',vars:['Hanging Knee Raise','Hanging Leg Raise','Lying Leg Raise','Toes-to-bar'],acc:['Cable Crunch']},
rollout:{n:'Rollout',cls:'core',
 setup:['Kneel holding the wheel/bar under the shoulders.'],
 cues:['Roll forward while keeping the ribs down and glutes squeezed.','Go only as far as you can without the lower back sagging.','Pull back with the abs and lats.'],
 mistakes:['Lower back arching.','Hips staying high and bent.'],
 breath:'Inhale out, exhale back.',vars:['Kneeling partial rollout','Standing rollout','Plank'],acc:['Hanging Leg Raise']},
rotation:{n:'Rotation / Anti-Rotation',cls:'core',
 setup:['Stand side-on to the cable/band with feet shoulder-width, or sit for twists.'],
 cues:['Brace the core and rotate from the upper back, not the lower back.','Anti-rotation (Pallof): press out and resist the twist for 1–2 s.','Smooth, controlled reps.'],
 mistakes:['Twisting fast from the lower back.','Using the arms instead of the trunk.'],
 breath:'Exhale through the effort.',vars:['Pallof Press','Cable Woodchopper','Landmine Rotation','Russian Twist'],acc:['Side Plank']},
olympic:{n:'Olympic Lift',cls:'power',
 setup:['Learn with an empty bar or a PVC pipe first; consider coaching.','Start position like a deadlift but hips a little lower and shoulders over the bar.'],
 cues:['First pull slow and controlled to the knee.','Explode with the legs and hips — jump — then pull yourself under the bar.','Fast elbows into the catch; land in a solid front rack or overhead position.','Every rep resets from the start.'],
 mistakes:['Pulling early with the arms.','Bar swinging away from the body.','Catching with soft elbows or a rounded back.'],
 breath:'Breathe and brace before each rep; exhale after the catch.',vars:['Hang Clean','Power Clean','Clean pull','Snatch pull'],acc:['Front Squat','Push Press','Deadlift']},
kbswing:{n:'Kettlebell Ballistic',cls:'power',
 setup:['Bell about a foot in front of you, feet a bit wider than hips.','Hike the bell back between your legs like a football snap.'],
 cues:['It is a hip hinge, not a squat — snap the hips forward.','Arms are ropes; the hips float the bell to chest height.','Squeeze glutes and abs at the top (vertical plank).'],
 mistakes:['Squatting the swing.','Lifting with the arms/shoulders.','Over-arching at the top.'],
 breath:'Sharp exhale at the top of each rep, inhale on the backswing.',vars:['Two-hand swing','One-arm swing','Kettlebell Snatch'],acc:['Romanian Deadlift','Barbell Hip Thrust']},
tgu:{n:'Turkish Get-Up',cls:'comp',
 setup:['Lie down with the bell pressed up in one hand, same-side knee bent.'],
 cues:['Eyes on the bell the whole time.','Move step by step: elbow, hand, hips up, sweep the leg, kneel, stand — then reverse.','Arm stays locked vertical.'],
 mistakes:['Rushing the steps.','Letting the arm drift.'],
 breath:'Breathe at each position.',vars:['Half get-up'],acc:['Kettlebell Overhead Press']},
plyo:{n:'Plyometric',cls:'plyo',
 setup:['Warm up thoroughly; jump on a forgiving surface.','Start with low boxes/heights.'],
 cues:['Land softly and quietly with knees tracking over toes.','Quality over quantity — stop sets before you slow down.','Reset between reps for maximal power.'],
 mistakes:['Landing stiff-legged.','Knees caving on landing.','Doing them fatigued.'],
 breath:'Exhale on the explosive effort.',vars:['Box jump','Broad jump','Jump Squat'],acc:['Barbell Back Squat']},
sled:{n:'Sled / Strongman',cls:'power',
 setup:['Load conservatively; clear path.','Low body angle for pushes, tall posture for drags.'],
 cues:['Drive with short powerful steps.','Keep the core braced and back flat.'],
 mistakes:['Rounding the back.','Overloading so you cannot move fast.'],
 breath:'Rhythmic breathing; exhale with each drive.',vars:['Sled Push','Sled Pull','Farmer\'s Walk'],acc:['Barbell Back Squat']},
cardio:{n:'Cardio',cls:'cardio',
 setup:['Adjust seat/handles to fit you; start with 3–5 min easy.'],
 cues:['Most sessions should be conversational (zone 2).','1–2 harder interval sessions per week are plenty.','Keep a tall posture and relaxed shoulders.'],
 mistakes:['Going hard every session.','Holding onto the rails (treadmill/stairs).'],
 breath:'Rhythmic nasal breathing for easy work; you should be able to talk in short sentences.',vars:['Intervals (e.g. 8×30 s hard / 90 s easy)','Long easy session'],acc:[]},
stretch:{n:'Stretch / Mobility',cls:'stretch',
 setup:['Warm up first; move into the stretch slowly.'],
 cues:['Hold 20–60 s and breathe slowly.','Mild tension, never sharp pain.','Relax into the position on each exhale.'],
 mistakes:['Bouncing.','Holding the breath.','Forcing range.'],
 breath:'Slow, deep breaths; go a little further on each exhale.',vars:[],acc:[]},
neck:{n:'Neck',cls:'iso',
 setup:['Start light; neck training responds to slow, controlled reps.'],
 cues:['Move slowly through a comfortable range.','Never jerk the head.'],
 mistakes:['Going heavy too soon.'],breath:'Breathe steadily.',vars:[],acc:['Barbell Shrug']},
generic:{n:'Strength exercise',cls:'comp',
 setup:['Set the equipment up so you can move through a full, comfortable range.'],
 cues:['Control the lowering phase (2–3 s).','Use the full range of motion you own.','Keep the core braced and the working muscle under tension.'],
 mistakes:['Using momentum.','Cutting range of motion as it gets heavy.'],
 breath:'Exhale on the effort, inhale on the return.',vars:[],acc:[]}
};
const PATRULES=[
 [/stretch|smr|circles|childs pose|cat stretch|^upward|looking at ceiling|hug knees|knee across|groiners|inchworm|worlds greatest|spinal|dancers|pyramid/, 'stretch'],
 [/neck/, 'neck'],
 [/turkish/, 'tgu'],
 [/swing|kettlebell snatch|pass between|figure 8|pirate/, 'kbswing'],
 [/\bclean\b|snatch|jerk|high pull|muscle snatch|split clean/, 'olympic'],
 [/sled|tire flip|atlas|keg|log lift|yoke|rickshaw|car (deadlift|drivers)|circus|conan|sandbag|prowler|bear crawl/, 'sled'],
 [/farmer|carry|suitcase/, 'carry'],
 [/front.*squat|zercher|overhead squat/, 'fsquat'],
 [/goblet|plie|dumbbell squat|kettlebell squat/, 'gsquat'],
 [/leg press|hack squat|pendulum|v-squat|belt squat|machine squat|lying machine squat/, 'mquad'],
 [/lunge|split squat|step.?up|pistol|single-leg.*squat|skater/, 'lunge'],
 [/sissy|leg extension/, 'legext'],
 [/squat/, 'squat'],
 [/romanian|stiff|good morning|single-leg.*deadlift|one-legged deadlift|pull.?through|hinge/, 'rdl'],
 [/deadlift|rack pull/, 'hinge'],
 [/hip thrust|glute bridge|bridge|hip raise|butt lift/, 'hipthrust'],
 [/leg curl|hamstring curl|nordic|glute.?ham/, 'legcurl'],
 [/calf|calves/, 'calf'],
 [/abduct|adduct|kickback.*(glute|cable)|glute kickback|lateral walk|monster walk|donkey kick/, 'hipiso'],
 [/close-grip.*(bench|press)|jm press/, 'cgbench'],
 [/push-?up|pushup/, 'pushup'],
 [/\bdips?\b|dip machine/, 'dip'],
 [/rear delt|reverse fly|reverse pec|face pull|pull.?apart|reverse machine fl/, 'rear'],
 [/fly|flye|crossover|pec deck|butterfly|iron cross/, 'fly'],
 [/pullover/, 'pullover'],
 [/overhead press|military|push press|landmine press|bradford/, 'ohp'],
 [/shoulder press|arnold|seated.*press.*(dumbbell|kettlebell)|kettlebell.*press|dumbbell press$|standing dumbbell press|handstand|pike push/, 'shpress'],
 [/(bench|chest|floor|incline|decline).*press|press.*(bench|chest)|svend/, 'benchsel'],
 [/lateral raise|side lateral|deltoid raise|lateral/, 'lateral'],
 [/front.*raise|plate raise/, 'frontraise'],
 [/upright row/, 'upright'],
 [/shrug/, 'shrug'],
 [/pull-?up|chin|muscle.?up|rope climb/, 'pullup'],
 [/pulldown|pull-down/, 'pulldown'],
 [/row/, 'row'],
 [/hyperextension|back extension|superman|reverse hyper|lower back curl/, 'backext'],
 [/pushdown|push-down/, 'pushdown'],
 [/triceps?|skull|kickback|tate press/, 'triext'],
 [/wrist|forearm|finger|plate pinch|pinch|grip|wrist roller|hang\b/, 'forearm'],
 [/curl/, 'curl'],
 [/plank|hollow|side bridge|hold|wall sit|vacuum/, 'plank'],
 [/rollout|ab wheel|ab roller|fallout/, 'rollout'],
 [/leg raise|knee raise|knee.*hip raise|pull-in|tuck|flutter|scissor|v-up|jackknife|captain/, 'legraise'],
 [/crunch|sit-?up|toe touch|heel touch/, 'crunch'],
 [/twist|chop|pallof|rotation|side bend|windmill|landmine 180|wipers/, 'rotation']
];
function patternOf(ex){if(ex._pat)return ex._pat;const n=(ex.name||'').toLowerCase();let k=null;
  if(ex.type==='cardio'||ex.cat==='cardio')k='cardio';else if(ex.cat==='stretch'||ex.equip==='foamroll')k='stretch';
  else if(ex.cat==='plyo'&&!/push|press/.test(n))k='plyo';
  if(!k)for(const [re,p] of PATRULES)if(re.test(n)){k=p;break}
  if(k==='benchsel')k=(ex.equip==='dumbbell'||ex.equip==='kettlebell')?'dbpress':(ex.equip==='machine'||ex.equip==='smith'||ex.equip==='cable')?'mpress':'bench';
  if(k==='squat'&&(ex.equip==='bodyweight'||ex.equip==='bands'))k='gsquat';
  if(k==='squat'&&(ex.equip==='machine'||ex.equip==='smith'))k='mquad';
  if(k==='ohp'&&ex.equip!=='barbell')k='shpress';
  if(k==='hinge'&&['dumbbell','kettlebell','bands'].includes(ex.equip))k='rdl';
  if(!k){const byM={chest:'dbpress',back:'row',shoulders:'shpress',traps:'shrug',biceps:'curl',triceps:'triext',forearms:'forearm',core:'crunch',quads:'lunge',hamstrings:'legcurl',glutes:'hipthrust',adductors:'hipiso',calves:'calf',cardio:'cardio'};k=byM[ex.muscle]||'generic'}
  try{Object.defineProperty(ex,'_pat',{value:k,enumerable:false,configurable:true})}catch(e){}return k}
const EQSETUP={barbell:'Barbell: set the J-hooks/safety pins at the right height and put collars on.',smith:'Smith machine: set the bar height and the safety stops before you load it; the fixed path means foot position matters — test it empty.',dumbbell:'Dumbbells: pick them up from the rack with a flat back and get into position before the first rep.',machine:'Machine: adjust the seat and pads so the joint you are training lines up with the machine’s pivot point. Note the settings in the exercise note.',cable:'Cable: set the pulley height and attachment first; take a step away from the stack so the weight never rests between reps.',kettlebell:'Kettlebell: clean or pick up the bell with a neutral spine.',bands:'Bands: anchor the band securely at the right height and check it for nicks before use.',ezbar:'EZ bar: use the angled grip that is comfortable for your wrists.'};
// weight increments per equipment (in kg / lb), used by the progression engine
function incFor(ex){const p=patternOf(ex),lower=['squat','fsquat','hinge','rdl','hipthrust','mquad','lunge','gsquat'].includes(p);const lb=isLb();
  switch(ex.equip){
    case 'barbell':case 'smith':case 'ezbar':return lb?(lower?10:5):(lower?5:2.5);
    case 'dumbbell':return lb?5:2;
    case 'kettlebell':return lb?9:4;
    case 'machine':return lb?(lower?10:5):(lower?5:2.5);
    case 'cable':return lb?5:2.5;
    default:return lb?5:2.5}}
function roundStep(ex){const lb=isLb();switch(ex.equip){case 'dumbbell':return lb?5:1;case 'kettlebell':return lb?1:2;case 'cable':case 'machine':return lb?2.5:1.25;case 'barbell':case 'smith':case 'ezbar':return lb?5:2.5;default:return lb?2.5:1.25}}
function coachFor(ex){const k=patternOf(ex),P=PAT[k]||PAT.generic;
  const steps=ex.steps&&ex.steps.length?ex.steps:[...P.setup,...P.cues.slice(0,3)];
  const setup=[...P.setup];if(EQSETUP[ex.equip])setup.push(EQSETUP[ex.equip]);
  return {k,P,steps,setup,cues:P.cues,mistakes:P.mistakes,breath:P.breath,vars:P.vars.filter(v=>v!==ex.name),acc:P.acc.filter(v=>v!==ex.name)}}

/* ---- smart.js ---- */
/* ================= smart engine: progression, warm-ups, plateaus, recovery, programs, insights ================= */
const clsOf=ex=>(PAT[patternOf(ex)]||PAT.generic).cls;
const GOALS={strength:'Get stronger',muscle:'Build muscle',general:'General fitness'};
const goal=()=>(D.profile&&D.profile.goal)||'muscle';
function repRange(ex,e){const t=e&&e.target;if(t){const hi=e.hi||(t<=5?t:t>=12?t+3:t+2);return [t,Math.max(t,hi)]}
  const c=clsOf(ex),g=goal();
  const tbl={strength:{main:[3,5],comp:[6,8],iso:[8,12],core:[10,15],power:[2,4],plyo:[3,5]},muscle:{main:[6,8],comp:[8,12],iso:[10,15],core:[10,15],power:[3,5],plyo:[5,8]},general:{main:[6,10],comp:[8,12],iso:[12,15],core:[12,20],power:[3,5],plyo:[5,8]}};
  if(ex.type==='bw')return c==='core'?[10,20]:[6,12];
  return (tbl[g]||tbl.muscle)[c]||[8,12]}
const workSets=e=>e.sets.filter(s=>s.done&&s.t!=='w'&&s.t!=='d');
function histFor(exId,w){const H=idx().hist[exId]||[];return H.filter(x=>x.w.id!==(w&&w.id)&&x.w.start<((w&&w.start)||Date.now()+1)&&workSets(x.e).length)}
function roundW(ex,kg,dir){const st=roundStep(ex);let d=toW(kg)/st;d=dir>0?Math.ceil(d-1e-6):dir<0?Math.floor(d+1e-6):Math.round(d);return fromW(Math.max(0,d*st))}
const wTxt=kg=>fmtN(toW(kg),2)+' '+wU();
const repsTxt=a=>{const u=[...new Set(a)];return u.length===1?`${a.length}×${u[0]}`:a.join(', ')};
function recommend(exId,w,e){const ex=EX(exId),H=histFor(exId,w),last=H[H.length-1],prev=H[H.length-2];
  const n=e?Math.max(1,e.sets.filter(s=>s.t!=='w').length):3;const [lo,hi]=repRange(ex,e);const R={lo,hi,n,kind:'new',sets:[],why:'',ex};
  const range=lo===hi?`${lo} reps`:`${lo}–${hi} reps`;
  if(ex.type==='cardio'){if(!last){R.why='First session: go by feel — keep most cardio at a pace where you can still talk.';return R}
    const m=sessMetrics(last.e);R.kind='hold';const s={};if(m.min)s.min=Math.round(m.min);if(m.dist)s.dist=+(m.dist*1.03).toFixed(2);R.sets=[s];
    R.why=`Last time: ${m.min?fmtN(m.min,0)+' min':''}${m.dist?' · '+fmtN(toD(m.dist),2)+' '+dU():''}. Match the time and try to cover ~3% more distance${m.dist?` (${fmtN(toD(m.dist*1.03),2)} ${dU()})`:''}.`;return R}
  if(ex.type==='dur'){if(!last){R.why='First time: hold with perfect form and stop when the position breaks. Log the seconds.';R.sets=[{sec:30}];return R}
    const best=Math.max(...workSets(last.e).map(s=>s.sec||0));const tgt=best+5;R.kind='up';R.sets=[{sec:tgt}];
    R.why=`Best hold last time: ${fmtSec(best)}. Aim for ${fmtSec(tgt)} on each set.${best>=60?' Past 60 s, a harder variation or added load builds more strength than longer holds.':''}`;return R}
  if(!last){R.sets=[{r:lo}];R.why=ex.type==='bw'?`First time: do ${range} per set with clean form, stopping 1–2 reps before failure. Next time I’ll set your targets.`:`First time: pick a weight you could lift about ${hi+3} times and do ${n}×${range}, leaving 1–3 reps in the tank. Next session I’ll tell you exactly what to lift.`;return R}
  const ws=workSets(last.e),topW=Math.max(...ws.map(s=>s.w||0));
  if(ex.type==='bw'&&topW<=0){const reps=ws.map(s=>s.r||0);
    if(reps.every(r=>r>=hi)&&['pullup','dip','pushup','lunge','hipthrust','legraise'].includes(patternOf(ex))){const inc=isLb()?5:2.5;R.kind='up';R.sets=[{w:fromW(inc),r:lo}];
      R.why=`You hit ${repsTxt(reps)} last time — the top of the ${range} range. Add ${inc} ${wU()} (belt, vest or a dumbbell) and go back to ${lo} reps, or move to a harder variation.`;return R}
    R.kind='hold';R.sets=reps.slice(0,n).map(r=>({r:Math.min(hi+5,r+1)}));while(R.sets.length<n)R.sets.push({r:R.sets[R.sets.length-1].r});
    R.why=`Last time: ${repsTxt(reps)}. Beat it by one rep per set → ${repsTxt(R.sets.map(s=>s.r))}.`;return R}
  if(topW<=0){R.sets=[{r:lo}];R.why=`No weight was logged last time. Pick a weight for ${range} and log it so I can progress you.`;return R}
  const top=ws.filter(s=>Math.abs((s.w||0)-topW)<0.01),topR=top.map(s=>s.r||0);const inc=ex.type==='bw'?(isLb()?5:2.5):incFor(ex);
  if(topR.every(r=>r>=hi)){const nw=fromW(toW(topW)+inc);const nwR=roundW(ex,nw,1);R.kind='up';R.sets=[{w:nwR,r:lo}];
    R.why=`You hit ${repsTxt(topR)} at ${wTxt(topW)} last time — the top of your ${range} range. Go up ${fmtN(toW(nwR)-toW(topW),2)} ${wU()} to ${wTxt(nwR)} and aim for ${n}×${lo}.`}
  else{const pTop=prev?workSets(prev.e).filter(s=>Math.abs((s.w||0)-topW)<0.01):[];
    if(Math.max(...topR)<lo&&pTop.length&&Math.max(...pTop.map(s=>s.r||0))<lo){const nw=roundW(ex,topW*0.9,-1);R.kind='deload';R.sets=[{w:nw,r:hi}];
      R.why=`Two sessions in a row below ${lo} reps at ${wTxt(topW)}. Deload 10% to ${wTxt(nw)}, own every rep with perfect form, and build back up — you’ll pass your old best within a few weeks.`}
    else{R.kind='hold';R.sets=Array.from({length:n},(_,i)=>{const r=topR[i]!=null?topR[i]:topR[topR.length-1];return {w:topW,r:Math.min(hi,Math.max(lo,r+1))}});
      R.why=`Last time: ${wTxt(topW)} × ${topR.join(', ')}. Stay at ${wTxt(topW)} and add a rep where you can → ${R.sets.map(s=>s.r).join(', ')}. When every set reaches ${hi}, the weight goes up.`}}
  return R}
// warm-ups: heavy barbell/smith and heavy machine compounds
function barKg(ex){return ex.equip==='ezbar'?(isLb()?fromW(25):10):isLb()?fromW(D.settings.barLb||45):(D.settings.barKg||20)}
function platesTxt(totKg,barK){const u=isLb()?'lb':'kg';let rem=(toW(totKg)-toW(barK))/2;if(rem<0.01)return 'bar';const per=[];for(const p of PLATES[u]){while(rem>=p-1e-6){per.push(p);rem=r2(rem-p)}}return per.join('+')+'/side'}
function warmupPlan(ex,topKg){if(!topKg)return [];const c=clsOf(ex),bar=['barbell','smith','ezbar'].includes(ex.equip);
  if(bar&&(c==='main'||c==='comp')){const b=barKg(ex);if(topKg<b*1.4)return [];const big=toW(topKg)>=(isLb()?135:60);const steps=big?[[0,10],[.4,5],[.6,3],[.8,2]]:[[0,10],[.6,5],[.8,3]];const out=[];
    for(const [f,r] of steps){const w=f?roundW(ex,topKg*f,0):b;if(w<b-1e-6||w>=topKg-1e-6)continue;if(out.length&&w<=out[out.length-1].w+1e-6)continue;out.push({w,r,pl:ex.equip==='barbell'?platesTxt(w,b):''})}return out}
  if((ex.equip==='machine'||ex.equip==='cable')&&(c==='main'||c==='comp')&&toW(topKg)>=(isLb()?90:40))return [{w:roundW(ex,topKg*.5,0),r:10},{w:roundW(ex,topKg*.75,0),r:5}];
  return []}
function applyRec(e,w,opts={}){const ex=EX(e.exId);if(!D.settings.autoRec&&!opts.force){return}
  const R=recommend(e.exId,w,e);e.why=R.why;e.recKind=R.kind;e.lo=R.lo;e.hi=R.hi;let k=0;
  for(const s of e.sets){if(s.t==='w')continue;const r=R.sets[Math.min(k,R.sets.length-1)];if(r)s.rec=Object.assign({},r);k++}
  const pl=plateau(e.exId);e.plateau=pl?pl.short:null;
  const topKg=R.sets.length&&R.sets[0].w;if(ex.type==='wr'&&topKg&&(D.settings.autoWarm||opts.warm)&&!e.sets.some(s=>s.done)){const plan=warmupPlan(ex,topKg);
    if(plan.length){e.sets=e.sets.filter(s=>s.t!=='w'||s.done||hasVal(s));if(!e.sets.some(s=>s.t==='w')){e.sets.unshift(...plan.map(p=>Object.assign(newSet('w'),{rec:{w:p.w,r:p.r}})));e.warm=plan.map(p=>`${fmtN(toW(p.w),2)}×${p.r}${p.pl?` (${p.pl})`:''}`).join(' · ')}}}}
function addWarmups(e,w){const ex=EX(e.exId);const top=Math.max(0,...e.sets.filter(s=>s.t!=='w').map(s=>s.w||(s.rec&&s.rec.w)||0));if(!top){toast('Enter or get a recommended working weight first');return false}
  const plan=warmupPlan(ex,top);const list=plan.length?plan:[{w:roundW(ex,top*.5,0),r:8},{w:roundW(ex,top*.75,0),r:4}];
  e.sets=e.sets.filter(s=>s.t!=='w'||s.done);e.sets.unshift(...list.map(p=>Object.assign(newSet('w'),{rec:{w:p.w,r:p.r}})));e.warm=list.map(p=>`${fmtN(toW(p.w),2)}×${p.r}${p.pl?` (${p.pl})`:''}`).join(' · ');return true}
// plateau: no new best e1RM for 3+ weeks while still training it
function plateau(exId){const ex=EX(exId);if(ex.type!=='wr')return null;const H=(idx().hist[exId]||[]).filter(h=>h.m.e1rm>0);if(H.length<4)return null;
  let bv=0,bt=0;for(const h of H)if(h.m.e1rm>bv+1e-6){bv=h.m.e1rm;bt=h.w.start}
  const last=H[H.length-1];if(Date.now()-last.w.start>21*DAY)return null;const since=H.filter(h=>h.w.start>bt).length;const days=(last.w.start-bt)/DAY;
  if(days<21||since<3)return null;const wk=Math.floor((Date.now()-bt)/(7*DAY));const c=coachFor(ex);const v=c.vars.slice(0,2).join(' or ');
  const short=`No new e1RM best in ${wk} weeks (${since} sessions).`;
  const tips=[`Deload: one week at ~85% of your working weight, then build back up.`,`Change the rep range for 4–6 weeks (e.g. ${clsOf(ex)==='iso'?'15–20':'4–6 instead of 8–12, or vice versa'}).`,v?`Swap to a variation for a block: ${v}.`:null,'Check sleep, protein (≈1.6–2.2 g/kg/day) and total weekly sets for this muscle.'].filter(Boolean);
  return {wk,since,best:bv,short,tips}}
/* ---------- recovery ---------- */
const RHRS={quadriceps:72,hamstrings:72,glutes:72,'lower back':72,chest:72,lats:72,'middle back':72,shoulders:48,traps:48,triceps:48,biceps:48,adductors:48,abductors:48,calves:36,forearms:36,abdominals:36,neck:36};
const DETN={quadriceps:'Quads',hamstrings:'Hamstrings',glutes:'Glutes','lower back':'Lower back',chest:'Chest',lats:'Lats','middle back':'Upper back',shoulders:'Shoulders',traps:'Traps',triceps:'Triceps',biceps:'Biceps',adductors:'Adductors',abductors:'Abductors',calves:'Calves',forearms:'Forearms',abdominals:'Abs',neck:'Neck'};
function muscleLoad(now){const L={};const ws=D.workouts.concat(D.active?[D.active]:[]);
  for(const w of ws){const hrs=(now-w.start)/36e5;if(hrs<0||hrs>80)continue;for(const e of w.exercises){const ex=EX(e.exId);const n=e.sets.filter(isWork).length*(ex.type==='cardio'?.4:1);if(!n)continue;
    const add=(m,f)=>{const H=RHRS[m]||48;const d=Math.max(0,1-hrs/H);if(d>0)L[m]=(L[m]||0)+n*f*d};primOf(ex).forEach(m=>add(m,1));secOf(ex).forEach(m=>add(m,.5))}}return L}
function recovery(now=Date.now()){const L=muscleLoad(now),P={};for(const m in RHRS)P[m]=Math.round(Math.max(0,Math.min(100,100-(L[m]||0)*8)));return P}
const recCol=p=>p<40?'#ff5a5f':p<75?'#ffb020':'#3ddc84';
function readyIn(m){for(let h=2;h<=96;h+=2){const p=Math.max(0,100-(muscleLoad(Date.now()+h*36e5)[m]||0)*8);if(p>=75)return h}return 96}
/* ---------- body diagram ---------- */
const BODY={
 front:{c:[['neck','<rect x="45.5" y="20" width="9" height="7" rx="2"/>'],['abdominals','<rect x="42.5" y="47" width="15" height="31" rx="5"/>']],
  l:[['traps','<path d="M45 25 L37 30.5 L45 30 Z"/>'],['shoulders','<ellipse cx="32" cy="35" rx="7.5" ry="7"/>'],['chest','<path d="M37.5 30 Q47 28.5 49.4 30.5 L49.4 44.5 Q43 48 37.5 44 Q35.5 37 37.5 30 Z"/>'],['biceps','<ellipse cx="28" cy="51" rx="4.8" ry="10" transform="rotate(10 28 51)"/>'],['forearms','<ellipse cx="23.5" cy="71.5" rx="4.3" ry="11" transform="rotate(12 23.5 71.5)"/>'],['abdominals','<ellipse cx="38.6" cy="62" rx="3.4" ry="12"/>'],['abductors','<ellipse cx="35.8" cy="85" rx="3.8" ry="7"/>'],['adductors','<ellipse cx="46.8" cy="98" rx="3.2" ry="11"/>'],['quadriceps','<ellipse cx="40.6" cy="106" rx="6.6" ry="18"/>'],['calves','<ellipse cx="41" cy="146" rx="4.6" ry="15"/>']],
  base:'<circle cx="50" cy="11" r="8.5"/><rect x="36" y="27" width="28" height="56" rx="9"/><rect x="35" y="76" width="30" height="16" rx="7"/><circle cx="20.5" cy="86" r="3.6"/><circle cx="79.5" cy="86" r="3.6"/><ellipse cx="41" cy="126" rx="5" ry="4.5"/><ellipse cx="59" cy="126" rx="5" ry="4.5"/><ellipse cx="41" cy="165" rx="5.5" ry="3"/><ellipse cx="59" cy="165" rx="5.5" ry="3"/>'},
 back:{c:[['neck','<rect x="46" y="18.5" width="8" height="5" rx="2"/>'],['middle back','<rect x="42.5" y="38" width="15" height="22" rx="3"/>'],['traps','<path d="M50 20 L60.5 28 L56 47 L50 53 L44 47 L39.5 28 Z"/>'],['lower back','<rect x="44" y="61" width="12" height="17" rx="3"/>']],
  l:[['shoulders','<ellipse cx="32" cy="35" rx="7.5" ry="7"/>'],['lats','<path d="M37.5 38 Q35 51 43.5 68 L44.5 60 L42.6 42 Z"/>'],['triceps','<ellipse cx="28" cy="51" rx="4.8" ry="10" transform="rotate(10 28 51)"/>'],['forearms','<ellipse cx="23.5" cy="71.5" rx="4.3" ry="11" transform="rotate(12 23.5 71.5)"/>'],['glutes','<ellipse cx="43.6" cy="87" rx="7" ry="8.5"/>'],['adductors','<ellipse cx="47.6" cy="101" rx="2.4" ry="8"/>'],['hamstrings','<ellipse cx="41.6" cy="111" rx="6.4" ry="16"/>'],['calves','<ellipse cx="41" cy="144" rx="5.6" ry="12.5"/>']],
  base:'<circle cx="50" cy="11" r="8.5"/><rect x="36" y="27" width="28" height="56" rx="9"/><rect x="35" y="76" width="30" height="16" rx="7"/><circle cx="20.5" cy="86" r="3.6"/><circle cx="79.5" cy="86" r="3.6"/><ellipse cx="41" cy="126" rx="5" ry="4.5"/><ellipse cx="59" cy="126" rx="5" ry="4.5"/><ellipse cx="41" cy="165" rx="5.5" ry="3"/><ellipse cx="59" cy="165" rx="5.5" ry="3"/>'}};
function bodySVG(fill,o={}){const view=(v,dx)=>{const B=BODY[v];const sh=([m,s])=>{const f=fill(m)||{};return s.replace(/^<(\w+)/,`<$1 data-m="${m}" fill="${f.c||'#34343c'}" fill-opacity="${f.o==null?1:f.o}"`)};
    return `<g transform="translate(${dx} 0)"><g fill="#232328">${B.base}</g><g stroke="#0c0c0f" stroke-width=".8">${B.c.map(sh).join('')}${B.l.map(sh).join('')}<g transform="translate(100 0) scale(-1 1)">${B.l.map(sh).join('')}</g></g>${o.labels!==false?`<text x="50" y="179" text-anchor="middle" font-size="7.5" font-weight="700" fill="#71717a" letter-spacing="1">${v.toUpperCase()}</text>`:''}</g>`};
  return `<svg class="body-svg${o.cls?' '+o.cls:''}" viewBox="0 0 205 182" role="img" aria-label="${esc(o.label||'Muscle map')}">${view('front',0)}${view('back',105)}</svg>`}
function exBodySVG(ex,o){const P=new Set(primOf(ex)),S=new Set(secOf(ex));return bodySVG(m=>P.has(m)?{c:'#c6ff33'}:S.has(m)?{c:'#c6ff33',o:.38}:null,Object.assign({label:'Muscles worked'},o))}
/* ---------- images ---------- */
const imgUrl=(ex,i)=>`img/ex/${ex.img}/${i}.webp`;
function exFig(ex,o={}){if(ex.img)return `<div class="fig ${o.anim?'anim':''} ${o.cls||''}"><img src="${imgUrl(ex,0)}" alt="${esc(ex.name)} – start position" ${o.lazy!==false?'loading="lazy"':''} decoding="async"${o.anim?`><img class="f2" src="${imgUrl(ex,1)}" alt="${esc(ex.name)} – end position" ${o.lazy!==false?'loading="lazy"':''} decoding="async"`:''}></div>`;
  const c=MCOL[ex.muscle]||'#c6ff33';return `<div class="fig ph ${o.cls||''}" style="--mc:${c}">${exBodySVG(ex,{labels:false,cls:'ph-body'})}<span class="ph-eq">${esc(EQUIP[ex.equip]||'')}</span>${o.anim?'<span class="ph-note">Illustration · no photo available</span>':''}</div>`}
const exThumb=ex=>`<div class="thumb">${exFig(ex,{cls:'sm'})}</div>`;
/* ---------- today's workout ---------- */
function tplScore(t,P){const v=[];for(const te of t.exercises){const ex=EX(te.exId);const ms=primOf(ex);if(ms.length)v.push(ms.reduce((a,m)=>a+(P[m]==null?100:P[m]),0)/ms.length)}return v.length?Math.round(v.reduce((a,b)=>a+b,0)/v.length):100}
function todayPlan(){const P=recovery(),now=Date.now();const trained=D.workouts.some(w=>sod(w.start)===sod(now));let tpl=null,why='';
  if(D.program&&D.program.tpls&&D.program.tpls.length){const ids=D.program.tpls;tpl=D.templates.find(t=>t.id===ids[(D.program.next||0)%ids.length]);if(tpl)why=`Day ${((D.program.next||0)%ids.length)+1} of ${ids.length} in your program`}
  if(!tpl){const last=D.workouts.slice().sort((a,b)=>b.start-a.start).find(w=>w.templateId&&D.templates.some(t=>t.id===w.templateId));
    if(last){const lt=D.templates.find(t=>t.id===last.templateId);const rot=D.templates.filter(t=>t.program&&t.program===lt.program);if(rot.length>1){const i=rot.indexOf(lt);tpl=rot[(i+1)%rot.length];why=`Next in your ${lt.program} rotation`}}}
  if(!tpl){let best=-1;for(const t of D.templates){const s=tplScore(t,D.templates.length?P:{});if(s>best){best=s;tpl=t}}why='Your freshest muscles right now'}
  if(!tpl)return null;const score=tplScore(tpl,P);const tired=[...new Set(tpl.exercises.flatMap(te=>primOf(EX(te.exId))).filter(m=>P[m]<60))];
  return {tpl,why,score,tired,trained,P}}
/* ---------- insights ---------- */
function insights(){const out=[],now=Date.now(),I=idx();if(D.workouts.length<2)return out;
  const ws=sow(now),pws=ws-7*DAY;const cur=D.workouts.filter(w=>w.start>=ws),prv=D.workouts.filter(w=>w.start>=pws&&w.start<ws);
  const vc=cur.reduce((a,w)=>a+workoutVol(w),0),vp=prv.reduce((a,w)=>a+workoutVol(w),0);
  if(cur.length||prv.length){const d=vp?Math.round((vc-vp)/vp*100):null;out.push({ic:'chart',tone:d==null||d>=0?'good':'warn',t:'This week',x:`${cur.length} workout${cur.length===1?'':'s'} vs ${prv.length} last week · volume ${compact(toW(vc))} ${wU()}${d!=null?` (${d>=0?'+':''}${d}% vs last week — week still in progress)`:''}`})}
  let g=null;for(const id in I.hist){const H=I.hist[id].filter(h=>h.m.e1rm>0);const a=H.filter(h=>h.w.start>=now-28*DAY),b=H.filter(h=>h.w.start<now-28*DAY&&h.w.start>=now-56*DAY);if(!a.length||!b.length)continue;
    const ma=Math.max(...a.map(h=>h.m.e1rm)),mb=Math.max(...b.map(h=>h.m.e1rm));const p=(ma-mb)/mb;if(p>0&&(!g||p>g.p))g={id,p,ma,mb}}
  if(g)out.push({ic:'bolt',tone:'good',t:'Strongest gain',x:`${esc(EX(g.id).name)}: est. 1RM ${wTxt(g.mb)} → ${wTxt(g.ma)} (+${Math.round(g.p*100)}%) over the last 4 weeks`,ex:g.id});
  const prs=I.events.filter(e=>e.t>=ws).length;if(prs)out.push({ic:'trophy',tone:'good',t:'PRs this week',x:`${prs} personal record${prs>1?'s':''} — keep it up`});
  if(D.workouts.length>=3){const since=now-10*DAY,hit=new Set();for(const w of D.workouts){if(w.start<since)continue;for(const e of w.exercises)if(e.sets.some(isWork)){const ex=EX(e.exId);hit.add(ex.muscle);primOf(ex).forEach(m=>hit.add(DET2G[m]))}}
    const major=['chest','back','shoulders','quads','hamstrings','glutes','biceps','triceps','core'];const miss=major.filter(m=>!hit.has(m));
    if(miss.length&&miss.length<major.length)out.push({ic:'info',tone:'warn',t:'Neglected muscles',x:`No direct work in 10 days: ${miss.map(m=>MUSCLES[m]).join(', ')}`,miss})}
  const pls=[];for(const id in I.hist){const p=plateau(id);if(p)pls.push([id,p])}
  if(pls.length)out.push({ic:'alert',tone:'bad',t:'Plateau watch',x:pls.slice(0,3).map(([id,p])=>`${esc(EX(id).name)} (${p.wk} wk)`).join(', ')+' — tap an exercise for fixes',ex:pls[0][0]});
  return out}
/* ---------- onboarding & program generator ---------- */
const EQOPT={gym:'Full gym',db:'Dumbbells, bench & pull-up bar',bb:'Barbell home gym (rack, bench, bar, pull-up bar)',home:'Bodyweight & bands'};
const SLOTS={
 gym:{squat:'Barbell Back Squat',squat2:'Hack Squat',hinge:'Deadlift',rdl:'Romanian Deadlift',legpress:'Leg Press',lunge:'Bulgarian Split Squat',legcurl:'Lying Leg Curl',legcurl2:'Seated Leg Curl',legext:'Leg Extension',hip:'Barbell Hip Thrust',calf:'Standing Calf Raise Machine',calf2:'Seated Calf Raise Machine',bench:'Barbell Bench Press',incline:'Incline Dumbbell Press',ohp:'Overhead Press',shpress:'Shoulder Press Machine',fly:'Pec Deck',lateral:'Dumbbell Lateral Raise',lateral2:'Cable Lateral Raise',row:'Barbell Row',row2:'Seated Cable Row',vpull:'Lat Pulldown',vpull2:'Pull-Up',rear:'Face Pull',curl:'Barbell Curl',curl2:'Hammer Curl',tri:'Tricep Rope Pushdown',tri2:'Skull Crusher',core:'Cable Crunch',core2:'Hanging Leg Raise'},
 db:{squat:'Goblet Squat',squat2:'Bulgarian Split Squat',hinge:'Dumbbell Romanian Deadlift',rdl:'Dumbbell Romanian Deadlift',legpress:'Dumbbell Step-Up',lunge:'Dumbbell Reverse Lunge',legcurl:'Single-Leg Romanian Deadlift',legcurl2:'Single-Leg Romanian Deadlift',legext:'Dumbbell Walking Lunge',hip:'Dumbbell Hip Thrust',calf:'Dumbbell Calf Raise',calf2:'Dumbbell Calf Raise',bench:'Dumbbell Bench Press',incline:'Incline Dumbbell Press',ohp:'Seated Dumbbell Shoulder Press',shpress:'Arnold Press',fly:'Dumbbell Fly',lateral:'Dumbbell Lateral Raise',lateral2:'Dumbbell Lateral Raise',row:'One-Arm Dumbbell Row',row2:'Chest-Supported Dumbbell Row',vpull:'Pull-Up',vpull2:'Chin-Up',rear:'Bent-Over Rear Delt Fly',curl:'Dumbbell Curl',curl2:'Hammer Curl',tri:'Overhead Dumbbell Extension',tri2:'Dumbbell Kickback',core:'Plank',core2:'Hanging Leg Raise'},
 bb:{squat:'Barbell Back Squat',squat2:'Front Squat',hinge:'Deadlift',rdl:'Romanian Deadlift',legpress:'Barbell Lunge',lunge:'Barbell Lunge',legcurl:'Good Morning',legcurl2:'Nordic Hamstring Curl',legext:'Front Squat',hip:'Barbell Hip Thrust',calf:'Standing Barbell Calf Raise',calf2:'Bodyweight Calf Raise',bench:'Barbell Bench Press',incline:'Incline Barbell Bench Press',ohp:'Overhead Press',shpress:'Push Press',fly:'Chest Dip',lateral:'Barbell Upright Row',lateral2:'Barbell Upright Row',row:'Barbell Row',row2:'Pendlay Row',vpull:'Pull-Up',vpull2:'Chin-Up',rear:'Barbell Rear Delt Row',curl:'Barbell Curl',curl2:'Reverse EZ-Bar Curl',tri:'Skull Crusher',tri2:'Close-Grip Bench Press',core:'Hanging Leg Raise',core2:'Plank'},
 home:{squat:'Bodyweight Squat',squat2:'Bulgarian Split Squat',hinge:'Band Good Morning',rdl:'Single-Leg Glute Bridge',legpress:'Band Squat',lunge:'Bodyweight Walking Lunge',legcurl:'Band Leg Curl',legcurl2:'Nordic Hamstring Curl',legext:'Sissy Squat',hip:'Glute Bridge',calf:'Bodyweight Calf Raise',calf2:'Bodyweight Calf Raise',bench:'Push-Up',incline:'Decline Push-Up',ohp:'Pike Push-Up',shpress:'Band Chest Press',fly:'Band Chest Fly',lateral:'Band Lateral Raise',lateral2:'Band Lateral Raise',row:'Band Row',row2:'Inverted Row',vpull:'Band Lat Pulldown',vpull2:'Pull-Up',rear:'Band Face Pull',curl:'Band Curl',curl2:'Band Curl',tri:'Band Tricep Pushdown',tri2:'Diamond Push-Up',core:'Plank',core2:'Lying Leg Raise'}};
const DAYS={
 'Full Body A':['squat','bench','row2','lateral','curl','core'],'Full Body B':['rdl','ohp','vpull','lunge','tri','core2'],'Full Body C':['squat2','incline','row','legcurl','curl2','calf'],
 'Upper A':['bench','row','ohp','vpull','curl','tri'],'Upper B':['incline','vpull2','shpress','row2','lateral2','tri2'],'Lower A':['squat','rdl','legpress','legcurl','calf','core'],'Lower B':['hinge','squat2','lunge','hip','legext','calf2'],
 'Push':['bench','incline','ohp','lateral','fly','tri'],'Pull':['vpull','row','row2','rear','curl','curl2'],'Legs':['squat','rdl','legpress','legcurl','legext','calf'],
 'Push B':['ohp','incline','bench','lateral2','fly','tri2'],'Pull B':['hinge','vpull2','row2','rear','curl2','curl'],'Legs B':['squat2','hip','lunge','legcurl2','legext','calf2']};
function splitFor(days,exp){return days<=2?['Full Body A','Full Body B']:days===3?(exp==='beginner'?['Full Body A','Full Body B','Full Body C']:['Push','Pull','Legs']):days===4?['Upper A','Lower A','Upper B','Lower B']:days===5?['Push','Pull','Legs','Upper A','Lower A']:['Push','Pull','Legs','Push B','Pull B','Legs B']}
function splitName(days,exp){return days<=2?'Full Body 2×':days===3?(exp==='beginner'?'Full Body 3×':'Push / Pull / Legs'):days===4?'Upper / Lower':days===5?'PPL + Upper/Lower':'PPL ×2'}
function buildProgram(o){const S=SLOTS[o.equip]||SLOTS.gym;const names=splitFor(o.days,o.exp);const pname='My Program · '+splitName(o.days,o.exp);
  const tpls=names.map((nm,di)=>{const seen=new Set();const ex=[];for(const slot of DAYS[nm]){const n=S[slot];if(!n)continue;let id;try{id=exByName(n)}catch(e){continue}if(seen.has(id))continue;seen.add(id);
    const E=EX(id),c=clsOf(E),isMain=c==='main'&&ex.filter(x=>clsOf(EX(x.exId))==='main').length<2;const cl=isMain?'main':c==='main'?'comp':c;
    const tb={strength:{main:[5,5],comp:[6,8],iso:[8,12],core:[10,15]},muscle:{main:[6,8],comp:[8,12],iso:[10,15],core:[10,15]},general:{main:[8,10],comp:[10,12],iso:[12,15],core:[12,20]}}[o.goal]||{};
    let [lo,hi]=tb[cl]||[8,12];let sets=cl==='main'?(o.goal==='strength'?(o.exp==='beginner'?3:5):(o.exp==='advanced'?4:3)):(o.exp==='advanced'&&cl!=='core'?4:3);
    if(E.type==='dur'){ex.push({exId:id,sets:3,reps:null});continue}if(E.type==='bw'){lo=Math.max(lo,6);hi=Math.max(hi,lo+4)}
    ex.push({exId:id,sets,reps:lo,hi})}
    return {id:'prog-'+uid(),program:pname,name:nm,prog:true,builtin:false,exercises:ex}});
  return {name:pname,tpls}}
function saveProgram(o){D.templates=D.templates.filter(t=>!t.prog);const P=buildProgram(o);D.templates.push(...P.tpls);
  D.program={name:P.name,goal:o.goal,exp:o.exp,days:o.days,equip:o.equip,tpls:P.tpls.map(t=>t.id),next:0,created:Date.now()};D.profile={goal:o.goal,exp:o.exp,days:o.days,equip:o.equip};D.settings.unit=o.unit||D.settings.unit;D.onboarded=true;save();return P}
function advanceProgram(w){const P=D.program;if(!P||!w.templateId)return;const i=P.tpls.indexOf(w.templateId);if(i<0)return;P.next=(i+1)%P.tpls.length}

/* ---- app2.js ---- */
/* ================= UI infrastructure ================= */
function toast(msg,cls=''){const t=document.createElement('div');t.className='toast '+cls;t.innerHTML=msg;$('#toasts').appendChild(t);setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),320)},cls==='pr'?3600:2400)}
function confetti(){const cols=['#c6ff33','#ffc53d','#5ab4ff','#ff6b6b','#da77f2','#fff'];for(let i=0;i<46;i++){const c=document.createElement('div');c.className='confetti';c.style.left=Math.random()*100+'vw';c.style.background=cols[i%cols.length];c.style.setProperty('--dx',(Math.random()*120-60)+'px');c.style.setProperty('--rot',(Math.random()*900-450)+'deg');c.style.animationDuration=(1.6+Math.random()*1.4)+'s';c.style.animationDelay=(Math.random()*.25)+'s';document.body.appendChild(c);setTimeout(()=>c.remove(),3400)}}
function buzz(p){if(D.settings.vibrate&&navigator.vibrate){try{navigator.vibrate(p)}catch(e){}}}
let AC=null;function unlockAudio(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume().catch(()=>{})}
function beep(){if(!D.settings.sound||!AC)return;try{const t0=AC.currentTime;[0,.22,.44].forEach((d,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=i===2?1320:880;g.gain.setValueAtTime(0,t0+d);g.gain.linearRampToValueAtTime(.35,t0+d+.02);g.gain.exponentialRampToValueAtTime(.001,t0+d+.18);o.connect(g).connect(AC.destination);o.start(t0+d);o.stop(t0+d+.2)})}catch(e){}}

const stack=[];let armed=false;
function arm(){if(!armed){try{history.pushState({ov:1},'')}catch(e){}armed=true}}
window.addEventListener('popstate',()=>{armed=false;if(stack.length){closeTop(true);if(stack.length)arm()}});
function pushPage(p){const el=document.createElement('div');el.className='page';el.innerHTML=`<header class="phead"><button class="icon-btn" data-a="back" aria-label="Back">${ic('back')}</button><h2></h2><div class="phead-r"></div></header><div class="pbody"></div><div class="pfoot" style="display:none"></div>`;document.body.appendChild(el);p.el=el;p.kind='page';p.st=p.st||{};stack.push(p);paint(p);arm();requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')));return p}
function paint(p){if(p.kind!=='page')return;const el=p.el;$('h2',el).textContent=typeof p.title==='function'?p.title(p):p.title;$('.phead-r',el).innerHTML=p.right?p.right(p):'';const b=$('.pbody',el),st=b.scrollTop;b.innerHTML=p.render(p);b.scrollTop=st;const f=$('.pfoot',el);if(p.foot){f.style.display='';f.innerHTML=p.foot(p)}else f.style.display='none';attachCharts(el);p.after&&p.after(p)}
function openSheet(html,setup,onClose){const bg=document.createElement('div');bg.className='sheet-bg';const sh=document.createElement('div');sh.className='sheet';sh.innerHTML='<div class="grab"></div>'+html;document.body.append(bg,sh);const p={kind:'sheet',el:sh,bg,onClose};stack.push(p);bg.addEventListener('click',()=>closeTop());arm();requestAnimationFrame(()=>requestAnimationFrame(()=>{bg.classList.add('in');sh.classList.add('in')}));setup&&setup(sh,p);return p}
function closeTop(fromPop){const p=stack.pop();if(!p)return;if(p.kind==='sheet'){p.bg.classList.remove('in');p.el.classList.remove('in');setTimeout(()=>{p.bg.remove();p.el.remove()},260)}else{p.el.classList.remove('in');setTimeout(()=>p.el.remove(),280)}p.onClose&&p.onClose(p)}
function closePage(p){const i=stack.indexOf(p);if(i<0)return;while(stack.length>i)closeTop()}
function topPage(){for(let i=stack.length-1;i>=0;i--)if(stack[i].kind==='page')return stack[i];return null}
function menu(title,items){return openSheet((title?`<div class="sheet-title">${esc(title)}</div>`:'')+items.filter(Boolean).map((it,i)=>`<button class="menu-item ${it.danger?'danger':''} ${it.on?'on':''}" data-mi="${i}">${it.icon?ic(it.icon):''}<span>${it.label}</span></button>`).join(''),sh=>{const list=items.filter(Boolean);sh.addEventListener('click',ev=>{const b=ev.target.closest('[data-mi]');if(!b)return;closeTop();list[+b.dataset.mi].fn()})})}
function ask(title,msg,buttons){return new Promise(res=>{const el=document.createElement('div');el.className='modal-bg';el.innerHTML=`<div class="modal" role="dialog"><h3>${esc(title)}</h3><p>${msg}</p><div class="modal-btns">${buttons.map((b,i)=>`<button class="btn ${b.cls||''}" data-i="${i}">${esc(b.label)}</button>`).join('')}</div></div>`;el.addEventListener('click',ev=>{const b=ev.target.closest('[data-i]');if(b){el.remove();res(buttons[+b.dataset.i].v)}else if(ev.target===el){el.remove();res(null)}});document.body.appendChild(el)})}
const confirmDanger=(t,m,l='Delete')=>ask(t,m,[{label:l,v:true,cls:'btn-danger'},{label:'Cancel',v:false}]);
function refresh(){renderTab();stack.forEach(paint);renderDock()}

/* ================= tabs ================= */
let TAB=D.active?'train':'home';
const TABS=[['home','Home','home'],['history','History','hist'],['train','Train','dumb'],['library','Exercises','list'],['more','More','more']];
function renderTabs(){$('#tabs').innerHTML=TABS.map(([k,l,i])=>k==='train'?`<button class="tab tab-train ${TAB===k?'on':''}" data-a="tab" data-t="${k}"><span class="fab">${ic(i)}</span>${D.active?'<i class="live-dot"></i>':''}${l}</button>`:`<button class="tab ${TAB===k?'on':''}" data-a="tab" data-t="${k}">${ic(i)}${l}</button>`).join('')}
function renderTab(){const v=VIEWS[TAB]();$('#top').innerHTML=v.head;const view=$('#view');const st=view.scrollTop;view.innerHTML=v.body;view.scrollTop=st;attachCharts(view);v.after&&v.after();renderTabs()}
function go(t){if(TAB!==t){TAB=t;$('#view').scrollTop=0;const v=$('#view');v.classList.remove('fade');void v.offsetWidth;v.classList.add('fade');buzz(6)}while(stack.length)closeTop();renderTab();renderDock()}

/* ================= dock: rest timer & mini bar ================= */
function renderDock(){const d=$('#dock');let h='';const rem=D.restEnd?D.restEnd-Date.now():0;
  if(D.restEnd&&rem>0)h+=`<div class="restbar" id="restbar"><div class="prog" style="width:${100*(1-rem/(D.restTotal*1000||1))}%"></div><div><div class="lbl">Rest</div><div class="rt" id="rest-t">${fmtClock(rem+999)}</div></div><div class="sp"></div><button class="pill" data-a="restAdj" data-d="-15">−15</button><button class="pill" data-a="restAdj" data-d="15">+15</button><button class="pill ac" data-a="restSkip">Skip</button></div>`;
  if(D.active&&TAB!=='train'&&!topPage())h+=`<button class="minibar" data-a="tab" data-t="train">${ic('dumb')}<span class="sp">${esc(D.active.name||"Workout")}</span><span class="num js-el" data-s="${D.active.start}">${fmtClock(Date.now()-D.active.start)}</span>${ic('chev')}</button>`;
  d.innerHTML=h}
function startRest(sec){if(!sec)return;D.restEnd=Date.now()+sec*1000;D.restTotal=sec;save();renderDock()}
function restDone(){D.restEnd=null;save();renderDock();beep();buzz([250,120,250,120,400]);toast(`${ic('timer','')} Rest over — time for your next set`.replace('<svg','<svg style="width:18px;height:18px;vertical-align:-4px;margin-right:4px"'))}
function tick(){const now=Date.now();$$('.js-el').forEach(e=>{e.textContent=fmtClock(now-(+e.dataset.s))});
  if(D.restEnd){const rem=D.restEnd-now;if(rem<=0)restDone();else{const t=$('#rest-t');if(!t)renderDock();else{t.textContent=fmtClock(rem+999);const p=$('#restbar .prog');if(p)p.style.width=100*(1-rem/(D.restTotal*1000||1))+'%'}}}}

/* ================= views ================= */
const VIEWS={};
const exIcon=ex=>`<div class="ex-ico" style="background:${MCOL[ex.muscle]}22;color:${MCOL[ex.muscle]}">${MABBR[ex.muscle]||'EX'}</div>`;
function weekStats(){const ws=sow(Date.now());const thisW=D.workouts.filter(w=>w.start>=ws);
  // week streak: consecutive weeks with >=1 workout, current week counts if trained (otherwise start from last week)
  const weeks=new Set(D.workouts.map(w=>sow(w.start)));let s=0,c=ws;if(!weeks.has(c))c=addDays(c,-7);while(weeks.has(c)){s++;c=addDays(c,-7)}
  return {n:thisW.length,vol:thisW.reduce((a,w)=>a+workoutVol(w),0),streak:s,sets:thisW.reduce((a,w)=>a+workoutSets(w),0)}}
VIEWS.home=()=>{const has=D.workouts.length>0;const demo=D.workouts.some(w=>w.demo)||D.body.some(b=>b.demo);let b='';
  if(demo)b+=`<div class="banner">${ic('info').replace('<svg','<svg style="width:20px;height:20px;flex:none"')}<span class="sp">Demo data loaded — sample workouts for previewing graphs.</span><button class="btn btn-sm" style="background:rgba(90,180,255,.18);color:#5ab4ff" data-a="removeDemo">Remove</button></div>`;
  if(D.active)b+=`<button class="card row" style="width:100%;border-color:var(--ac);text-align:left" data-a="tab" data-t="train"><div class="ex-ico" style="background:var(--ac);color:var(--ac-tx)">${ic('dumb').replace('<svg','<svg style="width:22px;height:22px"')}</div><div class="ex-txt"><b>${esc(D.active.name)}</b><span>In progress · <span class="js-el num" data-s="${D.active.start}">${fmtClock(Date.now()-D.active.start)}</span></span></div><span class="ac" style="font-weight:800">Resume</span></button>`;
  if(!D.active&&(D.program||has))b+=todayCardHTML();
  if(!has){if(!D.program)b+=`<button class="card onb-cta" data-a="redoOnb"><div class="ii">${ic('spark')}</div><div class="ex-txt"><b>Build my program</b><span>5 questions → a plan that tells you what to lift, and adds weight for you</span></div>${ic('chev')}</button>`;b+=`<div class="card hero"><div class="big-ico">${ic('dumb')}</div><h2>Let's get stronger.</h2><p>Log your first workout to unlock progress graphs, personal records and your training heatmap.</p><button class="btn btn-ac btn-lg btn-block" data-a="${D.active?'tab':'startEmpty'}" data-t="train">${ic('play')} ${D.active?'Resume workout':'Start a workout'}</button><button class="btn btn-ghost btn-block mt" data-a="tab" data-t="train">Browse programs & templates</button><div class="tiny dim mt">Want a preview first? More → Settings → <button class="ac" style="font-weight:700" data-a="loadDemo">Load demo data</button></div></div>`;return {head:homeHead(),body:b}}
  const s=weekStats(),goal=D.settings.weeklyGoal;
  b+=`<div class="stats"><div class="stat hl">${ringSvg(s.n/goal)}<div class="v">${s.n}<small>/${goal}</small></div><div class="k">Workouts this week</div></div>
  <div class="stat">${ic('flame','ico')}<div class="v" style="color:#ffa94d">${s.streak}<small>wk</small></div><div class="k">Week streak</div></div>
  <div class="stat">${ic('bolt','ico')}<div class="v">${compact(toW(s.vol))}<small>${wU()}</small></div><div class="k">Volume this week</div></div>
  <div class="stat">${ic('trophy','ico')}<div class="v">${D.workouts.length}</div><div class="k">Total workouts</div></div></div>`;
  if(!D.active)b+=`<button class="btn btn-lg btn-block mb" data-a="startEmpty">${ic('plus')} Start empty workout</button>`;
  b+=recoveryCardHTML()+insightsCardHTML();
  // weekly volume
  const cw=sow(Date.now()),items=[];for(let i=11;i>=0;i--){const ws=addDays(cw,-7*i),we=addDays(ws,7);const v=D.workouts.filter(w=>w.start>=ws&&w.start<we).reduce((a,w)=>a+workoutVol(w),0);items.push({v:toW(v),hl:i===0,label:i%2===0?fmtD(ws,{month:'numeric',day:'numeric'}):'',title:`Week of ${fmtD(ws)}: ${compact(toW(v))} ${wU()}`})}
  const avg=items.slice(0,11).reduce((a,i)=>a+i.v,0)/11;
  b+=`<div class="card"><h3>${ic('chart').replace('<svg','<svg style="width:16px;height:16px"')} Weekly volume <span class="r">avg ${compact(avg)} ${wU()}</span></h3>${barChart(items)}</div>`;
  b+=`<div class="card"><h3>${ic('cal').replace('<svg','<svg style="width:16px;height:16px"')} Training days <span class="r">${D.workouts.filter(w=>w.start>Date.now()-30*DAY).length} in last 30 days</span></h3>${heatmap()}</div>`;
  // muscle split
  const since=Date.now()-30*DAY,cnt={};let tot=0;for(const w of D.workouts){if(w.start<since)continue;for(const e of w.exercises){const n=e.sets.filter(isWork).length;if(!n)continue;const m=EX(e.exId).muscle;cnt[m]=(cnt[m]||0)+n;tot+=n}}
  const rows=Object.entries(cnt).sort((a,b)=>b[1]-a[1]);const mx=rows.length?rows[0][1]:1;
  b+=`<div class="card"><h3>Muscle split <span class="r">working sets · 30 days</span></h3>${rows.length?rows.map(([m,n])=>`<div class="split-row"><span>${MUSCLES[m]}</span><div class="bar"><i style="width:${n/mx*100}%;background:${MCOL[m]}"></i></div><span class="v">${n} · ${Math.round(n/tot*100)}%</span></div>`).join(''):'<div class="dim small">No sets in the last 30 days.</div>'}</div>`;
  const evs=idx().events.slice(-8).reverse();
  b+=`<div class="card"><h3>${ic('trophy').replace('<svg','<svg style="width:16px;height:16px;color:#ffc53d"')} Recent PRs <span class="r">${idx().events.length} total</span></h3>${evs.length?evs.map(ev=>`<button class="pr-row" data-a="openEx" data-ex="${ev.exId}"><div class="trophy">${ic('trophy')}</div><div class="ex-txt"><b>${esc(EX(ev.exId).name)}</b><span>${prText(ev)}</span></div><span class="tiny dim">${fmtD(ev.t)}</span></button>`).join(''):'<div class="dim small">Beat a previous best and it will show up here.</div>'}</div>`;
  return {head:homeHead(),body:b}};
const homeHead=()=>`<div class="sp"><div class="brand">IRON<span>LOG</span></div><div class="top-sub">${new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}</div></div>`;

VIEWS.history=()=>{const ws=D.workouts.slice().sort((a,b)=>b.start-a.start);let b='';
  if(!ws.length)b=`<div class="empty">${ic('hist')}<div>No workouts yet.<br>Finished workouts will appear here.</div></div>`;
  let lastM='';for(const w of ws){const m=fmtD(w.start,{month:'long',year:'numeric'});if(m!==lastM){const n=ws.filter(x=>fmtD(x.start,{month:'long',year:'numeric'})===m).length;b+=`<div class="sec-h">${m}<span class="r">${n} workout${n>1?'s':''}</span></div>`;lastM=m}b+=wCard(w)}
  return {head:`<h1>History</h1><span class="top-sub">${ws.length} total</span>`,body:b}};
function wCard(w){const prs=idx().events.filter(e=>e.wid===w.id).length;const vol=workoutVol(w);
  return `<button class="card wcard" data-a="openW" data-w="${w.id}"><div class="t">${esc(w.name)}${w.demo?'<span class="badge demo">DEMO</span>':''}${prs?`<span class="badge pr">🏆 ${prs} PR${prs>1?'s':''}</span>`:''}</div><div class="d">${relDay(w.start)} · ${fmtTime(w.start)}</div>
  <div class="m"><span>${ic('timer').replace('<svg','<svg style="width:14px;height:14px;vertical-align:-2px"')} <b>${fmtDurShort((w.end||w.start)-w.start)}</b></span>${vol?`<span><b>${compact(toW(vol))}</b> ${wU()}</span>`:''}<span><b>${workoutSets(w)}</b> sets</span></div>
  <div class="lines">${w.exercises.slice(0,5).map(e=>{const ex=EX(e.exId),ss=e.sets.filter(isWork);const best=ss.reduce((a,s)=>!a||((s.w||0)*(1+(s.r||0)/30)+(s.min||0)+(s.sec||0))>((a.w||0)*(1+(a.r||0)/30)+(a.min||0)+(a.sec||0))?s:a,null);return `<div><span>${ss.length||e.sets.length} × ${esc(ex.name)}</span><span class="num">${best?setText(ex.type,best):''}</span></div>`}).join('')}${w.exercises.length>5?`<div class="dim">+${w.exercises.length-5} more</div>`:''}</div></button>`}

/* ---------- train view ---------- */
VIEWS.train=()=>{if(D.active){const w=D.active;return {head:`<div class="sp"><div class="top-sub">Workout in progress</div><div class="num" style="font-size:24px;font-weight:800"><span class="js-el" data-s="${w.start}">${fmtClock(Date.now()-w.start)}</span></div></div><button class="btn btn-ac" data-a="finish">Finish</button>`,body:loggerHTML(w,'a')}}
  let b=`<button class="btn btn-ac btn-lg btn-block" data-a="startEmpty">${ic('plus')} Start empty workout</button>`;
  b+=programSectionHTML();const mine=D.templates.filter(t=>!t.builtin&&!t.prog);
  b+=`<div class="sec-h">My templates<span class="r"><button class="ac" style="font-weight:700;font-size:13px" data-a="newTpl">+ New template</button></span></div>`;
  b+=mine.length?`<div class="tpl-grid">${mine.map(tplCard).join('')}</div>`:`<div class="card dim small">Save any workout as a template, or tap <b class="ac">+ New template</b> to build one.</div>`;
  const progs=[...new Set(D.templates.filter(t=>t.builtin).map(t=>t.program))];
  for(const p of progs){b+=`<div class="sec-h">${esc(p)}</div><div class="tpl-grid">${D.templates.filter(t=>t.builtin&&t.program===p).map(tplCard).join('')}</div>`}
  return {head:`<h1>Train</h1>`,body:b}};
function tplCard(t){const last=D.workouts.filter(w=>w.templateId===t.id).sort((a,b)=>b.start-a.start)[0];return `<button class="card tpl" data-a="openTpl" data-id="${t.id}"><div class="t">${esc(t.name)}</div><div class="l">${t.exercises.map(e=>esc(EX(e.exId).name)).join(', ')}</div><div class="tiny dim" style="margin-top:8px">${t.exercises.length} exercises${last?' · '+relDay(last.start):''}</div></button>`}

/* ---------- logger (active workout + edit) ---------- */
function getW(m){return m==='e'?(topPage()&&topPage().st.draft):D.active}
function setLabel(e,si){const s=e.sets[si];if(s.t==='w')return 'W';if(s.t==='d')return 'D';if(s.t==='f')return 'F';let n=0;for(let i=0;i<=si;i++)if(e.sets[i].t!=='w'&&e.sets[i].t!=='d'&&e.sets[i].t!=='f')n++;return n}
function colsFor(t){return t==='cardio'?[['min','Min'],['dist',dU()],['cal','kcal']]:t==='dur'?[['w','+'+wU()],['sec','Sec']]:t==='bw'?[['w','+'+wU()],['r','Reps'],['rpe','RPE']]:[['w',wU()],['r','Reps'],['rpe','RPE']]}
function fieldDisp(f,v){if(v==null||v==='')return '';if(f==='w')return fmtN(toW(v),2);if(f==='dist')return fmtN(toD(v),2);return String(v)}
function prevMatch(e,si,ps){if(!ps||!ps.length)return null;const wu=x=>x.t==='w',me=wu(e.sets[si]);let k=0;for(let i=0;i<si;i++)if(wu(e.sets[i])===me)k++;const pool=ps.filter(x=>wu(x)===me);return pool[k]||null}
function placeholderFor(e,si,prevSets,f){const sr=e.sets[si]&&e.sets[si].rec;if(sr&&sr[f]!=null)return fieldDisp(f,sr[f]);const p=prevMatch(e,si,prevSets);if(p&&p[f]!=null&&p[f]!=='')return fieldDisp(f,p[f]);if(f==='r'&&e.target)return String(e.target);if(f==='w'&&si>0){const o=e.sets[si-1];if(o&&o.w!=null)return fieldDisp('w',o.w)}return ''}
function loggerHTML(w,m){let h='';
  if(m==='e'){h+=`<div class="grid3 mb"><label class="field" style="margin:0"><span>Date</span><input class="inp" type="date" data-in="wdate" data-m="e" value="${isoDate(w.start)}"></label><label class="field" style="margin:0"><span>Start</span><input class="inp" type="time" data-in="wtime" data-m="e" value="${isoTime(w.start)}"></label><label class="field" style="margin:0"><span>Minutes</span><input class="inp" inputmode="numeric" data-in="wdur" data-m="e" value="${Math.round(((w.end||w.start)-w.start)/60000)}"></label></div>`}
  h+=`<div class="wk-head"><input class="wk-name" data-in="wname" data-m="${m}" value="${esc(w.name)}" aria-label="Workout name"><button class="icon-btn bg" data-a="wMenu" data-m="${m}">${ic('dots')}</button></div>`;
  if(m==='a'){const vol=workoutVol(w),sets=workoutSets(w);h+=`<div class="wk-meta"><div><span>Duration</span><b class="js-el" data-s="${w.start}">${fmtClock(Date.now()-w.start)}</b></div><div><span>Volume</span><b>${compact(toW(vol))} <small class="muted" style="font-size:12px">${wU()}</small></b></div><div><span>Sets</span><b>${sets}</b></div></div>`}
  if(!w.exercises.length)h+=`<div class="empty" style="padding:26px 10px">${ic('dumb')}<div>No exercises yet.<br>Add one to start logging sets.</div></div>`;
  w.exercises.forEach((e,ei)=>h+=exCardHTML(w,e,ei,m));
  h+=`<button class="btn btn-outline btn-block btn-lg" data-a="addEx" data-m="${m}">${ic('plus')} Add exercises</button>`;
  h+=`<label class="field mt"><span>Workout notes</span><textarea class="inp" data-in="wnotes" data-m="${m}" placeholder="How did it feel? Sleep, energy, pain…">${esc(w.notes||'')}</textarea></label>`;
  if(m==='a')h+=`<button class="btn btn-danger btn-block" data-a="cancelW">Discard workout</button>`;
  return h}
function exCardHTML(w,e,ei,m){const ex=EX(e.exId),T=ex.type,prev=prevEntry(e.exId,w);const ps=prev?prev.e.sets.filter(s=>s.done):[];const cols=colsFor(T);const c5=cols.length===2?' c5':'';
  const rest=e.rest!=null?e.rest:D.settings.rest;
  let h=`<div class="card ex-card" data-ei="${ei}"><div class="ex-head"><button class="ex-th" data-a="tips" data-ex="${e.exId}" data-ei="${m==='a'?ei:''}" aria-label="Form tips">${exThumb(ex)}</button><button class="nm" data-a="openEx" data-ex="${e.exId}">${esc(ex.name)}</button>${m==='a'?`<button class="icon-btn tip-btn" data-a="tips" data-ex="${e.exId}" data-ei="${ei}" aria-label="Quick tips">${ic('info')}</button>`:''}<button class="icon-btn" data-a="exMenu" data-m="${m}" data-ei="${ei}" aria-label="Exercise options">${ic('dots')}</button></div>
  <div class="ex-sub"><span>${MUSCLES[ex.muscle]||''} · ${EQUIP[ex.equip]||''}</span><span class="sp"></span>${m==='a'?`<button class="rest-chip" data-a="exRest" data-ei="${ei}">${ic('timer')} ${rest?fmtSec(rest):'Off'}</button>`:''}</div>`;
  if(m==='a'&&e.why){const K=KIND[e.recKind]||KIND.new;h+=`<div class="why k-${K[1]}"><span class="kind k-${K[1]}">${K[0]}</span><span>${esc(e.why)}</span></div>`}
  if(m==='a'&&e.plateau)h+=`<button class="why k-down" data-a="openEx" data-ex="${e.exId}" data-tab="howto" style="width:100%;text-align:left">${ic('alert')}<span>${esc(e.plateau)} Tap for plateau fixes.</span></button>`;
  if(m==='a'&&e.warm&&e.sets.some(x=>x.t==='w'&&!x.done))h+=`<div class="warm-l">${ic('flame')} Warm-up: ${esc(e.warm)}</div>`;
  if(e.note!=null)h+=`<textarea class="ex-note" rows="1" data-in="exnote" data-m="${m}" data-ei="${ei}" placeholder="Exercise note (seat height, grip…)">${esc(e.note)}</textarea>`;
  h+=`<div class="sets"><div class="set-row hd${c5}"><span>Set</span><span>Previous</span>${cols.map(c=>`<span>${c[1]}</span>`).join('')}<span>${ic('check').replace('<svg','<svg style="width:14px;height:14px"')}</span></div>`;
  e.sets.forEach((s,si)=>{const p=prevMatch(e,si,ps);h+=`<div class="set-row${c5} ${s.done?'done':''} ${s.t==='w'&&s.rec?'wu':''}"><button class="sbadge t-${s.t}" data-a="setType" data-m="${m}" data-ei="${ei}" data-si="${si}">${setLabel(e,si)}</button><button class="prev" data-a="usePrev" data-m="${m}" data-ei="${ei}" data-si="${si}">${p?setText(T,p):'—'}${s.pr&&s.pr.length?'<span class="prmark">🏆PR</span>':''}</button>`;
    for(const [f] of cols)h+=`<input class="sin${s.rec&&s.rec[f]!=null&&(s[f]==null||s[f]==='')?' rec':''}" inputmode="${f==='r'||f==='sec'||f==='cal'?'numeric':'decimal'}" data-in="set" data-m="${m}" data-ei="${ei}" data-si="${si}" data-f="${f}" value="${fieldDisp(f,s[f])}" placeholder="${placeholderFor(e,si,ps,f)}" autocomplete="off">`;
    h+=`<button class="sdone" data-a="toggleDone" data-m="${m}" data-ei="${ei}" data-si="${si}" aria-label="Complete set">${ic('check')}</button></div>`});
  h+=`</div><button class="add-set" data-a="addSet" data-m="${m}" data-ei="${ei}">+ Add set</button></div>`;return h}

/* ---------- library view ---------- */
const LS={q:'',muscle:'all',equip:'all',cat:'all'};
function filterEx(st){const toks=st.q.toLowerCase().split(/\s+/).filter(Boolean);return allEx().filter(e=>(st.muscle==='all'||e.muscle===st.muscle)&&(st.equip==='all'||e.equip===st.equip)&&(!st.cat||st.cat==='all'||e.cat===st.cat)&&toks.every(t=>(e.name+' '+MUSCLES[e.muscle]+' '+EQUIP[e.equip]).toLowerCase().includes(t))).sort((a,b)=>a.name.localeCompare(b.name))}
function filterBar(st,pre){return `<div class="search">${ic('search')}<input class="inp" type="search" placeholder="Search ${allEx().length} exercises…" data-in="${pre}q" value="${esc(st.q)}"></div>
  <div class="chips">${[['all','All muscles']].concat(Object.entries(MUSCLES)).map(([k,l])=>`<button class="chip ${st.muscle===k?'on':''}" data-a="${pre}f" data-k="muscle" data-v="${k}">${l}</button>`).join('')}</div>
  <div class="chips">${[['all','All types']].concat(Object.entries(CATS)).map(([k,l])=>`<button class="chip ${(st.cat||'all')===k?'on':''}" data-a="${pre}f" data-k="cat" data-v="${k}">${l}</button>`).join('')}</div>
  <div class="chips">${[['all','All equipment']].concat(Object.entries(EQUIP)).map(([k,l])=>`<button class="chip ${st.equip===k?'on':''}" data-a="${pre}f" data-k="equip" data-v="${k}">${l}</button>`).join('')}</div>`}
function exListHTML(st,sel){const list=filterEx(st);const H=idx().hist;if(!list.length)return `<div class="empty">${ic('search')}<div>No exercises match.<br><button class="btn btn-sm mt" data-a="newEx">${ic('plus')} Create “${esc(st.q||'custom exercise')}”</button></div></div>`;
  const item=e=>{const n=H[e.id]?H[e.id].length:0;return `<button class="ex-item ${sel&&sel.includes(e.id)?'sel':''}" data-a="${sel?'pick':'openEx'}" data-ex="${e.id}">${exThumb(e)}<div class="ex-txt"><b>${esc(e.name)}${e.custom?' <span class="badge ac">CUSTOM</span>':''}</b><span>${MUSCLES[e.muscle]} · ${EQUIP[e.equip]}${e.level&&e.level!=='beginner'?' · '+e.level:''}</span></div>${n?`<span class="ex-count">${n}×</span>`:''}${sel?`<span class="chk-c">${ic('check')}</span>`:''}</button>`};
  if(st.muscle==='all'&&!st.q&&(!st.cat||st.cat==='all')&&st.equip==='all'){let h='';for(const m in MUSCLES){const g=list.filter(e=>e.muscle===m);if(g.length)h+=`<div class="group-h"><i style="background:${MCOL[m]}"></i>${MUSCLES[m]} <span style="font-weight:600">${g.length}</span></div>`+g.map(item).join('')}return h}
  return `<div class="tiny dim" style="margin:4px 6px">${list.length} exercise${list.length>1?'s':''}</div>`+list.map(item).join('')}
VIEWS.library=()=>({head:`<h1>Exercises</h1><button class="icon-btn bg" data-a="newEx" aria-label="Add custom exercise">${ic('plus')}</button>`,body:filterBar(LS,'l')+`<div id="lib-list">${exListHTML(LS)}</div>`});

/* ---------- more view (tools + settings) ---------- */
VIEWS.more=()=>{const S=D.settings;const tog=(k,l,sub)=>`<div class="set-item"><div class="lbl">${l}${sub?`<small>${sub}</small>`:''}</div><button class="toggle ${S[k]?'on':''}" data-a="tog" data-k="${k}" aria-label="${l}"></button></div>`;
  const step=(k,l,v,sub)=>`<div class="set-item"><div class="lbl">${l}${sub?`<small>${sub}</small>`:''}</div><div class="stepper"><button data-a="step" data-k="${k}" data-d="-1">−</button><b>${v}</b><button data-a="step" data-k="${k}" data-d="1">+</button></div></div>`;
  const hasDemo=D.workouts.some(w=>w.demo)||D.body.some(b=>b.demo)||D.measures.some(b=>b.demo);
  let b=`<div class="tiles"><button class="tile" data-a="openBody"><div class="ti">${ic('scale')}</div><b>Body</b><span>Weight & measurements</span></button><button class="tile" data-a="openPlates"><div class="ti">${ic('plate')}</div><b>Plate calculator</b><span>Load the bar fast</span></button><button class="tile" data-a="openOrm"><div class="ti">${ic('calc')}</div><b>1RM calculator</b><span>Max & % table</span></button><button class="tile" data-a="openRecords"><div class="ti">${ic('trophy')}</div><b>All records</b><span>${idx().events.length} PRs logged</span></button></div>`;
  b+=moreV2HTML();
  b+=`<div class="sec-h">Settings</div><div class="card"><div class="set-item"><div class="lbl">Units<small>Weights, distance & measurements</small></div><div class="seg" style="width:130px"><button class="${!isLb()?'on':''}" data-a="unit" data-v="kg">kg</button><button class="${isLb()?'on':''}" data-a="unit" data-v="lb">lb</button></div></div>
  ${step('rest','Default rest timer',fmtSec(S.rest),'Per-exercise override in a workout')}${tog('autoRest','Auto-start rest timer','After completing a set')}${tog('sound','Timer sound')}${tog('vibrate','Vibration','Haptics & timer alert')}${step('weeklyGoal','Weekly goal',S.weeklyGoal+'×','Workouts per week')}${step('bar','Bar weight',isLb()?S.barLb+' lb':S.barKg+' kg','Used by plate calculator')}</div>`;
  b+=`<div class="sec-h">Data</div><div class="card"><div class="small muted mb">Everything is stored privately on this device (${D.workouts.length} workouts, ${D.body.length} weigh-ins, ${D.custom.length} custom exercises). Export a backup regularly.</div>
  <div class="grid2"><button class="btn" data-a="export">${ic('down2')} Export</button><button class="btn" data-a="import">${ic('up2')} Import</button></div>
  <button class="btn btn-block mt" style="background:rgba(90,180,255,.12);color:#5ab4ff" data-a="${hasDemo?'removeDemo':'loadDemo'}">${hasDemo?'Remove demo data':'Load demo data'}</button><div class="tiny dim center" style="margin-top:6px">Demo data adds ~16 weeks of clearly-labelled sample workouts & weigh-ins so you can preview graphs. It can be removed any time without touching your own logs.</div>
  <button class="btn btn-danger btn-block mt" data-a="clearAll">${ic('trash')} Clear all data</button></div>
  <div class="center tiny dim mt">IronLog v2 · works offline · exercise photos: free-exercise-db (Unlicense)</div>`;
  return {head:`<h1>More</h1>`,body:b}};

/* ---- app3.js ---- */
/* ================= workout logic ================= */
const newSet=(t='n')=>({id:uid(),t,w:null,r:null,done:false});
function newExEntry(exId,n,reps,hi,noRec){const prev=prevEntry(exId,{id:'',start:Date.now()+1});const pt=prev?prev.e.sets.filter(s=>s.done&&s.t!=='w').map(s=>s.t):[];n=n||pt.length||3;const e={id:uid(),exId,target:reps||null,sets:Array.from({length:Math.min(n,12)},(_,i)=>newSet(!reps&&pt[i]&&pt[i]!=='w'?pt[i]:'n'))};if(hi)e.hi=hi;if(!noRec)applyRec(e,null);return e}
function defaultName(){const h=new Date().getHours();return h<11?'Morning workout':h<17?'Afternoon workout':'Evening workout'}
async function startWorkout(tpl){if(D.active){const r=await ask('Workout in progress','Discard the current workout and start a new one?',[{label:'Discard & start new',v:true,cls:'btn-danger'},{label:'Resume current',v:false}]);if(r!==true){if(r===false)go('train');return}}
  D.active={id:uid(),name:tpl?tpl.name:defaultName(),start:Date.now(),notes:'',templateId:tpl&&tpl.id||null,exercises:(tpl?tpl.exercises:[]).map(te=>newExEntry(te.exId,te.sets,te.reps,te.hi))};D.restEnd=null;save();unlockAudio();go('train')}
function setField(s,f,val){const n=num(val);if(f==='w')s.w=n==null?null:fromW(n);else if(f==='dist')s.dist=n==null?null:fromD(n);else if(f==='r'||f==='sec'||f==='cal')s[f]=n==null?null:Math.max(0,Math.round(n));else if(f==='rpe')s.rpe=n==null?null:Math.min(10,Math.max(1,n));else s[f]=n}
const hasVal=s=>['w','r','sec','min','dist','cal'].some(f=>s[f]!=null&&s[f]!=='');
function validSet(type,s){if(type==='wr'||type==='bw')return s.r>0;if(type==='dur')return s.sec>0;return (s.min>0)||(s.dist>0)||(s.cal>0)}
function livePR(w,ei,si){const e=w.exercises[ei],s=e.sets[si],ex=EX(e.exId);const base=idx().best[e.exId];if(!base||!base.n)return [];const b=JSON.parse(JSON.stringify(base));e.sets.forEach((o,oi)=>{if(oi!==si&&isWork(o))applyBest(ex.type,b,o,0,true)});return s.t==='w'?[]:applyBest(ex.type,b,s,0,false)}
function cleanup(w){for(const e of w.exercises){const t=EX(e.exId).type;e.sets=e.sets.filter(s=>s.done&&validSet(t,s));delete e.warm;delete e.plateau;e.sets.forEach(s=>{delete s.pr;delete s.rec;if(t==='wr'&&s.w==null)s.w=0})}w.exercises=w.exercises.filter(e=>e.sets.length)}
function rr(m){if(m==='e'){const p=topPage();p&&paint(p)}else renderTab()}
function celebrate(ex,s,ks){const evText=prText({exId:ex.id,kinds:ks,si:0,s});toast(`<b>🏆 New personal record!</b>${esc(ex.name)} — ${evText}`,'pr');confetti();buzz([60,40,60,40,120])}
async function finishWorkout(){const w=D.active;if(!w)return;let done=0,inc=[];for(const e of w.exercises)for(const s of e.sets){if(s.done)done++;else if(hasVal(s))inc.push(s)}
  if(!done&&!inc.length){const r=await ask('Nothing logged yet','Complete at least one set before finishing. Discard this workout instead?',[{label:'Discard workout',v:'d',cls:'btn-danger'},{label:'Keep training',v:null}]);if(r==='d')discardActive();return}
  if(inc.length){const r=await ask('Unfinished sets',`${inc.length} set${inc.length>1?'s have':' has'} values but ${inc.length>1?'aren\'t':'isn\'t'} checked off.`,[{label:'Mark them complete',v:'c',cls:'btn-ac'},{label:'Discard them',v:'x'},{label:'Cancel',v:null}]);if(!r)return;if(r==='c')inc.forEach(s=>s.done=true)}
  cleanup(w);if(!w.exercises.length){toast('No valid sets — enter reps/time for your sets');return}
  w.end=Date.now();advanceProgram(w);D.workouts.push(w);D.active=null;D.restEnd=null;save();TAB='home';renderTab();renderDock();showSummary(w)}
function discardActive(){D.active=null;D.restEnd=null;save();renderTab();renderDock();toast('Workout discarded')}
function showSummary(w){const evs=idx().events.filter(e=>e.wid===w.id);if(evs.length)confetti();
  openSheet(`<div class="center" style="padding:6px 0 4px"><div style="font-size:44px">${evs.length?'🏆':'💪'}</div><div class="sheet-title" style="margin:6px 0 2px;font-size:22px">Workout complete!</div><div class="muted small">${esc(w.name)} · ${fmtDY(w.start)}</div></div>
  <div class="grid3 mt mb center"><div class="rec"><div class="v">${fmtDurShort(w.end-w.start)}</div><div class="d">Duration</div></div><div class="rec"><div class="v">${compact(toW(workoutVol(w)))}</div><div class="d">${wU()} volume</div></div><div class="rec"><div class="v">${workoutSets(w)}</div><div class="d">Sets</div></div></div>
  ${evs.length?`<div class="card"><h3>New records (${evs.length})</h3>${evs.map(ev=>`<div class="pr-row"><div class="trophy">${ic('trophy')}</div><div class="ex-txt"><b>${esc(EX(ev.exId).name)}</b><span>${prText(ev)}</span></div></div>`).join('')}</div>`:''}
  <div class="grid2"><button class="btn" data-x="tpl">${ic('save')} Save template</button><button class="btn btn-ac" data-x="ok">Done</button></div>`,sh=>{sh.addEventListener('click',ev=>{const b=ev.target.closest('[data-x]');if(!b)return;closeTop();if(b.dataset.x==='tpl')saveAsTemplate(w)})})}
function askText(title,val,ph=''){return new Promise(res=>{const el=document.createElement('div');el.className='modal-bg';el.innerHTML=`<div class="modal"><h3>${esc(title)}</h3><input class="inp mb mt" value="${esc(val)}" placeholder="${esc(ph)}"><div class="modal-btns"><button class="btn btn-ac" data-i="ok">Save</button><button class="btn" data-i="c">Cancel</button></div></div>`;const inp=$('input',el);el.addEventListener('click',ev=>{const b=ev.target.closest('[data-i]');if(b){el.remove();res(b.dataset.i==='ok'?inp.value.trim():null)}});inp.addEventListener('keydown',ev=>{if(ev.key==='Enter'){el.remove();res(inp.value.trim())}});document.body.appendChild(el);setTimeout(()=>inp.focus(),50)})}
async function saveAsTemplate(w){const name=await askText('Save as template',w.name);if(!name)return;D.templates.push({id:uid(),name,exercises:w.exercises.map(e=>{const ws=e.sets.filter(s=>s.t!=='w');const reps=ws.map(s=>s.r).filter(Boolean);const mode=reps.sort((a,b)=>reps.filter(v=>v===b).length-reps.filter(v=>v===a).length)[0];return {exId:e.exId,sets:Math.max(1,ws.length||e.sets.length),reps:EX(e.exId).type==='wr'||EX(e.exId).type==='bw'?mode||null:null}})});save();refresh();toast('Template saved')}

/* ================= pages ================= */
function openPicker(onDone,o={}){pushPage({title:o.title||'Add exercises',st:{q:'',muscle:'all',equip:'all',sel:[]},single:o.single,onDone,picker:true,
  render:p=>filterBar(p.st,'p')+`<div id="pk-list">${exListHTML(p.st,p.st.sel)}</div>`,right:()=>`<button class="icon-btn bg" data-a="newEx" data-pick="1" aria-label="Create exercise">${ic('plus')}</button>`,
  foot:p=>p.st.sel.length&&!p.single?`<button class="btn btn-ac btn-lg btn-block" data-a="pickDone">Add ${p.st.sel.length} exercise${p.st.sel.length>1?'s':''}</button>`:''})}
function updPicker(p){$('#pk-list',p.el).innerHTML=exListHTML(p.st,p.st.sel);const f=$('.pfoot',p.el),h=p.foot(p);f.innerHTML=h;f.style.display=h?'':'none'}
function openExForm(ex,fromPicker){const st=ex?{...ex}:{name:LS.q&&TAB==='library'?'':'',muscle:'chest',equip:'machine',type:'wr'};if(!ex){const pk=topPage();if(pk&&pk.picker&&pk.st.q)st.name=pk.st.q;else if(LS.q&&TAB==='library')st.name=LS.q}
  pushPage({title:ex?'Edit exercise':'New exercise',st,fromPicker,editing:ex,render:p=>{const s=p.st;const sel=(k,obj)=>`<select class="inp" data-in="pst" data-k="${k}">${Object.entries(obj).map(([v,l])=>`<option value="${v}" ${s[k]===v?'selected':''}>${l}</option>`).join('')}</select>`;
    return `<label class="field"><span>Name</span><input class="inp" data-in="pst" data-k="name" value="${esc(s.name)}" placeholder="e.g. Hammer Strength Iso Row"></label><label class="field"><span>Muscle group</span>${sel('muscle',MUSCLES)}</label><label class="field"><span>Equipment</span>${sel('equip',EQUIP)}</label><label class="field"><span>Tracking</span>${sel('type',TYPES)}</label>${ex&&idx().hist[ex.id]?'<div class="tiny dim mb">Changing tracking type on an exercise with history may hide older values.</div>':''}<button class="btn btn-ac btn-lg btn-block" data-a="saveEx">${ic('save')} Save exercise</button>${ex?`<button class="btn btn-danger btn-block mt" data-a="delEx" data-ex="${ex.id}">${ic('trash')} Delete exercise</button>`:''}`}})}
function openEx(exId,tab){const ex=EX(exId);const ns=(idx().hist[exId]||[]).filter(h=>h.m.sets>0).length;pushPage({title:()=>EX(exId).name,exId,st:{tab:tab||(ns?'progress':'howto'),metric:MET[ex.type][0].k,range:'all'},right:()=>EX(exId).custom?`<button class="icon-btn bg" data-a="editEx" data-ex="${exId}">${ic('edit')}</button>`:'',render:exDetail})}
const RANGES=[['1m','1M',30],['3m','3M',91],['6m','6M',182],['1y','1Y',365],['all','All',0]];
function exDetail(p){const ex=EX(p.exId),H=idx().hist[p.exId]||[],sessions=H.filter(h=>h.m.sets>0),st=p.st;
  let h=exHero(ex)+`<div class="tiny muted mb">${sessions.length} session${sessions.length===1?'':'s'} logged${sessions.length?' · last '+relDay(sessions[sessions.length-1].w.start).toLowerCase():''}</div>`;
  h+=`<div class="seg mb">${[['howto','How to'],['progress','Progress'],['records','Records'],['history','History']].map(([k,l])=>`<button class="${st.tab===k?'on':''}" data-a="st" data-k="tab" data-v="${k}">${l}</button>`).join('')}</div>`;
  if(st.tab==='howto')return h+howToHTML(ex,p)+`<button class="btn btn-ac btn-block mt" data-a="quickAdd" data-ex="${p.exId}">${ic('plus')} ${D.active?'Add to current workout':'Start workout with it'}</button>`;
  if(!sessions.length)return h+`<div class="empty">${ic('chart')}<div>No sessions logged for this exercise yet.</div><button class="btn btn-ac mt" data-a="quickAdd" data-ex="${p.exId}">${ic('plus')} ${D.active?'Add to current workout':'Start workout with it'}</button></div>`;
  if(st.tab==='progress'){const mets=MET[ex.type],me=mets.find(m=>m.k===st.metric)||mets[0];const rg=RANGES.find(r=>r[0]===st.range);const cut=rg[2]?Date.now()-rg[2]*DAY:0;
    const pts=sessions.filter(s=>s.w.start>=cut&&s.m[me.k]>0).map(s=>({x:s.w.start,y:dispVal(me.u,s.m[me.k])}));
    h+=`<div class="chips in mb">${mets.map(m=>`<button class="chip ${m.k===me.k?'on':''}" data-a="st" data-k="metric" data-v="${m.k}">${m.l}</button>`).join('')}</div>`;
    const fmt=v=>me.u==='sec'?fmtSec(v):me.u==='pace'?fmtSec(v*60):fmtN(v,me.u==='dist'?2:1)+' '+unitLabel(me.u);
    let top='';if(pts.length){const a=pts[0].y,z=pts[pts.length-1].y,best=me.k==='pace'?Math.min(...pts.map(p=>p.y)):Math.max(...pts.map(p=>p.y));const d=z-a,pct=a?d/a*100:0;const good=me.k==='pace'?d<0:d>0;
      top=`<div class="row" style="align-items:flex-end;margin-bottom:6px"><div><div class="tiny muted" style="font-weight:700;text-transform:uppercase;letter-spacing:.6px">${me.l} · latest</div><div class="bigval">${me.u==='sec'?fmtSec(z):me.u==='pace'?fmtSec(z*60):fmtN(z,me.u==='dist'?2:1)}<small>${me.u==='sec'?'':me.u==='pace'?'/'+dU():unitLabel(me.u)}</small></div></div><div class="sp"></div><div style="text-align:right">${pts.length>1?`<div class="delta ${d===0?'':good?'up':'down'}">${d>0?'▲':d<0?'▼':''} ${me.u==='sec'?fmtSec(Math.abs(d)):me.u==='pace'?fmtSec(Math.abs(d)*60):fmtN(Math.abs(d),1)} (${pct>0?'+':''}${fmtN(pct,1)}%)</div>`:''}<div class="tiny dim">best ${fmt(best)}</div></div></div>`}
    h+=`<div class="card">${top}${lineChart(pts,{fmt,tick:v=>me.u==='sec'?fmtSec(v):me.u==='pace'?fmtSec(v*60):compact(v),empty:'No data in this range',color:MCOL[ex.muscle]==='#c6ff33'?undefined:'#c6ff33'})}<div class="seg mt">${RANGES.map(([k,l])=>`<button class="${st.range===k?'on':''}" data-a="st" data-k="range" data-v="${k}">${l}</button>`).join('')}</div></div>`;
    if(ex.type==='wr'){const last=sessions[sessions.length-1];h+=`<div class="card"><h3>Last session<span class="r">${fmtD(last.w.start)}</span></h3>${last.e.sets.filter(s=>s.done).map((s,i)=>`<div class="kv"><span class="${s.t==='w'?'dim':''}">${s.t==='w'?'Warm-up':'Set '+(i+1)}</span><b>${setText('wr',s)}${s.rpe?` <span class="dim">@${s.rpe}</span>`:''}</b></div>`).join('')}<div class="kv"><span class="muted">Est. 1RM</span><b class="ac">${fWU(last.m.e1rm)}</b></div></div>`}
    h+=`<div class="tiny dim center">Est. 1RM uses the Epley formula: weight × (1 + reps / 30). Warm-up sets are excluded.</div>`}
  else if(st.tab==='records'){const R=idx().best[p.exId].rec;const recs=Object.keys(KLABEL).filter(k=>R[k]);
    const val=(k)=>{const r=R[k];if(k==='vol')return compact(toW(r.v))+' '+wU();if(k==='e1rm')return fWU(r.v);if(k==='maxw')return fWU(r.v)+(r.r?` <small class="muted">× ${r.r}</small>`:'');if(k==='setvol')return compact(toW(r.v))+' '+wU()+` <small class="muted">${fW(r.w)}×${r.r}</small>`;if(k==='maxsec'||k==='totsec')return fmtSec(r.v);if(k==='dist')return fmtN(toD(r.v),2)+' '+dU();if(k==='min')return fmtN(r.v,1)+' min';if(k==='cal')return fmtN(r.v,0)+' kcal';return fmtN(r.v,0)+' reps'};
    h+=`<div class="rec-grid">${recs.map(k=>`<div class="rec"><div class="k">${KLABEL[k]}</div><div class="v">${val(k)}</div><div class="d">${fmtDY(R[k].t)}</div></div>`).join('')}</div>`;
    if(ex.type==='wr'){const best={};for(const s of sessions)for(const x of s.e.sets){if(!isWork(x)||!x.r)continue;for(let n=1;n<=Math.min(x.r,12);n++)if(!best[n]||x.w>best[n].w)best[n]={w:x.w,t:s.w.start}}const e1=R.e1rm?R.e1rm.v:0;
      h+=`<div class="card"><h3>Rep maxes<span class="r">actual · predicted</span></h3><table class="tbl"><tr><th>Reps</th><th>Best lifted</th><th>Date</th><th>Predicted</th></tr>${[1,2,3,4,5,6,8,10,12].map(n=>`<tr><td><b>${n}RM</b></td><td>${best[n]?fWU(best[n].w):'<span class="dim">—</span>'}</td><td class="dim small">${best[n]?fmtD(best[n].t):''}</td><td class="muted">${e1?fW(e1/(1+n/30))+' '+wU():'—'}</td></tr>`).join('')}</table></div>`}
    const evs=idx().events.filter(e=>e.exId===p.exId).reverse();h+=`<div class="card"><h3>PR history<span class="r">${evs.length}</span></h3>${evs.length?evs.map(ev=>`<button class="pr-row" data-a="openW" data-w="${ev.wid}"><div class="trophy">${ic('trophy')}</div><div class="ex-txt"><b>${prText(ev)}</b><span>${ev.kinds.slice(1).map(k=>KLABEL[k]).join(' · ')||KLABEL[ev.kinds[0]]}</span></div><span class="tiny dim">${fmtDY(ev.t)}</span></button>`).join(''):'<div class="dim small">PRs are tracked from your second session onwards.</div>'}</div>`}
  else{h+=sessions.slice().reverse().map(s=>`<button class="card wcard" data-a="openW" data-w="${s.w.id}"><div class="row"><b style="flex:1">${fmtD(s.w.start,{weekday:'short',month:'short',day:'numeric',year:'numeric'})}</b><span class="tiny dim">${esc(s.w.name)}</span></div><div class="lines" style="margin-top:8px">${s.e.sets.filter(x=>x.done).map((x,i)=>`<div><span class="${x.t==='w'?'dim':''}">${x.t==='w'?'W':x.t==='d'?'D':x.t==='f'?'F':i+1}</span><span class="num">${setText(ex.type,x)}${x.rpe?` @${x.rpe}`:''}</span></div>`).join('')}</div>${ex.type==='wr'?`<div class="tiny muted" style="margin-top:8px">Est. 1RM <b class="ac">${fWU(s.m.e1rm)}</b> · Volume ${compact(toW(s.m.vol))} ${wU()}</div>`:''}</button>`).join('')}
  return h}
function openW(wid){pushPage({title:'Workout',wid,render:p=>{const w=D.workouts.find(x=>x.id===p.wid);if(!w)return '<div class="empty">Workout not found.</div>';const prs=setPRs(w.id);const nPR=idx().events.filter(e=>e.wid===w.id).length;
  let h=`<div style="font-size:24px;font-weight:800;letter-spacing:-.4px">${esc(w.name)} ${w.demo?'<span class="badge demo">DEMO</span>':''}</div><div class="muted small mb">${fmtD(w.start,{weekday:'long',month:'long',day:'numeric',year:'numeric'})} · ${fmtTime(w.start)}</div>
  <div class="grid3 mb center"><div class="rec"><div class="v">${fmtDurShort((w.end||w.start)-w.start)}</div><div class="d">Duration</div></div><div class="rec"><div class="v">${compact(toW(workoutVol(w)))}</div><div class="d">${wU()} volume</div></div><div class="rec"><div class="v">${nPR?'🏆 '+nPR:workoutSets(w)}</div><div class="d">${nPR?'PRs':'Sets'}</div></div></div>`;
  if(w.notes)h+=`<div class="card small muted" style="white-space:pre-wrap">${ic('note').replace('<svg','<svg style="width:15px;height:15px;vertical-align:-2px"')} ${esc(w.notes)}</div>`;
  w.exercises.forEach((e,ei)=>{const ex=EX(e.exId);const m=sessMetrics(e);let n=0;h+=`<div class="card"><button class="row" style="width:100%;text-align:left" data-a="openEx" data-ex="${e.exId}"><b class="ac" style="flex:1;font-size:16px">${esc(ex.name)}</b>${ic('chev').replace('<svg','<svg style="width:18px;height:18px;color:var(--tx3)"')}</button>${e.note?`<div class="small muted" style="margin:4px 0">${esc(e.note)}</div>`:''}<div style="margin-top:6px">${e.sets.map((s,si)=>{const lab=s.t==='n'?++n:s.t.toUpperCase();const pr=prs[ei+':'+si];return `<div class="dt-set"><span class="n t-${s.t}">${lab}</span><span style="flex:1;font-weight:600">${setText(ex.type,s)}${s.rpe?` <span class="dim">@ ${s.rpe}</span>`:''}</span>${pr?`<span class="badge pr">🏆 ${KLABEL[pr[0]]}</span>`:''}${ex.type==='wr'&&s.t!=='w'&&s.r?`<span class="tiny dim">${fW(e1rm(s.w,s.r))}</span>`:''}</div>`}).join('')}</div>${ex.type==='wr'?`<div class="tiny muted" style="margin-top:6px">Volume ${compact(toW(m.vol))} ${wU()} · Best est. 1RM ${fWU(m.e1rm)}${prs[ei+':-1']?' · <span style="color:var(--gold)">🏆 session volume PR</span>':''}</div>`:''}</div>`});
  h+=`<div class="grid2"><button class="btn" data-a="editW" data-w="${w.id}">${ic('edit')} Edit</button><button class="btn" data-a="repeatW" data-w="${w.id}">${ic('play')} Repeat</button><button class="btn" data-a="tplFromW" data-w="${w.id}">${ic('save')} Save template</button><button class="btn btn-danger" data-a="delW" data-w="${w.id}">${ic('trash')} Delete</button></div>`;return h}})}
function openEdit(wid){const w=D.workouts.find(x=>x.id===wid);if(!w)return;const draft=JSON.parse(JSON.stringify(w));pushPage({title:'Edit workout',st:{draft},render:p=>loggerHTML(p.st.draft,'e'),right:()=>`<button class="btn btn-ac btn-sm" data-a="saveEdit">Save</button>`})}
function openTplSheet(id){const t=D.templates.find(x=>x.id===id);if(!t)return;
  openSheet(`<div class="sheet-title">${esc(t.name)}</div>${t.program?`<div class="muted small" style="margin:-6px 4px 10px">${esc(t.program)}</div>`:''}<div class="card">${t.exercises.map(e=>{const ex=EX(e.exId);return `<div class="kv"><span>${esc(ex.name)}</span><b class="muted">${e.sets} × ${e.reps||(ex.type==='dur'?'hold':ex.type==='cardio'?'session':'—')}</b></div>`}).join('')}</div>
  <button class="btn btn-ac btn-lg btn-block" data-x="start">${ic('play')} Start workout</button><div class="grid3 mt"><button class="btn btn-sm" data-x="edit">${ic('edit')} Edit</button><button class="btn btn-sm" data-x="dup">${ic('copy')} Copy</button><button class="btn btn-sm btn-danger" data-x="del">${ic('trash')} Delete</button></div>`,sh=>{sh.addEventListener('click',async ev=>{const b=ev.target.closest('[data-x]');if(!b)return;const x=b.dataset.x;closeTop();
    if(x==='start')startWorkout(t);else if(x==='edit')openTplEditor(t);else if(x==='dup'){D.templates.push({...JSON.parse(JSON.stringify(t)),id:uid(),builtin:false,program:null,name:t.name+' (copy)'});save();refresh();toast('Copied to My templates')}
    else if(x==='del'){if(await confirmDanger('Delete template?',`“${esc(t.name)}” will be removed. Your workout history is not affected.`)){D.templates=D.templates.filter(y=>y.id!==t.id);save();refresh();toast('Template deleted')}}})})}
function openTplEditor(t){const draft=t?JSON.parse(JSON.stringify(t)):{id:null,name:'New template',exercises:[]};pushPage({title:t?'Edit template':'New template',st:{draft},render:p=>{const d=p.st.draft;
  return `<label class="field"><span>Template name</span><input class="inp" data-in="tname" value="${esc(d.name)}"></label>${d.exercises.map((e,i)=>{const ex=EX(e.exId);return `<div class="card"><div class="row"><b style="flex:1">${esc(ex.name)}</b><button class="icon-btn" data-a="tMove" data-i="${i}" data-d="-1">${ic('up')}</button><button class="icon-btn" data-a="tMove" data-i="${i}" data-d="1">${ic('down')}</button><button class="icon-btn" data-a="tDel" data-i="${i}" style="color:var(--red)">${ic('trash')}</button></div><div class="row mt"><span class="muted small" style="flex:1">Sets</span><div class="stepper"><button data-a="tSets" data-i="${i}" data-d="-1">−</button><b>${e.sets}</b><button data-a="tSets" data-i="${i}" data-d="1">+</button></div>${ex.type==='wr'||ex.type==='bw'?`<span class="muted small">Reps</span><input class="sin" style="width:60px" inputmode="numeric" data-in="treps" data-i="${i}" value="${e.reps||''}" placeholder="—">`:''}</div></div>`}).join('')}
  <button class="btn btn-outline btn-block btn-lg" data-a="tAdd">${ic('plus')} Add exercises</button>`},foot:()=>`<button class="btn btn-ac btn-lg btn-block" data-a="tSave">${ic('save')} Save template</button>`})}
function openBody(){pushPage({title:'Body',st:{range:'3m',mf:'waist',all:false},render:p=>{const st=p.st;const B=D.body.slice().sort((a,b)=>a.t-b.t);let h='';
  const rg=RANGES.find(r=>r[0]===st.range),cut=rg[2]?Date.now()-rg[2]*DAY:0;const pts=B.filter(b=>b.t>=cut).map(b=>({x:b.t,y:toW(b.kg)}));
  h+=`<div class="card"><h3>${ic('scale').replace('<svg','<svg style="width:16px;height:16px"')} Body weight</h3>`;
  if(B.length){const z=B[B.length-1],a=pts.length?pts[0].y:toW(z.kg),d=toW(z.kg)-a;h+=`<div class="row" style="align-items:flex-end;margin-bottom:6px"><div class="bigval">${fW(z.kg)}<small>${wU()}</small></div><div class="sp"></div><div style="text-align:right"><div class="delta" style="color:var(--tx)">${d>0?'+':''}${fmtN(d,1)} ${wU()}</div><div class="tiny dim">over ${rg[1]==='All'?'all time':'last '+rg[1]}</div></div></div>`}
  h+=lineChart(pts,{fmt:v=>fmtN(v,1)+' '+wU(),tick:v=>fmtN(v,1),empty:'Log your weight to start the graph',allowOne:true})+`<div class="seg mt">${RANGES.map(([k,l])=>`<button class="${st.range===k?'on':''}" data-a="st" data-k="range" data-v="${k}">${l}</button>`).join('')}</div>
  <div class="row mt" style="gap:8px"><input class="inp" id="bw-inp" inputmode="decimal" placeholder="Weight (${wU()})" style="flex:1.2"><input class="inp" id="bw-date" type="date" value="${isoDate(Date.now())}" style="flex:1.4;padding:0 8px"><button class="btn btn-ac" data-a="addBW">${ic('plus')}</button></div>`;
  if(B.length){const list=B.slice().reverse();h+=`<div class="mt">${(st.all?list:list.slice(0,6)).map((b,i,arr)=>{const nx=list[list.indexOf(b)+1];const d=nx?toW(b.kg)-toW(nx.kg):0;return `<div class="kv"><span>${fmtDY(b.t)} ${b.demo?'<span class="badge demo">DEMO</span>':''}</span><span class="row" style="gap:8px"><span class="tiny ${d>0?'':'ac'}">${nx?(d>0?'+':'')+fmtN(d,1):''}</span><b>${fW(b.kg)} ${wU()}</b><button class="icon-btn" style="width:30px;height:30px" data-a="delBW" data-id="${b.id}">${ic('x')}</button></span></div>`}).join('')}</div>${list.length>6?`<button class="btn btn-ghost btn-block btn-sm" data-a="st" data-k="all" data-v="${st.all?'':'1'}">${st.all?'Show less':'Show all '+list.length}</button>`:''}`}
  h+=`</div>`;
  const M=D.measures.slice().sort((a,b)=>a.t-b.t);h+=`<div class="card"><h3>${ic('ruler').replace('<svg','<svg style="width:16px;height:16px"')} Measurements<span class="r"><button class="ac" style="font-weight:700" data-a="addMeasure">+ Log</button></span></h3>`;
  if(!M.length)h+=`<div class="dim small">Optional: track waist, arms, chest, body-fat % and more. Tap “+ Log”.</div>`;
  else{const first={},last={};for(const m of M)for(const [k] of MFIELDS)if(m[k]!=null){if(first[k]==null)first[k]=m[k];last[k]=m[k]}
    h+=`<div class="rec-grid">${MFIELDS.filter(([k])=>last[k]!=null).map(([k,l,u])=>{const d=last[k]-first[k];const cv=v=>u==='%'?fmtN(v,1):fmtN(toL(v),1);return `<button class="rec" style="text-align:left;${st.mf===k?'border-color:var(--ac)':''}" data-a="st" data-k="mf" data-v="${k}"><div class="k">${l}</div><div class="v">${cv(last[k])}<small class="muted" style="font-size:13px"> ${u==='%'?'%':lU()}</small></div><div class="d">${d?(d>0?'+':'−')+cv(Math.abs(d))+' since '+fmtD(M[0].t):'no change'}</div></button>`}).join('')}</div>`;
    const f=MFIELDS.find(x=>x[0]===st.mf)||MFIELDS[0];const mp=M.filter(m=>m[f[0]]!=null).map(m=>({x:m.t,y:f[2]==='%'?m[f[0]]:toL(m[f[0]])}));h+=`<div class="tiny muted mb" style="font-weight:700">${f[1].toUpperCase()} TREND</div>`+lineChart(mp,{fmt:v=>fmtN(v,1)+(f[2]==='%'?'%':' '+lU()),tick:v=>fmtN(v,1),allowOne:true,color:'#5ab4ff',empty:'Tap a measurement above to graph it'});
    h+=`<div class="mt">${M.slice().reverse().slice(0,8).map(m=>`<div class="kv"><span>${fmtDY(m.t)} ${m.demo?'<span class="badge demo">DEMO</span>':''}</span><span class="row" style="gap:6px"><span class="tiny muted">${MFIELDS.filter(([k])=>m[k]!=null).length} values</span><button class="icon-btn" style="width:30px;height:30px" data-a="delMeasure" data-id="${m.id}">${ic('x')}</button></span></div>`).join('')}</div>`}
  return h+'</div>'}})}
const MFIELDS=[['bf','Body fat','%'],['neck','Neck','L'],['shoulders','Shoulders','L'],['chest','Chest','L'],['waist','Waist','L'],['hips','Hips','L'],['arm','Arm','L'],['forearm','Forearm','L'],['thigh','Thigh','L'],['calf','Calf','L']];
function measureSheet(){openSheet(`<div class="sheet-title">Log measurements</div><label class="field"><span>Date</span><input class="inp" type="date" id="m-date" value="${isoDate(Date.now())}"></label><div class="grid2">${MFIELDS.map(([k,l,u])=>`<label class="field" style="margin:0"><span>${l} (${u==='%'?'%':lU()})</span><input class="inp" inputmode="decimal" id="m-${k}"></label>`).join('')}</div><button class="btn btn-ac btn-lg btn-block mt" data-x="save">Save</button>`,sh=>{sh.addEventListener('click',ev=>{if(!ev.target.closest('[data-x]'))return;const m={id:uid(),t:parseIso($('#m-date',sh).value||isoDate(Date.now()))};let n=0;for(const [k,,u] of MFIELDS){const v=num($('#m-'+k,sh).value);if(v!=null&&v>0){m[k]=u==='%'?v:fromL(v);n++}}if(!n){toast('Enter at least one measurement');return}D.measures.push(m);save();closeTop();refresh();toast('Measurements saved')})})}
const PLATES={kg:[25,20,15,10,5,2.5,1.25,0.5],lb:[45,35,25,10,5,2.5,1.25]};
const PCOL={25:'#e5484d',20:'#3e7bfa',15:'#f5c518',10:'#30a46c',5:'#e8e8e8',2.5:'#e5484d',1.25:'#bbb',0.5:'#888',45:'#3e7bfa',35:'#f5c518'};
const BARS={kg:[20,15,10,7,25,0],lb:[45,35,33,25,15,55,0]};
function openPlates(){const u=D.settings.unit;pushPage({title:'Plate calculator',st:{u,target:'',bar:u==='lb'?D.settings.barLb:D.settings.barKg,off:{}},render:p=>{const s=p.st;return `<div class="seg mb">${['kg','lb'].map(x=>`<button class="${s.u===x?'on':''}" data-a="pcUnit" data-v="${x}">${x}</button>`).join('')}</div>
  <label class="field"><span>Target weight (${s.u})</span><div class="row" style="gap:8px"><button class="btn" data-a="pcAdj" data-d="-1">−${s.u==='kg'?2.5:5}</button><input class="inp center" style="font-size:24px;font-weight:800;height:56px" inputmode="decimal" data-in="pst" data-k="target" value="${esc(s.target)}" placeholder="e.g. ${s.u==='kg'?100:225}"><button class="btn" data-a="pcAdj" data-d="1">+${s.u==='kg'?2.5:5}</button></div></label>
  <div class="field"><span>Bar weight</span><div class="chips in">${BARS[s.u].map(b=>`<button class="chip ${s.bar===b?'on':''}" data-a="pcBar" data-v="${b}">${b?b+' '+s.u:'No bar'}</button>`).join('')}</div></div>
  <div class="card" id="pc-out">${plateOut(s)}</div>
  <div class="field"><span>Available plates (tap to toggle)</span><div class="chips in" style="flex-wrap:wrap">${PLATES[s.u].map(x=>`<button class="chip ${s.off[s.u+x]?'':'on'}" data-a="pcPl" data-v="${x}">${x}</button>`).join('')}</div></div>`},onInput:p=>{$('#pc-out',p.el).innerHTML=plateOut(p.st)}})}
function plateOut(s){const t=num(s.target);if(t==null)return `<div class="dim center small" style="padding:16px">Enter a target weight to see the plates per side.</div>`;if(t<s.bar)return `<div class="center" style="padding:14px">Target is lighter than the ${s.bar} ${s.u} bar.</div>`;
  let rem=(t-s.bar)/2;const per=[];for(const pl of PLATES[s.u]){if(s.off[s.u+pl])continue;while(rem>=pl-1e-9){per.push(pl);rem=r2(rem-pl)}}const ach=s.bar+2*per.reduce((a,b)=>a+b,0);
  const counts={};per.forEach(x=>counts[x]=(counts[x]||0)+1);const mxp=Math.max(...PLATES[s.u]);
  const vis=`<div class="plates-vis"><div class="bar" style="width:46px"></div><div class="sleeve"></div>${per.map(x=>`<div class="pl" style="height:${40+90*Math.sqrt(x/mxp)}px;background:${PCOL[x]||'#999'}">${x}</div>`).join('')}<div class="bar" style="width:26px"></div></div>`;
  return `<div class="tiny muted center" style="font-weight:700;letter-spacing:.6px">PER SIDE</div>${vis}<div class="plate-list">${Object.entries(counts).sort((a,b)=>b[0]-a[0]).map(([x,n])=>`<span class="pp">${n} × ${x}</span>`).join('')||'<span class="muted">Just the bar</span>'}</div><div class="center mt">${Math.abs(ach-t)<1e-6?`<b class="ac">✓ Exactly ${fmtN(t,2)} ${s.u}</b>`:`<b style="color:var(--gold)">Closest: ${fmtN(ach,2)} ${s.u}</b> <span class="muted small">(${fmtN(t-ach,2)} ${s.u} short)</span>`}</div>`}
function openOrm(){pushPage({title:'1RM calculator',st:{w:'',r:''},render:p=>`<div class="grid2"><label class="field"><span>Weight (${wU()})</span><input class="inp" style="font-size:22px;font-weight:800" inputmode="decimal" data-in="pst" data-k="w" value="${esc(p.st.w)}" placeholder="100"></label><label class="field"><span>Reps</span><input class="inp" style="font-size:22px;font-weight:800" inputmode="numeric" data-in="pst" data-k="r" value="${esc(p.st.r)}" placeholder="5"></label></div><div id="orm-out">${ormOut(p.st)}</div>`,onInput:p=>{$('#orm-out',p.el).innerHTML=ormOut(p.st)}})}
function ormOut(s){const w=num(s.w),r=Math.round(num(s.r)||0);if(!w||!r||r<1)return `<div class="card dim center small" style="padding:22px">Enter a weight and the reps you did to estimate your one-rep max.</div>`;if(r>30)return `<div class="card center small">Use sets of 30 reps or fewer for a meaningful estimate.</div>`;
  const ep=e1rm(w,r),bz=brzycki(w,r),avg=(ep+bz)/2;
  return `<div class="card center"><div class="tiny muted" style="font-weight:700;letter-spacing:.6px">ESTIMATED 1RM (EPLEY)</div><div class="bigval ac" style="font-size:46px">${fmtN(ep,1)}<small>${wU()}</small></div><div class="small muted">Brzycki ${fmtN(bz,1)} · Average ${fmtN(avg,1)} ${wU()}</div></div>
  <div class="card"><h3>Percentage table</h3><table class="tbl"><tr><th>%</th><th>Weight</th><th>≈ Reps</th></tr>${[100,95,90,85,80,75,70,65,60,55,50].map(pc=>{const reps=pc===100?1:Math.max(1,Math.round(30*(100/pc-1)));return `<tr class="${pc===80?'hl':''}"><td>${pc}%</td><td><b>${fmtN(ep*pc/100,1)}</b> ${wU()}</td><td>${reps}</td></tr>`}).join('')}</table></div>`}
function openRecords(){pushPage({title:'All records',render:()=>{const B=idx().best;const ids=Object.keys(B).filter(k=>B[k].n>0).sort((a,b)=>(B[b].last||0)-(B[a].last||0));if(!ids.length)return `<div class="empty">${ic('trophy')}<div>Records appear once you log workouts.</div></div>`;
  return ids.map(id=>{const ex=EX(id),R=B[id].rec;let main='';if(ex.type==='wr'&&R.e1rm)main=`${fWU(R.e1rm.v)} <span class="dim">e1RM</span> · ${fW(R.maxw.v)}×${R.maxw.r} <span class="dim">top</span>`;else if(ex.type==='bw'&&R.maxreps)main=`${R.maxreps.v} reps`;else if(ex.type==='dur'&&R.maxsec)main=fmtSec(R.maxsec.v);else if(R.dist)main=fmtN(toD(R.dist.v),2)+' '+dU();else if(R.min)main=fmtN(R.min.v,1)+' min';
    return `<button class="ex-item" data-a="openEx" data-ex="${id}">${exIcon(ex)}<div class="ex-txt"><b>${esc(ex.name)}</b><span>${main}</span></div><span class="ex-count">${B[id].n}×</span></button>`}).join('')}})}

/* ================= demo data ================= */
function genDemo(){let seed=20240611;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};const R=(x,s)=>s?Math.round(x/s)*s:Math.round(x);
  const plans={1:['Push Day',[['Barbell Bench Press',62.5,8,4,1,2.5],['Incline Dumbbell Press',22,10,3,0,2],['Shoulder Press Machine',40,10,3,0,2.5],['Dumbbell Lateral Raise',8,14,3,0,1],['Pec Deck',45,12,3,0,2.5],['Tricep Rope Pushdown',22.5,12,3,0,2.5]]],
    2:['Pull Day',[['Deadlift',110,5,3,1,5],['Pull-Up',0,7,3,0,0],['Lat Pulldown',55,10,3,0,2.5],['Seated Cable Row',55,10,3,0,2.5],['Face Pull',17.5,15,3,0,2.5],['Barbell Curl',27.5,10,3,0,2.5],['Hammer Curl',12,12,2,0,1]]],
    4:['Leg Day',[['Barbell Back Squat',85,6,4,1,2.5],['Leg Press',150,10,3,0,5],['Romanian Deadlift',70,8,3,0,2.5],['Leg Extension',45,12,3,0,2.5],['Lying Leg Curl',35,12,3,0,2.5],['Standing Calf Raise Machine',60,12,4,0,5],['Hip Abductor Machine',50,15,2,0,5]]],
    6:['Upper + Conditioning',[['Overhead Press',40,6,4,1,2.5],['Chest-Supported Dumbbell Row',24,10,3,0,2],['Cable Crossover',15,12,3,0,2.5],['Hanging Leg Raise',0,10,3,0,0],['Plank',0,0,3,0,0],['Treadmill Run',0,0,1,0,0],['Rowing Machine',0,0,1,0,0]]]};
  const days=112,start=sod(Date.now()-days*DAY);let cnt=0;
  for(let i=0;i<days;i++){const day=addDays(start,i);const p=i/days;const wd=new Date(day).getDay();
    if(rnd()<.5)D.body.push({id:uid(),t:day+7*36e5,kg:R(84.6-3.4*p+(rnd()-.5)*.9,.1),demo:true});
    if(i%14===0)D.measures.push({id:uid(),t:day+8*36e5,bf:R(21-3.4*p+(rnd()-.5)*.4,.1),neck:39+.3*p,shoulders:118+2*p,chest:103+1.6*p,waist:R(91-4.2*p+(rnd()-.5)*.6,.1),hips:100-1.5*p,arm:R(37+1.3*p,.1),forearm:30+.5*p,thigh:R(59+1.4*p,.1),calf:38+.4*p,demo:true});
    const plan=plans[wd];if(!plan||rnd()<.1)continue;
    const st=day+(17.5+rnd()*2)*36e5,dur=(52+rnd()*28)*6e4;
    const w={id:uid(),name:plan[0],start:Math.round(st),end:Math.round(st+dur),notes:'',demo:true,exercises:[]};
    for(const [name,base,reps,sets,warm,step] of plan[1]){const exId=exByName(name),t=EX(exId).type;const e={id:uid(),exId,sets:[]};
      if(t==='wr'){const wt=R(base*(1+.2*p+(rnd()-.5)*.05),step);if(warm){e.sets.push({id:uid(),t:'w',w:R(wt*.5,step),r:8,done:true});e.sets.push({id:uid(),t:'w',w:R(wt*.75,step),r:4,done:true})}
        for(let k=0;k<sets;k++){const last=k===sets-1;const r=Math.max(3,reps+Math.floor(rnd()*3)-1-(k>1?1:0)+(last&&rnd()<.3?2:0));e.sets.push({id:uid(),t:last&&rnd()<.25?'f':'n',w:wt,r,rpe:rnd()<.5?R(7+rnd()*2.5,.5):null,done:true})}}
      else if(t==='bw'){for(let k=0;k<sets;k++)e.sets.push({id:uid(),t:'n',w:null,r:Math.max(2,R(reps*(1+.45*p)+(rnd()-.5)*2-k),0),done:true})}
      else if(t==='dur'){for(let k=0;k<sets;k++)e.sets.push({id:uid(),t:'n',sec:R(45+50*p+(rnd()-.5)*12-k*5,5),done:true})}
      else{const mn=name==='Rowing Machine'?R(8+rnd()*6,1):R(18+rnd()*10,1);const sp=name==='Rowing Machine'?.24+.02*p:.15+.025*p;e.sets.push({id:uid(),t:'n',min:mn,dist:R(mn*sp*(1+(rnd()-.5)*.05),.01),cal:R(mn*(name==='Rowing Machine'?12:11),1),done:true})}
      w.exercises.push(e)}
    D.workouts.push(w);cnt++}
  return cnt}

/* ================= actions ================= */
const A={};
A.back=()=>closeTop();
A.tab=el=>go(el.dataset.t);
A.startEmpty=()=>startWorkout(null);
A.finish=()=>finishWorkout();
A.cancelW=async()=>{if(await confirmDanger('Discard workout?','All sets logged in this workout will be lost.','Discard'))discardActive()};
A.addEx=el=>{const m=el.dataset.m,w=getW(m);openPicker(ids=>{ids.forEach(id=>w.exercises.push(newExEntry(id,0,null,null,m==='e')));m==='a'?save():null;rr(m)})};
A.pick=el=>{const p=topPage(),id=el.dataset.ex;if(p.single){closePage(p);p.onDone([id]);return}const i=p.st.sel.indexOf(id);i<0?p.st.sel.push(id):p.st.sel.splice(i,1);updPicker(p)};
A.pickDone=()=>{const p=topPage();const ids=p.st.sel.slice();closePage(p);p.onDone(ids)};
A.lf=el=>{LS[el.dataset.k]=el.dataset.v;renderTab()};
A.pf=el=>{const p=topPage();p.st[el.dataset.k]=el.dataset.v;paint(p)};
A.st=el=>{const p=topPage();p.st[el.dataset.k]=el.dataset.v;paint(p)};
A.openEx=el=>openEx(el.dataset.ex,el.dataset.tab);
A.openW=el=>openW(el.dataset.w);
A.openTpl=el=>openTplSheet(el.dataset.id);
A.newTpl=()=>openTplEditor(null);
A.newEx=el=>openExForm(null,!!el.dataset.pick);
A.editEx=el=>openExForm(EX(el.dataset.ex));
A.saveEx=()=>{const p=topPage(),s=p.st;const name=(s.name||'').trim();if(!name){toast('Give the exercise a name');return}
  if(p.editing){const c=D.custom.find(x=>x.id===p.editing.id);Object.assign(c,{name,muscle:s.muscle,equip:s.equip,type:s.type})}else{if(allEx().some(e=>e.name.toLowerCase()===name.toLowerCase())){toast('An exercise with that name already exists');return}const c={id:'c-'+uid(),name,muscle:s.muscle,equip:s.equip,type:s.type,custom:true};D.custom.push(c);
    if(p.fromPicker){closePage(p);save();const pk=topPage();if(pk&&pk.picker){if(pk.single){closePage(pk);pk.onDone([c.id])}else{pk.st.sel.push(c.id);pk.st.q='';paint(pk)}}toast('Exercise created');return}}
  save();closePage(p);refresh();toast('Exercise saved')};
A.delEx=async el=>{const id=el.dataset.ex,used=(idx().hist[id]||[]).length;if(!await confirmDanger('Delete exercise?',used?`It's used in ${used} workout${used>1?'s':''}. History is kept but the exercise is hidden from the library.`:'This custom exercise will be removed.'))return;const c=D.custom.find(x=>x.id===id);if(used)c.hidden=true;else D.custom=D.custom.filter(x=>x.id!==id);save();while(stack.length)closeTop();refresh();toast('Exercise deleted')};
A.quickAdd=el=>{const id=el.dataset.ex;if(D.active){D.active.exercises.push(newExEntry(id));save();go('train');toast('Added to workout')}else startWorkout({name:defaultName(),exercises:[{exId:id,sets:3}]})};
A.wMenu=el=>{const m=el.dataset.m,w=getW(m);menu('Workout',m==='a'?[{label:'Save as template',icon:'save',fn:()=>saveAsTemplate(w)},{label:'Reset start time to now',icon:'timer',fn:()=>{w.start=Date.now();save();renderTab()}},{label:'Discard workout',icon:'trash',danger:true,fn:()=>A.cancelW()}]:[{label:'Delete workout',icon:'trash',danger:true,fn:()=>A.delW({dataset:{w:w.id}})}])};
A.exMenu=el=>{const m=el.dataset.m,w=getW(m),ei=+el.dataset.ei,e=w.exercises[ei];const mv=d=>{const j=ei+d;if(j<0||j>=w.exercises.length)return;[w.exercises[ei],w.exercises[j]]=[w.exercises[j],w.exercises[ei]];sv(m)};
  menu(EX(e.exId).name,[e.note==null&&{label:'Add note',icon:'note',fn:()=>{e.note='';sv(m)}},m==='a'&&{label:'Rest timer',icon:'timer',fn:()=>A.exRest({dataset:{ei}})},ei>0&&{label:'Move up',icon:'up',fn:()=>mv(-1)},ei<w.exercises.length-1&&{label:'Move down',icon:'down',fn:()=>mv(1)},m==='a'&&{label:'How to & quick tips',icon:'info',fn:()=>openTips(e.exId,ei)},m==='a'&&EX(e.exId).type==='wr'&&{label:'Add warm-up sets',icon:'flame',fn:()=>{if(addWarmups(e,w))sv(m)}},{label:'Replace exercise',icon:'swap',fn:()=>openPicker(ids=>{e.exId=ids[0];delete e.target;delete e.hi;delete e.why;delete e.warm;delete e.plateau;e.sets=e.sets.filter(s=>s.t!=='w'||s.done);e.sets.forEach(s=>delete s.rec);if(m==='a')applyRec(e,w);sv(m)},{single:true,title:'Replace with…'})},{label:'Progress & history',icon:'chart',fn:()=>openEx(e.exId)},{label:'Remove exercise',icon:'trash',danger:true,fn:()=>{w.exercises.splice(ei,1);sv(m)}}])};
function sv(m){if(m==='a')save();rr(m)}
A.exRest=el=>{const e=D.active.exercises[+el.dataset.ei];const cur=e.rest!=null?e.rest:D.settings.rest;menu('Rest timer for this exercise',[0,30,45,60,75,90,120,150,180,240,300].map(s=>({label:s?fmtSec(s)+(s===D.settings.rest?' (default)':''):'Off',on:s===cur,icon:s===cur?'check':'timer',fn:()=>{e.rest=s;save();renderTab()}})))};
A.setType=el=>{const m=el.dataset.m,w=getW(m),e=w.exercises[+el.dataset.ei],si=+el.dataset.si,s=e.sets[si];const T=(t,l)=>({label:l,on:s.t===t,icon:s.t===t?'check':null,fn:()=>{s.t=t;if(t==='w')delete s.pr;sv(m)}});
  menu('Set '+setLabel(e,si),[T('w','<b style="color:#ffc53d;width:21px;display:inline-block">W</b> Warm-up'),T('n','<b style="width:21px;display:inline-block">1</b> Working set'),T('d','<b style="color:#5ab4ff;width:21px;display:inline-block">D</b> Drop set'),T('f','<b style="color:#ff5a5f;width:21px;display:inline-block">F</b> Failure'),{label:'Delete set',icon:'trash',danger:true,fn:()=>{e.sets.splice(si,1);sv(m)}}])};
A.usePrev=el=>{const m=el.dataset.m,w=getW(m),e=w.exercises[+el.dataset.ei],s=e.sets[+el.dataset.si];const pv=prevEntry(e.exId,w);const p=pv&&prevMatch(e,+el.dataset.si,pv.e.sets.filter(x=>x.done));if(!p||s.done)return;for(const f of ['w','r','sec','min','dist','cal'])if(p[f]!=null)s[f]=p[f];sv(m)};
A.addSet=el=>{const m=el.dataset.m,w=getW(m),e=w.exercises[+el.dataset.ei];const last=e.sets[e.sets.length-1];const s=newSet(last&&last.t!=='w'?last.t:'n');if(last&&last.rec&&last.t!=='w')s.rec=Object.assign({},last.rec);if(m==='e')s.done=true;e.sets.push(s);sv(m)};
A.toggleDone=el=>{const m=el.dataset.m,w=getW(m),ei=+el.dataset.ei,si=+el.dataset.si,e=w.exercises[ei],s=e.sets[si],ex=EX(e.exId);unlockAudio();
  if(s.done){s.done=false;delete s.pr;sv(m);return}
  const row=el.closest('.set-row');$$('input.sin',row).forEach(inp=>{const f=inp.dataset.f;if(f==='rpe')return;if((s[f]==null||s[f]==='')&&inp.placeholder)setField(s,f,inp.placeholder)});
  if(!validSet(ex.type,s)){const need=ex.type==='dur'?'sec':ex.type==='cardio'?'min':'r';toast(ex.type==='cardio'?'Enter time, distance or calories':ex.type==='dur'?'Enter the hold time in seconds':'Enter reps first');const i=$(`input[data-f="${need}"]`,row);i&&i.focus();return}
  if(ex.type==='wr'&&s.w==null)s.w=0;s.done=true;buzz(12);
  if(m==='a'){const ks=livePR(w,ei,si);if(ks.length){s.pr=ks;celebrate(ex,s,ks)}const rest=e.rest!=null?e.rest:D.settings.rest;if(D.settings.autoRest&&rest)startRest(rest)}
  sv(m)};
A.restAdj=el=>{D.restEnd=Math.max(Date.now()+1000,D.restEnd+(+el.dataset.d)*1000);D.restTotal=Math.max(D.restTotal+(+el.dataset.d),1);save();renderDock()};
A.restSkip=()=>{D.restEnd=null;save();renderDock()};
A.saveEdit=()=>{const p=topPage(),d=p.st.draft;d.exercises.forEach(e=>e.sets.forEach(s=>{if(!s.done&&hasVal(s))s.done=true}));cleanup(d);if(!d.exercises.length){toast('A workout needs at least one valid set');return}const i=D.workouts.findIndex(x=>x.id===d.id);if(i>=0)D.workouts[i]=d;save();closePage(p);refresh();toast('Workout updated')};
A.editW=el=>openEdit(el.dataset.w);
A.repeatW=el=>{const w=D.workouts.find(x=>x.id===el.dataset.w);startWorkout({id:w.templateId,name:w.name.replace(/ \(demo\)$/,''),exercises:w.exercises.map(e=>({exId:e.exId,sets:e.sets.length}))})};
A.tplFromW=el=>saveAsTemplate(D.workouts.find(x=>x.id===el.dataset.w));
A.delW=async el=>{if(!await confirmDanger('Delete workout?','This workout and any PRs set in it will be permanently removed.'))return;D.workouts=D.workouts.filter(x=>x.id!==el.dataset.w);save();while(stack.length)closeTop();refresh();toast('Workout deleted')};
A.tMove=el=>{const p=topPage(),a=p.st.draft.exercises,i=+el.dataset.i,j=i+(+el.dataset.d);if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];paint(p)};
A.tDel=el=>{const p=topPage();p.st.draft.exercises.splice(+el.dataset.i,1);paint(p)};
A.tSets=el=>{const p=topPage(),e=p.st.draft.exercises[+el.dataset.i];e.sets=Math.min(12,Math.max(1,e.sets+(+el.dataset.d)));paint(p)};
A.tAdd=()=>{const p=topPage();openPicker(ids=>{ids.forEach(id=>p.st.draft.exercises.push({exId:id,sets:3,reps:EX(id).type==='wr'?10:null}));paint(p)})};
A.tSave=()=>{const p=topPage(),d=p.st.draft;if(!d.name.trim()){toast('Name your template');return}if(!d.exercises.length){toast('Add at least one exercise');return}if(d.id){const i=D.templates.findIndex(t=>t.id===d.id);D.templates[i]=d}else{d.id=uid();D.templates.push(d)}save();closePage(p);refresh();toast('Template saved')};
A.tog=el=>{D.settings[el.dataset.k]=!D.settings[el.dataset.k];save();renderTab()};
A.unit=el=>{D.settings.unit=el.dataset.v;save();refresh()};
A.step=el=>{const S=D.settings,k=el.dataset.k,d=+el.dataset.d;if(k==='rest')S.rest=Math.min(600,Math.max(0,S.rest+d*15));else if(k==='weeklyGoal')S.weeklyGoal=Math.min(14,Math.max(1,S.weeklyGoal+d));else if(k==='bar'){const u=isLb()?'lb':'kg',key=isLb()?'barLb':'barKg',arr=BARS[u].filter(Boolean).sort((a,b)=>a-b);let i=arr.indexOf(S[key]);i=Math.min(arr.length-1,Math.max(0,(i<0?0:i)+d));S[key]=arr[i]}save();renderTab()};
A.export=()=>{const blob=new Blob([JSON.stringify(D,null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`ironlog-backup-${isoDate(Date.now())}.json`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);toast('Backup exported')};
A.import=()=>{const i=document.createElement('input');i.type='file';i.accept='application/json,.json';i.onchange=async()=>{const f=i.files[0];if(!f)return;try{const d=JSON.parse(await f.text());if(!d||!Array.isArray(d.workouts))throw new Error('bad');if(!await ask('Import backup?',`This replaces your current data with ${d.workouts.length} workouts from the file.`,[{label:'Replace my data',v:true,cls:'btn-danger'},{label:'Cancel',v:false}]))return;D=migrate(d);save();refresh();toast('Data imported')}catch(e){toast('That file is not a valid IronLog backup')}};i.click()};
A.loadDemo=()=>{if(D.workouts.some(w=>w.demo)){toast('Demo data already loaded');return}const n=genDemo();save();go('home');toast(`Loaded ${n} demo workouts`)};
A.removeDemo=async()=>{if(!await ask('Remove demo data?','Demo workouts, weigh-ins and measurements will be removed. Your own data stays.',[{label:'Remove demo data',v:true,cls:'btn-danger'},{label:'Cancel',v:false}]))return;D.workouts=D.workouts.filter(w=>!w.demo);D.body=D.body.filter(b=>!b.demo);D.measures=D.measures.filter(b=>!b.demo);save();refresh();toast('Demo data removed')};
A.clearAll=async()=>{if(!await confirmDanger('Clear ALL data?','Every workout, template, weigh-in and setting on this device will be erased. Export a backup first if unsure.','Erase everything'))return;D=defaults();save();go('home');toast('All data cleared')};
A.openBody=()=>openBody();A.openPlates=()=>openPlates();A.openOrm=()=>openOrm();A.openRecords=()=>openRecords();
A.addBW=()=>{const p=topPage(),v=num($('#bw-inp',p.el).value);if(!v||v<=0){toast('Enter your weight');return}const ds=$('#bw-date',p.el).value||isoDate(Date.now());D.body.push({id:uid(),t:parseIso(ds,isoTime(Date.now())),kg:fromW(v)});save();paint(p);toast('Weight logged')};
A.delBW=el=>{D.body=D.body.filter(b=>b.id!==el.dataset.id);save();paint(topPage())};
A.addMeasure=()=>measureSheet();
A.delMeasure=el=>{D.measures=D.measures.filter(b=>b.id!==el.dataset.id);save();paint(topPage())};
A.pcUnit=el=>{const p=topPage();p.st.u=el.dataset.v;p.st.bar=p.st.u==='lb'?D.settings.barLb:D.settings.barKg;p.st.target='';paint(p)};
A.pcBar=el=>{const p=topPage();p.st.bar=+el.dataset.v;paint(p)};
A.pcPl=el=>{const p=topPage(),k=p.st.u+el.dataset.v;p.st.off[k]=!p.st.off[k];paint(p)};
A.pcAdj=el=>{const p=topPage(),s=p.st,st=s.u==='kg'?2.5:5;s.target=String(Math.max(0,(num(s.target)||s.bar)+(+el.dataset.d)*st));paint(p)};

/* ================= events ================= */
document.addEventListener('click',ev=>{const el=ev.target.closest('[data-a]');if(!el)return;const f=A[el.dataset.a];if(f){ev.preventDefault();f(el,ev)}});
document.addEventListener('input',ev=>{const el=ev.target,k=el.dataset&&el.dataset.in;if(!k)return;const m=el.dataset.m;
  if(k==='lq'){LS.q=el.value;$('#lib-list').innerHTML=exListHTML(LS);return}
  if(k==='pq'){const p=topPage();p.st.q=el.value;updPicker(p);return}
  if(k==='pst'){const p=topPage();p.st[el.dataset.k]=el.value;p.onInput&&p.onInput(p,el.dataset.k);return}
  if(k==='tname'){topPage().st.draft.name=el.value;return}
  if(k==='treps'){topPage().st.draft.exercises[+el.dataset.i].reps=num(el.value)?Math.round(num(el.value)):null;return}
  const w=getW(m);if(!w)return;
  if(k==='set'){const s=w.exercises[+el.dataset.ei].sets[+el.dataset.si];setField(s,el.dataset.f,el.value)}
  else if(k==='wname')w.name=el.value;else if(k==='wnotes')w.notes=el.value;else if(k==='exnote')w.exercises[+el.dataset.ei].note=el.value;
  else if(k==='wdate'||k==='wtime'||k==='wdur'){const dur=(w.end||w.start)-w.start;const ds=$('[data-in="wdate"]').value,ts=$('[data-in="wtime"]').value;if(ds){w.start=parseIso(ds,ts||'12:00')}const mins=num($('[data-in="wdur"]').value);w.end=w.start+(mins!=null?mins*6e4:dur)}
  if(m==='a')saveSoon()});
document.addEventListener('keydown',ev=>{if(ev.key==='Enter'&&ev.target.classList&&ev.target.classList.contains('sin')){ev.preventDefault();const all=$$('input.sin',ev.target.closest('.view,.pbody,#view')||document);const i=all.indexOf(ev.target);if(all[i+1])all[i+1].focus();else ev.target.blur()}});
document.addEventListener('focusin',ev=>{if(ev.target.classList&&ev.target.classList.contains('sin'))setTimeout(()=>{try{ev.target.select()}catch(e){}},0)});
document.addEventListener('pointerdown',unlockAudio,{once:true});

/* ================= PWA bits ================= */
function setupPWA(){window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();window._bip=e;if(TAB==='more')renderTab()});window.addEventListener('appinstalled',()=>{window._bip=null;toast('IronLog installed')});
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)){navigator.serviceWorker.register('sw.js').then(r=>{r.addEventListener('updatefound',()=>{const nw=r.installing;nw&&nw.addEventListener('statechange',()=>{if(nw.state==='installed'&&navigator.serviceWorker.controller)toast('Update ready — reopen the app to use it')})})}).catch(e=>console.warn('SW registration failed',e));prewarmImages()}}

/* ================= init ================= */
function init(){setupPWA();setupGestures();if(/[?&]start=1/.test(location.search)&&!D.active){history.replaceState(null,'',location.pathname);const T=todayPlan();setTimeout(()=>startWorkout(T?T.tpl:null),50)}renderTab();renderDock();setInterval(tick,250);if(!D.onboarded&&!D.workouts.length&&!D.active&&!/[?&]noonb/.test(location.search))setTimeout(()=>openOnboarding(true),150);
  if(D.restEnd&&D.restEnd<Date.now()){D.restEnd=null;save()}}

window.__il={get D(){return D},save,SLOTS,EQOPT,exByName,buildProgram,recommend,EX,todayPlan,recovery,insights,plateau,LIB};

/* ---- views2.js ---- */
/* ================= v2 views: how-to, tips, today, recovery, insights, onboarding, program, offline photos, gestures ================= */
Object.assign(ICO,{alert:'<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',img:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',dl:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'});
const KIND={up:['▲ Add weight','up'],hold:['● Beat last time','hold'],deload:['▼ Deload','down'],new:['★ First time','new']};
const exLink=n=>{const id=slug(n);return EXMAP[id]?`<button class="chip" data-a="openEx" data-ex="${id}">${esc(n)}</button>`:`<span class="chip static">${esc(n)}</span>`};
function recSummary(ex,R){if(!R.sets.length)return '';const s=R.sets[0];if(ex.type==='dur')return `${R.n} × ${fmtSec(s.sec)}`;if(ex.type==='cardio')return `${s.min?fmtN(s.min,0)+' min':''}${s.dist?' · '+fmtN(toD(s.dist),2)+' '+dU():''}`;
  const rs=R.sets.map(x=>x.r);const reps=R.sets.length>1?rs.join(', '):`${R.n} × ${s.r}`;return s.w!=null?`${R.sets.length>1?reps+' reps':reps} @ ${wTxt(s.w)}`:`${reps} reps`}
function progText(ex){const [lo,hi]=repRange(ex,null),c=clsOf(ex),inc=incFor(ex);
  if(ex.type==='cardio')return ['Build total weekly time by no more than ~10% per week.','Keep about 80% of sessions easy (you can talk), 20% hard intervals.','Track distance for the same time — covering more ground is your progression.'];
  if(ex.type==='dur')return ['Add ~5 seconds per session.','Past 60 s, switch to a harder variation or add load — longer holds stop building strength.'];
  if(ex.type==='bw')return [`Add a rep per set each session until every set hits ${hi}.`,`Then add ${isLb()?'5 lb':'2.5 kg'} (belt, vest or dumbbell) or a harder variation, and drop back to ${lo}.`,'Too hard? Use an easier variation (incline, assisted, band) and build up.'];
  const t=[`Double progression in the ${lo}–${hi} rep range: keep the weight until every working set hits ${hi} reps, then add ${inc} ${wU()} and start again at ${lo}. IronLog does this math for you and pre-fills each set.`];
  if(c==='main')t.push('Rest 2–4 minutes between heavy sets — strength needs full recovery.','Finish most sets with 1–2 reps in reserve; save grinders for test days.','Do warm-up ramps (IronLog adds them automatically): bar × 10, then ~40/60/80% for 5/3/2.');
  else if(c==='comp')t.push('Rest 90 s–3 min. Leave 1–3 reps in reserve.','A controlled 2–3 s lowering phase builds more muscle and strength than dropping the weight.');
  else t.push('Rest 60–90 s. Chase the stretch and the squeeze.','Add reps before weight; small jumps (next pin, micro-plates) keep progress going.','The last set can go to (or near) failure safely.');
  t.push('Get stronger outside the gym too: 7–9 h of sleep and ~1.6–2.2 g protein per kg body weight per day.');return t}
function howToHTML(ex,p){const c=coachFor(ex),R=recommend(ex.id,null,null),pl=plateau(ex.id),Pm=primOf(ex),Sm=secOf(ex);let h='';
  if(pl)h+=`<div class="card warn-card"><h3>${ic('alert')} Plateau detected</h3><div class="small">${pl.short}</div><ul class="tips">${pl.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`;
  if(ex.type!=='cardio'||R.sets.length){const K=KIND[R.kind]||KIND.new;h+=`<div class="card next-card"><div class="row"><span class="kind k-${K[1]}">${K[0]}</span><span class="sp"></span><span class="tiny muted">Next time</span></div>${R.sets.length?`<div class="next-big">${recSummary(ex,R)}</div>`:''}<div class="small why-t">${esc(R.why)}</div></div>`}
  h+=`<div class="card"><h3>${ic('target')} Muscles worked</h3><div class="body-wrap">${exBodySVG(ex)}</div><div class="mus-l"><div><span class="dotc" style="background:#c6ff33"></span><b>Primary</b> ${Pm.map(m=>DETN[m]||m).join(', ')||'—'}</div>${Sm.length?`<div><span class="dotc" style="background:#c6ff33;opacity:.4"></span><b>Secondary</b> ${Sm.map(m=>DETN[m]||m).join(', ')}</div>`:''}</div></div>`;
  h+=`<div class="card"><h3>Setup</h3><ul class="tips">${c.setup.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`;
  h+=`<div class="card"><h3>Step by step</h3><ol class="steps">${c.steps.map(t=>`<li>${esc(t)}</li>`).join('')}</ol>${ex.steps?'<div class="tiny dim mt">Steps: free-exercise-db (public domain).</div>':''}</div>`;
  h+=`<div class="card"><h3>${ic('check')} Form cues</h3><ul class="tips good">${c.cues.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`;
  h+=`<div class="card"><h3>${ic('x')} Common mistakes</h3><ul class="tips bad">${c.mistakes.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`;
  h+=`<div class="card"><h3>Breathing</h3><div class="small">${esc(c.breath)}</div></div>`;
  h+=`<div class="card"><h3>${ic('bolt')} How to progress & get stronger</h3><ul class="tips">${progText(ex).map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`;
  if(c.vars.length||c.acc.length)h+=`<div class="card">${c.vars.length?`<h3>Variations</h3><div class="chips wrap">${c.vars.map(exLink).join('')}</div>`:''}${c.acc.length?`<h3 class="mt">Accessories that help</h3><div class="chips wrap">${c.acc.map(exLink).join('')}</div>`:''}</div>`;
  return h}
function exHero(ex){const tags=[ex.level&&ex.level[0].toUpperCase()+ex.level.slice(1),ex.mech&&ex.mech[0].toUpperCase()+ex.mech.slice(1),CATS[ex.cat]&&ex.cat!=='strength'?CATS[ex.cat]:null,ex.fx?null:null].filter(Boolean);
  return `<div class="hero-media">${exFig(ex,{anim:true,lazy:false,cls:'lg'})}</div><div class="row mb" style="flex-wrap:wrap;gap:6px"><span class="tag" style="--c:${MCOL[ex.muscle]}">${MUSCLES[ex.muscle]||''}</span><span class="tag">${EQUIP[ex.equip]||''}</span>${tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`}
function openTips(exId,ei){const ex=EX(exId),c=coachFor(ex);const e=ei!=null&&D.active?D.active.exercises[ei]:null;
  openSheet(`<div class="sheet-title">${esc(ex.name)}</div><div class="tips-fig">${exFig(ex,{anim:true,lazy:false,cls:'md'})}</div>${e&&e.why?`<div class="why sm"><b>Today:</b> ${esc(e.why)}</div>`:''}
  <div class="tips-sec"><b>${ic('check')} Key cues</b><ul class="tips good">${c.cues.slice(0,3).map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div><div class="tips-sec"><b>${ic('x')} Avoid</b><ul class="tips bad">${c.mistakes.slice(0,2).map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div><div class="tips-sec small"><b>Breathing:</b> ${esc(c.breath)}</div>
  <button class="btn btn-block mt" data-a="fullGuide" data-ex="${exId}">Full how-to guide</button>`)}
A.fullGuide=el=>{const id=el.dataset.ex;closeTop();openEx(id,'howto')};
A.tips=el=>{const v=el.dataset.ei;openTips(el.dataset.ex,v!=null&&v!==''?+v:null)};
/* ---------- home cards ---------- */
function todayCardHTML(){const T=todayPlan();if(!T)return '';const t=T.tpl,sc=T.score;
  return `<div class="card today"><div class="row"><span class="lbl">${ic('target')} TODAY’S WORKOUT</span><span class="sp"></span><span class="rscore" style="color:${recCol(sc)}">${sc}% recovered</span></div><div class="today-t">${esc(t.name)}</div><div class="small muted">${esc(T.why)}${t.program&&!T.why.includes(t.program)?' · '+esc(t.program):''}</div>
  ${T.trained?`<div class="note-b">✓ You already trained today. Rest is when you grow — this is what’s up next.</div>`:''}${T.tired.length?`<div class="note-b warn">Still recovering: ${T.tired.map(m=>DETN[m]).join(', ')} — keep those sets a rep further from failure.</div>`:''}
  <div class="today-ex">${t.exercises.slice(0,6).map(te=>{const ex=EX(te.exId);return `<button class="te" data-a="openEx" data-ex="${te.exId}">${exThumb(ex)}<span>${esc(ex.name)}</span><b>${te.sets}×${te.reps||'—'}${te.hi&&te.hi!==te.reps?'–'+te.hi:''}</b></button>`}).join('')}${t.exercises.length>6?`<div class="tiny dim">+${t.exercises.length-6} more</div>`:''}</div>
  <button class="btn btn-ac btn-lg btn-block" data-a="startTplId" data-id="${t.id}">${ic('play')} Start ${esc(t.name)}</button><div class="tiny dim center" style="margin-top:6px">Weights & reps are pre-filled from your history.</div></div>`}
A.startTplId=el=>{const t=D.templates.find(x=>x.id===el.dataset.id);if(t)startWorkout(t)};
function recoveryCardHTML(){const P=recovery();const low=Object.entries(P).filter(([m,v])=>v<75).sort((a,b)=>a[1]-b[1]);
  return `<div class="card"><h3>${ic('flame')} Muscle recovery <span class="r">based on your last 3 days</span></h3><div class="body-wrap">${bodySVG(m=>({c:recCol(P[m]==null?100:P[m]),o:P[m]>=75?.55:.95}),{label:'Recovery map'})}</div>
  <div class="legend"><span><i style="background:#3ddc84"></i>Ready</span><span><i style="background:#ffb020"></i>Recovering</span><span><i style="background:#ff5a5f"></i>Fatigued</span></div>
  ${low.length?`<div class="rec-list">${low.slice(0,5).map(([m,v])=>`<div class="rl"><span>${DETN[m]}</span><div class="bar"><i style="width:${v}%;background:${recCol(v)}"></i></div><b>${v}%</b><span class="tiny dim">~${readyIn(m)}h</span></div>`).join('')}</div>`:'<div class="small muted center">Everything is fresh — a great day to train hard.</div>'}</div>`}
function insightsCardHTML(){const I=insights();if(!I.length)return '';
  return `<div class="card"><h3>${ic('spark')} Weekly insights</h3>${I.map(i=>`<${i.ex?`button data-a="openEx" data-ex="${i.ex}"`:'div'} class="ins ins-${i.tone}"><div class="ii">${ic(i.ic)}</div><div class="ex-txt"><b>${i.t}</b><span>${i.x}</span></div></${i.ex?'button':'div'}>`).join('')}</div>`}
/* ---------- onboarding ---------- */
function openOnboarding(auto){const pr=D.profile||{};pushPage({title:'Build your program',onb:true,st:{step:0,goal:pr.goal||'muscle',exp:pr.exp||'beginner',days:String(pr.days||3),equip:pr.equip||'gym',unit:D.settings.unit,auto:!!auto},render:onbRender,foot:onbFoot,right:()=>`<button class="btn btn-ghost btn-sm" data-a="onbSkip">Skip</button>`})}
const ONB=[{k:'goal',q:'What’s your main goal?',sub:'This sets your rep ranges and how weight is added.',o:[['strength','Get stronger','Heavier weights, lower reps (3–8)'],['muscle','Build muscle','Moderate weights, 6–15 reps'],['general','General fitness','Balanced strength & conditioning']]},
 {k:'exp',q:'How experienced are you?',sub:'We adjust volume and exercise choice.',o:[['beginner','Beginner','Less than 1 year of consistent lifting'],['intermediate','Intermediate','1–3 years'],['advanced','Advanced','3+ years, close to your limits']]},
 {k:'days',q:'How many days a week can you train?',sub:'Pick what you can sustain — consistency beats volume.',o:[['2','2 days','Full body A/B'],['3','3 days','Full body or Push/Pull/Legs'],['4','4 days','Upper/Lower'],['5','5 days','Push/Pull/Legs + Upper/Lower'],['6','6 days','Push/Pull/Legs ×2']]},
 {k:'equip',q:'What equipment do you have?',sub:'Exercises are chosen to match.',o:Object.entries(EQOPT).map(([k,l])=>[k,l,{gym:'Machines, cables, barbells, dumbbells',db:'Adjustable dumbbells at home',bb:'Squat rack and plates',home:'No weights needed'}[k]])},
 {k:'unit',q:'Units',sub:'You can change this later in Settings.',o:[['kg','Kilograms (kg)',''],['lb','Pounds (lb)','']]}];
function onbRender(p){const s=p.st;const N=ONB.length;let h=`<div class="onb-prog">${Array.from({length:N+1},(_,i)=>`<i class="${i<=s.step?'on':''}"></i>`).join('')}</div>`;
  if(s.step<N){const Q=ONB[s.step];if(s.step===0)h+=`<div class="onb-hero">${ic('dumb')}<div><b>Let’s set you up.</b><span>5 quick questions → a program that tells you exactly what to lift each session.</span></div></div>`;
    h+=`<h2 class="onb-q">${Q.q}</h2><div class="small muted mb">${Q.sub}</div>${Q.o.map(([v,l,d])=>`<button class="onb-o ${s[Q.k]===v?'on':''}" data-a="onbPick" data-k="${Q.k}" data-v="${v}"><b>${l}</b>${d?`<span>${d}</span>`:''}<i>${ic('check')}</i></button>`).join('')}`;return h}
  const o={goal:s.goal,exp:s.exp,days:+s.days,equip:s.equip};const P=buildProgram(o);
  h+=`<h2 class="onb-q">Your program</h2><div class="small muted mb"><b class="ac">${esc(P.name.replace('My Program · ',''))}</b> · ${GOALS[o.goal]} · ${o.days} days/week · ${EQOPT[o.equip]}</div>`;
  h+=P.tpls.map((t,i)=>`<div class="card"><h3>Day ${i+1} · ${esc(t.name)}</h3>${t.exercises.map(te=>{const ex=EX(te.exId);return `<div class="pv-ex">${exThumb(ex)}<span>${esc(ex.name)}</span><b>${te.sets}×${te.reps?te.reps+(te.hi&&te.hi!==te.reps?'–'+te.hi:''):'hold'}</b></div>`}).join('')}</div>`).join('');
  h+=`<div class="card small"><b>How it advances:</b> each session IronLog pre-fills your weights and reps. Hit the top of the rep range on every set and the weight goes up next time; stall twice and it deloads. Finishing a day moves you to the next one.</div>`;return h}
function onbFoot(p){const s=p.st,N=ONB.length;return `<div class="grid2">${s.step>0?`<button class="btn" data-a="onbNav" data-d="-1">Back</button>`:`<button class="btn" data-a="onbSkip">Not now</button>`}${s.step<N?`<button class="btn btn-ac" data-a="onbNav" data-d="1">Next</button>`:`<button class="btn btn-ac" data-a="onbDone">Create program</button>`}</div>`}
A.onbPick=el=>{const p=topPage();p.st[el.dataset.k]=el.dataset.v;buzz(8);paint(p);setTimeout(()=>{if(topPage()===p&&p.st.step<ONB.length){p.st.step++;paint(p);$('.pbody',p.el).scrollTop=0}},180)};
A.onbNav=el=>{const p=topPage();p.st.step=Math.max(0,Math.min(ONB.length,p.st.step+(+el.dataset.d)));paint(p);$('.pbody',p.el).scrollTop=0};
A.onbSkip=()=>{D.onboarded=true;save();const p=topPage();closePage(p)};
A.onbDone=()=>{const p=topPage(),s=p.st;const P=saveProgram({goal:s.goal,exp:s.exp,days:+s.days,equip:s.equip,unit:s.unit});closePage(p);TAB='home';renderTab();renderDock();buzz([20,40,20]);toast(`<b>Program ready</b>${esc(P.name.replace('My Program · ',''))} — ${P.tpls.length} days`)};
A.redoOnb=()=>openOnboarding(false);
/* ---------- train: program section ---------- */
function programSectionHTML(){const P=D.program;if(!P)return `<button class="card onb-cta" data-a="redoOnb"><div class="ii">${ic('spark')}</div><div class="ex-txt"><b>Build my program</b><span>Answer 5 questions → an auto-progressing plan</span></div>${ic('chev')}</button>`;
  const ts=P.tpls.map(id=>D.templates.find(t=>t.id===id)).filter(Boolean);
  return `<div class="sec-h">${esc(P.name.replace('My Program · ','Your program · '))}<span class="r"><button class="ac" style="font-weight:700;font-size:13px" data-a="redoOnb">Rebuild</button></span></div><div class="tpl-grid">${ts.map((t,i)=>tplCard(t).replace('<div class="t">',`<div class="t">${i===(P.next||0)%ts.length?'<span class="badge next">NEXT</span> ':''}`)).join('')}</div>`}
/* ---------- offline photos ---------- */
const IMG_CACHE='ironlog-img-v1';
function usedImgUrls(){const ids=new Set();D.templates.forEach(t=>t.exercises.forEach(e=>ids.add(e.exId)));D.workouts.forEach(w=>w.exercises.forEach(e=>ids.add(e.exId)));if(D.active)D.active.exercises.forEach(e=>ids.add(e.exId));
  return [...ids].map(EX).filter(e=>e.img).flatMap(e=>[imgUrl(e,0),imgUrl(e,1)])}
async function cacheUrls(urls,onProg){if(!('caches' in window))return 0;const c=await caches.open(IMG_CACHE);const have=new Set((await c.keys()).map(r=>new URL(r.url).pathname));const base=new URL('.',location.href);
  const todo=urls.filter(u=>!have.has(new URL(u,base).pathname));let i=0,done=urls.length-todo.length,fail=0;onProg&&onProg(done,urls.length);
  const worker=async()=>{while(i<todo.length){const u=todo[i++];try{const r=await fetch(u);if(r.ok)await c.put(u,r);else fail++}catch(e){fail++}done++;onProg&&onProg(done,urls.length)}};
  await Promise.all(Array.from({length:6},worker));return fail}
function prewarmImages(){const go=()=>cacheUrls(usedImgUrls()).catch(()=>{});('requestIdleCallback' in window)?requestIdleCallback(go,{timeout:4000}):setTimeout(go,2500)}
let photoJob=null;
A.cachePhotos=async()=>{if(photoJob)return;try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
  const urls=LIB.filter(e=>e.img).flatMap(e=>[imgUrl(e,0),imgUrl(e,1)]);photoJob={d:0,n:urls.length};
  const upd=()=>{const el=$('#photo-prog');if(el)el.innerHTML=photoProg()};
  const fail=await cacheUrls(urls,(d,n)=>{photoJob={d,n};upd()});photoJob=null;localStorage.setItem('ironlog.photos','1');upd();toast(fail?`Saved photos — ${fail} failed, try again on a better connection`:'All exercise photos saved for offline use');if(TAB==='more')renderTab()};
function photoProg(){if(photoJob)return `<div class="pbar"><i style="width:${Math.round(photoJob.d/photoJob.n*100)}%"></i></div><div class="tiny muted">${photoJob.d} / ${photoJob.n} images…</div>`;
  return localStorage.getItem('ironlog.photos')?'<div class="tiny ac">✓ All photos available offline</div>':'<div class="tiny muted">Photos of exercises you use are saved automatically. Save all ~1,760 (≈23 MB) for full offline browsing.</div>'}
A.install=async()=>{const e=window._bip;if(!e){toast(/iphone|ipad/i.test(navigator.userAgent)?'In Safari: Share → Add to Home Screen':'Use your browser menu → Install app / Add to Home screen');return}e.prompt();try{await e.userChoice}catch(x){}window._bip=null;if(TAB==='more')renderTab()};
function moreV2HTML(){const S=D.settings;const tog=(k,l,sub)=>`<div class="set-item"><div class="lbl">${l}${sub?`<small>${sub}</small>`:''}</div><button class="toggle ${S[k]?'on':''}" data-a="tog" data-k="${k}" aria-label="${l}"></button></div>`;
  const inst=window.matchMedia&&matchMedia('(display-mode: standalone)').matches;
  return `<div class="sec-h">Program & coaching</div><div class="card"><button class="set-item" style="width:100%;text-align:left" data-a="redoOnb"><div class="lbl">${D.program?'Rebuild my program':'Build my program'}<small>${D.program?esc(D.program.name.replace('My Program · ',''))+' · '+GOALS[D.program.goal]:'Goal, experience, days & equipment'}</small></div>${ic('chev')}</button>
  ${tog('autoRec','Smart recommendations','Pre-fill weights & reps with double progression')}${tog('autoWarm','Auto warm-up sets','Ramp-up sets with plate math for heavy lifts')}</div>
  <div class="sec-h">App</div><div class="card">${inst?'<div class="small ac mb">✓ Installed — running as an app</div>':`<button class="btn btn-ac btn-block mb" data-a="install">${ic('phone')} Install IronLog on this phone</button>`}
  <button class="btn btn-block" data-a="cachePhotos">${ic('dl')} Save all exercise photos offline</button><div id="photo-prog" style="margin-top:8px">${photoProg()}</div></div>`}
/* ---------- gestures & motion ---------- */
function setupGestures(){let g=null;const X=t=>t.touches?t.touches[0]:t;
  document.addEventListener('touchstart',ev=>{const t=X(ev),tgt=ev.target;g=null;
    const pg=tgt.closest&&tgt.closest('.page');if(pg&&stack.length&&stack[stack.length-1].el===pg&&t.clientX<26){g={k:'edge',el:pg,x:t.clientX,y:t.clientY};return}
    const sh=tgt.closest&&tgt.closest('.sheet');if(sh&&stack.length&&stack[stack.length-1].el===sh&&sh.scrollTop<=0&&!tgt.closest('input,textarea')){g={k:'sheet',el:sh,x:t.clientX,y:t.clientY};return}
    const row=tgt.closest&&tgt.closest('.set-row:not(.hd)');if(row&&!tgt.closest('input')){g={k:'row',el:row,x:t.clientX,y:t.clientY}}},{passive:true});
  document.addEventListener('touchmove',ev=>{if(!g)return;const t=X(ev),dx=t.clientX-g.x,dy=t.clientY-g.y;
    if(!g.lock){if(Math.abs(dx)<8&&Math.abs(dy)<8)return;g.lock=(g.k==='sheet'?dy>Math.abs(dx):Math.abs(dx)>Math.abs(dy))?1:-1;if(g.lock>0)g.el.style.transition='none'}
    if(g.lock<0)return;if(g.k==='edge'){g.d=Math.max(0,dx);g.el.style.transform=`translateX(${g.d}px)`}else if(g.k==='sheet'){g.d=Math.max(0,dy);g.el.style.transform=`translateY(${g.d}px)`}else{g.d=Math.min(0,dx);g.el.style.transform=`translateX(${g.d}px)`;g.el.classList.toggle('del-arm',g.d<-90)}},{passive:true});
  document.addEventListener('touchend',()=>{if(!g||g.lock!==1){g=null;return}const el=g.el,d=g.d||0,k=g.k;el.style.transition='';el.style.transform='';el.classList.remove('del-arm');
    if(k==='edge'&&d>90){buzz(10);closeTop()}else if(k==='sheet'&&d>90){buzz(10);closeTop()}else if(k==='row'&&d<-90){const b=el.querySelector('[data-si]');if(b)swipeDelete(b.dataset.m,+b.dataset.ei,+b.dataset.si)}g=null},{passive:true})}
let undoBuf=null;
function swipeDelete(m,ei,si){const w=getW(m);if(!w)return;const e=w.exercises[ei];if(!e)return;const s=e.sets.splice(si,1)[0];undoBuf={m,ei,si,s,wid:w.id};buzz(20);sv(m);
  const t=document.createElement('div');t.className='toast undo';t.innerHTML=`Set deleted <button data-a="undoDel">Undo</button>`;$('#toasts').appendChild(t);setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),320)},4000)}
A.undoDel=el=>{if(!undoBuf)return;const u=undoBuf,w=getW(u.m);if(w&&w.id===u.wid&&w.exercises[u.ei]){w.exercises[u.ei].sets.splice(u.si,0,u.s);sv(u.m);toast('Set restored')}undoBuf=null;const t=el.closest('.toast');t&&t.remove()};

init();
})();
