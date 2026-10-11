#!/usr/bin/env node
// Builds two things from one source:
//   dist/public/   the public site (multi-page, 6 languages, no Bets tab). This is what you publish on GitHub Pages.
//   dist/private/  one self-contained HTML file WITH the Bets tab. Keep it on your own computer. Never publish it.
// Usage:  node build.js            (BASE_URL=https://you.github.io/repo/ node build.js  to override the address)
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=__dirname,DIST=path.join(ROOT,'dist');
const rd=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const OUT=path.join(DIST,'public');
const wr=(p,s)=>{const f=path.join(OUT,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,s);};
const cpf=(a,b)=>{const f=path.join(OUT,b);fs.mkdirSync(path.dirname(f),{recursive:true});fs.copyFileSync(path.join(ROOT,a),f);};
fs.rmSync(DIST,{recursive:true,force:true});

const cfg=JSON.parse(rd('site.config.json'));
let BASE=process.env.BASE_URL||cfg.baseUrl;if(!BASE.endsWith('/'))BASE+='/';
const results=JSON.parse(rd('results.json'));
const ANALYTICS=cfg.analyticsSnippet||'',FOOTER_HTML=cfg.footerHtml||'';   // optional: paste an analytics <script> or a sign-up form into site.config.json
const coreBase=rd('src/core_base.js'),coreExtra=rd('src/core_extra.js'),corePages=rd('src/core_pages.js');
const publicCore=coreBase+'\n'+coreExtra+'\n'+corePages,privateCore=coreBase+'\n'+coreExtra;

// ── load the shared logic so pages are generated from the same data as the app ──
const ctx={console,Intl,Date,Math};vm.createContext(ctx);
vm.runInContext(publicCore+`;this.C={matches,TOTAL,UI,LANGS,tx,tn,setLang,kickInfo,icsFile,gcalUrl,applyResults,getStand:()=>STAND,poolOf,getPred,contextHtml,h2hFor,h2hHtml,short,shortDate,matchSlug,utcOf,SQUADS,stadiumFacts,POS,POSN,getFE,stageName,stageShort,poolLabel,slug,stTable,scoreHtml,ctxStat,stageColors,isTeam,capOfL,codes}`,ctx);
const C=ctx.C;C.applyResults(results);
const LC=Object.keys(C.LANGS);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const P=(l,p)=>(l==='en'?'':l+'/')+p;
function relTo(from,to){const f=from.split('/').filter(Boolean),t=to.split('/').filter(Boolean);let i=0;while(i<f.length&&i<t.length&&f[i]===t[i])i++;const up='../'.repeat(f.length-i),down=t.slice(i).join('/');return (up+down+(down&&!/\.\w+$/.test(down)?'/':''))||'./';}
const pages=[];   // {lang,sub} for the sitemap
const teams=Object.keys(C.poolOf).sort(),venues=[...new Set(C.matches.map(m=>m.venue))],POOLS=C.POOL_LETTERS||['A','B','C','D','E','F'];
const iso=m=>new Date(C.utcOf(m)).toISOString();
const flagOf=t=>C.isTeam(t)?C.getFE(t)+' ':'';
const nm=t=>flagOf(t)+C.tn(t);

// ── page shell ──
function shell(o){
  const L=o.lang;C.setLang(L);const here=P(L,o.sub),R=relTo(here,''),t=C.tx;pages.push({lang:L,sub:o.sub,noindex:o.noindex});
  const alt={};LC.forEach(l=>alt[l]=relTo(here,P(l,o.sub)));
  const nav=[['',t('navApp')],['fixtures/',t('navFixtures')],['standings/',t('standings')],['pools/',t('tabPools')],['teams/',t('tabTeams')],['stadiums/',t('tabStadiums')]].map(([p,l])=>`<a href="${relTo(here,P(L,p))}"${p===(o.nav||'x')?' class="on"':''}>${l}</a>`).join('');
  const hre=LC.map(l=>`<link rel="alternate" hreflang="${l}" href="${BASE+P(l,o.sub)}">`).join('\n')+`\n<link rel="alternate" hreflang="x-default" href="${BASE+P('en',o.sub)}">`;
  const pd={lang:L,root:R,alt,matchBase:relTo(here,P(L,'match/')),icsBase:relTo(here,'ics/'),sw:R+'sw.js'};
  const foot=LC.map(l=>`<a href="${alt[l]}" hreflang="${l}" lang="${l}">${C.LANGS[l][0]}</a>`).join('');
  return `<!DOCTYPE html>
<html lang="${L}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title><meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${BASE+here}">${hre}
<meta property="og:type" content="website"><meta property="og:title" content="${esc(o.title)}"><meta property="og:description" content="${esc(o.desc)}"><meta property="og:url" content="${BASE+here}"><meta property="og:image" content="${BASE}assets/icons/icon-512.png"><meta name="twitter:card" content="summary">
<meta name="theme-color" content="#176B48"><link rel="manifest" href="${R}manifest.webmanifest"><link rel="icon" type="image/png" href="${R}assets/icons/favicon-32.png"><link rel="apple-touch-icon" href="${R}assets/icons/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${R}assets/style.css">${ANALYTICS}${o.noindex?'<meta name="robots" content="noindex">':''}
${(o.ld||[]).map(j=>`<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head><body>
<header class="sh"><a class="logo" href="${relTo(here,P(L,''))}">🏉 Rugby <em>World Cup</em> 2027<small>${t('logoSub')}</small></a><nav>${nav}</nav>
<div class="tools"><select id="lang-select" aria-label="${t('langLabel')}"></select><select id="tz-select" aria-label="${t('tzLabel')}"></select><select id="follow-select" aria-label="${t('followPick')}"></select></div></header>
<div id="follow-bar"></div>
<main class="wrap">${o.body}</main>
<footer class="sf">${FOOTER_HTML}<p>${t('disclaimer')}</p><p>${nav.replace(/ class="on"/g,'')}</p><p>${foot}</p></footer>
<script>window.RWC_PAGE=${JSON.stringify(pd)}</script><script src="${R}assets/rwc-core.js"></script><script src="${R}assets/site.js"></script>
</body></html>`;
}
const crumbs=(L,here,items)=>`<div class="crumbs"><a href="${relTo(here,P(L,''))}">${C.tx('tabMatches')}</a>${items.map(([h,l])=>' › '+(h?`<a href="${relTo(here,P(L,h))}">${l}</a>`:l)).join('')}</div>`;
const kickStatic=m=>{const k=C.kickInfo(m,'UTC');return `${C.shortDate(m)} · ${m.time} ${C.tx('localWord')} · ${k.time} UTC`;};
const mlink=(m,L,here)=>relTo(here,P(L,'match/'+C.matchSlug(m)+'/'));
function mrow(m,L,here){return `<div class="ml"><span class="n">#${m.id}</span><span class="t"><a href="${mlink(m,L,here)}" data-names="${m.id}">${nm(m.team1)} v ${nm(m.team2)}</a></span><span class="w"><time class="kick" data-id="${m.id}" datetime="${iso(m)}">${kickStatic(m)}</time> · ${esc(m.venue)}</span><span data-score="${m.id}">${C.scoreHtml(m)}</span></div>`;}
function squadHtml(team){
  const sq=C.SQUADS[team],t=C.tx;if(!sq)return `<p class="lead">${esc(t('noSquad',{team:C.tn(team)}))}</p>`;
  const pl=[...sq.players].sort((a,b)=>C.POS.indexOf(a.pos)-C.POS.indexOf(b.pos)||b.caps-a.caps),n=pl.length,tot=pl.reduce((s,p)=>s+p.caps,0);
  const meta=[[t('playersWord'),n],[t('totalCaps'),tot.toLocaleString('en')],[t('avgCaps'),Math.round(tot/n)],[t('avgAge'),(pl.reduce((s,p)=>s+2027-p.born,0)/n).toFixed(1)]].map(([l,v])=>`<div><label>${l}</label><span>${v}</span></div>`).join('');
  const rows=pl.map(p=>`<tr><td>${esc(p.name)}${p.cap?' <span class="badge">C</span>':''}</td><td title="${C.POSN[p.pos]}">${p.pos}</td><td>${esc(p.club)}</td><td>${p.caps}</td><td>${2027-p.born}</td></tr>`).join('');
  return `<p class="squadnote">${esc(sq.note)} ${t('squadTail')}</p><div class="meta">${meta}</div><div class="tw"><table><thead><tr><th>${t('thPlayer')}</th><th>${t('thPos')}</th><th>${t('thClub')}</th><th>${t('thCaps')}</th><th>${t('thAge')}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

// ── page types ──
function matchPage(m,L){
  C.setLang(L);const t=C.tx,sub='match/'+C.matchSlug(m)+'/',here=P(L,sub),k=C.kickInfo(m,'UTC'),p=C.getPred(m),color=C.stageColors[m.stage]||'#2E9E6B';
  const names=C.tn(m.team1)+' v '+C.tn(m.team2),pool=m.stage==='Pool'?C.poolLabel(m.group):C.stageName(m.stage);
  const hh=m.stage==='Pool'?C.h2hFor(m):null;let ctx2;
  if(hh)ctx2=`<h2>${t('lastMeetings',{n:hh.rows.length}).replace('📊 ','')}</h2><div>${C.ctxStat(hh.w1,t('winsOf',{x:C.short(m.team1)}))}${C.ctxStat(hh.dr,t('draws'))}${C.ctxStat(hh.w2,t('winsOf',{x:C.short(m.team2)}))}</div>${C.h2hHtml(m,hh)}`;
  else{const c=C.contextHtml(m,color);ctx2=`<h2>${t('ctxTitle').replace('📊 ','')}</h2><div>${c.stats}</div><p>${esc(c.text)}</p>${m.stage==='Pool'?`<p class="hh-foot">${t('h2hNone')}</p>`:''}`;}
  const standings=m.stage==='Pool'?`<h2>${t('standings')} · ${C.poolLabel(m.group)}</h2><div class="tw" data-standings="${m.group}">${C.stTable(m.group)}</div>`:'';
  const others=[m.team1,m.team2].filter(C.isTeam).map(tm=>`<h2>${esc(C.tn(tm))}</h2>${C.matches.filter(x=>x.stage==='Pool'&&(x.team1===tm||x.team2===tm)&&x.id!==m.id).map(x=>mrow(x,L,here)).join('')}`).join('');
  const body=`${crumbs(L,here,[['fixtures/',t('navFixtures')],[null,names]])}
<span class="badge" style="background:${color}">${esc(pool)}</span> <span class="crumbs">#${m.id}</span>
<h1 data-names="${m.id}">${C.tn(m.team1)} v ${C.tn(m.team2)}</h1><div data-score="${m.id}">${C.scoreHtml(m)}</div>
<div class="meta"><div><label>${t('kickoffWord')} (${t('yourTime')})</label><span><time class="kick" data-id="${m.id}" datetime="${iso(m)}">${kickStatic(m)}</time></span></div><div><label>${t('stadiumTime')}</label><span>${C.shortDate(m)} · ${m.time}</span></div><div><label>${t('utcWord')}</label><span>${k.date} · ${k.time}</span></div><div><label>${t('labVenue')}</label><span><a href="${relTo(here,P(L,'stadium/'+C.slug(m.venue)+'/'))}">${esc(m.venue)}</a></span></div><div><label>${t('labCity')}</label><span>${esc(m.city)}</span></div></div>
<p><a class="btn pri" href="${relTo(here,'ics/match-'+m.id+'.ics')}">📅 ${t('icsFile')}</a> <a class="btn" href="${C.gcalUrl(m,BASE)}" rel="noopener" target="_blank">${t('gcal')}</a> <a class="btn" href="${relTo(here,P(L,''))}?m=${m.id}">${t('openInApp')}</a></p>
<div class="card"><h2 style="margin-top:0">${t('predTitle').replace('🔮 ','')}</h2><div class="pbar"><i style="width:${p.w1}%;background:${color}"></i><i style="width:${p.dr}%;background:#9CA3AF"></i><i style="width:${p.w2}%;background:#d6d0c4"></i></div><div class="plab"><span>${esc(C.tn(m.team1))} ${p.w1}%</span><span>${t('draw')} ${p.dr}%</span><span>${p.w2}% ${esc(C.tn(m.team2))}</span></div><p>${esc(p.verdict)}</p><p><b>${t('ptsTitle').replace('🏉 ','')}:</b> ${p.tot} · ${esc(p.s)}<br><b>${t('watchFor').replace('⭐ ','')}:</b> ${esc(p.potm)} <span class="crumbs">${esc(p.club)}</span></p></div>
<div class="card">${ctx2}</div>${standings}${others}`;
  const ld=[{'@context':'https://schema.org','@type':'SportsEvent',name:names+' · Rugby World Cup 2027',description:C.tx('descMatch',{t1:C.tn(m.team1),t2:C.tn(m.team2),venue:m.venue,city:m.city,date:C.shortDate(m),time:m.time,utc:k.time,pool}),startDate:iso(m),eventStatus:'https://schema.org/EventScheduled',sport:'Rugby union',location:{'@type':'Place',name:m.venue,address:{'@type':'PostalAddress',addressLocality:m.city.split(' / ')[0],addressCountry:'AU'}},...(C.isTeam(m.team1)&&C.isTeam(m.team2)?{competitor:[{'@type':'SportsTeam',name:m.team1},{'@type':'SportsTeam',name:m.team2}]}:{})}];
  return shell({lang:L,sub,title:`${names} | RWC 2027 · ${pool}`,desc:ld[0].description,body,ld,nav:'fixtures/'});
}
function teamPage(team,L){
  C.setLang(L);const t=C.tx,sub='team/'+C.slug(team)+'/',here=P(L,sub),grp=C.poolOf[team],ms=C.matches.filter(x=>x.team1===team||x.team2===team).sort((a,b)=>C.utcOf(a)-C.utcOf(b));
  const sq=C.SQUADS[team];
  const body=`${crumbs(L,here,[['teams/',t('tabTeams')],[null,C.tn(team)]])}
<h1>${nm(team)}</h1><p class="lead">${C.poolLabel(grp)}${sq?' · '+t('headCoach')+': '+esc(sq.coach):''}</p>
<p><button class="btn pri" id="follow-this" data-team="${esc(team)}">${t('followThis')}</button> <a class="btn" href="${relTo(here,'ics/team-'+C.slug(team)+'.ics')}">📅 ${t('followAll')}</a></p>
<h2>${t('poolFixtures')}</h2><div class="card">${ms.map(x=>mrow(x,L,here)).join('')}</div>
<h2>${t('standings')} · ${C.poolLabel(grp)}</h2><div class="tw" data-standings="${grp}">${C.stTable(grp)}</div>
<h2>${t('squadWord')}</h2>${squadHtml(team)}`;
  const ld=[{'@context':'https://schema.org','@type':'SportsTeam',name:team,sport:'Rugby union',description:t('descTeam',{team:C.tn(team),pool:C.poolLabel(grp)})}];
  return shell({lang:L,sub,title:`${C.tn(team)} | RWC 2027 · ${C.poolLabel(grp)}`,desc:ld[0].description,body,ld,nav:'teams/'});
}
function poolPage(Lt,L){
  C.setLang(L);const t=C.tx,grp='Pool '+Lt,sub='pool/'+Lt.toLowerCase()+'/',here=P(L,sub),ts=teams.filter(x=>C.poolOf[x]===grp),ms=C.matches.filter(x=>x.group===grp);
  const body=`${crumbs(L,here,[['pools/',t('tabPools')],[null,C.poolLabel(grp)]])}<h1>${C.poolLabel(grp)}</h1>
<div class="grid">${ts.map(x=>`<a class="card" href="${relTo(here,P(L,'team/'+C.slug(x)+'/'))}"><b>${nm(x)}</b></a>`).join('')}</div>
<h2>${t('standings')}</h2><div class="tw" data-standings="${grp}">${C.stTable(grp)}</div><p class="hh-foot">${t('standingsNote')}</p>
<h2>${t('poolFixtures')}</h2><div class="card">${ms.map(x=>mrow(x,L,here)).join('')}</div>`;
  return shell({lang:L,sub,title:`${C.poolLabel(grp)} | RWC 2027`,desc:t('descPool',{pool:C.poolLabel(grp)}),body,nav:'pools/'});
}
function stadiumPage(v,L){
  C.setLang(L);const t=C.tx,sub='stadium/'+C.slug(v)+'/',here=P(L,sub),ms=C.matches.filter(x=>x.venue===v),info=C.stadiumFacts[v]||{cap:'TBC',fact:''};
  const body=`${crumbs(L,here,[['stadiums/',t('tabStadiums')],[null,v]])}<h1>🏟 ${esc(v)}</h1><p class="lead">${esc(ms[0].city)} · ${t('capacity')} ${info.cap}</p>
<div class="card"><b>${t('venueFacts')}</b><p>${esc(info.fact)}</p></div><h2>${t('relatedMatches')} (${ms.length})</h2><div class="card">${ms.map(x=>mrow(x,L,here)).join('')}</div>`;
  const ld=[{'@context':'https://schema.org','@type':'StadiumOrArena',name:v,address:{'@type':'PostalAddress',addressLocality:ms[0].city.split(' / ')[0],addressCountry:'AU'}}];
  return shell({lang:L,sub,title:`${v} | RWC 2027 · ${ms[0].city.split(' / ')[0]}`,desc:t('descStadium',{venue:v,city:ms[0].city,n:ms.length}),body,ld,nav:'stadiums/'});
}
function fixturesPage(L){
  C.setLang(L);const t=C.tx,sub='fixtures/',here=P(L,sub);let cur='',out='';
  C.matches.forEach(m=>{const d=C.shortDate(m);if(d!==cur){cur=d;out+=`<div class="dayh">${d}</div>`;}out+=mrow(m,L,here);});
  return shell({lang:L,sub,title:`${t('navFixtures')} | RWC 2027`,desc:t('descFixtures'),body:`<h1>${t('navFixtures')}</h1><p class="lead">${t('descFixtures')}</p><div class="card">${out}</div>`,nav:'fixtures/'});
}
function indexPage(kind,L){
  C.setLang(L);const t=C.tx,sub=kind+'/',here=P(L,sub);let items,title,desc;
  if(kind==='teams'){title=t('tabTeams');desc=t('descTeams');items=teams.sort((a,b)=>C.tn(a).localeCompare(C.tn(b),C.LANGS[L][1])).map(x=>`<a class="card" href="${relTo(here,P(L,'team/'+C.slug(x)+'/'))}"><b>${nm(x)}</b><br><span class="crumbs">${C.poolLabel(C.poolOf[x])}</span></a>`);}
  if(kind==='pools'){title=t('tabPools');desc=t('descPools');items=POOLS.map(x=>`<a class="card" href="${relTo(here,P(L,'pool/'+x.toLowerCase()+'/'))}"><b>${C.poolLabel('Pool '+x)}</b><br><span class="crumbs">${teams.filter(y=>C.poolOf[y]==='Pool '+x).map(C.tn).join(' · ')}</span></a>`);}
  if(kind==='stadiums'){title=t('tabStadiums');desc=t('descStadiums');items=venues.map(v=>{const ms=C.matches.filter(x=>x.venue===v);return `<a class="card" href="${relTo(here,P(L,'stadium/'+C.slug(v)+'/'))}"><b>🏟 ${esc(v)}</b><br><span class="crumbs">${esc(ms[0].city)} · ${ms.length} ${t('matchesWord')}</span></a>`;});}
  return shell({lang:L,sub,title:`${title} | RWC 2027`,desc,body:`<h1>${title}</h1><p class="lead">${desc}</p><div class="grid">${items.join('')}</div>`,nav:kind+'/'});
}
function standingsPage(L){
  C.setLang(L);const t=C.tx,sub='standings/',here=P(L,sub);
  const pools=POOLS.map(x=>`<div class="card"><h2 style="margin-top:0"><a href="${relTo(here,P(L,'pool/'+x.toLowerCase()+'/'))}">${C.poolLabel('Pool '+x)}</a></h2><div class="tw" data-standings="Pool ${x}">${C.stTable('Pool '+x)}</div></div>`).join('');
  const ko=['Round of 16','Quarterfinal','Semifinal','Bronze Final','Final'].map(st=>`<h2>${C.stageName(st)}</h2><div class="card">${C.matches.filter(m=>m.stage===st).map(m=>mrow(m,L,here)).join('')}</div>`).join('');
  return shell({lang:L,sub,title:`${t('standings')} | RWC 2027`,desc:t('descStandings'),body:`<h1>${t('standings')}</h1><p class="lead">${t('standingsNote')}${results.updated?' · '+t('updatedWord')+': '+esc(String(results.updated).slice(0,16).replace('T',' '))+' UTC':''}</p>${pools}<h2>${t('bracket')}</h2>${ko}`,nav:'standings/'});
}

// ── write the public site ──
const tpl=rd('src/app_tpl.html');
const stripPriv=(s,keep)=>keep?s.replace(/\/\*PRIVATE_(START|END)\*\/|<!--PRIVATE_(START|END)-->/g,''):s.replace(/\/\*PRIVATE_START\*\/[\s\S]*?\/\*PRIVATE_END\*\//g,'').replace(/<!--PRIVATE_START-->[\s\S]*?<!--PRIVATE_END-->/g,'');
function appPage(L){
  C.setLang(L);const t=C.tx,here=P(L,''),R=relTo(here,'');pages.push({lang:L,sub:''});
  const langUrls={};LC.forEach(l=>langUrls[l]=relTo(here,P(l,'')));
  let h=stripPriv(tpl,false);
  h=h.replace('/*@CORE@*/',`</script>\n<script src="${R}assets/rwc-core.js"></script>\n<script>`);
  h=h.replace('@@BG_MATCHES@@',R+'assets/bg-matches.jpg').replace('@@BG_POOLS@@',R+'assets/bg-pools.jpg');
  h=h.replace('/*@CFG@*/{}',JSON.stringify({lang:L,base:BASE,sw:R+'sw.js',resultsUrl:R+'results.json',langUrls}));
  const hre=LC.map(l=>`<link rel="alternate" hreflang="${l}" href="${BASE+P(l,'')}">`).join('\n')+`\n<link rel="alternate" hreflang="x-default" href="${BASE}">`;
  h=h.replace('<!--@HEAD@-->',`<meta name="description" content="${esc(t('descHome'))}"><link rel="canonical" href="${BASE+here}">\n${hre}\n<meta property="og:type" content="website"><meta property="og:title" content="${esc(t('siteTitle'))}"><meta property="og:description" content="${esc(t('descHome'))}"><meta property="og:url" content="${BASE+here}"><meta property="og:image" content="${BASE}assets/icons/icon-512.png">\n<meta name="theme-color" content="#176B48"><link rel="manifest" href="${R}manifest.webmanifest"><link rel="icon" type="image/png" href="${R}assets/icons/favicon-32.png"><link rel="apple-touch-icon" href="${R}assets/icons/apple-touch-icon.png">${ANALYTICS}`);
  h=h.replace('<!--@SEO_NAV@-->',[['fixtures/',t('navFixtures')],['standings/',t('standings')],['pools/',t('tabPools')],['teams/',t('tabTeams')],['stadiums/',t('tabStadiums')]].map(([p,l])=>`<a href="${relTo(here,P(L,p))}">${l}</a>`).join(''));
  h=h.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(t('siteTitle'))}</title>`).replace(/<html[^>]*>/,`<html lang="${L}">`);
  wr(P(L,'index.html'),h);
}
for(const L of LC){
  appPage(L);
  C.matches.forEach(m=>wr(P(L,'match/'+(C.setLang(L),C.matchSlug(m))+'/index.html'),matchPage(m,L)));
  teams.forEach(x=>wr(P(L,'team/'+C.slug(x)+'/index.html'),teamPage(x,L)));
  POOLS.forEach(x=>wr(P(L,'pool/'+x.toLowerCase()+'/index.html'),poolPage(x,L)));
  venues.forEach(v=>wr(P(L,'stadium/'+C.slug(v)+'/index.html'),stadiumPage(v,L)));
  wr(P(L,'fixtures/index.html'),fixturesPage(L));
  ['teams','pools','stadiums'].forEach(k=>wr(P(L,k+'/index.html'),indexPage(k,L)));
  wr(P(L,'standings/index.html'),standingsPage(L));
}
// calendar files (English titles so they read the same in every calendar app)
C.setLang('en');
C.matches.forEach(m=>wr('ics/match-'+m.id+'.ics',C.icsFile([m],BASE)));
teams.forEach(x=>wr('ics/team-'+C.slug(x)+'.ics',C.icsFile(C.matches.filter(m=>m.team1===x||m.team2===x).sort((a,b)=>C.utcOf(a)-C.utcOf(b)),BASE)));
wr('ics/all.ics',C.icsFile(C.matches,BASE));
// assets, app files
wr('assets/rwc-core.js',publicCore);
['style.css','site.js','bg-matches.jpg','bg-pools.jpg'].forEach(f=>cpf('src/assets/'+f,'assets/'+f));
['icon-512.png','icon-192.png','apple-touch-icon.png','favicon-32.png'].forEach(f=>cpf('src/assets/icons/'+f,'assets/icons/'+f));
wr('results.json',JSON.stringify(results,null,1));
wr('admin/index.html',rd('src/admin.html'));
wr('.nojekyll','');
wr('manifest.webmanifest',JSON.stringify({name:'RWC 2027 Fan Navigator (unofficial)',short_name:'RWC 2027',description:C.tx('descHome'),start_url:'./',scope:'./',display:'standalone',background_color:'#08100b',theme_color:'#176B48',icons:[{src:'assets/icons/icon-192.png',sizes:'192x192',type:'image/png'},{src:'assets/icons/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}]},null,1));
wr('sw.js',`// Offline support: the site shell is cached, pages are refreshed in the background, results.json is always fetched fresh.
const V='rwc27-${Date.now().toString(36)}',CORE=['./','assets/style.css','assets/rwc-core.js','assets/site.js','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(u.pathname.endsWith('results.json')){e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));return;}
  e.respondWith(caches.match(e.request).then(hit=>{const net=fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(ca=>ca.put(e.request,c));}return r;}).catch(()=>hit);return hit||net;}));});
`);
wr('404.html',`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | RWC 2027</title><meta name="robots" content="noindex"><style>body{font-family:system-ui,sans-serif;text-align:center;padding:60px 20px;background:#F4F1EC;color:#1A1814}a{color:#176B48;font-weight:700}</style></head><body><h1>🏉 Page not found</h1><p><a href="${BASE}">Back to the Rugby World Cup 2027 navigator</a></p></body></html>`);
// sitemap + robots
const lastmod=new Date().toISOString().slice(0,10),seen={};
const uniq=pages.filter(p=>!p.noindex);
wr('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`+uniq.map(p=>`<url><loc>${BASE+P(p.lang,p.sub)}</loc><lastmod>${lastmod}</lastmod>${LC.map(l=>`<xhtml:link rel="alternate" hreflang="${l}" href="${BASE+P(l,p.sub)}"/>`).join('')}</url>`).join('\n')+'\n</urlset>\n');
wr('robots.txt',`User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${BASE}sitemap.xml\n`);

// ── write the private single-file build (with Bets) ──
(function(){
  const b64=f=>'data:image/jpeg;base64,'+fs.readFileSync(path.join(ROOT,'src/assets/'+f)).toString('base64');
  let h=stripPriv(tpl,true);
  h=h.replace('/*@CORE@*/',()=>privateCore).replace('@@BG_MATCHES@@',()=>b64('bg-matches.jpg')).replace('@@BG_POOLS@@',()=>b64('bg-pools.jpg'));
  h=h.replace('/*@CFG@*/{}','{}').replace('<!--@HEAD@-->','').replace('<!--@SEO_NAV@-->','');
  fs.mkdirSync(path.join(DIST,'private'),{recursive:true});fs.writeFileSync(path.join(DIST,'private','rwc2027_private.html'),h);
})();
console.log('Built '+pages.length+' pages ('+LC.length+' languages) + calendar files. Base URL: '+BASE);
