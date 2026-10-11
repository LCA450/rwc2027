// ═══ SHARED HELPERS FOR THE STATIC PAGES ═══
function stTable(grp){
  const s=STAND[grp];if(!s)return '';
  const hd=['hP','hW','hD','hL','hPF','hPA','hDiff','hTF','hBP','hPts'].map(k=>`<th>${tx(k)}</th>`).join('');
  const rows=s.rows.map((r,i)=>{const df=r.pf-r.pa;return `<tr class="${i<2?'q':''}"><td>${i+1}</td><td class="tm">${getFE(r.team)} ${tn(r.team)}</td><td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td><td>${r.pf}</td><td>${r.pa}</td><td>${df>0?'+':''}${df}</td><td>${r.tryKnown?r.tf:'–'}</td><td>${r.tryKnown?r.bp:'–'}</td><td><b>${r.pts}</b></td></tr>`;}).join('');
  return `<table class="st"><thead><tr><th>#</th><th class="tm"></th>${hd}</tr></thead><tbody>${rows}</tbody></table>`;
}
function scoreHtml(m){const r=m.result;return r?`<span class="res-badge${r.live?' live':''}">${r.live?tx('resLive'):tx('resFT')}</span> <b>${r.s1} – ${r.s2}</b>`:'';}
