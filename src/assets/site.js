// Page script for the static pages: time zones, language links, follow my team, live results.
(function(){
  const P=window.RWC_PAGE||{};setLang(P.lang||'en');
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const get=k=>{try{return localStorage.getItem(k);}catch(e){return null;}},set=(k,v)=>{try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v);}catch(e){}};
  let myTeam=get('rwc27.team');if(myTeam&&!poolOf[myTeam])myTeam=null;
  function localise(){$$('time.kick').forEach(el=>{const m=matches.find(x=>x.id==el.dataset.id);if(!m)return;const k=kickInfo(m);el.textContent=k.date+' · '+k.time+' '+k.zone+' ('+tx('yourTime')+')';});}
  function dyn(){
    $$('[data-standings]').forEach(el=>{el.innerHTML=stTable(el.dataset.standings);});
    $$('[data-score]').forEach(el=>{const m=matches.find(x=>x.id==el.dataset.score);if(m)el.innerHTML=scoreHtml(m);});
    $$('[data-names]').forEach(el=>{const m=matches.find(x=>x.id==el.dataset.names);if(m)el.textContent=tn(m.team1)+' v '+tn(m.team2);});
  }
  function bar(){
    const b=$('#follow-bar');if(!b)return;if(!myTeam){b.style.display='none';return;}
    const nx=nextMatchFor(myTeam,Date.now()),pp=poolPosition(myTeam);let mid=tx('followNone');
    if(nx){const opp=nx.team1===myTeam?nx.team2:nx.team1,k=kickInfo(nx),df=utcOf(nx)-Date.now();
      const cd=df>0?tx('followIn',{d:Math.floor(df/864e5),h:Math.floor(df%864e5/36e5)}):'';
      mid=tx('followNext')+': <a href="'+P.matchBase+matchSlug(nx)+'/">'+tn(opp)+' · '+k.date+' '+k.time+' '+k.zone+'</a> '+cd;}
    b.style.display='flex';
    b.innerHTML='<span>'+getFE(myTeam)+' <b>'+tn(myTeam)+'</b></span><span>'+mid+'</span>'+(pp?'<span>'+tx('followPool')+': <b>'+pp.pos+'</b> · '+pp.row.pts+' '+tx('hPts')+'</span>':'')+'<span class="fb-btns"><a class="btn" href="'+P.icsBase+'team-'+slug(myTeam)+'.ics">📅 '+tx('followAll')+'</a><button class="btn" id="fb-stop">✕ '+tx('followStop')+'</button></span>';
    $('#fb-stop').onclick=()=>{myTeam=null;set('rwc27.team',null);bar();const f=$('#follow-select');if(f)f.value='';const ft=$('#follow-this');if(ft)ft.style.display='';};
  }
  function controls(){
    const ls=$('#lang-select');if(ls){ls.innerHTML=Object.keys(LANGS).map(l=>'<option value="'+l+'">'+LANGS[l][0]+'</option>').join('');ls.value=P.lang||'en';ls.onchange=e=>{location.href=P.alt[e.target.value];};}
    const tz=$('#tz-select');if(tz){let z;try{z=Intl.supportedValuesOf('timeZone');}catch(e){z=['UTC','Europe/London','Europe/Paris','America/New_York','America/Los_Angeles','Asia/Tokyo','Australia/Sydney','Pacific/Auckland'];}
      tz.innerHTML='<option value="auto">'+tx('tzAuto')+'</option>'+z.map(x=>'<option value="'+x+'">'+x.replace(/_/g,' ')+'</option>').join('');tz.value=get('rwc27.tz')||'auto';tz.title=tx('tzLabel');tz.onchange=e=>{set('rwc27.tz',e.target.value==='auto'?null:e.target.value);localise();bar();};}
    const fs=$('#follow-select');if(fs){fs.innerHTML='<option value="">'+tx('followPick')+'</option>'+Object.keys(poolOf).sort((a,b)=>tn(a).localeCompare(tn(b),LANGS[LANG][1])).map(t=>'<option value="'+t+'">'+tn(t)+'</option>').join('');fs.value=myTeam||'';fs.onchange=e=>{myTeam=e.target.value||null;set('rwc27.team',myTeam);bar();};}
    const ft=$('#follow-this');if(ft){ft.onclick=()=>{myTeam=ft.dataset.team;set('rwc27.team',myTeam);const f=$('#follow-select');if(f)f.value=myTeam;bar();};}
  }
  controls();localise();bar();setInterval(()=>{localise();bar();},60000);
  if(/^https?:/.test(location.protocol)){
    const load=()=>fetch(P.root+'results.json?t='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(j=>{if(j&&j.results){applyResults(j);dyn();bar();}}).catch(()=>{});
    load();setInterval(load,90000);
    if('serviceWorker' in navigator&&P.sw)navigator.serviceWorker.register(P.sw).catch(()=>{});
  }
})();
