
const PI2 = Math.PI*2;

function lerp(a,b,t){return a+(b-a)*t;}

function easeOut(t){return 1-Math.pow(1-t,3);}

function setupCvs(id){
const c=document.getElementById(id);
if(!c) return null;
const dpr = window.devicePixelRatio || 1;
const fixedH = parseInt(c.dataset.h || c.getAttribute('data-h') || 300);
let w = 0;
let el = c.parentElement ? c.parentElement.parentElement : null;
while(el){
const rect = el.getBoundingClientRect();
if(rect.width >= 40){
const style = window.getComputedStyle(el);
const pl = parseFloat(style.paddingLeft)||0;
const pr = parseFloat(style.paddingRight)||0;
w = Math.floor(rect.width - pl - pr);
break;
}
el = el.parentElement;
}
if(w < 40) w = 760;
c.width = w * dpr;
c.height = fixedH * dpr;
c.style.cssText = `display:block;width:${w}px;height:${fixedH}px;`;
const ctx = c.getContext('2d');
ctx.scale(dpr, dpr);
ctx._w = w;
ctx._h = fixedH;
return ctx;
}

function rr(ctx,x,y,w,h,r,fill,stroke,sw){
ctx.beginPath(); ctx.roundRect(x,y,w,h,r);
if(fill){ctx.fillStyle=fill;ctx.fill();}
if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=sw||1;ctx.stroke();}
}

function txt(ctx,t,x,y,size,color,align,weight){
ctx.font=`${weight||400} ${size}px 'DM Sans',sans-serif`;
ctx.fillStyle=color; ctx.textAlign=align||'center'; ctx.textBaseline='middle';
ctx.fillText(t,x,y);
}

function glow(ctx,x,y,r,color){
const g=ctx.createRadialGradient(x,y,0,x,y,r);
const base=color.length>7?color.slice(0,7):color;
g.addColorStop(0,base+'66'); g.addColorStop(1,base+'00');
ctx.beginPath(); ctx.arc(x,y,r,0,PI2); ctx.fillStyle=g; ctx.fill();
}

function dot(ctx,x,y,color,r,a){
ctx.beginPath(); ctx.arc(x,y,r||4,0,PI2);
const alpha=a===undefined?1:Math.max(0,Math.min(1,a));
ctx.globalAlpha=alpha;
ctx.fillStyle=color;
ctx.fill();
ctx.globalAlpha=1;
}
let RA={ctx:null,pts:[],hl:[],t:0,raf:null};
const RA_NODES=[
{xi:.50, yAbs:48, label:'App', sub:'root', c:'#8b7ae8'}, {xi:.28, yAbs:128, label:'Header', sub:'static', c:'#60a5fa'}, {xi:.72, yAbs:128, label:'Dashboard', sub:'useSelector', c:'#8b7ae8'}, {xi:.16, yAbs:208, label:'Nav', sub:'memo', c:'#34d399'}, {xi:.55, yAbs:208, label:'Chart', sub:'useState', c:'#f59e0b'}, {xi:.84, yAbs:208, label:'Table', sub:'useQuery', c:'#f59e0b'}, {xi:.55, yAbs:282, label:'Tooltip', sub:'hover', c:'#f472b6'},
];
const RA_EDGES=[[0,1],[0,2],[1,3],[2,4],[2,5],[4,6]];

function initReact(){
const ctx=setupCvs('cvs-react'); if(!ctx)return;
RA.ctx=ctx; RA.pts=[]; RA.hl=[]; RA.t=0;
cancelAnimationFrame(RA.raf); animRA();
}

function RN(W,H){
return RA_NODES.map(n=>({...n, x:n.xi*W, y:n.yAbs}));
}

function reactAnim(type){
const ctx=RA.ctx; if(!ctx)return;
RA.pts=[];
if(type==='render'){
RA.hl=[2,4,5,6];
[[2,4],[2,5],[4,6]].forEach(([a,b],i)=>{
setTimeout(()=>{const W2=ctx._w,H2=ctx._h;const nodes=RN(W2,H2);for(let j=0;j<10;j++)RA.pts.push({x:nodes[a].x,y:nodes[a].y,tx:nodes[b].x,ty:nodes[b].y,t:-(j*.06),c:'#f59e0b',r:3.5});},i*300);
});
setTimeout(()=>RA.hl=[],2500);
} else if(type==='redux'){
RA.hl=[0,1,2,3,4,5,6];
RA_EDGES.forEach(([a,b],i)=>{
setTimeout(()=>{const W2=ctx._w,H2=ctx._h;const nodes=RN(W2,H2);for(let j=0;j<10;j++)RA.pts.push({x:nodes[a].x,y:nodes[a].y,tx:nodes[b].x,ty:nodes[b].y,t:-(j*.07),c:'#8b7ae8',r:3.5});},i*250);
});
setTimeout(()=>RA.hl=[],3000);
} else if(type==='zustand'){
RA.hl=[2,4,5,6];
[4,5,6].forEach((si,i)=>{
setTimeout(()=>{const W2=ctx._w,H2=ctx._h;const nodes=RN(W2,H2);for(let j=0;j<10;j++)RA.pts.push({x:nodes[2].x,y:nodes[2].y,tx:nodes[si].x,ty:nodes[si].y,t:-(j*.06),c:'#34d399',r:3.5});},i*200);
});
setTimeout(()=>RA.hl=[],2200);
}
}

function animRA(){
const ctx=RA.ctx; if(!ctx)return;
const W=ctx._w,H=ctx._h; const nodes=RN(W,H);
ctx.clearRect(0,0,W,H); rr(ctx,0,0,W,H,0,'#0f0e1a');
ctx.strokeStyle='rgba(255,255,255,0.03)'; ctx.lineWidth=1;
for(let y=40;y<H;y+=80){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
RA_EDGES.forEach(([a,b])=>{
const na=nodes[a],nb=nodes[b];
ctx.beginPath(); ctx.moveTo(na.x,na.y+18); ctx.lineTo(nb.x,nb.y-18);
ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1.5; ctx.stroke();
});
nodes.forEach((n,i)=>{
const hl=RA.hl.includes(i);
if(hl) glow(ctx,n.x,n.y,40,n.c);
rr(ctx,n.x-48,n.y-19,96,38,10,hl?n.c+'28':'#1e1c38',hl?n.c:'#3d3870',hl?2:1); txt(ctx,n.label,n.x,n.y-4,12,hl?n.c:'#e2e2f0','center',600); txt(ctx,n.sub,n.x,n.y+10,9.5,'rgba(255,255,255,0.35)','center');
});
RA.pts=RA.pts.filter(p=>{
p.t+=0.022; if(p.t<0)return true; if(p.t>1.15)return false;
const et=easeOut(Math.min(p.t,1));
const px=lerp(p.x,p.tx,et),py=lerp(p.y,p.ty,et);
const a=p.t>.8?1-(p.t-.8)*5:1;
glow(ctx,px,py,10,p.c); dot(ctx,px,py,p.c,p.r,a); return true;
});
txt(ctx,'Virtual DOM Tree',W/2,H-10,10,'rgba(255,255,255,0.12)','center');
RA.t++; RA.raf=requestAnimationFrame(animRA);
}
let ANG={ctx:null,pts:[],t:0,raf:null};
const ANG_NODES=[
{xi:.1,yAbs:110,label:'Component',sub:'Template', c:'#ef4444',icon:'🅰'}, {xi:.3,yAbs:110,label:'Service', sub:'DI Injected',c:'#f97316',icon:'🔧'}, {xi:.5,yAbs:110,label:'NgRx Store',sub:'State Tree',c:'#8b7ae8',icon:'🏪'}, {xi:.7,yAbs:110,label:'Effects', sub:'RxJS', c:'#f59e0b',icon:'⚡'}, {xi:.9,yAbs:110,label:'Reducer', sub:'Pure fn', c:'#60a5fa',icon:'[cfg]'},
];

function initAngular(){
const ctx=setupCvs('cvs-angular'); if(!ctx)return;
ANG.ctx=ctx; ANG.pts=[]; ANG.t=0;
cancelAnimationFrame(ANG.raf); animANG();
}

function ANGN(W,H){return ANG_NODES.map(n=>({...n,x:n.xi*W,y:n.yAbs}));}

function angularAnim(type){
const ctx=ANG.ctx; if(!ctx)return;
const flows={
dispatch:[[0,1,'#f97316'],[1,2,'#8b7ae8'],[2,3,'#f59e0b'],[3,4,'#60a5fa'],[4,2,'#34d399'],[2,0,'#34d399']], http: [[0,1,'#60a5fa'],[1,3,'#60a5fa'],[3,4,'#60a5fa'],[4,2,'#34d399'],[2,0,'#34d399']], rxjs: [[0,1,'#f59e0b'],[1,2,'#f59e0b'],[2,3,'#f59e0b'],[3,4,'#f59e0b'],[4,3,'#34d399'],[3,2,'#34d399'],[2,0,'#34d399']],
};
ANG.pts=[];
(flows[type]||[]).forEach(([a,b,col],i)=>{
setTimeout(()=>{
const W2=ctx._w,H2=ctx._h; const nodes=ANGN(W2,H2);
for(let j=0;j<10;j++)ANG.pts.push({x:nodes[a].x,y:nodes[a].y,tx:nodes[b].x,ty:nodes[b].y,t:-(j*.06),c:col,r:3.5});
},i*500);
});
}

function animANG(){
const ctx=ANG.ctx; if(!ctx)return;
const W=ctx._w,H=ctx._h; const nodes=ANGN(W,H);
const midY=110;
ctx.clearRect(0,0,W,H); rr(ctx,0,0,W,H,0,'#0f0e1a');
rr(ctx,32,midY-52,W-64,18,6,'#1a1020','#3d1a1a',1); txt(ctx,'RxJS Observable Stream ──────────────────────────────',W/2,midY-43,9,'rgba(245,158,11,0.28)','center');
rr(ctx,48,midY+34,W-96,22,6,'#0e1a30','#1d4460',1); txt(ctx,'[link] Angular Injector -- resolves dependencies',W/2,midY+45,10,'rgba(96,165,250,0.5)','center');
nodes.forEach((n,i)=>{
if(i<nodes.length-1){const nx=nodes[i+1]; ctx.beginPath(); ctx.moveTo(n.x+52,n.y); ctx.lineTo(nx.x-52,nx.y); ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1.5; ctx.stroke();}
ctx.beginPath(); ctx.moveTo(n.x,n.y+27); ctx.lineTo(n.x,n.y+36); ctx.strokeStyle='#1d446055'; ctx.lineWidth=1; ctx.setLineDash([2,3]); ctx.stroke(); ctx.setLineDash([]);
});
ctx.beginPath(); ctx.moveTo(nodes[4].x,nodes[4].y+27); ctx.bezierCurveTo(nodes[4].x,H-10,nodes[2].x,H-10,nodes[2].x,nodes[2].y+27); ctx.strokeStyle='#8b7ae833'; ctx.lineWidth=1.5; ctx.setLineDash([3,4]); ctx.stroke(); ctx.setLineDash([]);
txt(ctx,'state$',W*0.68,H-4,9,'rgba(139,122,232,0.4)','center');
nodes.forEach(n=>{
glow(ctx,n.x,n.y,28,n.c+'44'); rr(ctx,n.x-50,n.y-26,100,52,10,'#161428',n.c+'55',1.5); txt(ctx,n.icon,n.x,n.y-8,14,'#fff','center'); txt(ctx,n.label,n.x,n.y+7,10.5,n.c,'center',600); txt(ctx,n.sub,n.x,n.y+19,9,'rgba(255,255,255,0.32)','center');
});
ANG.pts=ANG.pts.filter(p=>{
p.t+=0.022; if(p.t<0)return true; if(p.t>1.15)return false;
const et=easeOut(Math.min(p.t,1));
const px=lerp(p.x,p.tx,et),py=lerp(p.y,p.ty,et);
const a=p.t>.8?1-(p.t-.8)*5:1;
glow(ctx,px,py,10,p.c); dot(ctx,px,py,p.c,p.r,a); return true;
});
ANG.t++; ANG.raf=requestAnimationFrame(animANG);
}
let VU={ctx:null,pts:[],t:0,raf:null,pulse:0};
const VU_NODES=[
{xi:.50,yAbs:46, label:'Vue Component', sub:'<template>', c:'#34d399',icon:'💚'}, {xi:.50,yAbs:130,label:'Proxy (Reactive)',sub:'get / set trap', c:'#60a5fa',icon:'🔮'}, {xi:.22,yAbs:218,label:'Computed', sub:'lazy eval', c:'#c084fc',icon:'🧮'}, {xi:.78,yAbs:218,label:'Pinia Store', sub:'global state', c:'#f59e0b',icon:'🍍'}, {xi:.50,yAbs:286,label:'DOM Update', sub:'VNode patch', c:'#f472b6',icon:'🖼'},
];

function initVue(){
const ctx=setupCvs('cvs-vue'); if(!ctx)return;
VU.ctx=ctx; VU.pts=[]; VU.t=0; VU.pulse=0;
cancelAnimationFrame(VU.raf); animVU();
}

function VUN(W,H){return VU_NODES.map(n=>({...n,x:n.xi*W,y:n.yAbs}));}

function vueAnim(type){
const ctx=VU.ctx; if(!ctx)return;
VU.pulse=50;
VU.pts=[];
const flows={
reactive:[[0,1,'#34d399'],[1,2,'#c084fc'],[1,3,'#f59e0b'],[2,4,'#f472b6'],[3,4,'#f472b6']], computed: [[1,2,'#c084fc'],[2,4,'#f472b6']], pinia: [[0,3,'#f59e0b'],[3,1,'#f59e0b'],[1,4,'#f472b6']], watcher: [[1,2,'#34d399'],[2,4,'#34d399']],
};
(flows[type]||[]).forEach(([a,b,col],i)=>{
setTimeout(()=>{
const W2=ctx._w,H2=ctx._h; const nodes=VUN(W2,H2);
for(let j=0;j<10;j++)VU.pts.push({x:nodes[a].x,y:nodes[a].y,tx:nodes[b].x,ty:nodes[b].y,t:-(j*.06),c:col,r:3.5});
},i*450);
});
}

function animVU(){
const ctx=VU.ctx; if(!ctx)return;
const W=ctx._w,H=ctx._h; const nodes=VUN(W,H);
ctx.clearRect(0,0,W,H); rr(ctx,0,0,W,H,0,'#0f0e1a');
[[0,1],[1,2],[1,3],[2,4],[3,4]].forEach(([a,b])=>{
const na=nodes[a],nb=nodes[b];
ctx.beginPath(); ctx.moveTo(na.x,na.y+27); ctx.lineTo(nb.x,nb.y-27);
ctx.strokeStyle='rgba(255,255,255,0.07)'; ctx.lineWidth=1; ctx.setLineDash([3,5]); ctx.stroke(); ctx.setLineDash([]);
});
if(VU.pulse>0){glow(ctx,nodes[1].x,nodes[1].y,VU.pulse,nodes[1].c);VU.pulse-=1;}
nodes.forEach(n=>{
glow(ctx,n.x,n.y,28,n.c+'33'); rr(ctx,n.x-58,n.y-26,116,52,12,'#161428',n.c+'66',1.5); txt(ctx,n.icon,n.x,n.y-7,15,'#fff','center'); txt(ctx,n.label,n.x,n.y+8,11,n.c,'center',600); txt(ctx,n.sub,n.x,n.y+21,9,'rgba(255,255,255,0.32)','center');
});
VU.pts=VU.pts.filter(p=>{
p.t+=0.022; if(p.t<0)return true; if(p.t>1.15)return false;
const et=easeOut(Math.min(p.t,1));
const px=lerp(p.x,p.tx,et),py=lerp(p.y,p.ty,et);
const a=p.t>.8?1-(p.t-.8)*5:1;
glow(ctx,px,py,10,p.c); dot(ctx,px,py,p.c,p.r,a); return true;
});
VU.t++; VU.raf=requestAnimationFrame(animVU);
}
const BR_STEPS=[
{label:'DNS Lookup',icon:'🔍',c:'#60a5fa',desc:'Resolves domain -> IP via DNS resolver'}, {label:'TCP / TLS',icon:'[link]',c:'#8b7ae8',desc:'Three-way TCP handshake + TLS negotiation'}, {label:'HTTP Request',icon:'[push]',c:'#f59e0b',desc:'GET request sent with headers to server'}, {label:'HTML Parse',icon:'📄',c:'#34d399',desc:'HTML tokenized; DOM tree built incrementally'}, {label:'CSS Parse',icon:'🎨',c:'#f472b6',desc:'CSS parsed; CSSOM built (render-blocking)'}, {label:'Render Tree',icon:'🌳',c:'#c084fc',desc:'DOM + CSSOM merged; only visible nodes kept'}, {label:'Layout',icon:'📐',c:'#f97316',desc:'Browser calculates position + size of every element'}, {label:'Paint',icon:'🖌',c:'#06b6d4',desc:'Pixels drawn to layers: text, borders, backgrounds'}, {label:'Composite',icon:'🖥',c:'#a78bfa',desc:'GPU composites layers -> pixels on screen'},
];
let BR={ctx:null,step:0,playing:true,timer:0,raf:null};

function initBrowser(){
const ctx=setupCvs('cvs-browser'); if(!ctx)return;
BR.ctx=ctx; BR.step=0; BR.playing=true; BR.timer=0;
cancelAnimationFrame(BR.raf); animBR();
}

function brToggle(){
BR.playing=!BR.playing;
const btn=document.getElementById('br-btn'); btn.textContent=BR.playing?'⏸ Pause':'▶ Play'; btn.classList.toggle('on',BR.playing);
if(BR.playing) animBR();
}

function brPrev(){BR.step=Math.max(0,BR.step-1);BR.timer=0;brLabel();}

function brNext(){BR.step=Math.min(BR_STEPS.length-1,BR.step+1);BR.timer=0;brLabel();}

function brReset(){BR.step=0;BR.timer=0;BR.playing=true;document.getElementById('br-btn').textContent='⏸ Pause';document.getElementById('br-btn').classList.add('on');}

function brLabel(){const el=document.getElementById('br-label');if(el)el.textContent=`Step ${BR.step+1}/${BR_STEPS.length} -- ${BR_STEPS[BR.step].label}`;}

function animBR(){
const ctx=BR.ctx; if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H); rr(ctx,0,0,W,H,0,'#0f0e1a');
brLabel();
const n=BR_STEPS.length, bw=Math.floor((W-60)/n)-4, bh=64, by=36, gap=4;
const totalW=(bw+gap)*n-gap, startX=(W-totalW)/2;
BR_STEPS.forEach((s,i)=>{
const x=startX+i*(bw+gap), active=i===BR.step, done=i<BR.step;
if(i<n-1){
ctx.beginPath(); ctx.moveTo(x+bw,by+bh/2); ctx.lineTo(x+bw+gap,by+bh/2);
ctx.strokeStyle=done?s.c+'88':'rgba(255,255,255,0.1)'; ctx.lineWidth=1.5; ctx.stroke();
}
if(active)glow(ctx,x+bw/2,by+bh/2,48,s.c);
rr(ctx,x,by,bw,bh,10,active?s.c+'22':done?'#1a1a2e':'#161428',active?s.c:done?s.c+'55':'#2d2a4a',active?2:1);
txt(ctx,s.icon,x+bw/2,by+20,active?20:16,'#fff','center');
txt(ctx,s.label,x+bw/2,by+bh-14,9.5,active?s.c:done?s.c+'bb':'#5a5780','center',600);
if(done){
ctx.beginPath(); ctx.arc(x+bw-8,by+9,8,0,PI2); ctx.fillStyle='#34d399'; ctx.fill(); txt(ctx,'✓',x+bw-8,by+9,9,'#fff','center',700);
}
});
const s=BR_STEPS[BR.step], py=by+bh+16;
rr(ctx,20,py,W-40,62,12,'#161428',s.c+'44',1.5);
glow(ctx,55,py+31,26,s.c);
txt(ctx,s.icon,55,py+31,22,'#fff','center'); txt(ctx,s.label,100,py+18,13,s.c,'left',600); txt(ctx,s.desc,100,py+42,12,'rgba(255,255,255,0.6)','left');
const pby=py+78, prog=BR.step/(BR_STEPS.length-1);
rr(ctx,20,pby,W-40,4,2,'rgba(255,255,255,0.06)');
rr(ctx,20,pby,Math.max(4,(W-40)*prog),4,2,s.c);
rr(ctx,W/2-180,H-34,360,24,7,'#1a1830','#3d3566',1); txt(ctx,'[web] https://example.com',W/2,H-22,11,'#a5b4fc','center',400);
if(BR.playing){
BR.timer++;
if(BR.timer>90){BR.timer=0;BR.step=(BR.step+1)%BR_STEPS.length;}
BR.raf=requestAnimationFrame(animBR);
}
}
const ENG_STAGES=[
{label:'Source',icon:'📝',c:'#a78bfa',sub:'JS code'}, {label:'Tokenizer',icon:'🔤',c:'#60a5fa',sub:'Lexer'}, {label:'Parser',icon:'🔍',c:'#34d399',sub:'Syntax'}, {label:'AST',icon:'🌳',c:'#f59e0b',sub:'Tree nodes'}, {label:'Ignition',icon:'[cfg]',c:'#f97316',sub:'Bytecode'}, {label:'TurboFan',icon:'🔥',c:'#ef4444',sub:'JIT Opt'}, {label:'Machine',icon:'💻',c:'#06b6d4',sub:'Native'},
];
let ENG={ctx:null,stage:0,playing:true,timer:0,codeType:'simple',raf:null};

function initEngine(){
const ctx=setupCvs('cvs-engine'); if(!ctx)return;
ENG.ctx=ctx; ENG.stage=0; ENG.playing=true; ENG.timer=0;
cancelAnimationFrame(ENG.raf); animENG();
}

function engToggle(){
ENG.playing=!ENG.playing;
const btn=document.getElementById('eng-btn'); btn.textContent=ENG.playing?'⏸ Pause':'▶ Play'; btn.classList.toggle('on',ENG.playing);
if(ENG.playing) animENG();
}

function engCode(t){ENG.codeType=t;ENG.stage=0;ENG.timer=0;}

function animENG(){
const ctx=ENG.ctx; if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H); rr(ctx,0,0,W,H,0,'#0f0e1a');
const n=ENG_STAGES.length, cw=Math.floor((W-20)/n), colH=H-60;

const codeLabels={simple:'const add = (a,b) => a+b',hot:'for(let i=0;i<1e6;i++) sum+=i',deopt:'x = 1; x = "string" // type!'}; txt(ctx,codeLabels[ENG.codeType]||'',W/2,18,10.5,'rgba(255,255,255,0.28)','center',400);
ENG_STAGES.forEach((s,i)=>{
const cx=10+i*cw+cw/2, active=i===ENG.stage, done=i<ENG.stage;
rr(ctx,10+i*cw+3,32,cw-6,colH,10,active?s.c+'14':'#0f0e1a',active?s.c+'66':done?'#2d2a4a':'#1a1830',active?1.5:1);
if(active)glow(ctx,cx,72,38,s.c);
txt(ctx,s.icon,cx,62,active?26:18,'#fff','center');
txt(ctx,s.label,cx,96,11,active?s.c:done?s.c+'aa':'#3d3566','center',600); txt(ctx,s.sub,cx,112,9,'rgba(255,255,255,0.28)','center');
if(s.label==='AST'&&(active||done)){ [[cx,140,'Program'],[cx-28,175,'Var'],[cx+28,175,'Arrow'],[cx+20,210,'Bin+']].forEach(([ax,ay,lbl],j)=>{
if(j>0){const px=j<=2?cx:cx+28,py=j<=2?148:183; ctx.beginPath();ctx.moveTo(px,py+6);ctx.lineTo(ax,ay-8);ctx.strokeStyle=s.c+'44';ctx.lineWidth=1;ctx.stroke();}
ctx.beginPath();ctx.arc(ax,ay,14,0,PI2);ctx.fillStyle='#1a1428';ctx.strokeStyle=s.c+(active?'cc':'55');ctx.lineWidth=1;ctx.fill();ctx.stroke();
txt(ctx,lbl,ax,ay,8,active?s.c:s.c+'88','center');
});
}
if(s.label==='Ignition'&&(active||done)){ ['LdaSmi [1]','Star r0','Add r0','Return'].forEach((line,j)=>{
txt(ctx,line,cx,148+j*22,8.5,active?'#f97316cc':'#f9731655','center',400);
});
}
if(s.label==='TurboFan'&&ENG.codeType==='hot'&&active){ txt(ctx,'🔥 HOT PATH',cx,148,12,'#ef4444','center',700); txt(ctx,'x400 faster',cx,168,9.5,'#fbbf24','center');
}
if(s.label==='Machine'&&(active||done)){ ['MOV eax,1','ADD eax,ebx','RET'].forEach((line,j)=>{
txt(ctx,line,cx,148+j*26,8.5,active?'#06b6d4cc':'#06b6d455','center',400);
});
}
if(done){ctx.beginPath();ctx.arc(10+i*cw+cw-14,42,8,0,PI2);ctx.fillStyle='#34d399';ctx.fill();txt(ctx,'✓',10+i*cw+cw-14,42,9,'#fff','center',700);}
});
rr(ctx,10,H-16,W-20,4,2,'rgba(255,255,255,0.06)');
rr(ctx,10,H-16,Math.max(4,(W-20)*(ENG.stage/(n-1))),4,2,ENG_STAGES[ENG.stage].c);
if(ENG.playing){
ENG.timer++;
if(ENG.timer>75){ENG.timer=0;ENG.stage=ENG.stage<n-1?ENG.stage+1:0;}
ENG.raf=requestAnimationFrame(animENG);
}
}
let EL={ctx:null,t:0,stack:[],micro:[],macro:[],webapi:[],log:[],raf:null};

function initEventLoop(){
const ctx=setupCvs('cvs-eventloop'); if(!ctx)return;
EL.ctx=ctx; EL.t=0; EL.stack=[]; EL.micro=[]; EL.macro=[]; EL.webapi=[]; EL.log=[];
cancelAnimationFrame(EL.raf); animEL();
}

function elRun(type){
EL.stack=[]; EL.micro=[]; EL.macro=[]; EL.webapi=[]; EL.log=[];
if(type==='sync'){ EL.stack=[{l:'main()',c:'#8b7ae8'},{l:'console.log(1)',c:'#60a5fa'},{l:'console.log(2)',c:'#60a5fa'}]; EL.log=['-> console.log(1) ✓','-> console.log(2) ✓','<- stack empty']; setTimeout(()=>{EL.stack=[{l:'main()',c:'#8b7ae8'},{l:'console.log(2)',c:'#60a5fa'}];},900);
setTimeout(()=>{EL.stack=[];},1800);
} else if(type==='promise'){ EL.stack=[{l:'main()',c:'#8b7ae8'},{l:'Promise.resolve()',c:'#c084fc'}]; EL.log=['-> Promise created','-> .then() queued -> microtask','<- sync stack cleared','-> microtask runs next!'];
setTimeout(()=>{EL.stack=[];EL.micro=[{l:'.then(callback)',c:'#c084fc'}];},800); setTimeout(()=>{EL.stack=[{l:'.then(callback)',c:'#c084fc'}];EL.micro=[];},1600);
setTimeout(()=>{EL.stack=[];},2400);
} else if(type==='timeout'){ EL.stack=[{l:'main()',c:'#8b7ae8'},{l:'setTimeout(fn,0)',c:'#f59e0b'}]; EL.webapi=[{l:'Timer (0ms)',c:'#f59e0b',p:0}]; EL.log=['-> setTimeout registered','-> timer sent to Web API','<- sync stack cleared','-> callback -> task queue'];
let iv=setInterval(()=>{if(EL.webapi[0])EL.webapi[0].p=Math.min((EL.webapi[0].p||0)+.07,1);},80);
setTimeout(()=>{EL.stack=[];},900);
setTimeout(()=>{clearInterval(iv);EL.webapi=[];EL.macro=[{l:'setTimeout cb',c:'#f59e0b'}];},1800); setTimeout(()=>{EL.stack=[{l:'setTimeout cb',c:'#f59e0b'}];EL.macro=[];},2600);
setTimeout(()=>{EL.stack=[];},3400);
} else if(type==='async'){ EL.stack=[{l:'async fn()',c:'#34d399'},{l:'await fetch()',c:'#34d399'}]; EL.webapi=[{l:'fetch() HTTP',c:'#60a5fa',p:0}]; EL.log=['-> await suspends fn','-> fetch -> Web API','<- async fn paused (suspended)','-> fetch done -> microtask resumes fn'];
let iv=setInterval(()=>{if(EL.webapi[0])EL.webapi[0].p=Math.min((EL.webapi[0].p||0)+.04,1);},80);
setTimeout(()=>{EL.stack=[];},600);
setTimeout(()=>{clearInterval(iv);EL.webapi=[];EL.micro=[{l:'resume async fn()',c:'#34d399'}];},2200); setTimeout(()=>{EL.stack=[{l:'async fn() resumes',c:'#34d399'}];EL.micro=[];},3000);
setTimeout(()=>{EL.stack=[];},3800);
}
}

function animEL(){
const ctx=EL.ctx; if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H); rr(ctx,0,0,W,H,0,'#0f0e1a');
const col1=20,w1=160, col2=196,w2=160, col3=372,w3=Math.max(80,W-col3-20);
const topY=32, rowH=H-topY-16;
rr(ctx,col1,topY,w1,rowH,10,'#130f2a','#8b7ae855',1.5); txt(ctx,'CALL STACK',col1+w1/2,topY+14,9.5,'#8b7ae8','center',600);
EL.stack.slice().reverse().forEach((item,i)=>{
rr(ctx,col1+8,topY+rowH-36-i*40,w1-16,30,7,item.c+'22',item.c,1.5);
txt(ctx,item.l,col1+w1/2,topY+rowH-21-i*40,10,item.c,'center',500);
});
rr(ctx,col2,topY,w2,136,10,'#0e1a30','#60a5fa44',1); txt(ctx,'WEB APIs',col2+w2/2,topY+14,9.5,'#60a5fa','center',600);
EL.webapi.forEach((a,i)=>{
rr(ctx,col2+8,topY+28+i*50,w2-16,34,7,'#0e2040','#60a5fa66',1);
txt(ctx,a.l,col2+w2/2,topY+40+i*50,10,a.c,'center');
rr(ctx,col2+12,topY+52+i*50,w2-24,4,2,'#1e3a60');
rr(ctx,col2+12,topY+52+i*50,(w2-24)*(a.p||0),4,2,a.c);
});
rr(ctx,col2,topY+150,w2,106,10,'#1a0e2a','#c084fc44',1); txt(ctx,'MICROTASK QUEUE',col2+w2/2,topY+164,9,'#c084fc','center',600); txt(ctx,'(Promises)',col2+w2/2,topY+176,8,'rgba(192,132,252,0.4)','center');
EL.micro.forEach((item,i)=>{
rr(ctx,col2+8,topY+188+i*32,w2-16,24,6,item.c+'22',item.c+'88',1);
txt(ctx,item.l,col2+w2/2,topY+200+i*32,9.5,item.c,'center',500);
});
rr(ctx,col2,topY+268,w2,82,10,'#1a1400','#f59e0b44',1); txt(ctx,'TASK QUEUE',col2+w2/2,topY+282,9,'#f59e0b','center',600); txt(ctx,'(setTimeout / I/O)',col2+w2/2,topY+294,8,'rgba(245,158,11,0.4)','center');
EL.macro.forEach((item,i)=>{
rr(ctx,col2+8,topY+306+i*28,w2-16,22,6,item.c+'22',item.c+'88',1);
txt(ctx,item.l,col2+w2/2,topY+317+i*28,9.5,item.c,'center',500);
});
const elArrowY = topY + 348;
txt(ctx,'↻',col2+w2/2,elArrowY,18,'#8b7ae8','center'); txt(ctx,'Event Loop',col2+w2/2,elArrowY+15,9,'#8b7ae8','center');
rr(ctx,col3,topY,w3,rowH,10,'#0e1a0e','#34d39944',1); txt(ctx,'CONSOLE OUTPUT',col3+w3/2,topY+14,9.5,'#34d399','center',600);
EL.log.forEach((line,i)=>{
txt(ctx,line,col3+10,topY+34+i*22,10,'#34d399cc','left',400);
});
EL.t++; EL.raf=requestAnimationFrame(animEL);
}
let AS={ctx:null,pts:[],t:0,mode:'idle',raf:null};
const AS_NODES=[
{xi:.08,yAbs:124,label:'async fn()',c:'#34d399',icon:'⚡'}, {xi:.30,yAbs:124,label:'await', c:'#c084fc',icon:'⏳'}, {xi:.52,yAbs:68, label:'Promise A', c:'#f59e0b',icon:'🅐'}, {xi:.52,yAbs:178,label:'Promise B', c:'#60a5fa',icon:'🅑'}, {xi:.74,yAbs:124,label:'.catch()', c:'#ef4444',icon:'🚫'}, {xi:.92,yAbs:124,label:'Resolved', c:'#34d399',icon:'[ok]'},
];

function initAsync(){
const ctx=setupCvs('cvs-async'); if(!ctx)return;
AS.ctx=ctx; AS.pts=[]; AS.t=0;
cancelAnimationFrame(AS.raf); animAS();
}

function ASN(W,H){return AS_NODES.map(n=>({...n,x:n.xi*W,y:n.yAbs}));}

function asyncRun(type){
const ctx=AS.ctx; if(!ctx)return;
AS.mode=type; AS.pts=[];
const flows={
chain:[[0,1,'#c084fc'],[1,2,'#f59e0b'],[2,4,'#34d399'],[4,5,'#34d399']], await:[[0,1,'#34d399'],[1,2,'#60a5fa'],[1,3,'#60a5fa'],[2,1,'#34d399'],[3,1,'#34d399'],[1,0,'#34d399']], all: [[0,2,'#f59e0b'],[0,3,'#60a5fa'],[2,4,'#34d399'],[3,4,'#34d399'],[4,5,'#34d399']], error:[[0,1,'#c084fc'],[1,2,'#ef4444'],[2,4,'#ef4444']],
};
(flows[type]||[]).forEach(([a,b,col],i)=>{
setTimeout(()=>{
const W2=ctx._w,H2=ctx._h; const nodes=ASN(W2,H2);
for(let j=0;j<10;j++)AS.pts.push({x:nodes[a].x,y:nodes[a].y,tx:nodes[b].x,ty:nodes[b].y,t:-(j*.06),c:col,r:3.5});
},i*500);
});
}

function animAS(){
const ctx=AS.ctx; if(!ctx)return;
const W=ctx._w,H=ctx._h; const nodes=ASN(W,H);
ctx.clearRect(0,0,W,H); rr(ctx,0,0,W,H,0,'#0f0e1a');
[[0,1],[1,2],[1,3],[2,4],[3,4],[4,5]].forEach(([a,b])=>{
const na=nodes[a],nb=nodes[b];
ctx.beginPath(); ctx.moveTo(na.x,na.y); ctx.lineTo(nb.x,nb.y);
ctx.strokeStyle='rgba(255,255,255,0.07)'; ctx.lineWidth=1; ctx.setLineDash([3,5]); ctx.stroke(); ctx.setLineDash([]);
});
nodes.forEach(n=>{
glow(ctx,n.x,n.y,26,n.c+'33'); rr(ctx,n.x-50,n.y-26,100,52,12,'#161428',n.c+'66',1.5); txt(ctx,n.icon,n.x,n.y-7,15,'#fff','center'); txt(ctx,n.label,n.x,n.y+10,11,n.c,'center',600);
});
AS.pts=AS.pts.filter(p=>{
p.t+=0.022; if(p.t<0)return true; if(p.t>1.15)return false;
const et=easeOut(Math.min(p.t,1));
const px=lerp(p.x,p.tx,et),py=lerp(p.y,p.ty,et);
const a=p.t>.8?1-(p.t-.8)*5:1;
glow(ctx,px,py,10,p.c); dot(ctx,px,py,p.c,p.r,a); return true;
});
const modes={chain:'Promise Chain: .then().then()',await:'Async/Await: suspend + resume',all:'Promise.all(): parallel execution',error:'Error propagates to .catch()',idle:'<- Select a pattern to animate'}; txt(ctx,modes[AS.mode]||'',W/2,H-14,10.5,'rgba(255,255,255,0.28)','center');
AS.t++; AS.raf=requestAnimationFrame(animAS);
}

function switchSubTab(name, btn){
document.querySelectorAll('[id^="subtab-"]').forEach(el=>el.style.display='none'); const el=document.getElementById('subtab-'+name); if(el)el.style.display='block'; document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); if(btn)btn.classList.add('active');
}
const pipelineDetails=[
{title:'DNS Lookup',text:'When you type a URL, the browser first checks its DNS cache. If not found, it queries a DNS resolver which maps the domain name to an IP address. This can take 10-300ms on first visit.'}, {title:'HTTP Request',text:'The browser opens a TCP connection (with TLS handshake for HTTPS), then sends an HTTP GET request. The server responds with HTML, status code, and response headers.'}, {title:'HTML Parsing',text:'The browser\'s HTML parser reads the byte stream and constructs the DOM -- a tree of nodes. Script tags may pause parsing unless marked async/defer.'}, {title:'CSS Parsing',text:'CSS files trigger parallel downloads. The CSS parser builds the CSSOM. CSSOM construction blocks rendering because all CSS must be processed before painting.'}, {title:'Render Tree',text:'The browser combines DOM and CSSOM into a Render Tree -- containing only visible nodes with their computed styles. Nodes with display:none are excluded.'}, {title:'Layout (Reflow)',text:'The browser calculates the exact position and size of every Render Tree element based on the viewport. This outputs a box model for every element.'}, {title:'Paint',text:'The browser converts layout boxes into actual pixels -- painting backgrounds, borders, text, and images. The compositor assembles layers into the final image.'}, {title:'JavaScript Execution',text:'Scripts run on the main thread via the V8 engine. JS can manipulate DOM/CSSOM, triggering reflows and repaints. This is why async, defer, and Web Workers matter.'},
];

function selectPipeline(i){
document.querySelectorAll('.pipeline-step').forEach((s,j)=>s.classList.toggle('selected',i===j)); const d=document.getElementById('pipeline-detail');
const info=pipelineDetails[i];
d.innerHTML=`<h4>${info.title}</h4><p>${info.text}</p>`;
d.classList.add('visible');
}
const engineDetails=[
'Raw JavaScript source code -- the text you write in your .js files.', 'The Parser tokenizes the source into lexical tokens, then builds an Abstract Syntax Tree (AST). It also performs syntax validation.', 'The AST is a tree representation of the code structure. Tools like Babel and ESLint work at this level.', 'Ignition, V8\'s interpreter, walks the AST and generates bytecode. It executes immediately, collecting type feedback for the optimizer.', 'TurboFan, V8\'s JIT compiler, takes "hot" bytecode and compiles it to highly optimized native machine code.', 'The final output: native machine code that runs directly on the CPU with no interpretation overhead.',
];

function hlEngine(i){
document.querySelectorAll('.engine-step').forEach((s,j)=>s.classList.toggle('hl',i===j)); const d=document.getElementById('engine-detail'); if(i>=0){d.style.display='block';d.textContent=engineDetails[i];} else d.style.display='none';
}
let mwStep=0;

function animateMiddleware(){
const steps=[
{id:'mw-layer1',msg:'📋 Logger middleware intercepted and logged the action.'}, {id:'mw-layer2',msg:'[cfg] Thunk middleware checked if action is a function -- handling async dispatch.'}, {id:'mw-reducer',msg:'[ok] Reducer received the action and computed new state (pure function).'}, {id:'mw-store',msg:'[db] Store updated. Subscribed React components will re-render.'},
];
steps.forEach(s=>{
const el=document.getElementById(s.id);
if(el){el.style.transform='';el.style.boxShadow='';}
});
document.getElementById('mw-status').textContent='';
mwStep=0;

function runStep(){
if(mwStep>=steps.length){document.getElementById('mw-status').textContent='[ok] Action fully processed through middleware chain!';return;}
const s=steps[mwStep];
const el=document.getElementById(s.id);
if(el){el.style.transform='translateX(8px) scale(1.02)';el.style.boxShadow='0 0 0 3px var(--p100)';el.style.transition='all 0.3s';} document.getElementById('mw-status').textContent=s.msg;
setTimeout(()=>{
if(el){el.style.transform='';el.style.boxShadow='';}
mwStep++;
setTimeout(runStep,400);
},700);
}
runStep();
}
const TAB_NAMES={react:'React',graphql:'GraphQL',angular:'Angular',vue:'Vue.js',browser:'Browser',engine:'JS Engine',es6:'ES6+','react-adv':'React+',react19:'React 19',build:'Build Tools',nextjs:'Next.js',patterns:'Patterns',vitals:'Web Vitals',security:'Security',testing:'Testing',prepqa:'Prep Q&A',backend:'Backend',cicd:'CI/CD & Deploy',hca:'HTML/CSS/A11y',sdlc:'SDLC'};
const SIDEBAR_DATA={
react:[{label:'Component Architecture',id:'react-arch'},{label:'Redux State Flow',id:'react-redux'},{label:'Zustand',id:'react-zustand'},{label:'Animated Diagram',id:'react-anim'}], graphql:[{label:'Apollo Architecture',id:'gql-apollo'},{label:'Core Concepts',id:'gql-concepts'},{label:'Animated Diagram',id:'gql-anim'}], angular:[{label:'Architecture',id:'ng-arch'},{label:'Animated Diagram',id:'ng-anim'}], vue:[{label:'Reactivity System',id:'vue-arch'},{label:'Animated Diagram',id:'vue-anim'}], browser:[{label:'Rendering Pipeline',id:'browser-pipeline'},{label:'DOM + CSSOM',id:'browser-render'},{label:'Middleware',id:'browser-middleware'},{label:'Animated Pipeline',id:'browser-anim'}], engine:[{label:'V8 Pipeline',id:'engine-pipeline'},{label:'Concepts',id:'engine-concepts'},{label:'Animated Diagram',id:'engine-anim'},{label:'WebSockets & Workers',id:'engine-wsw'}], es6:[{label:'Event Loop',id:'es6-eventloop'},{label:'Async/Await',id:'es6-async'},{label:'ES6 Features',id:'es6-features'},{label:'Modules',id:'es6-modules'},{label:'TypeScript',id:'es6-typescript'}], 'react-adv':[{label:'React Fiber',id:'radv-fiber'},{label:'HOC',id:'radv-hoc'},{label:'Context API',id:'radv-context'},{label:'Portals',id:'radv-portal'},{label:'Fragments',id:'radv-fragment'},{label:'Error Boundaries',id:'radv-errorboundary'}],
react19:[{label:'What is React 19',id:'r19-overview'},{label:'New Hooks',id:'r19-hooks'},{label:'Server Actions',id:'r19-actions'},{label:'Asset Loading',id:'r19-assets'},{label:'React Compiler',id:'r19-compiler'}], build:[{label:'Webpack',id:'build-webpack'},{label:'Webpack Advanced',id:'build-webpack-adv'},{label:'Vite',id:'build-vite'},{label:'Webpack vs Vite',id:'build-compare'},{label:'Monorepo / NX',id:'build-monorepo'}], nextjs:[{label:'CSR',id:'next-csr'},{label:'SSR',id:'next-ssr'},{label:'App Router Flow',id:'next-flow'}], patterns:[{label:'Module',id:'pat-module'},{label:'Singleton',id:'pat-singleton'},{label:'Factory',id:'pat-factory'},{label:'Observer',id:'pat-observer'},{label:'Strategy',id:'pat-strategy'}], vitals:[{label:'Core Vitals Overview',id:'vitals-overview'},{label:'Supporting Metrics',id:'vitals-other'},{label:'Optimization',id:'vitals-optimize'}], security:[{label:'Threat Landscape',id:'sec-overview'},{label:'XSS',id:'sec-xss'},{label:'CORS & CSRF',id:'sec-cors-csrf'},{label:'Scanning & Tools',id:'sec-scanning'}], testing:[{label:'Testing Pyramid',id:'test-pyramid'},{label:'Test Types',id:'test-types'},{label:'Test Patterns',id:'test-patterns'},{label:'Tools Ecosystem',id:'test-tools'}], prepqa:[{label:'Architecture (1-15)',id:'qa-arch'},{label:'Performance (16-25)',id:'qa-perf'},{label:'Design Systems (26-35)',id:'qa-design'},{label:'Tooling & Infra (36-45)',id:'qa-infra'},{label:'Leadership (46-52)',id:'qa-collab'},{label:'Security (53-60)',id:'qa-security'},{label:'React & Redux (61-80)',id:'qa-filter-react-redux'},{label:'JavaScript ES6+ (81-100)',id:'qa-filter-javascript'},{label:'System Design (101-120)',id:'qa-filter-sysdesign'},{label:'Next.js (121-140)',id:'qa-filter-nextjs-qa'},{label:'Angular (141-160)',id:'qa-filter-angular-qa'},{label:'Vue.js (161-180)',id:'qa-filter-vue-qa'},{label:'GraphQL (181-200)',id:'qa-filter-graphql-qa'},{label:'Webpack & Vite (201-220)',id:'qa-filter-webpack-vite'}], backend:[{label:'Node.js Event Loop',id:'be-node-overview'},{label:'Streams & Workers',id:'be-node-streams'},{label:'Clustering & PM2',id:'be-node-perf'},{label:'Express Middleware',id:'be-express-overview'},{label:'Express Architecture',id:'be-express-patterns'},{label:'MongoDB Overview',id:'be-mongo-overview'},{label:'Aggregation & Mongoose',id:'be-mongo-aggregation'},{label:'PostgreSQL Overview',id:'be-pg-overview'},{label:'Advanced PG & Node',id:'be-pg-advanced'},{label:'Full Stack Integration',id:'be-stack-integration'}], cicd:[{label:'Docker & Containers',id:'cicd-docker'},{label:'Kubernetes Orchestration',id:'cicd-k8s'},{label:'Kafka Messaging',id:'cicd-kafka'},{label:'Vercel & Deployment',id:'cicd-vercel'},{label:'CI/CD Pipeline',id:'cicd-pipeline'}],
hca:[{label:'HTML5 Semantics',id:'hca-html'},{label:'CSS Box Model',id:'hca-css'},{label:'Flexbox',id:'hca-css'},{label:'CSS Grid',id:'hca-css'},{label:'Accessibility',id:'hca-a11y'},{label:'SASS & LESS',id:'hca-preprocessors'}],
sdlc:[{label:'SDLC Overview',id:'sdlc-overview'},{label:'SDLC Phases Animation',id:'sdlc-anim'},{label:'Software Architect Role',id:'sdlc-architect'},{label:'MVC vs MVP vs MVVM',id:'sdlc-patterns'},{label:'TDD / BDD / ATDD',id:'sdlc-tdd'}]
};
const SIDEBAR_ICONS={
'react-arch': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.2" fill="#8b7ae8"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#8b7ae8" stroke-width="1.3" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#8b7ae8" stroke-width="1.3" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#8b7ae8" stroke-width="1.3" fill="none" transform="rotate(120 12 12)"/></svg>`,
'react-redux': `<svg viewBox="0 0 24 24" fill="none"><path d="M16.5 4.5c1.2 0 2.2.9 2.2 2.1s-.9 2.1-2.2 2.1H12c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5" stroke="#764ABC" stroke-width="1.4" stroke-linecap="round"/><path d="M14 14.5c.8.8 1.3 2 1.3 3.1 0 2.4-1.9 4.4-4.3 4.4S6.7 20 6.7 17.6c0-1.2.5-2.3 1.3-3.1" stroke="#764ABC" stroke-width="1.4" stroke-linecap="round"/><circle cx="16.5" cy="6.6" r="1.5" fill="#764ABC"/><circle cx="10" cy="19.1" r="1.5" fill="#764ABC"/><path d="M7 9.5c-.6-.7-1-1.6-1-2.6 0-2.2 1.8-4 4-4h.5" stroke="#764ABC" stroke-width="1.4" stroke-linecap="round"/><circle cx="12" cy="3" r="1.5" fill="#764ABC"/></svg>`,
'react-zustand': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#34d399" stroke-width="1.4"/><circle cx="9" cy="10" r="2" fill="#34d399"/><circle cx="15" cy="10" r="2" fill="#34d399"/><path d="M8 15c1 1.5 7 1.5 8 0" stroke="#34d399" stroke-width="1.4" stroke-linecap="round"/></svg>`,
'react-anim': `<svg viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="none" stroke="#8b7ae8" stroke-width="1.5" stroke-linejoin="round"/><circle cx="5" cy="3" r="1.5" fill="#8b7ae8"/><circle cx="19" cy="12" r="1.5" fill="#8b7ae8"/><circle cx="5" cy="21" r="1.5" fill="#8b7ae8"/></svg>`,
'gql-apollo': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v10l9 5 9-5V7z" stroke="#E535AB" stroke-width="1.4"/><circle cx="12" cy="2" r="1.5" fill="#E535AB"/><circle cx="3" cy="7" r="1.5" fill="#E535AB"/><circle cx="21" cy="7" r="1.5" fill="#E535AB"/><circle cx="3" cy="17" r="1.5" fill="#E535AB"/><circle cx="21" cy="17" r="1.5" fill="#E535AB"/><circle cx="12" cy="22" r="1.5" fill="#E535AB"/><line x1="12" y1="2" x2="12" y2="22" stroke="#E535AB" stroke-width="1.1"/></svg>`,
'gql-concepts': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#E535AB" stroke-width="1.4"/><circle cx="12" cy="12" r="3" stroke="#E535AB" stroke-width="1.2"/><line x1="12" y1="2.5" x2="12" y2="9" stroke="#E535AB" stroke-width="1.2"/><line x1="12" y1="15" x2="12" y2="21.5" stroke="#E535AB" stroke-width="1.2"/><line x1="2.5" y1="12" x2="9" y2="12" stroke="#E535AB" stroke-width="1.2"/><line x1="15" y1="12" x2="21.5" y2="12" stroke="#E535AB" stroke-width="1.2"/></svg>`,
'ng-arch': `<svg viewBox="0 0 24 24"><path d="M12 2L3.5 5.2l1.3 11.2L12 21l7.2-4.6 1.3-11.2z" fill="#DD0031"/><path d="M12 2v19l7.2-4.6 1.3-11.2z" fill="#C3002F"/><path d="M12 6.5L9 14h1.4l.75-2h2.7l.75 2H16zm0 2.4l1.05 2.7h-2.1z" fill="white"/></svg>`,
'ng-anim': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="5" height="8" rx="2" stroke="#DD0031" stroke-width="1.4"/><rect x="10" y="5" width="5" height="14" rx="2" stroke="#DD0031" stroke-width="1.4"/><rect x="17" y="10" width="4" height="6" rx="2" stroke="#DD0031" stroke-width="1.4"/><path d="M8 12h2M15 12h2" stroke="#DD0031" stroke-width="1.2"/></svg>`,
'vue-arch': `<svg viewBox="0 0 24 24"><path d="M2 3h4l6 10 6-10h4L12 21z" fill="#41B883"/><path d="M6 3h4l2 3.5L14 3h4L12 13z" fill="#35495E"/></svg>`,
'vue-anim': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="#41B883"/><path d="M12 4v2M12 18v2M4 12H6M18 12h2" stroke="#41B883" stroke-width="1.5" stroke-linecap="round"/><path d="M6.34 6.34l1.42 1.42M16.24 16.24l1.42 1.42M6.34 17.66l1.42-1.42M16.24 7.76l1.42-1.42" stroke="#41B883" stroke-width="1.3" stroke-linecap="round"/></svg>`,
'browser-pipeline': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="17" rx="2" stroke="#4285F4" stroke-width="1.4"/><line x1="2" y1="8" x2="22" y2="8" stroke="#4285F4" stroke-width="1.3"/><circle cx="5.5" cy="5.5" r="1" fill="#4285F4"/><circle cx="8.5" cy="5.5" r="1" fill="#4285F4"/><circle cx="11.5" cy="5.5" r="1" fill="#4285F4"/><path d="M5 12h4M5 15h6M5 18h3" stroke="#4285F4" stroke-width="1.2" stroke-linecap="round"/></svg>`,
'browser-render': `<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#4285F4" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="2 3"/><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#4285F4" stroke-width="1.4"/><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="#E535AB" stroke-width="1.4"/><rect x="8" y="13" width="8" height="8" rx="1.5" stroke="#8b7ae8" stroke-width="1.4"/></svg>`,
'browser-middleware': `<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" stroke="#f59e0b" stroke-width="1.4"/><circle cx="12" cy="12" r="2.5" stroke="#f59e0b" stroke-width="1.4"/><circle cx="19" cy="12" r="2.5" stroke="#f59e0b" stroke-width="1.4"/><path d="M7.5 12h2M14.5 12h2" stroke="#f59e0b" stroke-width="1.4" stroke-linecap="round"/><path d="M5 5v4.5M12 5v4.5M19 5v4.5M5 14.5V19M12 14.5V19M19 14.5V19" stroke="#f59e0b" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="2 2"/></svg>`,
'browser-anim': `<svg viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="none" stroke="#4285F4" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
'engine-pipeline': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="8" width="4" height="8" rx="1.5" stroke="#f59e0b" stroke-width="1.4"/><rect x="7" y="5" width="4" height="14" rx="1.5" stroke="#f59e0b" stroke-width="1.4"/><rect x="12" y="7" width="4" height="10" rx="1.5" stroke="#f59e0b" stroke-width="1.4"/><rect x="17" y="3" width="5" height="18" rx="1.5" stroke="#ef4444" stroke-width="1.4"/><path d="M6 12h1M11 12h1M16 12h1" stroke="#f59e0b" stroke-width="1.2"/></svg>`,
'engine-concepts': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="5" rx="1.5" stroke="#f59e0b" stroke-width="1.4"/><rect x="3" y="10" width="8" height="5" rx="1.5" stroke="#f59e0b" stroke-width="1.4"/><rect x="3" y="17" width="8" height="4" rx="1.5" stroke="#ef4444" stroke-width="1.4"/><path d="M11 5.5h3l4 6-4 6H11" stroke="#f59e0b" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'engine-anim': `<svg viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round"/><circle cx="5" cy="3" r="1.5" fill="#f59e0b"/><circle cx="19" cy="12" r="1.5" fill="#f59e0b"/><circle cx="5" cy="21" r="1.5" fill="#f59e0b"/></svg>`,
'es6-eventloop': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#8b7ae8" stroke-width="1.4"/><path d="M12 7v5l3 3" stroke="#8b7ae8" stroke-width="1.5" stroke-linecap="round"/><path d="M7.5 4.5A9.5 9.5 0 0 1 21.5 12" stroke="#8b7ae8" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="2 3"/></svg>`,
'es6-async': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="5" rx="1.5" stroke="#c084fc" stroke-width="1.4"/><rect x="3" y="10" width="7" height="5" rx="1.5" stroke="#c084fc" stroke-width="1.4"/><rect x="3" y="17" width="7" height="4" rx="1.5" stroke="#c084fc" stroke-width="1.4"/><path d="M10 5.5h11M10 12.5h7M10 19h5" stroke="#c084fc" stroke-width="1.3" stroke-linecap="round"/><circle cx="21" cy="5.5" r="1.5" fill="#c084fc"/><circle cx="17" cy="12.5" r="1.5" fill="#34d399"/><circle cx="15" cy="19" r="1.5" fill="#34d399"/></svg>`,
'es6-modules': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="7" height="7" rx="1.5" stroke="#8b7ae8" stroke-width="1.4"/><rect x="15" y="4" width="7" height="7" rx="1.5" stroke="#60a5fa" stroke-width="1.4"/><rect x="8.5" y="14" width="7" height="7" rx="1.5" stroke="#34d399" stroke-width="1.4"/><path d="M9 7.5h6M5.5 11v3.5l6.5 3M18.5 11v3.5l-6.5 3" stroke="#8b7ae8" stroke-width="1.2" stroke-linecap="round"/></svg>`,
'gql-anim': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3L3.5 8v8L12 21l8.5-5V8z" stroke="#E535AB" stroke-width="1.4"/><circle cx="12" cy="12" r="2.5" fill="#E535AB"/><line x1="12" y1="3" x2="12" y2="21" stroke="#E535AB" stroke-width="1.1" stroke-dasharray="2 3"/></svg>`,
'vitals-overview':`<svg viewBox="0 0 24 24" fill="none"><polyline points="2,14 6,8 10,12 14,4 18,10 22,6" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'vitals-other': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#10b981" stroke-width="1.4"/><path d="M12 7v5l3 3" stroke="#10b981" stroke-width="1.5" stroke-linecap="round"/></svg>`,
'vitals-optimize':`<svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#f59e0b" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
'sec-overview': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3L4 7v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-4z" stroke="#ef4444" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
'sec-xss': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01" stroke="#ef4444" stroke-width="1.6" stroke-linecap="round"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#ef4444" stroke-width="1.4"/></svg>`,
'sec-cors-csrf': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#60a5fa" stroke-width="1.4"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#60a5fa" stroke-width="1.3"/></svg>`,
'sec-scanning': `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#c084fc" stroke-width="1.4"/><path d="M21 21l-4.35-4.35" stroke="#c084fc" stroke-width="1.6" stroke-linecap="round"/><path d="M8 11h6M11 8v6" stroke="#c084fc" stroke-width="1.3" stroke-linecap="round"/></svg>`,
'test-pyramid': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 4L2 20h20L12 4z" stroke="#06b6d4" stroke-width="1.4" stroke-linejoin="round"/><line x1="5" y1="14" x2="19" y2="14" stroke="#06b6d4" stroke-width="1.1"/><line x1="8" y1="9" x2="16" y2="9" stroke="#06b6d4" stroke-width="1.1"/></svg>`,
'test-types': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="5" rx="1.5" stroke="#34d399" stroke-width="1.3"/><rect x="3" y="11" width="7" height="5" rx="1.5" stroke="#f59e0b" stroke-width="1.3"/><rect x="3" y="19" width="7" height="2" rx="1" stroke="#ef4444" stroke-width="1.3"/><path d="M13 5.5h8M13 13.5h6M13 20h4" stroke="#06b6d4" stroke-width="1.4" stroke-linecap="round"/></svg>`,
'test-patterns': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="5" height="10" rx="1.5" stroke="#8b7ae8" stroke-width="1.3"/><rect x="9" y="4" width="6" height="16" rx="1.5" stroke="#60a5fa" stroke-width="1.3"/><rect x="17" y="9" width="5" height="6" rx="1.5" stroke="#34d399" stroke-width="1.3"/></svg>`,
'test-tools': `<svg viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#f59e0b" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'qa-arch': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="13" width="7" height="8" rx="1.5" stroke="#8b7ae8" stroke-width="1.3"/><rect x="8.5" y="7" width="7" height="14" rx="1.5" stroke="#8b7ae8" stroke-width="1.3"/><rect x="14" y="3" width="7" height="18" rx="1.5" stroke="#d97706" stroke-width="1.3"/></svg>`,
'qa-perf': `<svg viewBox="0 0 24 24" fill="none"><polyline points="2,16 7,9 11,13 15,5 19,10 22,7" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'qa-design': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="#a855f7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" stroke="#a855f7" stroke-width="1.4" stroke-linecap="round"/></svg>`,
'qa-infra': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="5" rx="1.5" stroke="#3b82f6" stroke-width="1.3"/><rect x="2" y="10" width="20" height="5" rx="1.5" stroke="#3b82f6" stroke-width="1.3"/><rect x="2" y="17" width="20" height="4" rx="1.5" stroke="#3b82f6" stroke-width="1.3"/><circle cx="5" cy="5.5" r="1" fill="#3b82f6"/><circle cx="5" cy="12.5" r="1" fill="#3b82f6"/></svg>`,
'qa-collab': `<svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="3" stroke="#059669" stroke-width="1.3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#059669" stroke-width="1.3" stroke-linecap="round"/><circle cx="18" cy="8" r="2.5" stroke="#059669" stroke-width="1.2"/><path d="M16 20c0-2.2 1.3-4 3-4.5" stroke="#059669" stroke-width="1.2" stroke-linecap="round"/></svg>`,
'qa-security': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3L4 7v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-4z" stroke="#ef4444" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#ef4444" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'be-node-overview':`<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#68a063" stroke-width="1.4"/><path d="M12 7v5l3 3" stroke="#68a063" stroke-width="1.5" stroke-linecap="round"/></svg>`,
'be-node-streams': `<svg viewBox="0 0 24 24" fill="none"><path d="M3 12h3l3-6 4 12 3-6h5" stroke="#68a063" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'be-node-perf': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="14" width="4" height="7" rx="1.5" stroke="#68a063" stroke-width="1.3"/><rect x="7" y="9" width="4" height="12" rx="1.5" stroke="#68a063" stroke-width="1.3"/><rect x="12" y="5" width="4" height="16" rx="1.5" stroke="#68a063" stroke-width="1.3"/><rect x="17" y="11" width="5" height="10" rx="1.5" stroke="#f59e0b" stroke-width="1.3"/></svg>`,
'be-express-overview':`<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="2.5" stroke="#d97706" stroke-width="1.3"/><circle cx="12" cy="12" r="2.5" stroke="#d97706" stroke-width="1.3"/><circle cx="19" cy="12" r="2.5" stroke="#d97706" stroke-width="1.3"/><path d="M7.5 12h2M14.5 12h2" stroke="#d97706" stroke-width="1.4" stroke-linecap="round"/></svg>`,
'be-express-patterns':`<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="5" rx="1.5" stroke="#d97706" stroke-width="1.3"/><rect x="2" y="10" width="20" height="5" rx="1.5" stroke="#d97706" stroke-width="1.3"/><rect x="2" y="17" width="20" height="4" rx="1.5" stroke="#f59e0b" stroke-width="1.3"/></svg>`,
'be-mongo-overview': `<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="8" ry="2.8" stroke="#22c55e" stroke-width="1.3"/><path d="M4 5v7c0 1.55 3.58 2.8 8 2.8S20 13.55 20 12V5" stroke="#22c55e" stroke-width="1.3"/><path d="M4 12v4.5c0 1.55 3.58 2.8 8 2.8S20 18.05 20 16.5V12" stroke="#22c55e" stroke-width="1.3"/></svg>`,
'be-mongo-aggregation':`<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h14M3 18h10" stroke="#22c55e" stroke-width="1.4" stroke-linecap="round"/><circle cx="19" cy="12" r="2.5" stroke="#22c55e" stroke-width="1.3"/><circle cx="15" cy="18" r="2.5" stroke="#16a34a" stroke-width="1.3"/></svg>`,
'be-pg-overview': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="3" stroke="#3b82f6" stroke-width="1.3"/><path d="M2 8h20M7 3v5M12 3v5M17 3v5" stroke="#3b82f6" stroke-width="1.2"/><path d="M5 12h4M5 16h7" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round"/></svg>`,
'be-pg-advanced': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" stroke="#3b82f6" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
'be-stack-integration':`<svg viewBox="0 0 24 24" fill="none"><rect x="1" y="3" width="5" height="18" rx="1.5" stroke="#68a063" stroke-width="1.3"/><rect x="9" y="7" width="5" height="10" rx="1.5" stroke="#d97706" stroke-width="1.3"/><rect x="17" y="5" width="6" height="14" rx="1.5" stroke="#3b82f6" stroke-width="1.3"/><path d="M6 12h3M14 12h3" stroke="#22c55e" stroke-width="1.3" stroke-linecap="round"/></svg>`,
'sdlc-overview': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#f59e0b" stroke-width="1.4"/><path d="M12 7v5l3.5 3.5" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/></svg>`,
'sdlc-anim': `<svg viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
'sdlc-architect': `<svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M9 21V7l6-4v18" stroke="#f59e0b" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 7l6 4" stroke="#f59e0b" stroke-width="1.3" stroke-linecap="round"/></svg>`,
'sdlc-patterns': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="5" height="5" rx="1" stroke="#a78bfa" stroke-width="1.3"/><rect x="9" y="3" width="5" height="5" rx="1" stroke="#22c55e" stroke-width="1.3"/><rect x="16" y="3" width="6" height="5" rx="1" stroke="#3b82f6" stroke-width="1.3"/><path d="M4.5 8v3M11.5 8v3M19 8v3M4.5 11h15M12 11v3" stroke="#a78bfa" stroke-width="1.2" stroke-linecap="round"/><rect x="8" y="14" width="8" height="7" rx="1.5" stroke="#f59e0b" stroke-width="1.3"/></svg>`,
'sdlc-tdd': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="#ef4444" stroke-width="1.4"/><circle cx="12" cy="12" r="8" stroke="#22c55e" stroke-width="1.2" stroke-dasharray="3 2"/><circle cx="12" cy="12" r="11" stroke="#3b82f6" stroke-width="1" stroke-dasharray="2 3"/></svg>`,
'build-webpack-adv':`<svg viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="#60a5fa" stroke-width="1.4"/><path d="M8 12h8M12 8v8" stroke="#60a5fa" stroke-width="1.3" stroke-linecap="round"/></svg>`,
'build-webpack': `<svg viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="#60a5fa" stroke-width="1.4"/><polygon points="12,7 17,10 17,14 12,17 7,14 7,10" stroke="#60a5fa" stroke-width="1.2" fill="#60a5fa22"/></svg>`,
'build-vite': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4-8 4-8-4z" stroke="#fbbf24" stroke-width="1.4" stroke-linejoin="round"/><path d="M4 10l8 4v8" stroke="#fbbf24" stroke-width="1.4" stroke-linecap="round"/><path d="M20 10l-8 4" stroke="#c084fc" stroke-width="1.4" stroke-linecap="round"/></svg>`,
'build-compare': `<svg viewBox="0 0 24 24" fill="none"><path d="M3 6h8M3 12h8M3 18h8" stroke="#60a5fa" stroke-width="1.4" stroke-linecap="round"/><path d="M13 6h8M13 12h5M13 18h7" stroke="#fbbf24" stroke-width="1.4" stroke-linecap="round"/><line x1="12" y1="3" x2="12" y2="21" stroke="rgba(139,122,232,0.3)" stroke-width="1"/></svg>`,
'build-monorepo':`<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="9" height="6" rx="1.5" stroke="#f97316" stroke-width="1.4"/><rect x="13" y="2" width="9" height="6" rx="1.5" stroke="#f97316" stroke-width="1.4"/><rect x="7" y="16" width="10" height="6" rx="1.5" stroke="#f97316" stroke-width="1.4"/><path d="M6.5 8v4h5v4M17.5 8v4h-5" stroke="#f97316" stroke-width="1.2" stroke-linecap="round"/></svg>`,
'next-csr': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#a1a1aa" stroke-width="1.4"/><path d="M8 21h8M12 17v4" stroke="#a1a1aa" stroke-width="1.3" stroke-linecap="round"/><path d="M7 10l2 2 4-4" stroke="#34d399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'next-ssr': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="10" height="20" rx="2" stroke="#a1a1aa" stroke-width="1.4"/><rect x="14" y="2" width="8" height="20" rx="2" stroke="#60a5fa" stroke-width="1.4" stroke-dasharray="3 2"/><path d="M12 12h2" stroke="#a1a1aa" stroke-width="1.5" stroke-linecap="round"/></svg>`,
'next-flow': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" fill="#18181b" stroke="#3f3f46" stroke-width="1.4"/><path d="M8 15.5V8.5l8 9V8.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'radv-fiber': `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M3 8l9-5 9 5M3 16l9 5 9-5" stroke="#0ea5e9" stroke-width="1.4" stroke-linecap="round"/></svg>`,
'radv-hoc': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="8" width="6" height="8" rx="2" stroke="#0ea5e9" stroke-width="1.4"/><rect x="9" y="5" width="6" height="14" rx="2" stroke="#0ea5e9" stroke-width="1.4"/><rect x="16" y="8" width="6" height="8" rx="2" stroke="#0ea5e9" stroke-width="1.4"/></svg>`,
'radv-context': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="2.5" stroke="#0ea5e9" stroke-width="1.3"/><circle cx="5" cy="19" r="2.5" stroke="#60a5fa" stroke-width="1.3"/><circle cx="19" cy="19" r="2.5" stroke="#60a5fa" stroke-width="1.3"/><path d="M12 7.5v4M7 17.5l4-6M17 17.5l-4-6" stroke="#0ea5e9" stroke-width="1.2" stroke-linecap="round"/></svg>`,
'radv-portal': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="12" height="16" rx="2" stroke="#c084fc" stroke-width="1.4"/><path d="M14 9h4m0 0l-2-2m2 2l-2 2" stroke="#c084fc" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><rect x="16" y="12" width="6" height="8" rx="1.5" stroke="#f472b6" stroke-width="1.3"/></svg>`,
'radv-fragment': `<svg viewBox="0 0 24 24" fill="none"><path d="M5 6h14M5 12h14M5 18h14" stroke="#34d399" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 3"/><circle cx="5" cy="6" r="1.5" fill="#34d399"/><circle cx="5" cy="18" r="1.5" fill="#34d399"/></svg>`,
'pat-module': `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#8b7ae8" stroke-width="1.4"/><rect x="7" y="7" width="5" height="10" rx="1.5" stroke="#c084fc" stroke-width="1.2" fill="#c084fc22"/><rect x="14" y="7" width="3" height="10" rx="1.5" stroke="#34d399" stroke-width="1.2"/></svg>`,
'pat-singleton': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#fbbf24" stroke-width="1.4"/><path d="M10 9h2v6m0 0H9m1 0h3" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'pat-factory': `<svg viewBox="0 0 24 24" fill="none"><rect x="8" y="2" width="8" height="6" rx="1.5" stroke="#f97316" stroke-width="1.4"/><path d="M12 8v4" stroke="#f97316" stroke-width="1.3"/><rect x="2" y="14" width="6" height="8" rx="1.5" stroke="#60a5fa" stroke-width="1.3"/><rect x="9" y="14" width="6" height="8" rx="1.5" stroke="#34d399" stroke-width="1.3"/><rect x="16" y="14" width="6" height="8" rx="1.5" stroke="#c084fc" stroke-width="1.3"/><path d="M12 12l-6 2M12 12v2M12 12l6 2" stroke="#f97316" stroke-width="1.1"/></svg>`,
'pat-observer': `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="3" stroke="#c084fc" stroke-width="1.4"/><circle cx="4" cy="19" r="2.5" stroke="#60a5fa" stroke-width="1.3"/><circle cx="12" cy="19" r="2.5" stroke="#34d399" stroke-width="1.3"/><circle cx="20" cy="19" r="2.5" stroke="#f59e0b" stroke-width="1.3"/><path d="M10 7.5l-5 9M12 8v9M14 7.5l5 9" stroke="#c084fc" stroke-width="1.1" stroke-dasharray="2 2"/></svg>`,
'pat-strategy': `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="9" width="7" height="6" rx="1.5" stroke="#8b7ae8" stroke-width="1.4"/><rect x="15" y="4" width="7" height="4" rx="1.5" stroke="#60a5fa" stroke-width="1.3"/><rect x="15" y="10" width="7" height="4" rx="1.5" stroke="#f59e0b" stroke-width="1.3"/><rect x="15" y="16" width="7" height="4" rx="1.5" stroke="#34d399" stroke-width="1.3"/><path d="M9 10l6-4M9 12h6M9 14l6 4" stroke="#8b7ae8" stroke-width="1.1"/></svg>`,
};
const COLORS={react:'#8b7ae8',graphql:'#e535ab',angular:'#ef4444',vue:'#34d399',browser:'#3b82f6',engine:'#f59e0b',es6:'#c084fc','react-adv':'#0ea5e9',build:'#f97316',nextjs:'#a1a1aa',patterns:'#a78bfa',vitals:'#10b981',security:'#ef4444',testing:'#06b6d4',prepqa:'#d97706',backend:'#22c55e',sdlc:'#f59e0b'};
const LABEL_ICONS={
react: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" transform="rotate(120 12 12)"/></svg>`,
graphql: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><path d="M12 3L3.5 8v8L12 21l8.5-5V8z" stroke="#E535AB" stroke-width="1.4"/><circle cx="12" cy="3" r="1.4" fill="#E535AB"/><circle cx="3.5" cy="8" r="1.4" fill="#E535AB"/><circle cx="3.5" cy="16" r="1.4" fill="#E535AB"/><circle cx="12" cy="21" r="1.4" fill="#E535AB"/><circle cx="20.5" cy="16" r="1.4" fill="#E535AB"/><circle cx="20.5" cy="8" r="1.4" fill="#E535AB"/></svg>`,
angular: `<svg viewBox="0 0 24 24" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><path d="M12 2.5L3 6l1.4 11.5L12 22l7.6-4.5L21 6z" fill="#DD0031"/><path d="M12 2.5v19.5l7.6-4.5L21 6z" fill="#C3002F"/><path d="M12 7L9 15h1.5l.7-2h1.6l.7-2h-1.6L12 9.5 13.8 14H15l-3-7z" fill="white"/></svg>`,
vue: `<svg viewBox="0 0 24 24" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><path d="M2 3.5h4L12 16 18 3.5h4L12 21z" fill="#41B883"/><path d="M6.5 3.5H10l2 4 2-4h3.5L12 16z" fill="#35495E"/></svg>`,
browser: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><rect x="2" y="3" width="20" height="18" rx="3" stroke="#4285F4" stroke-width="1.4"/><line x1="2" y1="8.5" x2="22" y2="8.5" stroke="#4285F4" stroke-width="1.3"/><circle cx="5.5" cy="6" r="1" fill="#ef4444"/><circle cx="8.5" cy="6" r="1" fill="#f59e0b"/><circle cx="11.5" cy="6" r="1" fill="#34d399"/></svg>`,
engine: `<svg viewBox="0 0 24 24" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E"/><path d="M8 16.5c.4.65.95 1.1 1.9 1.1 1 0 1.7-.52 1.7-1.55V10h-1.5v5.9c0 .43-.17.67-.57.67-.36 0-.6-.24-.82-.52L8 16.5zM13.8 16.35c.47.8 1.22 1.27 2.35 1.27 1.25 0 2.1-.62 2.1-1.75 0-1.05-.62-1.52-1.68-1.95l-.43-.19c-.52-.23-.74-.38-.74-.76 0-.32.24-.56.62-.56.37 0 .62.16.85.56l1.25-.8c-.52-.9-1.24-1.25-2.1-1.25-1.28 0-2.1.82-2.1 1.9 0 1.02.6 1.52 1.48 1.9l.43.19c.62.27.94.43.94.86 0 .37-.33.62-.86.62-.62 0-1-.32-1.28-.81l-1.33.77z" fill="#333"/></svg>`,
es6: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#c084fc" stroke-width="1.4"/><path d="M7 9h4M7 12h6M7 15h5" stroke="#c084fc" stroke-width="1.5" stroke-linecap="round"/><path d="M15 9l2 3-2 3" stroke="#60a5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
'react-adv':`<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><circle cx="12" cy="12" r="3" stroke="#0ea5e9" stroke-width="1.4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#0ea5e9" stroke-width="1.4" stroke-linecap="round"/></svg>`,
react19: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><circle cx="12" cy="12" r="2.2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none" transform="rotate(120 12 12)"/><text x="8" y="16" font-size="7" fill="#FF9900" font-weight="bold">19</text></svg>`,
build: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><rect x="2" y="14" width="8" height="8" rx="2" stroke="#f97316" stroke-width="1.4"/><rect x="9" y="2" width="13" height="10" rx="2" stroke="#f97316" stroke-width="1.4"/><path d="M6 14V10M10 6H6" stroke="#f97316" stroke-width="1.3" stroke-linecap="round"/></svg>`,
nextjs: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><circle cx="12" cy="12" r="9.5" fill="#000" stroke="#555" stroke-width="1"/><path d="M8 15.5V8.5l8 9V8.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
patterns: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#a78bfa" stroke-width="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#a78bfa" stroke-width="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#a78bfa" stroke-width="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#34d399" stroke-width="1.4"/></svg>`,
vitals: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><polyline points="2,14 6,8 10,12 14,4 18,10 22,6" stroke="#10b981" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
security: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><path d="M12 3L4 7v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-4z" stroke="#ef4444" stroke-width="1.4" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
testing: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke="#06b6d4" stroke-width="1.4" stroke-linecap="round"/></svg>`,
prepqa: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><circle cx="12" cy="12" r="9.5" stroke="#d97706" stroke-width="1.4"/><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="#d97706"/></svg>`,
backend: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><ellipse cx="12" cy="6" rx="9" ry="3.2" stroke="#22c55e" stroke-width="1.4"/><path d="M3 6v5c0 1.77 4.03 3.2 9 3.2S21 12.77 21 11V6" stroke="#22c55e" stroke-width="1.4"/><path d="M3 11v5c0 1.77 4.03 3.2 9 3.2S21 17.77 21 16v-5" stroke="#22c55e" stroke-width="1.4"/></svg>`,
cicd: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><rect x="2" y="7" width="6" height="6" rx="1.5" stroke="#38bdf8" stroke-width="1.4"/><rect x="16" y="7" width="6" height="6" rx="1.5" stroke="#38bdf8" stroke-width="1.4"/><path d="M8 10h8" stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round"/><circle cx="12" cy="10" r="1.5" fill="#38bdf8"/></svg>`,
hca:`<svg viewBox="0 0 24 24" width="13" height="13" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#e44d26"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="#264de4"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="#10b981"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="#cc6699"/></svg>`,
sdlc: `<svg viewBox="0 0 24 24" fill="none" width="14" height="14" style="display:inline-block;vertical-align:middle;margin-right:5px"><circle cx="12" cy="12" r="9.5" stroke="#f59e0b" stroke-width="1.4"/><path d="M12 7v5l3.5 3.5" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#f59e0b"/></svg>`
};
const LABELS={
react: LABEL_ICONS.react + 'React', graphql: LABEL_ICONS.graphql + 'GraphQL', angular: LABEL_ICONS.angular + 'Angular', vue: LABEL_ICONS.vue + 'Vue.js', browser: LABEL_ICONS.browser + 'Browser', engine: LABEL_ICONS.engine + 'JS Engine', es6: LABEL_ICONS.es6 + 'ES6+', 'react-adv': LABEL_ICONS['react-adv'] + 'React+',
react19: LABEL_ICONS.react19 + 'React 19', build: LABEL_ICONS.build + 'Build Tools', nextjs: LABEL_ICONS.nextjs + 'Next.js', patterns: LABEL_ICONS.patterns + 'Patterns', vitals: LABEL_ICONS.vitals + 'Web Vitals', security: LABEL_ICONS.security + 'Security', testing: LABEL_ICONS.testing + 'Testing', prepqa: LABEL_ICONS.prepqa + 'Prep Q&A', backend: LABEL_ICONS.backend + 'Backend', cicd: LABEL_ICONS.cicd + 'CI/CD',
hca: LABEL_ICONS.hca + 'HTML/CSS/A11y',
sdlc: LABEL_ICONS.sdlc + 'SDLC',
};
let currentTab='react';

function hcaCssTab(tab, btn) {
['boxmodel','flexbox','grid'].forEach(t => {
const p = document.getElementById('hca-' + t);
if (p) { p.classList.remove('active'); }
});
document.querySelectorAll('#hca-css .tab-btn').forEach(b => b.classList.remove('active'));
const panel = document.getElementById('hca-' + tab);
if (panel) panel.classList.add('active');
if (btn) btn.classList.add('active');
if (tab === 'boxmodel' && !BOXMODEL.ctx) initBoxModel();
if (tab === 'flexbox' && !FLEXBOX.ctx) initFlexbox();
if (tab === 'grid' && !GRID_CVS.ctx) initGrid();
}
const canvasInits={
react:()=>{initReact();},
graphql:()=>{initGraphql();},
angular:()=>{initAngular();},
vue:()=>{initVue();},
browser:()=>{initBrowser();},
engine:()=>{initEngine();},
es6:()=>{initEventLoop();initAsync();},
react19:()=>{initReact19Anim();},
'react-adv':()=>{initFiber();initHoc();initContext();initPortal();initFragment();},
build:()=>{initWebpack();initWebpackAdv();initVite();initBuildCmp();initMonorepo();},
nextjs:()=>{initCsr();initSsr();initNextflow();},
patterns:()=>{initPatModule();initPatSingleton();initPatFactory();initPatObserver();initPatStrategy();},
vitals:()=>{initVitals();initVitalsTimeline();},
security:()=>{initSecurity();initScanning();},
testing:()=>{initTesting();initTestPattern();},
sdlc:()=>{ initSdlcAnim(); initArchitectAnim(); },
cicd:()=>{
const activeCicd=document.querySelector('#panel-cicd .cd-section.active'); const cdId=activeCicd?activeCicd.id:'cd-docker'; const cdMap={'cd-docker':()=>{initDockerAnim();},
hca:()=>{ initBoxModel(); initFlexbox(); initGrid(); initPreprocessors(); },'cd-k8s':()=>{initK8sAnim();},'cd-kafka':()=>{initKafkaAnim();},'cd-vercel':()=>{initVercelAnim();}};
if(cdMap[cdId])cdMap[cdId]();
initCicdPipeline();
},
backend:()=>{
const activeSec=document.querySelector('#panel-backend .be-section.active'); const secId=activeSec?activeSec.id:'be-node';
const secMap={
'be-node':()=>{initNodeEventLoop();initNodeStreams();},
'be-express':()=>{initExpressMw();initExpressArch();},
'be-mongo':()=>{initMongoArch();}, 'be-postgres':()=>{initPgArch();initPgNode();}
};
if(secMap[secId]) secMap[secId]();
initBeStack();
},
};

function switchMain(tab){
document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active')); document.querySelectorAll('.header-nav button').forEach(b=>b.classList.remove('active')); const panelEl=document.getElementById('panel-'+tab); if(panelEl) panelEl.classList.add('active'); const navBtn=document.getElementById('main-'+tab); if(navBtn) navBtn.classList.add('active');
currentTab=tab;
renderSidebar(tab);
window.scrollTo({top:0,behavior:'instant'});
if(tab==='prepqa'){ renderQA('all'); }
setTimeout(()=>{
if(canvasInits[tab]) canvasInits[tab]();
}, 100);
}

function renderSidebar(tab){
const items=SIDEBAR_DATA[tab]||[];
const others=Object.entries(SIDEBAR_DATA).filter(([k])=>k!==tab);
document.getElementById('sidebar').innerHTML=`
<div class="sidebar-section">
<div class="sidebar-label">${LABELS[tab]}</div>
${items.map((item,i)=>{
const icon=SIDEBAR_ICONS[item.id]?`<span class="sb-icon">${SIDEBAR_ICONS[item.id]}</span>`:'';
return `<button class="sidebar-item${i===0?' active':''}" onclick="scrollToSection('${item.id}',this)">${icon}${item.label}</button>`; }).join('')}
</div>
<div class="sidebar-section" style="margin-top:1rem;">
<div class="sidebar-label">All Sections</div>
${others.map(([k])=>`<button class="sidebar-item" onclick="switchMain('${k}')"><span class="sb-icon" style="flex-shrink:0">${LABEL_ICONS[k]||''}</span>${TAB_NAMES[k]||k}</button>`).join('')}
</div>
`;
}

function scrollToSection(id,btn){
const qaIds=['qa-arch','qa-perf','qa-design','qa-infra','qa-collab','qa-security'];
if(qaIds.includes(id) && !document.getElementById('qa-card-1')){renderQA('all');}
// Handle new filter-based QA sections from search
if(id.startsWith('qa-filter-')){
  const cat=id.replace('qa-filter-','');
  switchMain('prepqa');
  setTimeout(()=>{
    renderQA(cat);
    document.querySelectorAll('#qa-filter-bar button').forEach(b=>{
      b.classList.toggle('active', b.getAttribute('onclick') && b.getAttribute('onclick').includes("'"+cat+"'"));
    });
  },50);
  document.querySelectorAll('.sidebar-item').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  return;
}
document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}); document.querySelectorAll('.sidebar-item').forEach(b=>b.classList.remove('active')); if(btn)btn.classList.add('active');
}
renderSidebar('react');
requestAnimationFrame(()=>{ requestAnimationFrame(()=>{ initReact(); }); });
window.addEventListener('resize',()=>{
setTimeout(()=>{
if(canvasInits[currentTab]) canvasInits[currentTab]();
}, 50);
});

function buildCircuitSVG(dark) {
const nc = dark ? 'rgba(139,122,232,0.10)' : 'rgba(108,93,211,0.08)';
const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='480'>
<defs>
<pattern id='dp' width='24' height='24' patternUnits='userSpaceOnUse'>
<circle cx='2' cy='2' r='1.4' fill='${nc}'/>
</pattern>
</defs>
<rect width='480' height='480' fill='url(#dp)'/>
</svg>`;
return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
}

function applyCircuitSVG(dark) {
}

function toggleTheme() {
const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
const newDark = !isDark;
document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light'); const label = document.getElementById('theme-label'); const thumb = document.getElementById('tt-thumb');
if (label) label.textContent = newDark ? 'Dark' : 'Light';
if (thumb) thumb.textContent = newDark ? '🌙' : '☀️';
applyCircuitSVG(newDark);
localStorage.setItem('fe-hub-theme', newDark ? 'dark' : 'light');
}
let FB={ctx:null,t:0,raf:null,phase:'idle',progress:0,interrupted:false}; function initFiber(){const ctx=setupCvs('cvs-fiber');if(!ctx)return;FB.ctx=ctx;FB.t=0;FB.phase='idle';FB.progress=0;cancelAnimationFrame(FB.raf);animFiber();}

function fiberAnim(p){FB.phase=p;FB.progress=0;FB.interrupted=p==='interrupt';}

function animFiber(){
const ctx=FB.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a'); FB.t++;if(FB.phase!=='idle')FB.progress=Math.min(1,FB.progress+0.008);
const nodes=[
{x:W*.5,y:45,l:'App',c:'#8b7ae8'}, {x:W*.28,y:115,l:'Header',c:'#60a5fa'},{x:W*.72,y:115,l:'Main',c:'#60a5fa'}, {x:W*.15,y:188,l:'Nav',c:'#34d399'},{x:W*.42,y:188,l:'List',c:'#34d399'},{x:W*.72,y:188,l:'Footer',c:'#34d399'}, {x:W*.42,y:258,l:'Item',c:'#f59e0b'},
];
const edges=[[0,1],[0,2],[1,3],[1,4],[2,5],[4,6]];
edges.forEach(([a,b])=>{
const na=nodes[a],nb=nodes[b];
ctx.beginPath();ctx.moveTo(na.x,na.y+16);ctx.lineTo(nb.x,nb.y-16);
ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1.2;ctx.stroke();
});
const prog=FB.progress;
nodes.forEach((n,i)=>{
const visited=prog>(i/nodes.length);
const active=!FB.interrupted&&Math.abs(prog-(i/nodes.length))<0.12;
if(active)glow(ctx,n.x,n.y,32,n.c);
rr(ctx,n.x-38,n.y-16,76,32,8,active?n.c+'22':'#1e1c38',visited?n.c:'#3d3870',active?2:1); txt(ctx,n.l,n.x,n.y,11,active?n.c:'#c4c2e0','center',600);
});
if(FB.interrupted&&prog>0.4&&prog<0.9){
rr(ctx,W/2-80,H/2-18,160,36,8,'#ef444422','#ef4444',1.5); txt(ctx,'⏸ Interrupted -- yielding to browser',W/2,H/2,11,'#ef4444','center',500);
}
const phaseLabel={render:'🔍 Render Phase -- traversing fiber tree',commit:'[db] Commit Phase -- applying DOM mutations',interrupt:'⏸ Interrupted -- scheduler yielded control',idle:'Click a button to start'}; txt(ctx,phaseLabel[FB.phase]||'',W/2,H-10,10,'rgba(255,255,255,0.3)','center');
FB.raf=requestAnimationFrame(animFiber);
}
let HC={ctx:null,t:0,raf:null,type:'',pts:[]}; function initHoc(){const ctx=setupCvs('cvs-hoc');if(!ctx)return;HC.ctx=ctx;HC.t=0;cancelAnimationFrame(HC.raf);animHoc();}

function hocAnim(t){HC.type=t;HC.pts=[];}

function animHoc(){
const ctx=HC.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
HC.t++;
const layers=[
{x:W*.12,label:'WrappedComponent',sub:'Dashboard',c:'#8b7ae8',w:120}, {x:W*.38,label:HC.type==='auth'?'withAuth':HC.type==='theme'?'withTheme':'withLogger',sub:'HOC Wrapper',c:HC.type==='auth'?'#ef4444':HC.type==='theme'?'#f472b6':'#f59e0b',w:110}, {x:W*.65,label:'Enhanced',sub:'Component',c:'#34d399',w:100}, {x:W*.88,label:'App',sub:'Usage',c:'#60a5fa',w:80},
];
layers.forEach((l,i)=>{
if(i<layers.length-1){
ctx.beginPath();ctx.moveTo(l.x+l.w/2,H/2);ctx.lineTo(layers[i+1].x-layers[i+1].w/2,H/2);
ctx.strokeStyle=l.c+'55';ctx.lineWidth=2;ctx.setLineDash([4,4]);ctx.stroke();ctx.setLineDash([]);
txt(ctx,'->',l.x+l.w/2+18,H/2-10,12,l.c+'88','center');
}
glow(ctx,l.x,H/2,28,l.c+'44'); rr(ctx,l.x-l.w/2,H/2-26,l.w,52,10,'#161428',l.c+'88',1.5); txt(ctx,l.label,l.x,H/2-8,10.5,l.c,'center',600); txt(ctx,l.sub,l.x,H/2+8,9,'rgba(255,255,255,0.35)','center');
});
const desc={auth:'🔒 withAuth -- checks auth before rendering',theme:'🎨 withTheme -- injects theme as prop',log:'📝 withLogger -- logs render lifecycle','':`HOC wraps a component -> returns enhanced component`};
txt(ctx,desc[HC.type]||desc[''],W/2,H-10,10,'rgba(255,255,255,0.3)','center');
HC.raf=requestAnimationFrame(animHoc);
}
let CT={ctx:null,t:0,raf:null,action:'',pts:[]};

function initContext(){const ctx=setupCvs('cvs-context');if(!ctx)return;CT.ctx=ctx;CT.t=0;cancelAnimationFrame(CT.raf);animContext();}

function contextAnim(a){CT.action=a;CT.pts=[];}

function animContext(){
const ctx=CT.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
CT.t++;
const provider={x:W*.5,y:48,label:'Context.Provider',sub:'value="dark"',c:'#8b7ae8'};
const consumers=[
{x:W*.2,y:148,label:'ThemeButton',sub:'useContext',c:'#60a5fa'}, {x:W*.5,y:148,label:'NavBar',sub:'useContext',c:'#60a5fa'}, {x:W*.8,y:148,label:'Modal',sub:'useContext',c:'#60a5fa'},
];
const deepConsumer={x:W*.2,y:240,label:'DeepChild',sub:'useContext',c:'#34d399'};
[...consumers,deepConsumer].forEach(c=>{
ctx.beginPath();ctx.moveTo(provider.x,provider.y+22);ctx.lineTo(c.x,c.y-22);
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.stroke();
});
ctx.beginPath();ctx.moveTo(consumers[0].x,consumers[0].y+22);ctx.lineTo(deepConsumer.x,deepConsumer.y-22);
ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.stroke();
if(CT.action){
[provider,...consumers,deepConsumer].forEach((n,i)=>{
const pulse=Math.sin(CT.t*0.08-i*0.5)>.5;
if(pulse)glow(ctx,n.x,n.y,30,n.c);
});
}
[[provider,56],[...consumers.map(c=>[c,52])],[deepConsumer,52]].flat().forEach(item=>{
if(!Array.isArray(item))return;
const[n,w]=item;
rr(ctx,n.x-w,n.y-20,w*2,40,10,'#1e1c38',n.c+'88',1.5); txt(ctx,n.label,n.x,n.y-4,10.5,n.c,'center',600); txt(ctx,n.sub,n.x,n.y+10,9,'rgba(255,255,255,0.35)','center');
});
const desc={provide:'📡 Provider injects value into the entire subtree',consume:'🎣 Any descendant calls useContext() to read value',update:'[sync] Value change triggers re-render of all consumers','':`Context flows from Provider down to any Consumer`};
txt(ctx,desc[CT.action]||desc[''],W/2,H-10,10,'rgba(255,255,255,0.3)','center');
CT.raf=requestAnimationFrame(animContext);
}
let PT={ctx:null,t:0,raf:null,action:'',modalOpen:false,pts:[]};

function initPortal(){const ctx=setupCvs('cvs-portal');if(!ctx)return;PT.ctx=ctx;PT.t=0;cancelAnimationFrame(PT.raf);animPortal();}

function portalAnim(a){PT.action=a;if(a==='open')PT.modalOpen=!PT.modalOpen;PT.pts=[];}

function animPortal(){
const ctx=PT.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
PT.t++;
const treeX=W*.25;
rr(ctx,20,20,treeX*2-20,H-40,8,'#13111a','#2d2850',1); txt(ctx,'React Tree',treeX,36,9.5,'#8b7ae8','center',600); rr(ctx,treeX-50,58,100,36,8,'#1e1c38','#8b7ae855',1.5);txt(ctx,'#app',treeX,76,11,'#8b7ae8','center',600); rr(ctx,treeX-42,110,84,32,8,'#1e1c38','#60a5fa55',1.5);txt(ctx,'Page',treeX,126,11,'#60a5fa','center',600); rr(ctx,treeX-42,158,84,32,8,'#1e1c38','#f59e0b55',1.5);txt(ctx,'Button',treeX,174,11,'#f59e0b','center',600);
ctx.beginPath();ctx.moveTo(treeX,94);ctx.lineTo(treeX,110);ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;ctx.stroke();
ctx.beginPath();ctx.moveTo(treeX,142);ctx.lineTo(treeX,158);ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;ctx.stroke();
const domX=W*.75;
rr(ctx,W/2+10,20,W/2-30,H-40,8,'#0e1a0e','#34d39933',1); txt(ctx,'DOM Tree',domX,36,9.5,'#34d399','center',600); rr(ctx,domX-40,58,80,32,8,'#0e1a0e','#34d39955',1.5);txt(ctx,'<body>',domX,74,11,'#34d399','center',600); rr(ctx,domX-40,106,80,32,8,'#0e1a0e','#34d39955',1.5);txt(ctx,'#app',domX,122,11,'#34d399','center',600); rr(ctx,domX-55,154,110,32,8,'#0e1a0e','#34d39944',1);txt(ctx,'#portal-root',domX,170,11,'rgba(52,211,153,0.5)','center',600);
ctx.beginPath();ctx.moveTo(domX,90);ctx.lineTo(domX,106);ctx.strokeStyle='rgba(52,211,153,0.2)';ctx.lineWidth=1;ctx.stroke();
ctx.beginPath();ctx.moveTo(domX,138);ctx.lineTo(domX,154);ctx.strokeStyle='rgba(52,211,153,0.2)';ctx.lineWidth=1;ctx.stroke();
if(PT.modalOpen){
const pulse=Math.sin(PT.t*0.08)*0.5+0.5;
ctx.beginPath();ctx.moveTo(treeX+42,174);ctx.bezierCurveTo(W/2,H*.6,W/2,H*.4,domX-55,170);
ctx.strokeStyle=`rgba(249,115,22,${0.4+pulse*0.4})`;ctx.lineWidth=2;ctx.setLineDash([5,4]);ctx.stroke();ctx.setLineDash([]);
rr(ctx,domX-55,196,110,36,8,'#2a1505',`rgba(249,115,22,${0.3+pulse*0.4})`,1.5);
txt(ctx,'Modal renders here',domX,214,10,'#f97316','center',500); txt(ctx,'(outside React tree)',domX,228,9,'rgba(249,115,22,0.5)','center');
}
txt(ctx,PT.modalOpen?'🚪 Modal rendered in #portal-root -- outside #app DOM':'Click "Open Modal" to see portal in action',W/2,H-10,10,'rgba(255,255,255,0.3)','center');
PT.raf=requestAnimationFrame(animPortal);
}
let FR={ctx:null,t:0,raf:null,mode:'with'};

function initFragment(){const ctx=setupCvs('cvs-fragment');if(!ctx)return;FR.ctx=ctx;FR.t=0;cancelAnimationFrame(FR.raf);animFragment();}

function fragmentAnim(m){FR.mode=m;}

function animFragment(){
const ctx=FR.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
FR.t++;
const mid=H/2;
const lx=W*.28;
txt(ctx,'DOM Output',lx,24,10,'rgba(255,255,255,0.4)','center',600); if(FR.mode==='with'){ rr(ctx,lx-60,40,120,32,7,'#0e1a0e','#34d39966',1.5);txt(ctx,'<tr>',lx,56,11,'#34d399','center',600); rr(ctx,lx-52,86,50,28,6,'#0e1a0e','#60a5fa55',1.5);txt(ctx,'<td>',lx-27,100,10,'#60a5fa','center'); rr(ctx,lx+2,86,50,28,6,'#0e1a0e','#60a5fa55',1.5);txt(ctx,'<td>',lx+27,100,10,'#60a5fa','center');
ctx.beginPath();ctx.moveTo(lx-27,72);ctx.lineTo(lx-27,86);ctx.strokeStyle='rgba(52,211,153,0.3)';ctx.lineWidth=1;ctx.stroke();
ctx.beginPath();ctx.moveTo(lx+27,72);ctx.lineTo(lx+27,86);ctx.strokeStyle='rgba(52,211,153,0.3)';ctx.lineWidth=1;ctx.stroke(); rr(ctx,lx-64,136,128,24,6,'#0e2010','#34d39933',1);txt(ctx,'[ok] Valid -- no extra nodes',lx,148,9.5,'#34d399','center');
} else {
rr(ctx,lx-60,40,120,32,7,'#0e1a0e','#34d39966',1.5);txt(ctx,'<tr>',lx,56,11,'#34d399','center',600); rr(ctx,lx-55,86,110,28,6,'#2a0a0a','#ef444455',1.5);txt(ctx,'<div> <- INVALID',lx,100,10,'#ef4444','center'); rr(ctx,lx-48,128,44,28,6,'#1e1c38','#60a5fa44',1);txt(ctx,'<td>',lx-26,142,10,'#60a5fa','center'); rr(ctx,lx+4,128,44,28,6,'#1e1c38','#60a5fa44',1);txt(ctx,'<td>',lx+26,142,10,'#60a5fa','center'); rr(ctx,lx-70,176,140,24,6,'#2a0a0a','#ef444433',1);txt(ctx,'❌ Breaks table layout!',lx,188,9.5,'#ef4444','center');
}
const rx=W*.72;
txt(ctx,'JSX Code',rx,24,10,'rgba(255,255,255,0.4)','center',600); rr(ctx,rx-80,40,160,H-60,8,'#13111a','#2d2850',1); if(FR.mode==='with'){ txt(ctx,'return (',rx,64,9.5,'#e2e2f0','center',400); txt(ctx,'<>',rx,84,9.5,'#8b7ae8','center',600); txt(ctx,'<td>Name</td>',rx,104,9.5,'#34d399','center',400); txt(ctx,'<td>Age</td>',rx,120,9.5,'#34d399','center',400); txt(ctx,'</>',rx,140,9.5,'#8b7ae8','center',600); txt(ctx,')',rx,160,9.5,'#e2e2f0','center',400);
} else {
txt(ctx,'return (',rx,64,9.5,'#e2e2f0','center',400); txt(ctx,'<div>',rx,84,9.5,'#ef4444','center',600); txt(ctx,'<td>Name</td>',rx,104,9.5,'#60a5fa','center',400); txt(ctx,'<td>Age</td>',rx,120,9.5,'#60a5fa','center',400); txt(ctx,'</div>',rx,140,9.5,'#ef4444','center',600); txt(ctx,')',rx,160,9.5,'#e2e2f0','center',400);
}
FR.raf=requestAnimationFrame(animFragment);
}
let WP={ctx:null,t:0,raf:null,mode:'',pts:[]};

function initWebpack(){const ctx=setupCvs('cvs-webpack');if(!ctx)return;WP.ctx=ctx;WP.t=0;cancelAnimationFrame(WP.raf);animWebpack();}

function webpackAnim(m){WP.mode=m;WP.pts=[];}

function animWebpack(){
const ctx=WP.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
WP.t++;
const stages=[
{x:W*.1,label:'Entry',sub:'index.js',c:'#60a5fa',icon:'📄'}, {x:W*.28,label:'Loaders',sub:'babel/css/ts',c:'#f59e0b',icon:'[cfg]'}, {x:W*.46,label:'Dep Graph',sub:'static analysis',c:'#8b7ae8',icon:'🕸'}, {x:W*.64,label:'Plugins',sub:'HTML/Mini/Env',c:'#f472b6',icon:'🔌'}, {x:W*.82,label:'Output',sub:'bundle.js',c:'#34d399',icon:'[pkg]'},
];
const stageY=H*.42;
stages.forEach((s,i)=>{
if(i<stages.length-1){
const nx=stages[i+1].x;
ctx.beginPath();ctx.moveTo(s.x+46,stageY);ctx.lineTo(nx-46,stageY);
ctx.strokeStyle=s.c+'44';ctx.lineWidth=2;ctx.stroke();
const arrowX=(s.x+46+nx-46)/2;
txt(ctx,'›',arrowX,stageY-1,14,s.c+'88','center');
}
const active=WP.mode&&Math.sin(WP.t*0.05-i*.8)>0.3;
if(active)glow(ctx,s.x,stageY,36,s.c);
rr(ctx,s.x-46,stageY-28,92,56,10,active?s.c+'18':'#161428',active?s.c+'cc':'#3d3566',active?2:1);
txt(ctx,s.icon,s.x,stageY-10,active?20:16,'#fff','center');
txt(ctx,s.label,s.x,stageY+12,10.5,active?s.c:'#c4c2e0','center',600); txt(ctx,s.sub,s.x,stageY+25,8.5,'rgba(255,255,255,0.3)','center');
});
if(WP.mode==='hmr'){rr(ctx,W/2-90,H-40,180,26,6,'#1a0e1a','#f472b655',1);txt(ctx,'🔥 HMR: only changed module re-executed',W/2,H-27,10,'#f472b6','center');} else if(WP.mode==='split'){rr(ctx,W/2-100,H-40,200,26,6,'#0e1a0e','#34d39955',1);txt(ctx,'✂ Code Split: dynamic import() creates separate chunks',W/2,H-27,10,'#34d399','center');} else{txt(ctx,'Webpack statically bundles ALL modules at build time',W/2,H-14,10,'rgba(255,255,255,0.25)','center');}
WP.raf=requestAnimationFrame(animWebpack);
}
let VT={ctx:null,t:0,raf:null,mode:''}; function initVite(){const ctx=setupCvs('cvs-vite');if(!ctx)return;VT.ctx=ctx;VT.t=0;cancelAnimationFrame(VT.raf);animVite();}

function viteAnim(m){VT.mode=m;}

function animVite(){
const ctx=VT.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
VT.t++;
if(VT.mode==='dev'||VT.mode===''){
const bx=W*.12,sx=W*.5,fx=W*.88;
txt(ctx,'[deploy] Dev Server -- Native ESM, No Bundling',W/2,20,10.5,'#fbbf24','center',600); rr(ctx,bx-52,46,104,52,10,'#0e1a30','#60a5fa88',1.5);txt(ctx,'[web]',bx,64,18,'#fff','center');txt(ctx,'Browser',bx,84,10,'#60a5fa','center',600); rr(ctx,sx-52,46,104,52,10,'#1a1400','#fbbf2488',1.5);txt(ctx,'⚡',sx,64,18,'#fff','center');txt(ctx,'Vite Server',sx,84,10,'#fbbf24','center',600); rr(ctx,fx-52,46,104,52,10,'#0e1a0e','#34d39988',1.5);txt(ctx,'📄',fx,64,18,'#fff','center');txt(ctx,'ESM files',fx,84,10,'#34d399','center',600);
const p=(VT.t%80)/80;
const arrow=(fromX,toX,y,col)=>{const ix=lerp(fromX,toX,easeOut(p));dot(ctx,ix,y,col,4);ctx.beginPath();ctx.moveTo(fromX+52,y);ctx.lineTo(toX-52,y);ctx.strokeStyle=col+'44';ctx.lineWidth=1.5;ctx.stroke();}; arrow(bx,sx,H*.52,'#60a5fa');txt(ctx,'HTTP import request',W*.31,H*.46,9,'rgba(96,165,250,0.5)','center'); arrow(sx,fx,H*.66,'#fbbf24');txt(ctx,'fetch source file',W*.69,H*.60,9,'rgba(251,191,36,0.5)','center'); arrow(fx,sx,H*.80,'#34d399');txt(ctx,'transform & serve ESM',W*.69,H*.88,9,'rgba(52,211,153,0.5)','center');
} else {
const stages=[{x:W*.15,l:'Source',s:'ESM files',c:'#60a5fa'},{x:W*.38,l:'Rollup',s:'tree-shake',c:'#fbbf24'},{x:W*.61,l:'Terser',s:'minify',c:'#f472b6'},{x:W*.84,l:'dist/',s:'optimized',c:'#34d399'}];
const sy=H*.48;
txt(ctx,'[pkg] Production Build -- Rollup + Tree-shaking',W/2,20,10.5,'#34d399','center',600);
stages.forEach((s,i)=>{
if(i<stages.length-1){const nx=stages[i+1].x;ctx.beginPath();ctx.moveTo(s.x+44,sy);ctx.lineTo(nx-44,sy);ctx.strokeStyle=s.c+'55';ctx.lineWidth=2;ctx.stroke();}
const a=Math.sin(VT.t*0.06-i*.9)>0.2;
if(a)glow(ctx,s.x,sy,32,s.c);
rr(ctx,s.x-44,sy-24,88,48,9,a?s.c+'18':'#161428',a?s.c:'#3d3566',a?2:1); txt(ctx,s.l,s.x,sy-4,11,a?s.c:'#c4c2e0','center',600); txt(ctx,s.s,s.x,sy+11,8.5,'rgba(255,255,255,0.3)','center');
});
}
VT.raf=requestAnimationFrame(animVite);
}
let BC={ctx:null,t:0,raf:null,mode:'startup'};

function initBuildCmp(){const ctx=setupCvs('cvs-buildcmp');if(!ctx)return;BC.ctx=ctx;BC.t=0;cancelAnimationFrame(BC.raf);animBuildCmp();}

function buildCmpAnim(m){BC.mode=m;}

function animBuildCmp(){
const ctx=BC.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
BC.t++;
const data={startup:{webpack:{v:85,label:'~3000ms'},vite:{v:12,label:'~180ms'},title:'Cold Start Time (lower=better)'},hmr:{webpack:{v:60,label:'~500ms'},vite:{v:5,label:'~20ms'},title:'HMR Update Time (lower=better)'},prod:{webpack:{v:70,label:'Advanced'},vite:{v:78,label:'Good',sub:'Rollup'},title:'Production Bundle Quality'}};
const d=data[BC.mode]||data.startup;
txt(ctx,d.title,W/2,22,12,'rgba(255,255,255,0.6)','center',600);
const bary=H*.52,barH=32,maxW=W*.35;
const ww=Math.min(1,Math.min(BC.t/60,1))*(d.webpack.v/100)*maxW;
rr(ctx,W*.08,bary-barH*.5,maxW,barH,6,'#161428','#2d2a4a',1); rr(ctx,W*.08,bary-barH*.5,ww,barH,6,'#1e3a50','#60a5fa',1.5); txt(ctx,'Webpack',W*.08+maxW/2,bary-barH*.5-12,10,'#60a5fa','center',600);
txt(ctx,d.webpack.label,W*.08+ww+8,bary,10,'#60a5fa','left',600);
const vy=bary+barH+16,vw=Math.min(1,Math.min(BC.t/60,1))*(d.vite.v/100)*maxW;
rr(ctx,W*.08,vy-barH*.5,maxW,barH,6,'#161428','#2d2a4a',1); rr(ctx,W*.08,vy-barH*.5,vw,barH,6,'#1a1400','#fbbf24',1.5); txt(ctx,'Vite',W*.08+maxW/2,vy-barH*.5-12,10,'#fbbf24','center',600); txt(ctx,d.vite.label,W*.08+vw+8,vy,10,'#fbbf24','left',600);
ctx.beginPath();ctx.moveTo(W*.57,40);ctx.lineTo(W*.57,H-20);ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.stroke();
const feats=[['Dev startup','~3s','~180ms'],['HMR','~500ms','~20ms'],['Config','Complex','Minimal'],['Ecosystem','Largest','Growing'],['Prod bundler','Webpack','Rollup']]; txt(ctx,'Webpack',W*.7,42,10,'#60a5fa','center',600); txt(ctx,'Vite',W*.88,42,10,'#fbbf24','center',600);
feats.forEach((f,i)=>{
const fy=62+i*28;
rr(ctx,W*.58,fy-10,W*.41,22,4,i%2?'#0d0d12':'#111118'); txt(ctx,f[0],W*.67,fy+1,9.5,'rgba(255,255,255,0.5)','right'); txt(ctx,f[1],W*.76,fy+1,9.5,'#60a5fa66','center'); txt(ctx,f[2],W*.92,fy+1,9.5,'#fbbf24','center');
});
BC.raf=requestAnimationFrame(animBuildCmp);
}
let MR={ctx:null,t:0,raf:null,mode:'',pts:[]};

function initMonorepo(){const ctx=setupCvs('cvs-monorepo');if(!ctx)return;MR.ctx=ctx;MR.t=0;cancelAnimationFrame(MR.raf);animMonorepo();}

function monorepoAnim(m){MR.mode=m;MR.pts=[];}

function animMonorepo(){
const ctx=MR.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
MR.t++;
const pkgs=[
{x:W*.18,y:58,l:'apps/web',s:'Next.js',c:'#8b7ae8'}, {x:W*.50,y:58,l:'apps/mobile',s:'React Native',c:'#60a5fa'}, {x:W*.82,y:58,l:'apps/docs',s:'Docusaurus',c:'#34d399'}, {x:W*.18,y:168,l:'packages/ui',s:'Components',c:'#f59e0b'}, {x:W*.50,y:168,l:'packages/utils',s:'Shared logic',c:'#f59e0b'}, {x:W*.82,y:168,l:'packages/config',s:'ESLint/TS',c:'#f59e0b'}, {x:W*.50,y:258,l:'Build Cache',s:'Turborepo',c:'#f97316'},
];
const edges=[[0,3],[0,4],[1,3],[1,4],[1,5],[2,3],[2,5],[3,6],[4,6],[5,6]];
edges.forEach(([a,b])=>{
const na=pkgs[a],nb=pkgs[b];
const active=MR.mode&&Math.sin(MR.t*0.06-(a+b)*.3)>0.4;
ctx.beginPath();ctx.moveTo(na.x,na.y+22);ctx.lineTo(nb.x,nb.y-22);
ctx.strokeStyle=active?na.c+'66':'rgba(255,255,255,0.06)';ctx.lineWidth=active?2:1;ctx.stroke();
if(active){const mx=(na.x+nb.x)/2,my=(na.y+22+nb.y-22)/2;dot(ctx,mx,my,na.c,3);}
});
pkgs.forEach(p=>{
const pulse=MR.mode&&Math.sin(MR.t*0.08)>0.3;
if(pulse&&p.c==='#f97316')glow(ctx,p.x,p.y,40,p.c); rr(ctx,p.x-50,p.y-20,100,40,8,p.c==='#f97316'?'#1a0800':'#161428',p.c+'77',1.5); txt(ctx,p.l,p.x,p.y-4,10,p.c,'center',600); txt(ctx,p.s,p.x,p.y+10,8.5,'rgba(255,255,255,0.35)','center');
});
const desc={turbo:'[deploy] Turborepo: changed packages only, remote cache',nx:'🔷 NX: affected graph -- run only impacted tasks',build:'[build] Pipeline: config builds ui -> utils -> apps in order','':`Monorepo -- all packages in one repo, shared tooling`};
txt(ctx,desc[MR.mode]||desc[''],W/2,H-10,10,'rgba(255,255,255,0.3)','center');
MR.raf=requestAnimationFrame(animMonorepo);
}

function drawRequestArrow(ctx,pts,col){
if(pts.length<2)return;
ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);
for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);
ctx.strokeStyle=col;ctx.lineWidth=2;ctx.setLineDash([4,3]);ctx.stroke();ctx.setLineDash([]);
}
let CSR={ctx:null,t:0,raf:null,mode:'',prog:0}; function initCsr(){const ctx=setupCvs('cvs-csr');if(!ctx)return;CSR.ctx=ctx;CSR.t=0;CSR.prog=0;cancelAnimationFrame(CSR.raf);animCsr();}

function csrAnim(m){CSR.mode=m;CSR.prog=0;}

function animCsr(){
const ctx=CSR.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
CSR.t++;if(CSR.mode)CSR.prog=Math.min(1,CSR.prog+0.01);
const steps=[
{x:W*.1,label:'Browser',sub:'User opens URL',c:'#60a5fa',icon:'[web]'}, {x:W*.3,label:'CDN',sub:'HTML shell',c:'#8b7ae8',icon:'⚡'}, {x:W*.5,label:'JS Bundle',sub:'Download & parse',c:'#f59e0b',icon:'[pkg]'}, {x:W*.7,label:'React Init',sub:'Hydrate DOM',c:'#8b7ae8',icon:'⚛'}, {x:W*.9,label:'Rendered',sub:'Interactive',c:'#34d399',icon:'[ok]'},
];
const sy=H*.46;
steps.forEach((s,i)=>{
if(i<steps.length-1){
const done=CSR.prog>(i+1)/steps.length;
const nx=steps[i+1].x;
ctx.beginPath();ctx.moveTo(s.x+36,sy);ctx.lineTo(nx-36,sy);
ctx.strokeStyle=done?s.c+'88':'rgba(255,255,255,0.08)';ctx.lineWidth=2;ctx.stroke();
}
const done=CSR.prog>(i/steps.length);
const active=done&&CSR.prog<((i+1)/steps.length+0.1);
if(active)glow(ctx,s.x,sy,32,s.c);
rr(ctx,s.x-36,sy-28,72,56,9,done?s.c+'18':'#161428',done?s.c:'#3d3566',done?2:1); txt(ctx,s.icon,s.x,sy-9,done?18:14,'#fff','center');
txt(ctx,s.label,s.x,sy+13,9.5,done?s.c:'#6b6a80','center',600); txt(ctx,s.sub,s.x,sy+25,8,'rgba(255,255,255,0.28)','center');
});
rr(ctx,steps[2].x-50,sy-60,100,22,5,'#2a1505','#f59e0b55',1); txt(ctx,'⚠ Large JS bundle',steps[2].x,sy-49,9,'#f59e0b','center'); txt(ctx,CSR.mode?'CSR: Browser downloads full JS bundle before showing anything':'Click "CSR Flow" to animate the rendering sequence',W/2,H-10,10,'rgba(255,255,255,0.3)','center');
CSR.raf=requestAnimationFrame(animCsr);
}
let SSR={ctx:null,t:0,raf:null,mode:'',prog:0}; function initSsr(){const ctx=setupCvs('cvs-ssr');if(!ctx)return;SSR.ctx=ctx;SSR.t=0;SSR.prog=0;cancelAnimationFrame(SSR.raf);animSsr();}

function ssrAnim(m){SSR.mode=m;SSR.prog=0;}

function animSsr(){
const ctx=SSR.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
SSR.t++;if(SSR.mode)SSR.prog=Math.min(1,SSR.prog+0.008);
const steps=[
{x:W*.1,label:'Browser',sub:'Request',c:'#60a5fa',icon:'[web]'}, {x:W*.3,label:'Next.js Server',sub:'getServerSideProps',c:'#a1a1aa',icon:'[V]'}, {x:W*.5,label:'Data Source',sub:'DB / API fetch',c:'#f59e0b',icon:'🗄'}, {x:W*.7,label:'HTML Response',sub:'Full rendered HTML',c:'#34d399',icon:'📄'}, {x:W*.9,label:'Hydrate',sub:'React takes over',c:'#8b7ae8',icon:'💧'},
];
const sy=H*.42;
steps.forEach((s,i)=>{
if(i<steps.length-1){
const done=SSR.prog>(i+1)/steps.length;
ctx.beginPath();ctx.moveTo(s.x+38,sy);ctx.lineTo(steps[i+1].x-38,sy);
ctx.strokeStyle=done?s.c+'88':'rgba(255,255,255,0.08)';ctx.lineWidth=2;ctx.stroke();
}
const done=SSR.prog>(i/steps.length);
const active=done&&SSR.prog<((i+1)/steps.length+0.1);
if(active)glow(ctx,s.x,sy,34,s.c);
rr(ctx,s.x-38,sy-30,76,60,9,done?s.c+'18':'#161428',done?s.c:'#3d3566',done?2:1); txt(ctx,s.icon,s.x,sy-10,done?18:14,'#fff','center');
txt(ctx,s.label,s.x,sy+14,9,done?s.c:'#6b6a80','center',600); txt(ctx,s.sub,s.x,sy+26,8,'rgba(255,255,255,0.28)','center');
});
rr(ctx,20,sy+50,W-40,24,6,'#0e1a0e','#34d39933',1); txt(ctx,'[ok] Full HTML arrives -> Fast FCP . Better SEO . Works without JS',W/2,sy+62,10,'rgba(52,211,153,0.7)','center'); txt(ctx,SSR.mode==='hydrate'?'💧 Hydration: React attaches event listeners to server-rendered HTML':SSR.mode?'SSR: Server renders full HTML on every request -> faster first paint':'Click "SSR Flow" to animate',W/2,H-10,10,'rgba(255,255,255,0.3)','center');
SSR.raf=requestAnimationFrame(animSsr);
}
let NF={ctx:null,t:0,raf:null,mode:'',prog:0};

function initNextflow(){const ctx=setupCvs('cvs-nextflow');if(!ctx)return;NF.ctx=ctx;NF.t=0;NF.prog=0;cancelAnimationFrame(NF.raf);animNextflow();}

function nextflowAnim(m){NF.mode=m;NF.prog=0;}

function animNextflow(){
const ctx=NF.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
NF.t++;if(NF.mode)NF.prog=Math.min(1,NF.prog+0.009);
const nodes=[
{x:W*.1,y:60,l:'Browser',s:'HTTP Request',c:'#60a5fa',icon:'[web]'}, {x:W*.3,y:60,l:'Edge/CDN',s:'Route match',c:'#a78bfa',icon:'⚡'}, {x:W*.5,y:60,l:'Server',s:'RSC render',c:'#a1a1aa',icon:'[V]'}, {x:W*.7,y:60,l:'Data Layer',s:'DB/API/Cache',c:'#f59e0b',icon:'🗄'}, {x:W*.9,y:60,l:'Stream',s:'HTML chunks',c:'#34d399',icon:'🌊'}, {x:W*.5,y:180,l:'Client',s:'Hydrate+interact',c:'#8b7ae8',icon:'⚛'}, {x:W*.3,y:240,l:'Client Cache',s:'Router cache',c:'#60a5fa',icon:'[db]'}, {x:W*.7,y:240,l:'Full Route',s:'Prefetch',c:'#f472b6',icon:'🎯'},
];
const edges=[[0,1],[1,2],[2,3],[3,2],[2,4],[4,5],[5,6],[5,7]];
edges.forEach(([a,b])=>{
const na=nodes[a],nb=nodes[b];
const active=NF.mode&&Math.sin(NF.t*0.07-(a+b)*.4)>0.3;
ctx.beginPath();ctx.moveTo(na.x,na.y+22);ctx.lineTo(nb.x,nb.y-22);
ctx.strokeStyle=active?na.c+'66':'rgba(255,255,255,0.06)';ctx.lineWidth=active?2:1;ctx.stroke();
});
nodes.forEach((n,i)=>{
const active=NF.mode&&Math.sin(NF.t*0.07-i*.5)>0.3;
if(active)glow(ctx,n.x,n.y,30,n.c);
rr(ctx,n.x-46,n.y-20,92,40,9,active?n.c+'18':'#161428',active?n.c:'#3d3566',active?2:1); txt(ctx,n.icon+' '+n.l,n.x,n.y-4,10,active?n.c:'#c4c2e0','center',600); txt(ctx,n.s,n.x,n.y+11,8.5,'rgba(255,255,255,0.3)','center');
});
const desc={request:'📡 Request flows: Browser -> Edge -> Server -> Data -> Stream',stream:'🌊 Streaming: HTML sent in chunks as server components resolve',cache:'⚡ Cache Hit: Router cache serves instantly without server round-trip','':`Next.js App Router -- React Server Components by default`};
txt(ctx,desc[NF.mode]||desc[''],W/2,H-10,10,'rgba(255,255,255,0.3)','center');
NF.raf=requestAnimationFrame(animNextflow);
}
let PAT={};
['module','singleton','factory','observer','strategy'].forEach(k=>{PAT[k]={ctx:null,t:0,raf:null,action:'',pts:[]};});

function initPat(key,id){const ctx=setupCvs(id);if(!ctx)return;PAT[key].ctx=ctx;PAT[key].t=0;cancelAnimationFrame(PAT[key].raf);return ctx;}

function initPatModule(){initPat('module','cvs-pat-module');animPat('module');} function initPatSingleton(){initPat('singleton','cvs-pat-singleton');animPat('singleton');} function initPatFactory(){initPat('factory','cvs-pat-factory');animPat('factory');} function initPatObserver(){initPat('observer','cvs-pat-observer');animPat('observer');} function initPatStrategy(){initPat('strategy','cvs-pat-strategy');animPat('strategy');}

function patAnim(key,action){PAT[key].action=action;PAT[key].pts=[];}

function animPat(key){
const p=PAT[key];const ctx=p.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
p.t++;
if(key==='module'){
const mx=W*.5,my=H*.44;
rr(ctx,mx-160,my-70,320,140,12,'#13111a','#8b7ae855',2); txt(ctx,'IIFE Closure',mx,my-54,9.5,'rgba(139,122,232,0.5)','center',600); rr(ctx,mx-150,my-40,140,100,8,'#1a1440','#8b7ae833',1); txt(ctx,'🔒 Private',mx-80,my-24,9,'#8b7ae8','center',600); txt(ctx,'let _count = 0',mx-80,my-6,9.5,'#c084fc','center'); txt(ctx,'let _state = {}',mx-80,my+11,9.5,'#c084fc','center'); rr(ctx,mx+10,my-40,140,100,8,'#0e1a10','#34d39933',1); txt(ctx,'[push] Public API',mx+80,my-24,9,'#34d399','center',600); txt(ctx,'increment()',mx+80,my-5,9.5,'#34d399','center'); txt(ctx,'getCount()',mx+80,my+12,9.5,'#34d399','center'); if(p.action==='call'){
const pulse=Math.sin(p.t*0.12)>0;
if(pulse){glow(ctx,mx+80,my+5,28,p.action==='call'?'#34d399':'#ef4444');rr(ctx,mx+80-50,my+30,100,20,5,'#34d39922','#34d39988',1);txt(ctx,'-> returns value',mx+80,my+40,9,'#34d399','center');}
}
if(p.action==='access'){rr(ctx,mx-80-50,my+30,100,20,5,'#ef444422','#ef444488',1);txt(ctx,'🚫 Cannot access',mx-80,my+40,9,'#ef4444','center');} txt(ctx,'Module Pattern -- encapsulate private state with closure',W/2,H-10,10,'rgba(255,255,255,0.25)','center');
}
else if(key==='singleton'){ const calls=[{x:W*.15,label:'Import A'},{x:W*.5,label:'Import B'},{x:W*.85,label:'Import C'}]; const inst={x:W*.5,y:H*.62,label:'Singleton Instance',sub:'{ config, state, methods }',c:'#fbbf24'};
calls.forEach((c,i)=>{
rr(ctx,c.x-45,36,90,36,8,'#1e1c38','#60a5fa55',1.5); txt(ctx,c.label,c.x,54,10.5,'#60a5fa','center',500);
const active=p.action&&Math.sin(p.t*0.1-i*.8)>0.4;
ctx.beginPath();ctx.moveTo(c.x,72);ctx.lineTo(inst.x,inst.y-20);
ctx.strokeStyle=active?'#fbbf2488':'rgba(255,255,255,0.06)';ctx.lineWidth=active?2:1;ctx.stroke();
if(active)dot(ctx,lerp(c.x,inst.x,(p.t%60)/60),lerp(72,inst.y-20,(p.t%60)/60),'#fbbf24',4);
});
glow(ctx,inst.x,inst.y,40,inst.c+'44');
rr(ctx,inst.x-100,inst.y-22,200,44,10,'#1a1400',inst.c+'88',2);
txt(ctx,inst.label,inst.x,inst.y-5,11,inst.c,'center',600); txt(ctx,inst.sub,inst.x,inst.y+12,9,'rgba(255,255,255,0.35)','center'); if(p.action==='reuse'){rr(ctx,inst.x-80,inst.y+30,160,20,5,'#0e1a0e','#34d39955',1);txt(ctx,'[ok] Same instance returned every time',inst.x,inst.y+40,9,'#34d399','center');} txt(ctx,'Singleton -- one instance shared across all imports',W/2,H-10,10,'rgba(255,255,255,0.25)','center');
}
else if(key==='factory'){ const factory={x:W*.5,y:H*.38,c:'#f97316'};
rr(ctx,factory.x-70,factory.y-24,140,48,10,'#1a0800',factory.c+'88',2); txt(ctx,'🏭 ComponentFactory',factory.x,factory.y-6,11,factory.c,'center',600); txt(ctx,'create(type)',factory.x,factory.y+11,9,'rgba(249,115,22,0.6)','center');
const products=[
{x:W*.2,y:H*.74,label:'Button',sub:'<button>',c:'#60a5fa',active:p.action==='button'}, {x:W*.5,y:H*.74,label:'Input',sub:'<input>',c:'#34d399',active:p.action==='input'}, {x:W*.8,y:H*.74,label:'Modal',sub:'<dialog>',c:'#c084fc',active:p.action==='modal'},
];
products.forEach(pr=>{
ctx.beginPath();ctx.moveTo(factory.x,factory.y+24);ctx.lineTo(pr.x,pr.y-22);
ctx.strokeStyle=pr.active?pr.c+'88':'rgba(255,255,255,0.06)';ctx.lineWidth=pr.active?2:1;ctx.stroke();
if(pr.active){glow(ctx,pr.x,pr.y,32,pr.c);const pp=(p.t%50)/50;dot(ctx,lerp(factory.x,pr.x,pp),lerp(factory.y+24,pr.y-22,pp),pr.c,4);}
rr(ctx,pr.x-46,pr.y-20,92,40,9,pr.active?pr.c+'18':'#161428',pr.active?pr.c:'#3d3566',pr.active?2:1);
txt(ctx,pr.label,pr.x,pr.y-4,11,pr.active?pr.c:'#c4c2e0','center',600); txt(ctx,pr.sub,pr.x,pr.y+12,9,'rgba(255,255,255,0.3)','center');
});
txt(ctx,'Factory -- create objects without specifying exact class',W/2,H-10,10,'rgba(255,255,255,0.25)','center');
}
else if(key==='observer'){ const subject={x:W*.5,y:52,label:'Subject / EventBus',sub:'subscribe . unsubscribe . emit',c:'#c084fc'}; const observers=[{x:W*.15,label:'Logger',sub:'on("event")',c:'#60a5fa'},{x:W*.38,label:'Analytics',sub:'on("event")',c:'#f59e0b'},{x:W*.62,label:'UI Update',sub:'on("event")',c:'#34d399'},{x:W*.85,label:'Cache',sub:'on("event")',c:'#f472b6'}];
rr(ctx,subject.x-90,subject.y-20,180,40,10,'#1a0e2a',subject.c+'88',2);
txt(ctx,subject.label,subject.x,subject.y-4,11,subject.c,'center',600);
txt(ctx,subject.sub,subject.x,subject.y+12,8.5,'rgba(192,132,252,0.5)','center');
observers.forEach((o,i)=>{
const active=p.action==='emit'&&Math.sin(p.t*0.1-i*.6)>0.2; const subscribed=p.action!=='unsub'||i!==3;
ctx.beginPath();ctx.moveTo(subject.x,subject.y+20);ctx.lineTo(o.x,H*.62-20);
ctx.strokeStyle=subscribed?(active?o.c+'88':o.c+'22'):'#ef444433';ctx.lineWidth=active?2:1;ctx.setLineDash(subscribed?[]:[4,4]);ctx.stroke();ctx.setLineDash([]);
if(active)dot(ctx,lerp(subject.x,o.x,(p.t%50)/50),lerp(subject.y+20,H*.62-20,(p.t%50)/50),o.c,4);
const unsubbed=p.action==='unsub'&&i===3;
rr(ctx,o.x-44,H*.62-18,88,36,8,active?o.c+'18':'#161428',unsubbed?'#ef4444':active?o.c:'#3d3566',active?2:1); txt(ctx,unsubbed?'❌ '+o.label:o.label,o.x,H*.62-4,10,unsubbed?'#ef4444':active?o.c:'#c4c2e0','center',600); txt(ctx,o.sub,o.x,H*.62+12,8.5,'rgba(255,255,255,0.3)','center');
});
txt(ctx,'Observer -- subject notifies all subscribers on state change',W/2,H-10,10,'rgba(255,255,255,0.25)','center');
}
else if(key==='strategy'){
const ctx_node={x:W*.2,y:H*.48,label:'Sorter',sub:'Context',c:'#8b7ae8'};
const strategies=[
{x:W*.55,y:H*.2,label:'BubbleSort',sub:'O(n²) simple',c:'#60a5fa',active:p.action==='bubble'}, {x:W*.55,y:H*.5,label:'QuickSort',sub:'O(n log n)',c:'#f59e0b',active:p.action==='quick'}, {x:W*.55,y:H*.78,label:'MergeSort',sub:'O(n log n) stable',c:'#34d399',active:p.action==='merge'},
];
rr(ctx,ctx_node.x-52,ctx_node.y-24,104,48,10,'#1e1c38',ctx_node.c+'88',2);
txt(ctx,ctx_node.label,ctx_node.x,ctx_node.y-6,11,ctx_node.c,'center',600);
txt(ctx,ctx_node.sub,ctx_node.x,ctx_node.y+11,9,'rgba(139,122,232,0.5)','center');
strategies.forEach(s=>{
ctx.beginPath();ctx.moveTo(ctx_node.x+52,ctx_node.y);ctx.lineTo(s.x-54,s.y);
ctx.strokeStyle=s.active?s.c+'88':s.c+'22';ctx.lineWidth=s.active?2:1;ctx.stroke();
if(s.active){glow(ctx,s.x,s.y,34,s.c);const pp=(p.t%60)/60;dot(ctx,lerp(ctx_node.x+52,s.x-54,pp),lerp(ctx_node.y,s.y,pp),s.c,4);}
rr(ctx,s.x-54,s.y-22,108,44,9,s.active?s.c+'18':'#161428',s.active?s.c:'#3d3566',s.active?2:1);
txt(ctx,s.label,s.x,s.y-5,11,s.active?s.c:'#c4c2e0','center',600); txt(ctx,s.sub,s.x,s.y+11,9,'rgba(255,255,255,0.3)','center');
});
if(p.action){rr(ctx,W*.82-46,H*.48-18,92,36,8,'#0e1a0e','#34d39988',1.5);txt(ctx,'Sorted [ok]',W*.82,H*.48,10,'#34d399','center',600);} txt(ctx,'Strategy -- swap algorithms at runtime without changing context',W/2,H-10,10,'rgba(255,255,255,0.25)','center');
}
p.raf=requestAnimationFrame(()=>animPat(key));
}
let WA={ctx:null,t:0,raf:null,mode:''};

function initWebpackAdv(){const ctx=setupCvs('cvs-webpack-adv');if(!ctx)return;WA.ctx=ctx;WA.t=0;cancelAnimationFrame(WA.raf);animWebpackAdv();}

function webpackAdvAnim(m){WA.mode=m;}

function animWebpackAdv(){
const ctx=WA.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
WA.t++;
if(WA.mode==='federation'){
const apps=[{x:W*.15,y:H*.35,l:'App Shell',s:'Host',c:'#8b7ae8'},{x:W*.5,y:H*.1,l:'shared/ui',s:'Remote Module',c:'#34d399'},{x:W*.85,y:H*.35,l:'Shop App',s:'Consumer',c:'#60a5fa'},{x:W*.5,y:H*.7,l:'Auth App',s:'Consumer',c:'#f59e0b'}];
[[0,1],[2,1],[3,1]].forEach(([a,b])=>{
const pp=(WA.t%80)/80;
ctx.beginPath();ctx.moveTo(apps[a].x,apps[a].y);ctx.lineTo(apps[b].x,apps[b].y);ctx.strokeStyle=apps[b].c+'44';ctx.lineWidth=2;ctx.stroke();
dot(ctx,lerp(apps[a].x,apps[b].x,easeOut(pp)),lerp(apps[a].y,apps[b].y,easeOut(pp)),apps[b].c,4);
});
apps.forEach(a=>{glow(ctx,a.x,a.y,30,a.c);rr(ctx,a.x-54,a.y-22,108,44,9,a.c+'18',a.c+'99',1.5);txt(ctx,a.l,a.x,a.y-5,10.5,a.c,'center',600);txt(ctx,a.s,a.x,a.y+10,8.5,'rgba(255,255,255,0.35)','center');}); txt(ctx,'[link] Module Federation: shared/ui served from one source -- consumed by multiple apps at runtime',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center'); } else if(WA.mode==='treeshake'){ const mods=[{x:W*.15,y:H*.3,l:'utils.js',s:'3 exports',c:'#60a5fa'},{x:W*.15,y:H*.65,l:'helpers.js',s:'5 exports',c:'#60a5fa'}]; const used=[{x:W*.5,y:H*.25,l:'add()',c:'#34d399'},{x:W*.5,y:H*.48,l:'format()',c:'#34d399'}]; const dead=[{x:W*.5,y:H*.7,l:'unused1()',c:'#ef4444'},{x:W*.5,y:H*.85,l:'unused2()',c:'#ef4444'}]; const out={x:W*.82,y:H*.38,l:'bundle.js',s:'[ok] smaller',c:'#34d399'};
mods.forEach(m=>{rr(ctx,m.x-44,m.y-18,88,36,8,'#161428',m.c+'66',1.5);txt(ctx,m.l,m.x,m.y-2,10.5,m.c,'center',600);txt(ctx,m.s,m.x,m.y+11,8.5,'rgba(255,255,255,0.3)','center');});
used.forEach(u=>{ctx.beginPath();ctx.moveTo(W*.15+44,H*.45);ctx.lineTo(u.x-38,u.y);ctx.strokeStyle='#34d39955';ctx.lineWidth=1.5;ctx.stroke();rr(ctx,u.x-38,u.y-14,76,28,7,'#0e1a0e','#34d39988',1.5);txt(ctx,'[ok] '+u.l,u.x,u.y,10,u.c,'center',500);});
dead.forEach(d=>{rr(ctx,d.x-38,d.y-14,76,28,7,'#1a0808','#ef444444',1);ctx.setLineDash([3,3]);txt(ctx,'❌ '+d.l,d.x,d.y,10,d.c+'66','center',400);ctx.setLineDash([]);});
ctx.beginPath();ctx.moveTo(W*.5+38,H*.36);ctx.lineTo(out.x-48,out.y);ctx.strokeStyle='#34d39966';ctx.lineWidth=2;ctx.stroke();
glow(ctx,out.x,out.y,32,out.c);rr(ctx,out.x-48,out.y-22,96,44,9,out.c+'18',out.c,2);txt(ctx,out.l,out.x,out.y-5,11,out.c,'center',600);txt(ctx,out.s,out.x,out.y+10,9,'rgba(255,255,255,0.35)','center'); txt(ctx,'🌳 Tree Shaking: dead exports marked and stripped -- only used code in the final bundle',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center'); } else if(WA.mode==='codesplit'){ const entry={x:W*.12,y:H*.46,l:'index.js',s:'Entry',c:'#8b7ae8'}; const chunks=[{x:W*.42,y:H*.22,l:'main.js',s:'Eager',c:'#34d399'},{x:W*.42,y:H*.5,l:'vendor.js',s:'Shared',c:'#f59e0b'},{x:W*.42,y:H*.76,l:'chart.js',s:'Lazy chunk',c:'#60a5fa'}]; const browser={x:W*.78,y:H*.46,l:'Browser',s:'Loads on demand',c:'#f472b6'};
rr(ctx,entry.x-44,entry.y-20,88,40,9,'#1e1c38',entry.c+'88',1.5);txt(ctx,entry.l,entry.x,entry.y-4,10.5,entry.c,'center',600);txt(ctx,entry.s,entry.x,entry.y+10,8.5,'rgba(255,255,255,0.3)','center');
chunks.forEach((c,i)=>{
ctx.beginPath();ctx.moveTo(entry.x+44,entry.y);ctx.lineTo(c.x-44,c.y);ctx.strokeStyle=c.c+'55';ctx.lineWidth=i===2?1.5:2;ctx.setLineDash(i===2?[4,4]:[]);ctx.stroke();ctx.setLineDash([]);
const pp=(WA.t*0.014+i*0.33)%1;dot(ctx,lerp(entry.x+44,c.x-44,pp),lerp(entry.y,c.y,pp),c.c,3.5);
const isLazy=i===2;ctx.beginPath();ctx.moveTo(c.x+44,c.y);ctx.lineTo(browser.x-44,browser.y);ctx.strokeStyle=isLazy?c.c+'33':c.c+'66';ctx.lineWidth=isLazy?1:1.5;ctx.setLineDash(isLazy?[4,4]:[]);ctx.stroke();ctx.setLineDash([]);
rr(ctx,c.x-44,c.y-18,88,36,8,isLazy?'#0e1a30':'#161428',c.c+(isLazy?'55':'99'),isLazy?1:1.5);txt(ctx,c.l,c.x,c.y-3,10.5,c.c,'center',600);txt(ctx,c.s,c.x,c.y+11,8.5,'rgba(255,255,255,0.3)','center');
});
glow(ctx,browser.x,browser.y,30,browser.c);rr(ctx,browser.x-50,browser.y-22,100,44,9,browser.c+'18',browser.c,1.5);txt(ctx,browser.l,browser.x,browser.y-5,10.5,browser.c,'center',600);txt(ctx,browser.s,browser.x,browser.y+10,8.5,'rgba(255,255,255,0.3)','center'); txt(ctx,'✂ Code Splitting: lazy chunks loaded on demand via dynamic import() -- smaller initial bundle',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center'); } else if(WA.mode==='compile'){ const stages=[{x:W*.1,l:'Source',s:'.js .ts .css',c:'#60a5fa'},{x:W*.3,l:'Loaders',s:'transform',c:'#f59e0b'},{x:W*.5,l:'Dep Graph',s:'resolve',c:'#8b7ae8'},{x:W*.7,l:'Plugins',s:'optimize',c:'#f472b6'},{x:W*.9,l:'Output',s:'chunks',c:'#34d399'}];
const sy=H*.45;
stages.forEach((s,i)=>{
if(i<stages.length-1){
ctx.beginPath();ctx.moveTo(s.x+40,sy);ctx.lineTo(stages[i+1].x-40,sy);ctx.strokeStyle=s.c+'55';ctx.lineWidth=2;ctx.stroke();
const pp=(WA.t*0.013-i*.2+1)%1;dot(ctx,lerp(s.x+40,stages[i+1].x-40,pp),sy,s.c,4);
}
const active=Math.sin(WA.t*0.06-i*0.7)>0.2;
if(active)glow(ctx,s.x,sy,30,s.c);
rr(ctx,s.x-40,sy-24,80,48,9,active?s.c+'18':'#161428',active?s.c:'#3d3566',active?2:1);
txt(ctx,s.l,s.x,sy-6,11,active?s.c:'#c4c2e0','center',600);txt(ctx,s.s,s.x,sy+10,8.5,'rgba(255,255,255,0.3)','center');
});
txt(ctx,'[cfg] Compilation: loaders transform files -> Webpack builds module graph -> plugins optimize -> output chunks',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center');
} else {
txt(ctx,'Click a button above to explore Webpack advanced concepts',W/2,H/2,12,'rgba(255,255,255,0.25)','center');
}
WA.raf=requestAnimationFrame(animWebpackAdv);
}
let VIT={ctx:null,t:0,raf:null,mode:''};

function initVitals(){const ctx=setupCvs('cvs-vitals');if(!ctx)return;VIT.ctx=ctx;VIT.t=0;cancelAnimationFrame(VIT.raf);animVitals();}

function vitalsAnim(m){VIT.mode=m;}

function animVitals(){
const ctx=VIT.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
VIT.t++;
const metrics=[
{key:'lcp',x:W*.2, label:'LCP',full:'Largest Contentful Paint',val:'1.8s',thresh:[2500,4000],unit:'ms',good:1800,c:'#10b981'}, {key:'inp',x:W*.5, label:'INP',full:'Interaction to Next Paint',val:'120ms',thresh:[200,500],unit:'ms',good:120,c:'#3b82f6'}, {key:'cls',x:W*.8, label:'CLS',full:'Cumulative Layout Shift',val:'0.05',thresh:[0.1,0.25],unit:'',good:0.05,c:'#a855f7'},
];
const show=VIT.mode==='all'?metrics:metrics.filter(m=>m.key===VIT.mode);
(VIT.mode?show:metrics).forEach(m=>{
const barH=Math.min(1,VIT.t/80)*(H*.55);
const barW=32,barX=m.x-barW/2,barY=H*.75-barH;
rr(ctx,barX,H*.2,barW,H*.55,4,'#1a1830');
const goodH=H*.55*.6;rr(ctx,barX,H*.75-goodH,barW,goodH,4,'#10b98122');
rr(ctx,barX,H*.75-H*.55*.85,barW,H*.55*.25,0,'#f59e0b22');
rr(ctx,barX,H*.2,barW,H*.55*.15,4,'#ef444422');
const progress=Math.min(H*.55*.7,barH);
const barColor=m.c;
rr(ctx,barX,H*.75-progress,barW,progress,4,barColor+'44',barColor,1.5);
glow(ctx,m.x,H*.75-progress,20,barColor);
txt(ctx,m.label,m.x,H*.82,13,barColor,'center',700); txt(ctx,m.val,m.x,H*.88,11,'rgba(255,255,255,0.6)','center'); txt(ctx,'[ok]',m.x,H*.93,11,'rgba(255,255,255,0.4)','center');
txt(ctx,m.full,m.x,H*.14,9.5,barColor+'cc','center');
txt(ctx,'Good',barX-4,H*.75-H*.55*.6,8,'#10b98188','right'); txt(ctx,'Poor',barX-4,H*.75-H*.55*.85,8,'#ef444488','right');
});
txt(ctx,VIT.mode?'':'Click a metric to highlight it -- green zone = passing score',W/2,H-8,9.5,'rgba(255,255,255,0.25)','center');
VIT.raf=requestAnimationFrame(animVitals);
}
let VTL={ctx:null,t:0,raf:null,mode:'good'};

function initVitalsTimeline(){const ctx=setupCvs('cvs-vitals-timeline');if(!ctx)return;VTL.ctx=ctx;VTL.t=0;VTL.mode='good';cancelAnimationFrame(VTL.raf);animVitalsTimeline();}

function vitalsTimelineAnim(m){VTL.mode=m;VTL.t=0;}

function animVitalsTimeline(){
const ctx=VTL.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
VTL.t++;
const isGood=VTL.mode==='good';
const timeline=isGood?
[{t:0,l:'Nav',c:'#60a5fa'},{t:.12,l:'TTFB',c:'#10b981'},{t:.22,l:'FCP',c:'#34d399'},{t:.38,l:'LCP',c:'#10b981'},{t:.55,l:'TTI',c:'#3b82f6'},{t:.72,l:'CLS',c:'#a855f7'}]: [{t:0,l:'Nav',c:'#60a5fa'},{t:.25,l:'TTFB',c:'#f59e0b'},{t:.45,l:'FCP',c:'#f97316'},{t:.72,l:'LCP',c:'#ef4444'},{t:.88,l:'TTI',c:'#ef4444'},{t:.95,l:'CLS',c:'#ef4444'}];
const barY=H*.42,barH=12,pad=32;
const barW=W-pad*2;
rr(ctx,pad,barY,barW,barH,4,'#1a1830');
const prog=Math.min(1,VTL.t/60);
const barColor=isGood?'#10b981':'#ef4444';
rr(ctx,pad,barY,barW*prog,barH,4,barColor+'55',barColor,1);
timeline.forEach((ev,i)=>{
const ex=pad+ev.t*barW;
const visible=prog>=ev.t;
if(!visible)return;
ctx.beginPath();ctx.moveTo(ex,barY-2);ctx.lineTo(ex,barY+barH+2);ctx.strokeStyle=ev.c;ctx.lineWidth=1.5;ctx.stroke();
const isTop=i%2===0;
txt(ctx,ev.l,ex,isTop?barY-18:barY+barH+16,10,ev.c,'center',600);
if(visible)glow(ctx,ex,barY+barH/2,16,ev.c);
});
txt(ctx,isGood?'[ok] Good Page: TTFB<800ms . FCP<1.8s . LCP<2.5s . TTI<3.8s':'❌ Poor Page: High TTFB . Late FCP/LCP . Long TTI -- bad user experience',W/2,H-10,10,isGood?'#10b981':'#ef4444','center',500);
VTL.raf=requestAnimationFrame(animVitalsTimeline);
}
let SEC={ctx:null,t:0,raf:null,mode:''};

function initSecurity(){const ctx=setupCvs('cvs-security');if(!ctx)return;SEC.ctx=ctx;SEC.t=0;cancelAnimationFrame(SEC.raf);animSecurity();}

function secAnim(m){SEC.mode=m;}

function animSecurity(){
const ctx=SEC.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
SEC.t++;
if(SEC.mode==='xss'){ const nodes=[{x:W*.12,y:H*.45,l:'Attacker',c:'#ef4444',icon:'👤'},{x:W*.38,y:H*.45,l:'Database',c:'#f59e0b',icon:'🗄'},{x:W*.65,y:H*.45,l:'Server',c:'#8b7ae8',icon:'[web]'},{x:W*.88,y:H*.45,l:'Victim',c:'#ef4444',icon:'👤'}];
[[0,1],[1,2],[2,3]].forEach(([a,b],i)=>{
const pp=((SEC.t*0.014-i*.35)+1)%1;
ctx.beginPath();ctx.moveTo(nodes[a].x+40,nodes[a].y);ctx.lineTo(nodes[b].x-40,nodes[b].y);ctx.strokeStyle='#ef444455';ctx.lineWidth=2;ctx.stroke();
dot(ctx,lerp(nodes[a].x+40,nodes[b].x-40,pp),nodes[a].y,'#ef4444',4);
});
nodes.forEach(n=>{glow(ctx,n.x,n.y,26,n.c+'44');rr(ctx,n.x-44,n.y-22,88,44,9,n.c+'18',n.c+'88',1.5);txt(ctx,n.icon,n.x,n.y-4,16,'#fff','center');txt(ctx,n.l,n.x,n.y+12,10,n.c,'center',600);}); rr(ctx,W*.26,H*.72,W*.48,26,6,'#2a0808','#ef444455',1);txt(ctx,'<scr'+'ipt>stealCookies()<'+'/script> injected into DB',W*.5,H*.85,10,'#ef4444cc','center'); txt(ctx,'⚠ XSS: Malicious script stored in DB -> served to every user who loads the page',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center'); } else if(SEC.mode==='csrf'){ const nodes=[{x:W*.15,y:H*.4,l:'Victim Browser',c:'#60a5fa',icon:'[web]'},{x:W*.5,y:H*.15,l:'Evil Site',c:'#ef4444',icon:'😈'},{x:W*.85,y:H*.4,l:'Bank API',c:'#34d399',icon:'🏦'}];
ctx.beginPath();ctx.moveTo(nodes[0].x,nodes[0].y-22);ctx.lineTo(nodes[1].x,nodes[1].y+22);ctx.strokeStyle='#ef444455';ctx.lineWidth=1.5;ctx.setLineDash([4,4]);ctx.stroke();ctx.setLineDash([]);
const pp=(SEC.t*0.014)%1;
ctx.beginPath();ctx.moveTo(nodes[0].x+44,nodes[0].y);ctx.lineTo(nodes[2].x-44,nodes[2].y);ctx.strokeStyle='#ef444488';ctx.lineWidth=2;ctx.stroke();
dot(ctx,lerp(nodes[0].x+44,nodes[2].x-44,pp),nodes[0].y,'#ef4444',4);
nodes.forEach(n=>{glow(ctx,n.x,n.y,26,n.c+'44');rr(ctx,n.x-50,n.y-22,100,44,9,n.c+'18',n.c+'88',1.5);txt(ctx,n.icon,n.x,n.y-4,16,'#fff','center');txt(ctx,n.l,n.x,n.y+12,10,n.c,'center',600);}); rr(ctx,W*.2,H*.65,W*.6,22,6,'#1a0808','#ef444433',1);txt(ctx,'Cookie auto-sent with forged request!',W*.5,H*.76,10,'#ef4444','center'); txt(ctx,'[sync] CSRF: Evil site tricks browser into making authenticated request using victim\'s cookies',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center'); } else if(SEC.mode==='cors'){ const br={x:W*.15,y:H*.45,l:'Browser',c:'#60a5fa',icon:'[web]'}; const api={x:W*.7,y:H*.45,l:'API Server',c:'#34d399',icon:'🖥'}; const allowed={x:W*.7,y:H*.7,l:'CDN (allowed)',c:'#34d399',icon:'[ok]'};
glow(ctx,br.x,br.y,28,br.c);rr(ctx,br.x-48,br.y-22,96,44,9,br.c+'18',br.c+'88',1.5);txt(ctx,br.icon,br.x,br.y-4,16,'#fff','center');txt(ctx,br.l,br.x,br.y+12,10,br.c,'center',600);
[api,allowed].forEach(n=>{glow(ctx,n.x,n.y,26,n.c+'44');rr(ctx,n.x-50,n.y-22,100,44,9,n.c+'18',n.c+'88',1.5);txt(ctx,n.icon,n.x,n.y-4,16,'#fff','center');txt(ctx,n.l,n.x,n.y+12,9.5,n.c,'center',600);});
const pp=(SEC.t*0.014)%1;
ctx.beginPath();ctx.moveTo(br.x+48,br.y-5);ctx.lineTo(api.x-50,api.y-5);ctx.strokeStyle='#34d39966';ctx.lineWidth=2;ctx.stroke();
dot(ctx,lerp(br.x+48,api.x-50,pp),api.y-5,'#34d399',4);
ctx.beginPath();ctx.moveTo(api.x-50,api.y+5);ctx.lineTo(br.x+48,br.y+5);ctx.strokeStyle='#60a5fa66';ctx.lineWidth=1.5;ctx.setLineDash([3,3]);ctx.stroke();ctx.setLineDash([]);
rr(ctx,W*.28,H*.18,W*.4,22,6,'#0e1a10','#34d39933',1);txt(ctx,'Access-Control-Allow-Origin: https://myapp.com',W*.48,H*.29,9,'#34d399cc','center'); txt(ctx,'[web] CORS: Server sends allow headers -> browser permits the cross-origin request',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center'); } else if(SEC.mode==='mitm'){ const nodes=[{x:W*.1,y:H*.45,l:'User',c:'#60a5fa',icon:'👤'},{x:W*.45,y:H*.3,l:'Attacker',c:'#ef4444',icon:'🕵'},{x:W*.8,y:H*.45,l:'Server',c:'#34d399',icon:'🖥'}];
[[0,1],[1,2]].forEach(([a,b],i)=>{const pp=(SEC.t*0.012-i*.4+1)%1;ctx.beginPath();ctx.moveTo(nodes[a].x+40,nodes[a].y);ctx.lineTo(nodes[b].x-40,nodes[b].y);ctx.strokeStyle='#ef444466';ctx.lineWidth=2;ctx.stroke();dot(ctx,lerp(nodes[a].x+40,nodes[b].x-40,pp),lerp(nodes[a].y,nodes[b].y,pp),'#ef4444',4);});
nodes.forEach(n=>{glow(ctx,n.x,n.y,26,n.c+'44');rr(ctx,n.x-42,n.y-22,84,44,9,n.c+'18',n.c+'88',1.5);txt(ctx,n.icon,n.x,n.y-4,16,'#fff','center');txt(ctx,n.l,n.x,n.y+12,10,n.c,'center',600);}); rr(ctx,W*.28,H*.68,W*.44,22,6,'#0e1a0e','#34d39933',1);txt(ctx,'[ok] HTTPS + HSTS prevents MITM interception',W*.5,H*.79,9.5,'#34d399','center'); txt(ctx,'🕵 MITM: Attacker intercepts traffic -- mitigated by HTTPS, certificate pinning, HSTS',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center');
} else {
const icons=[{x:W*.2,y:H*.4,l:'XSS',c:'#ef4444',icon:'⚠'},{x:W*.4,y:H*.4,l:'CSRF',c:'#f59e0b',icon:'[sync]'},{x:W*.6,y:H*.4,l:'CORS',c:'#60a5fa',icon:'[web]'},{x:W*.8,y:H*.4,l:'MITM',c:'#c084fc',icon:'🕵'}]; const shield={x:W*.5,y:H*.75,l:'Security Layer',c:'#34d399',icon:'🛡'};
icons.forEach(n=>{glow(ctx,n.x,n.y,24,n.c+'44');rr(ctx,n.x-44,n.y-22,88,44,9,n.c+'18',n.c+'88',1.5);txt(ctx,n.icon,n.x,n.y-4,16,'#fff','center');txt(ctx,n.l,n.x,n.y+12,10.5,n.c,'center',600);ctx.beginPath();ctx.moveTo(n.x,n.y+22);ctx.lineTo(shield.x,shield.y-22);ctx.strokeStyle=n.c+'33';ctx.lineWidth=1.5;ctx.setLineDash([3,4]);ctx.stroke();ctx.setLineDash([]);});
glow(ctx,shield.x,shield.y,36,shield.c);rr(ctx,shield.x-60,shield.y-22,120,44,10,shield.c+'18',shield.c,2);txt(ctx,shield.icon+' '+shield.l,shield.x,shield.y+3,12,shield.c,'center',600); txt(ctx,'Click a threat above to see the attack flow animated',W/2,H-10,9.5,'rgba(255,255,255,0.25)','center');
}
SEC.raf=requestAnimationFrame(animSecurity);
}
let SCAN={ctx:null,t:0,raf:null,mode:''};

function initScanning(){const ctx=setupCvs('cvs-scanning');if(!ctx)return;SCAN.ctx=ctx;SCAN.t=0;cancelAnimationFrame(SCAN.raf);animScanning();}

function scanAnim(m){SCAN.mode=m;}

function animScanning(){
const ctx=SCAN.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
SCAN.t++;
const pipeline=[
{x:W*.1, l:'Code Commit',s:'Git push',c:'#8b7ae8',icon:'📝'}, {x:W*.28,l:SCAN.mode==='sast'?'SAST Scan':'Lint+Audit',s:SCAN.mode==='sast'?'ESLint Sec':'npm audit',c:'#f59e0b',icon:SCAN.mode==='sast'?'🔬':'🔍'}, {x:W*.46,l:SCAN.mode==='blackbox'?'OWASP ZAP':'Dep Scan',s:SCAN.mode==='blackbox'?'Blackbox':'Snyk/CVE',c:'#ef4444',icon:SCAN.mode==='blackbox'?'🕵':'[pkg]'}, {x:W*.64,l:'Build',s:'Webpack/Vite',c:'#60a5fa',icon:'[cfg]'}, {x:W*.82,l:SCAN.mode==='deps'?'Blocked':'Deploy',s:SCAN.mode==='deps'?'❌ Vuln found':'[ok] Secure',c:SCAN.mode==='deps'?'#ef4444':'#34d399',icon:SCAN.mode==='deps'?'🚫':'[deploy]'},
];
const sy=H*.44;
pipeline.forEach((s,i)=>{
if(i<pipeline.length-1){
ctx.beginPath();ctx.moveTo(s.x+38,sy);ctx.lineTo(pipeline[i+1].x-38,sy);ctx.strokeStyle=s.c+'44';ctx.lineWidth=2;ctx.stroke();
const pp=((SCAN.t*0.013-i*.25)+1)%1;dot(ctx,lerp(s.x+38,pipeline[i+1].x-38,pp),sy,s.c,3.5);
}
const active=Math.sin(SCAN.t*0.06-i*.8)>0.2;
if(active)glow(ctx,s.x,sy,30,s.c);
rr(ctx,s.x-38,sy-26,76,52,9,active?s.c+'18':'#161428',active?s.c:'#3d3566',active?2:1);
txt(ctx,s.icon,s.x,sy-8,active?18:14,'#fff','center');txt(ctx,s.l,s.x,sy+12,9.5,active?s.c:'#c4c2e0','center',600);txt(ctx,s.s,s.x,sy+24,8,'rgba(255,255,255,0.3)','center');
});
const desc={blackbox:'🕵 Blackbox: OWASP ZAP probes the live app from outside -- finds XSS, SQLi, auth issues',sast:'🔬 SAST: Static analysis scans source code for insecure patterns before execution',deps:'[pkg] Dependency scan: Known CVEs in node_modules flagged -- PR blocked until resolved','':`Security pipeline: every commit scanned before deploy`};
txt(ctx,desc[SCAN.mode]||desc[''],W/2,H-10,9.5,'rgba(255,255,255,0.3)','center');
SCAN.raf=requestAnimationFrame(animScanning);
}
let TEST={ctx:null,t:0,raf:null,mode:''};

function initTesting(){const ctx=setupCvs('cvs-testing');if(!ctx)return;TEST.ctx=ctx;TEST.t=0;cancelAnimationFrame(TEST.raf);animTesting();}

function testingAnim(m){TEST.mode=m;}

function animTesting(){
const ctx=TEST.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
TEST.t++;
const cx=W*.5,base=H*.88,tip=H*.12;
const levels=[
{label:'E2E Tests',sub:'Playwright . Cypress',pct:.15,c:'#ef4444',yf:.18}, {label:'Integration Tests',sub:'RTL . Supertest',pct:.30,c:'#f59e0b',yf:.46}, {label:'Unit Tests',sub:'Jest . Vitest',pct:.55,c:'#34d399',yf:.78},
];
levels.forEach((lv,i)=>{
const y=tip+(base-tip)*lv.yf;
const halfW=((W*.7)*(lv.pct+(i*.22)));
const active=TEST.mode===(['e2e','integration','unit'][i])||TEST.mode==='smoke'&&i===0; const fill=active?lv.c+'33':lv.c+'14'; const stroke=active?lv.c:lv.c+'55';
ctx.beginPath();
const nextY=i<levels.length-1?tip+(base-tip)*levels[i+1].yf:base;
const prevHW=i>0?((W*.7)*(levels[i-1].pct+(i-.8)*.22)):0;
const nextHW=i<levels.length-1?((W*.7)*(levels[i+1].pct+((i+1)*.22))):W*.38;
ctx.moveTo(cx-halfW,nextY);ctx.lineTo(cx+halfW,nextY);ctx.lineTo(cx+(i===0?0:prevHW),y);ctx.lineTo(cx-(i===0?0:prevHW),y);ctx.closePath();
ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=active?2:1;ctx.stroke();
txt(ctx,lv.label,cx,y+(nextY-y)*.45,active?12:10.5,active?lv.c:'rgba(255,255,255,0.55)','center',active?600:400);
txt(ctx,lv.sub,cx,y+(nextY-y)*.68,9.5,active?lv.c+'cc':'rgba(255,255,255,0.25)','center');
if(active)glow(ctx,cx,y+(nextY-y)*.45,40,lv.c);
});
if(TEST.mode==='smoke'){ rr(ctx,W*.68,H*.1,W*.28,22,6,'#0e1a0e','#34d39955',1);txt(ctx,'💨 Smoke: top paths only',W*.82,H*.21,9,'#34d399','center'); rr(ctx,W*.04,H*.1,W*.28,22,6,'#0e1a30','#60a5fa33',1);txt(ctx,'Fast: ~2 min CI check',W*.18,H*.21,9,'#60a5fa','center');
}
const desc={unit:'⚡ Unit: fast, isolated, hundreds of tests -- base of the pyramid',integration:'[link] Integration: components + APIs together -- catches boundary bugs',e2e:'[web] E2E: full browser journey -- slow but highest confidence',smoke:'💨 Smoke: quick sanity check post-deploy -- critical paths only','':`Click a test type to highlight it in the pyramid`};
txt(ctx,desc[TEST.mode]||desc[''],W/2,H-8,9.5,'rgba(255,255,255,0.3)','center');
TEST.raf=requestAnimationFrame(animTesting);
}
let TP={ctx:null,t:0,raf:null,mode:''};

function initTestPattern(){const ctx=setupCvs('cvs-testpattern');if(!ctx)return;TP.ctx=ctx;TP.t=0;cancelAnimationFrame(TP.raf);animTestPattern();}

function testPatAnim(m){TP.mode=m;TP.t=0;}

function animTestPattern(){
const ctx=TP.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
TP.t++;
if(TP.mode==='aaa'){ const steps=[{x:W*.2,l:'Arrange',s:'Setup state & mocks',c:'#8b7ae8',icon:'[build]'},{x:W*.5,l:'Act',s:'Perform the action',c:'#f59e0b',icon:'⚡'},{x:W*.8,l:'Assert',s:'Verify the result',c:'#34d399',icon:'[ok]'}];
const sy=H*.44;
steps.forEach((s,i)=>{
if(i<steps.length-1){ctx.beginPath();ctx.moveTo(s.x+46,sy);ctx.lineTo(steps[i+1].x-46,sy);ctx.strokeStyle=s.c+'55';ctx.lineWidth=2;ctx.stroke();const pp=(TP.t*0.015-i*.4+1)%1;dot(ctx,lerp(s.x+46,steps[i+1].x-46,pp),sy,s.c,4);}
glow(ctx,s.x,sy,32,s.c);rr(ctx,s.x-46,sy-28,92,56,10,s.c+'18',s.c,2);txt(ctx,s.icon,s.x,sy-8,20,'#fff','center');txt(ctx,s.l,s.x,sy+12,11,s.c,'center',600);txt(ctx,s.s,s.x,sy+26,9,'rgba(255,255,255,0.35)','center');
});
txt(ctx,'📐 AAA: Arrange state -> Act on system -> Assert expected outcome -- universal test structure',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center'); } else if(TP.mode==='pom'){ const page={x:W*.22,y:H*.44,l:'LoginPage',s:'Page Object',c:'#60a5fa'}; const methods=[{x:W*.55,y:H*.25,l:'fillEmail()',c:'#8b7ae8'},{x:W*.55,y:H*.5,l:'fillPass()',c:'#8b7ae8'},{x:W*.55,y:H*.75,l:'submit()',c:'#8b7ae8'}]; const test={x:W*.85,y:H*.5,l:'Test',s:'Readable',c:'#34d399'};
glow(ctx,page.x,page.y,32,page.c);rr(ctx,page.x-54,page.y-26,108,52,10,page.c+'18',page.c,2);txt(ctx,page.l,page.x,page.y-6,11,page.c,'center',600);txt(ctx,page.s,page.x,page.y+10,9,'rgba(255,255,255,0.35)','center');
methods.forEach((m,i)=>{ctx.beginPath();ctx.moveTo(page.x+54,page.y);ctx.lineTo(m.x-36,m.y);ctx.strokeStyle=m.c+'55';ctx.lineWidth=1.5;ctx.stroke();const pp=(TP.t*0.014-i*.3+1)%1;dot(ctx,lerp(page.x+54,m.x-36,pp),lerp(page.y,m.y,pp),m.c,3.5);rr(ctx,m.x-36,m.y-14,72,28,7,m.c+'18',m.c+'88',1.5);txt(ctx,m.l,m.x,m.y,10,m.c,'center',600);ctx.beginPath();ctx.moveTo(m.x+36,m.y);ctx.lineTo(test.x-44,test.y);ctx.strokeStyle='#34d39933';ctx.lineWidth=1;ctx.stroke();});
glow(ctx,test.x,test.y,28,test.c);rr(ctx,test.x-44,test.y-22,88,44,9,test.c+'18',test.c,2);txt(ctx,test.l,test.x,test.y-4,11,test.c,'center',600);txt(ctx,test.s,test.x,test.y+11,9,'rgba(255,255,255,0.35)','center'); txt(ctx,'📄 Page Object Model: encapsulate selectors in a class -- tests call methods not raw selectors',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center'); } else if(TP.mode==='tdd'){ const cycle=[{label:'🔴 Red',sub:'Write failing test',c:'#ef4444',angle:-Math.PI/6},{label:'🟢 Green',sub:'Make test pass',c:'#34d399',angle:Math.PI/2+Math.PI/6},{label:'🔵 Refactor',sub:'Clean up code',c:'#3b82f6',angle:Math.PI+Math.PI*.15}];
const R=Math.min(W,H)*.28,cx=W*.5,cy=H*.48;
ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=2;ctx.stroke();
const phase=Math.floor(TP.t/60)%3;
cycle.forEach((c,i)=>{
const ax=cx+Math.cos(c.angle)*R,ay=cy+Math.sin(c.angle)*R;
const active=phase===i;
if(active)glow(ctx,ax,ay,36,c.c);
rr(ctx,ax-52,ay-22,104,44,10,active?c.c+'22':'#161428',active?c.c:c.c+'44',active?2:1);
txt(ctx,c.label,ax,ay-4,active?12:10.5,active?c.c:'rgba(255,255,255,0.4)','center',active?600:400); txt(ctx,c.sub,ax,ay+11,9,'rgba(255,255,255,0.3)','center');
const next=cycle[(i+1)%3];const nx=cx+Math.cos(next.angle)*R,ny=cy+Math.sin(next.angle)*R;
ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(nx,ny);ctx.strokeStyle=c.c+'33';ctx.lineWidth=1.5;ctx.setLineDash([3,4]);ctx.stroke();ctx.setLineDash([]);
if(active){const pp=(TP.t%60)/60;dot(ctx,lerp(ax,nx,pp),lerp(ay,ny,pp),c.c,4);}
});
txt(ctx,'🔴 TDD: Red -> Green -> Refactor cycle -- write tests first, then code',W/2,H-10,9.5,'rgba(255,255,255,0.3)','center');
} else {
txt(ctx,'Click a pattern button to visualize the test strategy',W/2,H/2,12,'rgba(255,255,255,0.25)','center');
}
TP.raf=requestAnimationFrame(animTestPattern);
}
let GQL={ctx:null,t:0,raf:null,mode:'',pts:[]};

function initGraphql(){
const ctx=setupCvs('cvs-graphql');if(!ctx)return;
GQL.ctx=ctx;GQL.t=0;GQL.pts=[];
cancelAnimationFrame(GQL.raf);animGraphql();
}

function gqlAnim(m){GQL.mode=m;GQL.pts=[];}

function animGraphql(){
const ctx=GQL.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);rr(ctx,0,0,W,H,0,'#0f0e1a');
GQL.t++;
const nodes=[
{id:'comp', x:W*.08,y:H*.46,label:'React', sub:'useQuery()', c:'#8b7ae8',icon:'⚛'}, {id:'apollo',x:W*.28,y:H*.46,label:'Apollo', sub:'Client', c:'#E535AB',icon:'[deploy]'}, {id:'cache', x:W*.5, y:H*.18,label:'Cache', sub:'InMemory', c:'#34d399',icon:'[db]'}, {id:'net', x:W*.5, y:H*.72,label:'Network', sub:'HTTP/WS', c:'#f59e0b',icon:'📡'}, {id:'server',x:W*.72,y:H*.46,label:'GQL Server',sub:'Resolvers', c:'#E535AB',icon:'⬡'}, {id:'db', x:W*.92,y:H*.46,label:'Database', sub:'PostgreSQL', c:'#60a5fa',icon:'🗄'},
];
const flows={
query: [[0,1,'#8b7ae8'],[1,2,'#34d399'],[1,3,'#f59e0b'],[3,4,'#f59e0b'],[4,5,'#E535AB'],[5,4,'#60a5fa'],[4,1,'#60a5fa'],[1,0,'#34d399']], cache: [[0,1,'#8b7ae8'],[1,2,'#34d399'],[2,1,'#34d399'],[1,0,'#34d399']], mutation:[[0,1,'#f472b6'],[1,3,'#f59e0b'],[3,4,'#f59e0b'],[4,5,'#E535AB'],[5,4,'#60a5fa'],[4,1,'#60a5fa'],[1,2,'#34d399'],[1,0,'#34d399']], sub: [[0,1,'#8b7ae8'],[1,3,'#E535AB'],[3,4,'#E535AB'],[4,1,'#E535AB'],[1,0,'#E535AB']],
};
const activeFlow=flows[GQL.mode]||[];
[[0,1],[1,2],[1,3],[3,4],[4,5]].forEach(([a,b])=>{
const na=nodes[a],nb=nodes[b];
ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);
ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.lineWidth=1.5;ctx.stroke();
});
if(GQL.mode){
activeFlow.forEach(([a,b,col],fi)=>{
const na=nodes[a],nb=nodes[b];
ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);
ctx.strokeStyle=col+'44';ctx.lineWidth=2;ctx.stroke();
const ppos=((GQL.t*0.016 - fi*0.28)%1+1)%1;
const px=lerp(na.x,nb.x,easeOut(Math.min(ppos,1)));
const py=lerp(na.y,nb.y,easeOut(Math.min(ppos,1)));
glow(ctx,px,py,12,col);dot(ctx,px,py,col,4.5);
});
}
nodes.forEach(n=>{
const isActive=GQL.mode&&activeFlow.some(([a,b])=>nodes[a].id===n.id||nodes[b].id===n.id);
if(isActive)glow(ctx,n.x,n.y,36,n.c);
rr(ctx,n.x-50,n.y-26,100,52,10,isActive?n.c+'18':'#161428',isActive?n.c:'#3d3566',isActive?2:1);
txt(ctx,n.icon,n.x,n.y-8,isActive?18:15,'#fff','center');
txt(ctx,n.label,n.x,n.y+8,10.5,isActive?n.c:'#c4c2e0','center',600); txt(ctx,n.sub,n.x,n.y+21,8.5,'rgba(255,255,255,0.3)','center');
});
const desc={
query:'🔍 Query -> Apollo -> Cache miss -> Network -> Server -> DB -> normalize -> re-render', cache:'⚡ Cache Hit: Apollo returns cached data instantly -- zero network requests', mutation:'✏ Mutation -> Network -> Server -> DB write -> update cache -> component re-renders', sub:'📡 Subscription: WebSocket stays open -- server pushes new data in real time', '':`Click a button above to animate the GraphQL data flow`,
};
txt(ctx,desc[GQL.mode]||desc[''],W/2,H-10,9.5,'rgba(255,255,255,0.3)','center');
GQL.raf=requestAnimationFrame(animGraphql);
}
const QA_DATA=[
{id:1,cat:'arch',q:"How do you design a scalable micro-frontend architecture?",
a:"Micro-frontends split a monolithic SPA into independently deployable UI apps per domain. Key decisions: composition strategy (runtime via Module Federation, build-time via monorepo, or server-side via Edge includes), routing ownership (shell app owns routes, child apps own sub-routes), shared state contract (global event bus or shared auth store), and shared dependency versioning to avoid bundle duplication.",
diagram:[
[{txt:'Shell App',c:'#ede9fe',b:'#8b7ae8'},{arr:'->'},{txt:'Route /shop -> Shop MFE',c:'#fef9c3',b:'#d97706'},{arr:'->'},{txt:'Route /auth -> Auth MFE',c:'#ecfdf5',b:'#059669'}], [{txt:'Module Federation',c:'#eff6ff',b:'#3b82f6'},{arr:'shares'},{txt:'react, react-dom',c:'#fef2f2',b:'#ef4444'},{arr:'->'},{txt:'No duplicate bundles',c:'#ecfdf5',b:'#059669'}],
],
tags:[{t:'Module Federation',c:'#ede9fe',b:'#8b7ae8'},{t:'Webpack 5',c:'#eff6ff',b:'#3b82f6'},{t:'Single-SPA',c:'#fef9c3',b:'#d97706'}]},
{id:2,cat:'arch',q:"Explain the tradeoffs between CSR, SSR, SSG, and ISR in a real product decision.",
a:"CSR suits dashboards where SEO is irrelevant and data is user-specific. SSR suits marketing pages or feeds needing fresh data per request (highest TTFB cost). SSG is ideal for content that rarely changes -- zero server cost, CDN-served. ISR combines SSG speed with periodic revalidation, perfect for e-commerce product pages. The decision matrix: SEO need × data freshness × server cost × interactivity.",
diagram:[
[{txt:'SSG',c:'#ecfdf5',b:'#059669'},{arr:'best'},{txt:'SEO + Speed'},{arr:'worst'},{txt:'Real-time Data'}], [{txt:'SSR',c:'#eff6ff',b:'#3b82f6'},{arr:'best'},{txt:'Fresh Data + SEO'},{arr:'cost'},{txt:'High TTFB'}], [{txt:'CSR',c:'#fef9c3',b:'#d97706'},{arr:'best'},{txt:'Interactivity'},{arr:'worst'},{txt:'SEO'}], [{txt:'ISR',c:'#fdf4ff',b:'#a855f7'},{arr:'best'},{txt:'Balance'},{arr:'needs'},{txt:'Next.js / Nuxt'}],
],
tags:[{t:'Next.js',c:'#f8fafc',b:'#475569'},{t:'ISR',c:'#fdf4ff',b:'#a855f7'},{t:'Core Web Vitals',c:'#ecfdf5',b:'#059669'}]},
{id:3,cat:'arch',q:"How do you enforce architectural decisions across a large team?",
a:"Use Architecture Decision Records (ADRs) stored in the repo -- each major decision documented with context, options considered, and rationale. Enforce via linting rules (custom ESLint plugins), module boundary checks (NX enforce-module-boundaries), PR templates with architecture checklist, and a Frontend Architect review gate for cross-cutting changes. Regular Architecture Guild meetings maintain alignment without becoming bottlenecks.",
tags:[{t:'ADR',c:'#eff6ff',b:'#3b82f6'},{t:'NX',c:'#fdf4ff',b:'#a855f7'},{t:'ESLint',c:'#fef9c3',b:'#d97706'}]},
{id:4,cat:'arch',q:"How do you structure a large React application for maintainability?",
a:"Feature-based folder structure (not type-based): each feature owns its components, hooks, state, types, and tests. Use barrel exports per feature with explicit public APIs -- nothing outside the feature imports internals. Shared code lives in `packages/` or `libs/` with clear ownership. Apply the Dependency Rule: features can import from shared libs but not from each other. Combine with path aliases to avoid deep relative imports.",
diagram:[
[{txt:'src/features/checkout/',c:'#ecfdf5',b:'#059669'},{arr:'->'},{txt:'index.ts (public API only)',c:'#eff6ff',b:'#3b82f6'}], [{txt:'src/libs/ui/',c:'#fdf4ff',b:'#a855f7'},{arr:'->'},{txt:'Shared components',c:'#fef9c3',b:'#d97706'}], [{txt:'Features',c:'#fef2f2',b:'#ef4444'},{arr:'cannot import'},{txt:'Other Features',c:'#fef2f2',b:'#ef4444'}],
],
tags:[{t:'Feature Slicing',c:'#ecfdf5',b:'#059669'},{t:'Barrel Exports',c:'#eff6ff',b:'#3b82f6'},{t:'Path Aliases',c:'#fdf4ff',b:'#a855f7'}]},
{id:5,cat:'arch',q:"What is the Strangler Fig pattern and when would you use it in a frontend migration?",
a:"Strangler Fig wraps a legacy system with a new one, gradually routing traffic to the new implementation while the legacy system is slowly 'strangled'. In frontend: use an Edge proxy (Nginx, Cloudflare Worker) to route URL prefixes to old vs new apps. New features are built in the new stack, existing pages migrated over time. Anti-corruption layers (adapters, facades) prevent legacy data shapes from leaking into new code.",
tags:[{t:'Migration',c:'#fef9c3',b:'#d97706'},{t:'Edge Proxy',c:'#eff6ff',b:'#3b82f6'},{t:'Facade Pattern',c:'#fdf4ff',b:'#a855f7'}]},
{id:6,cat:'arch',q:"How do you design a component library for consumption by 10+ product teams?",
a:"Versioned package on an internal npm registry. Separate packages for tokens, primitives, and composites so teams can adopt incrementally. Each component exports: default styled, headless (logic-only), and token-driven variants. CI publishes canary builds on every PR merge. Storybook serves as living documentation and visual regression baseline (Chromatic). Governance: component RFC process, public consumer feedback, and a dedicated Slack channel for breaking changes.",
tags:[{t:'Design Tokens',c:'#fdf4ff',b:'#a855f7'},{t:'Storybook',c:'#fef2f2',b:'#ef4444'},{t:'Chromatic',c:'#ecfdf5',b:'#059669'}]},
{id:7,cat:'arch',q:"Explain the Island Architecture pattern and when you'd choose it over a full SPA.",
a:"Island Architecture (Astro, Fresh) ships mostly static HTML with isolated interactive 'islands' that hydrate independently. Zero JS by default -- components only load JS when needed. Ideal for content-heavy sites (docs, blogs, e-commerce PDPs) where most content is static but some widgets (cart, search) need interactivity. Contrast with SPA: no global React tree, no hydration of the entire page, dramatically smaller TTI.",
tags:[{t:'Astro',c:'#fef9c3',b:'#d97706'},{t:'Partial Hydration',c:'#eff6ff',b:'#3b82f6'},{t:'SSG',c:'#ecfdf5',b:'#059669'}]},
{id:8,cat:'arch',q:"How do you handle shared authentication state across micro-frontends?",
a:"Single auth service (STS/OAuth2 provider) issues tokens. Shell app handles login flow and stores tokens in HttpOnly cookies (not localStorage -- XSS risk). Child MFEs read auth state from a shared store exposed via the shell's module federation exposes config, or a lightweight custom event bus. Never replicate auth logic in each MFE. Refresh token rotation is shell's responsibility; MFEs fire an 'auth:expired' event when 401s occur.", tags:[{t:'OAuth2',c:'#eff6ff',b:'#3b82f6'},{t:'HttpOnly Cookie',c:'#fef2f2',b:'#ef4444'},{t:'Module Federation',c:'#fdf4ff',b:'#a855f7'}]},
{id:9,cat:'arch',q:"What is event-driven architecture in the frontend context?",
a:"Components emit domain events (not UI events) through a typed event bus. Consumers subscribe without knowing who published. Enables complete decoupling: a `checkout:completed` event triggers analytics, notifications, and cart clearing independently. Implement with a simple pub/sub class, RxJS, or native CustomEvents for cross-MFE communication. Key rule: events are immutable facts ('OrderPlaced'), not commands ('PlaceOrder').", tags:[{t:'Pub/Sub',c:'#fdf4ff',b:'#a855f7'},{t:'RxJS',c:'#fef9c3',b:'#d97706'},{t:'Domain Events',c:'#ecfdf5',b:'#059669'}]},
{id:10,cat:'arch',q:"How would you architect real-time features (live updates, notifications) in a React app?",
a:"WebSocket connection managed at the app shell level (not per-component). Use a Redux/Zustand middleware that subscribes to socket messages and dispatches actions. For React Query: socket messages invalidate specific query keys triggering refetch. Connection lifecycle (reconnect, exponential backoff, heartbeat) handled by a dedicated WS service class. Fallback: Server-Sent Events (SSE) for one-way streams, long polling for corporate networks blocking WebSockets.",
tags:[{t:'WebSocket',c:'#eff6ff',b:'#3b82f6'},{t:'SSE',c:'#ecfdf5',b:'#059669'},{t:'React Query',c:'#fef9c3',b:'#d97706'}]},
{id:11,cat:'arch',q:"Describe your approach to API layer design in a frontend application.",
a:"Centralised API client (Axios instance or fetch wrapper) with interceptors for auth headers, error normalisation, and logging. Repository pattern: each domain has a typed service class (UserService, OrderService) -- components never call fetch directly. Generate TypeScript types from OpenAPI/GraphQL schema automatically in CI. Handle error states uniformly: network errors, validation errors (422), auth errors (401/403) map to distinct error types.",
tags:[{t:'Repository Pattern',c:'#fdf4ff',b:'#a855f7'},{t:'OpenAPI',c:'#eff6ff',b:'#3b82f6'},{t:'Type Safety',c:'#ecfdf5',b:'#059669'}]},
{id:12,cat:'arch',q:"How do you manage frontend configuration across environments (dev/staging/prod)?",
a:"Environment variables injected at build time (Vite: import.meta.env, webpack: DefinePlugin) for truly static config. For runtime config (feature flags, API endpoints that vary per tenant), serve a /config.json from CDN at app startup. Never hardcode environment-specific URLs. Secrets never go in frontend bundles. Use a feature flag service (LaunchDarkly, Unleash) for controlled rollouts -- not environment variables.",
tags:[{t:'Feature Flags',c:'#fef9c3',b:'#d97706'},{t:'Runtime Config',c:'#eff6ff',b:'#3b82f6'},{t:'LaunchDarkly',c:'#ecfdf5',b:'#059669'}]},
{id:13,cat:'arch',q:"What are the key concerns when building a white-label / multi-tenant frontend?",
a:"Theming via CSS custom properties -- each tenant's brand tokens injected at runtime. Configuration-driven UI: features visible per tenant controlled by a config object, not code branches. Tenant context in React context propagates throughout tree. Separate deployments vs runtime tenant detection (subdomain-based). Asset isolation: tenant-specific logos and fonts lazy-loaded, not bundled for all. Data isolation: API calls always scoped by tenant ID in headers or URL.",
tags:[{t:'CSS Custom Properties',c:'#fdf4ff',b:'#a855f7'},{t:'Tenant Context',c:'#eff6ff',b:'#3b82f6'},{t:'Brand Tokens',c:'#fef9c3',b:'#d97706'}]},
{id:14,cat:'arch',q:"How do you approach error boundaries and resilience patterns in React?",
a:"Error boundaries at feature boundaries, not component level -- so one widget failure doesn't crash the page. Suspense + ErrorBoundary wrapping async data to handle loading and error states declaratively. Retry logic for transient failures (network errors) with exponential backoff. Circuit-breaker pattern: after N failures, stop retrying and show degraded state. Log boundaries to error tracking (Sentry) with component tree context. Never show raw error messages to users.",
tags:[{t:'Error Boundary',c:'#fef2f2',b:'#ef4444'},{t:'Sentry',c:'#fdf4ff',b:'#a855f7'},{t:'Circuit Breaker',c:'#eff6ff',b:'#3b82f6'}]},
{id:15,cat:'arch',q:"What is the Presentation/Container (Smart/Dumb) pattern and is it still relevant?",
a:"Container components handle data fetching and state; Presentational components receive everything via props and are purely visual. Still relevant but expressed differently: today, custom hooks ARE the containers. A `useUserProfile` hook encapsulates all logic; the component just renders. This separates concerns without artificial component nesting. Advantage: presentational components are trivially testable and reusable; logic is tested independently via hook tests.",
tags:[{t:'Custom Hooks',c:'#eff6ff',b:'#3b82f6'},{t:'Separation of Concerns',c:'#ecfdf5',b:'#059669'},{t:'Testability',c:'#fef9c3',b:'#d97706'}]},
{id:16,cat:'perf',q:"Walk me through how you'd audit and fix a poor LCP (Largest Contentful Paint).",
a:"Profile with Chrome DevTools Performance tab + Lighthouse. Common causes: render-blocking scripts/styles (fix: defer/async, inline critical CSS), unoptimised hero images (fix: WebP/AVIF, preload with <link rel=preload>, correct srcset), slow TTFB (fix: CDN, edge caching, SSR vs SSG), late resource discovery (fix: preconnect to font/API origins). Target: LCP < 2.5s. Measure before/after with CrUX field data, not just lab data.",
diagram:[
[{txt:'Slow TTFB',c:'#fef2f2',b:'#ef4444'},{arr:'->'},{txt:'CDN + SSG',c:'#ecfdf5',b:'#059669'}], [{txt:'Large Image',c:'#fef2f2',b:'#ef4444'},{arr:'->'},{txt:'WebP + preload',c:'#ecfdf5',b:'#059669'}], [{txt:'Render-blocking CSS',c:'#fef2f2',b:'#ef4444'},{arr:'->'},{txt:'Inline critical CSS',c:'#ecfdf5',b:'#059669'}],
],
tags:[{t:'LCP',c:'#ecfdf5',b:'#059669'},{t:'CrUX',c:'#eff6ff',b:'#3b82f6'},{t:'Critical CSS',c:'#fdf4ff',b:'#a855f7'}]},
{id:17,cat:'perf',q:"How does React reconciliation work and how do you optimise it?",
a:"React diffs the current fiber tree against the work-in-progress tree using the reconciler. Same type = update, different type = unmount + remount. Optimise with: React.memo for expensive pure components (shallow prop comparison), useMemo for expensive derived values, useCallback for stable function references passed to memoised children. Keys on lists must be stable IDs -- never array index. Use React DevTools Profiler to find unnecessary renders. Consider Zustand/Jotai for fine-grained subscriptions to avoid over-rendering.",
tags:[{t:'React.memo',c:'#eff6ff',b:'#3b82f6'},{t:'useMemo',c:'#fdf4ff',b:'#a855f7'},{t:'React Profiler',c:'#fef9c3',b:'#d97706'}]},
{id:18,cat:'perf',q:"Explain code splitting strategies and when each applies.",
a:"Route-based splitting is the baseline -- each route is a separate chunk (React.lazy + Suspense). Component-based splitting for heavy widgets (charts, editors) loaded on interaction. Vendor splitting (SplitChunksPlugin) extracts stable dependencies into long-lived cached chunks. Prefetching: use <link rel=prefetch> or webpack magic comments `/* webpackPrefetch: true */` for likely-next routes. Measure bundle with webpack-bundle-analyzer -- target < 200KB initial JS (gzipped).",
tags:[{t:'React.lazy',c:'#eff6ff',b:'#3b82f6'},{t:'Route Splitting',c:'#ecfdf5',b:'#059669'},{t:'Bundle Analyzer',c:'#fef9c3',b:'#d97706'}]},
{id:19,cat:'perf',q:"How do you implement virtualisation for large lists?",
a:"Virtual lists only render DOM nodes visible in the viewport. Libraries: react-window (lightweight, fixed-size rows), react-virtual (TanStack, flexible), react-virtuoso (dynamic row heights, chat-style). Key challenges: dynamic row heights require measuring before render (use ResizeObserver), infinite scroll needs IntersectionObserver sentinel, maintaining scroll position across route changes. Never render 10,000 DOM nodes -- always virtualise lists > 100 items.",
tags:[{t:'react-window',c:'#eff6ff',b:'#3b82f6'},{t:'IntersectionObserver',c:'#fdf4ff',b:'#a855f7'},{t:'ResizeObserver',c:'#ecfdf5',b:'#059669'}]},
{id:20,cat:'perf',q:"What is the main thread and how do you keep it unblocked?",
a:"The main thread executes JS, handles layout/paint, and processes user input. Long tasks (>50ms) block input response, causing high INP. Strategies: break long tasks with scheduler.yield() or setTimeout(fn,0) for low-priority work, offload CPU-heavy computation to Web Workers (parsing, image processing, encryption), use requestIdleCallback for analytics/logging, defer non-critical JS with `defer`/`async`. Chrome Task Manager and Performance timeline identify blocking tasks.",
tags:[{t:'Web Workers',c:'#fef9c3',b:'#d97706'},{t:'scheduler.yield()',c:'#eff6ff',b:'#3b82f6'},{t:'INP',c:'#ecfdf5',b:'#059669'}]},
{id:21,cat:'perf',q:"Explain HTTP caching strategy for a frontend application.",
a:"Static assets (JS/CSS chunks with content hash): `Cache-Control: max-age=31536000, immutable` -- cached forever, hash changes force new fetch. HTML: `no-cache` so browser always revalidates but can use 304 Not Modified. API responses: `stale-while-revalidate` serves stale data instantly while fresh fetch happens in background. Service Worker for offline support and fine-grained cache strategies per resource type. CDN edge caching for static assets -- vary by Accept-Encoding, not cookies.",
tags:[{t:'Cache-Control',c:'#eff6ff',b:'#3b82f6'},{t:'Service Worker',c:'#fdf4ff',b:'#a855f7'},{t:'CDN',c:'#ecfdf5',b:'#059669'}]},
{id:22,cat:'perf',q:"How do you measure and improve Cumulative Layout Shift (CLS)?",
a:"CLS measures unexpected layout shifts during page load. Root causes: images/videos without dimensions (fix: explicit width/height or aspect-ratio CSS), dynamically injected content above fold (fix: reserve space with skeleton), FOUT from web fonts (fix: font-display:optional or preload). Measure: Lab data via Lighthouse, real-user data via web-vitals JS library sending to analytics. Target < 0.1. CSS `content-visibility: auto` can hide off-screen content causing layout work.",
tags:[{t:'CLS',c:'#fdf4ff',b:'#a855f7'},{t:'Skeleton Screens',c:'#eff6ff',b:'#3b82f6'},{t:'font-display',c:'#fef9c3',b:'#d97706'}]},
{id:23,cat:'perf',q:"What is tree shaking and what conditions are required for it to work?",
a:"Tree shaking is dead-code elimination based on ES module static analysis. Webpack/Rollup trace import graphs and remove exports that are never imported. Requirements: source code must use ESM (import/export, not CommonJS require), `sideEffects:false` in package.json (or per-file), no dynamic requires, and production mode (terser removes dead code). Common pitfall: libraries shipping CommonJS alongside ESM -- always check pkg.exports field for the ESM entry.",
tags:[{t:'ESM',c:'#ecfdf5',b:'#059669'},{t:'sideEffects',c:'#eff6ff',b:'#3b82f6'},{t:'Rollup',c:'#fef9c3',b:'#d97706'}]},
{id:24,cat:'perf',q:"How do you performance-budget a project and enforce it in CI?",
a:"Define budgets per metric: initial JS bundle < 200KB gzip, LCP < 2.5s, CLS < 0.1, TBT < 200ms. Enforce with: Bundlesize (PR fails if chunk exceeds limit), Lighthouse CI (blocks merge if scores drop), webpack-bundle-analyzer diff in PR comments. Size limits in webpack via `performance.maxAssetSize`. Track trends over time in a dashboard (Grafana + custom metrics pipeline). Budgets must be agreed with product -- performance is a feature.",
tags:[{t:'Lighthouse CI',c:'#eff6ff',b:'#3b82f6'},{t:'Bundlesize',c:'#ecfdf5',b:'#059669'},{t:'Performance Budget',c:'#fef9c3',b:'#d97706'}]},
{id:25,cat:'perf',q:"Explain image optimisation strategy for a high-traffic site.",
a:"Modern formats: WebP for broad support, AVIF for best compression (30-50% smaller than WebP). Responsive images: srcset + sizes attributes so browser selects optimal resolution. Lazy loading: loading='lazy' for below-fold images, plus Intersection Observer for fine control. CDN-based image transformation (Cloudinary, imgix) generates sizes on-demand. Next/Image and Nuxt/Image automate most of this. Avoid CSS background-images for LCP elements -- browser can't preload them.", tags:[{t:'WebP / AVIF',c:'#ecfdf5',b:'#059669'},{t:'srcset',c:'#eff6ff',b:'#3b82f6'},{t:'Cloudinary',c:'#fdf4ff',b:'#a855f7'}]},
{id:26,cat:'design',q:"What are design tokens and how do you implement them at scale?",
a:"Design tokens are the atomic decisions of a design system -- colour, spacing, typography, shadows -- expressed as named variables. Three-tier architecture: Global tokens (raw values: --color-blue-500:#3b82f6), Semantic tokens (purpose-mapped: --color-action:#3b82f6), Component tokens (scoped: --button-bg:var(--color-action)). Stored as JSON/YAML (Theo, Style Dictionary), transformed to CSS custom properties, JS objects, iOS/Android formats in CI. Single source of truth shared between design (Figma Tokens plugin) and code.",
diagram:[
[{txt:'Figma Tokens',c:'#fef9c3',b:'#d97706'},{arr:'->'},{txt:'tokens.json',c:'#eff6ff',b:'#3b82f6'},{arr:'->'},{txt:'Style Dictionary'}], [{txt:'CSS vars',c:'#ecfdf5',b:'#059669'},{arr:'+'},{txt:'JS constants',c:'#fdf4ff',b:'#a855f7'},{arr:'+'},{txt:'iOS/Android',c:'#fef2f2',b:'#ef4444'}],
],
tags:[{t:'Style Dictionary',c:'#eff6ff',b:'#3b82f6'},{t:'Design Tokens',c:'#fdf4ff',b:'#a855f7'},{t:'Theo',c:'#fef9c3',b:'#d97706'}]},
{id:27,cat:'design',q:"How do you handle theming (dark mode, brand themes) in a component library?",
a:"CSS custom property cascade: root-level semantic tokens, overridden by [data-theme='dark'] or [data-brand='acme'] attribute on the root element. Never hardcode colours in components -- always reference semantic tokens (--color-surface, --color-text-primary). Toggle dark mode: change data-theme attribute, save preference to localStorage. For brands: load a small override stylesheet per brand that redefines semantic tokens only. Avoid JS-in-CSS-in-JS solutions that require re-render for theme changes.",
tags:[{t:'CSS Custom Properties',c:'#fdf4ff',b:'#a855f7'},{t:'prefers-color-scheme',c:'#eff6ff',b:'#3b82f6'},{t:'data-theme',c:'#fef9c3',b:'#d97706'}]},
{id:28,cat:'design',q:"Explain the compound component pattern and when it's appropriate.",
a:"Compound components share implicit state through React context, giving consumers flexibility to compose sub-components as they wish. Example: <Select><Select.Trigger/><Select.Options/><Select.Option/></Select>. The parent manages open state; children consume via context. When to use: complex interactive components (Select, Accordion, Tabs, Menu) where consumers need to control layout and DOM order. Anti-pattern: don't use for simple stateless components -- adds unnecessary complexity.",
tags:[{t:'React Context',c:'#eff6ff',b:'#3b82f6'},{t:'Compound Components',c:'#fdf4ff',b:'#a855f7'},{t:'Radix UI',c:'#ecfdf5',b:'#059669'}]},
{id:29,cat:'design',q:"How do you ensure accessibility (a11y) is built into a component library?",
a:"Use ARIA patterns from WAI-ARIA Authoring Practices Guide as the spec. Every interactive component needs: correct ARIA roles/states, keyboard navigation (Tab, Enter, Space, Arrow keys per pattern), focus management (trap focus in modals, return focus on close), visible focus indicators. Automated testing: axe-core in unit tests, Playwright for keyboard flow tests. Storybook a11y addon for visual checks. WCAG 2.1 AA as the contractual baseline. Include a11y acceptance criteria in every component RFC.",
tags:[{t:'ARIA',c:'#eff6ff',b:'#3b82f6'},{t:'WCAG 2.1 AA',c:'#ecfdf5',b:'#059669'},{t:'axe-core',c:'#fdf4ff',b:'#a855f7'}]},
{id:30,cat:'design',q:"What is a headless component library and why would you choose one?",
a:"Headless libraries (Radix UI, Headless UI, React Aria) provide behaviour and accessibility with zero default styling. You supply all CSS. Benefits: complete styling freedom, no specificity battles with existing design systems, accessibility built-in by specialists. Tradeoff: more initial styling work vs pre-styled libraries. Best choice when: building a custom design system on top, existing UI kit has accessibility gaps, or design is too unique for any stock library. Most enterprise design systems now adopt headless primitives.",
tags:[{t:'Radix UI',c:'#ecfdf5',b:'#059669'},{t:'Headless UI',c:'#eff6ff',b:'#3b82f6'},{t:'React Aria',c:'#fdf4ff',b:'#a855f7'}]},
{id:31,cat:'design',q:"How do you version and release a component library without breaking consumers?",
a:"Semver strictly: breaking changes (prop rename, removed component) = major bump. New features = minor. Fixes = patch. Migration guides in CHANGELOG for every major. Automated breaking-change detection (api-extractor, custom codemods via jscodeshift). Deprecation lifecycle: mark deprecated with console.warn + JSDoc @deprecated, keep for 2 major versions before removal. Canary releases for early adopters. Consider a compatibility shim package for gradual migration.",
tags:[{t:'Semver',c:'#eff6ff',b:'#3b82f6'},{t:'jscodeshift',c:'#ecfdf5',b:'#059669'},{t:'api-extractor',c:'#fdf4ff',b:'#a855f7'}]},
{id:32,cat:'design',q:"Describe your approach to responsive design and layout systems.",
a:"Content-first breakpoints -- set breakpoints where the design breaks, not at device sizes. CSS Grid + Flexbox for all layouts; avoid fixed pixel widths on containers. Fluid typography with clamp() scales text between viewport sizes. Container Queries (now widely supported) for component-level responsiveness independent of viewport. Design token spacing scale (4px base, multiples of 4) ensures visual rhythm. Test with real devices, not just Chrome DevTools -- especially touch targets (min 44x44px for iOS).",
tags:[{t:'Container Queries',c:'#eff6ff',b:'#3b82f6'},{t:'CSS clamp()',c:'#fdf4ff',b:'#a855f7'},{t:'CSS Grid',c:'#ecfdf5',b:'#059669'}]},
{id:33,cat:'design',q:"How do you manage CSS at scale in a large application?",
a:"CSS Modules for component-scoped styles (zero runtime, static analysis). Tailwind CSS for utility-first (eliminates dead CSS via PurgeCSS, consistent spacing). CSS-in-JS (styled-components, emotion) for dynamic styles that depend on JS props. At enterprise scale: CSS Modules + design tokens via CSS custom properties is the most portable choice. Critical path: extract above-fold styles, defer non-critical. Enforce via stylelint with custom rules matching your token naming conventions.",
tags:[{t:'CSS Modules',c:'#eff6ff',b:'#3b82f6'},{t:'Tailwind CSS',c:'#ecfdf5',b:'#059669'},{t:'stylelint',c:'#fdf4ff',b:'#a855f7'}]},
{id:34,cat:'design',q:"What is atomic design and how does it map to a React component library?",
a:"Atomic design (Brad Frost): Atoms -> Molecules -> Organisms -> Templates -> Pages. In React: Atoms = Button, Input, Icon (no dependencies). Molecules = FormField (Label + Input + Error). Organisms = LoginForm (FormFields + Button + validation). Templates = AuthLayout (slots for header/content/footer). Pages = LoginPage (wires real data to LoginForm). The value is the vocabulary for API design conversations between designers and engineers, not a rigid folder structure.",
tags:[{t:'Atomic Design',c:'#fdf4ff',b:'#a855f7'},{t:'Composition',c:'#eff6ff',b:'#3b82f6'},{t:'Storybook',c:'#ecfdf5',b:'#059669'}]},
{id:35,cat:'design',q:"How do you document a component library effectively?",
a:"Storybook as the primary medium: each component has Controls (interactive props), Docs page (auto-generated API table), accessibility panel, and viewport testing. Use MDX for narrative documentation alongside stories. Include: usage guidelines (do/don't), design rationale, accessibility notes, related components, migration notes. Publish to a static URL on every merge to main. For design-code parity: Storybook Figma plugin shows the corresponding component in Figma alongside the story.",
tags:[{t:'Storybook MDX',c:'#eff6ff',b:'#3b82f6'},{t:'Controls',c:'#fdf4ff',b:'#a855f7'},{t:'Design Parity',c:'#ecfdf5',b:'#059669'}]},
{id:36,cat:'infra',q:"How do you structure CI/CD for a large frontend monorepo?",
a:"Affected-command strategy (NX, Turborepo): only run tests/builds for packages changed in the PR + their dependents. Parallel job matrix for independent packages. Pipeline stages: lint -> type-check -> unit test -> build -> E2E -> deploy. Remote caching (Turborepo Remote Cache, NX Cloud) means CI skips work already done on other branches. Preview deployments per PR (Vercel, Netlify, or custom Kubernetes namespace). Canary deployments via feature flags, not separate branches.",
diagram:[
[{txt:'PR Pushed',c:'#eff6ff',b:'#3b82f6'},{arr:'->'},{txt:'Affected Graph',c:'#fdf4ff',b:'#a855f7'},{arr:'->'},{txt:'Lint + Test + Build'}], [{txt:'Remote Cache hit',c:'#ecfdf5',b:'#059669'},{arr:'->'},{txt:'Skip unchanged packages',c:'#ecfdf5',b:'#059669'}], [{txt:'All green',c:'#ecfdf5',b:'#059669'},{arr:'->'},{txt:'Preview Deploy',c:'#fef9c3',b:'#d97706'},{arr:'->'},{txt:'Merge Gate'}],
],
tags:[{t:'Turborepo',c:'#fdf4ff',b:'#a855f7'},{t:'NX Affected',c:'#eff6ff',b:'#3b82f6'},{t:'Preview Deploy',c:'#ecfdf5',b:'#059669'}]},
{id:37,cat:'infra',q:"Compare Vite, webpack, and esbuild/Rollup for a production setup.",
a:"Webpack 5: battle-tested, richest plugin ecosystem, best for complex needs (Module Federation, custom loaders). Slow dev server (full bundle). Vite: native ESM dev server (instant cold start), Rollup for production. Best DX for most new projects. esbuild: Go-based, 100x faster than webpack for pure transpile; used internally by Vite. Rollup: best tree-shaking for library builds, outputs clean ESM. Decision: new app -> Vite; legacy enterprise -> webpack; library -> Rollup; performance-critical tooling -> esbuild.",
tags:[{t:'Vite',c:'#fef9c3',b:'#d97706'},{t:'Module Federation',c:'#eff6ff',b:'#3b82f6'},{t:'esbuild',c:'#ecfdf5',b:'#059669'}]},
{id:38,cat:'infra',q:"How do you implement and govern TypeScript across a large team?",
a:"Strict mode (`strict:true`) in tsconfig from day one -- retrofitting is painful. Shared tsconfig base package extended by each project. Ban `any` via no-explicit-any ESLint rule; allow `unknown` with explicit narrowing. Type-generate from external schemas (OpenAPI -> zod + types, GraphQL -> codegen). Ensure CI fails on type errors -- never skip tsc in build. Incremental adoption: `// @ts-expect-error` with ticket reference is better than `any`. Regular TypeScript Strict debt reviews.",
tags:[{t:'strict mode',c:'#eff6ff',b:'#3b82f6'},{t:'Zod',c:'#fdf4ff',b:'#a855f7'},{t:'GraphQL Codegen',c:'#ecfdf5',b:'#059669'}]},
{id:39,cat:'infra',q:"How do you handle observability and error monitoring in a production frontend?",
a:"Error tracking: Sentry with source maps uploaded at deploy time so minified stack traces resolve to source. Session replay (Sentry, LogRocket) for hard-to-reproduce bugs. Real User Monitoring: web-vitals library sends LCP/INP/CLS to your analytics pipeline. Custom metrics: navigation timing API, resource timing. Logging: structured JSON to DataDog/Splunk via a thin logging service (never console.log in prod). Alert on: error rate spike, p99 LCP regression, JS exception budget exceeded.",
tags:[{t:'Sentry',c:'#fef2f2',b:'#ef4444'},{t:'Session Replay',c:'#eff6ff',b:'#3b82f6'},{t:'web-vitals',c:'#ecfdf5',b:'#059669'}]},
{id:40,cat:'infra',q:"What is your approach to automated testing at the frontend architecture level?",
a:"Testing trophy (Kent C. Dodds): heavy integration tests, lighter unit + E2E. Unit tests for pure functions and custom hooks. Component tests with React Testing Library -- test behaviour, not implementation (query by role/label, not className). Integration tests with MSW mocking the network layer. E2E with Playwright for critical user journeys (10-20 scenarios, not 500). Visual regression with Chromatic per PR. Contract testing (Pact) at API boundaries in micro-frontend setups.",
tags:[{t:'Testing Trophy',c:'#eff6ff',b:'#3b82f6'},{t:'MSW',c:'#ecfdf5',b:'#059669'},{t:'Playwright',c:'#fdf4ff',b:'#a855f7'}]},
{id:41,cat:'infra',q:"How do you manage package dependencies and prevent supply-chain attacks?",
a:"Lock files committed and verified in CI (npm ci, not npm install). Dependabot or Renovate for automated security-patching PRs. npm audit in CI gate. Private registry (Artifactory, Verdaccio) proxies public npm -- allows package vetting before use. Package allowlist enforced via ESLint import rules. SBOM (Software Bill of Materials) generated at release. For critical packages: integrity check via package-lock.json SHA verification. Never `--force` install in CI.",
tags:[{t:'Renovate',c:'#eff6ff',b:'#3b82f6'},{t:'npm audit',c:'#ecfdf5',b:'#059669'},{t:'SBOM',c:'#fdf4ff',b:'#a855f7'}]},
{id:42,cat:'infra',q:"Explain feature flags architecture in a frontend application.",
a:"Feature flag service (LaunchDarkly, Unleash, custom) evaluated server-side or at the edge to avoid layout shift. Client SDK fetches flag values on boot and streams updates. Never evaluate flags inside render -- evaluate once at route/feature level and pass as props. Flag types: release flags (on/off per environment), experiment flags (A/B%, analytics), ops flags (kill switch), permission flags (role-based). Remove old flags within 2 sprints after full rollout -- flag debt is real.",
tags:[{t:'LaunchDarkly',c:'#fef9c3',b:'#d97706'},{t:'A/B Testing',c:'#eff6ff',b:'#3b82f6'},{t:'Kill Switch',c:'#fef2f2',b:'#ef4444'}]},
{id:43,cat:'infra',q:"How do you set up a monorepo for 20+ frontend packages?",
a:"Tooling: pnpm workspaces (best disk efficiency via hard links) + Turborepo (task orchestration, remote cache) or NX (richer project graph, generators). Directory structure: apps/ for deployable apps, packages/ for shared libraries, tools/ for internal scripts. Consistent tsconfig, eslint, prettier configs via a `config` base package. Changesets for coordinated versioning and changelog generation. Internal packages use workspace: protocol links -- never publish to npm unless intended.",
tags:[{t:'pnpm workspaces',c:'#eff6ff',b:'#3b82f6'},{t:'Turborepo',c:'#fdf4ff',b:'#a855f7'},{t:'Changesets',c:'#ecfdf5',b:'#059669'}]},
{id:44,cat:'infra',q:"How do you handle A/B testing without degrading performance?",
a:"Server-side or edge-side assignment (Cloudflare Worker, Next.js Middleware) assigns variant before HTML is sent -- zero layout shift. Variant determines what HTML is generated, not a client-side DOM swap. Client-side A/B (Google Optimize) causes CLS and flicker -- avoid for visual changes. Analytics: fire impression events with experiment ID and variant. Statistical significance: Bayesian or frequentist depending on traffic volume. Minimum detectable effect defined before running the test.",
tags:[{t:'Edge Experiments',c:'#ecfdf5',b:'#059669'},{t:'No CLS',c:'#eff6ff',b:'#3b82f6'},{t:'Bayesian',c:'#fdf4ff',b:'#a855f7'}]},
{id:45,cat:'infra',q:"What is Module Federation and how does it enable independent deployments?",
a:"Webpack 5 Module Federation allows a running application (host) to load modules from another running application (remote) at runtime -- without rebuilding. Remote exposes components via exposes config; host declares remotes in its webpack config. Each team deploys independently; the host fetches the latest remote bundle on page load. Shared dependencies (react, react-dom) are deduplicated. Key challenge: contract testing between host and remote to prevent runtime failures from mismatched interfaces.",
tags:[{t:'Webpack 5',c:'#eff6ff',b:'#3b82f6'},{t:'Runtime Sharing',c:'#ecfdf5',b:'#059669'},{t:'Contract Testing',c:'#fdf4ff',b:'#a855f7'}]},
{id:46,cat:'collab',q:"How do you lead a frontend architecture review process?",
a:"RFC (Request for Comments) process: author proposes change with context, options, tradeoffs, decision. 2-week comment period on GitHub/Confluence. Architecture Guild reviews cross-cutting concerns. Decision logged in ADR in the repo. For urgent changes: lightweight RFC with 48h async review. Key: make the cost of raising an RFC low, and make the process transparent. Architects should accelerate, not gatekeep. Favour reversible decisions (try it, roll back if needed) over perfect upfront design.",
tags:[{t:'RFC',c:'#eff6ff',b:'#3b82f6'},{t:'ADR',c:'#fdf4ff',b:'#a855f7'},{t:'Architecture Guild',c:'#fef9c3',b:'#d97706'}]},
{id:47,cat:'collab',q:"How do you balance technical debt against feature delivery?",
a:"Make tech debt visible: track in JIRA as a dedicated issue type with impact (% of velocity lost). Propose the 20% rule -- one day per sprint for debt. Opportunistic refactoring: 'boy scout rule' (leave code cleaner than you found it) for high-traffic files. 'Tech debt mortgage': take on controlled debt with an explicit payback plan. For critical debt: business case framing -- 'this is costing us X hours/week, investing Y sprint to fix saves Z per quarter'. Never sneak refactoring into unrelated PRs.",
tags:[{t:'Tech Debt',c:'#fef2f2',b:'#ef4444'},{t:'Boy Scout Rule',c:'#ecfdf5',b:'#059669'},{t:'20% Rule',c:'#eff6ff',b:'#3b82f6'}]},
{id:48,cat:'collab',q:"How do you onboard senior engineers to frontend architecture conventions?",
a:"Architecture tour: 1-hour walkthrough of key decisions with the relevant ADRs. Assign a buddy with architectural context for first 30 days. 'Day-1 runbook': local setup, test run, first PR -- validated monthly to stay current. Pair on the first cross-cutting change. Encourage questions in architecture Slack channel. Run 'Why did we do this?' sessions for legacy decisions -- demystifies conventions and reduces cargo-culting. Self-paced Architecture 101 guide with exercises.",
tags:[{t:'ADR',c:'#fdf4ff',b:'#a855f7'},{t:'Onboarding',c:'#eff6ff',b:'#3b82f6'},{t:'Pair Programming',c:'#ecfdf5',b:'#059669'}]},
{id:49,cat:'collab',q:"How do you communicate technical decisions to non-technical stakeholders?",
a:"Lead with impact, not implementation: 'This reduces page load by 40%, improving conversion' not 'We're switching from webpack to Vite'. Use analogies for architecture: micro-frontends = 'each team owns their own shop in a mall, the mall provides shared infrastructure'. For trade-off decisions: present as a business decision with options + costs. Write a 1-page Decision Brief for senior stakeholders (problem, options, recommendation, cost, risk). Follow up with outcome metrics.",
tags:[{t:'Decision Brief',c:'#fef9c3',b:'#d97706'},{t:'Impact First',c:'#eff6ff',b:'#3b82f6'},{t:'Metrics',c:'#ecfdf5',b:'#059669'}]},
{id:50,cat:'collab',q:"How do you mentor junior developers to think architecturally?",
a:"Ask 'why' before 'how' -- consistently. Code review feedback should explain the architectural concern, not just request a change. Assign progressively complex tasks: start with component ownership, then feature ownership, then cross-team API design. Architecture book club (Clean Architecture, Building Microservices). Shadowing on RFC reviews. Give juniors the opportunity to present their technical decisions to the team -- builds confidence and forces clear thinking. Celebrate good architecture in team demos.",
tags:[{t:'Code Review',c:'#eff6ff',b:'#3b82f6'},{t:'Mentoring',c:'#fdf4ff',b:'#a855f7'},{t:'RFC',c:'#ecfdf5',b:'#059669'}]},
{id:51,cat:'collab',q:"How do you handle a situation where product wants a feature that compromises architecture?",
a:"Never say no without an alternative. Document the architectural concern concretely: 'This approach creates a circular dependency that will require a rewrite in 6 months'. Quantify the debt: 'This will cost 2 sprint weeks to unwind'. Offer a path: 'We can meet the deadline by doing X now, with a follow-up ticket Y by [date]'. Escalate if the risk is significant enough. Accept that sometimes pragmatism wins -- document the decision and the payback plan. Revisit the architectural concern in the next planning cycle.",
tags:[{t:'Risk Communication',c:'#fef2f2',b:'#ef4444'},{t:'Pragmatism',c:'#fef9c3',b:'#d97706'},{t:'Trade-off',c:'#eff6ff',b:'#3b82f6'}]},
{id:52,cat:'collab',q:"How do you keep a frontend architecture documentation current?",
a:"'Docs as Code': architecture docs live in the same repo as the code (docs/ or .adr/ folder). PR reviews include docs update as acceptance criteria for architectural changes. ADRs are append-only -- superseded decisions are marked, never deleted. Architecture diagram as code (Mermaid, PlantUML, C4 model) -- renders in GitHub/GitLab and is version-controlled. Monthly architecture review meeting audits top-level diagrams. Avoid Confluence drift: use it for decision context, not current-state documentation.",
tags:[{t:'Docs as Code',c:'#eff6ff',b:'#3b82f6'},{t:'C4 Model',c:'#fdf4ff',b:'#a855f7'},{t:'Mermaid',c:'#ecfdf5',b:'#059669'}]},
{id:53,cat:'security',q:"How do you prevent XSS in a React application?",
a:"React's JSX escapes all string values by default -- the primary protection. Never use dangerouslySetInnerHTML without sanitising with DOMPurify. Never use eval() or new Function() with user-controlled input. Content Security Policy (CSP) as defence-in-depth: `script-src 'self'` blocks injected inline scripts. HttpOnly cookies prevent script access to session tokens. Store nothing sensitive in localStorage (XSS steals it). Regular dependency audits for libraries that manipulate the DOM.",
tags:[{t:'DOMPurify',c:'#fef2f2',b:'#ef4444'},{t:'CSP',c:'#eff6ff',b:'#3b82f6'},{t:'HttpOnly',c:'#ecfdf5',b:'#059669'}]},
{id:54,cat:'security',q:"Explain the Same-Origin Policy and its impact on frontend architecture.",
a:"SOP prevents a script from origin A from reading responses from origin B. CORS allows the server to whitelist cross-origin requests. Frontend impact: API calls to a different domain require CORS headers from the server. Architecture consequence: same-origin APIs are simpler and more secure -- consider routing API calls through the same origin via a BFF (Backend for Frontend) proxy. Never set Access-Control-Allow-Origin:* for credentialed requests. Pre-flight OPTIONS requests add latency -- use simple requests where possible.",
tags:[{t:'CORS',c:'#eff6ff',b:'#3b82f6'},{t:'BFF Pattern',c:'#fdf4ff',b:'#a855f7'},{t:'Pre-flight',c:'#ecfdf5',b:'#059669'}]},
{id:55,cat:'security',q:"How do you implement secure authentication flows in a SPA?",
a:"Auth Code + PKCE flow (not implicit flow -- never expose tokens in URL hash). Auth server issues short-lived access tokens (15 min) and longer refresh tokens (7 days). Store tokens in memory (React state or Zustand), NOT localStorage. HttpOnly Secure cookie for refresh token -- JavaScript cannot read it, XSS-safe. Silent refresh: before access token expires, fetch new one in a hidden iframe or via refresh token endpoint. Logout: revoke refresh token server-side, clear all in-memory state.",
diagram:[
[{txt:'Login -> Auth Server',c:'#eff6ff',b:'#3b82f6'},{arr:'PKCE'},{txt:'Auth Code',c:'#fef9c3',b:'#d97706'}], [{txt:'Exchange Code',c:'#fdf4ff',b:'#a855f7'},{arr:'->'},{txt:'Access Token (memory)',c:'#ecfdf5',b:'#059669'}], [{txt:'Refresh Token',c:'#ecfdf5',b:'#059669'},{arr:'HttpOnly Cookie'},{txt:'Auto-refreshed silently',c:'#eff6ff',b:'#3b82f6'}],
],
tags:[{t:'PKCE',c:'#eff6ff',b:'#3b82f6'},{t:'Silent Refresh',c:'#ecfdf5',b:'#059669'},{t:'HttpOnly',c:'#fdf4ff',b:'#a855f7'}]},
{id:56,cat:'security',q:"What security headers should every production frontend set?",
a:"Content-Security-Policy: restrict script/style/frame origins. Strict-Transport-Security: max-age=31536000;includeSubDomains -- forces HTTPS. X-Frame-Options:DENY prevents clickjacking. X-Content-Type-Options:nosniff prevents MIME type sniffing attacks. Referrer-Policy:strict-origin-when-cross-origin prevents sensitive URL leakage. Permissions-Policy restricts camera/mic/geo access. Set via reverse proxy (Nginx/Cloudflare) not from the SPA -- SPAs can't set response headers for their own HTML.",
tags:[{t:'CSP',c:'#eff6ff',b:'#3b82f6'},{t:'HSTS',c:'#ecfdf5',b:'#059669'},{t:'X-Frame-Options',c:'#fef2f2',b:'#ef4444'}]},
{id:57,cat:'security',q:"How do you protect against CSRF attacks in a modern SPA?",
a:"SameSite=Strict on session cookies prevents the cookie from being sent in cross-site requests -- the primary protection for modern browsers. Double-submit cookie pattern for older browser support: SPA reads a non-HttpOnly CSRF token from a cookie and sends it as a custom request header -- cross-origin requests can't read cookies, so the attacker can't replicate the header. Custom headers alone (X-Requested-With:XMLHttpRequest) also trigger CORS pre-flight blocking most cross-site POST requests.",
tags:[{t:'SameSite',c:'#ecfdf5',b:'#059669'},{t:'Double-Submit Cookie',c:'#eff6ff',b:'#3b82f6'},{t:'Custom Headers',c:'#fdf4ff',b:'#a855f7'}]},
{id:58,cat:'security',q:"How do you secure environment variables and secrets in a frontend build pipeline?",
a:"NEVER embed server-side secrets in frontend bundles -- they're public. Only expose values the browser genuinely needs (API base URLs, public keys). Use CI/CD secret stores (GitHub Secrets, HashiCorp Vault) injected as env vars at build time. Rotate secrets regularly. Audit built artifacts: grep bundle files for known secret patterns before deploy. For tenant-specific config: serve from an authenticated /config endpoint, not baked into the bundle. Runtime config over build-time config where possible.",
tags:[{t:'Vault',c:'#fef2f2',b:'#ef4444'},{t:'CI Secrets',c:'#eff6ff',b:'#3b82f6'},{t:'Bundle Audit',c:'#ecfdf5',b:'#059669'}]},
{id:59,cat:'security',q:"Explain Subresource Integrity (SRI) and when to use it.",
a:"SRI adds a cryptographic hash to &lt;script> and <link> tags. The browser verifies the fetched resource matches the hash before executing it. Prevents CDN compromise attacks -- if a CDN is hijacked and serves malicious JS, SRI blocks it. Use for all third-party scripts loaded from CDNs (Google Fonts, analytics). Generate hashes with `openssl dgst -sha384 -binary`. Limitation: SRI breaks if the CDN serves different content per user (like personalised bundles). Must update hash on every resource version change.",
tags:[{t:'SRI',c:'#eff6ff',b:'#3b82f6'},{t:'CDN Security',c:'#fef2f2',b:'#ef4444'},{t:'Supply Chain',c:'#ecfdf5',b:'#059669'}]},
{id:60,cat:'security',q:"How do you conduct a frontend security audit before a major release?",
a:"Pre-release security checklist: (1) npm audit -- no critical vulnerabilities. (2) OWASP ZAP or Burp Suite scan against staging. (3) Manual review of all places user input reaches innerHTML or eval. (4) Verify CSP headers are set correctly and tested (CSP Evaluator). (5) Auth flow penetration test (token leakage, privilege escalation). (6) Check all API calls use HTTPS in prod config. (7) Review bundle for accidentally embedded secrets. (8) Verify CORS configuration rejects disallowed origins. Document findings and severities -- P0/P1 block release.",
tags:[{t:'OWASP ZAP',c:'#fef2f2',b:'#ef4444'},{t:'Pen Testing',c:'#eff6ff',b:'#3b82f6'},{t:'CSP Evaluator',c:'#ecfdf5',b:'#059669'}]},
// ── React & Redux (20 questions) ─────────────────────────────────────────────
{id:61,cat:'react-redux',q:"What is the difference between controlled and uncontrolled components in React?",a:"Controlled components store form data in React state — every change triggers setState, giving full control over input values and allowing validation, formatting, or conditional disabling. Uncontrolled components let the DOM manage state; values are read via a ref when needed. Controlled is preferred for most forms because it enables real-time validation and predictable rendering. Uncontrolled is useful for integrating with third-party DOM libraries or large forms where performance is critical.",tags:[{t:'useState',c:'#eff6ff',b:'#3b82f6'},{t:'useRef',c:'#fdf4ff',b:'#a855f7'},{t:'Forms',c:'#ecfdf5',b:'#059669'}]},
{id:62,cat:'react-redux',q:"Explain React's reconciliation algorithm and the role of keys.",a:"React's reconciler (Fiber) diffs the previous and next virtual DOM trees to determine the minimum set of DOM mutations. It compares elements at the same tree position by type. Within lists, keys allow React to map old nodes to new positions without re-mounting. Stable keys (e.g. item.id) preserve component state and avoid unnecessary reconciliation. Unstable keys (e.g. array index when list items reorder) cause full remounts, destroying state and degrading performance.",tags:[{t:'Virtual DOM',c:'#eff6ff',b:'#3b82f6'},{t:'Keys',c:'#fef9c3',b:'#d97706'},{t:'Fiber',c:'#ede9fe',b:'#8b7ae8'}]},
{id:63,cat:'react-redux',q:"How do you prevent unnecessary re-renders in React?",a:"Use React.memo() to memoise functional components. useMemo() caches expensive computed values; useCallback() stabilises function references. Colocate state close to where it is used. Avoid creating new object/array literals in JSX props inline. Split large context values into multiple contexts so consumers only re-render when their slice changes. Use Zustand or Jotai for fine-grained external state subscriptions.",tags:[{t:'React.memo',c:'#eff6ff',b:'#3b82f6'},{t:'useMemo',c:'#ede9fe',b:'#8b7ae8'},{t:'useCallback',c:'#ecfdf5',b:'#059669'}]},
{id:64,cat:'react-redux',q:"What is Redux Toolkit and why is it the recommended approach for Redux today?",a:"Redux Toolkit (RTK) eliminates Redux boilerplate. createSlice() generates action creators and reducer using Immer for immutable updates. configureStore() wires up Redux DevTools and redux-thunk. createAsyncThunk() handles loading/error/success states for async operations. RTK Query provides data-fetching and caching. RTK reduces a typical Redux setup from hundreds of lines to tens while maintaining all benefits.",tags:[{t:'createSlice',c:'#ede9fe',b:'#8b7ae8'},{t:'RTK Query',c:'#eff6ff',b:'#3b82f6'},{t:'Immer',c:'#ecfdf5',b:'#059669'}]},
{id:65,cat:'react-redux',q:"How does the React Context API differ from Redux and when should you use each?",a:"Context API is built into React and suited for low-frequency, broadly shared values: theme, locale, auth user, feature flags. It re-renders all consumers on every context value change, making it inefficient for high-frequency state. Redux provides a single external store with selector-based subscriptions — components only re-render when their selected slice changes. Use Context for configuration/settings; use Redux/Zustand for complex application state with frequent updates.",tags:[{t:'Context API',c:'#eff6ff',b:'#3b82f6'},{t:'Redux',c:'#ede9fe',b:'#8b7ae8'},{t:'Zustand',c:'#ecfdf5',b:'#059669'}]},
{id:66,cat:'react-redux',q:"What are React Server Components and how do they change the mental model?",a:"React Server Components (RSC) execute on the server and send serialised UI — not JS — to the client. They can directly access databases and secrets without a client API round-trip and have zero client-side JS footprint. The mental model shifts: data-heavy, non-interactive leaves should be Server Components; interactive components with event handlers and state are Client Components ('use client'). This enables dramatic bundle size reductions.",tags:[{t:'RSC',c:'#eff6ff',b:'#3b82f6'},{t:'use client',c:'#ede9fe',b:'#8b7ae8'},{t:'Streaming',c:'#ecfdf5',b:'#059669'}]},
{id:67,cat:'react-redux',q:"Explain the useReducer hook and when it is preferable to useState.",a:"useReducer(reducer, initialState) manages state via a dispatch function that sends action objects to a pure reducer. Prefer it over useState when: state transitions are complex, multiple sub-values must update atomically, or you want testable state logic isolated from the component. It mirrors Redux's reducer pattern at the component level. Combine with useContext to build lightweight local state machines.",tags:[{t:'useReducer',c:'#ede9fe',b:'#8b7ae8'},{t:'Dispatch',c:'#eff6ff',b:'#3b82f6'},{t:'State Machine',c:'#ecfdf5',b:'#059669'}]},
{id:68,cat:'react-redux',q:"How do you implement code splitting and lazy loading in a React application?",a:"Use React.lazy() with dynamic import() to split components into separate bundles: const Chart = React.lazy(() => import('./Chart')). Wrap lazy components in Suspense with a fallback. Route-based splitting is the highest-impact strategy. Use webpackChunkName for named chunks. Next.js provides next/dynamic for SSR-compatible lazy loading. Measure impact with webpack-bundle-analyzer.",tags:[{t:'React.lazy',c:'#eff6ff',b:'#3b82f6'},{t:'Suspense',c:'#ede9fe',b:'#8b7ae8'},{t:'Code Splitting',c:'#ecfdf5',b:'#059669'}]},
{id:69,cat:'react-redux',q:"What is React Fiber and what problems did it solve?",a:"React Fiber is the reconciliation engine introduced in React 16. It rewrites rendering as a linked list of fiber units of work that can be interrupted, paused, prioritised, and resumed. Before Fiber, the stack-based reconciler ran to completion, blocking the main thread. Fiber enables Concurrent Mode: React can interrupt a low-priority render when a high-priority update arrives. It also enables Suspense, time-slicing, and React Server Components.",tags:[{t:'Fiber',c:'#ede9fe',b:'#8b7ae8'},{t:'Concurrent Mode',c:'#eff6ff',b:'#3b82f6'},{t:'Scheduler',c:'#ecfdf5',b:'#059669'}]},
{id:70,cat:'react-redux',q:"How do you handle side effects with Redux-Saga vs Redux Thunk?",a:"Redux Thunk: action creators return async functions that dispatch further actions. Ideal for straightforward fetch/update flows. Redux-Saga uses ES6 generators to handle side effects as declarable effects (call, put, take, fork, race) making complex async flows (retry, parallel fetches, cancellation, debounce, race conditions) easy to test. Choose Thunk for CRUD apps; choose Saga for complex async workflows like multi-step wizards or WebSocket orchestration.",tags:[{t:'Redux-Saga',c:'#fef9c3',b:'#d97706'},{t:'Generators',c:'#eff6ff',b:'#3b82f6'},{t:'Effects',c:'#ede9fe',b:'#8b7ae8'}]},
{id:71,cat:'react-redux',q:"Explain React Strict Mode and its purpose in development.",a:"React.StrictMode activates additional runtime warnings. It double-invokes render methods and hooks to surface impure logic. It detects deprecated lifecycle methods, legacy string refs, and findDOMNode usage. In React 18+, Strict Mode simulates unmounting and remounting components to expose bugs with missing useEffect cleanup. It runs only in development — no production overhead. Essential for detecting subtle bugs before production.",tags:[{t:'StrictMode',c:'#eff6ff',b:'#3b82f6'},{t:'Development',c:'#ecfdf5',b:'#059669'},{t:'useEffect',c:'#ede9fe',b:'#8b7ae8'}]},
{id:72,cat:'react-redux',q:"What is the React Compiler (React Forget) and what does it automate?",a:"The React Compiler (shipping in React 19) automatically applies memoisation at compile time. It analyses component and hook code to determine which values and functions are stable, then wraps them in the equivalent of useMemo/useCallback. This eliminates common performance mistakes and reduces cognitive overhead. Teams can delete most manual useMemo/useCallback calls. The compiler only applies to code following the Rules of React.",tags:[{t:'React Compiler',c:'#eff6ff',b:'#3b82f6'},{t:'Auto-memo',c:'#ede9fe',b:'#8b7ae8'},{t:'React 19',c:'#ecfdf5',b:'#059669'}]},
{id:73,cat:'react-redux',q:"How do you implement optimistic UI updates in React?",a:"Optimistic updates immediately reflect the expected result before the server confirms. Pattern: update UI first, fire async request, on success do nothing extra, on failure revert and show an error. React 19's useOptimistic() hook manages this natively — accepts current state and an update function, returns an optimistic value automatically rolled back on failure. For Redux, update the store optimistically in the action and revert in the rejected case of createAsyncThunk.",tags:[{t:'useOptimistic',c:'#ecfdf5',b:'#059669'},{t:'RTK',c:'#ede9fe',b:'#8b7ae8'},{t:'UX Pattern',c:'#eff6ff',b:'#3b82f6'}]},
{id:74,cat:'react-redux',q:"Describe the render props pattern and its modern alternatives.",a:"Render props share logic by passing a function as a prop that a component calls to render output: <DataLoader render={(data) => <Table data={data}/>}/>. Solved cross-cutting concerns before hooks. Downsides: callback hell, readability, new function reference every render. Modern alternatives: Custom Hooks (useXxx returning values/handlers) are far cleaner. Headless component pattern (Radix, Headless UI) decouples behaviour from markup without render props.",tags:[{t:'Render Props',c:'#fef9c3',b:'#d97706'},{t:'Custom Hooks',c:'#eff6ff',b:'#3b82f6'},{t:'Headless UI',c:'#ede9fe',b:'#8b7ae8'}]},
{id:75,cat:'react-redux',q:"How does React batching work and what changed in React 18?",a:"Batching groups multiple setState calls into a single re-render. Before React 18, batching only happened inside React event handlers — calls inside setTimeout or Promises triggered separate re-renders. React 18 introduces Automatic Batching: all setState calls regardless of context are batched automatically, reducing renders significantly. To opt out, use flushSync(() => setState(...)). ReactDOM.createRoot() is required to enable React 18 batching.",tags:[{t:'Auto Batching',c:'#eff6ff',b:'#3b82f6'},{t:'React 18',c:'#ede9fe',b:'#8b7ae8'},{t:'flushSync',c:'#ecfdf5',b:'#059669'}]},
{id:76,cat:'react-redux',q:"How do you manage global state in large React apps without Redux?",a:"Lighter alternatives: Zustand (minimal API, fine-grained subscriptions), Jotai (atomic state model, no providers), React Query/TanStack Query (server state: caching, refetching, optimistic updates). Recommended architecture: React Query for server state, Zustand/Jotai for local UI state, Context API for rare global config. This avoids Redux complexity while solving the same problems.",tags:[{t:'Zustand',c:'#ecfdf5',b:'#059669'},{t:'Jotai',c:'#eff6ff',b:'#3b82f6'},{t:'TanStack Query',c:'#ede9fe',b:'#8b7ae8'}]},
{id:77,cat:'react-redux',q:"What are the Rules of Hooks and why do they exist?",a:"Two rules: (1) Only call hooks at the top level — never inside conditions, loops, or nested functions. (2) Only call hooks from React function components or custom hooks. These rules exist because React identifies hooks by their call order — the nth hook call always corresponds to the nth entry in an internal array. Conditional calls corrupt this ordering between renders. eslint-plugin-react-hooks enforces both rules statically.",tags:[{t:'eslint-plugin-react-hooks',c:'#eff6ff',b:'#3b82f6'},{t:'Call Order',c:'#ede9fe',b:'#8b7ae8'},{t:'Custom Hooks',c:'#ecfdf5',b:'#059669'}]},
{id:78,cat:'react-redux',q:"How do you test Redux reducers, actions, and connected components?",a:"Reducers are pure functions — test by calling reducer(state, action) and asserting on returned state. Test thunks by mocking the API layer and asserting dispatched actions using configureStore() + dispatch. For connected components: use Provider with a real or mock store. Prefer testing behaviour — render the component, interact, and assert UI output. RTK Query: use setupServer (MSW) to mock API endpoints.",tags:[{t:'Jest',c:'#eff6ff',b:'#3b82f6'},{t:'RTK',c:'#ede9fe',b:'#8b7ae8'},{t:'Testing Library',c:'#ecfdf5',b:'#059669'}]},
{id:79,cat:'react-redux',q:"What is Concurrent Mode in React 18 and what features does it enable?",a:"Concurrent Mode allows React to prepare multiple UI versions simultaneously and interrupt rendering for higher-priority updates. Key APIs: startTransition() marks a state update as non-urgent — React can defer it if urgent updates arrive. useTransition() and useDeferredValue() expose this to components. Suspense for data fetching streams UI progressively. Together these enable faster perceived performance and responsive input without manual optimisation.",tags:[{t:'startTransition',c:'#eff6ff',b:'#3b82f6'},{t:'Suspense',c:'#ede9fe',b:'#8b7ae8'},{t:'useTransition',c:'#ecfdf5',b:'#059669'}]},
{id:80,cat:'react-redux',q:"Explain error boundaries in React and their current limitations.",a:"Error boundaries are class components implementing componentDidCatch and/or getDerivedStateFromError that catch rendering errors in their subtree and display a fallback UI. They do NOT catch: errors in event handlers, async errors, errors in the boundary itself, or SSR errors. React 19 adds error handling in async Server Actions. react-error-boundary provides a cleaner functional API. Best practice: add boundaries at route level and around high-risk third-party widgets.",tags:[{t:'componentDidCatch',c:'#fef2f2',b:'#ef4444'},{t:'Fallback UI',c:'#eff6ff',b:'#3b82f6'},{t:'react-error-boundary',c:'#ecfdf5',b:'#059669'}]},
// ── JavaScript ES6+ (20 questions) ──────────────────────────────────────────
{id:81,cat:'javascript',q:"Explain the JavaScript event loop, call stack, and microtask queue.",a:"The call stack executes synchronous code frame by frame. When empty, the event loop checks queues. The microtask queue (Promise callbacks, queueMicrotask, MutationObserver) is fully drained before any macrotask runs. Macrotasks (setTimeout, setInterval, I/O) run one at a time, each followed by a full microtask drain. Chaining many Promise.resolve() callbacks can starve the macrotask queue.",tags:[{t:'Event Loop',c:'#eff6ff',b:'#3b82f6'},{t:'Microtasks',c:'#ede9fe',b:'#8b7ae8'},{t:'Promises',c:'#ecfdf5',b:'#059669'}]},
{id:82,cat:'javascript',q:"What is the difference between var, let, and const?",a:"var is function-scoped, hoisted (initialised as undefined), and leaks out of blocks. let and const are block-scoped and in the Temporal Dead Zone (TDZ) until their declaration — accessing before declaration throws ReferenceError. const prevents re-assignment but does not make objects/arrays immutable. Use const by default, let when you need re-assignment, and never var in modern code.",tags:[{t:'Hoisting',c:'#fef9c3',b:'#d97706'},{t:'TDZ',c:'#fef2f2',b:'#ef4444'},{t:'Block Scope',c:'#eff6ff',b:'#3b82f6'}]},
{id:83,cat:'javascript',q:"How does prototypal inheritance work in JavaScript?",a:"Every object has an internal [[Prototype]] link. When accessing a property, the engine walks the prototype chain until found or null. Constructor functions set the prototype via Fn.prototype. ES6 classes are syntactic sugar — class Dog extends Animal sets Dog.prototype's [[Prototype]] to Animal.prototype. Inheritance is delegation: the object doesn't copy methods, it delegates property lookups up the chain at runtime.",tags:[{t:'Prototype Chain',c:'#eff6ff',b:'#3b82f6'},{t:'Object.create',c:'#ede9fe',b:'#8b7ae8'},{t:'Classes',c:'#ecfdf5',b:'#059669'}]},
{id:84,cat:'javascript',q:"What are closures and give a practical use case.",a:"A closure is the combination of a function and the lexical environment in which it was defined. The inner function retains references to outer scope variables even after the outer function returns. Uses: (1) Data encapsulation/private variables via factory functions. (2) Partial application/currying. (3) Event handler factories capturing loop variables. (4) Memoisation caching results in a closed-over Map. Common pitfall: closures in loops all sharing the same variable (fix: use let or IIFE).",tags:[{t:'Closures',c:'#eff6ff',b:'#3b82f6'},{t:'Lexical Scope',c:'#ede9fe',b:'#8b7ae8'},{t:'Encapsulation',c:'#ecfdf5',b:'#059669'}]},
{id:85,cat:'javascript',q:"Explain Promise.all, Promise.allSettled, Promise.race, and Promise.any.",a:"Promise.all: resolves when ALL resolve; rejects immediately if ANY rejects. Use for parallel dependent tasks. Promise.allSettled: waits for ALL to settle, returns array of {status, value/reason}. Use when you want all results regardless of failures. Promise.race: resolves/rejects with the FIRST settled promise. Use for timeouts. Promise.any: resolves with the FIRST fulfilled; rejects with AggregateError only if ALL reject. Use for fastest-of-N-sources.",tags:[{t:'Promise.all',c:'#ecfdf5',b:'#059669'},{t:'Promise.race',c:'#fef9c3',b:'#d97706'},{t:'Promise.any',c:'#eff6ff',b:'#3b82f6'}]},
{id:86,cat:'javascript',q:"What are generators and iterators in JavaScript?",a:"An iterator implements next() returning {value, done}. An iterable implements Symbol.iterator. Generators (function*) produce iterators automatically — yield pauses execution and returns a value. Use cases: lazy evaluation of infinite sequences, Redux-Saga, custom iteration, coroutine-style async code. The for...of loop, spread operator, and destructuring all use Symbol.iterator under the hood.",tags:[{t:'Generators',c:'#ede9fe',b:'#8b7ae8'},{t:'Iterators',c:'#eff6ff',b:'#3b82f6'},{t:'Symbol.iterator',c:'#ecfdf5',b:'#059669'}]},
{id:87,cat:'javascript',q:"How does async/await work under the hood?",a:"async/await is syntactic sugar over Promises and generators. An async function always returns a Promise. await pauses the async function (non-blocking) until the awaited Promise settles, then resumes with the resolved value or throws on rejection. The JS engine transforms async functions into state machines. Common pitfalls: forgetting await (returns a Promise not the value); sequential awaits in loops (use Promise.all for parallel); unhandled rejections.",tags:[{t:'async/await',c:'#eff6ff',b:'#3b82f6'},{t:'Promises',c:'#ede9fe',b:'#8b7ae8'},{t:'Error Handling',c:'#fef2f2',b:'#ef4444'}]},
{id:88,cat:'javascript',q:"What are WeakMap and WeakSet and when would you use them?",a:"WeakMap keys must be objects; the key-value pair is garbage-collected when the key has no other references. WeakSet stores objects, automatically removing them when GC'd. Neither is iterable. Use WeakMap to associate metadata with DOM nodes or third-party objects without preventing GC. WeakSet to track a set of objects without creating memory leaks. Regular Map/Set hold strong references and prevent GC.",tags:[{t:'WeakMap',c:'#eff6ff',b:'#3b82f6'},{t:'Memory Management',c:'#fef9c3',b:'#d97706'},{t:'GC',c:'#ecfdf5',b:'#059669'}]},
{id:89,cat:'javascript',q:"Explain the Proxy and Reflect APIs.",a:"Proxy wraps an object and intercepts fundamental operations (get, set, has, deleteProperty, apply) via handler traps. Reflect provides the default implementation for each trap. Use cases: (1) Vue 3 reactivity — intercept property writes to trigger re-renders. (2) Validation — intercept set traps to enforce schemas. (3) Logging/profiling. (4) Mocking and testing. Proxy enables powerful meta-programming; Reflect ensures correct forwarding.",tags:[{t:'Proxy',c:'#ede9fe',b:'#8b7ae8'},{t:'Reflect',c:'#eff6ff',b:'#3b82f6'},{t:'Meta-programming',c:'#ecfdf5',b:'#059669'}]},
{id:90,cat:'javascript',q:"How does JavaScript's 'this' keyword work in different contexts?",a:"'this' is dynamically bound at call time, not at definition time (except arrow functions). Rules: (1) Global: window or globalThis. (2) Method call obj.method(): this is obj. (3) Plain function call: undefined (strict mode) or global. (4) new Constructor(): this is the new object. (5) call/apply/bind: explicitly set. (6) Arrow functions: lexically inherit this. Common pitfall: extracting a method as callback loses its this (fix: .bind(this) or arrow wrapper).",tags:[{t:'this binding',c:'#eff6ff',b:'#3b82f6'},{t:'Arrow functions',c:'#ede9fe',b:'#8b7ae8'},{t:'bind/call/apply',c:'#ecfdf5',b:'#059669'}]},
{id:91,cat:'javascript',q:"What are the main ES2022–ES2024 features every senior developer should know?",a:"ES2022: Array.at(-1), Object.hasOwn(), class static blocks, top-level await, Error.cause, private class fields (#). ES2023: Array.findLast(), Array.toSorted/toReversed/toSpliced (non-mutating), WeakMap with Symbol keys. ES2024: Promise.withResolvers(), Object.groupBy() / Map.groupBy() for data grouping, Atomics.waitAsync, RegExp v flag. Staying current matters for bundle size (can remove polyfills) and developer ergonomics.",tags:[{t:'ES2022',c:'#eff6ff',b:'#3b82f6'},{t:'ES2024',c:'#ede9fe',b:'#8b7ae8'},{t:'Modern JS',c:'#ecfdf5',b:'#059669'}]},
{id:92,cat:'javascript',q:"How does memory management and garbage collection work in JavaScript?",a:"JS uses automatic GC. V8 uses generational GC: short-lived objects in young generation (fast Scavenger); long-lived objects promoted to old generation (Mark-and-Sweep). Objects reachable from roots (global, call stack, closures) are kept. Common leaks: accidental globals, forgotten timers/event listeners, detached DOM nodes held by closures, growing caches without eviction. Tools: Chrome Memory tab, heap snapshots, allocation timelines.",tags:[{t:'V8 GC',c:'#ecfdf5',b:'#059669'},{t:'Memory Leaks',c:'#fef2f2',b:'#ef4444'},{t:'Heap Snapshot',c:'#eff6ff',b:'#3b82f6'}]},
{id:93,cat:'javascript',q:"What is the module system in JavaScript and how do ES Modules differ from CommonJS?",a:"ES Modules use static import/export analysed at parse time — enabling tree-shaking, live bindings, and top-level await. Imports are asynchronous. CommonJS uses synchronous require() — blocking, run-time evaluation. CJS exports are object copies, not live bindings. ESM is the standard for browsers and modern Node.js. In Node, .mjs or 'type':'module' activates ESM. Bundlers handle both at build time.",tags:[{t:'ESM',c:'#eff6ff',b:'#3b82f6'},{t:'CJS',c:'#ede9fe',b:'#8b7ae8'},{t:'Tree-shaking',c:'#ecfdf5',b:'#059669'}]},
{id:94,cat:'javascript',q:"Explain debounce and throttle and when to use each.",a:"Debounce delays execution until after a specified idle period — timer resets on every call. Use for search-as-you-type, window resize, form validation. Throttle ensures a function executes at most once per interval. Use for scroll events, mousemove tracking, infinite scroll, rate-limiting API calls. Both improve performance by reducing call frequency. React apps commonly use these in custom hooks with useCallback for stable references.",tags:[{t:'Debounce',c:'#eff6ff',b:'#3b82f6'},{t:'Throttle',c:'#ede9fe',b:'#8b7ae8'},{t:'Performance',c:'#ecfdf5',b:'#059669'}]},
{id:95,cat:'javascript',q:"What is TypeScript and what are its key advantages over plain JavaScript?",a:"TypeScript is a statically typed superset of JavaScript that compiles to plain JS. Advantages: (1) Catch type errors at compile time. (2) IDE autocomplete, refactoring, and navigation. (3) Self-documenting code. (4) Strict null checks. (5) Structural typing for flexible polymorphism. Key features: generics, utility types (Partial, Readonly, Pick, Omit), discriminated unions, template literal types, conditional types. Enable strict mode incrementally.",tags:[{t:'TypeScript',c:'#eff6ff',b:'#3b82f6'},{t:'Generics',c:'#ede9fe',b:'#8b7ae8'},{t:'Strict Mode',c:'#ecfdf5',b:'#059669'}]},
{id:96,cat:'javascript',q:"What are the differences between == and === in JavaScript and what is type coercion?",a:"=== (strict equality) compares value and type with no coercion: 0 === false is false. == (abstract equality) performs type coercion: 0 == false is true because false coerces to 0. Always use === in production code. Type coercion: '5' - 3 = 2 (numeric) but '5' + 3 = '53' (string concatenation). TypeScript's strict mode catches many coercion pitfalls statically.",tags:[{t:'Type Coercion',c:'#fef9c3',b:'#d97706'},{t:'Strict Equality',c:'#eff6ff',b:'#3b82f6'},{t:'NaN',c:'#fef2f2',b:'#ef4444'}]},
{id:97,cat:'javascript',q:"How do you implement immutability patterns in JavaScript?",a:"Object.freeze() prevents modifications — but only shallow. For deep immutability, use Immer. Spread and Array methods (map, filter, slice, concat) create shallow copies. Immer's produce() uses a draft proxy — you write mutable-looking code but get an immutable result. Structural sharing reuses unchanged branches efficiently. Use Object.assign({}, state, patch) or spread for simple state updates. Immutable.js for persistent data structures.",tags:[{t:'Immer',c:'#eff6ff',b:'#3b82f6'},{t:'Object.freeze',c:'#ede9fe',b:'#8b7ae8'},{t:'Structural Sharing',c:'#ecfdf5',b:'#059669'}]},
{id:98,cat:'javascript',q:"What is the difference between shallow copy and deep copy in JavaScript?",a:"Shallow copy duplicates top-level properties only — nested objects are still referenced. Methods: {...obj}, Object.assign(), Array.from(). Deep copy duplicates the entire object graph. Methods: structuredClone(obj) (native, handles Date/Map/Set/RegExp). JSON.parse(JSON.stringify()) is lossy (drops functions, Date becomes string). Lodash cloneDeep handles edge cases. Use shallow copy for performance-critical paths where nested data is immutable.",tags:[{t:'structuredClone',c:'#eff6ff',b:'#3b82f6'},{t:'Shallow Copy',c:'#ede9fe',b:'#8b7ae8'},{t:'Deep Copy',c:'#ecfdf5',b:'#059669'}]},
{id:99,cat:'javascript',q:"How does destructuring assignment work and what are advanced patterns?",a:"Destructuring extracts values from arrays/objects. Advanced patterns: rename during destructure (const {name: username} = user), default values (const {theme='light'} = prefs), nested destructuring (const {address:{city}} = user), rest elements (const [first,...rest] = arr), parameter destructuring. Computed property names: const {[key]: value} = obj. Used heavily in React hook returns, prop destructuring, and import aliasing.",tags:[{t:'Destructuring',c:'#eff6ff',b:'#3b82f6'},{t:'Spread/Rest',c:'#ede9fe',b:'#8b7ae8'},{t:'Patterns',c:'#ecfdf5',b:'#059669'}]},
{id:100,cat:'javascript',q:"Explain Symbol, BigInt, and the latest primitive types in JavaScript.",a:"Symbol: unique, immutable primitive used as collision-free object keys. Symbol.for() creates shared symbols. Well-known symbols (Symbol.iterator, Symbol.asyncIterator) let objects customise built-in behaviour. BigInt: arbitrary-precision integers for values beyond Number.MAX_SAFE_INTEGER. Suffix n: 9007199254740992n + 1n works correctly. Cannot mix BigInt and Number arithmetic. Use for cryptography, large IDs, financial precision calculations.",tags:[{t:'Symbol',c:'#eff6ff',b:'#3b82f6'},{t:'BigInt',c:'#ede9fe',b:'#8b7ae8'},{t:'Primitives',c:'#ecfdf5',b:'#059669'}]},
// ── System Design (20 questions) ─────────────────────────────────────────────
{id:101,cat:'sysdesign',q:"How do you design a URL shortener like bit.ly at system scale?",a:"Core: (1) URL encoding — hash to 6-8 char base62 string or use distributed ID (Snowflake). (2) Storage — Redis + DynamoDB for fast key-value lookup; shard by short code. (3) Redirect — HTTP 302 for analytics, 301 for caching. (4) Analytics — async Kafka pipeline; don't block redirect. (5) Cache — hot links in Redis (~99% hit). (6) Rate limiting — token bucket per IP/API key. Scale: 100:1 read/write ratio, heavily optimise read path.",tags:[{t:'Distributed ID',c:'#eff6ff',b:'#3b82f6'},{t:'Redis',c:'#fef2f2',b:'#ef4444'},{t:'Base62',c:'#ecfdf5',b:'#059669'}]},
{id:102,cat:'sysdesign',q:"Design a real-time notification system for a social platform.",a:"Components: (1) Notification service receives trigger events via Kafka topics. (2) Fan-out service writes to each recipient's Redis sorted set queue. (3) Delivery: WebSocket for active clients, SSE as fallback, FCM/APNs for mobile. (4) History in Cassandra/DynamoDB partitioned by user_id. (5) Read/unread tracking via Redis bit set. Fan-out-on-write for most users; fan-out-on-read for celebrities with millions of followers.",tags:[{t:'Kafka',c:'#fef2f2',b:'#ef4444'},{t:'WebSockets',c:'#eff6ff',b:'#3b82f6'},{t:'Fan-out',c:'#ede9fe',b:'#8b7ae8'}]},
{id:103,cat:'sysdesign',q:"How would you design a distributed caching layer?",a:"Key decisions: (1) Cache-aside (app checks cache first, populates on miss) vs write-through (sync write to cache and DB) vs write-behind (async DB write). (2) Eviction: LRU for general workloads, LFU for frequency-biased access. (3) TTL: short for user-specific data, long for static. (4) Cache invalidation: TTL expiry, event-driven invalidation, or version keys. (5) Redis Cluster for horizontal scaling with hash slots. Cache invalidation is the hardest problem.",tags:[{t:'Redis',c:'#fef2f2',b:'#ef4444'},{t:'Cache-aside',c:'#eff6ff',b:'#3b82f6'},{t:'Invalidation',c:'#fef9c3',b:'#d97706'}]},
{id:104,cat:'sysdesign',q:"Design a scalable file upload and storage system.",a:"Flow: (1) Client requests presigned S3 URL (never proxy large files through app servers). (2) Client uploads directly to S3. (3) S3 event triggers Lambda for processing (virus scan, thumbnail, metadata). (4) Metadata in PostgreSQL; file reference points to S3 path. (5) CloudFront CDN for delivery. Large files: multi-part upload with progress and resume. Security: validate file type server-side, enforce size limits, scan for malware, token-based access for private files.",tags:[{t:'S3 Presigned URL',c:'#eff6ff',b:'#3b82f6'},{t:'CDN',c:'#ecfdf5',b:'#059669'},{t:'Multi-part Upload',c:'#fef9c3',b:'#d97706'}]},
{id:105,cat:'sysdesign',q:"How do you design a rate limiter at the API gateway level?",a:"Algorithms: (1) Fixed Window — simple counter, subject to burst at boundaries. (2) Sliding Window Log — precise, memory-heavy. (3) Sliding Window Counter — approximation, lower memory. (4) Token Bucket — allows burst up to capacity, then refills at rate R/s. Most common for APIs. (5) Leaky Bucket — smooths output rate. Implementation: Redis INCR + EXPIRE. Enforce at API gateway. Return 429 with Retry-After header.",tags:[{t:'Token Bucket',c:'#eff6ff',b:'#3b82f6'},{t:'Redis',c:'#fef2f2',b:'#ef4444'},{t:'429',c:'#fef9c3',b:'#d97706'}]},
{id:106,cat:'sysdesign',q:"Design a search autocomplete system.",a:"Requirements: sub-100ms latency, prefix matching, typo tolerance, personalisation. Architecture: (1) Offline pipeline aggregates query logs, ranks by frequency/recency, stores top-k suggestions per prefix in Redis sorted set. (2) Online: client sends prefix, backend queries Redis (O(1)). (3) Typo tolerance: BK-tree or fuzzy matching. (4) Personalisation: blend global with user's past queries. (5) Debounce client-side (300ms). (6) CDN-cache common prefixes.",tags:[{t:'Trie',c:'#eff6ff',b:'#3b82f6'},{t:'Redis',c:'#fef2f2',b:'#ef4444'},{t:'Elasticsearch',c:'#fef9c3',b:'#d97706'}]},
{id:107,cat:'sysdesign',q:"How do you design a web analytics platform like Google Analytics?",a:"(1) JS snippet sends events via beacon API (non-blocking). (2) Stateless collectors write to Kafka. (3) Stream processing with Flink aggregates real-time metrics. (4) Batch processing with Spark computes daily aggregates from raw event store. (5) Storage: raw events in S3/Iceberg, aggregates in ClickHouse/BigQuery. (6) Privacy: IP anonymisation, GDPR consent gate. Scale: trillions of events/day requires partitioning and columnar storage.",tags:[{t:'Kafka',c:'#fef2f2',b:'#ef4444'},{t:'ClickHouse',c:'#eff6ff',b:'#3b82f6'},{t:'Flink',c:'#ede9fe',b:'#8b7ae8'}]},
{id:108,cat:'sysdesign',q:"Design a distributed message queue from scratch.",a:"Core: topics (named streams), producers, consumers, partitions (parallelism), offsets (consumer position). Architecture: (1) Broker cluster — each broker owns partitions (leader + replicas). (2) Producer writes to leader; followers replicate. (3) Consumer group — each partition assigned to one consumer. (4) Offset management in a _offsets topic. Delivery: at-most-once, at-least-once (retry), exactly-once (idempotent producer + transactions). Storage: append-only log, segment files. This is Kafka's architecture.",tags:[{t:'Partitions',c:'#fef2f2',b:'#ef4444'},{t:'Offsets',c:'#eff6ff',b:'#3b82f6'},{t:'Replication',c:'#ecfdf5',b:'#059669'}]},
{id:109,cat:'sysdesign',q:"How would you design the backend for a ride-sharing app like Uber?",a:"(1) Location service: drivers send GPS every 4s to WebSocket gateway → Redis GEOADD. (2) Matching: on ride request, GEORADIUS for nearby drivers, rank by ETA. (3) Trip service: state machine (requested → accepted → in-progress → completed). (4) Surge pricing: reads demand/supply ratio per geohash. (5) Push notifications via FCM. (6) Data: PostgreSQL for trips (ACID), Redis for real-time positions, Kafka for event streaming.",tags:[{t:'Redis GEO',c:'#fef2f2',b:'#ef4444'},{t:'Geohash',c:'#eff6ff',b:'#3b82f6'},{t:'WebSockets',c:'#ecfdf5',b:'#059669'}]},
{id:110,cat:'sysdesign',q:"What are the CAP theorem and its implications for distributed systems?",a:"CAP: a distributed system can guarantee only two of Consistency (every read gets the most recent write), Availability (every request gets a response), and Partition Tolerance (operates despite network partitions). Since partitions are unavoidable, choose CP or AP. CP: banks, ZooKeeper, Spanner. AP: DNS, Cassandra, CouchDB. PACELC extends CAP to include latency trade-offs. Most databases offer tunable consistency.",tags:[{t:'CAP Theorem',c:'#eff6ff',b:'#3b82f6'},{t:'Consistency',c:'#ede9fe',b:'#8b7ae8'},{t:'Eventual Consistency',c:'#ecfdf5',b:'#059669'}]},
{id:111,cat:'sysdesign',q:"How do you design an authentication and authorisation system at scale?",a:"Auth: (1) Passwords hashed with Argon2/bcrypt. (2) JWT with RS256, short expiry (15min) + refresh token (HttpOnly cookie). (3) OAuth 2.0 + OIDC for social login/SSO. (4) MFA via TOTP or WebAuthn. Authorisation: RBAC for most systems; ABAC for fine-grained policies; ReBAC (Google Zanzibar) for entity relationships. Centralise enforcement — never duplicate auth logic in each service.",tags:[{t:'JWT',c:'#eff6ff',b:'#3b82f6'},{t:'OAuth 2.0',c:'#ede9fe',b:'#8b7ae8'},{t:'RBAC/ABAC',c:'#ecfdf5',b:'#059669'}]},
{id:112,cat:'sysdesign',q:"Design a system for handling database migrations with zero downtime.",a:"Expand-contract pattern: add column as nullable → deploy code writing to both old and new → backfill rows in batches (not single ALTER TABLE that locks) → deploy code reading from new column → drop old column. Tools: Flyway, Liquibase, Prisma Migrate for version-controlled migrations. Blue-green deployments allow both schema versions to coexist. Never remove columns until all services referencing them are updated.",tags:[{t:'Expand-Contract',c:'#eff6ff',b:'#3b82f6'},{t:'Zero Downtime',c:'#ecfdf5',b:'#059669'},{t:'Flyway',c:'#fef9c3',b:'#d97706'}]},
{id:113,cat:'sysdesign',q:"How would you design a Content Delivery Network (CDN)?",a:"CDN: geographically distributed edge servers cache content close to users. Architecture: (1) Origin server holds canonical content. (2) Edge nodes cache globally. (3) DNS-based routing to nearest PoP. (4) Cache hierarchy: edge → regional → origin. (5) Cache-Control headers govern TTLs. (6) Invalidation: purge by URL/tag/wildcard propagated to all edges. (7) Origin pull on miss. Security: DDoS protection, TLS at edge, WAF.",tags:[{t:'Edge Nodes',c:'#eff6ff',b:'#3b82f6'},{t:'Cache-Control',c:'#ecfdf5',b:'#059669'},{t:'PoPs',c:'#fef9c3',b:'#d97706'}]},
{id:114,cat:'sysdesign',q:"How do you approach designing microservices vs a monolith?",a:"Start with a monolith — faster to build, easier to test, simpler deployment. Migrate to microservices when team size makes the codebase a bottleneck, or services need independent scaling. Microservices: service boundaries along DDD bounded contexts, sync REST/gRPC or async events (Kafka), service discovery, distributed tracing (OpenTelemetry), API gateway for aggregation. Significant operational overhead: observability, service mesh, circuit breakers, distributed transactions. Strangler Fig for gradual migration.",tags:[{t:'DDD',c:'#eff6ff',b:'#3b82f6'},{t:'Service Mesh',c:'#ede9fe',b:'#8b7ae8'},{t:'Strangler Fig',c:'#ecfdf5',b:'#059669'}]},
{id:115,cat:'sysdesign',q:"What is the Saga pattern for distributed transactions?",a:"Sagas manage long-running transactions across microservices without 2-phase commit. Two implementations: (1) Choreography: each service publishes events; others react. Decentralised but hard to visualise. (2) Orchestration: central saga orchestrator sends commands; participants reply with events. Each step has a compensating transaction (semantic rollback) that undoes work if a later step fails. Example: Create Order → Charge Card → Reserve Inventory. If inventory fails, compensating transactions refund the card and cancel the order.",tags:[{t:'Saga Pattern',c:'#eff6ff',b:'#3b82f6'},{t:'Orchestration',c:'#ede9fe',b:'#8b7ae8'},{t:'Compensation',c:'#ecfdf5',b:'#059669'}]},
{id:116,cat:'sysdesign',q:"Design a system for processing millions of images at scale.",a:"Pipeline: (1) Upload via presigned S3 URL. (2) S3 event triggers SQS/SNS message. (3) Worker pool (Lambda/ECS) picks up jobs from SQS, downloads and processes (resize variants, WebP/AVIF conversion, metadata). (4) Output back to S3. (5) Metadata in DynamoDB. (6) CloudFront for delivery. Lambda auto-scales with SQS. SQS visibility timeout prevents double-processing. Dead-letter queue for failures. Monitor: queue depth, processing latency.",tags:[{t:'SQS',c:'#eff6ff',b:'#3b82f6'},{t:'Lambda',c:'#fef9c3',b:'#d97706'},{t:'S3',c:'#ecfdf5',b:'#059669'}]},
{id:117,cat:'sysdesign',q:"How do you design a highly available system with 99.99% uptime?",a:"99.99% uptime = ~52 minutes downtime/year. Strategies: (1) Eliminate single points of failure — active-active redundancy at every layer. (2) Multi-AZ deployments. (3) Database primary-replica with automatic failover (RDS Multi-AZ, Aurora). (4) Load balancing with health checks. (5) Circuit breakers to stop cascading failures. (6) Chaos engineering to validate resilience. (7) Blue-green deployments. (8) Incident runbooks and SLOs.",tags:[{t:'Multi-AZ',c:'#eff6ff',b:'#3b82f6'},{t:'Circuit Breaker',c:'#fef2f2',b:'#ef4444'},{t:'Chaos Engineering',c:'#ecfdf5',b:'#059669'}]},
{id:118,cat:'sysdesign',q:"How would you design a news feed like Twitter/X?",a:"Two approaches: (1) Fan-out-on-write (push): on tweet, immediately write to follower timelines in Redis. Fast reads, expensive for celebrities. (2) Fan-out-on-read (pull): fetch from followed users on timeline request. Cheaper writes, slow reads. Hybrid: push for regular users, pull for celebrities. Storage: Redis sorted set by user_id, scored by tweet timestamp. Tweets in Cassandra. Pagination via cursor. Media on S3 + CDN. Search via Elasticsearch.",tags:[{t:'Fan-out',c:'#eff6ff',b:'#3b82f6'},{t:'Redis Sorted Set',c:'#fef2f2',b:'#ef4444'},{t:'Cassandra',c:'#ede9fe',b:'#8b7ae8'}]},
{id:119,cat:'sysdesign',q:"What is consistent hashing and where is it used?",a:"Consistent hashing maps nodes and keys onto a circular ring. A key is assigned to the first node clockwise. When a node is added/removed, only keys between that node and its predecessor need remapping — much less movement than modulo hashing. Virtual nodes per server improve balance. Used in: Redis Cluster, Memcached, CDN routing, Cassandra/DynamoDB partitioning. Key benefit: minimises rebalancing cost during scale-out.",tags:[{t:'Consistent Hashing',c:'#eff6ff',b:'#3b82f6'},{t:'Virtual Nodes',c:'#ede9fe',b:'#8b7ae8'},{t:'Redis Cluster',c:'#fef2f2',b:'#ef4444'}]},
{id:120,cat:'sysdesign',q:"How do you design a configuration management system across distributed services?",a:"Requirements: centralised, versioned, dynamic (no restart), access-controlled. Solutions: (1) HashiCorp Vault for secrets — dynamic generation, lease/renewal, audit logs. (2) AWS Parameter Store/Secrets Manager for cloud-native setups. (3) etcd or Consul with watch support — services subscribe to key changes. (4) Feature flag services (LaunchDarkly, Unleash). (5) Kubernetes ConfigMaps/Secrets. Best practice: never hardcode config in images; inject via env vars. Separate secrets from non-secret config.",tags:[{t:'Vault',c:'#eff6ff',b:'#3b82f6'},{t:'etcd',c:'#fef2f2',b:'#ef4444'},{t:'Feature Flags',c:'#fef9c3',b:'#d97706'}]},
// ── Next.js (20 questions) ────────────────────────────────────────────────────
{id:121,cat:'nextjs-qa',q:"What is the difference between the Pages Router and the App Router in Next.js?",a:"Pages Router (/pages directory): getServerSideProps/getStaticProps for data; client-side hydration of entire page. App Router (/app, Next.js 13+): React Server Components by default; co-located layouts, loading.js, error.js; nested layouts; streaming SSR with Suspense; server-side data fetching via async/await directly in components. App Router is recommended for new projects. Key shift: components are Server Components unless marked 'use client'.",tags:[{t:'App Router',c:'#eff6ff',b:'#3b82f6'},{t:'RSC',c:'#ede9fe',b:'#8b7ae8'},{t:'Pages Router',c:'#ecfdf5',b:'#059669'}]},
{id:122,cat:'nextjs-qa',q:"Explain Incremental Static Regeneration (ISR) and when to use it.",a:"ISR allows statically generated pages to update after build without a full rebuild. Configure with revalidate: export const revalidate = 60 (App Router). After the TTL, the next request triggers background re-generation while still serving the stale page — stale-while-revalidate semantics. Use for product pages, blog posts, marketing pages. On-demand ISR (revalidatePath, revalidateTag) invalidates pages programmatically on CMS updates.",tags:[{t:'ISR',c:'#eff6ff',b:'#3b82f6'},{t:'revalidate',c:'#ede9fe',b:'#8b7ae8'},{t:'On-demand ISR',c:'#ecfdf5',b:'#059669'}]},
{id:123,cat:'nextjs-qa',q:"How does Next.js handle image optimisation?",a:"next/image automatically: resizes to smallest needed for viewport, converts to WebP/AVIF, lazy loads below-the-fold natively, prevents CLS by requiring width/height (or fill). Key props: priority for hero images (LCP), sizes for srcset selection, placeholder='blur'. next/image serves from the built-in optimisation API or custom loaders (Cloudinary, Imgix). Always use next/image over raw img in Next.js apps.",tags:[{t:'next/image',c:'#eff6ff',b:'#3b82f6'},{t:'WebP/AVIF',c:'#ecfdf5',b:'#059669'},{t:'LCP',c:'#fef9c3',b:'#d97706'}]},
{id:124,cat:'nextjs-qa',q:"What are Server Actions in Next.js and how do they work?",a:"Server Actions are async functions that run on the server, callable from Client Components via forms or event handlers. Annotate with 'use server'. Next.js creates a secure encrypted POST endpoint for each Server Action — the client calls it without writing API routes. Use for: form submissions, database mutations. Combine with useFormStatus() for pending states. Integrate with revalidatePath/revalidateTag to update stale data. Progressive enhancement: work without JS.",tags:[{t:'use server',c:'#eff6ff',b:'#3b82f6'},{t:'Server Actions',c:'#ede9fe',b:'#8b7ae8'},{t:'Forms',c:'#ecfdf5',b:'#059669'}]},
{id:125,cat:'nextjs-qa',q:"How does Next.js middleware work and what are its use cases?",a:"Middleware runs before a request is completed, at the Edge (V8 Edge Runtime). Define in middleware.ts at project root. Operations: read/modify request/response headers, rewrite URLs, redirect, set cookies. Use cases: auth guard (redirect if no session cookie), A/B testing, feature flag routing, i18n locale detection, bot detection. config.matcher limits which paths trigger middleware. Adds minimal latency (~1-2ms at a global PoP).",tags:[{t:'Edge Runtime',c:'#eff6ff',b:'#3b82f6'},{t:'Middleware',c:'#ede9fe',b:'#8b7ae8'},{t:'Redirect',c:'#ecfdf5',b:'#059669'}]},
{id:126,cat:'nextjs-qa',q:"What is Partial Prerendering (PPR) in Next.js?",a:"PPR (Next.js 14, stable 15) combines static and dynamic rendering within a single route. The page's static shell (header, nav, product info) is generated at build time and served instantly from CDN. Dynamic holes (cart, personalisation) wrapped in Suspense are streamed from the server on request. The user sees the static shell immediately while dynamic content loads. Configure with experimental_ppr = true. Merges SSG speed with SSR freshness.",tags:[{t:'PPR',c:'#eff6ff',b:'#3b82f6'},{t:'Suspense',c:'#ede9fe',b:'#8b7ae8'},{t:'Streaming',c:'#ecfdf5',b:'#059669'}]},
{id:127,cat:'nextjs-qa',q:"How do you implement authentication in a Next.js App Router application?",a:"Recommended: NextAuth.js (Auth.js). Configure providers, session strategy. In App Router: auth() in Server Components, useSession() in Client Components. Protect routes: (1) Middleware — read session cookie in middleware.ts, redirect unauthenticated. (2) Server Component guard — auth() at top of layout/page. For RBAC: check session.user.role in Server Components. Never rely on client-side route protection alone. HttpOnly cookies for JWTs; database sessions for revocability.",tags:[{t:'NextAuth',c:'#eff6ff',b:'#3b82f6'},{t:'Session',c:'#ede9fe',b:'#8b7ae8'},{t:'Middleware Auth',c:'#ecfdf5',b:'#059669'}]},
{id:128,cat:'nextjs-qa',q:"Explain the Next.js caching layers and how to control them.",a:"Four layers: (1) Request Memoization: identical fetch() calls in the same render pass are deduplicated — automatic. (2) Data Cache: fetch() results persisted across requests — configure with cache:'force-cache' or next.revalidate. (3) Full Route Cache: statically rendered routes on the CDN. (4) Router Cache: client-side RSC payload cache (5-30 min). Control: revalidatePath() and revalidateTag() invalidate specific data. noStore() opts out. Understanding these is critical for diagnosing stale data bugs.",tags:[{t:'Data Cache',c:'#eff6ff',b:'#3b82f6'},{t:'Router Cache',c:'#ede9fe',b:'#8b7ae8'},{t:'revalidateTag',c:'#ecfdf5',b:'#059669'}]},
{id:129,cat:'nextjs-qa',q:"How do you implement internationalisation (i18n) in Next.js?",a:"App Router: create [lang] dynamic route segment. Middleware detects locale (Accept-Language, cookie, geo) and redirects to /en/... or /fr/.... Store translations in JSON dictionaries per locale, loaded server-side in layouts. Libraries: next-intl (RSC-compatible, recommended). SEO: set html lang, use hreflang alternate links. Common pitfalls: forgetting to forward locale in links and not handling locale-specific number/date formatting.",tags:[{t:'next-intl',c:'#eff6ff',b:'#3b82f6'},{t:'Middleware',c:'#ede9fe',b:'#8b7ae8'},{t:'hreflang',c:'#ecfdf5',b:'#059669'}]},
{id:130,cat:'nextjs-qa',q:"How do you optimise a Next.js application's bundle size?",a:"(1) Analyse with @next/bundle-analyzer. (2) Dynamic imports for heavy components. (3) next/dynamic with ssr:false for client-only widgets. (4) Named imports over star imports for tree-shaking. (5) Replace heavy libraries: date-fns instead of moment. (6) Avoid barrel files (index.ts re-exporting everything). (7) modularizeImports in next.config.js for icon libraries. (8) next/font with subset and swap. (9) Code-split routes aggressively.",tags:[{t:'Bundle Analyzer',c:'#eff6ff',b:'#3b82f6'},{t:'Dynamic Import',c:'#ede9fe',b:'#8b7ae8'},{t:'Tree-shaking',c:'#ecfdf5',b:'#059669'}]},
{id:131,cat:'nextjs-qa',q:"What are Route Groups and Parallel Routes in Next.js App Router?",a:"Route Groups: folder in () creates a group without affecting URL. Use to organise routes by feature and apply different layouts to groups. Parallel Routes: @folder convention creates named slots rendered simultaneously in one layout — for dashboards (main + side panel), modals alongside page content. Each slot has its own loading.js and error.js. Intercepting Routes ((..)folder) captures navigation to show a modal overlay while preserving the underlying page.",tags:[{t:'Route Groups',c:'#eff6ff',b:'#3b82f6'},{t:'Parallel Routes',c:'#ede9fe',b:'#8b7ae8'},{t:'Intercepting Routes',c:'#ecfdf5',b:'#059669'}]},
{id:132,cat:'nextjs-qa',q:"How do you handle error states in the Next.js App Router?",a:"Co-located special files: error.js (Client Component) wraps route segment in error boundary — receives error and reset props. global-error.js at root catches errors in root layout. not-found.js renders when notFound() is thrown. loading.js provides instant loading skeleton (Suspense boundary). Nested error boundaries: inner errors bubble to nearest error.js. Always log caught errors to monitoring in the error component.",tags:[{t:'error.js',c:'#fef2f2',b:'#ef4444'},{t:'not-found.js',c:'#fef9c3',b:'#d97706'},{t:'Error Boundary',c:'#eff6ff',b:'#3b82f6'}]},
{id:133,cat:'nextjs-qa',q:"What is the difference between generateStaticParams and generateMetadata?",a:"generateStaticParams() pre-generates the list of dynamic route parameters at build time for static rendering. Routes not in the list are rendered on demand (dynamicParams:true, default) or 404. generateMetadata(): async function returning metadata (title, description, OG, twitter, canonical) — runs on server, can fetch data. Both are async and can fetch data. generateMetadata receives the same params as the page component.",tags:[{t:'generateStaticParams',c:'#eff6ff',b:'#3b82f6'},{t:'generateMetadata',c:'#ede9fe',b:'#8b7ae8'},{t:'Dynamic Routes',c:'#ecfdf5',b:'#059669'}]},
{id:134,cat:'nextjs-qa',q:"How do you deploy a Next.js application and what are the hosting options?",a:"Vercel: zero-config, CDN, Edge Functions, ISR, Image Optimization all work out of the box. Self-hosted: next start on a Node.js server. Docker: standalone output (output:'standalone') creates minimal image. AWS: Amplify (managed), or Lambda + CloudFront via open-next adapter. Standalone output bundles only necessary files. Edge/CF Workers: routes using only Edge Runtime can deploy to Cloudflare Workers via @opennextjs/cloudflare.",tags:[{t:'Vercel',c:'#eff6ff',b:'#3b82f6'},{t:'Standalone Output',c:'#ede9fe',b:'#8b7ae8'},{t:'Docker',c:'#ecfdf5',b:'#059669'}]},
{id:135,cat:'nextjs-qa',q:"How do you implement real-time features in a Next.js application?",a:"Options: (1) Server-Sent Events (SSE): Response with text/event-stream — one-directional, auto-reconnects. Return a ReadableStream from Route Handlers. (2) WebSockets: Next.js doesn't natively handle WS upgrades — use a custom server.js or separate WS server. (3) Pusher/Ably/Soketi: managed WebSocket services. In App Router, use Client Components with useEffect to establish SSE/WS connections. Use React Query's refetchInterval for polling-based real-time if WebSockets are overkill.",tags:[{t:'SSE',c:'#eff6ff',b:'#3b82f6'},{t:'WebSockets',c:'#ede9fe',b:'#8b7ae8'},{t:'Pusher',c:'#ecfdf5',b:'#059669'}]},
{id:136,cat:'nextjs-qa',q:"What are the performance best practices specific to Next.js?",a:"(1) Server Components for data-heavy UI — zero client JS. (2) Streaming with Suspense — don't block entire page on slow data. (3) Parallel data fetching — Promise.all in Server Components. (4) next/image for all images. (5) next/font with preload for primary fonts. (6) Minimise 'use client' boundaries — push to leaf components. (7) generateStaticParams for known dynamic routes. (8) PPR for mixed static/dynamic. (9) Monitor with Vercel Speed Insights. (10) Performance budgets in next.config.js.",tags:[{t:'Server Components',c:'#eff6ff',b:'#3b82f6'},{t:'Streaming',c:'#ede9fe',b:'#8b7ae8'},{t:'PPR',c:'#ecfdf5',b:'#059669'}]},
{id:137,cat:'nextjs-qa',q:"How do you configure environment variables in Next.js?",a:".env.local for local secrets (not committed). .env.development and .env.production for environment-specific non-secret values. Variables prefixed with NEXT_PUBLIC_ are inlined into the client bundle — never put secrets in NEXT_PUBLIC_. Server-only env vars are accessible in Server Components, Server Actions, Route Handlers. Validate at startup using zod: z.object({DATABASE_URL: z.string().url()}).parse(process.env). Catches missing vars at startup rather than runtime.",tags:[{t:'NEXT_PUBLIC_',c:'#eff6ff',b:'#3b82f6'},{t:'env.local',c:'#ede9fe',b:'#8b7ae8'},{t:'zod validation',c:'#ecfdf5',b:'#059669'}]},
{id:138,cat:'nextjs-qa',q:"How do you implement API routes in Next.js App Router?",a:"Route Handlers in app/api/route.ts. Export named HTTP method functions: GET, POST, PUT, DELETE. Receive a Request (Web API), return a Response. Access route params via context.params, query strings via new URL(request.url).searchParams. Use NextRequest/NextResponse for extra utilities (cookies, geo). Dynamic segments: app/api/users/[id]/route.ts. For streaming responses, return a ReadableStream. Avoid creating API routes just to call from Server Components — fetch directly instead.",tags:[{t:'Route Handlers',c:'#eff6ff',b:'#3b82f6'},{t:'Web API',c:'#ede9fe',b:'#8b7ae8'},{t:'Edge Runtime',c:'#ecfdf5',b:'#059669'}]},
{id:139,cat:'nextjs-qa',q:"What are the SEO best practices for a Next.js application?",a:"(1) generateMetadata() for per-page title/description/OG. (2) sitemap.ts for dynamic XML sitemaps. (3) robots.ts for robots.txt. (4) Semantic HTML in Server Components. (5) JSON-LD structured data in Server Component script tag. (6) next/link for fast client navigation. (7) Canonical URLs via alternates.canonical. (8) generateStaticParams/ISR for indexable dynamic pages. (9) Monitor CrUX data with Vercel Speed Insights. (10) Image alt text via next/image alt prop.",tags:[{t:'generateMetadata',c:'#eff6ff',b:'#3b82f6'},{t:'sitemap.ts',c:'#ede9fe',b:'#8b7ae8'},{t:'JSON-LD',c:'#ecfdf5',b:'#059669'}]},
{id:140,cat:'nextjs-qa',q:"How does Turbopack differ from Webpack in Next.js?",a:"Turbopack is a Rust-based incremental bundler replacing Webpack in the dev server (--turbopack, stable in Next.js 15). Differences: (1) Incremental: only recompiles changed modules — not the whole bundle. (2) Parallelism: leverages multi-core CPUs via Rust's Rayon. (3) Lazy bundling: bundles only entry points requested by the dev server. Results: up to 10x faster cold dev server startup and near-instant HMR. Production builds still use Webpack — Turbopack's production mode is in development.",tags:[{t:'Turbopack',c:'#eff6ff',b:'#3b82f6'},{t:'HMR',c:'#ecfdf5',b:'#059669'},{t:'Incremental',c:'#fef9c3',b:'#d97706'}]},
{id:141,cat:'angular-qa',q:"What is Angular's component lifecycle and the order of lifecycle hooks?",a:"ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy. ngOnChanges fires before ngOnInit and on every input change. ngOnInit fires once after first ngOnChanges — ideal for data fetch. ngAfterViewInit fires when component's view (and child views) are initialised — safe to interact with ViewChild here. ngOnDestroy fires before component is removed — unsubscribe Observables, clear timers.",tags:[{t:'Lifecycle',c:'#fef2f2',b:'#dd0031'},{t:'ngOnInit',c:'#eff6ff',b:'#3b82f6'},{t:'ngOnDestroy',c:'#ecfdf5',b:'#059669'}]},
{id:142,cat:'angular-qa',q:"What is the difference between NgModules and standalone components?",a:"NgModules (pre-Angular 14) group components, directives, pipes, and services and control their visibility. Every component had to be declared in exactly one NgModule. Standalone components (Angular 14+, default from Angular 17) eliminate NgModules for most use cases — a component declares its own imports array. Benefits: simpler mental model, faster compilation, better lazy-loading granularity, easier testing. Standalone components still work inside NgModule apps; NgModules not fully removed.",tags:[{t:'Standalone',c:'#fef2f2',b:'#dd0031'},{t:'NgModules',c:'#eff6ff',b:'#3b82f6'},{t:'Angular 17',c:'#ecfdf5',b:'#059669'}]},
{id:143,cat:'angular-qa',q:"How does Angular's change detection work and what is OnPush strategy?",a:"Default strategy: Angular checks every component in the tree on every event, timer, or async operation (via Zone.js monkey-patching). OnPush strategy: Angular only checks when (1) an @Input reference changes, (2) an event originates from the component/child, (3) async pipe emits, or (4) ChangeDetectorRef.markForCheck() is called. OnPush dramatically reduces checks in large apps. Combine with immutable data and Observables for maximum performance. Angular 18+ Signals offer fine-grained reactivity without Zone.js.",tags:[{t:'OnPush',c:'#fef2f2',b:'#dd0031'},{t:'Zone.js',c:'#eff6ff',b:'#3b82f6'},{t:'Signals',c:'#ecfdf5',b:'#059669'}]},
{id:144,cat:'angular-qa',q:"What are Angular Signals and how do they differ from RxJS Observables?",a:"Signals (Angular 16+ stable in 17) are synchronous reactive primitives: signal(initialValue), computed(() => ...), effect(() => ...). Reading a signal inside computed/effect automatically tracks dependencies — no subscription management. Observables are asynchronous push-based streams; better for HTTP, WebSockets, complex operators. Signals: simpler for local/derived state, no subscribe/unsubscribe, built-in change detection integration. toSignal(obs$) and toObservable(sig) bridge the two worlds. Angular's long-term direction is Signals replacing Zone.js for change detection.",tags:[{t:'Signals',c:'#fef2f2',b:'#dd0031'},{t:'RxJS',c:'#eff6ff',b:'#3b82f6'},{t:'computed()',c:'#fef9c3',b:'#d97706'}]},
{id:145,cat:'angular-qa',q:"What is dependency injection in Angular and how does it work?",a:"Angular's DI system creates and delivers service instances to components/other services. Register a provider in (1) root injector via providedIn:'root' — singleton app-wide, tree-shakable; (2) module injector via NgModule.providers; (3) component injector via component.providers — new instance per component. Inject via constructor(private svc: MyService) or inject(MyService) function. Hierarchical injectors: child injectors can override parent providers. InjectionToken for non-class dependencies. useValue, useFactory, useExisting for custom provider configurations.",tags:[{t:'DI',c:'#fef2f2',b:'#dd0031'},{t:'providedIn root',c:'#eff6ff',b:'#3b82f6'},{t:'Hierarchical',c:'#ecfdf5',b:'#059669'}]},
{id:146,cat:'angular-qa',q:"How do Angular directives work — what are the three types?",a:"(1) Component directives — directives with a template (components are directives). (2) Attribute directives — change appearance/behaviour of an element, another component, or another directive. Examples: NgClass, NgStyle, custom [highlight]. Implemented with @Directive, HostListener, HostBinding. (3) Structural directives — change DOM layout by adding/removing elements. Examples: *ngIf/*ngFor (legacy) or @if/@for (Angular 17+ control flow). The asterisk (*) is syntactic sugar for an ng-template. Structural directives receive TemplateRef and ViewContainerRef.",tags:[{t:'Structural',c:'#fef2f2',b:'#dd0031'},{t:'Attribute',c:'#eff6ff',b:'#3b82f6'},{t:'@if/@for',c:'#fef9c3',b:'#d97706'}]},
{id:147,cat:'angular-qa',q:"What is Angular's router and how do you implement lazy loading?",a:"Angular Router maps URL paths to components. Lazy loading defers loading of feature modules/standalone component sets until the route is navigated to — reducing initial bundle. With NgModules: loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule). With standalone: loadComponent: () => import('./page.component').then(m => m.PageComponent), or loadChildren with a routes array. Guards (canActivate, canMatch) protect routes. Resolvers pre-fetch data. preloadingStrategy: PreloadAllModules preloads lazy routes in background after initial load.",tags:[{t:'Lazy Loading',c:'#fef2f2',b:'#dd0031'},{t:'Guards',c:'#eff6ff',b:'#3b82f6'},{t:'Resolvers',c:'#ecfdf5',b:'#059669'}]},
{id:148,cat:'angular-qa',q:"What are Angular pipes and how do you create a custom pipe?",a:"Pipes transform display values in templates: {{ value | date:'short' }}, {{ price | currency:'INR' }}. Built-in: date, currency, percent, uppercase, lowercase, slice, json, async. Custom pipe: @Pipe({ name:'truncate', pure:true }) class TruncatePipe implements PipeTransform { transform(value:string, limit=50): string { return value.length > limit ? value.slice(0,limit)+'…' : value; } }. Pure pipes (default) only re-run when input reference changes — performant. Impure pipes run on every change detection cycle — avoid unless necessary (e.g., custom async handling).",tags:[{t:'Pure Pipe',c:'#fef2f2',b:'#dd0031'},{t:'async pipe',c:'#eff6ff',b:'#3b82f6'},{t:'PipeTransform',c:'#fef9c3',b:'#d97706'}]},
{id:149,cat:'angular-qa',q:"How does Angular handle forms — template-driven vs reactive?",a:"Template-driven forms: logic in HTML via NgModel, FormsModule. Simpler for basic forms; Angular infers FormGroup/FormControl from template. Reactive forms: logic in TypeScript via FormGroup, FormControl, FormArray, ReactiveFormsModule. Explicit, testable, composable. Prefer reactive for complex validation, dynamic fields, or testing. Validators: Validators.required, Validators.email, custom validator functions. Async validators return Observable<ValidationErrors|null>. FormBuilder shorthand: fb.group({name:['', Validators.required]}). Angular 14+ typed forms give compile-time type safety on form value.",tags:[{t:'Reactive Forms',c:'#fef2f2',b:'#dd0031'},{t:'FormGroup',c:'#eff6ff',b:'#3b82f6'},{t:'Validators',c:'#ecfdf5',b:'#059669'}]},
{id:150,cat:'angular-qa',q:"What is RxJS and which operators are most useful in Angular?",a:"RxJS is a reactive programming library using Observables. Key operators in Angular: switchMap — cancel previous inner Observable (HTTP search); mergeMap — run all inner Observables concurrently; concatMap — queue inner Observables in order; exhaustMap — ignore new source while inner active (login button). Combination: combineLatest, forkJoin, zip. Filtering: filter, take, takeUntil, debounceTime, distinctUntilChanged. Transformation: map, tap (side-effects), scan (accumulate). Always unsubscribe: async pipe, takeUntilDestroyed (Angular 16+), or takeUntil(destroy$).",tags:[{t:'switchMap',c:'#fef2f2',b:'#dd0031'},{t:'RxJS',c:'#eff6ff',b:'#3b82f6'},{t:'takeUntilDestroyed',c:'#ecfdf5',b:'#059669'}]},
{id:151,cat:'angular-qa',q:"How do you optimise Angular application performance?",a:"(1) OnPush change detection for all components. (2) Lazy-load feature routes. (3) Virtual scrolling (CdkVirtualScrollViewport) for large lists. (4) track function in @for loop (replaces trackBy). (5) Pure pipes instead of methods in templates. (6) Defer blocks (@defer) — load template section only when in viewport. (7) SSR with Angular Universal / hydration for faster FCP. (8) Preloading strategies for background lazy route loading. (9) Signals to eliminate Zone.js overhead. (10) Analyse with source-map-explorer and Angular DevTools profiler.",tags:[{t:'OnPush',c:'#fef2f2',b:'#dd0031'},{t:'@defer',c:'#eff6ff',b:'#3b82f6'},{t:'Signals',c:'#ecfdf5',b:'#059669'}]},
{id:152,cat:'angular-qa',q:"What is Angular Universal and how does server-side rendering work?",a:"Angular Universal renders Angular apps on the server (Node.js), returning fully rendered HTML to the browser. Benefits: better SEO (crawlers see content), faster FCP. Setup via ng add @angular/ssr. Uses CommonEngine to render. Hydration (stable Angular 17): server-rendered DOM is reused on the client instead of discarded and rebuilt — faster TTI. Partial Hydration and Deferrable Views together: skip hydrating off-screen components. Caveats: avoid browser-only APIs (window, document) in shared code — use isPlatformBrowser guard or PLATFORM_ID injection.",tags:[{t:'SSR',c:'#fef2f2',b:'#dd0031'},{t:'Hydration',c:'#eff6ff',b:'#3b82f6'},{t:'Universal',c:'#ecfdf5',b:'#059669'}]},
{id:153,cat:'angular-qa',q:"How do you test Angular components and services?",a:"Unit tests with Jest or Jasmine + Karma. TestBed configures a testing NgModule: TestBed.configureTestingModule({ declarations/imports, providers }). ComponentFixture<T> wraps a component; fixture.detectChanges() triggers change detection. Query DOM with fixture.debugElement.query(By.css('...')). Mock services with jasmine.createSpyObj or jest.fn(); provide via useValue. HTTP: HttpClientTestingModule + HttpTestingController. For standalone components: TestBed.configureTestingModule({ imports:[MyComponent] }). E2E with Cypress or Playwright. Angular Testing Library promotes user-centric queries.",tags:[{t:'TestBed',c:'#fef2f2',b:'#dd0031'},{t:'Jest',c:'#eff6ff',b:'#3b82f6'},{t:'Cypress',c:'#ecfdf5',b:'#059669'}]},
{id:154,cat:'angular-qa',q:"What are Angular decorators and how do they work?",a:"Decorators are TypeScript metadata annotations processed at compile time. Component decorators: @Component({ selector, template, styles, changeDetection, standalone, imports }). @NgModule, @Directive, @Pipe, @Injectable — each adds metadata Angular reads via Reflect.metadata. @Input() / @Output() mark component inputs and EventEmitter outputs. @ViewChild / @ContentChild query child elements. @HostListener listens to host element events. @HostBinding binds to host element properties. Angular's compiler processes decorators to generate component factories. Standalone components don't need @NgModule.",tags:[{t:'@Component',c:'#fef2f2',b:'#dd0031'},{t:'@Input/@Output',c:'#eff6ff',b:'#3b82f6'},{t:'@Injectable',c:'#ecfdf5',b:'#059669'}]},
{id:155,cat:'angular-qa',q:"What is NgRx and when should you use it over Angular services?",a:"NgRx is Redux for Angular: Store, Actions, Reducers, Effects, Selectors. Use when: multiple components need shared state, state transitions are complex, you need time-travel debugging or reproducibility. Avoid for simple local or single-component state. NgRx Component Store is a lighter alternative for component-level state. NgRx Signals Store (NgRx 17+) uses Angular Signals for reactivity. Typical flow: Component dispatches Action → Reducer produces new State → Selector memoises derived State → Component subscribes via async pipe. Effects handle async operations (HTTP) and dispatch further actions.",tags:[{t:'NgRx',c:'#fef2f2',b:'#dd0031'},{t:'Effects',c:'#eff6ff',b:'#3b82f6'},{t:'Selectors',c:'#ecfdf5',b:'#059669'}]},
{id:156,cat:'angular-qa',q:"How does Angular's HttpClient work and how do you intercept requests?",a:"HttpClient is Angular's HTTP service based on RxJS Observables. Import HttpClientModule or provideHttpClient(). Methods: get, post, put, delete return typed Observables. HTTP Interceptors (Angular 15+: functional interceptors) tap into request/response pipeline: intercept(req, next) { const modified = req.clone({setHeaders:{Authorization:'Bearer '+token}}); return next(req).pipe(catchError(handleError)); }. Register: provideHttpClient(withInterceptors([authInterceptor])). Use interceptors for: auth tokens, global error handling, loading spinners, caching. Angular 17+ withFetch() uses native Fetch API underneath.",tags:[{t:'HttpClient',c:'#fef2f2',b:'#dd0031'},{t:'Interceptors',c:'#eff6ff',b:'#3b82f6'},{t:'withFetch',c:'#ecfdf5',b:'#059669'}]},
{id:157,cat:'angular-qa',q:"What are Angular's new control flow syntax (@if, @for, @switch)?",a:"Angular 17 introduced built-in control flow replacing *ngIf, *ngFor, *ngSwitch. @if (condition) { … } @else if (other) { … } @else { … }. @for (item of items; track item.id) { … } @empty { No items }. @switch (expr) { @case (val) { … } @default { … } }. Benefits: no need to import CommonModule for directives, better type narrowing inside blocks, @empty is cleaner than *ngIf on empty message, track is required (was optional with trackBy). Compiled to optimised instructions — slightly faster than directive-based approach.",tags:[{t:'@if/@for',c:'#fef2f2',b:'#dd0031'},{t:'Control Flow',c:'#eff6ff',b:'#3b82f6'},{t:'Angular 17',c:'#fef9c3',b:'#d97706'}]},
{id:158,cat:'angular-qa',q:"How do you implement authentication and route guards in Angular?",a:"Route guards protect routes. canActivate: return true/false/UrlTree or Observable<boolean|UrlTree>. Functional guard (Angular 15+): export const authGuard = () => inject(AuthService).isLoggedIn() ? true : inject(Router).createUrlTree(['/login']). canActivateChild, canDeactivate (unsaved changes), canMatch (lazy route matching). Implement auth: store JWT in httpOnly cookie (secure) or memory. AuthService.isLoggedIn() checks token validity. HTTP interceptor attaches Bearer token. On 401 response, interceptor redirects to login. Use canLoad/canMatch to prevent downloading lazy chunk without auth.",tags:[{t:'Guards',c:'#fef2f2',b:'#dd0031'},{t:'canActivate',c:'#eff6ff',b:'#3b82f6'},{t:'JWT',c:'#ecfdf5',b:'#059669'}]},
{id:159,cat:'angular-qa',q:"What is Angular's compilation process — JIT vs AOT?",a:"JIT (Just-in-Time): browser downloads compiler + app; templates compiled at runtime. Used in older dev mode. Slower startup; larger bundle. AOT (Ahead-of-Time, default since Angular 9 with Ivy): templates compiled to TypeScript/JS at build time. Benefits: faster rendering (no runtime compilation), smaller bundle (compiler not shipped), earlier template error detection, better tree-shaking, more secure (no eval). Ivy (Angular 9+) is the rendering engine replacing View Engine — enables better tree-shaking and locality (each component compiled independently). ng build --configuration=production always uses AOT.",tags:[{t:'AOT',c:'#fef2f2',b:'#dd0031'},{t:'Ivy',c:'#eff6ff',b:'#3b82f6'},{t:'Tree-shaking',c:'#ecfdf5',b:'#059669'}]},
{id:160,cat:'angular-qa',q:"How do you handle error management globally in Angular?",a:"(1) ErrorHandler: class GlobalErrorHandler implements ErrorHandler { handleError(err) { logToSentry(err); } }. Provide in root. Catches all uncaught errors including unhandled promise rejections. (2) HTTP errors: interceptor catches HttpErrorResponse, maps to user-friendly messages, re-throws or handles. (3) Route-level error: errorHandler property in route config for rendering error UI. (4) @defer error block: @error { <p>Failed to load</p> }. (5) RxJS: catchError operator in service pipes. (6) Structured error types: create AppError hierarchy. Log with context to a monitoring service (Sentry, Datadog).",tags:[{t:'ErrorHandler',c:'#fef2f2',b:'#dd0031'},{t:'Sentry',c:'#eff6ff',b:'#3b82f6'},{t:'catchError',c:'#ecfdf5',b:'#059669'}]},
{id:161,cat:'vue-qa',q:"What is Vue 3's Composition API and how does it differ from the Options API?",a:"Options API (Vue 2/3): organise code by option type — data(), methods, computed, watch, lifecycle hooks. Logic for one feature is spread across multiple options. Composition API (Vue 3): organise code by logical concern using setup() or &lt;script setup>. All logic for a feature lives together. Enables composables (reusable logic functions) — like React hooks. &lt;script setup> is syntactic sugar: top-level variables/functions are automatically exposed to template. Composition API doesn't replace Options API — both work in Vue 3. Prefer Composition API for complex components and reusable logic.",tags:[{t:'Composition API',c:'#ecfdf5',b:'#41B883'},{t:'&lt;script setup>',c:'#eff6ff',b:'#3b82f6'},{t:'Composables',c:'#fef9c3',b:'#d97706'}]},
{id:162,cat:'vue-qa',q:"What is Vue's reactivity system and how does ref() vs reactive() work?",a:"Vue 3 uses ES Proxy for reactivity. reactive(obj) wraps an object in a Proxy — deep reactive, but loses reactivity when destructured. ref(value) wraps any value in a { value } object — primitive-safe, works across destructuring/spread. In templates, refs are auto-unwrapped (no .value). toRef/toRefs preserve reactivity when destructuring reactive objects. computed(fn) returns a readonly ref with lazy memoisation. watchEffect(fn) auto-tracks dependencies; watch(source, cb) explicit with old/new values. Vue 3.4+ reactive props destructure with defineProps (compiler support).",tags:[{t:'ref()',c:'#ecfdf5',b:'#41B883'},{t:'reactive()',c:'#eff6ff',b:'#3b82f6'},{t:'Proxy',c:'#fef9c3',b:'#d97706'}]},
{id:163,cat:'vue-qa',q:"What are Vue composables and how do they compare to React hooks?",a:"Composables are functions that use Composition API to encapsulate and reuse stateful logic. Convention: prefix with 'use'. Example: useMousePosition() returns reactive { x, y } updated on mousemove. Similar to React hooks: both colocate logic, both enable reuse without component hierarchy changes. Differences: Vue composables can be called anywhere in setup (not restricted to top-level); no 'rules of hooks' enforcement needed (Vue's reactivity is Proxy-based, not closure-based). VueUse library provides 200+ composables. Composables can use lifecycle hooks, watchers, and refs internally.",tags:[{t:'Composables',c:'#ecfdf5',b:'#41B883'},{t:'VueUse',c:'#eff6ff',b:'#3b82f6'},{t:'Reusability',c:'#fef9c3',b:'#d97706'}]},
{id:164,cat:'vue-qa',q:"How does Vue's component communication work — props, emits, and beyond?",a:"Parent → Child: props. Define with defineProps<{title:string}>() in &lt;script setup>. Child → Parent: emits. defineEmits<{update:[value:string]}>(); emit('update', val). Sibling: lift state to parent or use shared composable. Grandparent → deep child: provide/inject — provide('key', value) in ancestor, inject('key') in descendant. Global state: Pinia store. Component v-model: defineModel() (Vue 3.4+) macro simplifies two-way binding. For slots: default and named slots pass template fragments. Expose public API: defineExpose({ method }) for parent ref access.",tags:[{t:'Props/Emits',c:'#ecfdf5',b:'#41B883'},{t:'provide/inject',c:'#eff6ff',b:'#3b82f6'},{t:'defineModel',c:'#fef9c3',b:'#d97706'}]},
{id:165,cat:'vue-qa',q:"What is Pinia and how does it replace Vuex?",a:"Pinia is Vue's official state management library (replaced Vuex). Simpler API: define store with defineStore('id', () => { state as refs, getters as computed, actions as functions }). No mutations — actions directly modify state. Full TypeScript support out of the box. DevTools integration: time-travel, state inspection. Multiple stores — no nested modules needed. Composable: stores can use other stores. Lightweight (~1KB). Compared to Vuex: no namespacing boilerplate, no mutations required, better TS inference, works with Vue 2 via plugin. Pinia is also compatible with SSR and Nuxt 3.",tags:[{t:'Pinia',c:'#ecfdf5',b:'#41B883'},{t:'defineStore',c:'#eff6ff',b:'#3b82f6'},{t:'Vuex successor',c:'#fef9c3',b:'#d97706'}]},
{id:166,cat:'vue-qa',q:"How does Vue Router work and what are navigation guards?",a:"Vue Router maps URL paths to components. createRouter({ history: createWebHistory(), routes:[{ path:'/', component:Home }, { path:'/user/:id', component:User }] }). Access route params with useRoute().params.id. Programmatic navigation: useRouter().push('/path'). Navigation guards: global (router.beforeEach), per-route (beforeEnter), in-component (onBeforeRouteLeave). Guards receive (to, from) and return false (abort), a route location (redirect), or nothing (proceed). Lazy loading: component: () => import('./Page.vue'). Nested routes via children array. Route meta for auth flags.",tags:[{t:'Vue Router',c:'#ecfdf5',b:'#41B883'},{t:'Navigation Guards',c:'#eff6ff',b:'#3b82f6'},{t:'Lazy Routes',c:'#fef9c3',b:'#d97706'}]},
{id:167,cat:'vue-qa',q:"What are Vue directives and how do you create a custom directive?",a:"Built-in directives: v-if/v-else, v-show, v-for (always use :key), v-bind (:), v-on (@), v-model, v-slot, v-html (XSS risk), v-once. Custom directive: app.directive('focus', { mounted(el) { el.focus() } }). Lifecycle hooks: created, beforeMount, mounted, beforeUpdate, updated, beforeUnmount, unmounted. Directive receives el (DOM), binding.value, binding.modifiers. In &lt;script setup>: any camelCase variable prefixed with v is auto-registered as directive — const vFocus = { mounted: (el) => el.focus() }. Useful for DOM-level integrations (scroll, resize, third-party libs).",tags:[{t:'v-directives',c:'#ecfdf5',b:'#41B883'},{t:'Custom Directive',c:'#eff6ff',b:'#3b82f6'},{t:'Lifecycle Hooks',c:'#fef9c3',b:'#d97706'}]},
{id:168,cat:'vue-qa',q:"How do you implement server-side rendering in Vue with Nuxt?",a:"Nuxt 3 is the Vue meta-framework for SSR, SSG, and hybrid rendering. File-based routing: pages/ directory auto-generates routes. Rendering modes per route: SSR (default), SSG (prerender), CSR, ISR. Data fetching: useFetch(), useAsyncData() — run on server and client, auto-dehydrate/hydrate. Server routes: server/api/ directory for API endpoints. Composables, components, utils auto-imported. Nitro server engine runs on Node, Bun, Deno, Edge. SSR benefits: SEO, faster FCP. Hydration: server HTML is hydrated on client. Nuxt DevTools for inspecting pages, components, composables.",tags:[{t:'Nuxt 3',c:'#ecfdf5',b:'#41B883'},{t:'SSR/SSG',c:'#eff6ff',b:'#3b82f6'},{t:'useFetch',c:'#fef9c3',b:'#d97706'}]},
{id:169,cat:'vue-qa',q:"What is Vue's virtual DOM and how does its diffing algorithm work?",a:"Vue's virtual DOM is an in-memory JS tree mirroring the real DOM. On re-render, Vue creates a new vnode tree and diffs it against the previous one, applying only minimal real DOM updates. Vue 3 compile-time optimisations: (1) Static hoisting — static vnodes created once outside render fn. (2) Patch flags — compiler marks dynamic bindings, runtime only checks those. (3) Tree flattening — dynamic children collected in flat arrays for efficient diff. (4) v-memo — cache sub-tree unless deps change (like React.memo). Result: Vue 3 is significantly faster than Vue 2 at runtime diffing.",tags:[{t:'Virtual DOM',c:'#ecfdf5',b:'#41B883'},{t:'Patch Flags',c:'#eff6ff',b:'#3b82f6'},{t:'Static Hoisting',c:'#fef9c3',b:'#d97706'}]},
{id:170,cat:'vue-qa',q:"How do you handle async components and code splitting in Vue?",a:"defineAsyncComponent(() => import('./HeavyComponent.vue')) — Vue lazy-loads the component on first render. Can include loading/error components and delay/timeout: defineAsyncComponent({ loader, loadingComponent, errorComponent, delay:200, timeout:3000 }). With Vue Router, lazy-loaded routes split the bundle automatically: { component: () => import('./Page.vue') }. Suspense (experimental in Vue 3): wrap async setup() components to show fallback while resolving. Top-level await in &lt;script setup> is supported — component becomes async automatically. Use webpackChunkName comments for named chunks.",tags:[{t:'defineAsyncComponent',c:'#ecfdf5',b:'#41B883'},{t:'Code Splitting',c:'#eff6ff',b:'#3b82f6'},{t:'Suspense',c:'#fef9c3',b:'#d97706'}]},
{id:171,cat:'vue-qa',q:"What are slots in Vue and when do you use scoped slots?",a:"Slots allow parent to inject template content into child. Default slot: <slot/>. Named slots: <slot name='header'/>; parent uses <template #header>. Fallback content: <slot>Default text</slot>. Scoped slots: child exposes data to parent's slot content — <slot :item='item'/>, parent uses <template #default='{ item }'>. Use when: child controls iteration/logic but parent controls rendering. Example: a Table component providing row data via scoped slot while parent renders each cell. This is the 'renderless component' pattern — logic in child, UI in parent. Vue's v-slot directive handles all slot types.",tags:[{t:'Scoped Slots',c:'#ecfdf5',b:'#41B883'},{t:'Named Slots',c:'#eff6ff',b:'#3b82f6'},{t:'Renderless',c:'#fef9c3',b:'#d97706'}]},
{id:172,cat:'vue-qa',q:"How do you test Vue 3 components?",a:"Vue Test Utils (VTU) + Vitest or Jest. mount(Component, { props, global.plugins }) returns a wrapper. wrapper.find/findAll queries DOM. wrapper.trigger('click') fires events. wrapper.vm accesses component instance. For async: await nextTick() or flushPromises(). Stub child components: global.stubs. Mock Pinia: createTestingPinia({ createSpy:vi.fn }). Vue Testing Library (@testing-library/vue): user-centric queries (getByRole, getByText) — encourages testing behaviour not implementation. Vitest UI for visual test runner. E2E: Cypress with @cypress/vue or Playwright. Snapshot testing with toMatchSnapshot().",tags:[{t:'Vue Test Utils',c:'#ecfdf5',b:'#41B883'},{t:'Vitest',c:'#eff6ff',b:'#3b82f6'},{t:'Testing Library',c:'#fef9c3',b:'#d97706'}]},
{id:173,cat:'vue-qa',q:"What is Vue's teleport feature and when would you use it?",a:"<Teleport to='#portal-target'> moves its slot content to a different DOM node while keeping component logic in place. Use cases: modals (render at <body> level to avoid z-index/overflow issues), tooltips, notifications, dropdowns. The teleported content still participates in the parent component's reactivity, event handling, and lifecycle. Multiple teleports can target the same container — they're appended in order. disabled prop conditionally disables teleporting. Deferred teleport (Vue 3.5+): defer prop waits for target to be in DOM — useful for teleporting into components rendered later.",tags:[{t:'Teleport',c:'#ecfdf5',b:'#41B883'},{t:'Modals',c:'#eff6ff',b:'#3b82f6'},{t:'Portal',c:'#fef9c3',b:'#d97706'}]},
{id:174,cat:'vue-qa',q:"What are Vue 3 performance optimisation techniques?",a:"(1) v-memo: skip sub-tree re-render unless deps change. (2) v-once: render static content once. (3) Lazy components with defineAsyncComponent. (4) virtualised lists with vue-virtual-scroller for large datasets. (5) shallowRef / shallowReactive for large objects where deep reactivity is unnecessary. (6) markRaw to exclude objects from reactivity (third-party class instances). (7) KeepAlive to cache component state and avoid re-mounting. (8) Avoid large reactive objects — prefer normalised stores. (9) Compile-time optimisations are automatic (patch flags, static hoisting). (10) Use Chrome DevTools + Vue DevTools Profiler.",tags:[{t:'v-memo',c:'#ecfdf5',b:'#41B883'},{t:'KeepAlive',c:'#eff6ff',b:'#3b82f6'},{t:'shallowRef',c:'#fef9c3',b:'#d97706'}]},
{id:175,cat:'vue-qa',q:"How does Vue handle transitions and animations?",a:"<Transition> wraps a single element/component — applies CSS classes during enter/leave: v-enter-from, v-enter-active, v-enter-to, v-leave-from, v-leave-active, v-leave-to. name prop customises prefix. CSS transitions or animations auto-detected. JavaScript hooks: @before-enter, @enter, @after-enter, @leave for programmatic animations (GSAP). <TransitionGroup> for lists — also applies move class (v-move) for position changes using FLIP technique. appear prop triggers transition on initial render. Transition modes: 'out-in' (current leaves then new enters), 'in-out'. Route transitions: wrap <RouterView> in <Transition>.",tags:[{t:'<Transition>',c:'#ecfdf5',b:'#41B883'},{t:'GSAP',c:'#eff6ff',b:'#3b82f6'},{t:'TransitionGroup',c:'#fef9c3',b:'#d97706'}]},
{id:176,cat:'vue-qa',q:"What is the Composition API's lifecycle hooks order in Vue 3?",a:"setup() runs synchronously before component is created (replaces beforeCreate/created). Then: onBeforeMount → onMounted (DOM available, safe for DOM-querying, third-party lib init) → onBeforeUpdate → onUpdated → onBeforeUnmount → onUnmounted (clean up: remove event listeners, timers, subscriptions). Additional: onErrorCaptured (catch child errors), onActivated/onDeactivated (KeepAlive), onServerPrefetch (SSR). All hooks must be called synchronously in setup() — not inside conditionals. watchEffect with { flush:'post' } runs after DOM updates, similar to onUpdated but scoped to specific deps.",tags:[{t:'onMounted',c:'#ecfdf5',b:'#41B883'},{t:'onUnmounted',c:'#eff6ff',b:'#3b82f6'},{t:'Lifecycle',c:'#fef9c3',b:'#d97706'}]},
{id:177,cat:'vue-qa',q:"How do you implement TypeScript with Vue 3?",a:"Vue 3 is written in TypeScript and has first-class TS support. &lt;script setup lang='ts'>. defineProps with generic syntax: defineProps<{title:string; count?:number}>() — no runtime declaration needed, fully typed. defineEmits<{change:[id:number]; update:[value:string]}>(). Typed computed: computed<string>(() => ...). Typed refs: ref<User|null>(null). For Options API: defineComponent() enables type inference. Global properties: declare module '@vue/runtime-core' { interface ComponentCustomProperties { $http: Axios } }. Volar (Vue Language Tools) VS Code extension for template type checking. Use strict mode in tsconfig.",tags:[{t:'TypeScript',c:'#ecfdf5',b:'#41B883'},{t:'defineProps<T>',c:'#eff6ff',b:'#3b82f6'},{t:'Volar',c:'#fef9c3',b:'#d97706'}]},
{id:178,cat:'vue-qa',q:"What is Vue's reactivity pitfalls and how do you avoid them?",a:"(1) Destructuring reactive(): loses reactivity — use toRefs(state) instead. (2) Replacing entire reactive object: reactive() tracks the original reference — reassignment breaks reactivity; use ref() or mutate properties. (3) Array index assignment: reactive arrays are Proxy-wrapped; arr[0]=val works, but for Vue 2 compatibility use splice. (4) Non-reactive nested objects: plain objects added to reactive after creation are auto-wrapped; class instances need markRaw or manual toRaw usage. (5) Watchers missing deep changes: use { deep:true } option. (6) Async setup state: state set before await still reactive; state set after await in same tick is fine.",tags:[{t:'Reactivity Pitfalls',c:'#ecfdf5',b:'#41B883'},{t:'toRefs',c:'#eff6ff',b:'#3b82f6'},{t:'markRaw',c:'#fef9c3',b:'#d97706'}]},
{id:179,cat:'vue-qa',q:"How does Vue compare to React in terms of mental model and use cases?",a:"Vue: HTML-centric templates, two-way binding (v-model), gentler learning curve, batteries-included (official Router, Pinia, CLI). Single File Components (.vue) colocate HTML/CSS/JS. Reactivity is automatic (Proxy-based). React: JS-centric (JSX), unidirectional data flow, larger ecosystem with more choice/complexity. Explicit state management via hooks. Both use virtual DOM, component model, and support SSR. Choose Vue when: team prefers template syntax, project needs faster onboarding, Nuxt for full-stack. Choose React when: large ecosystem preference, React Native mobile, heavy JS logic. Both excellent; choice often organisational.",tags:[{t:'Vue vs React',c:'#ecfdf5',b:'#41B883'},{t:'SFC',c:'#eff6ff',b:'#3b82f6'},{t:'Nuxt',c:'#fef9c3',b:'#d97706'}]},
{id:180,cat:'vue-qa',q:"What are Vue 3.5's major improvements and new features?",a:"Vue 3.5 (September 2024) highlights: (1) Reactive Props Destructure — const { count = 0 } = defineProps() is now reactive and replaces withDefaults(). (2) useTemplateRef() for template refs instead of ref() with matching name. (3) Deferred Teleport — defer prop waits for target mount. (4) onWatcherCleanup() — register cleanup in watchers. (5) useId() — generates SSR-safe unique IDs. (6) watch with deep:1 — watch only first level deep. (7) Custom Elements improvements. (8) Performance improvements: 56% memory reduction for reactive arrays, 10× faster large array operations. Minor API ergonomics throughout.",tags:[{t:'Vue 3.5',c:'#ecfdf5',b:'#41B883'},{t:'Props Destructure',c:'#eff6ff',b:'#3b82f6'},{t:'useTemplateRef',c:'#fef9c3',b:'#d97706'}]},
{id:181,cat:'graphql-qa',q:"What is GraphQL and how does it differ from REST?",a:"GraphQL is a query language and runtime for APIs. Client specifies exactly the data it needs — no over-fetching (too much data) or under-fetching (too little, requiring multiple requests). Single endpoint (POST /graphql). REST: multiple endpoints, each returns fixed shape. GraphQL advantages: precise data fetching, introspection/self-documenting, strongly typed schema, single request for related data, easy API evolution (add fields, deprecate old ones without versioning). Trade-offs: caching harder (POST vs GET), query complexity attacks, N+1 problem, over-engineering for simple APIs. Best for complex data graphs with many consumers.",tags:[{t:'GraphQL vs REST',c:'#fdf2f8',b:'#E535AB'},{t:'Single Endpoint',c:'#eff6ff',b:'#3b82f6'},{t:'Typed Schema',c:'#ecfdf5',b:'#059669'}]},
{id:182,cat:'graphql-qa',q:"What are the core building blocks of a GraphQL schema?",a:"(1) Types: scalar (Int, Float, String, Boolean, ID), object types (type User { id: ID!, name: String! }), enum, union, interface. (2) Query type — read operations. (3) Mutation type — write operations. (4) Subscription type — real-time events. (5) Input types — for mutation arguments. ! marks non-nullable. [Type] is a list. Schema Definition Language (SDL) is human-readable. Resolvers map each field to data-fetching logic. Arguments on fields: user(id: ID!): User. Directives: @deprecated(reason), @skip(if:), @include(if:). Introspection query (__schema, __type) enables tooling.",tags:[{t:'SDL',c:'#fdf2f8',b:'#E535AB'},{t:'Types',c:'#eff6ff',b:'#3b82f6'},{t:'Resolvers',c:'#ecfdf5',b:'#059669'}]},
{id:183,cat:'graphql-qa',q:"What is the N+1 problem in GraphQL and how does DataLoader solve it?",a:"N+1: fetching a list of N users then making a separate DB query per user to get their posts results in N+1 queries. Example: 100 users → 101 queries. DataLoader (Facebook) batches and caches requests within a single tick. Wrap resolver with DataLoader: new DataLoader(async (userIds) => fetchUsersByIds(userIds)). DataLoader collects all keys requested in one event loop tick, makes one batched call, returns results in matching order. Also caches per-request — same key fetched twice returns cached result. Use one DataLoader instance per request (not global) to avoid serving stale data across requests.",tags:[{t:'N+1 Problem',c:'#fdf2f8',b:'#E535AB'},{t:'DataLoader',c:'#eff6ff',b:'#3b82f6'},{t:'Batching',c:'#ecfdf5',b:'#059669'}]},
{id:184,cat:'graphql-qa',q:"What are GraphQL fragments and how are they used?",a:"Fragments are reusable field selections: fragment UserCard on User { id name avatar bio }. Used in queries: query { users { ...UserCard } }. Benefits: DRY field selection across multiple queries, co-location (component defines its own data requirements). Inline fragments: { ... on User { name } ... on Admin { permissions } } — used for union/interface types. Fragment composition is foundational to Relay's data-masking pattern. Named fragment variables (experimental): pass arguments to fragments. Tools like graphql-tag allow defining fragments next to components. Apollo Client encourages co-locating fragment with the component that uses it.",tags:[{t:'Fragments',c:'#fdf2f8',b:'#E535AB'},{t:'DRY Queries',c:'#eff6ff',b:'#3b82f6'},{t:'Inline Fragments',c:'#ecfdf5',b:'#059669'}]},
{id:185,cat:'graphql-qa',q:"How do GraphQL subscriptions work for real-time data?",a:"Subscriptions enable real-time push from server to client. Client sends subscription operation — server maintains long-lived connection (WebSocket or SSE). On event, server sends update matching the selection set. Schema: type Subscription { messageAdded(chatId: ID!): Message }. Resolver uses PubSub (publish/subscribe): asyncIterator for an event; publish when mutation fires. Apollo Server uses graphql-ws library (WebSocket protocol). Client: useSubscription hook (Apollo). Use cases: chat, live notifications, collaborative editing, dashboards. For scale, use Redis PubSub or Kafka to fan out events across multiple server instances.",tags:[{t:'Subscriptions',c:'#fdf2f8',b:'#E535AB'},{t:'WebSockets',c:'#eff6ff',b:'#3b82f6'},{t:'PubSub',c:'#ecfdf5',b:'#059669'}]},
{id:186,cat:'graphql-qa',q:"What is Apollo Client and how does its caching work?",a:"Apollo Client is the most popular GraphQL client for React. Features: declarative data fetching (useQuery, useMutation, useSubscription), normalised in-memory cache, optimistic UI, reactive variables, pagination helpers. Normalised cache: responses are flattened by __typename + id into a flat dictionary (Apollo InMemoryCache). Fetching the same entity via different queries shares cache entry — UI automatically consistent. Cache policies: cache-first (default), network-only, cache-and-network, no-cache. Update cache after mutation: refetchQueries, update function, or cache.modify. Apollo DevTools inspects cache state.",tags:[{t:'Apollo Client',c:'#fdf2f8',b:'#E535AB'},{t:'Normalised Cache',c:'#eff6ff',b:'#3b82f6'},{t:'useQuery',c:'#ecfdf5',b:'#059669'}]},
{id:187,cat:'graphql-qa',q:"How do you handle authentication and authorisation in GraphQL?",a:"Authentication: typically handled outside GraphQL layer. JWT in Authorization header, validated in middleware before reaching resolvers. User attached to context: context: ({ req }) => ({ user: verifyToken(req.headers.authorization) }). Resolvers access context.user. Authorisation: (1) In-resolver checks — if (!context.user) throw new AuthenticationError(). (2) Directive-based: @auth(requires: ADMIN) — directive transformer wraps resolver. (3) Schema-level with graphql-shield — rule-based permission layer as middleware. Rule: rule()(async (parent, args, ctx) => ctx.user?.role === 'ADMIN'). Never expose sensitive fields in public introspection. Disable introspection in production.",tags:[{t:'Auth',c:'#fdf2f8',b:'#E535AB'},{t:'Context',c:'#eff6ff',b:'#3b82f6'},{t:'graphql-shield',c:'#ecfdf5',b:'#059669'}]},
{id:188,cat:'graphql-qa',q:"What are GraphQL directives and how do you create custom ones?",a:"Directives add metadata/behaviour to schema or queries. Built-in: @deprecated(reason), @skip(if: Boolean!), @include(if: Boolean!), @specifiedBy. Schema directives modify type definitions — implement via transformer that wraps resolvers: mapSchema() + MapperKind. Example @auth directive checks context.user before resolver runs. Query directives (@skip, @include) are evaluated by executor. Custom scalar directives: @constraint(min:0, max:100) for input validation. Server-side: use graphql-constraint-directive or implement with makeExecutableSchema transformers. In SDL: directive @auth(requires: Role = USER) on FIELD_DEFINITION | OBJECT.",tags:[{t:'Directives',c:'#fdf2f8',b:'#E535AB'},{t:'@deprecated',c:'#eff6ff',b:'#3b82f6'},{t:'Schema Transform',c:'#ecfdf5',b:'#059669'}]},
{id:189,cat:'graphql-qa',q:"What is schema stitching and federation in GraphQL?",a:"Both solve splitting a large GraphQL API across multiple services. Schema stitching (older): gateway merges multiple remote schemas into one. Manual type merging required. Apollo Federation (recommended): each service defines its own subgraph schema with @key directive marking entity's primary key. Gateway (Apollo Router/Gateway) automatically composes supergraph. Services can extend types from other services with @external/@requires. Query planning: gateway determines which subgraphs to query and how to join results. Federation v2 improvements: shareable types, @override for migrations. Alternatives: GraphQL Mesh, WunderGraph.",tags:[{t:'Federation',c:'#fdf2f8',b:'#E535AB'},{t:'Subgraph',c:'#eff6ff',b:'#3b82f6'},{t:'Apollo Router',c:'#ecfdf5',b:'#059669'}]},
{id:190,cat:'graphql-qa',q:"How do you handle pagination in GraphQL?",a:"Three patterns: (1) Offset pagination: users(offset:0, limit:10). Simple but inconsistent with insertions. (2) Cursor-based (Relay spec): users(first:10, after:cursor). Returns edges:[{node, cursor}] and pageInfo:{hasNextPage, endCursor}. Stable with real-time data; standard for production. (3) Page-number: users(page:1, perPage:10). Apollo useQuery with fetchMore for cursor pagination. Merge policy in InMemoryCache: read/merge functions combine paginated results. For connections, implement Relay Cursor Connections spec for ecosystem compatibility. Cursor encodes position (e.g., base64-encoded row ID or timestamp).",tags:[{t:'Cursor Pagination',c:'#fdf2f8',b:'#E535AB'},{t:'Relay Spec',c:'#eff6ff',b:'#3b82f6'},{t:'fetchMore',c:'#ecfdf5',b:'#059669'}]},
{id:191,cat:'graphql-qa',q:"What is optimistic UI in Apollo Client and how is it implemented?",a:"Optimistic UI immediately updates the cache with an assumed successful response before the server replies, making the UI feel instant. On mutation, provide optimisticResponse: { __typename: 'Mutation', createPost: { __typename: 'Post', id: 'temp-id', title, body } }. Apollo writes this to cache immediately, re-renders UI. When server responds, real data replaces optimistic entry. If mutation errors, optimistic update is rolled back. Key: optimisticResponse must match exact shape of real response. Works with normalised cache — if temp-id differs from server id, update cache.modify or use refetchQueries as fallback.",tags:[{t:'Optimistic UI',c:'#fdf2f8',b:'#E535AB'},{t:'Cache Update',c:'#eff6ff',b:'#3b82f6'},{t:'optimisticResponse',c:'#ecfdf5',b:'#059669'}]},
{id:192,cat:'graphql-qa',q:"What security concerns exist in GraphQL APIs?",a:"(1) Introspection exposure — disable in production to not reveal schema to attackers. (2) Query complexity attacks — deeply nested queries consume server resources. Use graphql-query-complexity to calculate and reject expensive queries. (3) Query depth limiting — graphql-depth-limit rejects queries beyond max depth. (4) Rate limiting — limit by IP, user, or query complexity per time window. (5) Field-level authorisation — ensure resolvers check permissions. (6) Batching attacks — exploit DataLoader batching to enumerate data. (7) DOS via aliases — use query alias limits. (8) Injection — always use parameterised queries in resolvers, never interpolate args into SQL.",tags:[{t:'Security',c:'#fdf2f8',b:'#E535AB'},{t:'Query Complexity',c:'#eff6ff',b:'#3b82f6'},{t:'Rate Limiting',c:'#ecfdf5',b:'#059669'}]},
{id:193,cat:'graphql-qa',q:"What is Relay and how does it differ from Apollo Client?",a:"Relay (Facebook/Meta) is an opinionated GraphQL client designed for scale. Key differences from Apollo: (1) Relay requires Relay Server Spec (node interface, connections) — not optional. (2) Co-located fragments — components declare their own data needs; Relay compiler aggregates and validates at build time, not runtime. (3) Data masking — component only accesses its own fragment data, not siblings'. (4) Relay compiler — generates typed, optimised query artifacts. Apollo: more flexible, lower barrier, more ecosystem options, configurable. Choose Relay for very large apps where data graph complexity justifies the constraints. Apollo for most production React apps.",tags:[{t:'Relay',c:'#fdf2f8',b:'#E535AB'},{t:'Data Masking',c:'#eff6ff',b:'#3b82f6'},{t:'Relay Compiler',c:'#ecfdf5',b:'#059669'}]},
{id:194,cat:'graphql-qa',q:"How do you implement file uploads in GraphQL?",a:"GraphQL spec doesn't natively support file uploads (multipart form data). Options: (1) graphql-multipart-request-spec (jaydenseric) — middleware parses multipart requests, attaches Upload scalar to schema. Apollo Server supports this via graphql-upload-minimal. (2) Separate REST endpoint for upload, return URL, use URL in GraphQL mutation. (3) Presigned S3 URLs — mutation returns presigned URL; client uploads directly to S3; mutation then records the S3 key. Option 2 or 3 is recommended for production (avoids streaming large files through GraphQL server, easier CDN integration, better performance).",tags:[{t:'File Upload',c:'#fdf2f8',b:'#E535AB'},{t:'Presigned URL',c:'#eff6ff',b:'#3b82f6'},{t:'S3',c:'#ecfdf5',b:'#059669'}]},
{id:195,cat:'graphql-qa',q:"What are GraphQL errors and how should you handle them?",a:"GraphQL always returns 200 HTTP status (even on errors) with an errors array alongside data. Partial success possible: data has some fields, errors lists resolver failures. Error types: (1) Syntax/validation errors — before execution, entire request fails. (2) Resolver errors — data null for that field, error appended. Apollo Server error codes: UNAUTHENTICATED, FORBIDDEN, NOT_FOUND, BAD_USER_INPUT, INTERNAL_SERVER_ERROR. Custom errors: throw new GraphQLError('message', { extensions: { code:'CUSTOM_CODE', ...metadata } }). Don't leak internal error details to clients. In production, mask INTERNAL_SERVER_ERROR messages. Client: check errors array alongside data.",tags:[{t:'Error Handling',c:'#fdf2f8',b:'#E535AB'},{t:'GraphQLError',c:'#eff6ff',b:'#3b82f6'},{t:'Error Codes',c:'#ecfdf5',b:'#059669'}]},
{id:196,cat:'graphql-qa',q:"What is code-first vs schema-first GraphQL development?",a:"Schema-first: write SDL (.graphql files) first, then implement resolvers. Clear contract between frontend and backend. Type generation tools (GraphQL Code Generator) produce TypeScript types from SDL. Backend and frontend can develop in parallel against agreed schema. Good for teams with separate FE/BE. Code-first: write resolvers/types in code, schema SDL generated automatically. TypeGraphQL (TypeScript decorators), Pothos, Nexus. Pros: single source of truth, no SDL/resolver sync issues, better IDE support for refactoring, type-safe by construction. Cons: schema less visible to non-coders. Modern preference often code-first with TypeGraphQL or Pothos.",tags:[{t:'Schema-first',c:'#fdf2f8',b:'#E535AB'},{t:'Code-first',c:'#eff6ff',b:'#3b82f6'},{t:'TypeGraphQL',c:'#ecfdf5',b:'#059669'}]},
{id:197,cat:'graphql-qa',q:"How does GraphQL compare to tRPC and REST for a TypeScript fullstack app?",a:"tRPC: type-safe RPC using TypeScript inference — no schema, no codegen, types shared directly between server (Zod validators) and client. Zero latency for type updates. Best for fullstack TS monorepos where both ends controlled. GraphQL: strongly typed schema, language-agnostic, self-documenting, excellent ecosystem, supports multiple clients/platforms, federation for microservices. Best when: multiple clients (web, mobile, third-party), public API, team separation. REST: simple, cacheable (GET), wide tooling, easiest for public APIs. Choose: tRPC for TS monorepo; GraphQL for multi-client/multi-team; REST for public APIs or simple CRUD.",tags:[{t:'tRPC',c:'#fdf2f8',b:'#E535AB'},{t:'REST vs GraphQL',c:'#eff6ff',b:'#3b82f6'},{t:'Fullstack TS',c:'#fef9c3',b:'#d97706'}]},
{id:198,cat:'graphql-qa',q:"What is persisted queries in GraphQL and why use them?",a:"Persisted queries replace sending the full query string with a hash (ID). Client sends { id: 'abc123' } instead of the full query text. Server maps IDs to stored queries. Benefits: (1) Smaller request payload. (2) Security — only pre-registered queries can execute (whitelist), preventing arbitrary query injection. (3) GET requests possible for queries — enables HTTP caching/CDN. (4) APQ (Automatic Persisted Queries) in Apollo: client first sends hash; if server misses, client sends full query + hash; server stores for future. Trusted Documents (newest approach): build-time extraction of all client queries, registered server-side.",tags:[{t:'Persisted Queries',c:'#fdf2f8',b:'#E535AB'},{t:'APQ',c:'#eff6ff',b:'#3b82f6'},{t:'Security',c:'#ecfdf5',b:'#059669'}]},
{id:199,cat:'graphql-qa',q:"How do you implement real-time collaboration features with GraphQL?",a:"Real-time collaboration (e.g., Google Docs-like) requires: (1) GraphQL Subscriptions for live updates — user edits broadcast to all active subscribers. (2) Conflict resolution: Operational Transformation (OT) or CRDTs (Conflict-free Replicated Data Types). (3) Presence indicators: subscription notifying who is currently viewing/editing. (4) Optimistic updates on client for responsiveness. (5) Subscription topic design: subscribe to document-specific channel documentEdited(docId: ID!). (6) Scale with Redis PubSub for multi-instance pub/sub. Tools: Liveblocks, PartyKit abstract the complexity. For simpler cases, polling with useQuery pollInterval is viable.",tags:[{t:'Real-time',c:'#fdf2f8',b:'#E535AB'},{t:'CRDT',c:'#eff6ff',b:'#3b82f6'},{t:'Subscriptions',c:'#ecfdf5',b:'#059669'}]},
{id:200,cat:'graphql-qa',q:"What are the best practices for GraphQL schema design?",a:"(1) Design for the client, not the DB — schema reflects product requirements, not table structure. (2) Use specific types over generic JSON scalars. (3) Nullable by default — only use ! when truly guaranteed (avoids null propagation crashes). (4) Consistent naming: camelCase fields, PascalCase types, SCREAMING_SNAKE enums. (5) Relay Cursor Connections for all list fields intended to paginate. (6) Input types for mutations (not long argument lists). (7) Return types for mutations (not just Boolean) — return mutated resource. (8) @deprecated with reason instead of removal. (9) Avoid breaking changes — add fields, never remove. (10) Version intent via field names, not schema versions.",tags:[{t:'Schema Design',c:'#fdf2f8',b:'#E535AB'},{t:'Best Practices',c:'#eff6ff',b:'#3b82f6'},{t:'Relay Spec',c:'#ecfdf5',b:'#059669'}]},
{id:201,cat:'webpack-vite',q:"What is Webpack and what problem does it solve?",a:"Webpack is a static module bundler for JavaScript applications. It builds a dependency graph from one or more entry points, then bundles every module the app needs into one or more output bundles. Problems it solves: (1) Browser module support was inconsistent — Webpack let you use CommonJS/ESM before browsers supported it natively. (2) Asset management — CSS, images, fonts processed as modules. (3) Code splitting — split bundles to load only what is needed. (4) Tree shaking — remove unused exports. (5) Minification, transpilation via Babel, and source maps in one pipeline. Still the most configurable bundler; default in Angular CLI and legacy CRA projects.",tags:[{t:'Bundler',c:'#f0f0ff',b:'#646cff'},{t:'Dependency Graph',c:'#eff6ff',b:'#3b82f6'},{t:'Code Splitting',c:'#ecfdf5',b:'#059669'}]},
{id:202,cat:'webpack-vite',q:"Explain Webpack's core concepts: entry, output, loaders, plugins, and mode.",a:"Entry: the starting module Webpack builds its dependency graph from. Default: ./src/index.js. Multiple entries for multi-page apps. Output: where to emit bundles — filename and path. Default: ./dist/main.js. Loaders: transform non-JS files into valid modules. Applied right-to-left in rules array. Examples: babel-loader (JS transpile), css-loader + style-loader (CSS), file-loader/asset modules (images). Plugins: hook into the entire build lifecycle — HtmlWebpackPlugin, MiniCssExtractPlugin, DefinePlugin, BundleAnalyzerPlugin. Mode: 'development' (fast rebuilds, source maps) or 'production' (minification, tree shaking, optimisations).",tags:[{t:'Entry/Output',c:'#f0f0ff',b:'#646cff'},{t:'Loaders',c:'#eff6ff',b:'#3b82f6'},{t:'Plugins',c:'#fef9c3',b:'#d97706'}]},
{id:203,cat:'webpack-vite',q:"What is Vite and how does it fundamentally differ from Webpack?",a:"Vite is a next-generation build tool by Evan You (2020). Dev server: Vite serves source files over native ESM — the browser requests modules on demand. No bundling during dev. Instant server start regardless of app size. HMR updates only the changed module — sub-millisecond. Production: uses Rollup for optimised bundles. Key difference: Webpack bundles everything before serving (even in dev), so startup and HMR slow down as the app grows. Vite's dev server is O(1) in startup time. Vite pre-bundles node_modules with esbuild (written in Go, 10-100x faster than JS-based tools) to convert CJS to ESM and merge tiny modules.",tags:[{t:'Vite',c:'#fef9c3',b:'#d97706'},{t:'Native ESM',c:'#eff6ff',b:'#3b82f6'},{t:'Rollup',c:'#f0f0ff',b:'#646cff'}]},
{id:204,cat:'webpack-vite',q:"How does Webpack code splitting work? What are the three main methods?",a:"Code splitting breaks the bundle into smaller chunks loaded on demand, reducing initial JS payload. Three methods: (1) Entry points — multiple entry configs create separate bundles. Manual but blunt; duplicates shared modules without optimization.splitChunks. (2) SplitChunksPlugin (automatic) — Webpack analyses the graph and extracts shared modules. Creates vendor chunk (node_modules) and common chunk (shared app code). (3) Dynamic import() — import('./module').then() creates an async chunk loaded at runtime. React.lazy and Vue defineAsyncComponent use this. Best practice: combine SplitChunksPlugin for vendor splitting with dynamic import() for route-level splitting. Target initial bundle under 150KB.",tags:[{t:'Code Splitting',c:'#f0f0ff',b:'#646cff'},{t:'Dynamic import()',c:'#eff6ff',b:'#3b82f6'},{t:'SplitChunks',c:'#ecfdf5',b:'#059669'}]},
{id:205,cat:'webpack-vite',q:"What is tree shaking and how does Webpack implement it?",a:"Tree shaking eliminates dead code — unused exports that are never imported anywhere. Requires ES Modules (static imports/exports) because CommonJS require() is dynamic and cannot be statically analysed. How Webpack does it: (1) Marks exports as 'used' or 'unused' during module graph analysis. (2) Terser removes code marked unused in production mode. Conditions: use ESM, set sideEffects:false in package.json (or list files with side effects), use production mode. Common pitfalls: importing entire libraries (import _ from 'lodash' — use lodash-es instead), barrel files that re-export everything, and side-effectful imports such as polyfills.",tags:[{t:'Tree Shaking',c:'#f0f0ff',b:'#646cff'},{t:'ESM',c:'#eff6ff',b:'#3b82f6'},{t:'sideEffects',c:'#ecfdf5',b:'#059669'}]},
{id:206,cat:'webpack-vite',q:"How does Vite's Hot Module Replacement (HMR) work and why is it faster?",a:"Traditional Webpack HMR: on file change, Webpack re-bundles the affected module and all its dependents, then sends the new bundle over WebSocket. As app grows, this chain gets longer — HMR slows to seconds. Vite HMR: leverages native ESM. On change, Vite only invalidates the changed module and its direct importers in the browser's module graph. The browser re-fetches only those specific modules. Framework integrations (React Fast Refresh, Vue HMR) preserve component state across updates. Result: HMR stays fast regardless of app size — typically under 50ms even in large apps. No re-bundling cost because Vite never bundles during development.",tags:[{t:'HMR',c:'#fef9c3',b:'#d97706'},{t:'Native ESM',c:'#eff6ff',b:'#3b82f6'},{t:'Fast Refresh',c:'#ecfdf5',b:'#059669'}]},
{id:207,cat:'webpack-vite',q:"What is Webpack Module Federation and what problems does it solve?",a:"Module Federation (Webpack 5) allows multiple independent builds to share modules at runtime — the foundation of micro-frontend architecture. A host app can dynamically import modules from remote apps deployed separately. Configuration: ModuleFederationPlugin with name, filename:'remoteEntry.js', exposes (what to share), remotes (what to consume), and shared (shared singletons like React). Shared modules: specify singleton:true for React/React-DOM to ensure one instance across all micro-frontends. Problems solved: independent deployability (team A deploys without team B), shared dependencies, no monorepo required. Alternative: import maps for framework-agnostic federation.",tags:[{t:'Module Federation',c:'#f0f0ff',b:'#646cff'},{t:'Micro-frontends',c:'#eff6ff',b:'#3b82f6'},{t:'Webpack 5',c:'#ecfdf5',b:'#059669'}]},
{id:208,cat:'webpack-vite',q:"How do you optimise Webpack build performance for large applications?",a:"(1) Webpack 5 persistent caching: cache:{type:'filesystem'} — caches between runs, 90% faster rebuilds. (2) Narrow loader scope: include/exclude to process only src files. (3) thread-loader: run heavy loaders like Babel in worker threads. (4) esbuild-loader: replace babel-loader + ts-loader with esbuild (10-100x faster transpilation). (5) DllPlugin: pre-compile rarely-changing vendor libs. (6) Reduce resolve.extensions list. (7) Module aliases (resolve.alias) avoid deep traversal. (8) Analyse with webpack-bundle-analyzer and speed-measure-webpack-plugin. (9) Use production-only plugins in prod config only. (10) Split config into base/dev/prod with webpack-merge.",tags:[{t:'Performance',c:'#f0f0ff',b:'#646cff'},{t:'Persistent Cache',c:'#eff6ff',b:'#3b82f6'},{t:'esbuild-loader',c:'#ecfdf5',b:'#059669'}]},
{id:209,cat:'webpack-vite',q:"What is Vite's production build pipeline and how does Rollup fit in?",a:"Vite uses Rollup for production builds. Why not esbuild for prod? esbuild is extremely fast but has limitations: no advanced code splitting, no CSS code splitting, limited plugin ecosystem for complex scenarios. Rollup produces highly optimised ESM bundles with excellent tree shaking and a mature plugin ecosystem. Vite production pipeline: (1) Pre-bundle deps with esbuild (CJS to ESM conversion, merge tiny modules). (2) Source files: Vite plugins transform them, then Rollup bundles. (3) Output: chunked ESM bundles with hashed filenames, CSS code splitting, async chunk loading with preload directives. Vite plugins follow the Rollup plugin interface — most Rollup plugins work in Vite without changes.",tags:[{t:'Rollup',c:'#f0f0ff',b:'#646cff'},{t:'esbuild',c:'#fef9c3',b:'#d97706'},{t:'ESM',c:'#eff6ff',b:'#3b82f6'}]},
{id:210,cat:'webpack-vite',q:"How do you configure environment variables in Webpack vs Vite?",a:"Webpack: DefinePlugin replaces variables at compile time. new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}). Use dotenv-webpack for .env file support. Variables injected at build time — not real process.env at runtime. Vite: loads .env files automatically. Only variables prefixed with VITE_ are exposed to client: import.meta.env.VITE_API_URL. Non-prefixed vars are server-only. Built-in modes: development, production, staging with .env.mode files. Also: import.meta.env.MODE, .BASE_URL, .PROD, .DEV. Type-safe: create vite-env.d.ts with interface ImportMetaEnv. Vite is safer — only VITE_ prefixed vars reach the bundle, preventing accidental secret exposure.",tags:[{t:'DefinePlugin',c:'#f0f0ff',b:'#646cff'},{t:'import.meta.env',c:'#fef9c3',b:'#d97706'},{t:'.env files',c:'#ecfdf5',b:'#059669'}]},
{id:211,cat:'webpack-vite',q:"What are source maps and how do you configure them in Webpack and Vite?",a:"Source maps map minified/bundled code back to the original source — essential for debugging. Webpack devtool options: 'eval' (fastest, only line numbers), 'eval-source-map' (exact positions, good for dev), 'source-map' (separate .map file, full accuracy for prod), 'hidden-source-map' (no reference in bundle — upload to Sentry only). Vite: build.sourcemap: true | false | 'inline' | 'hidden'. Dev always uses inline maps. Best practices: never expose source maps publicly in production — they reveal your source code. Use hidden maps uploaded to error tracking (Sentry, Datadog). Source maps in production roughly double the build artifact size but are only downloaded by DevTools, not by regular users.",tags:[{t:'Source Maps',c:'#f0f0ff',b:'#646cff'},{t:'devtool',c:'#eff6ff',b:'#3b82f6'},{t:'hidden-source-map',c:'#ecfdf5',b:'#059669'}]},
{id:212,cat:'webpack-vite',q:"How does Webpack's resolve configuration work and what is module aliasing?",a:"resolve controls how Webpack finds modules. resolve.extensions: extension order to try — ['.ts','.tsx','.js','.jsx']. Fewer entries means faster resolution. resolve.alias: map import paths to absolute paths — '@': path.resolve(__dirname,'src') lets you write import '@/components/Button' instead of deep relative paths. resolve.modules: directories to search (['node_modules']). resolve.mainFields: which package.json field to use ('browser' for web, 'main' for Node). resolve.symlinks:false: performance gain in monorepos. In Vite: resolve.alias in vite.config.ts — also update tsconfig.json paths to match so TypeScript understands the aliases. Both configs must agree or IDE type checking breaks.",tags:[{t:'resolve.alias',c:'#f0f0ff',b:'#646cff'},{t:'Module Resolution',c:'#eff6ff',b:'#3b82f6'},{t:'tsconfig paths',c:'#ecfdf5',b:'#059669'}]},
{id:213,cat:'webpack-vite',q:"How do you implement lazy loading in Webpack vs Vite?",a:"Lazy loading defers code until needed — reducing initial bundle. Webpack: dynamic import() creates a separate chunk. const MyComp = React.lazy(() => import('./MyComp')). Magic comments: /* webpackChunkName: 'my-comp' */ names the chunk. /* webpackPrefetch: true */ adds a link prefetch hint — browser fetches during idle time. /* webpackPreload: true */ adds link preload — fetches in parallel with parent chunk. Vite: same dynamic import() syntax, Rollup handles chunk splitting. Chunk names via build.rollupOptions.output.manualChunks. No magic comments — use vite-plugin-chunk-split for advanced control. Both: route-based splitting is highest-impact (split at router level). Combine with React Suspense or Vue defineAsyncComponent for loading states.",tags:[{t:'Lazy Loading',c:'#f0f0ff',b:'#646cff'},{t:'Dynamic import()',c:'#eff6ff',b:'#3b82f6'},{t:'webpackPrefetch',c:'#ecfdf5',b:'#059669'}]},
{id:214,cat:'webpack-vite',q:"How does Vite handle CSS, SCSS, and CSS Modules out of the box?",a:"Vite has built-in CSS support requiring almost no config. Plain CSS: imports inject style tags in dev, extract to files in prod. PostCSS: auto-detected via postcss.config.js — Tailwind, autoprefixer work immediately. SCSS/Sass: install the sass package — no loader config needed. CSS Modules: files ending .module.css are automatically treated as CSS Modules. import styles from './Button.module.css' gives scoped class names. CSS code splitting: each async JS chunk gets its own CSS chunk loaded together. Compare to Webpack: requires manual chain of css-loader + style-loader or MiniCssExtractPlugin + sass-loader, and explicit module rules. Vite's zero-config approach saves significant setup time.",tags:[{t:'CSS Modules',c:'#f0f0ff',b:'#646cff'},{t:'PostCSS',c:'#eff6ff',b:'#3b82f6'},{t:'SCSS',c:'#ecfdf5',b:'#059669'}]},
{id:215,cat:'webpack-vite',q:"What is the difference between Webpack loaders and plugins?",a:"Loaders: transform individual files before they enter the dependency graph. Work at the per-file level. Configured in module.rules. Applied right-to-left (last in array runs first). Examples: babel-loader transforms JS, css-loader parses CSS @import, ts-loader compiles TypeScript, file-loader handles binary assets. Loaders only transform file content — they cannot affect the broader build process. Plugins: tap into the Webpack compiler lifecycle via hooks. Access to the entire compilation object. Can emit files, modify chunk graph, inject HTML, define constants, analyse output. Examples: HtmlWebpackPlugin, MiniCssExtractPlugin, DefinePlugin, TerserPlugin, CompressionPlugin. Rule of thumb: need to transform a file type → loader. Need to affect the build pipeline → plugin.",tags:[{t:'Loaders',c:'#f0f0ff',b:'#646cff'},{t:'Plugins',c:'#fef9c3',b:'#d97706'},{t:'Build Pipeline',c:'#ecfdf5',b:'#059669'}]},
{id:216,cat:'webpack-vite',q:"How do you migrate a project from Webpack/CRA to Vite?",a:"Step-by-step: (1) Install: npm i -D vite @vitejs/plugin-react. (2) Create vite.config.ts. (3) Move index.html from public/ to root — Vite uses it as entry. Add a module script tag pointing to src/main.tsx. (4) Replace process.env.REACT_APP_* with import.meta.env.VITE_*. (5) Replace require() calls with import. (6) Remove CRA-specific polyfills (CRA added many automatically). (7) Webpack aliases (@) become Vite resolve.alias — also update tsconfig.json paths to match. (8) Remove react-scripts and webpack-related packages. (9) Update build scripts in package.json. (10) Test both dev and production build. Common gotchas: dynamic require() in dependencies, __dirname usage, non-standard asset imports, and CRA-specific environment variable naming.",tags:[{t:'CRA to Vite',c:'#f0f0ff',b:'#646cff'},{t:'Migration',c:'#fef9c3',b:'#d97706'},{t:'vite.config.ts',c:'#ecfdf5',b:'#059669'}]},
{id:217,cat:'webpack-vite',q:"What is Rollup and when should you use it instead of Webpack or Vite?",a:"Rollup is a module bundler focused on ES modules, pioneered by Rich Harris. Key differences from Webpack: (1) Cleaner output — no module runtime injected, pure JS output ideal for libraries. (2) Superior tree shaking — more aggressive, designed for ESM from the start. (3) Multiple output formats from one config: ESM, CJS, UMD, IIFE. (4) Simpler configuration for library use cases. (5) Less mature code splitting for complex apps. Use Rollup for: npm packages, component libraries, utility libraries — anywhere bundle quality matters more than dev tooling. Use Webpack for: complex web apps with module federation, advanced code splitting, legacy browser support. Use Vite for: modern web apps — it uses Rollup internally for production and adds the DX layer on top.",tags:[{t:'Rollup',c:'#f0f0ff',b:'#646cff'},{t:'Library Bundling',c:'#eff6ff',b:'#3b82f6'},{t:'ESM output',c:'#ecfdf5',b:'#059669'}]},
{id:218,cat:'webpack-vite',q:"How does Vite support SSR (Server-Side Rendering)?",a:"Vite has built-in SSR mode. Key concepts: (1) Separate builds: vite build --ssr src/entry-server.ts produces a Node.js bundle; vite build produces the client bundle. (2) Dev server: vite.ssrLoadModule() loads server modules with HMR support. (3) Conditional code: import.meta.env.SSR is true in SSR context — use to avoid browser-only APIs. (4) Manual server: create Express or Fastify server, load SSR bundle, render to HTML string, inject into index.html template, send response. Frameworks built on Vite SSR: Nuxt 3 (Vue), SvelteKit, Astro, Vike (formerly vite-plugin-ssr). Vite SSR is lower-level than Next.js — requires more setup but gives full control over the server.",tags:[{t:'SSR',c:'#f0f0ff',b:'#646cff'},{t:'ssrLoadModule',c:'#eff6ff',b:'#3b82f6'},{t:'SvelteKit/Nuxt',c:'#ecfdf5',b:'#059669'}]},
{id:219,cat:'webpack-vite',q:"What is esbuild and why is it central to modern build tooling?",a:"esbuild is a JavaScript/TypeScript bundler and minifier written in Go by Evan Wallace. It is 10-100x faster than JS-based tools. Why so fast: compiled native binary (not interpreted), parallelises work across all CPU cores, no excessive AST transformations between phases. Used by: Vite (pre-bundles node_modules, powers dev transform pipeline), Vitest, tsup, unbuild, many others. Capabilities: bundling, minification, TypeScript and JSX transpilation, tree shaking, source maps. Limitations: no TypeScript type checking (run tsc --noEmit separately), limited plugin API compared to Webpack, immature CSS modules, no complex code splitting. Best role: transpiler and pre-processor, not a standalone full production bundler for complex enterprise apps.",tags:[{t:'esbuild',c:'#f0f0ff',b:'#646cff'},{t:'Go runtime',c:'#fef9c3',b:'#d97706'},{t:'Transpiler',c:'#ecfdf5',b:'#059669'}]},
{id:220,cat:'webpack-vite',q:"How do you analyse and reduce bundle size in Webpack and Vite?",a:"Analysis tools — Webpack: webpack-bundle-analyzer produces an interactive treemap of chunk sizes and dependencies. Vite: rollup-plugin-visualizer gives the same treemap. Optimisation strategies: (1) Identify large dependencies — replace moment.js (67KB) with dayjs (7KB), lodash with lodash-es for proper tree shaking. (2) Dynamic import() for heavy libraries used conditionally. (3) Verify tree shaking works — check if entire lodash is bundled accidentally. (4) Use bundlephobia.com before adding any package. (5) Enable Brotli/gzip compression: Webpack CompressionPlugin, Vite vite-plugin-compression. (6) Optimise images: vite-plugin-imagemin. (7) Set performance budgets: Webpack performance.maxAssetSize to enforce limits in CI. Target: initial JS under 150KB gzipped.",tags:[{t:'Bundle Analyzer',c:'#f0f0ff',b:'#646cff'},{t:'Tree Shaking',c:'#eff6ff',b:'#3b82f6'},{t:'Performance Budget',c:'#ecfdf5',b:'#059669'}]},
];
const CAT_META={
arch: {label:'Architecture', color:'#8b7ae8', bg:'#ede9fe'}, perf: {label:'Performance', color:'#d97706', bg:'#fef9c3'}, design:{label:'Design Systems',color:'#a855f7', bg:'#fdf4ff'}, infra: {label:'Tooling & Infra',color:'#3b82f6', bg:'#eff6ff'}, collab:{label:'Leadership', color:'#059669', bg:'#ecfdf5'}, security:{label:'Security', color:'#ef4444', bg:'#fef2f2'},
'react-redux':{label:'React & Redux', color:'#61DAFB', bg:'#e0f7fe'},
javascript:{label:'JavaScript (ES6+)', color:'#d97706', bg:'#fef9c3'},
sysdesign:{label:'System Design', color:'#8b7ae8', bg:'#ede9fe'},
'nextjs-qa':{label:'Next.js', color:'#374151', bg:'#f3f4f6'},
'angular-qa':{label:'Angular', color:'#dd0031', bg:'#fef2f2'},
'vue-qa':{label:'Vue.js', color:'#41B883', bg:'#ecfdf5'},
'graphql-qa':{label:'GraphQL', color:'#E535AB', bg:'#fdf2f8'},
'webpack-vite':{label:'Webpack & Vite', color:'#f97316', bg:'#fff7ed'},
'webpack-vite':{label:'Webpack & Vite', color:'#646cff', bg:'#f0f0ff'},
};
let qaCurrentFilter='all';

function renderQA(filter){
filter = filter || qaCurrentFilter;
qaCurrentFilter = filter;
const grid = document.getElementById('qa-grid');
if(!grid) return;
const items = filter==='all' ? QA_DATA : QA_DATA.filter(q=>q.cat===filter);
grid.innerHTML = items.map(q=>{
const meta = CAT_META[q.cat]||{color:'#6b7280',bg:'#f9fafb',label:q.cat};
const diagramHTML = q.diagram ? `<div class="qa-diagram">${q.diagram.map(row=>`<div class="qa-row">${row.map(cell=>{
if(cell.arr) return `<div class="qa-arrow">${cell.arr}</div>`;
return `<div class="qa-pill" style="background:${cell.c||'var(--bg)'};border-left-color:${cell.b||'var(--border)'};color:${cell.b||'var(--t2)'};">${cell.txt}</div>`; }).join('')}</div>`).join('')}</div>` : '';
const tagsHTML = q.tags ? `<div class="qa-box">${q.tags.map(t=>`<span class="qa-tag" style="background:${t.c};color:${t.b};border:1px solid ${t.b}40;">${t.t}</span>`).join('')}</div>` : '';
return `<div class="qa-card" id="qa-card-${q.id}">
<div class="qa-q" onclick="toggleQA(${q.id})">
<div class="qa-num" style="background:${meta.color};">${q.id}</div>
<div class="qa-qtxt">${q.q}</div>
<svg class="qa-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
</div>
<div class="qa-a"><div class="qa-a-inner">
<span class="qa-tag" style="background:${meta.bg};color:${meta.color};border:1px solid ${meta.color}30;margin-top:0.8rem;display:inline-block;">${meta.label}</span>
<p>${q.a}</p>
${diagramHTML}
${tagsHTML}
</div></div>
</div>`;
}).join('');
}

function toggleQA(id){
const card = document.getElementById('qa-card-'+id);
if(!card) return;
const isOpen = card.classList.contains('open');
document.querySelectorAll('.qa-card.open').forEach(c => c.classList.remove('open'));
if(!isOpen) card.classList.add('open');
}

function qaFilter(cat, btn){
document.querySelectorAll('#qa-filter-bar button').forEach(b=>b.classList.remove('active')); if(btn) btn.classList.add('active');
renderQA(cat);
}

function beSelect(tech, btn){
document.querySelectorAll('.be-tech-card').forEach(c=>c.classList.remove('active')); document.querySelectorAll('.be-section').forEach(s=>s.classList.remove('active')); if(btn) btn.classList.add('active');
const section = document.getElementById('be-'+tech); if(section) section.classList.add('active');
const map = {
node:['initNodeEventLoop','initNodeStreams'], express:['initExpressMw','initExpressArch'], mongo:['initMongoArch'], postgres:['initPgArch','initPgNode'],
};
if(section){ void section.offsetHeight; }
setTimeout(()=>{
if(section){ void section.offsetHeight; }
(map[tech]||[]).forEach(fn=>{ if(typeof window[fn]==='function') window[fn](); });
initBeStack();
}, 100);
}

function beRR(ctx,x,y,w,h,r,fill,stroke,sw){
ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):ctx.rect(x,y,w,h);
if(fill){ctx.fillStyle=fill;ctx.fill();}
if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=sw||1.5;ctx.stroke();}
}

function beTxt(ctx,t,x,y,size,color,align,weight){
ctx.font=(weight||400)+' '+size+'px "DM Sans",system-ui,sans-serif';
ctx.fillStyle=color;ctx.textAlign=align||'left';ctx.textBaseline='middle';ctx.fillText(t,x,y);
}

function beGlow(ctx,x,y,r,color){

const base = (color||'#ffffff').length > 7 ? color.slice(0,7) : color;
const g=ctx.createRadialGradient(x,y,0,x,y,r);
g.addColorStop(0,base+'55');g.addColorStop(1,base+'00');
ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
}

function beDot(ctx,x,y,color,r){
ctx.beginPath();ctx.arc(x,y,r||4,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
}

function beArrow(ctx,x1,y1,x2,y2,color,dashed){
ctx.beginPath();
if(dashed){ctx.setLineDash([4,3]);}else{ctx.setLineDash([]);}
ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);
ctx.strokeStyle=color;ctx.lineWidth=1.8;ctx.stroke();ctx.setLineDash([]);
const a=Math.atan2(y2-y1,x2-x1);
ctx.beginPath();ctx.moveTo(x2,y2);
ctx.lineTo(x2-8*Math.cos(a-0.4),y2-8*Math.sin(a-0.4));
ctx.lineTo(x2-8*Math.cos(a+0.4),y2-8*Math.sin(a+0.4));
ctx.closePath();ctx.fillStyle=color;ctx.fill();
}
const NODE={ctx:null,t:0,raf:null,mode:'idle'};

function initNodeEventLoop(){
const ctx=setupCvs('cvs-node-eventloop');if(!ctx)return;
NODE.ctx=ctx;NODE.t=0;cancelAnimationFrame(NODE.raf);animNodeEventLoop();
}

function nodeAnim(m){NODE.mode=m;}

function animNodeEventLoop(){
const ctx=NODE.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);beRR(ctx,0,0,W,H,0,'#0d1117');
NODE.t++;
const cx=W*.5,cy=H*.5,R=Math.min(W,H)*.32;
ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);
ctx.strokeStyle='rgba(104,160,99,0.15)';ctx.lineWidth=2;ctx.stroke();
const phases=[
{label:'timers',sub:'setTimeout',angle:-Math.PI/2,c:'#68a063'}, {label:'pending\ncallbacks',sub:'I/O errors',angle:-Math.PI/2+Math.PI/3,c:'#f59e0b'}, {label:'poll',sub:'I/O events',angle:-Math.PI/2+2*Math.PI/3,c:'#3b82f6'}, {label:'check',sub:'setImmediate',angle:-Math.PI/2+Math.PI,c:'#a855f7'}, {label:'close\ncallbacks',sub:'socket.destroy',angle:-Math.PI/2+4*Math.PI/3,c:'#ef4444'}, {label:'idle\nprepare',sub:'internal',angle:-Math.PI/2+5*Math.PI/3,c:'#6b7280'},
];
const speed={idle:0,http:0.018,fs:0.016,timer:0.014}[NODE.mode]||0;
const ptr=((NODE.t*speed)%(Math.PI*2));
if(speed>0){
beGlow(ctx,cx+Math.cos(ptr-Math.PI/2)*R,cy+Math.sin(ptr-Math.PI/2)*R,24,'#68a063');
beDot(ctx,cx+Math.cos(ptr-Math.PI/2)*R,cy+Math.sin(ptr-Math.PI/2)*R,'#68a063',6);
}
phases.forEach((p,i)=>{
const px=cx+Math.cos(p.angle)*R, py=cy+Math.sin(p.angle)*R;
const near=speed>0&&Math.abs(((NODE.t*speed)%(Math.PI*2))-(p.angle+Math.PI/2+Math.PI*2)%(Math.PI*2))<0.4;
if(near)beGlow(ctx,px,py,30,p.c);
beRR(ctx,px-42,py-20,84,40,8,near?p.c+'22':'#161b22',near?p.c:'#30363d',near?2:1);
beTxt(ctx,p.label,px,py-3,10.5,near?p.c:'#8b949e','center',600); beTxt(ctx,p.sub,px,py+12,9,'#484f58','center');
});
beRR(ctx,cx-46,cy-22,92,44,10,'#161b22','#30363d',1.5); beTxt(ctx,'Node.js',cx,cy-5,12,'#68a063','center',600); beTxt(ctx,'Event Loop',cx,cy+11,10,'#484f58','center');
const desc={idle:'Event loop waiting -- poll phase blocks waiting for I/O',http:'HTTP request -> poll phase picks up connection -> callback queued -> timers',fs:'File I/O -> libuv thread pool -> completion triggers pending callbacks phase',timer:'setTimeout(0) -> timers phase executes when threshold elapsed'}[NODE.mode];
if(desc){
beRR(ctx,10,H-36,W-20,26,6,'#161b22','#30363d',1); beTxt(ctx,desc,W/2,H-19,9.5,'#8b949e','center');
}
beRR(ctx,10,10,120,30,7,'#0d2818','#68a063',1.5); beTxt(ctx,'libuv thread pool',70,29,9.5,'#68a063','center',600);
NODE.raf=requestAnimationFrame(animNodeEventLoop);
}
const NSTREAM={ctx:null,t:0,raf:null,mode:'pipe'};

function initNodeStreams(){
const ctx=setupCvs('cvs-node-streams');if(!ctx)return;
NSTREAM.ctx=ctx;NSTREAM.t=0;cancelAnimationFrame(NSTREAM.raf);animNodeStreams();
}

function nodeStreamAnim(m){NSTREAM.mode=m;}

function animNodeStreams(){
const ctx=NSTREAM.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);beRR(ctx,0,0,W,H,0,'#0d1117');
NSTREAM.t++;
if(NSTREAM.mode==='pipe'){ const nodes=[{x:W*.1,label:'fs.Readable',sub:'source',c:'#68a063'},{x:W*.35,label:'zlib.Transform',sub:'compress',c:'#f59e0b'},{x:W*.6,label:'crypto.Transform',sub:'encrypt',c:'#a855f7'},{x:W*.85,label:'fs.Writable',sub:'destination',c:'#3b82f6'}];
const y=H*.45;
nodes.forEach((n,i)=>{
beRR(ctx,n.x-46,y-24,92,48,9,n.c+'18',n.c,1.8); beTxt(ctx,n.label,n.x,y-7,10,n.c,'center',600); beTxt(ctx,n.sub,n.x,y+11,9,'#484f58','center');
if(i<nodes.length-1){
const nx=nodes[i+1].x;
beArrow(ctx,n.x+46,y,nx-46,y,n.c+'88');
const pp=((NSTREAM.t*0.016-i*0.4)+4)%1;
const px=n.x+46+(nx-46-n.x-46)*pp;
beGlow(ctx,px,y,14,n.c);beDot(ctx,px,y,n.c,4);
}
});
beTxt(ctx,'Stream pipeline: data flows chunk-by-chunk without loading entire file into memory',W/2,H-12,10,'#484f58','center'); } else if(NSTREAM.mode==='backpressure'){
const ry=H*.35,wy=H*.65;
beRR(ctx,W*.15-50,ry-22,100,44,9,'#68a063','#68a063',1.8);beTxt(ctx,'Readable',W*.15,ry-5,11,'#68a063','center',600);beTxt(ctx,'fast source',W*.15,ry+12,9,'#484f58','center'); beRR(ctx,W*.75-50,wy-22,100,44,9,'#ef444422','#ef4444',1.8);beTxt(ctx,'Writable',W*.75,wy-5,11,'#ef4444','center',600);beTxt(ctx,'slow sink',W*.75,wy+12,9,'#484f58','center');
const filled=0.7+0.25*Math.sin(NSTREAM.t*0.04);
beRR(ctx,W*.43-40,H*.38,80,H*.24,8,'#161b22','#30363d',1.5);
beRR(ctx,W*.43-36,H*.38+4+H*.24*(1-filled)-8,72,H*.24*filled,6,'#f59e0b44'); beTxt(ctx,'Buffer',W*.43,H*.5,10,'#f59e0b','center',600);
beTxt(ctx,`${Math.round(filled*100)}% full`,W*.43,H*.5+14,9,'#484f58','center');
beArrow(ctx,W*.15+50,ry,W*.43-40,H*.5,'#68a063');
beArrow(ctx,W*.43+40,H*.5,W*.75-50,wy,'#3b82f6');
if(filled>0.85){
beRR(ctx,W*.5-70,H*.18,140,24,6,'#2d1515','#ef444488',1); beTxt(ctx,'⚠ Backpressure -- write() returned false',W*.5,H*.18+15,9.5,'#ef4444','center');
}
beTxt(ctx,'Backpressure: writable signals readable to pause when buffer is full',W/2,H-12,10,'#484f58','center'); } else if(NSTREAM.mode==='worker'){ const main={x:W*.22,y:H*.45,label:'Main Thread',sub:'Event Loop',c:'#68a063'}; const worker={x:W*.65,y:H*.45,label:'Worker Thread',sub:'CPU work',c:'#a855f7'}; const result={x:W*.88,y:H*.45,label:'Result',sub:'postMessage',c:'#3b82f6'};
[main,worker,result].forEach(n=>{
beGlow(ctx,n.x,n.y,28,n.c+'44');
beRR(ctx,n.x-50,n.y-24,100,48,9,n.c+'18',n.c,1.8);
beTxt(ctx,n.label,n.x,n.y-7,11,n.c,'center',600); beTxt(ctx,n.sub,n.x,n.y+11,9,'#484f58','center');
});
beArrow(ctx,main.x+50,main.y-8,worker.x-50,worker.y-8,'#a855f7');
beArrow(ctx,worker.x+50,worker.y+8,result.x-50,result.y+8,'#3b82f6');
const pp=(NSTREAM.t*0.014)%1;
beDot(ctx,main.x+50+(worker.x-50-main.x-50)*pp,main.y-8,'#a855f7',4); beTxt(ctx,'Worker Threads offload CPU-heavy tasks -- main event loop stays responsive',W/2,H-12,10,'#484f58','center');
}
NSTREAM.raf=requestAnimationFrame(animNodeStreams);
}
const EXPMW={ctx:null,t:0,raf:null,mode:'req'};

function initExpressMw(){
const ctx=setupCvs('cvs-express-mw');if(!ctx)return;
EXPMW.ctx=ctx;EXPMW.t=0;cancelAnimationFrame(EXPMW.raf);animExpressMw();
}

function expressAnim(m){EXPMW.mode=m;}

function animExpressMw(){
const ctx=EXPMW.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);beRR(ctx,0,0,W,H,0,'#0d1117');
EXPMW.t++;
if(EXPMW.mode==='req'){
const mws=[
{label:'cors()',sub:'headers',c:'#68a063',x:W*.12}, {label:'helmet()',sub:'security',c:'#ef4444',x:W*.27}, {label:'rateLimit()',sub:'throttle',c:'#f59e0b',x:W*.42}, {label:'auth JWT',sub:'verify token',c:'#a855f7',x:W*.57}, {label:'validate()',sub:'zod schema',c:'#3b82f6',x:W*.72}, {label:'Route Handler',sub:'business logic',c:'#22c55e',x:W*.88},
];
const y=H*.4;
beRR(ctx,4,y-18,50,36,7,'#1c2128','#3d8b40',1.5); beTxt(ctx,'REQ',29,y-3,11,'#68a063','center',600);beTxt(ctx,'HTTP',29,y+12,9,'#484f58','center'); beArrow(ctx,54,y,mws[0].x-44,y,'#68a063');
mws.forEach((mw,i)=>{
const active=Math.floor((EXPMW.t*0.03))%mws.length===i;
if(active)beGlow(ctx,mw.x,y,30,mw.c);
beRR(ctx,mw.x-44,y-24,88,48,9,mw.c+(active?'22':'0d'),mw.c,active?2:1.2);
beTxt(ctx,mw.label,mw.x,y-6,10.5,mw.c,'center',600); beTxt(ctx,'next()',mw.x,y+9,9,'#484f58','center'); beTxt(ctx,mw.sub,mw.x,y+22,8.5,'#30363d','center');
if(i<mws.length-1) beArrow(ctx,mw.x+44,y,mws[i+1].x-44,y,mw.c+'88');
});
const resy=H*.72;
beRR(ctx,W*.88-40,resy-18,80,36,7,'#0d2818','#22c55e',1.5); beTxt(ctx,'res.json()',W*.88,resy-3,10,'#22c55e','center',600);
beArrow(ctx,W*.88,y+24,W*.88,resy-18,'#22c55e88',true); beTxt(ctx,'Request flows left->right through middleware chain, response sent from route handler',W/2,H-12,9.5,'#484f58','center'); } else if(EXPMW.mode==='error'){ const norm=[{x:W*.18,label:'cors()',c:'#68a063'},{x:W*.36,label:'auth()',c:'#a855f7'},{x:W*.54,label:'validate()',c:'#3b82f6'}]; const err={x:W*.75,label:'Error MW',sub:'(err,req,res,next)',c:'#ef4444'};
const y=H*.38;
beRR(ctx,4,y-18,50,36,7,'#1c2128','#3d8b40',1.5); beTxt(ctx,'REQ',29,y-3,11,'#68a063','center',600); beArrow(ctx,54,y,norm[0].x-40,y,'#68a063');
norm.forEach((n,i)=>{
beRR(ctx,n.x-40,y-22,80,44,8,n.c+'18',n.c,1.5); beTxt(ctx,n.label,n.x,y+0,11,n.c,'center',600);
if(i<norm.length-1) beArrow(ctx,n.x+40,y,norm[i+1].x-40,y,n.c+'88');
});
const errX=norm[2].x,errY=H*.7;
beArrow(ctx,errX,y+22,errX,errY-18,'#ef4444',true); beRR(ctx,errX-55,errY-18,110,36,8,'#2d1515','#ef444488',1.5); beTxt(ctx,'throw new AppError()',errX,errY+0,9.5,'#ef4444','center',500);
beArrow(ctx,errX+55,errY,err.x-52,errY,'#ef4444'); beRR(ctx,err.x-52,errY-26,104,52,9,'#2d1515','#ef4444',2); beGlow(ctx,err.x,errY,36,'#ef4444'); beTxt(ctx,err.label,err.x,errY-8,11,'#ef4444','center',600); beTxt(ctx,err.sub,err.x,errY+10,8.5,'#ef4444','center'); beTxt(ctx,'next(err) skips normal middleware and jumps directly to error handler (4-arg middleware)',W/2,H-12,9.5,'#484f58','center'); } else if(EXPMW.mode==='router'){
const routes=[
{path:'GET /api/users',c:'#68a063',x:W*.22,y:H*.25}, {path:'POST /api/users',c:'#f59e0b',x:W*.22,y:H*.42}, {path:'GET /api/orders',c:'#3b82f6',x:W*.22,y:H*.59}, {path:'DELETE /api/orders/:id',c:'#ef4444',x:W*.22,y:H*.76},
];
const handler={x:W*.65,label:'Router.use()',sub:'Feature Router',c:'#a855f7'};
beRR(ctx,W*.04,H*.2,90,16*routes.length,6,'#161b22','#30363d',1); beTxt(ctx,'app.js',W*.04+45,H*.2-8,10,'#484f58','center',600);
routes.forEach(r=>{
beRR(ctx,r.x-70,r.y-16,140,32,7,r.c+'18',r.c+'88',1.3);
beTxt(ctx,r.path,r.x,r.y+3,9.5,r.c,'center',500);
beArrow(ctx,r.x+70,r.y,handler.x-50,handler.y,r.c+'66');
});
beGlow(ctx,handler.x,handler.y,36,'#a855f7');
beRR(ctx,handler.x-50,handler.y-28,100,56,10,'#1a1030','#a855f7',2);
beTxt(ctx,handler.label,handler.x,handler.y-10,11,'#a855f7','center',600);
beTxt(ctx,handler.sub,handler.x,handler.y+8,9.5,'#a855f7','center');
const handlers=[{x:W*.88,y:H*.3,label:'userController',c:'#68a063'},{x:W*.88,y:H*.62,label:'orderController',c:'#3b82f6'}];
handlers.forEach(h=>{
beRR(ctx,h.x-56,h.y-20,112,40,8,h.c+'18',h.c,1.5);
beTxt(ctx,h.label,h.x,h.y+3,10,h.c,'center',600);
beArrow(ctx,handler.x+50,handler.y,h.x-56,h.y,h.c+'88');
});
beTxt(ctx,'Router groups related routes -- each router is a mini-app mounted at a path prefix',W/2,H-12,9.5,'#484f58','center');
}
EXPMW.raf=requestAnimationFrame(animExpressMw);
}
const EXPARCH={ctx:null,t:0,raf:null,mode:'layers'};

function initExpressArch(){
const ctx=setupCvs('cvs-express-arch');if(!ctx)return;
EXPARCH.ctx=ctx;EXPARCH.t=0;cancelAnimationFrame(EXPARCH.raf);animExpressArch();
}

function expressArchAnim(m){EXPARCH.mode=m;}

function animExpressArch(){
const ctx=EXPARCH.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);beRR(ctx,0,0,W,H,0,'#0d1117');
EXPARCH.t++;
if(EXPARCH.mode==='layers'){
const layers=[
{label:'Route Layer',sub:'HTTP parsing, input extraction',c:'#f59e0b',y:H*.2}, {label:'Service Layer',sub:'Business logic, orchestration',c:'#22c55e',y:H*.42}, {label:'Data Access Layer',sub:'DB queries, repository pattern',c:'#3b82f6',y:H*.64},
];
const lw=Math.min(W*.55,400),lx=(W-lw)/2;
layers.forEach((l,i)=>{
const active=Math.floor(EXPARCH.t*0.02)%3===i;
if(active)beGlow(ctx,W/2,l.y,40,l.c);
beRR(ctx,lx,l.y-26,lw,52,10,active?l.c+'22':'#161b22',l.c,active?2:1.2);
beTxt(ctx,l.label,W/2,l.y-8,12,l.c,'center',600); beTxt(ctx,l.sub,W/2,l.y+11,9.5,'#484f58','center');
if(i<layers.length-1) beArrow(ctx,W/2,l.y+26,W/2,layers[i+1].y-26,l.c+'88',true);
});
beTxt(ctx,'3-layer architecture: each layer has single responsibility -- routes never touch DB',W/2,H-12,9.5,'#484f58','center'); } else if(EXPARCH.mode==='auth'){
const steps=[
{label:'Request',c:'#68a063',x:W*.08}, {label:'JWT Middleware',sub:'verify & decode',c:'#a855f7',x:W*.28}, {label:'Role Check',sub:'authorize',c:'#f59e0b',x:W*.5}, {label:'Handler',sub:'execute',c:'#22c55e',x:W*.72}, {label:'Response',c:'#3b82f6',x:W*.9},
];
const y=H*.42;
steps.forEach((s,i)=>{
const active=Math.floor(EXPARCH.t*0.025)%steps.length===i;
if(active)beGlow(ctx,s.x,y,28,s.c);
beRR(ctx,s.x-42,y-22,84,44,8,s.c+(active?'22':'18'),s.c,active?2:1.3);
beTxt(ctx,s.label,s.x,y-5,10.5,s.c,'center',600);
if(s.sub) beTxt(ctx,s.sub,s.x,y+12,9,'#484f58','center');
if(i<steps.length-1) beArrow(ctx,s.x+42,y,steps[i+1].x-42,y,s.c+'88');
});
beArrow(ctx,steps[1].x,y+22,steps[1].x,H*.72,'#ef4444',true);
beRR(ctx,steps[1].x-46,H*.72-16,92,32,7,'#2d1515','#ef444488',1.5); beTxt(ctx,'401 Unauthorized',steps[1].x,H*.72+2,9.5,'#ef4444','center'); beTxt(ctx,'JWT verified -> role checked -> only authorised requests reach route handler',W/2,H-12,9.5,'#484f58','center'); } else if(EXPARCH.mode==='validate'){ const schema={x:W*.2,y:H*.4,label:'Zod Schema',c:'#3b82f6'}; const valid={x:W*.5,y:H*.4,label:'Valid [ok]',c:'#22c55e'}; const invalid={x:W*.5,y:H*.72,label:'Invalid ❌',c:'#ef4444'}; const handler={x:W*.78,y:H*.4,label:'Handler',c:'#a855f7'}; beRR(ctx,W*.06-40,H*.4-22,80,44,9,'#0e2233','#3b82f6',2); beTxt(ctx,'req.body',W*.06,H*.4-5,10,'#3b82f6','center',600);
beArrow(ctx,W*.06+40,H*.4,schema.x-44,schema.y,'#3b82f6');
[schema,valid,handler].forEach(n=>{
beGlow(ctx,n.x,n.y,28,n.c+'44');
beRR(ctx,n.x-44,n.y-22,88,44,9,n.c+'18',n.c,1.8);
beTxt(ctx,n.label,n.x,n.y+3,11,n.c,'center',600);
});
beRR(ctx,invalid.x-44,invalid.y-22,88,44,9,'#2d1515','#ef4444',1.8);
beTxt(ctx,invalid.label,invalid.x,invalid.y-5,11,'#ef4444','center',600); beTxt(ctx,'422 Validation Error',invalid.x,invalid.y+12,9,'#ef4444','center');
beArrow(ctx,schema.x+44,schema.y,valid.x-44,valid.y,'#22c55e');
beArrow(ctx,schema.x,schema.y+22,invalid.x,invalid.y-22,'#ef4444',true);
beArrow(ctx,valid.x+44,valid.y,handler.x-44,handler.y,'#22c55e'); beTxt(ctx,'Input validated against Zod schema before reaching handler -- invalid requests rejected early',W/2,H-12,9.5,'#484f58','center');
}
EXPARCH.raf=requestAnimationFrame(animExpressArch);
}
const MONGO={ctx:null,t:0,raf:null,mode:'crud'};

function initMongoArch(){
const ctx=setupCvs('cvs-mongo-arch');if(!ctx)return;
MONGO.ctx=ctx;MONGO.t=0;cancelAnimationFrame(MONGO.raf);animMongoArch();
}

function mongoAnim(m){MONGO.mode=m;}

function animMongoArch(){
const ctx=MONGO.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);beRR(ctx,0,0,W,H,0,'#0d1117');
MONGO.t++;
if(MONGO.mode==='crud'){ const app={x:W*.1,y:H*.45,label:'Node App',c:'#68a063'};
const mongoose={x:W*.32,y:H*.45,label:'Mongoose',c:'#22c55e'}; const driver={x:W*.54,y:H*.45,label:'MongoDB\nDriver',c:'#f59e0b'}; const db={x:W*.76,y:H*.45,label:'MongoDB',c:'#22c55e'}; const doc={x:W*.93,y:H*.45,label:'Documents',c:'#3b82f6'};
const nodes=[app,mongoose,driver,db,doc];
nodes.forEach((n,i)=>{
beGlow(ctx,n.x,n.y,26,n.c+'44');
beRR(ctx,n.x-44,n.y-24,88,48,9,n.c+'18',n.c,1.8); beTxt(ctx,n.label.split('\n')[0],n.x,n.y-7+(n.label.includes('\n')?-6:0),10.5,n.c,'center',600); if(n.label.includes('\n')) beTxt(ctx,n.label.split('\n')[1],n.x,n.y+8,10.5,n.c,'center',600);
if(i<nodes.length-1) beArrow(ctx,n.x+44,n.y,nodes[i+1].x-44,n.y,n.c+'88');
});
const ops=[{op:'insertOne()',c:'#22c55e',y:H*.72},{op:'findOne()',c:'#3b82f6',y:H*.72},{op:'updateMany()',c:'#f59e0b',y:H*.72},{op:'deleteOne()',c:'#ef4444',y:H*.72}];
const ow=Math.floor((W-40)/ops.length)-8;
ops.forEach((op,i)=>{
const ox=24+(ow+8)*i+ow/2;
beRR(ctx,ox-ow/2,op.y-16,ow,32,7,op.c+'18',op.c+'88',1.2);
beTxt(ctx,op.op,ox,op.y+3,9.5,op.c,'center',500);
});
beTxt(ctx,'Mongoose wraps MongoDB driver with schema validation, hooks, and query building',W/2,H-12,9.5,'#484f58','center'); } else if(MONGO.mode==='aggregate'){
const stages=[
{label:'$match',sub:'filter early',c:'#22c55e'}, {label:'$lookup',sub:'join collection',c:'#3b82f6'}, {label:'$group',sub:'aggregate',c:'#a855f7'}, {label:'$project',sub:'reshape',c:'#f59e0b'}, {label:'$sort',sub:'order',c:'#ef4444'},
];
const y=H*.42,sw=(W-40)/stages.length-8;
stages.forEach((s,i)=>{
const sx=24+(sw+8)*i+sw/2;
const active=Math.floor(MONGO.t*0.018)%stages.length===i;
if(active)beGlow(ctx,sx,y,30,s.c);
beRR(ctx,sx-sw/2,y-26,sw,52,9,s.c+(active?'22':'18'),s.c,active?2:1.3); beTxt(ctx,s.label,sx,y-8,11,s.c,'center',600); beTxt(ctx,s.sub,sx,y+11,9,'#484f58','center');
if(i<stages.length-1) beArrow(ctx,sx+sw/2,y,sx+sw/2+8,y,s.c+'88');
});
const pp=(MONGO.t*0.015)%(stages.length-1+1);
const idx=Math.floor(pp);
if(idx<stages.length-1){
const t2=pp-idx;
const sw2=(W-40)/stages.length-8;
const x1=24+(sw2+8)*idx+sw2;
const x2=24+(sw2+8)*(idx+1);
beDot(ctx,x1+(x2-x1)*t2,y,stages[idx].c,5);
}
beRR(ctx,24,H*.72,W-48,30,8,'#161b22','#30363d',1); beTxt(ctx,'Collection -> $match reduces docs -> $lookup joins -> $group aggregates -> result',W/2,H*.72+16,9.5,'#484f58','center'); beTxt(ctx,'Aggregation pipeline: data transforms stage-by-stage like a Unix pipe chain',W/2,H-12,9.5,'#484f58','center'); } else if(MONGO.mode==='replica'){
const primary={x:W*.25,y:H*.42,label:'Primary',c:'#22c55e'}; const sec1={x:W*.62,y:H*.25,label:'Secondary 1',c:'#3b82f6'}; const sec2={x:W*.62,y:H*.6,label:'Secondary 2',c:'#3b82f6'};
const arbiter={x:W*.88,y:H*.42,label:'Arbiter',c:'#f59e0b'};
const pp=(MONGO.t*0.012)%1;
beGlow(ctx,primary.x,primary.y,40,'#22c55e');
[primary,sec1,sec2,arbiter].forEach(n=>{
beRR(ctx,n.x-50,n.y-26,100,52,10,n.c+'18',n.c,n===primary?2.5:1.5);
beTxt(ctx,n.label,n.x,n.y-6,11,n.c,'center',600); beTxt(ctx,n===primary?'writes':'reads',n.x,n.y+12,9,'#484f58','center');
});
[sec1,sec2].forEach(s=>{
beArrow(ctx,primary.x+50,primary.y,s.x-50,s.y,'#22c55e88');
beDot(ctx,primary.x+50+(s.x-50-primary.x-50)*pp,primary.y+(s.y-primary.y)*pp,'#22c55e',4);
});
beArrow(ctx,primary.x+50,primary.y,arbiter.x-50,arbiter.y,'#f59e0b88',true); beRR(ctx,W*.08,H*.72,W*.84,28,7,'#161b22','#30363d',1); beTxt(ctx,'Replica set: oplog replication Primary->Secondaries. Automatic failover via election if primary fails.',W/2,H*.72+16,9.5,'#484f58','center'); beTxt(ctx,'Write concern w:majority ensures data durability across nodes before acknowledging',W/2,H-12,9.5,'#484f58','center'); } else if(MONGO.mode==='index'){
const docs=[];
for(let i=0;i<8;i++) docs.push({x:W*.06+i*(W*.1),y:H*.35,v:i*10+5});
const qval=35+20*Math.sin(MONGO.t*0.03);
docs.forEach((d,i)=>{
const hit=Math.abs(d.v-qval)<12;
beRR(ctx,d.x-30,d.y-20,60,40,7,hit?'#0d2818':'#161b22',hit?'#22c55e':'#30363d',hit?2:1); beTxt(ctx,'doc',d.x,d.y-4,10,hit?'#22c55e':'#484f58','center',600);
beTxt(ctx,String(d.v),d.x,d.y+11,9.5,hit?'#22c55e':'#484f58','center');
});
const iy=H*.68;
beRR(ctx,W*.3-60,iy-18,120,36,8,'#0d2233','#3b82f6',1.8); beTxt(ctx,'B-Tree Index',W*.3,iy-2,11,'#3b82f6','center',600);
beTxt(ctx,`query: {age: {$gte: ${Math.round(qval)}}}`,W*.3,iy+14,9,'#484f58','center');
beArrow(ctx,W*.3,iy-18,W*.3,H*.35+20,'#3b82f6',true); beTxt(ctx,'Index B-Tree points directly to matching docs -- no collection scan needed',W/2,H-12,9.5,'#484f58','center');
}
MONGO.raf=requestAnimationFrame(animMongoArch);
}
const PG={ctx:null,t:0,raf:null,mode:'query'};

function initPgArch(){
const ctx=setupCvs('cvs-pg-arch');if(!ctx)return;
PG.ctx=ctx;PG.t=0;cancelAnimationFrame(PG.raf);animPgArch();
}

function pgAnim(m){PG.mode=m;}

function animPgArch(){
const ctx=PG.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);beRR(ctx,0,0,W,H,0,'#0d1117');
PG.t++;
if(PG.mode==='query'){
const stages=[
{label:'Parse',sub:'SQL -> AST',c:'#68a063'}, {label:'Analyse',sub:'bind names',c:'#f59e0b'}, {label:'Rewrite',sub:'rule system',c:'#a855f7'}, {label:'Plan',sub:'choose strategy',c:'#3b82f6'}, {label:'Execute',sub:'return rows',c:'#22c55e'},
];
const y=H*.4,sw=(W-32)/stages.length-8;
stages.forEach((s,i)=>{
const sx=20+(sw+8)*i+sw/2;
const active=Math.floor(PG.t*0.018)%stages.length===i;
if(active)beGlow(ctx,sx,y,28,s.c);
beRR(ctx,sx-sw/2,y-26,sw,52,9,s.c+(active?'22':'18'),s.c,active?2:1.3); beTxt(ctx,s.label,sx,y-8,11,s.c,'center',600); beTxt(ctx,s.sub,sx,y+11,9,'#484f58','center');
if(i<stages.length-1) beArrow(ctx,sx+sw/2,y,sx+sw/2+8,y,s.c+'88');
});
beRR(ctx,20,H*.7,W-40,50,8,'#161b22','#30363d',1); beTxt(ctx,'EXPLAIN ANALYZE output:',24,H*.7+16,9.5,'#484f58','left',600); beTxt(ctx,'Seq Scan -> Index Scan -> Index Only Scan (fastest)',24,H*.7+34,9,'#484f58','left'); beTxt(ctx,'Query lifecycle: SQL text parsed -> bound -> planner picks optimal execution -> rows returned',W/2,H-12,9.5,'#484f58','center'); } else if(PG.mode==='index'){
const types=[
{label:'B-Tree',sub:'default, equality + range',c:'#3b82f6',x:W*.18}, {label:'GIN',sub:'JSONB, arrays, full-text',c:'#a855f7',x:W*.38}, {label:'GiST',sub:'geometry, network',c:'#f59e0b',x:W*.58}, {label:'BRIN',sub:'large tables + ordering',c:'#22c55e',x:W*.78},
];
const y=H*.44;
types.forEach(t=>{
beGlow(ctx,t.x,y,26,t.c+'44');
beRR(ctx,t.x-54,y-28,108,56,10,t.c+'18',t.c,1.8); beTxt(ctx,t.label,t.x,y-10,12,t.c,'center',700); beTxt(ctx,t.sub,t.x,y+10,9,'#484f58','center');
});
const yq=H*.75;
const queries=[{q:'=, <, >, BETWEEN',idx:'B-Tree',c:'#3b82f6'},{q:'@> JSONB, &&',idx:'GIN',c:'#a855f7'},{q:'&&/geometry',idx:'GiST',c:'#f59e0b'}];
queries.forEach((q,i)=>{
const qx=W*.15+i*(W*.3);
beRR(ctx,qx-60,yq-14,120,28,7,q.c+'18',q.c+'66',1); beTxt(ctx,q.q+' -> '+q.idx,qx,yq+2,9,q.c,'center',500);
});
beTxt(ctx,'Choose index type by operator used in WHERE clause -- wrong type = table scan',W/2,H-12,9.5,'#484f58','center'); } else if(PG.mode==='txn'){ const states=[{label:'BEGIN',c:'#68a063',x:W*.12},{label:'Operation 1',c:'#3b82f6',x:W*.3},{label:'Operation 2',c:'#3b82f6',x:W*.5},{label:'COMMIT',c:'#22c55e',x:W*.7},{label:'ROLLBACK',c:'#ef4444',x:W*.88}];
const y=H*.35;
[states[0],states[1],states[2],states[3]].forEach((s,i)=>{
const active=Math.floor(PG.t*0.02)%4===i;
if(active)beGlow(ctx,s.x,y,28,s.c);
beRR(ctx,s.x-46,y-22,92,44,9,s.c+(active?'22':'18'),s.c,active?2:1.3);
beTxt(ctx,s.label,s.x,y+3,10.5,s.c,'center',600);
if(i<3) beArrow(ctx,s.x+46,y,states[i+1].x-46,y,s.c+'88');
});
beArrow(ctx,states[2].x,y+22,states[4].x,H*.65,'#ef4444',true);
beRR(ctx,states[4].x-52,H*.65-22,104,44,9,'#2d1515','#ef4444',1.8);
beTxt(ctx,states[4].label,states[4].x,H*.65+3,11,'#ef4444','center',600);
beRR(ctx,W*.12,H*.72,W*.55,28,7,'#0e1a33','#3b82f6',1); beTxt(ctx,'MVCC: readers see snapshot at txn start -- no read/write conflicts',W*.12+W*.275,H*.72+16,9.5,'#3b82f6','center'); beTxt(ctx,'ACID: Atomicity (all or nothing), Consistency, Isolation, Durability via WAL',W/2,H-12,9.5,'#484f58','center'); } else if(PG.mode==='pool'){
const clients=[];
for(let i=0;i<5;i++) clients.push({x:W*.06,y:H*.18+i*H*.14,label:'Client '+i,c:'#68a063'}); const pool={x:W*.38,y:H*.5,label:'pg.Pool',sub:'max:10 connections',c:'#f59e0b'};
const conns=[];
for(let i=0;i<4;i++) conns.push({x:W*.68,y:H*.22+i*H*.16,label:'Conn '+i,c:'#3b82f6'}); const pg2={x:W*.9,y:H*.5,label:'PostgreSQL',c:'#3b82f6'};
clients.forEach(c=>{
beRR(ctx,c.x-30,c.y-14,60,28,6,c.c+'18',c.c+'88',1.2); beTxt(ctx,c.label,c.x,c.y+3,9,c.c,'center',500);
beArrow(ctx,c.x+30,c.y,pool.x-50,pool.y,c.c+'55');
});
beGlow(ctx,pool.x,pool.y,38,'#f59e0b');
beRR(ctx,pool.x-50,pool.y-28,100,56,10,'#1a1500','#f59e0b',2);
beTxt(ctx,pool.label,pool.x,pool.y-8,12,'#f59e0b','center',600);
beTxt(ctx,pool.sub,pool.x,pool.y+10,9,'#f59e0b','center');
conns.forEach(c=>{
const inUse=(PG.t+c.y)%120<80;
beRR(ctx,c.x-32,c.y-14,64,28,6,inUse?c.c+'22':'#1a2233',c.c+(inUse?'':'44'),inUse?1.8:1);
beTxt(ctx,c.label,c.x,c.y+3,9.5,inUse?c.c:'#484f58','center',500);
beArrow(ctx,pool.x+50,pool.y,c.x-32,c.y,c.c+'66');
beArrow(ctx,c.x+32,c.y,pg2.x-46,pg2.y,c.c+'44');
});
beGlow(ctx,pg2.x,pg2.y,30,'#3b82f6'); beRR(ctx,pg2.x-46,pg2.y-22,92,44,9,'#0a1628','#3b82f6',2);
beTxt(ctx,pg2.label,pg2.x,pg2.y+3,11,'#3b82f6','center',600); beTxt(ctx,'Connection pool reuses connections -- never create new pg.Client per request',W/2,H-12,9.5,'#484f58','center');
}
PG.raf=requestAnimationFrame(animPgArch);
}
const PGNODE={ctx:null,t:0,raf:null,mode:'pool'};

function initPgNode(){
const ctx=setupCvs('cvs-pg-node');if(!ctx)return;
PGNODE.ctx=ctx;PGNODE.t=0;cancelAnimationFrame(PGNODE.raf);animPgNode();
}

function pgNodeAnim(m){PGNODE.mode=m;}

function animPgNode(){
const ctx=PGNODE.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);beRR(ctx,0,0,W,H,0,'#0d1117');
PGNODE.t++;
if(PGNODE.mode==='pool'){
const tiers=[
{label:'Express Route',c:'#f59e0b',x:W*.14}, {label:'Service Layer',c:'#22c55e',x:W*.36}, {label:'pg.Pool',c:'#3b82f6',x:W*.58}, {label:'PostgreSQL',c:'#3b82f6',x:W*.82},
];
const y=H*.4;
tiers.forEach((t,i)=>{
const active=Math.floor(PGNODE.t*0.018)%tiers.length===i;
if(active)beGlow(ctx,t.x,y,28,t.c);
beRR(ctx,t.x-52,y-26,104,52,9,t.c+(active?'22':'18'),t.c,active?2:1.5); beTxt(ctx,t.label,t.x,y+3,11,t.c,'center',600);
if(i<tiers.length-1) beArrow(ctx,t.x+52,y,tiers[i+1].x-52,y,t.c+'88');
});
const rules=[
'pool.query() for single queries (auto-release)', 'pool.connect() -> client -> finally release() for transactions', 'Default pool size: 10 -- tune with max/idleTimeoutMillis',
];
rules.forEach((r,i)=>{
beRR(ctx,14,H*.65+i*28,W-28,22,6,'#161b22','#30363d',1); beTxt(ctx,'▸ '+r,W/2,H*.65+i*28+13,9.5,'#8b949e','center');
});
} else if(PGNODE.mode==='orm'){ const libs=[{label:'pg',sub:'raw SQL, full control',c:'#3b82f6',x:W*.18},{label:'Knex',sub:'query builder',c:'#f59e0b',x:W*.38},{label:'Prisma',sub:'type-safe ORM',c:'#a855f7',x:W*.58},{label:'Drizzle',sub:'SQL-like, lightweight',c:'#22c55e',x:W*.78}];
const y=H*.35;
libs.forEach(l=>{
beGlow(ctx,l.x,y,26,l.c+'44');
beRR(ctx,l.x-52,y-28,104,56,10,l.c+'18',l.c,1.8); beTxt(ctx,l.label,l.x,y-8,13,l.c,'center',700); beTxt(ctx,l.sub,l.x,y+12,9.5,'#484f58','center');
});
const axes=[{label:'Control',left:'Low',right:'High'},{label:'Type Safety',left:'Manual',right:'Auto'},{label:'Speed',left:'Slow DX',right:'Fast'}];
axes.forEach((a,i)=>{
const ay=H*.62+i*30;
beTxt(ctx,a.label,W*.5,ay-2,9.5,'#8b949e','center',600); beTxt(ctx,a.left,W*.08,ay-2,9,'#ef4444','center'); beTxt(ctx,a.right,W*.92,ay-2,9,'#22c55e','center'); beRR(ctx,W*.15,ay-8,W*.7,16,3,'#161b22','#30363d',1);
const vals={control:[0.9,0.6,0.25,0.4],safety:[0.1,0.3,0.9,0.8],speed:[0.9,0.65,0.4,0.8]};
const vk=a.label.toLowerCase().replace(' ','');
libs.forEach((l,j)=>{
const v=vals[vk]?.[j]||0.5;
beDot(ctx,W*.15+W*.7*v,ay,l.c,4);
});
});
} else if(PGNODE.mode==='migration'){
const steps=[
{label:'Write\nmigration',c:'#68a063',x:W*.15}, {label:'CI runs\nmigrate',c:'#f59e0b',x:W*.35}, {label:'Schema\nupdated',c:'#3b82f6',x:W*.55}, {label:'Types\nregenerated',c:'#a855f7',x:W*.75}, {label:'App\ndeployed',c:'#22c55e',x:W*.9},
];
const y=H*.4;
steps.forEach((s,i)=>{
const active=Math.floor(PGNODE.t*0.016)%steps.length===i;
if(active)beGlow(ctx,s.x,y,26,s.c);
beRR(ctx,s.x-38,y-26,76,52,9,s.c+(active?'22':'18'),s.c,active?2:1.3); s.label.split('\n').forEach((l,j)=>beTxt(ctx,l,s.x,y-8+j*18,10,s.c,'center',600));
if(i<steps.length-1) beArrow(ctx,s.x+38,y,steps[i+1].x-38,y,s.c+'88');
});
const tools=[{label:'Prisma Migrate',c:'#a855f7'},{label:'Flyway',c:'#f59e0b'},{label:'Liquibase',c:'#3b82f6'},{label:'node-pg-migrate',c:'#22c55e'}];
tools.forEach((t,i)=>{
const tx=W*.12+i*(W*.22);
beRR(ctx,tx-50,H*.72-16,100,32,7,t.c+'18',t.c+'88',1.2);
beTxt(ctx,t.label,tx,H*.72+2,9.5,t.c,'center',500);
});
beTxt(ctx,'Never modify schema manually in production -- all changes through versioned migration files',W/2,H-12,9.5,'#484f58','center');
}
PGNODE.raf=requestAnimationFrame(animPgNode);
}
const BESTACK={ctx:null,t:0,raf:null,mode:'request'};

function initBeStack(){
const ctx=setupCvs('cvs-be-stack');if(!ctx)return;
BESTACK.ctx=ctx;BESTACK.t=0;cancelAnimationFrame(BESTACK.raf);animBeStack();
}

function beStackAnim(m){BESTACK.mode=m;}
(function(){
const beCanvasMap = {
'cvs-node-eventloop': ()=>initNodeEventLoop(), 'cvs-node-streams': ()=>initNodeStreams(), 'cvs-express-mw': ()=>initExpressMw(), 'cvs-express-arch': ()=>initExpressArch(), 'cvs-mongo-arch': ()=>initMongoArch(), 'cvs-pg-arch': ()=>initPgArch(), 'cvs-pg-node': ()=>initPgNode(), 'cvs-be-stack': ()=>initBeStack(),
};
const observer = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const fn = beCanvasMap[entry.target.id];
if(fn){
setTimeout(fn, 60);
}
}
});
},{threshold:0.1});
document.addEventListener('DOMContentLoaded', ()=>{
Object.keys(beCanvasMap).forEach(id=>{
const el = document.getElementById(id);
if(el) observer.observe(el);
});
});
Object.keys(beCanvasMap).forEach(id=>{
const el = document.getElementById(id);
if(el) observer.observe(el);
});
})();

function animBeStack(){
const ctx=BESTACK.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);beRR(ctx,0,0,W,H,0,'#0d1117');
BESTACK.t++;
if(BESTACK.mode==='request'){
const stack=[
{label:'Client',sub:'Browser/Mobile',c:'#68a063',x:W*.06}, {label:'Nginx',sub:'reverse proxy',c:'#f59e0b',x:W*.22}, {label:'Node.js\nCluster',sub:'PM2 managed',c:'#68a063',x:W*.4}, {label:'Express\nRouter',sub:'middleware',c:'#d97706',x:W*.57}, {label:'Service\nLayer',sub:'business logic',c:'#a855f7',x:W*.72}, {label:'DB Layer',sub:'pg / mongoose',c:'#3b82f6',x:W*.87},
];
const y=H*.42;
const pp=(BESTACK.t*0.012)%stack.length;
stack.forEach((s,i)=>{
const active=Math.abs(i-pp)<0.8;
if(active)beGlow(ctx,s.x,y,28,s.c);
beRR(ctx,s.x-40,y-28,80,56,9,s.c+(active?'22':'18'),s.c,active?2:1.3); const lines=s.label.split('\n');
lines.forEach((l,j)=>beTxt(ctx,l,s.x,y-9+(j-lines.length/2+0.5)*16,10,s.c,'center',600)); beTxt(ctx,s.sub,s.x,y+22,8.5,'#484f58','center');
if(i<stack.length-1) beArrow(ctx,s.x+40,y,stack[i+1].x-40,y,s.c+'88');
});
beTxt(ctx,'Full request cycle: Client -> Nginx (TLS/load-balance) -> Node Cluster -> Express -> DB',W/2,H-12,9.5,'#484f58','center'); } else if(BESTACK.mode==='microservice'){
const services=[
{label:'API Gateway',c:'#f59e0b',x:W*.5,y:H*.18}, {label:'Auth Service',c:'#ef4444',x:W*.22,y:H*.5}, {label:'Order Service',c:'#3b82f6',x:W*.5,y:H*.5}, {label:'Product Service',c:'#22c55e',x:W*.78,y:H*.5},
];
const dbs=[
{label:'PostgreSQL',c:'#3b82f6',x:W*.5,y:H*.78}, {label:'MongoDB',c:'#22c55e',x:W*.78,y:H*.78},
];
services.forEach(s=>{
beGlow(ctx,s.x,s.y,28,s.c+'44');
beRR(ctx,s.x-52,s.y-22,104,44,9,s.c+'18',s.c,1.8);
beTxt(ctx,s.label,s.x,s.y+3,11,s.c,'center',600);
});
beArrow(ctx,services[0].x,services[0].y+22,services[1].x,services[1].y-22,services[0].c+'88');
beArrow(ctx,services[0].x,services[0].y+22,services[2].x,services[2].y-22,services[0].c+'88');
beArrow(ctx,services[0].x,services[0].y+22,services[3].x,services[3].y-22,services[0].c+'88');
beArrow(ctx,services[2].x,services[2].y+22,dbs[0].x,dbs[0].y-18,'#3b82f6');
beArrow(ctx,services[3].x,services[3].y+22,dbs[1].x,dbs[1].y-18,'#22c55e');
dbs.forEach(d=>{
beRR(ctx,d.x-50,d.y-18,100,36,8,d.c+'18',d.c,1.5);
beTxt(ctx,d.label,d.x,d.y+3,11,d.c,'center',600);
});
beTxt(ctx,'Microservices: API Gateway routes -> independent services -> own datastores',W/2,H-12,9.5,'#484f58','center'); } else if(BESTACK.mode==='caching'){
const layers=[
{label:'Client Cache',sub:'HTTP Cache-Control',c:'#f59e0b',x:W*.1}, {label:'CDN',sub:'Cloudfront/Fastly',c:'#a855f7',x:W*.28}, {label:'Redis Cache',sub:'in-memory, ~1ms',c:'#ef4444',x:W*.5}, {label:'Node/Express',sub:'app server',c:'#68a063',x:W*.7}, {label:'Database',sub:'PostgreSQL/MongoDB',c:'#3b82f6',x:W*.9},
];
const y=H*.42;
layers.forEach((l,i)=>{
const hit=i<3&&(BESTACK.t%180)<60*i+60&&(BESTACK.t%180)>=60*i;
if(hit)beGlow(ctx,l.x,y,32,l.c);
beRR(ctx,l.x-42,y-28,84,56,9,l.c+(hit?'22':'18'),l.c,hit?2:1.3); beTxt(ctx,l.label,l.x,y-8,10,l.c,'center',600); beTxt(ctx,l.sub,l.x,y+12,8.5,'#484f58','center');
if(i<layers.length-1) beArrow(ctx,l.x+42,y,layers[i+1].x-42,y,hit?l.c:l.c+'44');
});
const times=[{t:'disk ~100ms',c:'#3b82f6',x:W*.9},{t:'Redis ~1ms',c:'#ef4444',x:W*.5},{t:'CDN ~10ms',c:'#a855f7',x:W*.28}];
times.forEach(t=>{ beRR(ctx,t.x-40,y+38,80,20,5,t.c+'18',t.c+'66',1); beTxt(ctx,t.t,t.x,y+50,8.5,t.c,'center'); }); beTxt(ctx,'Cache layers: serve from closest fast layer -- only miss to database when needed',W/2,H-12,9.5,'#484f58','center');
}
BESTACK.raf=requestAnimationFrame(animBeStack);
}
(function injectHeroWatermarks() {
const crossSVG = `<svg viewBox="0 0 24 24" fill="none"><line x1="12" y1="2" x2="12" y2="22" stroke="white" stroke-width="1"/><line x1="2" y1="12" x2="22" y2="12" stroke="white" stroke-width="1"/></svg>`;
const hexSVG = `<svg viewBox="0 0 32 32" fill="none"><polygon points="16,2 28,9 28,23 16,30 4,23 4,9" stroke="white" stroke-width="1"/></svg>`;
const circSVG = `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="white" stroke-width="1"/><circle cx="16" cy="16" r="6" stroke="white" stroke-width="0.7"/></svg>`;
const configs = [
{ rings:[{l:72,t:15,s:140},{l:85,t:40,s:90}], ring2s:[{l:60,t:-10,s:200}],
orbs:[{l:88,t:60,s:60}], crosses:[{l:90,t:20,s:28,svg:crossSVG,d:'0s'},{l:78,t:70,s:20,svg:hexSVG,d:'3s'}],
dots:[{l:65,t:25},{l:55,t:75},{l:92,t:50}], lines:[{l:40,t:50,d:'0s'},{l:70,t:80,d:'4s'}] },
];

function buildWM() {
return `<div class="hero-wm" aria-hidden="true">
<div class="wm-ring" style="left:68%;top:10%;width:160px;height:160px;margin:-80px 0 0 -80px;animation-delay:0s;animation-duration:5s;"></div>
<div class="wm-ring" style="left:82%;top:55%;width:100px;height:100px;margin:-50px 0 0 -50px;animation-delay:1.5s;animation-duration:4s;"></div>
<div class="wm-ring2" style="left:55%;top:-5%;width:220px;height:220px;margin:-110px 0 0 -110px;animation-delay:0.8s;animation-duration:7s;"></div>
<div class="wm-ring2" style="left:90%;top:80%;width:140px;height:140px;margin:-70px 0 0 -70px;animation-delay:3s;animation-duration:6s;"></div>
<div class="wm-orb" style="left:78%;top:65%;width:55px;height:55px;animation-delay:2s;animation-duration:8s;"></div>
<div class="wm-orb" style="left:92%;top:15%;width:35px;height:35px;animation-delay:0.5s;animation-duration:6s;"></div>
<div class="wm-cross" style="left:88%;top:18%;width:26px;height:26px;animation-duration:22s;">${crossSVG}</div>
<div class="wm-cross" style="left:75%;top:72%;width:18px;height:18px;animation-duration:16s;animation-delay:4s;">${hexSVG}</div>
<div class="wm-cross2" style="left:62%;top:30%;width:32px;height:32px;animation-duration:18s;">${circSVG}</div>
<div class="wm-dot" style="left:58%;top:20%;animation-delay:0s;animation-duration:2.8s;"></div>
<div class="wm-dot" style="left:67%;top:80%;animation-delay:1.2s;animation-duration:3.5s;"></div>
<div class="wm-dot" style="left:80%;top:45%;animation-delay:2s;animation-duration:4s;"></div>
<div class="wm-dot" style="left:94%;top:60%;animation-delay:0.7s;animation-duration:2.5s;"></div>
<div class="wm-dot" style="left:71%;top:12%;animation-delay:3.2s;animation-duration:3.2s;"></div>
<div class="wm-line" style="left:38%;top:45%;animation-delay:0s;"></div>
<div class="wm-line" style="left:55%;top:70%;animation-delay:3s;animation-duration:10s;opacity:0.7;"></div>
</div>`;
}
document.querySelectorAll('.hero').forEach(hero => {
if (!hero.querySelector('.hero-wm')) { hero.insertAdjacentHTML('beforeend', buildWM());
}
});
const origSwitch = window.switchMain;
if (origSwitch) {
window.switchMain = function(tab) {
origSwitch(tab);
requestAnimationFrame(() => {
document.querySelectorAll('.hero').forEach(hero => { if (!hero.querySelector('.hero-wm')) { hero.insertAdjacentHTML('beforeend', buildWM());
}
});
});
};
}
})();
(function() {
const saved = localStorage.getItem('fe-hub-theme'); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const useDark = saved ? saved === 'dark' : prefersDark;
if (useDark) {
document.documentElement.setAttribute('data-theme', 'dark');
const label = document.getElementById('theme-label');
const thumb = document.getElementById('tt-thumb'); if (label) label.textContent = 'Dark'; if (thumb) thumb.textContent = '🌙';
}
applyCircuitSVG(useDark);
})();

function cdSelect(tech, btn){
document.querySelectorAll('#panel-cicd .be-tech-card').forEach(c=>c.classList.remove('active')); document.querySelectorAll('.cd-section').forEach(s=>s.classList.remove('active')); if(btn) btn.classList.add('active');
const section = document.getElementById('cd-'+tech);
if(section){ void section.offsetHeight; section.classList.add('active'); } const map={docker:['initDockerAnim'],k8s:['initK8sAnim'],kafka:['initKafkaAnim'],vercel:['initVercelAnim']};
setTimeout(()=>{
if(section){ void section.offsetHeight; }
(map[tech]||[]).forEach(fn=>{ if(typeof window[fn]==='function') window[fn](); });
initCicdPipeline();
}, 100);
}

function cdRR(ctx,x,y,w,h,r,fill,stroke,sw){
ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):ctx.rect(x,y,w,h);
if(fill){ctx.fillStyle=fill;ctx.fill();}
if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=sw||1.5;ctx.stroke();}
}

function cdTxt(ctx,t,x,y,size,color,align,weight){
ctx.font=(weight||400)+' '+size+'px "DM Sans",system-ui,sans-serif';
ctx.fillStyle=color;ctx.textAlign=align||'left';ctx.textBaseline='middle';ctx.fillText(t,x,y);
}

function cdGlow(ctx,x,y,r,color){
const base=color.length>7?color.slice(0,7):color;
const g=ctx.createRadialGradient(x,y,0,x,y,r);
g.addColorStop(0,base+'55');g.addColorStop(1,base+'00');
ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
}

function cdDot(ctx,x,y,color,r){
ctx.beginPath();ctx.arc(x,y,r||4,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
}

function cdArrow(ctx,x1,y1,x2,y2,color,dashed){
ctx.beginPath();
if(dashed)ctx.setLineDash([4,3]);else ctx.setLineDash([]);
ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);
ctx.strokeStyle=color;ctx.lineWidth=1.8;ctx.stroke();ctx.setLineDash([]);
const a=Math.atan2(y2-y1,x2-x1);
ctx.beginPath();ctx.moveTo(x2,y2);
ctx.lineTo(x2-8*Math.cos(a-0.4),y2-8*Math.sin(a-0.4));
ctx.lineTo(x2-8*Math.cos(a+0.4),y2-8*Math.sin(a+0.4));
ctx.closePath();ctx.fillStyle=color;ctx.fill();
}
const DOCKER={ctx:null,t:0,raf:null,mode:'build'};

function initDockerAnim(){
const ctx=setupCvs('cvs-docker');if(!ctx)return;
DOCKER.ctx=ctx;DOCKER.t=0;cancelAnimationFrame(DOCKER.raf);animDocker();
}

function dockerAnim(m){DOCKER.mode=m;}

function animDocker(){
const ctx=DOCKER.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);cdRR(ctx,0,0,W,H,0,'#0d1117');
DOCKER.t++;
if(DOCKER.mode==='build'){
const layers=[
{label:'FROM node:20-alpine',sub:'base layer',c:'#38bdf8',y:H*.18}, {label:'COPY package.json',sub:'dependency layer',c:'#34d399',y:H*.32}, {label:'RUN npm install',sub:'install layer (cached)',c:'#a855f7',y:H*.46}, {label:'COPY . .',sub:'app code layer',c:'#f59e0b',y:H*.60}, {label:'CMD ["node","app.js"]',sub:'entrypoint',c:'#22c55e',y:H*.74},
];
const lx=W*.08,lw=W*.44;
layers.forEach((l,i)=>{
const active=Math.floor(DOCKER.t*0.015)%layers.length===i;
if(active)cdGlow(ctx,lx+lw/2,l.y,28,l.c);
cdRR(ctx,lx,l.y-18,lw,36,7,l.c+(active?'22':'18'),l.c,active?2:1.2);
cdTxt(ctx,l.label,lx+10,l.y-3,10,l.c,'left',600); cdTxt(ctx,l.sub,lx+10,l.y+13,8.5,'#484f58','left');
if(i<layers.length-1){
ctx.beginPath();ctx.moveTo(lx+lw/2,l.y+18);ctx.lineTo(lx+lw/2,layers[i+1].y-18);
ctx.strokeStyle='#30363d';ctx.lineWidth=1;ctx.setLineDash([3,3]);ctx.stroke();ctx.setLineDash([]);
}
});
const ix=W*.62,iy=H*.46,iw=W*.3,ih=80;
cdGlow(ctx,ix+iw/2,iy,40,'#2496ed'); cdRR(ctx,ix,iy-ih/2,iw,ih,12,'#0c1a2e','#2496ed',2); cdTxt(ctx,'[D]',ix+iw/2-4,iy-16,20,'#2496ed','center'); cdTxt(ctx,'my-app:latest',ix+iw/2,iy+8,10.5,'#38bdf8','center',600); cdTxt(ctx,'Docker Image',ix+iw/2,iy+24,9,'#484f58','center'); cdArrow(ctx,lx+lw,H*.46,ix,iy,'#2496ed88'); cdTxt(ctx,'Dockerfile layers build top-to-bottom -- unchanged layers are served from cache',W/2,H-10,9.5,'#484f58','center'); } else if(DOCKER.mode==='run'){
const imgX=W*.08,imgY=H*.45;
cdRR(ctx,imgX,imgY-30,W*.22,60,10,'#0c1a2e','#2496ed',2); cdTxt(ctx,'[D] Image',imgX+W*.11,imgY-10,11,'#38bdf8','center',600); cdTxt(ctx,'my-app:latest',imgX+W*.11,imgY+10,9,'#484f58','center');
const containers=[
{x:W*.5,y:H*.28,label:'Container 1',port:'3000->3000',c:'#34d399'}, {x:W*.5,y:H*.55,label:'Container 2',port:'3001->3000',c:'#34d399'}, {x:W*.5,y:H*.78,label:'Container 3',port:'3002->3000',c:'#22c55e'},
];
containers.forEach((c,i)=>{
cdGlow(ctx,c.x,c.y,24,c.c);
cdRR(ctx,c.x-55,c.y-22,110,44,8,c.c+'18',c.c,1.5);
cdTxt(ctx,c.label,c.x,c.y-6,10.5,c.c,'center',600); cdTxt(ctx,'PORT: '+c.port,c.x,c.y+10,9,'#484f58','center');
cdArrow(ctx,imgX+W*.22,imgY,c.x-55,c.y,'#2496ed55');
const pp=(DOCKER.t*0.014+i*0.33)%1;
cdDot(ctx,imgX+W*.22+(c.x-55-imgX-W*.22)*pp,imgY+(c.y-imgY)*pp,'#2496ed',4);
});
const hx=W*.78,hy=H*.5;
cdRR(ctx,hx-40,hy-30,80,60,8,'#161b22','#f59e0b',1.5); cdTxt(ctx,'Host',hx,hy-12,10,'#f59e0b','center',600); cdTxt(ctx,':3000-3002',hx,hy+8,9,'#484f58','center');
containers.forEach(c=>cdArrow(ctx,c.x+55,c.y,hx-40,hy,c.c+'66')); cdTxt(ctx,'docker run -p HOST:CONTAINER -- each container is isolated with its own filesystem',W/2,H-10,9.5,'#484f58','center'); } else if(DOCKER.mode==='compose'){
const services=[
{x:W*.18,y:H*.35,label:'app',sub:'Node.js :3000',c:'#34d399',net:true}, {x:W*.5,y:H*.35,label:'postgres',sub:'DB :5432',c:'#3b82f6',net:true}, {x:W*.82,y:H*.35,label:'redis',sub:'Cache :6379',c:'#ef4444',net:true}, {x:W*.18,y:H*.72,label:'nginx',sub:'Proxy :80/443',c:'#f59e0b',net:true},
];
cdRR(ctx,W*.06,H*.2,W*.88,H*.3,12,'#0d1f0d','#22c55e44',1); cdTxt(ctx,'my-network (bridge)',W*.5,H*.22,9,'#22c55e','center',500);
services.forEach(s=>{
cdGlow(ctx,s.x,s.y,28,s.c);
cdRR(ctx,s.x-50,s.y-26,100,52,9,s.c+'18',s.c,1.8);
cdTxt(ctx,s.label,s.x,s.y-8,11,s.c,'center',600); cdTxt(ctx,s.sub,s.x,s.y+10,9,'#484f58','center');
});
cdArrow(ctx,services[0].x+50,services[0].y,services[1].x-50,services[1].y,'#34d39988');
cdArrow(ctx,services[1].x+50,services[1].y,services[2].x-50,services[2].y,'#3b82f688');
cdArrow(ctx,services[3].x+50,H*.72,services[0].x,services[0].y+26,'#f59e0b88');
const pp=(DOCKER.t*0.01)%1;
const path=[[W*.08,H*.72],[services[3].x+50,H*.72],[services[0].x,services[0].y+26],[services[0].x+50,services[0].y],[services[1].x-50,services[1].y]];
const seg=Math.floor(pp*(path.length-1));
const segT=(pp*(path.length-1))-seg;
if(seg<path.length-1){
const px=path[seg][0]+(path[seg+1][0]-path[seg][0])*segT;
const py=path[seg][1]+(path[seg+1][1]-path[seg][1])*segT;
cdDot(ctx,px,py,'#f59e0b',5);cdGlow(ctx,px,py,12,'#f59e0b');
}
cdTxt(ctx,'docker compose up -- all services, networks and volumes defined in one YAML file',W/2,H-10,9.5,'#484f58','center');
}
DOCKER.raf=requestAnimationFrame(animDocker);
}
const K8S={ctx:null,t:0,raf:null,mode:'cluster'};

function initK8sAnim(){
const ctx=setupCvs('cvs-k8s');if(!ctx)return;
K8S.ctx=ctx;K8S.t=0;cancelAnimationFrame(K8S.raf);animK8s();
}

function k8sAnim(m){K8S.mode=m;}

function animK8s(){
const ctx=K8S.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);cdRR(ctx,0,0,W,H,0,'#0d1117');
K8S.t++;
if(K8S.mode==='cluster'){
const cpX=W*.08,cpY=H*.5,cpW=W*.22,cpH=H*.6;
cdRR(ctx,cpX,cpY-cpH/2,cpW,cpH,10,'#0e1a30','#326ce5',1.5); cdTxt(ctx,'Control Plane',cpX+cpW/2,cpY-cpH/2+14,10,'#326ce5','center',600); const cpItems=[{l:'API Server',c:'#60a5fa'},{l:'etcd',c:'#34d399'},{l:'Scheduler',c:'#a855f7'},{l:'Controller',c:'#f59e0b'}];
cpItems.forEach((item,i)=>{
cdRR(ctx,cpX+8,cpY-cpH/2+28+i*32,cpW-16,24,5,item.c+'18',item.c+'66',1);
cdTxt(ctx,item.l,cpX+cpW/2,cpY-cpH/2+40+i*32,9.5,item.c,'center',500);
});
const nodes=[
{x:W*.56,y:H*.25,pods:2,c:'#22c55e'}, {x:W*.56,y:H*.55,pods:3,c:'#22c55e'}, {x:W*.56,y:H*.82,pods:2,c:'#22c55e'},
];
nodes.forEach((n,ni)=>{
const nw=W*.36,nh=H*.17;
cdRR(ctx,n.x-nw/2,n.y-nh/2,nw,nh,8,'#0a1f0a','#22c55e',1.2); cdTxt(ctx,'Worker Node '+(ni+1),n.x,n.y-nh/2+12,9.5,'#22c55e','center',600);
for(let p=0;p<n.pods;p++){
const px=n.x-nw/2+18+(p*(nw-20)/n.pods)+10;
const active=Math.floor(K8S.t*0.012+ni*0.7)%n.pods===p;
if(active)cdGlow(ctx,px,n.y+6,16,'#38bdf8');
cdRR(ctx,px-14,n.y-4,28,20,5,active?'#0c1a30':'#161b22',active?'#38bdf8':'#30363d',active?1.5:1); cdTxt(ctx,'Pod',px,n.y+7,8,active?'#38bdf8':'#484f58','center');
}
cdArrow(ctx,cpX+cpW,cpY,n.x-nw/2,n.y,'#326ce555');
});
const sx=W*.88,sy=H*.5;
cdRR(ctx,sx-30,sy-18,60,36,7,'#1a1500','#f59e0b',1.5); cdTxt(ctx,'Service',sx,sy-3,9.5,'#f59e0b','center',600); cdTxt(ctx,'LB',sx,sy+12,9,'#484f58','center'); cdTxt(ctx,'kubectl apply -> API Server -> etcd -> Scheduler assigns pods to nodes',W/2,H-10,9.5,'#484f58','center'); } else if(K8S.mode==='deploy'){
const baseY=H*.42;
const podW=W*.09,podH=36,gap=W*.04;
const totalW=5*(podW+gap)-gap;
const startX=(W-totalW)/2;
const progress=((K8S.t*0.008)%1);
cdTxt(ctx,'Rolling Update -- v1 -> v2',W/2,H*.12,13,'#60a5fa','center',600);
for(let i=0;i<5;i++){
const px=startX+i*(podW+gap);
const isNew=i/5<progress;
const c=isNew?'#34d399':'#60a5fa'; const label=isNew?'v2':'v1';
if(isNew)cdGlow(ctx,px+podW/2,baseY,20,c);
cdRR(ctx,px,baseY-podH/2,podW,podH,7,c+'18',c,isNew?2:1.2);
cdTxt(ctx,label,px+podW/2,baseY,10,c,'center',700);
}
cdRR(ctx,W*.1,H*.72,W*.8,14,7,'#161b22','#30363d',1);
cdRR(ctx,W*.1,H*.72,W*.8*progress,14,7,'#34d399','#34d399',0); cdTxt(ctx,Math.round(progress*100)+'% complete -- 0 downtime rolling replace',W/2,H*.72+24,9.5,'#484f58','center'); cdTxt(ctx,'maxSurge:1, maxUnavailable:0 -- always at least 5 pods serving traffic',W/2,H-10,9.5,'#484f58','center'); } else if(K8S.mode==='scale'){
const cpu=0.4+0.45*Math.sin(K8S.t*0.025);
const replicas=Math.max(2,Math.min(6,Math.round(cpu*8)));
cdTxt(ctx,'HPA -- Horizontal Pod Autoscaler',W/2,H*.1,12,'#a855f7','center',600);
const gx=W*.5,gy=H*.3,gr=50;
ctx.beginPath();ctx.arc(gx,gy,gr,Math.PI,0);ctx.strokeStyle='#1e1e2e';ctx.lineWidth=10;ctx.stroke();
ctx.beginPath();ctx.arc(gx,gy,gr,Math.PI,Math.PI+cpu*Math.PI);
ctx.strokeStyle=cpu>0.7?'#ef4444':cpu>0.4?'#f59e0b':'#34d399';ctx.lineWidth=10;ctx.stroke(); cdTxt(ctx,Math.round(cpu*100)+'%',gx,gy-12,16,cpu>0.7?'#ef4444':cpu>0.4?'#f59e0b':'#34d399','center',700); cdTxt(ctx,'CPU',gx,gy+6,10,'#484f58','center');
const podRowY=H*.65;
for(let i=0;i<6;i++){
const px=W*.12+i*(W*.13);
const active=i<replicas;
if(active)cdGlow(ctx,px,podRowY,16,active?'#a855f7':'#30363d');
cdRR(ctx,px-22,podRowY-16,44,32,7,active?'#1a0a2e':'#0f0f14',active?'#a855f7':'#30363d',active?1.8:0.8); cdTxt(ctx,active?'Pod':'-',px,podRowY+1,10,active?'#a855f7':'#30363d','center',600);
}
cdTxt(ctx,replicas+' replicas running',W/2,H*.82,11,'#a855f7','center',600); cdTxt(ctx,'Target CPU > 70% -> scale up | < 30% -> scale down (cooldown period applies)',W/2,H-10,9.5,'#484f58','center');
}
K8S.raf=requestAnimationFrame(animK8s);
}
const KAFKA={ctx:null,t:0,raf:null,mode:'flow',msgs:[]};

function initKafkaAnim(){
const ctx=setupCvs('cvs-kafka');if(!ctx)return;
KAFKA.ctx=ctx;KAFKA.t=0;KAFKA.msgs=[];cancelAnimationFrame(KAFKA.raf);animKafka();
}

function kafkaAnim(m){KAFKA.mode=m;KAFKA.msgs=[];}

function animKafka(){
const ctx=KAFKA.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);cdRR(ctx,0,0,W,H,0,'#0d1117');
KAFKA.t++;
if(KAFKA.mode==='flow'){
const producers=[{x:W*.1,y:H*.3,label:'Order Svc',c:'#f59e0b'},{x:W*.1,y:H*.6,label:'Payment Svc',c:'#a855f7'}];
const brokerX=W*.42,brokerY=H*.45,brokerW=W*.2,brokerH=H*.4;
const consumers=[{x:W*.82,y:H*.28,label:'Analytics',c:'#34d399'},{x:W*.82,y:H*.5,label:'Notifier',c:'#38bdf8'},{x:W*.82,y:H*.72,label:'Audit Log',c:'#22c55e'}];
cdGlow(ctx,brokerX+brokerW/2,brokerY,40,'#e34c2e');
cdRR(ctx,brokerX,brokerY-brokerH/2,brokerW,brokerH,10,'#1a0a07','#e34c2e',2); cdTxt(ctx,'Kafka Broker',brokerX+brokerW/2,brokerY-brokerH/2+14,10,'#e34c2e','center',600); cdTxt(ctx,'topic: events',brokerX+brokerW/2,brokerY,10,'#f97316','center',500); cdTxt(ctx,'offset: '+(KAFKA.t%1000),brokerX+brokerW/2,brokerY+16,9,'#484f58','center');
producers.forEach(p=>{
cdRR(ctx,p.x-40,p.y-18,80,36,7,p.c+'18',p.c,1.5);
cdTxt(ctx,p.label,p.x,p.y+1,10,p.c,'center',600);
cdArrow(ctx,p.x+40,p.y,brokerX,brokerY,p.c+'88');
const pp=(KAFKA.t*0.016+producers.indexOf(p)*0.5)%1;
cdDot(ctx,p.x+40+(brokerX-p.x-40)*pp,p.y+(brokerY-p.y)*pp,p.c,4);
});
consumers.forEach(c=>{
cdRR(ctx,c.x-44,c.y-18,88,36,7,c.c+'18',c.c,1.5);
cdTxt(ctx,c.label,c.x,c.y+1,10,c.c,'center',600);
cdArrow(ctx,brokerX+brokerW,brokerY,c.x-44,c.y,c.c+'88');
const pp=(KAFKA.t*0.013+consumers.indexOf(c)*0.33)%1;
cdDot(ctx,brokerX+brokerW+(c.x-44-brokerX-brokerW)*pp,brokerY+(c.y-brokerY)*pp,c.c,4);
});
cdTxt(ctx,'Producers push events -> Broker persists in topic -> each Consumer reads independently',W/2,H-10,9.5,'#484f58','center'); } else if(KAFKA.mode==='partition'){
const topic={x:W*.5,y:H*.12};
cdRR(ctx,topic.x-60,topic.y-14,120,28,7,'#1a0a07','#e34c2e',1.5); cdTxt(ctx,'topic: orders',topic.x,topic.y+1,11,'#e34c2e','center',600);
const parts=[
{x:W*.2,label:'Partition 0',c:'#f59e0b'}, {x:W*.5,label:'Partition 1',c:'#a855f7'}, {x:W*.8,label:'Partition 2',c:'#38bdf8'},
];
parts.forEach(p=>{
cdArrow(ctx,topic.x,topic.y+14,p.x,H*.3-16,'#e34c2e55'); cdRR(ctx,p.x-55,H*.3,110,H*.45,8,'#0f0f14',p.c,1.5);
cdTxt(ctx,p.label,p.x,H*.3+14,10,p.c,'center',600);
const numMsgs=5;
for(let i=0;i<numMsgs;i++){
const my=H*.3+32+i*(H*.45-36)/numMsgs;
const isNew=i===numMsgs-1&&(KAFKA.t%60)<30;
cdRR(ctx,p.x-44,my,88,22,4,isNew?p.c+'33':'#161b22',p.c+(isNew?'':'44'),1); cdTxt(ctx,'offset '+(i+(KAFKA.t>0?Math.floor(KAFKA.t/60)*parts.indexOf(p):0)),p.x,my+12,8.5,isNew?p.c:'#484f58','center');
}
});
cdTxt(ctx,'Same key -> same partition (ordering preserved per entity) . Different keys -> different partitions (parallelism)',W/2,H-10,9,'#484f58','center'); } else if(KAFKA.mode==='group'){
const brokerX=W*.38,brokerY=H*.45;
cdRR(ctx,brokerX-60,brokerY-30,120,60,8,'#1a0a07','#e34c2e',2); cdTxt(ctx,'Kafka',brokerX,brokerY-10,11,'#e34c2e','center',600); cdTxt(ctx,'3 partitions',brokerX,brokerY+8,9,'#484f58','center');
const group=[
{x:W*.75,y:H*.25,label:'Consumer A',parts:'P0',c:'#f59e0b'}, {x:W*.75,y:H*.5,label:'Consumer B',parts:'P1',c:'#a855f7'}, {x:W*.75,y:H*.75,label:'Consumer C',parts:'P2',c:'#38bdf8'},
];
cdRR(ctx,W*.65-4,H*.15,W*.22+8,H*.7,10,'#0a1020','#60a5fa55',1); cdTxt(ctx,'Consumer Group A',W*.75,H*.15+12,9.5,'#60a5fa','center',500);
group.forEach(c=>{
const active=(KAFKA.t%90)<45&&group.indexOf(c)===Math.floor(KAFKA.t/30)%3;
if(active)cdGlow(ctx,c.x,c.y,24,c.c);
cdRR(ctx,c.x-50,c.y-20,100,40,8,c.c+'18',c.c,active?2:1.3);
cdTxt(ctx,c.label,c.x,c.y-5,10,c.c,'center',600); cdTxt(ctx,'reads '+c.parts,c.x,c.y+10,8.5,'#484f58','center');
cdArrow(ctx,brokerX+60,brokerY,c.x-50,c.y,c.c+'88');
if(active){
const pp=(KAFKA.t%90)/45;
cdDot(ctx,brokerX+60+(c.x-50-brokerX-60)*pp,brokerY+(c.y-brokerY)*pp,c.c,5);
}
});
cdTxt(ctx,'1 consumer per partition per group . Rebalance redistributes on member join/leave',W/2,H-10,9.5,'#484f58','center');
}
KAFKA.raf=requestAnimationFrame(animKafka);
}
const VERCEL={ctx:null,t:0,raf:null,mode:'deploy'};

function initVercelAnim(){
const ctx=setupCvs('cvs-vercel');if(!ctx)return;
VERCEL.ctx=ctx;VERCEL.t=0;cancelAnimationFrame(VERCEL.raf);animVercel();
}

function vercelAnim(m){VERCEL.mode=m;}

function animVercel(){
const ctx=VERCEL.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);cdRR(ctx,0,0,W,H,0,'#0d1117');
VERCEL.t++;
if(VERCEL.mode==='deploy'){
const steps=[
{x:W*.1,label:'git push',sub:'main branch',c:'#e2e8f0',icon:'[push]'}, {x:W*.28,label:'Build',sub:'Next.js / Vite',c:'#f59e0b',icon:'[build]'}, {x:W*.46,label:'Test',sub:'CI checks',c:'#34d399',icon:'[ok]'}, {x:W*.64,label:'Bundle',sub:'optimize + split',c:'#a855f7',icon:'[pkg]'}, {x:W*.82,label:'Deploy',sub:'edge network',c:'#38bdf8',icon:'[cdn]'},
];
const y=H*.42;
const pp=(VERCEL.t*0.01)%(steps.length+0.5);
steps.forEach((s,i)=>{
const active=Math.abs(pp-i)<0.7;
if(active)cdGlow(ctx,s.x,y,28,s.c);
cdRR(ctx,s.x-46,y-28,92,56,9,s.c+(active?'18':'0d'),s.c,active?2:1.2); cdTxt(ctx,s.icon,s.x,y-10,16,'#fff','center'); cdTxt(ctx,s.label,s.x,y+10,10,s.c,'center',600); cdTxt(ctx,s.sub,s.x,y+24,8.5,'#484f58','center');
if(i<steps.length-1)cdArrow(ctx,s.x+46,y,steps[i+1].x-46,y,s.c+'88');
});
if(pp>4.2){
cdRR(ctx,W*.62,H*.72,W*.28,28,7,'#0c1f0c','#34d399',1.5); cdTxt(ctx,'[ok] Production live in ~30s',W*.76,H*.72+16,10,'#34d399','center',600);
}
cdTxt(ctx,'Push to git -> automatic build + test + deploy -> live on edge in ~30 seconds',W/2,H-10,9.5,'#484f58','center'); } else if(VERCEL.mode==='edge'){
const nodes=[
{x:W*.12,y:H*.35,region:'US-West',ms:'8ms'},{x:W*.28,y:H*.3,region:'US-East',ms:'12ms'}, {x:W*.44,y:H*.28,region:'London',ms:'15ms'},{x:W*.54,y:H*.32,region:'Frankfurt',ms:'18ms'}, {x:W*.66,y:H*.38,region:'Mumbai',ms:'20ms'},{x:W*.76,y:H*.35,region:'Singapore',ms:'22ms'}, {x:W*.86,y:H*.42,region:'Tokyo',ms:'25ms'},{x:W*.2,y:H*.65,region:'Sao Paulo',ms:'30ms'}, {x:W*.56,y:H*.58,region:'Lagos',ms:'35ms'},{x:W*.72,y:H*.62,region:'Sydney',ms:'40ms'},
];
nodes.forEach((n,i)=>{
if(i<nodes.length-1){
ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(nodes[(i+1)%nodes.length].x,nodes[(i+1)%nodes.length].y);
ctx.strokeStyle='#38bdf822';ctx.lineWidth=1;ctx.stroke();
}
});
nodes.forEach((n,i)=>{
const pulse=(VERCEL.t*0.025+i*0.6)%1;
const pr=4+pulse*20;
ctx.beginPath();ctx.arc(n.x,n.y,pr,0,Math.PI*2);
ctx.strokeStyle='#38bdf8'+(Math.floor((1-pulse)*40+10).toString(16).padStart(2,'0'));
ctx.lineWidth=1;ctx.stroke();
cdDot(ctx,n.x,n.y,'#38bdf8',4); cdTxt(ctx,n.region,n.x,n.y-14,8.5,'#60a5fa','center'); cdTxt(ctx,n.ms,n.x,n.y+16,8,'#34d399','center');
});
cdTxt(ctx,'100+ PoPs globally . Request routed to nearest edge node . Static assets cached at each PoP',W/2,H-10,9.5,'#484f58','center'); } else if(VERCEL.mode==='preview'){
const branches=[
{label:'feat/new-ui',url:'new-ui-abc123.vercel.app',c:'#a855f7',y:H*.25}, {label:'fix/auth-bug',url:'fix-auth-xyz789.vercel.app',c:'#38bdf8',y:H*.45}, {label:'main (prod)',url:'myapp.com',c:'#34d399',y:H*.65},
];
branches.forEach(b=>{
cdRR(ctx,W*.04,b.y-18,W*.3,36,7,b.c+'18',b.c,1.5);
cdTxt(ctx,b.label,W*.04+8,b.y+1,10.5,b.c,'left',600);
cdArrow(ctx,W*.04+W*.3,b.y,W*.48,b.y,b.c+'88');
cdGlow(ctx,W*.62,b.y,30,b.c);
cdRR(ctx,W*.48,b.y-18,W*.46,36,7,'#0a1520',b.c,1.5); cdTxt(ctx,'[web] '+b.url,W*.71,b.y+1,9.5,b.c,'center',500);
const pp=(VERCEL.t*0.015+branches.indexOf(b)*0.3)%1;
cdDot(ctx,W*.04+W*.3+(W*.48-W*.04-W*.3)*pp,b.y,b.c,4);
});
cdTxt(ctx,'Every branch gets a unique preview URL -- share with team before merging to production',W/2,H-10,9.5,'#484f58','center');
}
VERCEL.raf=requestAnimationFrame(animVercel);
}
const CICDP={ctx:null,t:0,raf:null,mode:'push'};

function initCicdPipeline(){
const ctx=setupCvs('cvs-cicd-pipeline');if(!ctx)return;
CICDP.ctx=ctx;CICDP.t=0;cancelAnimationFrame(CICDP.raf);animCicdPipeline();
}

function cicdPipelineAnim(m){CICDP.mode=m;}

function animCicdPipeline(){
const ctx=CICDP.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H);cdRR(ctx,0,0,W,H,0,'#0d1117');
CICDP.t++;
const stages=[
{label:'Git Push',sub:'GitHub/GitLab',c:'#e2e8f0',x:W*.07,icon:'[push]'}, {label:'GitHub Actions',sub:'CI runner',c:'#f59e0b',x:W*.22,icon:'[cfg]'}, {label:'Docker Build',sub:'image + push',c:'#2496ed',x:W*.38,icon:'[D]'}, {label:'Registry',sub:'ghcr.io / ECR',c:'#a855f7',x:W*.52,icon:'[reg]'}, {label:'K8s / Vercel',sub:'deploy',c:'#326ce5',x:W*.67,icon:'[K8s]'}, {label:'Edge CDN',sub:'global serve',c:'#38bdf8',x:W*.82,icon:'[cdn]'}, {label:'Kafka',sub:'event bus',c:'#e34c2e',x:W*.93,icon:'[msg]'},
];
const y=H*.42;
const pp=(CICDP.t*0.008)%(stages.length+1);
stages.forEach((s,i)=>{
const active=Math.abs(pp-i)<0.8;
const done=pp>i+0.8;
const bc=done?'#34d399':s.c;
if(active)cdGlow(ctx,s.x,y,26,s.c);
cdRR(ctx,s.x-38,y-32,76,64,9,bc+(active?'22':done?'18':'0d'),bc,active?2:done?1.5:1); cdTxt(ctx,s.icon,s.x,y-14,15,'#fff','center'); s.label.split('\n').forEach((l,j)=>cdTxt(ctx,l,s.x,y+6+(j*13),9,active?bc:done?'#34d399':'#484f58','center',600)); cdTxt(ctx,s.sub,s.x,y+32,7.5,'#30363d','center');
if(i<stages.length-1){
cdArrow(ctx,s.x+38,y,stages[i+1].x-38,y,done?'#34d39988':bc+'44');
if(active&&pp-i>0&&pp-i<1){
const segPp=pp-i;
cdDot(ctx,s.x+38+(stages[i+1].x-38-s.x-38)*segPp,y,s.c,5);
cdGlow(ctx,s.x+38+(stages[i+1].x-38-s.x-38)*segPp,y,10,s.c);
}
}
});
const modeLabels={push:'Code push triggers automated pipeline',test:'Tests pass -> image built and pushed to registry',deploy:'Image pulled by K8s -> rolled out -> edge CDN updated'}; cdTxt(ctx,modeLabels[CICDP.mode]||'Full CI/CD: Code -> Test -> Containerise -> Orchestrate -> Deploy -> Stream',W/2,H-10,9.5,'#484f58','center');
CICDP.raf=requestAnimationFrame(animCicdPipeline);
}
const R19 = { ctx: null, t: 0, raf: null, mode: 'actions' };

function initReact19Anim() {
const ctx = setupCvs('cvs-react19'); if (!ctx) return;
R19.ctx = ctx; R19.t = 0;
cancelAnimationFrame(R19.raf);
animReact19();
}

function r19Anim(mode) {
R19.mode = mode; R19.t = 0;
document.querySelectorAll('#r19-animation .cbtn').forEach(b => b.classList.remove('active'));
const btn = document.getElementById('r19-btn-' + mode);
if (btn) btn.classList.add('active');
if (!R19.ctx) initReact19Anim();
}

function animReact19() {
R19.raf = requestAnimationFrame(animReact19);
const ctx = R19.ctx; if (!ctx) return;
const W = ctx._w, H = ctx._h;
ctx.clearRect(0, 0, W, H);
rr(ctx, 0, 0, W, H, 0, '#0d0b1e');
R19.t++;
if (R19.mode === 'actions') drawR19Actions(ctx, W, H);
else if (R19.mode === 'optimistic') drawR19Optimistic(ctx, W, H);
else if (R19.mode === 'compiler') drawR19Compiler(ctx, W, H);
else if (R19.mode === 'use') drawR19Use(ctx, W, H);
}

function r19Rr(ctx,x,y,w,h,r,fill,stroke,sw) {
ctx.beginPath();
if (ctx.roundRect) ctx.roundRect(x,y,w,h,r); else ctx.rect(x,y,w,h);
if (fill) { ctx.fillStyle = fill; ctx.fill(); }
if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = sw||1; ctx.stroke(); }
}

function r19Txt(ctx,t,x,y,size,color,align,weight) {
ctx.font = `${weight||400} ${size}px 'DM Sans',sans-serif`;
ctx.fillStyle = color; ctx.textAlign = align||'center';
ctx.textBaseline = 'middle'; ctx.fillText(t,x,y);
}

function r19Dot(ctx,x,y,r,color,alpha) {
ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
ctx.globalAlpha = alpha===undefined ? 1 : alpha;
ctx.fillStyle = color; ctx.fill(); ctx.globalAlpha = 1;
}

function r19Arrow(ctx,x1,y1,x2,y2,color,progress) {
const p = Math.max(0, Math.min(1, progress===undefined ? 1 : progress));
const ex = x1 + (x2-x1)*p, ey = y1 + (y2-y1)*p;
ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(ex,ey);
ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
if (p > 0.85) {
const angle = Math.atan2(ey-y1, ex-x1);
ctx.beginPath();
ctx.moveTo(ex, ey);
ctx.lineTo(ex - 8*Math.cos(angle-0.4), ey - 8*Math.sin(angle-0.4));
ctx.lineTo(ex - 8*Math.cos(angle+0.4), ey - 8*Math.sin(angle+0.4));
ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}
}

function r19Glow(ctx,x,y,r,color) {
const base = color.length > 7 ? color.slice(0,7) : color;
const g = ctx.createRadialGradient(x,y,0,x,y,r);
g.addColorStop(0, base+'55'); g.addColorStop(1, base+'00');
ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
ctx.fillStyle = g; ctx.fill();
}

function drawR19Actions(ctx, W, H) {
const t = R19.t;
const cycle = 200;

const phase = (t % cycle) / cycle;
r19Txt(ctx, 'useActionState — Async Action Lifecycle', W/2, 22, 12, '#9d8df5', 'center', 600);
const stages = [
{ x: W*0.10, label: 'User\nAction', sub: 'click / submit', c: '#e2e8f0', bg: '#1e1c3a' },
{ x: W*0.30, label: 'isPending\ntrue', sub: 'loading state', c: '#fbbf24', bg: '#2a2000' },
{ x: W*0.50, label: 'async\naction()', sub: 'server / fn', c: '#60a5fa', bg: '#001a3a' },
{ x: W*0.70, label: 'state\nupdated', sub: 'result / error', c: '#a78bfa', bg: '#1a0a3a' },
{ x: W*0.90, label: 'isPending\nfalse',sub: 'done', c: '#34d399', bg: '#003020' },
];
const boxW = 80, boxH = 52, cy = H/2;
const activeIdx = Math.min(4, Math.floor(phase * 5));

const stagePhase = (phase * 5) % 1;
stages.forEach((s, i) => {
const active = i === activeIdx;
const done = i < activeIdx;
if (active) r19Glow(ctx, s.x, cy, 52, s.c);
const alpha = done ? 0.5 : active ? 1 : 0.25;
ctx.globalAlpha = alpha;
r19Rr(ctx, s.x-boxW/2, cy-boxH/2, boxW, boxH, 10, s.bg, s.c+(active?'cc':'55'), active?2:1);
ctx.globalAlpha = 1;
const lines = s.label.split('\n');
lines.forEach((line, li) => {
r19Txt(ctx, line, s.x, cy - 8 + li*16, 11, active ? s.c : (done ? s.c+'88' : '#5a5880'), 'center', 600);
});
r19Txt(ctx, s.sub, s.x, cy + boxH/2 + 12, 9, '#5a5880', 'center', 400);
if (i < stages.length - 1) {
const next = stages[i+1];
let arrowP = done ? 1 : active ? stagePhase : 0;
r19Arrow(ctx, s.x + boxW/2 + 2, cy, next.x - boxW/2 - 2, cy,
done ? '#34d39955' : active ? s.c : '#2a2450', arrowP);
}
if (active && i < stages.length - 1) {
const next = stages[i+1];
const px = s.x + boxW/2 + (next.x - boxW/2 - s.x - boxW/2) * stagePhase;
r19Glow(ctx, px, cy, 14, s.c);
r19Dot(ctx, px, cy, 5, s.c);
}
});
const statusMessages = [
'User triggers form submission', 'Setting isPending = true…',
'Running async action on server…', 'Updating state with result…',
'isPending = false — UI ready'
];
const msg = statusMessages[activeIdx] || '';
r19Rr(ctx, W/2-180, H-38, 360, 24, 6, '#1a1838', '#2a2458', 1);
r19Txt(ctx, msg, W/2, H-26, 10.5, '#9d8df5', 'center', 500);
}

function drawR19Optimistic(ctx, W, H) {
const t = R19.t;
const cycle = 240;

const phase = (t % cycle) / cycle;
r19Txt(ctx, 'useOptimistic — Instant UI with Auto-Revert', W/2, 22, 12, '#fb923c', 'center', 600);
const lx = W*0.28, rx = W*0.72, midX = W*0.5;
const topY = 60, rowH = 52;
r19Rr(ctx, lx-90, topY-16, 180, 28, 8, '#1e1838', '#7c3aed55', 1);
r19Txt(ctx, '📱 UI State (Optimistic)', lx, topY-2, 11, '#a78bfa', 'center', 600);
r19Rr(ctx, rx-90, topY-16, 180, 28, 8, '#001830', '#2563eb55', 1);
r19Txt(ctx, '🌐 Server State', rx, topY-2, 11, '#60a5fa', 'center', 600);
const scenario = Math.floor(phase * 3);

const sp = (phase * 3) % 1;
const baseCount = 99;
let uiCount, serverCount, uiColor, serverColor, statusMsg, resultMsg;
if (scenario === 0) {
uiCount = sp > 0.3 ? 100 : 99;
serverCount = sp > 0.7 ? 100 : 99;
uiColor = sp > 0.3 ? '#34d399' : '#e2e8f0';
serverColor = sp > 0.7 ? '#34d399' : '#e2e8f0';
statusMsg = sp < 0.3 ? 'User clicks Like ❤️' : sp < 0.7 ? 'Optimistic: showing 100' : '✅ Server confirms 100';
resultMsg = '✅ Success path';
} else if (scenario === 1) {
uiCount = sp < 0.5 ? 100 : 99;
serverCount = 99;
uiColor = sp < 0.5 ? '#34d399' : '#ef4444';
serverColor = '#ef4444';
statusMsg = sp < 0.2 ? 'Optimistic: 100 shown' : sp < 0.5 ? 'Server processing…' : '❌ Error! Reverting to 99';
resultMsg = '❌ Error — auto revert';
} else {
uiCount = 99; serverCount = 99;
uiColor = '#e2e8f0'; serverColor = '#e2e8f0';
statusMsg = 'Waiting for user action…';
resultMsg = '⏸ Idle';
}
const uyc = topY + rowH + 20;
r19Glow(ctx, lx, uyc, 44, uiColor);
r19Rr(ctx, lx-80, uyc-28, 160, 56, 12, '#16122e', uiColor+'88', 2);
r19Txt(ctx, '❤️', lx, uyc-10, 20, '#ffffff', 'center');
r19Txt(ctx, String(uiCount), lx, uyc+14, 18, uiColor, 'center', 700);
const syc = topY + rowH + 20;
r19Glow(ctx, rx, syc, 44, serverColor);
r19Rr(ctx, rx-80, syc-28, 160, 56, 12, '#001428', serverColor+'88', 2);
r19Txt(ctx, '🗄️', rx, syc-10, 18, '#ffffff', 'center');
r19Txt(ctx, String(serverCount), rx, syc+14, 18, serverColor, 'center', 700);
const arrowP = Math.min(1, sp * 2);
r19Arrow(ctx, lx+82, uyc, midX-20, uyc, '#9d8df5', arrowP);
r19Arrow(ctx, rx-82, uyc, midX+20, uyc, '#60a5fa', arrowP);
r19Rr(ctx, midX-36, uyc-13, 72, 26, 8, '#1a1838', '#3a3468', 1);
r19Txt(ctx, 'sync', midX, uyc, 10, '#9d8df5', 'center', 600);
r19Txt(ctx, uiCount === 100 ? 'useOptimistic' : 'useState', lx, uyc + 40, 10, '#9d8df5', 'center', 500);
r19Txt(ctx, 'Database', rx, uyc + 40, 10, '#60a5fa', 'center', 500);
const resultColor = resultMsg.startsWith('✅') ? '#34d399' : resultMsg.startsWith('❌') ? '#ef4444' : '#9d8df5';
r19Rr(ctx, midX-70, uyc+60, 140, 26, 8, '#1a1838', resultColor+'55', 1);
r19Txt(ctx, resultMsg, midX, uyc+73, 10.5, resultColor, 'center', 600);
r19Rr(ctx, W/2-180, H-38, 360, 24, 6, '#1a1838', '#2a2458', 1);
r19Txt(ctx, statusMsg, W/2, H-26, 10.5, '#f59e0b', 'center', 500);
}

function drawR19Compiler(ctx, W, H) {
const t = R19.t;
const cycle = 180;

const phase = (t % cycle) / cycle;
r19Txt(ctx, 'React Compiler — Automatic Memoization', W/2, 22, 12, '#f59e0b', 'center', 600);
const lx = W*0.25, rx = W*0.75, midX = W*0.5;
const topY = 55;
r19Rr(ctx, lx-110, topY, 220, 28, 8, '#2a0a0a', '#ef444455', 1);
r19Txt(ctx, '❌ Before (Manual)', lx, topY+14, 11, '#ef4444', 'center', 700);
const beforeFns = [
{ y: topY+50, text: 'React.memo(Comp)', c: '#ef4444' },
{ y: topY+74, text: 'useMemo(() => …, [dep])', c: '#f97316' },
{ y: topY+98, text: 'useCallback(fn, [])', c: '#f59e0b' },
];
beforeFns.forEach(fn => {
const alpha = 0.7 + 0.3 * Math.sin(t * 0.05 + fn.y);
ctx.globalAlpha = alpha;
r19Rr(ctx, lx-100, fn.y-11, 200, 24, 6, '#1a0808', fn.c+'44', 1);
r19Txt(ctx, fn.text, lx, fn.y+1, 10.5, fn.c, 'center', 500);
ctx.globalAlpha = 1;
});
r19Rr(ctx, rx-110, topY, 220, 28, 8, '#002a0a', '#34d39955', 1);
r19Txt(ctx, '✅ After (Compiler)', rx, topY+14, 11, '#34d399', 'center', 700);
const afterFns = [
{ y: topY+50, text: 'const Comp = ({data}) => {', c: '#e2e8f0' },
{ y: topY+74, text: ' const val = heavyCalc(data)', c: '#a5b4fc' },
{ y: topY+98, text: ' return <div>{val}</div>', c: '#86efac' },
];
afterFns.forEach(fn => {
r19Rr(ctx, rx-100, fn.y-11, 200, 24, 6, '#001808', fn.c+'22', 1);
r19Txt(ctx, fn.text, rx, fn.y+1, 10.5, fn.c, 'center', 400);
});
r19Rr(ctx, rx-100, topY+118, 200, 20, 6, '#00280a', '#34d39944', 1);
r19Txt(ctx, '// ← compiler memoizes automatically', rx, topY+128, 9.5, '#34d39988', 'center', 400);
const compilerY = topY + 70;
r19Glow(ctx, midX, compilerY, 36, '#f59e0b');
r19Rr(ctx, midX-34, compilerY-20, 68, 40, 10, '#1a1200', '#f59e0b', 2);
r19Txt(ctx, '⚙️', midX, compilerY-5, 16, '#ffffff', 'center');
r19Txt(ctx, 'Compiler', midX, compilerY+12, 9, '#f59e0b', 'center', 600);
for (let i = 0; i < 6; i++) {

const angle = (i / 6) * Math.PI * 2 + t * 0.03;
const dist = 44 + 12 * Math.sin(t * 0.05 + i);
const px = midX + Math.cos(angle) * dist;
const py = compilerY + Math.sin(angle) * dist * 0.5;
r19Dot(ctx, px, py, 2.5, '#f59e0b', 0.5 + 0.4 * Math.sin(t*0.08+i));
}

const arp = (phase * 2) % 1;
r19Arrow(ctx, lx+112, compilerY, midX-36, compilerY, '#ef4444', Math.min(1, arp * 2));
r19Arrow(ctx, midX+36, compilerY, rx-112, compilerY, '#34d399', Math.min(1, Math.max(0, arp*2-1)));
const gainW = 200, gainH = 22, gainY = H-65;
r19Rr(ctx, midX-gainW/2, gainY, gainW, gainH, 6, '#0a1a0a', '#34d39955', 1);
const filled = gainW * Math.min(1, 0.4 + 0.6 * phase);
r19Rr(ctx, midX-gainW/2, gainY, filled, gainH, 6, 'transparent');
const grad = ctx.createLinearGradient(midX-gainW/2, 0, midX+gainW/2, 0);
grad.addColorStop(0, '#34d39966'); grad.addColorStop(1, '#34d399cc');
ctx.fillStyle = grad;
ctx.beginPath();
if (ctx.roundRect) ctx.roundRect(midX-gainW/2+1, gainY+1, filled-2, gainH-2, 5);
else ctx.rect(midX-gainW/2+1, gainY+1, filled-2, gainH-2);
ctx.fill();
r19Txt(ctx, `Performance gain: ${Math.round(40 + 60*phase)}%`, midX, gainY+11, 10, '#34d399', 'center', 600);
r19Rr(ctx, W/2-180, H-35, 360, 24, 6, '#1a1838', '#2a2458', 1);
r19Txt(ctx, 'No more manual memoization — compiler handles it all at build time', W/2, H-23, 10, '#f59e0b', 'center', 500);
}

function drawR19Use(ctx, W, H) {
const t = R19.t;
const cycle = 200;

const phase = (t % cycle) / cycle;
r19Txt(ctx, 'use() Hook — Read Promises & Context in Render', W/2, 22, 12, '#c084fc', 'center', 600);
const midX = W/2, topY = 48;
const compW = 200, compH = 40, compX = midX, compY = topY + 20;
r19Rr(ctx, compX-compW/2, compY-compH/2, compW, compH, 10, '#1a0e2e', '#c084fc', 2);
r19Txt(ctx, '⚛ React Component', compX, compY-6, 11, '#c084fc', 'center', 700);
r19Txt(ctx, 'const data = use(fetchPromise)', compX, compY+9, 10, '#a5b4fc', 'center', 400);
const promX = W*0.28, ctxX = W*0.72, branchY = topY + 100;
r19Arrow(ctx, midX, compY+compH/2, promX, branchY-24, '#c084fc88', Math.min(1, phase*3));
r19Arrow(ctx, midX, compY+compH/2, ctxX, branchY-24, '#c084fc88', Math.min(1, phase*3));
r19Rr(ctx, promX-85, branchY-24, 170, 30, 8, '#001428', '#60a5fa88', 1);
r19Txt(ctx, '📦 Promise', promX, branchY-9, 11, '#60a5fa', 'center', 600);
const promStages = ['Pending…', 'Resolving…', 'Resolved ✓'];
const stageIdx = Math.min(2, Math.floor(phase * 3));
const stageColors = ['#fbbf24', '#f97316', '#34d399'];
r19Rr(ctx, promX-85, branchY+16, 170, 52, 10, '#001020', '#60a5fa44', 1);
r19Txt(ctx, promStages[stageIdx], promX, branchY+40, 12, stageColors[stageIdx], 'center', 700);
r19Txt(ctx, 'Suspense boundary catches', promX, branchY+57, 9, '#5a7098', 'center');
if (stageIdx < 2) {
const spinAngle = t * 0.08;
ctx.beginPath();
ctx.arc(promX, branchY+100, 12, spinAngle, spinAngle + Math.PI * 1.5);
ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2.5;
ctx.lineCap = 'round'; ctx.stroke();
r19Txt(ctx, 'Loading…', promX, branchY+122, 9.5, '#60a5fa88');
} else {
r19Glow(ctx, promX, branchY+100, 24, '#34d399');
r19Rr(ctx, promX-50, branchY+87, 100, 26, 8, '#002a14', '#34d399', 2);
r19Txt(ctx, '{ name: "Alice" }', promX, branchY+100, 10, '#34d399', 'center', 500);
}
r19Rr(ctx, ctxX-85, branchY-24, 170, 30, 8, '#140028', '#a78bfa88', 1);
r19Txt(ctx, '🎨 Context', ctxX, branchY-9, 11, '#a78bfa', 'center', 600);
const ctxItems = [
{ label: 'ThemeContext', value: 'dark', c: '#818cf8' },
{ label: 'AuthContext', value: 'admin', c: '#c084fc' },
{ label: 'LangContext', value: 'en-US', c: '#e879f9' },
];
ctxItems.forEach((item, i) => {
const iy = branchY + 18 + i * 28;
const vis = phase > i * 0.25;
ctx.globalAlpha = vis ? 1 : 0.2;
r19Rr(ctx, ctxX-85, iy-10, 170, 22, 6, '#0e0020', item.c+'33', 1);
r19Txt(ctx, `use(${item.label})`, ctxX-18, iy+1, 9.5, item.c, 'left', 500);
r19Txt(ctx, `"${item.value}"`, ctxX+52, iy+1, 9.5, '#86efac', 'right', 400);
ctx.globalAlpha = 1;
});
r19Rr(ctx, midX-190, H-55, 380, 38, 10, '#1a1838', '#c084fc55', 1);
r19Txt(ctx, '💡 Unlike other hooks — use() can be called conditionally', midX, H-44, 10.5, '#c084fc', 'center', 600);
r19Txt(ctx, 'if (showData) { const d = use(promise); } ✓ valid', midX, H-28, 10, '#9d8df5', 'center', 400);
}
(function(){
const obs = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) { setTimeout(initReact19Anim, 80); }
});
}, { threshold: 0.15 });
const el = document.getElementById('cvs-react19');
if (el) obs.observe(el);
})();
const R19A = { ctx:null, t:0, raf:null, mode:'roundtrip' };

function initR19Actions() {
const ctx = setupCvs('cvs-r19-actions'); if(!ctx) return;
R19A.ctx = ctx; R19A.t = 0;
cancelAnimationFrame(R19A.raf);
animR19Actions();
}

function r19ActAnim(mode) {
R19A.mode = mode; R19A.t = 0;
document.querySelectorAll('#r19-actions .cbtn').forEach(b=>b.classList.remove('active'));
const btn = document.getElementById('r19a-btn-' + (mode==='roundtrip'?'rt':mode==='error'?'err':'opt'));
if(btn) btn.classList.add('active');
if(!R19A.ctx) initR19Actions();
}

function animR19Actions() {
R19A.raf = requestAnimationFrame(animR19Actions);
const ctx = R19A.ctx; if(!ctx) return;
const W = ctx._w, H = ctx._h;
ctx.clearRect(0,0,W,H);
rr(ctx,0,0,W,H,0,'#0d0b1e');
R19A.t++;
if(R19A.mode==='roundtrip') drawActRoundtrip(ctx,W,H);
else if(R19A.mode==='error') drawActError(ctx,W,H);
else drawActOptimistic(ctx,W,H);
}

function drawActRoundtrip(ctx,W,H) {
const t = R19A.t;

const cycle = 210, phase = (t%cycle)/cycle;

const step = Math.floor(phase*5), sp = (phase*5)%1;
r19Txt(ctx,'Server Action — Full Round Trip',W/2,18,12,'#34d3c8','center',700);
const nodes = [
{x:W*.10, label:'Component', sub:'<form>', c:'#a78bfa', bg:'#1a0e2e'},
{x:W*.28, label:'isPending', sub:'true', c:'#fbbf24', bg:'#2a1e00'},
{x:W*.50, label:'Server', sub:"'use server'", c:'#60a5fa', bg:'#001428'},
{x:W*.72, label:'Database', sub:'db.create()', c:'#34d399', bg:'#002814'},
{x:W*.90, label:'Revalidate', sub:'state update', c:'#c084fc', bg:'#1a0028'},
];
const bw=82, bh=46, cy=H/2-8;
nodes.forEach((n,i) => {
const active = i===step, done = i<step;
if(active) r19Glow(ctx,n.x,cy,44,n.c);
ctx.globalAlpha = done?0.5:active?1:0.22;
r19Rr(ctx,n.x-bw/2,cy-bh/2,bw,bh,10,n.bg,n.c+(active?'cc':'44'),active?2:1);
ctx.globalAlpha=1;
r19Txt(ctx,n.label,n.x,cy-7,11,active?n.c:done?n.c+'88':'#4a4870','center',700);
r19Txt(ctx,n.sub,n.x,cy+10,9.5,'#4a4870','center',400);
if(i<nodes.length-1){
const nx=nodes[i+1];
const ap = done?1:active?sp:0;
r19Arrow(ctx,n.x+bw/2+2,cy,nx.x-bw/2-2,cy,done?'#34d39944':active?n.c:'#2a2450',ap);
if(active && ap>0.1){
const px=n.x+bw/2+2+(nx.x-bw/2-2-n.x-bw/2-2)*ap;
r19Glow(ctx,px,cy,10,n.c);
r19Dot(ctx,px,cy,4,n.c);
}
}
});
const msgs=['Form submitted','Loading state set…','Running on server…','Persisting to DB…','UI revalidated ✓'];
r19Rr(ctx,W/2-160,H-30,320,22,6,'#1a1838','#2a2458',1);
r19Txt(ctx,msgs[Math.min(step,4)],W/2,H-19,10,'#9d8df5','center',500);
}

function drawActError(ctx,W,H) {
const t = R19A.t;
const cycle=200, phase=(t%cycle)/cycle;
const step=Math.min(4,Math.floor(phase*5)), sp=(phase*5)%1;
r19Txt(ctx,'Error Handling — Auto State Recovery',W/2,18,12,'#f87171','center',700);
const cy=H/2-8;
const nodes=[
{x:W*.12,label:'Submit', c:'#a78bfa',bg:'#1a0e2e'},
{x:W*.30,label:'Pending', c:'#fbbf24',bg:'#2a1e00'},
{x:W*.50,label:'Server', c:'#60a5fa',bg:'#001428'},
{x:W*.70,label:'Error!', c:'#ef4444',bg:'#2a0808'},
{x:W*.88,label:'Caught', c:'#f87171',bg:'#2a0808'},
];
const bw=72,bh=42;
nodes.forEach((n,i)=>{
const active=i===step, done=i<step;
const isErr=(i===3||i===4);
if(active) r19Glow(ctx,n.x,cy,40,n.c);
ctx.globalAlpha=done?0.55:active?1:0.2;
r19Rr(ctx,n.x-bw/2,cy-bh/2,bw,bh,10,n.bg,n.c+(active?'cc':'44'),active?2:1);
ctx.globalAlpha=1;
r19Txt(ctx,n.label,n.x,cy,12,active?n.c:done?n.c+'88':'#4a4870','center',700);
if(i<nodes.length-1){
const nx=nodes[i+1];
const ap=done?1:active?sp:0;
const col=isErr?'#ef444488':done?'#34d39944':active?n.c:'#2a2450';
r19Arrow(ctx,n.x+bw/2+2,cy,nx.x-bw/2-2,cy,col,ap);
}
});
if(step>=3){
const resY=cy+62;
const alpha=Math.min(1,(step-3+sp)*1.5);
ctx.globalAlpha=alpha;
r19Rr(ctx,W/2-140,resY-14,280,36,8,'#2a0808','#ef4444',1.5);
r19Txt(ctx,'state.error = "Server error" | isPending = false',W/2,resY-2,10,'#f87171','center',600);
r19Txt(ctx,'→ Component renders error UI automatically',W/2,resY+13,9.5,'#9a4a4a','center',400);
ctx.globalAlpha=1;
}
r19Rr(ctx,W/2-160,H-30,320,22,6,'#1a1838','#2a2458',1);
const smsgs=['Form submitted','Setting isPending…','Server processing…','Exception thrown!','Error caught in state'];
r19Txt(ctx,smsgs[step]||'',W/2,H-19,10,'#f87171','center',500);
}

function drawActOptimistic(ctx,W,H) {
const t=R19A.t;
const cycle=220, phase=(t%cycle)/cycle;
const seg=Math.floor(phase*4), sp=(phase*4)%1;
r19Txt(ctx,'useOptimistic + useActionState Together',W/2,18,12,'#fb923c','center',700);
const cy=H*0.42;
const lx=W*0.18, mx=W*0.50, rx=W*0.82;
const boxes=[
{x:lx,label:'UI Component',sub:'useOptimistic',c:'#a78bfa',bg:'#1a0e2e'},
{x:mx,label:'useActionState',sub:'pending/error/state',c:'#fbbf24',bg:'#2a1e00'},
{x:rx,label:'Server Action',sub:"'use server'",c:'#34d399',bg:'#002814'},
];
boxes.forEach(b=>{
r19Glow(ctx,b.x,cy,38,b.c);
r19Rr(ctx,b.x-88,cy-24,176,48,10,b.bg,b.c+'88',1.5);
r19Txt(ctx,b.label,b.x,cy-9,11.5,b.c,'center',700);
r19Txt(ctx,b.sub,b.x,cy+9,9.5,'#5a5880','center',400);
});
const msgs=[
{from:lx,to:mx,label:'dispatch action',c:'#fbbf24',y:cy-38},
{from:mx,to:rx,label:'call server fn',c:'#60a5fa',y:cy+42},
{from:rx,to:mx,label:'return result',c:'#34d399',y:cy+42},
{from:mx,to:lx,label:'update state',c:'#a78bfa',y:cy-38},
];
msgs.forEach((m,i)=>{
const msgActive=i===seg;
const msgDone=i<seg;
const ap=msgDone?1:msgActive?sp:0;
if(ap>0){
const dir=m.from<m.to?1:-1;
const sx=m.from+(dir>0?92:-92);
const ex=m.to+(dir>0?-92:92);
ctx.beginPath();
ctx.setLineDash([4,4]);
ctx.moveTo(sx,m.y); ctx.lineTo(ex,m.y);
ctx.strokeStyle=m.c+'44'; ctx.lineWidth=1.5; ctx.stroke();
ctx.setLineDash([]);
const px=sx+(ex-sx)*ap;
r19Glow(ctx,px,m.y,12,m.c);
r19Dot(ctx,px,m.y,4.5,m.c);
r19Txt(ctx,m.label,sx+(ex-sx)*0.5,m.y+(dir>0?-11:11),9,m.c,'center',500);
}
});
if(seg===0||seg===3){
r19Rr(ctx,lx-68,cy+40,136,22,6,'#1a0e2e','#a78bfa55',1);
r19Txt(ctx,'optimistic update shown',lx,cy+51,9.5,'#a78bfa88','center',400);
}
r19Rr(ctx,W/2-170,H-30,340,22,6,'#1a1838','#2a2458',1);
const omsg=['UI dispatches → optimistic update shown','Forwarding to server via useActionState','Server responds with confirmed result','State resolved — UI shows real data'];
r19Txt(ctx,omsg[seg]||'',W/2,H-19,10,'#fb923c','center',500);
}
const R19C = { ctx:null, t:0, raf:null, mode:'transform' };

function initR19Compiler() {
const ctx = setupCvs('cvs-r19-compiler'); if(!ctx) return;
R19C.ctx = ctx; R19C.t = 0;
cancelAnimationFrame(R19C.raf);
animR19Compiler();
}

function r19CmpAnim(mode) {
R19C.mode = mode; R19C.t = 0;
document.querySelectorAll('#r19-compiler .cbtn').forEach(b=>b.classList.remove('active'));
const btn = document.getElementById('r19c-btn-' + (mode==='transform'?'tr':mode==='memo'?'mem':'pf'));
if(btn) btn.classList.add('active');
if(!R19C.ctx) initR19Compiler();
}

function animR19Compiler() {
R19C.raf = requestAnimationFrame(animR19Compiler);
const ctx = R19C.ctx; if(!ctx) return;
const W = ctx._w, H = ctx._h;
ctx.clearRect(0,0,W,H);
rr(ctx,0,0,W,H,0,'#0d0b1e');
R19C.t++;
if(R19C.mode==='transform') drawCmpTransform(ctx,W,H);
else if(R19C.mode==='memo') drawCmpMemo(ctx,W,H);
else drawCmpPerf(ctx,W,H);
}

function drawCmpTransform(ctx,W,H) {
const t=R19C.t;
const cycle=200, phase=(t%cycle)/cycle;
r19Txt(ctx,'Compiler Pipeline — Source to Optimised Output',W/2,18,12,'#fbbf24','center',700);
const stages=[
{x:W*.10,label:'Your Code', sub:'JSX / JS', c:'#e2e8f0', icon:'📝'},
{x:W*.28,label:'Parse', sub:'AST generation', c:'#a78bfa', icon:'🔍'},
{x:W*.46,label:'Analyse', sub:'find re-renders', c:'#60a5fa', icon:'🔬'},
{x:W*.64,label:'Optimise', sub:'add memoization', c:'#f59e0b', icon:'⚙️'},
{x:W*.82,label:'Emit', sub:'optimised JS', c:'#34d399', icon:'✅'},
];
const bw=76, bh=50, cy=H/2-6;
const step=Math.min(4,Math.floor(phase*5)), sp=(phase*5)%1;
stages.forEach((s,i)=>{
const active=i===step, done=i<step;
if(active) r19Glow(ctx,s.x,cy,46,s.c);
ctx.globalAlpha=done?0.55:active?1:0.2;
r19Rr(ctx,s.x-bw/2,cy-bh/2,bw,bh,10,'#16132a',s.c+(active?'99':'33'),active?2:1);
ctx.globalAlpha=1;
r19Txt(ctx,s.icon,s.x,cy-12,15,s.c,'center');
r19Txt(ctx,s.label,s.x,cy+5,10,active?s.c:done?s.c+'88':'#4a4870','center',600);
r19Txt(ctx,s.sub,s.x,cy+18,8.5,'#4a4870','center',400);
if(i<stages.length-1){
const ns=stages[i+1];
const ap=done?1:active?sp:0;
r19Arrow(ctx,s.x+bw/2+2,cy,ns.x-bw/2-2,cy,done?s.c+'55':active?s.c:'#2a2450',ap);
if(active&&ap>0.05){
const px=s.x+bw/2+2+(ns.x-bw/2-2-s.x-bw/2-2)*ap;
r19Glow(ctx,px,cy,12,s.c);
r19Dot(ctx,px,cy,4,s.c);
}
}
});
if(step>=3){
const ann=step===3?'Inserting React.memo() calls…':'Memoization complete — bundle ready';
r19Rr(ctx,W/2-160,H-30,320,22,6,'#201800','#f59e0b55',1);
r19Txt(ctx,ann,W/2,H-19,10,'#f59e0b','center',500);
} else {
r19Rr(ctx,W/2-160,H-30,320,22,6,'#1a1838','#2a2458',1);
const pm=['Loading source file…','Building AST…','Detecting expensive renders…','Adding memoization…','Output ready ✓'];
r19Txt(ctx,pm[step]||'',W/2,H-19,10,'#9d8df5','center',500);
}
}

function drawCmpMemo(ctx,W,H) {
const t=R19C.t;
const cycle=180, phase=(t%cycle)/cycle;
const pulse=0.6+0.4*Math.sin(t*0.07);
r19Txt(ctx,'What the Compiler Adds Automatically',W/2,18,12,'#34d399','center',700);
const items=[
{x:W*.20, y:H*.38, label:'React.memo()', c:'#60a5fa', added:phase>0.15},
{x:W*.50, y:H*.38, label:'useMemo()', c:'#a78bfa', added:phase>0.35},
{x:W*.80, y:H*.38, label:'useCallback()', c:'#f59e0b', added:phase>0.55},
{x:W*.35, y:H*.72, label:'ref stability', c:'#34d399', added:phase>0.72},
{x:W*.65, y:H*.72, label:'dep tracking', c:'#f87171', added:phase>0.88},
];
r19Rr(ctx,W/2-70,H*.08,140,32,8,'#16132a','#e2e8f0',1.5);
r19Txt(ctx,'Your Component',W/2,H*.08+16,11,'#e2e8f0','center',600);
items.forEach(item=>{
const alpha=item.added?1:0.2;
ctx.globalAlpha=alpha;
if(item.added) r19Glow(ctx,item.x,item.y,34,item.c);
r19Rr(ctx,item.x-56,item.y-18,112,36,9,'#16132a',item.c+(item.added?'99':'33'),item.added?2:1);
r19Txt(ctx,item.label,item.x,item.y,11,item.c,'center',item.added?700:400);
ctx.globalAlpha=1;
if(item.added){
ctx.beginPath();
ctx.moveTo(W/2,H*.08+32);
ctx.lineTo(item.x,item.y-18);
ctx.strokeStyle=item.c+'55';
ctx.lineWidth=1.2;
ctx.setLineDash([3,3]);
ctx.stroke();
ctx.setLineDash([]);
}
});
const addedCount=items.filter(i=>i.added).length;
r19Rr(ctx,W/2-80,H-30,160,22,20,'#002a14','#34d399',1.5);
r19Txt(ctx,`${addedCount}/5 optimisations added`,W/2,H-19,10.5,'#34d399','center',700);
}

function drawCmpPerf(ctx,W,H) {
const t=R19C.t;
const cycle=240, phase=(t%cycle)/cycle;
r19Txt(ctx,'Performance Impact — Re-render Reduction',W/2,18,12,'#fb923c','center',700);
const bars=[
{label:'List re-renders', before:92, after:18, c:'#ef4444'},
{label:'Prop callbacks', before:78, after:6, c:'#f97316'},
{label:'Derived values', before:85, after:12, c:'#f59e0b'},
{label:'Context updates', before:70, after:8, c:'#a78bfa'},
];
const barH=22, gap=12, startY=44, maxW=W*0.32;
bars.forEach((bar,i)=>{
const y=startY+i*(barH+gap);
const animPhase=Math.min(1,Math.max(0,(phase*5-i*0.8)));
r19Txt(ctx,bar.label,W*.01,y+barH/2,10,'#9490b8','left',500);
const bx=W*.26, bw2=maxW*(bar.before/100);
r19Rr(ctx,bx,y,bw2,barH,4,'#2a0808',bar.c+'44',0);
const grad=ctx.createLinearGradient(bx,0,bx+bw2,0);
grad.addColorStop(0,bar.c+'88'); grad.addColorStop(1,bar.c+'cc');
ctx.fillStyle=grad;
ctx.beginPath();
if(ctx.roundRect) ctx.roundRect(bx,y,bw2,barH,4); else ctx.rect(bx,y,bw2,barH);
ctx.fill();
r19Txt(ctx,bar.before+'%',bx+bw2+6,y+barH/2,9.5,bar.c,'left',600);
const aw=maxW*(bar.after/100)*animPhase;
const ay=y+barH/2;
r19Rr(ctx,W*.62,y,maxW*(bar.after/100),barH,4,'#002a08','#34d39933',0);
if(aw>2){
const g2=ctx.createLinearGradient(W*.62,0,W*.62+aw,0);
g2.addColorStop(0,'#34d39988'); g2.addColorStop(1,'#34d399dd');
ctx.fillStyle=g2;
ctx.beginPath();
if(ctx.roundRect) ctx.roundRect(W*.62,y,aw,barH,4); else ctx.rect(W*.62,y,aw,barH);
ctx.fill();
}
r19Txt(ctx,bar.after+'%',W*.62+maxW*(bar.after/100)+6,y+barH/2,9.5,'#34d399','left',600);
});
r19Txt(ctx,'Before',W*.26+maxW/2,startY-12,9.5,'#ef4444','center',700);
r19Txt(ctx,'With Compiler',W*.62+maxW/2,startY-12,9.5,'#34d399','center',700);
ctx.beginPath();
ctx.moveTo(W*.59,startY-18); ctx.lineTo(W*.59,startY+(barH+gap)*4);
ctx.strokeStyle='#2a2458'; ctx.lineWidth=1; ctx.stroke();
const saving=Math.round(80*Math.min(1,phase*1.5));
r19Rr(ctx,W/2-110,H-30,220,22,20,'#002a14','#34d399',1.5);
r19Txt(ctx,`Avg re-renders reduced by ~${saving}%`,W/2,H-19,10.5,'#34d399','center',700);
}
(function(){
const map={
'cvs-r19-actions': initR19Actions,
'cvs-r19-compiler': initR19Compiler,
};
const obs=new IntersectionObserver((entries)=>{
entries.forEach(e=>{
if(e.isIntersecting){
const fn=map[e.target.id];
if(fn) setTimeout(fn,80);
}
});
},{threshold:0.15});
Object.keys(map).forEach(id=>{
const el=document.getElementById(id);
if(el) obs.observe(el);
});
})();
const WSW = { ctx:null, t:0, raf:null, mode:'both' };

function initWsw() {
const ctx = setupCvs('cvs-wsw');
if (!ctx) return;
WSW.ctx = ctx; WSW.t = 0;
cancelAnimationFrame(WSW.raf);
animWsw();
}

function wswMode(mode, btn) {
WSW.mode = mode; WSW.t = 0;
document.querySelectorAll('#engine-wsw .cbtn').forEach(b => b.classList.remove('active'));
if (btn) btn.classList.add('active');
if (!WSW.ctx) initWsw();
}

function animWsw() {
WSW.raf = requestAnimationFrame(animWsw);
const ctx = WSW.ctx; if (!ctx) return;
const W = ctx._w, H = ctx._h;
ctx.clearRect(0, 0, W, H);
rr(ctx, 0, 0, W, H, 0, '#0d0b1e');
WSW.t++;
if (WSW.mode === 'both') drawWswBoth(ctx, W, H);
else if (WSW.mode === 'ws') drawWswWebSocket(ctx, W, H);
else drawWswWebWorker(ctx, W, H);
}

function wBox(ctx, x, y, w, h, r, bg, border, lw) {
ctx.beginPath();
if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
ctx.fillStyle = bg; ctx.fill();
if (border) { ctx.strokeStyle = border; ctx.lineWidth = lw || 1.5; ctx.stroke(); }
}

function wTxt(ctx, t, x, y, size, color, align, weight) {
ctx.font = `${weight||500} ${size}px 'DM Sans',sans-serif`;
ctx.fillStyle = color; ctx.textAlign = align || 'center';
ctx.textBaseline = 'middle'; ctx.fillText(t, x, y);
}

function wGlow(ctx, x, y, r, color) {
const g = ctx.createRadialGradient(x, y, 0, x, y, r);
g.addColorStop(0, color + '55'); g.addColorStop(1, color + '00');
ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
ctx.fillStyle = g; ctx.fill();
}

function wPacket(ctx, x, y, r, color, alpha) {
ctx.globalAlpha = Math.max(0, Math.min(1, alpha ?? 1));
wGlow(ctx, x, y, r*3, color);
ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
ctx.fillStyle = color; ctx.fill();
ctx.globalAlpha = 1;
}

function wArrow(ctx, x1, y1, x2, y2, color, progress, dashed) {
const p = Math.max(0, Math.min(1, progress ?? 1));
const ex = x1 + (x2-x1)*p, ey = y1 + (y2-y1)*p;
ctx.beginPath();
if (dashed) ctx.setLineDash([5, 4]); else ctx.setLineDash([]);
ctx.moveTo(x1, y1); ctx.lineTo(ex, ey);
ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
ctx.setLineDash([]);
if (p > 0.9) {
const a = Math.atan2(ey - y1, ex - x1);
ctx.beginPath(); ctx.moveTo(ex, ey);
ctx.lineTo(ex - 8*Math.cos(a - 0.4), ey - 8*Math.sin(a - 0.4));
ctx.lineTo(ex - 8*Math.cos(a + 0.4), ey - 8*Math.sin(a + 0.4));
ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}
}

function drawWswBoth(ctx, W, H) {
const t = WSW.t;
wTxt(ctx, 'WebSocket + Web Worker — Combined Architecture', W/2, 17, 11.5, '#9d8df5', 'center', 700);
const bw = 110, bh = 48;
const nodes = [
{ x: W*0.12, y: H*0.38, label: 'WS Server', sub: 'wss://', c: '#22d3ee', bg: '#001e2e' },
{ x: W*0.50, y: H*0.38, label: 'Main Thread', sub: 'UI + DOM', c: '#a78bfa', bg: '#1a0e2e' },
{ x: W*0.88, y: H*0.38, label: 'Web Worker', sub: 'worker.js', c: '#34d399', bg: '#002814' },
];
nodes.forEach(n => {
wGlow(ctx, n.x, n.y, 46, n.c);
wBox(ctx, n.x - bw/2, n.y - bh/2, bw, bh, 12, n.bg, n.c, 1.8);
wTxt(ctx, n.label, n.x, n.y - 7, 12, n.c, 'center', 700);
wTxt(ctx, n.sub, n.x, n.y + 9, 9.5, '#5a6880', 'center', 400);
});

const wsPhase = (t * 0.008) % 1;

const wsBack = (t * 0.008 + 0.5) % 1;
const [n0, n1, n2] = nodes;
const gap = bw / 2 + 4;
wArrow(ctx, n0.x + gap, n0.y - 10, n1.x - gap, n1.y - 10, '#22d3ee88');
wPacket(ctx, n0.x + gap + (n1.x - gap - n0.x - gap) * wsPhase, n0.y - 10, 5, '#22d3ee');
wTxt(ctx, 'message', (n0.x + n1.x)/2, n0.y - 22, 9, '#22d3ee88', 'center', 500);
wArrow(ctx, n1.x - gap, n1.y + 10, n0.x + gap, n0.y + 10, '#22d3ee44');
wPacket(ctx, n1.x - gap - (n1.x - gap - n0.x - gap) * wsBack, n1.y + 10, 4, '#22d3ee', 0.6);
wTxt(ctx, 'send()', (n0.x + n1.x)/2, n0.y + 23, 9, '#22d3ee55', 'center', 400);

const wwPhase = (t * 0.006 + 0.25) % 1;

const wwBack = (t * 0.006 + 0.75) % 1;
wArrow(ctx, n1.x + gap, n1.y - 10, n2.x - gap, n2.y - 10, '#34d39988');
wPacket(ctx, n1.x + gap + (n2.x - gap - n1.x - gap) * wwPhase, n1.y - 10, 5, '#34d399');
wTxt(ctx, 'postMessage()', (n1.x + n2.x)/2, n1.y - 22, 9, '#34d39988', 'center', 500);
wArrow(ctx, n2.x - gap, n2.y + 10, n1.x + gap, n1.y + 10, '#34d39944');
wPacket(ctx, n2.x - gap - (n2.x - gap - n1.x - gap) * wwBack, n2.y + 10, 4, '#34d399', 0.6);
wTxt(ctx, 'result', (n1.x + n2.x)/2, n1.y + 23, 9, '#34d39955', 'center', 400);
const spin = t * 0.06;
ctx.beginPath();
ctx.arc(n2.x, n2.y + 38, 14, spin, spin + Math.PI*1.4);
ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.stroke();
wTxt(ctx, 'computing…', n2.x, n2.y + 58, 9, '#34d39988', 'center', 400);
const phases = ['WS Connect', 'Receive Data', 'postMessage', 'Worker Crunches', 'Result → UI', 'WS Send'];

const barW = (W - 60) / phases.length;
const barY = H - 44;
const activePhase = Math.floor((t * 0.018) % phases.length);
phases.forEach((p, i) => {
const active = i === activePhase;
const bx = 30 + i * barW;
wBox(ctx, bx + 2, barY, barW - 4, 22, 5,
active ? '#1e1060' : '#16132a',
active ? '#a78bfa' : '#2a2458', active ? 2 : 1);
wTxt(ctx, p, bx + barW/2, barY + 11, 8.5, active ? '#a78bfa' : '#4a4870', 'center', active ? 600 : 400);
});
}

function drawWswWebSocket(ctx, W, H) {
const t = WSW.t;

const cycle = 240, phase = (t % cycle) / cycle;

const step = Math.floor(phase * 6), sp = (phase * 6) % 1;
wTxt(ctx, 'WebSocket — Full-Duplex Real-Time Connection', W/2, 17, 11.5, '#22d3ee', 'center', 700);
const cX = W * 0.18, sX = W * 0.82, midY = H * 0.46;
const bw = 100, bh = 52;
wGlow(ctx, cX, midY, 50, '#22d3ee');
wBox(ctx, cX - bw/2, midY - bh/2, bw, bh, 12, '#001828', '#22d3ee', 2);
wTxt(ctx, '🖥️ Client', cX, midY - 8, 12, '#22d3ee', 'center', 700);
wTxt(ctx, 'Browser', cX, midY + 9, 9.5, '#4a6880', 'center', 400);
wGlow(ctx, sX, midY, 50, '#f59e0b');
wBox(ctx, sX - bw/2, midY - bh/2, bw, bh, 12, '#1e1200', '#f59e0b', 2);
wTxt(ctx, '🗄️ Server', sX, midY - 8, 12, '#f59e0b', 'center', 700);
wTxt(ctx, 'WebSocket', sX, midY + 9, 9.5, '#6a4800', 'center', 400);
const lineY = midY;
const connected = step >= 2;
if (connected) {
ctx.beginPath(); ctx.moveTo(cX + bw/2 + 4, lineY); ctx.lineTo(sX - bw/2 - 4, lineY);
ctx.strokeStyle = '#22d3ee33'; ctx.lineWidth = 2; ctx.setLineDash([]); ctx.stroke();
wTxt(ctx, 'TCP Connection Open', W/2, lineY - 10, 9, '#22d3ee55', 'center', 500);
}
const handshake = [
{ dir: 1, y: H*0.28, label: 'HTTP Upgrade Request →', c: '#60a5fa' },
{ dir: -1, y: H*0.28, label: '← 101 Switching Protocols', c: '#34d399' },
{ dir: 1, y: lineY + 20, label: 'send("Hello!") →', c: '#22d3ee' },
{ dir: -1, y: lineY + 20, label: '← message event', c: '#22d3ee' },
{ dir: 1, y: H*0.64, label: 'send(data) →', c: '#a78bfa' },
{ dir: -1, y: H*0.64, label: '← push update', c: '#f59e0b' },
];
handshake.forEach((hs, i) => {
const done = i < step;
const active = i === step;
const prog = active ? sp : (done ? 1 : 0);
if (prog === 0) return;
const sx = hs.dir > 0 ? cX + bw/2 + 4 : sX - bw/2 - 4;
const ex = hs.dir > 0 ? sX - bw/2 - 4 : cX + bw/2 + 4;
wArrow(ctx, sx, hs.y, ex, hs.y, hs.c, prog, false);
if (prog > 0.3) {

const lx = (sx + ex) / 2;
const alpha = Math.min(1, prog * 2);
ctx.globalAlpha = alpha;
wTxt(ctx, hs.label, lx, hs.y - 11, 9, hs.c, 'center', 500);
ctx.globalAlpha = 1;
}
if (active && prog > 0.05) {
const px = sx + (ex - sx) * prog;
wPacket(ctx, px, hs.y, 5, hs.c);
}
});
const statuses = ['Idle', 'Handshake…', 'Connected ✓', 'Messaging', 'Messaging', 'Live ⚡', 'Live ⚡'];
const sc = ['#5a5880','#60a5fa','#34d399','#22d3ee','#22d3ee','#f59e0b','#f59e0b'];
wBox(ctx, W/2 - 80, H - 32, 160, 24, 20, '#1a1838', sc[Math.min(step,6)], 1.5);
wTxt(ctx, `State: ${statuses[Math.min(step,6)]}`, W/2, H - 20, 10, sc[Math.min(step,6)], 'center', 600);
}

function drawWswWebWorker(ctx, W, H) {
const t = WSW.t;
const pulse = 0.6 + 0.4 * Math.sin(t * 0.07);
wTxt(ctx, 'Web Worker — Off-Main-Thread Computation', W/2, 17, 11.5, '#34d399', 'center', 700);
const mtX = W * 0.25, wtX = W * 0.75, topY = 40;
wBox(ctx, mtX - 90, topY, 180, 28, 8, '#1a0e2e', '#a78bfa', 2);
wTxt(ctx, '🧵 Main Thread', mtX, topY + 14, 11.5, '#a78bfa', 'center', 700);
const mainTasks = ['render()', 'handleClick()', 'updateDOM()', 'requestAF()'];
mainTasks.forEach((task, i) => {
const ty = topY + 40 + i * 32;
const active = Math.floor((t * 0.03) % mainTasks.length) === i;
wBox(ctx, mtX - 80, ty, 160, 24, 6, active ? '#1e1060' : '#16132a',
active ? '#a78bfa' : '#2a2458', active ? 2 : 1);
wTxt(ctx, task, mtX, ty + 12, 10.5, active ? '#a78bfa' : '#5a5870', 'center', active ? 600 : 400);
if (active) wGlow(ctx, mtX, ty + 12, 30, '#a78bfa');
});
wBox(ctx, mtX - 80, topY + 40 + mainTasks.length * 32, 160, 22, 6, '#0a1a0a', '#34d39944', 1);
wTxt(ctx, '✅ Always Responsive', mtX, topY + 40 + mainTasks.length * 32 + 11, 9.5, '#34d39988', 'center', 500);
wBox(ctx, wtX - 90, topY, 180, 28, 8, '#002814', '#34d399', 2);
wTxt(ctx, '⚙️ Worker Thread', wtX, topY + 14, 11.5, '#34d399', 'center', 700);
const compY = topY + 50;
const compW = 160, barH = 14, numBars = 5;
wTxt(ctx, 'Heavy Computation', wtX, compY, 10, '#34d39988', 'center', 600);
for (let i = 0; i < numBars; i++) {

const bw2 = (compW - 20) * (0.3 + 0.7 * Math.abs(Math.sin(t * 0.04 + i * 0.8)));
const by = compY + 14 + i * (barH + 5);
wBox(ctx, wtX - compW/2 + 10, by, compW - 20, barH, 3, '#002814', '#34d39933', 1);
const grad = ctx.createLinearGradient(wtX - compW/2 + 10, 0, wtX - compW/2 + 10 + bw2, 0);
grad.addColorStop(0, '#34d39988'); grad.addColorStop(1, '#34d399cc');
ctx.fillStyle = grad;
ctx.beginPath();
if (ctx.roundRect) ctx.roundRect(wtX - compW/2 + 10, by, bw2, barH, 3);
else ctx.rect(wtX - compW/2 + 10, by, bw2, barH);
ctx.fill();
}
const spinY = compY + numBars * (barH + 5) + 30;
const spinA = t * 0.09;
ctx.beginPath(); ctx.arc(wtX, spinY, 14, spinA, spinA + Math.PI * 1.5);
ctx.strokeStyle = '#34d399'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke();
wTxt(ctx, 'processing…', wtX, spinY + 24, 9.5, '#34d39977', 'center', 400);
const chanY = H - 68;
wBox(ctx, W/2 - 70, chanY, 140, 26, 8, '#161030', '#a78bfa88', 1);
wTxt(ctx, '📨 postMessage API', W/2, chanY + 13, 10, '#a78bfa', 'center', 600);

const pPhase = (t * 0.012) % 1;

const pPhase2 = (t * 0.012 + 0.5) % 1;
const startX1 = mtX + 90, endX1 = W/2 - 70;
wArrow(ctx, startX1, chanY + 13, endX1, chanY + 13, '#a78bfa55');
wPacket(ctx, startX1 + (endX1 - startX1) * pPhase, chanY + 13, 4, '#a78bfa');
const startX2 = W/2 + 70, endX2 = wtX - 90;
wArrow(ctx, startX2, chanY + 13, endX2, chanY + 13, '#34d39955');
wPacket(ctx, startX2 + (endX2 - startX2) * pPhase2, chanY + 13, 4, '#34d399');
wTxt(ctx, 'task data →', (startX1 + endX1)/2, chanY + 4, 8.5, '#a78bfa88', 'center', 400);
wTxt(ctx, '← result', (startX2 + endX2)/2, chanY + 22, 8.5, '#34d39988', 'center', 400);
const throughput = Math.round(60 + 40 * Math.sin(t * 0.03));
wBox(ctx, W/2 - 120, H - 30, 240, 22, 20, '#001808', '#34d399', 1.5);
wTxt(ctx, `Worker throughput: ~${throughput} ops/frame • Main: 60fps ✓`, W/2, H - 19, 9.5, '#34d399', 'center', 600);
}
(function () {
const obs = new IntersectionObserver(entries => {
entries.forEach(e => { if (e.isIntersecting) setTimeout(initWsw, 80); });
}, { threshold: 0.15 });
const el = document.getElementById('cvs-wsw');
if (el) obs.observe(el);
})();

function hBox(ctx,x,y,w,h,r,fill,stroke,lw){
ctx.beginPath();
if(ctx.roundRect) ctx.roundRect(x,y,w,h,r); else ctx.rect(x,y,w,h);
if(fill){ctx.fillStyle=fill;ctx.fill();}
if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw||1.5;ctx.stroke();}
}

function hTxt(ctx,t,x,y,size,color,align,weight){
ctx.font=`${weight||500} ${size}px 'DM Sans',sans-serif`;
ctx.fillStyle=color;ctx.textAlign=align||'center';
ctx.textBaseline='middle';ctx.fillText(t,x,y);
}
const BOXMODEL={ctx:null,t:0,raf:null};

function initBoxModel(){
const ctx=setupCvs('cvs-boxmodel');if(!ctx)return;
BOXMODEL.ctx=ctx;BOXMODEL.t=0;
cancelAnimationFrame(BOXMODEL.raf);
animBoxModel();
}

function animBoxModel(){
BOXMODEL.raf=requestAnimationFrame(animBoxModel);
const ctx=BOXMODEL.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h,t=BOXMODEL.t++;
ctx.clearRect(0,0,W,H);
rr(ctx,0,0,W,H,0,'#0d0b1e');
const cx=W/2,cy=H/2;
const pulse=0.5+0.5*Math.sin(t*0.04);
const mg=32+pulse*4;
hBox(ctx,cx-mg-90,cy-mg-50,180+mg*2,100+mg*2,6,'rgba(239,68,68,0.12)','#ef4444',1.5);
hTxt(ctx,'MARGIN',cx,cy-mg-52-8,10,'#ef4444','center',700);
hTxt(ctx,'24px',cx-mg-90-20,cy,9,'#ef4444','center',500);
const bd=16;
hBox(ctx,cx-bd-60,cy-bd-28,120+bd*2,56+bd*2,5,'rgba(251,146,60,0.18)','#f97316',2);
hTxt(ctx,'BORDER',cx,cy-bd-32,9,'#f97316','center',700);
const pd=10;
hBox(ctx,cx-pd-46,cy-pd-18,92+pd*2,36+pd*2,4,'rgba(234,179,8,0.2)','#eab308',1.5);
hTxt(ctx,'PADDING',cx,cy-pd-22,9,'#ca8a04','center',700);
hBox(ctx,cx-46,cy-18,92,36,4,'rgba(34,197,94,0.25)','#22c55e',2);
hTxt(ctx,'CONTENT',cx,cy-2,11,'#22c55e','center',700);
hTxt(ctx,'width × height',cx,cy+11,9,'#4ade80','center',400);
const labels=[
{color:'#ef4444',text:'margin',x:cx+82+mg,y:cy-mg/2-25},
{color:'#f97316',text:'border',x:cx+62+bd,y:cy-bd/2-12},
{color:'#eab308',text:'padding',x:cx+50+pd,y:cy},
{color:'#22c55e',text:'content',x:cx+48,y:cy+22},
];
labels.forEach(l=>{
ctx.beginPath();ctx.moveTo(l.x-18,l.y);ctx.lineTo(l.x-6,l.y);
ctx.strokeStyle=l.color;ctx.lineWidth=1;ctx.stroke();
hTxt(ctx,l.text,l.x+16,l.y,9,l.color,'left',600);
});
hBox(ctx,cx-70,H-28,140,20,10,'#1a1838','#9d8df5',1);
hTxt(ctx,'box-sizing: border-box ✓',cx,H-18,9,'#9d8df5','center',500);
}
const FLEXBOX={ctx:null,t:0,raf:null,mode:'row'};

function initFlexbox(){
const ctx=setupCvs('cvs-flexbox');if(!ctx)return;
FLEXBOX.ctx=ctx;FLEXBOX.t=0;
cancelAnimationFrame(FLEXBOX.raf);
animFlexbox();
}

function flexMode(mode,btn){
FLEXBOX.mode=mode;FLEXBOX.t=0;
document.querySelectorAll('#hca-flexbox .cbtn').forEach(b=>b.classList.remove('active'));
if(btn)btn.classList.add('active');
if(!FLEXBOX.ctx)initFlexbox();
}

function animFlexbox(){
FLEXBOX.raf=requestAnimationFrame(animFlexbox);
const ctx=FLEXBOX.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h,t=FLEXBOX.t++;
ctx.clearRect(0,0,W,H);
rr(ctx,0,0,W,H,0,'#0d0b1e');
const colors=['#60a5fa','#a78bfa','#34d399','#fbbf24','#f87171'];
const labels=['1','2','3','4','5'];
const mode=FLEXBOX.mode;
hBox(ctx,20,30,W-40,H-60,10,'#14112a','#4a90d9',1.5);
hTxt(ctx,'display: flex | '+({row:'flex-direction: row',column:'flex-direction: column',space:'justify-content: space-between',center:'justify-content: center align-items: center'}[mode]||''),W/2,44,9,'#4a90d9','center',500);
const n=5;
const itemW=mode==='column'?W-80:54;
const itemH=mode==='column'?28:H-90;
const gap=10;
let items=[];
if(mode==='row'){
const totalW=n*itemW+(n-1)*gap;
const startX=(W-totalW)/2;
items=labels.map((_,i)=>({x:startX+i*(itemW+gap),y:56,w:itemW,h:itemH}));
} else if(mode==='column'){
const totalH=n*itemH+(n-1)*gap;
const startY=60+(H-60-totalH)/2;
items=labels.map((_,i)=>({x:(W-itemW)/2,y:startY+i*(itemH+gap),w:itemW,h:itemH}));
} else if(mode==='space'){
const avail=W-80-(n*itemW);
const sp=avail/(n-1);
items=labels.map((_,i)=>({x:40+i*(itemW+sp),y:56,w:itemW,h:itemH}));
} else if(mode==='center'){
const w2=44,h2=H-90;
const totalW=n*w2+(n-1)*gap;
const cx2=(W-totalW)/2;
items=labels.map((_,i)=>({x:cx2+i*(w2+gap),y:56,w:w2,h:h2}));
}
items.forEach((item,i)=>{
const glow=0.5+0.5*Math.sin(t*0.05+i*0.8);
ctx.globalAlpha=0.15*glow;
hBox(ctx,item.x-3,item.y-3,item.w+6,item.h+6,9,colors[i]);
ctx.globalAlpha=1;
hBox(ctx,item.x,item.y,item.w,item.h,8,colors[i]+'33',colors[i],1.8);
hTxt(ctx,labels[i],item.x+item.w/2,item.y+item.h/2,13,colors[i],'center',700);
});
if(mode==='row'||mode==='space'||mode==='center'){
ctx.beginPath();ctx.moveTo(24,H-22);ctx.lineTo(W-24,H-22);
ctx.strokeStyle='#4a90d944';ctx.lineWidth=1.5;ctx.stroke();
hTxt(ctx,'main axis →',W/2,H-14,9,'#4a90d966','center',500);
}
}
const GRID_CVS={ctx:null,t:0,raf:null,mode:'basic'};

function initGrid(){
const ctx=setupCvs('cvs-grid');if(!ctx)return;
GRID_CVS.ctx=ctx;GRID_CVS.t=0;
cancelAnimationFrame(GRID_CVS.raf);
animGrid();
}

function gridMode(mode,btn){
GRID_CVS.mode=mode;GRID_CVS.t=0;
document.querySelectorAll('#hca-grid .cbtn').forEach(b=>b.classList.remove('active'));
if(btn)btn.classList.add('active');
if(!GRID_CVS.ctx)initGrid();
}

function animGrid(){
GRID_CVS.raf=requestAnimationFrame(animGrid);
const ctx=GRID_CVS.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h,t=GRID_CVS.t++;
ctx.clearRect(0,0,W,H);
rr(ctx,0,0,W,H,0,'#0d0b1e');
const mode=GRID_CVS.mode;
const pad=18,gap=6;
const highlight=Math.floor((t*0.025)%9);
if(mode==='basic'){
const cols=3,rows=3;
const cellW=(W-pad*2-(cols-1)*gap)/cols;
const cellH=(H-pad*2-30-(rows-1)*gap)/rows;
const colors2=['#60a5fa','#a78bfa','#34d399','#fbbf24','#f87171','#fb923c','#e879f9','#38bdf8','#4ade80'];
hTxt(ctx,'grid-template-columns: repeat(3, 1fr)',W/2,14,9.5,'#4a90d9','center',500);
for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
const idx=r*cols+c;
const x=pad+c*(cellW+gap),y=pad+24+r*(cellH+gap);
const active=idx===highlight;
if(active){ctx.globalAlpha=0.2;hBox(ctx,x-3,y-3,cellW+6,cellH+6,10,colors2[idx]);ctx.globalAlpha=1;}
hBox(ctx,x,y,cellW,cellH,9,colors2[idx]+'22',colors2[idx],active?2.5:1.5);
hTxt(ctx,`item ${idx+1}`,x+cellW/2,y+cellH/2,10,colors2[idx],'center',600);
}
} else if(mode==='layout'){
const areas=[
{label:'header', x:pad, y:pad+24, w:W-pad*2, h:32, c:'#60a5fa'},
{label:'sidebar', x:pad, y:pad+24+38, w:80, h:H-pad*2-24-38-38,c:'#a78bfa'},
{label:'main', x:pad+86, y:pad+24+38, w:W-pad*2-86,h:H-pad*2-24-38-38,c:'#34d399'},
{label:'footer', x:pad, y:H-pad-32, w:W-pad*2, h:32, c:'#fbbf24'},
];
hTxt(ctx,'grid-template-areas: classic page layout',W/2,14,9.5,'#4a90d9','center',500);
areas.forEach((a,i)=>{
const active=i===Math.floor((t*0.025)%4);
if(active){ctx.globalAlpha=0.2;hBox(ctx,a.x-2,a.y-2,a.w+4,a.h+4,8,a.c);ctx.globalAlpha=1;}
hBox(ctx,a.x,a.y,a.w,a.h,8,a.c+'22',a.c,active?2.5:1.5);
hTxt(ctx,`"${a.label}"`,a.x+a.w/2,a.y+a.h/2,a.h>28?11:9,a.c,'center',600);
});
} else {
const cells=[
{label:'hero', c:1,r:1,cs:3,rs:1,color:'#60a5fa'},
{label:'sidebar', c:1,r:2,cs:1,rs:2,color:'#a78bfa'},
{label:'card A', c:2,r:2,cs:1,rs:1,color:'#34d399'},
{label:'card B', c:3,r:2,cs:1,rs:1,color:'#fbbf24'},
{label:'main', c:2,r:3,cs:2,rs:1,color:'#f87171'},
{label:'footer', c:1,r:4,cs:3,rs:1,color:'#fb923c'},
];
const cw=(W-pad*2-gap*2)/3,rh=(H-pad*2-30-gap*3)/4;
hTxt(ctx,'grid-column / grid-row spanning',W/2,14,9.5,'#4a90d9','center',500);
const act=Math.floor((t*0.02)%cells.length);
cells.forEach((cell,i)=>{
const x=pad+(cell.c-1)*(cw+gap),y=pad+24+(cell.r-1)*(rh+gap);
const w=cell.cs*cw+(cell.cs-1)*gap,h=cell.rs*rh+(cell.rs-1)*gap;
const active=i===act;
if(active){ctx.globalAlpha=0.2;hBox(ctx,x-2,y-2,w+4,h+4,8,cell.color);ctx.globalAlpha=1;}
hBox(ctx,x,y,w,h,8,cell.color+'22',cell.color,active?2.5:1.5);
hTxt(ctx,cell.label,x+w/2,y+h/2,10,cell.color,'center',600);
});
}
}
const PREPROCESSORS={ctx:null,t:0,raf:null};

function initPreprocessors(){
const ctx=setupCvs('cvs-preprocessors');if(!ctx)return;
PREPROCESSORS.ctx=ctx;PREPROCESSORS.t=0;
cancelAnimationFrame(PREPROCESSORS.raf);
animPreprocessors();
}

function animPreprocessors(){
PREPROCESSORS.raf=requestAnimationFrame(animPreprocessors);
const ctx=PREPROCESSORS.ctx;if(!ctx)return;
const W=ctx._w,H=ctx._h,t=PREPROCESSORS.t++;
ctx.clearRect(0,0,W,H);
rr(ctx,0,0,W,H,0,'#0d0b1e');
const cycle=200,phase=(t%cycle)/cycle;
const step=Math.floor(phase*4),sp=(phase*4)%1;
hTxt(ctx,'CSS Preprocessor — Compilation Pipeline',W/2,16,11,'#9d8df5','center',700);
const stages=[
{x:W*0.12,label:'SCSS', sub:'.scss source', c:'#f9a8d4', bg:'#1e0814', icon:'💅'},
{x:W*0.12,label:'LESS', sub:'.less source', c:'#fde68a', bg:'#1e1800', icon:'🔷',y2:true},
{x:W*0.42,label:'Compiler',sub:'sass/less-cli', c:'#9d8df5', bg:'#16132a', icon:'⚙️'},
{x:W*0.72,label:'CSS', sub:'styles.css', c:'#60a5fa', bg:'#001428', icon:'🎨'},
{x:W*0.92,label:'Browser', sub:'renders UI', c:'#34d399', bg:'#002814', icon:'🌐'},
];
const bw=80,bh=44,cy=H/2+4;
const s0=stages[0];
hBox(ctx,s0.x-bw/2,cy-bh-10,bw,bh,10,s0.bg,s0.c,1.8);
hTxt(ctx,s0.icon+' '+s0.label,s0.x,cy-bh/2-10,11,s0.c,'center',700);
hTxt(ctx,s0.sub,s0.x,cy-bh/2-10+14,9,'#5a5880','center',400);
const s1=stages[1];
hBox(ctx,s1.x-bw/2,cy+10,bw,bh,10,s1.bg,s1.c,1.8);
hTxt(ctx,s1.icon+' '+s1.label,s1.x,cy+10+bh/2-7,11,s1.c,'center',700);
hTxt(ctx,s1.sub,s1.x,cy+10+bh/2+7,9,'#5a5880','center',400);
const comp=stages[2];
const arrowP1=step>=1?1:step===0?sp:0;
const arrowP2=step>=1?1:step===0?sp*0.8:0;
ctx.beginPath();ctx.moveTo(s0.x+bw/2,cy-bh/2-10);ctx.lineTo(comp.x-bw/2,cy);
ctx.strokeStyle=s0.c+'44';ctx.lineWidth=1.5;ctx.stroke();
ctx.beginPath();ctx.moveTo(s1.x+bw/2,cy+10+bh/2);ctx.lineTo(comp.x-bw/2,cy);
ctx.strokeStyle=s1.c+'44';ctx.lineWidth=1.5;ctx.stroke();
if(arrowP1>0){
const px=s0.x+bw/2+(comp.x-bw/2-s0.x-bw/2)*arrowP1;
const py=cy-bh/2-10+(cy-(cy-bh/2-10))*arrowP1;
ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);
ctx.fillStyle=s0.c;ctx.globalAlpha=0.9;ctx.fill();ctx.globalAlpha=1;
}
if(arrowP2>0){
const px=s1.x+bw/2+(comp.x-bw/2-s1.x-bw/2)*arrowP2;
const py=cy+10+bh/2+(cy-(cy+10+bh/2))*arrowP2;
ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);
ctx.fillStyle=s1.c;ctx.globalAlpha=0.9;ctx.fill();ctx.globalAlpha=1;
}
const spin=t*0.07;
const compActive=step===1||step===2;
hBox(ctx,comp.x-bw/2,cy-bh/2,bw,bh,10,compActive?'#1e1060':comp.bg,comp.c,compActive?2.5:1.5);
hTxt(ctx,comp.label,comp.x,cy-7,11,comp.c,'center',700);
hTxt(ctx,comp.sub,comp.x,cy+9,9,'#5a5880','center',400);
if(compActive){
ctx.beginPath();ctx.arc(comp.x,cy,bh/2+8,spin,spin+Math.PI*1.5);
ctx.strokeStyle=comp.c+'66';ctx.lineWidth=1.5;ctx.lineCap='round';ctx.stroke();
}
[stages[3],stages[4]].forEach((st,i)=>{
const idx=i+3;
const active=step>=idx;
const animP=step>idx?1:step===idx?sp:0;
if(active||animP>0){
hBox(ctx,st.x-bw/2,cy-bh/2,bw,bh,10,active?st.bg+'aa':st.bg,st.c,active?2:1);
hTxt(ctx,st.icon+' '+st.label,st.x,cy-7,11,active?st.c:st.c+'66','center',700);
hTxt(ctx,st.sub,st.x,cy+9,9,'#5a5880','center',400);
}
const prev=idx===3?comp:stages[3];
const ap=step>idx?1:step===idx?sp:0;
if(ap>0){
ctx.beginPath();ctx.moveTo(prev.x+bw/2,cy);ctx.lineTo(st.x-bw/2,cy);
ctx.strokeStyle=st.c+'66';ctx.lineWidth=1.5;ctx.setLineDash([]);ctx.stroke();
const px=prev.x+bw/2+(st.x-bw/2-prev.x-bw/2)*ap;
ctx.beginPath();ctx.arc(px,cy,5,0,Math.PI*2);
ctx.fillStyle=st.c;ctx.fill();
}
});
const msgs=['SCSS & LESS source loaded','Compiling…','Generating CSS…','Output ready','Rendering in browser ✓'];
hBox(ctx,W/2-120,H-26,240,20,10,'#1a1838','#2a2458',1);
hTxt(ctx,msgs[Math.min(step,4)],W/2,H-16,9.5,'#9d8df5','center',500);
}
(function () {
let INDEX = null;

function buildIndex() {
if (INDEX) return;
INDEX = [];
Object.entries(TAB_NAMES).forEach(([tabKey, tabLabel]) => {
INDEX.push({ type: 'module', tabKey, sectionId: null, title: tabLabel, module: tabLabel });
});
Object.entries(SIDEBAR_DATA).forEach(([tabKey, sections]) => {
const mod = TAB_NAMES[tabKey] || tabKey;
(sections || []).forEach(({ label, id }) => {
INDEX.push({ type: 'section', tabKey, sectionId: id, title: label, module: mod });
});
});
}
let results = [];
let activeIdx = -1;
let blurTimer = null;

function esc(s) {
return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function highlight(text, q) {
const lo = text.toLowerCase(), ql = q.toLowerCase();
const i = lo.indexOf(ql);
if (i < 0) return esc(text);
return esc(text.slice(0, i)) +
'<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' +
esc(text.slice(i + q.length));
}

function score(item, ql) {
const t = item.title.toLowerCase();

const k = (item.title + ' ' + item.module).toLowerCase();
if (t === ql) return 100;
if (t.startsWith(ql)) return 80;
if (t.includes(ql)) return 60;
if (k.includes(ql)) return 30;
return 0;
}

function positionDropdown() {
const wrap = document.getElementById('search-wrap');
const drop = document.getElementById('search-dropdown');
if (!wrap || !drop) return;
const r = wrap.getBoundingClientRect();
drop.style.left = r.left + 'px';
drop.style.top = (r.bottom + 8) + 'px';
drop.style.width = Math.max(r.width, 340) + 'px';
}

function render(q) {
const ql = q.toLowerCase();
const drop = document.getElementById('search-dropdown');
results = INDEX
.map(item => ({ ...item, _score: score(item, ql) }))
.filter(i => i._score > 0)
.sort((a, b) => b._score - a._score)
.slice(0, 14);
activeIdx = -1;
positionDropdown();
if (!results.length) {
drop.innerHTML = `
<div class="search-empty">
<div class="search-empty-icon">🔍</div>
<div class="search-empty-title">No results for "${esc(q)}"</div>
<div class="search-empty-sub">Try a shorter keyword or browse using the nav</div>
</div>`;
openDropdown();
return;
}
const groups = new Map();
results.forEach(item => {
const grp = item.type === 'module' ? '__modules__' : item.module;
if (!groups.has(grp)) groups.set(grp, []);
groups.get(grp).push(item);
});
let html = '<div class="search-dropdown-inner">';
groups.forEach((items, grp) => {
const grpLabel = grp === '__modules__' ? 'Modules' : grp;
html += `<div class="search-group-label">${esc(grpLabel)}</div>`;
items.forEach(item => {
const globalIdx = results.indexOf(item);
const isMod = item.type === 'module';
const rawIcon = LABEL_ICONS[item.tabKey] || '';
const iconHtml = rawIcon
? `<span class="search-result-icon">${rawIcon}</span>`
: `<span class="search-result-icon"><svg viewBox="0 0 16 16" width="12" height="12" fill="none"><rect x="2" y="2" width="12" height="12" rx="3" stroke="var(--p400)" stroke-width="1.5"/></svg></span>`;
const badge = isMod
? `<span class="search-type-badge mod">Module</span>`
: `<span class="search-type-badge sec">Section</span>`;
html += `
<button
class="search-result-item"
data-idx="${globalIdx}"
role="option"
aria-selected="false"
onmousedown="handleSearchSelect(${globalIdx})"
onmouseenter="setSearchActive(${globalIdx})"
>
${iconHtml}
<span class="search-result-text">
<span class="search-result-title">${highlight(item.title, q)}</span>
<span class="search-result-module">${isMod ? 'Go to module' : esc(item.module)}</span>
</span>
${badge}
<svg class="search-result-arrow" viewBox="0 0 16 16" width="11" height="11" fill="none">
<path d="M5.5 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>`;
});
});
html += '</div>';
html += `
<div class="search-footer">
<span class="search-footer-hint"><kbd>↑↓</kbd> navigate</span>
<span class="search-footer-hint"><kbd>↵</kbd> open</span>
<span class="search-footer-hint"><kbd>Esc</kbd> close</span>
</div>`;
drop.innerHTML = html;
openDropdown();
}
window.handleSearchInput = function (input) {
buildIndex();
const q = input.value.trim();
document.getElementById('search-clear').classList.toggle('visible', q.length > 0);
if (q.length < 3) { closeDropdown(); return; }
render(q);
};
window.handleSearchSelect = function (idx) {
const item = results[idx];
if (!item) return;
switchMain(item.tabKey);
if (item.sectionId) {
setTimeout(() => {
const el = document.getElementById(item.sectionId);
if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
document.querySelectorAll('.sidebar-item').forEach(b =>
b.classList.toggle('active', (b.getAttribute('onclick') || '').includes(`'${item.sectionId}'`))
);
}, 200);
}
const input = document.getElementById('global-search');
input.value = '';
document.getElementById('search-clear').classList.remove('visible');
closeDropdown();
input.blur();
};
window.handleSearchKeydown = function (e) {
const n = results.length;
if (e.key === 'ArrowDown') { e.preventDefault(); setSearchActive((activeIdx + 1) % n || 0); }
else if (e.key === 'ArrowUp') { e.preventDefault(); setSearchActive((activeIdx - 1 + n) % n); }
else if (e.key === 'Enter') { e.preventDefault(); if (activeIdx >= 0) handleSearchSelect(activeIdx); else if (n) handleSearchSelect(0); }
else if (e.key === 'Escape') { clearSearch(); }
};
window.setSearchActive = function (idx) {
activeIdx = idx;
document.querySelectorAll('.search-result-item').forEach(btn => {
const on = parseInt(btn.dataset.idx) === idx;
btn.classList.toggle('active-result', on);
btn.setAttribute('aria-selected', on);
});
const active = document.querySelector('.search-result-item.active-result');
if (active) active.scrollIntoView({ block: 'nearest' });
};
window.handleSearchFocus = function () {
clearTimeout(blurTimer);
positionDropdown();

const q = (document.getElementById('global-search').value || '').trim();
if (q.length >= 3) openDropdown();
};
window.handleSearchBlur = function () {
blurTimer = setTimeout(closeDropdown, 220);
};
window.clearSearch = function () {
const input = document.getElementById('global-search');
if (input) { input.value = ''; input.focus(); }
document.getElementById('search-clear').classList.remove('visible');
closeDropdown();
};

function openDropdown() { positionDropdown(); document.getElementById('search-dropdown').classList.add('open'); }

function closeDropdown() { document.getElementById('search-dropdown').classList.remove('open'); activeIdx = -1; }
window.addEventListener('scroll', () => { if (document.getElementById('search-dropdown').classList.contains('open')) positionDropdown(); }, true);
window.addEventListener('resize', () => { if (document.getElementById('search-dropdown').classList.contains('open')) positionDropdown(); });
document.addEventListener('mousedown', function (e) {
const wrap = document.getElementById('search-wrap');
const drop = document.getElementById('search-dropdown');
if (wrap && !wrap.contains(e.target) && drop && !drop.contains(e.target)) closeDropdown();
});
document.addEventListener('keydown', function (e) {
if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
e.preventDefault();
const input = document.getElementById('global-search');
if (input) { input.focus(); input.select(); }
}
});
})();
(function(){
const map={
'cvs-boxmodel': initBoxModel,
'cvs-flexbox': initFlexbox,
'cvs-grid': initGrid,
'cvs-preprocessors': initPreprocessors,
};
const obs=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){const fn=map[e.target.id];if(fn)setTimeout(fn,80);}
});
},{threshold:0.15});
Object.keys(map).forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
})();
(function(){
const cicdCanvasMap={
'cvs-docker': ()=>initDockerAnim(), 'cvs-k8s': ()=>initK8sAnim(), 'cvs-kafka': ()=>initKafkaAnim(), 'cvs-vercel': ()=>initVercelAnim(), 'cvs-cicd-pipeline':()=>initCicdPipeline(),
};
const obs=new IntersectionObserver((entries)=>{
entries.forEach(e=>{
if(e.isIntersecting){
const fn=cicdCanvasMap[e.target.id];
if(fn)setTimeout(fn,60);
}
});
},{threshold:0.1});
Object.keys(cicdCanvasMap).forEach(id=>{
const el=document.getElementById(id);
if(el)obs.observe(el);
});
})();
let SDLC={ctx:null,raf:null,t:0,mode:'waterfall'};
let ARCH={ctx:null,raf:null,t:0,mode:'overview'};

function sdlcMode(m,btn){
SDLC.mode=m; SDLC.t=0;
document.querySelectorAll('#panel-sdlc .canvas-controls .cbtn').forEach(b=>b.classList.remove('on'));
if(btn)btn.classList.add('on');
if(!SDLC.ctx)initSdlcAnim(); else{cancelAnimationFrame(SDLC.raf);animSdlc();}
}

function archMode(m,btn){
ARCH.mode=m; ARCH.t=0;
document.querySelectorAll('#cvs-architect~.canvas-controls .cbtn').forEach(b=>b.classList.remove('on'));
if(btn)btn.classList.add('on');
if(!ARCH.ctx)initArchitectAnim(); else{cancelAnimationFrame(ARCH.raf);animArch();}
}

function initSdlcAnim(){
const ctx=setupCvs('cvs-sdlc'); if(!ctx)return;
SDLC.ctx=ctx; SDLC.t=0; cancelAnimationFrame(SDLC.raf); animSdlc();
}

function initArchitectAnim(){
const ctx=setupCvs('cvs-architect'); if(!ctx)return;
ARCH.ctx=ctx; ARCH.t=0; cancelAnimationFrame(ARCH.raf); animArch();
}

function animSdlc(){
SDLC.raf=requestAnimationFrame(animSdlc);
const ctx=SDLC.ctx; if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H); rr(ctx,0,0,W,H,0,'#0d0b1e');
SDLC.t++;
if(SDLC.mode==='agile') drawSdlcAgile(ctx,W,H);
else if(SDLC.mode==='devops') drawSdlcDevOps(ctx,W,H);
else drawSdlcWaterfall(ctx,W,H);
}

function drawSdlcWaterfall(ctx,W,H){
const t=SDLC.t;
const phases=[
{label:'Planning', sub:'Scope · Budget · Risk', icon:'📋',c:'#f59e0b'},
{label:'Requirements', sub:'User Stories · BDD', icon:'📝',c:'#8b7ae8'},
{label:'Design', sub:'HLD · LLD · API · DB', icon:'✏️', c:'#60a5fa'},
{label:'Coding', sub:'TDD · PR · CI', icon:'💻',c:'#34d399'},
{label:'Testing', sub:'Unit · Integration · UAT', icon:'🧪',c:'#06b6d4'},
{label:'Deployment', sub:'Staging → Production', icon:'🚀',c:'#f97316'},
{label:'Maintenance', sub:'Monitor · Patch · Evolve', icon:'🔧',c:'#a78bfa'},
];
const n=phases.length;
const cycle=420, ph=(t%cycle)/cycle;
const actIdx=Math.floor(ph*n), sp=(ph*n)%1;
txt(ctx,'💧 Waterfall — Sequential Phase-by-Phase Flow',W/2,18,12,'#9d8df5','center',700);
const boxW=Math.floor((W-60)/n)-4, boxH=52;
const stepDown=12;
const baseY=38;
phases.forEach((p,i)=>{
const x=30+i*(boxW+4);
const y=baseY+i*stepDown;
const active=i===actIdx, done=i<actIdx;
if(active){ glow(ctx,x+boxW/2,y+boxH/2,40,p.c); }
rr(ctx,x,y,boxW,boxH,9,active?p.c+'30':done?p.c+'18':'#16132a',active?p.c:done?p.c+'99':'#2a2458',active?2.5:1.2);
if(active){ rr(ctx,x+2,y+boxH-Math.floor((boxH-4)*sp),boxW-4,Math.floor((boxH-4)*sp),7,p.c+'33'); }
txt(ctx,p.icon, x+14, y+boxH/2-7, active?18:15, '#fff','left');
txt(ctx,p.label, x+34, y+boxH/2-7, active?12:11, active?p.c:'#c4b8f0','left',700);
txt(ctx,p.sub, x+34, y+boxH/2+8, 9, active?p.c+'cc':'#5a5880','left',400);
if(done){
ctx.beginPath();ctx.arc(x+boxW-12,y+12,9,0,Math.PI*2);ctx.fillStyle='#34d399';ctx.fill();
txt(ctx,'✓',x+boxW-12,y+12,9,'#fff','center',700);
}
if(i<n-1){
const nx=x+boxW, ny=y+boxH/2;
const nx2=x+boxW+4, ny2=baseY+(i+1)*stepDown+boxH/2;
ctx.beginPath();ctx.moveTo(nx,ny);ctx.lineTo(nx+2,ny);ctx.lineTo(nx2,ny2);
ctx.strokeStyle=done?p.c+'88':'#2a2458';ctx.lineWidth=1.5;ctx.setLineDash([3,3]);ctx.stroke();ctx.setLineDash([]);
if(active){
const pf=sp;
const px=nx+(nx2-nx)*pf, py=ny+(ny2-ny)*pf;
glow(ctx,px,py,7,p.c);
ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fillStyle=p.c;ctx.fill();
}
}
});
const barY=baseY+(n-1)*stepDown+boxH+10;
rr(ctx,30,barY,W-60,22,6,'#16132a','#2a2458',1);
const progressW=Math.floor((W-66)*(actIdx/n+(sp/n)));
rr(ctx,33,barY+3,progressW,16,4,phases[Math.min(actIdx,n-1)].c+'88');
txt(ctx,actIdx<n?`▶ Phase ${actIdx+1} of ${n}: ${phases[actIdx].label} — ${phases[actIdx].sub}`:'✅ All phases complete',W/2,barY+11,9.5,'#e8e4ff','center',600);
}

function drawSdlcAgile(ctx,W,H){
const t=SDLC.t;
txt(ctx,'🔄 Agile/Scrum — Iterative Sprint Cycle',W/2,18,12,'#34d399','center',700);
const cx=W/2, cy=H/2+10;
const ringR=Math.min(W,H)*0.33;
ctx.beginPath(); ctx.arc(cx,cy,ringR,0,Math.PI*2);
ctx.strokeStyle='rgba(52,211,153,0.15)'; ctx.lineWidth=32; ctx.stroke();
ctx.beginPath(); ctx.arc(cx,cy,ringR,0,Math.PI*2);
ctx.strokeStyle='rgba(52,211,153,0.25)'; ctx.lineWidth=2; ctx.stroke();
const sprints=[
{label:'Sprint\nPlanning', sub:'Goals · Backlog Refinement', icon:'📋',c:'#f59e0b'},
{label:'Development', sub:'Code · Review · CI/CD', icon:'💻',c:'#34d399'},
{label:'Testing &\nReview',sub:'QA · Demo · Feedback', icon:'🧪',c:'#06b6d4'},
{label:'Retrospective', sub:'What worked? Improve', icon:'♻️', c:'#a78bfa'},
];

const totalPh = ((t*0.007)%1);
const packetAngle = totalPh * Math.PI * 2 - Math.PI/2;
const pkX = cx + Math.cos(packetAngle)*ringR;
const pkY = cy + Math.sin(packetAngle)*ringR;
glow(ctx,pkX,pkY,14,'#34d399');
ctx.beginPath();ctx.arc(pkX,pkY,6,0,Math.PI*2);ctx.fillStyle='#34d399';ctx.fill();
const progressAngle = totalPh * Math.PI * 2;
ctx.beginPath(); ctx.arc(cx,cy,ringR,-Math.PI/2,-Math.PI/2+progressAngle);
ctx.strokeStyle='rgba(52,211,153,0.5)'; ctx.lineWidth=4; ctx.stroke();
sprints.forEach((s,i)=>{
const angle=(i/sprints.length)*Math.PI*2 - Math.PI/2;
const sx=cx+Math.cos(angle)*ringR, sy=cy+Math.sin(angle)*ringR;
const diff=Math.abs(((totalPh - i/sprints.length + 1)%1));
const active=diff<0.14||diff>0.86;
if(active)glow(ctx,sx,sy,30,s.c);
ctx.beginPath(); ctx.arc(sx,sy,16,0,Math.PI*2);
ctx.fillStyle=active?s.c:'#1a1540';
ctx.strokeStyle=s.c; ctx.lineWidth=2; ctx.fill(); ctx.stroke();
txt(ctx,s.icon,sx,sy,active?14:12,'#fff','center');
const lx=cx+Math.cos(angle)*(ringR+36), ly=cy+Math.sin(angle)*(ringR+36);
txt(ctx,s.label.split('\n')[0],lx,ly-5,10,active?s.c:'#9d8df5','center',active?700:500);
txt(ctx,s.sub,lx,ly+8,8.5,active?s.c+'bb':'#5a5880','center',400);
});
glow(ctx,cx,cy,36,'#8b7ae8');
ctx.beginPath(); ctx.arc(cx,cy,30,0,Math.PI*2);
ctx.fillStyle='#1a1040'; ctx.strokeStyle='#8b7ae8'; ctx.lineWidth=2; ctx.fill(); ctx.stroke();
txt(ctx,'📦',cx,cy-8,16,'#fff','center');
txt(ctx,'Backlog',cx,cy+8,9,'#8b7ae8','center',600);
const sprintNum = Math.floor(t*0.007/(1)) % 10 + 1;
rr(ctx,W/2-90,H-28,180,20,6,'#16132a','#34d39955',1);
txt(ctx,`Sprint ${sprintNum} · Velocity: ${20+Math.floor(Math.sin(t*0.02+1)*8)} pts`,W/2,H-18,9.5,'#34d399','center',600);
}

function drawSdlcDevOps(ctx,W,H){
const t=SDLC.t;
txt(ctx,'♾️ DevOps Infinity Loop — Continuous Delivery',W/2,18,12,'#38bdf8','center',700);
const cx=W/2, cy=H/2+10;
const rx=Math.min(W*0.31,148), ry=Math.min(H*0.26,78);
const lcx=cx-rx*0.55, rcx=cx+rx*0.55;
const drawLoop=(ox,fillCol,strokeCol,flip)=>{
ctx.beginPath();
for(let i=0;i<=180;i++){
const a=(i/180)*Math.PI*2;
ctx.lineTo(ox+Math.cos(a)*rx*0.5, cy+Math.sin(flip?-a:a)*ry*0.52);
}
ctx.closePath();
ctx.fillStyle=fillCol; ctx.fill();
ctx.strokeStyle=strokeCol; ctx.lineWidth=2; ctx.stroke();
};
drawLoop(lcx,'rgba(139,122,232,0.18)','#8b7ae844',false);
drawLoop(rcx,'rgba(56,189,248,0.18)','#38bdf844',true);
txt(ctx,'DEV',lcx,cy+ry*0.52+18,9.5,'#8b7ae888','center',600);
txt(ctx,'OPS',rcx,cy+ry*0.52+18,9.5,'#38bdf888','center',600);
const nodes=[
{side:0,a:-Math.PI*0.5, label:'Plan', sub:'Jira · Stories', icon:'📋',c:'#f59e0b'},
{side:0,a: Math.PI*0.2, label:'Code', sub:'Git · PR Review', icon:'💻',c:'#8b7ae8'},
{side:0,a: Math.PI*0.8, label:'Build', sub:'Webpack · Docker', icon:'🔨',c:'#34d399'},
{side:1,a: Math.PI*0.8, label:'Test', sub:'Jest · Playwright', icon:'🧪',c:'#06b6d4'},
{side:1,a:-Math.PI*0.5, label:'Release', sub:'Tag · Changelog', icon:'📦',c:'#f97316'},
{side:1,a:-Math.PI*0.2, label:'Deploy', sub:'K8s · Canary', icon:'🚀',c:'#f97316'},
{side:0,a: Math.PI*0.5, label:'Operate', sub:'SLOs · Alerts', icon:'⚙️', c:'#a78bfa'},
{side:1,a: Math.PI*0.2, label:'Monitor', sub:'Grafana · APM', icon:'📊',c:'#60a5fa'},
];
const getPos=n=>({
x:(n.side?rcx:lcx)+Math.cos(n.a)*rx*0.5,
y:cy+Math.sin(n.side?-n.a:n.a)*ry*0.52
});
for(let i=0;i<nodes.length;i++){
const a=getPos(nodes[i]), b=getPos(nodes[(i+1)%nodes.length]);
ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
ctx.strokeStyle='rgba(255,255,255,0.06)'; ctx.lineWidth=1; ctx.setLineDash([3,5]); ctx.stroke(); ctx.setLineDash([]);
}
const speed=0.009;
const pkPos=((t*speed)%1)*nodes.length;
const pkI=Math.floor(pkPos), pkF=pkPos-pkI;
const p1=getPos(nodes[pkI]), p2=getPos(nodes[(pkI+1)%nodes.length]);
const pkX=p1.x+(p2.x-p1.x)*pkF, pkY=p1.y+(p2.y-p1.y)*pkF;
for(let t2=1;t2<=4;t2++){
const trail=Math.max(0,pkPos-t2*0.08);
const ti=Math.floor(trail)%nodes.length, tf=trail-Math.floor(trail);
const tp1=getPos(nodes[ti]), tp2=getPos(nodes[(ti+1)%nodes.length]);
const tx=tp1.x+(tp2.x-tp1.x)*tf, ty=tp1.y+(tp2.y-tp1.y)*tf;
ctx.beginPath(); ctx.arc(tx,ty,3-t2*0.5,0,Math.PI*2);
ctx.fillStyle=`rgba(255,255,255,${0.3-t2*0.06})`; ctx.fill();
}
glow(ctx,pkX,pkY,16,'#fff');
ctx.beginPath(); ctx.arc(pkX,pkY,6,0,Math.PI*2); ctx.fillStyle='#fff'; ctx.fill();
nodes.forEach((n,i)=>{
const {x:nx,y:ny}=getPos(n);
const act=pkI===i;
if(act)glow(ctx,nx,ny,26,n.c);
ctx.beginPath(); ctx.arc(nx,ny,13,0,Math.PI*2);
ctx.fillStyle=act?n.c:'#1a1540'; ctx.strokeStyle=n.c+'cc'; ctx.lineWidth=1.8; ctx.fill(); ctx.stroke();
txt(ctx,n.icon,nx,ny,act?13:11,'#fff','center');
const outX=cx+(nx-cx)*1, outY=cy+(ny-cy)*1;
const lx=nx+(outX-cx)*0.18, ly=ny+(outY-cy)*0.18;
const dx=nx-cx, dy=ny-cy, dist=Math.sqrt(dx*dx+dy*dy);
const labX=nx+dx/dist*22, labY=ny+dy/dist*22;
txt(ctx,n.label,labX,labY-4,act?10.5:9.5,act?n.c:'#9d8df5','center',act?700:500);
txt(ctx,n.sub,labX,labY+7,8,act?n.c+'cc':'#5a5880','center',400);
});
rr(ctx,cx-24,cy-12,48,24,7,'#0d0b1e','#38bdf8',2);
txt(ctx,'♾ CI/CD',cx,cy,9.5,'#38bdf8','center',700);
const activeNode=nodes[pkI];
rr(ctx,W/2-110,H-28,220,20,6,'#16132a',activeNode.c+'55',1);
txt(ctx,`▶ ${activeNode.label}: ${activeNode.sub}`,W/2,H-18,9.5,activeNode.c,'center',600);
}

function animArch(){
ARCH.raf=requestAnimationFrame(animArch);
const ctx=ARCH.ctx; if(!ctx)return;
const W=ctx._w,H=ctx._h;
ctx.clearRect(0,0,W,H); rr(ctx,0,0,W,H,0,'#0d0b1e');
ARCH.t++;
if(ARCH.mode==='planning') drawArchPlanning(ctx,W,H);
else if(ARCH.mode==='design') drawArchDesign(ctx,W,H);
else if(ARCH.mode==='production')drawArchProd(ctx,W,H);
else drawArchOverview(ctx,W,H);
}

function drawArchOverview(ctx,W,H){
const t=ARCH.t;
txt(ctx,'Software Architect — Full Journey',W/2,16,11,'#f59e0b','center',700);
const layers=[
{label:'Business Requirements',items:['Stakeholders','Budget','Timeline','Constraints'],c:'#f59e0b',icon:'💼'},
{label:'Architecture Design', items:['HLD / LLD','ADRs','API Contracts','DB Schema'], c:'#8b7ae8',icon:'🏛️'},
{label:'Implementation', items:['Code Review','Tech Guidance','PoC','Patterns'], c:'#34d399',icon:'💻'},
{label:'Production & Ops', items:['SLOs','Scaling','Incidents','Evolution'], c:'#60a5fa',icon:'🚀'},
];
const lw=W-40,lh=40,gap=14;
const totalH=layers.length*(lh+gap);
const startY=(H-totalH)/2+4;
const actIdx=Math.floor((t*0.006)%layers.length);
layers.forEach((l,i)=>{
const ly=startY+i*(lh+gap);
const active=i===actIdx;
if(active)glow(ctx,W/2,ly+lh/2,60,l.c);
rr(ctx,20,ly,lw,lh,9,active?l.c+'22':'#16132a',active?l.c:'#2a2458',active?2:1);
txt(ctx,l.icon+' '+l.label,64,ly+lh/2,11,active?l.c:'#9d8df5','left',700);
const iw=(lw-180)/l.items.length;
l.items.forEach((item,j)=>{
const ix=180+j*iw+iw/2;
rr(ctx,180+j*iw+2,ly+6,iw-4,lh-12,5,l.c+'18',l.c+'44',1);
txt(ctx,item,ix,ly+lh/2,9,active?l.c:'#5a5880','center',active?600:400);
});
if(i<layers.length-1){
const ay=ly+lh+4;
ctx.beginPath();ctx.moveTo(W/2,ay);ctx.lineTo(W/2,ay+gap-2);
ctx.strokeStyle=active?l.c+'88':'#2a2458';ctx.lineWidth=2;ctx.stroke();
ctx.beginPath();ctx.moveTo(W/2-5,ay+gap-6);ctx.lineTo(W/2,ay+gap);ctx.lineTo(W/2+5,ay+gap-6);
ctx.strokeStyle=active?l.c:'#2a2458';ctx.lineWidth=1.5;ctx.stroke();
}
});
}

function drawArchPlanning(ctx,W,H){
const t=ARCH.t;
txt(ctx,'Planning — From Stakeholders to ADRs',W/2,16,11,'#f59e0b','center',700);
const nodes=[
{x:0.1, y:0.38,label:'Stakeholder\nInterviews', c:'#f59e0b',icon:'👥'},
{x:0.3, y:0.38,label:'Business\nRequirements', c:'#f97316',icon:'📋'},
{x:0.52,y:0.38,label:'NFR\nAnalysis', c:'#8b7ae8',icon:'⚙️'},
{x:0.74,y:0.38,label:'Risk\nRegister', c:'#ef4444',icon:'⚠️'},
{x:0.92,y:0.38,label:'ADRs', c:'#34d399',icon:'📄'},
{x:0.52,y:0.72,label:'Architecture\nProposal', c:'#60a5fa',icon:'🏛️'},
];
const edges=[[0,1],[1,2],[2,3],[3,4],[2,5],[4,5]];
const cycle=240,ph=(t%cycle)/cycle;
const actE=Math.floor(ph*edges.length),eFrac=(ph*edges.length)%1;
edges.forEach(([a,b],i)=>{
const na=nodes[a],nb=nodes[b];
const ax=na.x*W,ay=na.y*H,bx=nb.x*W,by=nb.y*H;
ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);
ctx.strokeStyle=i<actE?na.c+'55':'#2a2458';ctx.lineWidth=1.5;ctx.setLineDash([4,4]);ctx.stroke();ctx.setLineDash([]);
if(i===actE){const px=ax+(bx-ax)*eFrac,py=ay+(by-ay)*eFrac;glow(ctx,px,py,8,na.c);ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fillStyle=na.c;ctx.fill();}
});
nodes.forEach((n,i)=>{
const nx=n.x*W,ny=n.y*H;
const touched=edges.slice(0,actE+1).some(([a,b])=>a===i||b===i);
if(touched)glow(ctx,nx,ny,22,n.c);
rr(ctx,nx-44,ny-20,88,40,9,touched?n.c+'22':'#16132a',touched?n.c:'#2a2458',touched?2:1);
txt(ctx,n.icon,nx,ny-6,touched?14:11,'#fff','center');
txt(ctx,n.label.split('\n')[0],nx,ny+8,8.5,touched?n.c:'#5a5880','center',600);
});
}

function drawArchDesign(ctx,W,H){
const t=ARCH.t;
txt(ctx,'Design Phase — C4 Model Architecture Levels',W/2,16,11,'#8b7ae8','center',700);
const cx=W*0.36,cy=H*0.52,pulse=1+0.03*Math.sin(t*0.04);
const levels=[
{r:115,label:'System Context', c:'#8b7ae8',fill:'rgba(108,93,211,0.12)'},
{r:80, label:'Containers', c:'#60a5fa',fill:'rgba(96,165,250,0.12)'},
{r:50, label:'Components', c:'#34d399',fill:'rgba(52,211,153,0.12)'},
{r:22, label:'Code / ADR', c:'#f59e0b',fill:'rgba(245,158,11,0.25)'},
];
levels.forEach(l=>{
ctx.beginPath();ctx.arc(cx,cy,l.r*pulse,0,Math.PI*2);ctx.fillStyle=l.fill;ctx.fill();
ctx.strokeStyle=l.c+'66';ctx.lineWidth=1.5;ctx.stroke();
txt(ctx,l.label,cx,cy-l.r+12,9,l.c,'center',600);
});
txt(ctx,'🏛',cx,cy,16,'#fff','center');
const items=['API Contracts (OpenAPI)','DB Schema & Migrations','Security Boundaries','Scalability Strategy','Deployment Topology'];
const bx=W*0.6,iw=W*0.36,ih=28;
txt(ctx,'📐 Design Artefacts',bx+iw/2,H*0.2,10.5,'#9d8df5','center',700);
items.forEach((item,i)=>{
const iy=H*0.27+i*(ih+5);
const active=Math.floor((t*0.012)%items.length)===i;
rr(ctx,bx,iy,iw,ih,6,active?'#1e1060':'#16132a',active?'#8b7ae8':'#2a2458',active?1.5:1);
txt(ctx,item,bx+12,iy+ih/2,9.5,active?'#9d8df5':'#5a5880','left',active?600:400);
});
}

function drawArchProd(ctx,W,H){
const t=ARCH.t;
txt(ctx,'Production — Deploy · Monitor · Evolve',W/2,16,11,'#60a5fa','center',700);
const pipe=[
{label:'Code Review',icon:'👁', c:'#8b7ae8'},
{label:'CI Build', icon:'🔨',c:'#f59e0b'},
{label:'Test Suite', icon:'🧪',c:'#06b6d4'},
{label:'Staging', icon:'🔬',c:'#34d399'},
{label:'Production', icon:'🚀',c:'#f97316'},
{label:'Monitor', icon:'📊',c:'#60a5fa'},
];
const n=pipe.length,bw=Math.floor((W-40)/n)-6,bh=50,by=H*0.32;
const cycle=300,ph=(t%cycle)/cycle;
const actIdx=Math.floor(ph*n),sFrac=(ph*n)%1;
pipe.forEach((p,i)=>{
const x=20+i*(bw+6);
const active=i===actIdx,done=i<actIdx;
if(active)glow(ctx,x+bw/2,by+bh/2,28,p.c);
rr(ctx,x,by,bw,bh,9,active?p.c+'22':done?p.c+'14':'#16132a',active?p.c:done?p.c+'77':'#2a2458',active?2:1);
txt(ctx,p.icon,x+bw/2,by+17,active?17:13,'#fff','center');
txt(ctx,p.label,x+bw/2,by+bh-10,8.5,active?p.c:done?p.c+'aa':'#5a5880','center',active?700:400);
if(done){ctx.beginPath();ctx.arc(x+bw-8,by+9,7,0,Math.PI*2);ctx.fillStyle='#34d399';ctx.fill();txt(ctx,'✓',x+bw-8,by+9,8,'#fff','center',700);}
if(active&&i<n-1){const px=x+bw+3+(6)*sFrac;ctx.beginPath();ctx.arc(px,by+bh/2,3,0,Math.PI*2);ctx.fillStyle=p.c;ctx.fill();}
});
const metrics=[{label:'Uptime SLO',val:99.95,c:'#34d399'},{label:'Error Budget',val:72,c:'#f59e0b'},{label:'P95 Latency',val:85,c:'#60a5fa'},{label:'Deploy Freq',val:91,c:'#8b7ae8'}];
const mw=(W-40)/metrics.length-6,my=by+bh+22;
txt(ctx,'📊 SLO Dashboard',W/2,my,10,'#9d8df5','center',700);
metrics.forEach((m,i)=>{
const mx=20+i*(mw+6),vy=my+14,mh=46;
const pulse=m.val/100+0.03*Math.sin(t*0.03+i);
rr(ctx,mx,vy,mw,mh,8,'#16132a',m.c+'55',1);
rr(ctx,mx,vy+mh-8,mw*Math.min(1,pulse),8,0,m.c+'99');
txt(ctx,m.label,mx+mw/2,vy+16,9,m.c,'center',600);
txt(ctx,m.val+'%',mx+mw/2,vy+32,13,'#fff','center',700);
});
}
(function(){
const map={'cvs-sdlc':initSdlcAnim,'cvs-architect':initArchitectAnim};
const obs=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting){const fn=map[e.target.id];if(fn)setTimeout(fn,80);}});
},{threshold:0.1});
Object.keys(map).forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
})();
  