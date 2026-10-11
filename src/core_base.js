// ── STAGE COLOURS ──
const stageColors={'Pool':'#2E9E6B','Round of 16':'#D5A64B','Quarterfinal':'#E07B39','Semifinal':'#B8456B','Bronze Final':'#4C8BA8','Final':'#8F1D2C'};
// ── FLAG HELPERS ──
function flagUrl(code){return `https://flagcdn.com/w40/${code}.png`;}
const countryCodes={'New Zealand':'nz','Australia':'au','Chile':'cl','Hong Kong China':'hk','South Africa':'za','Italy':'it','Georgia':'ge','Romania':'ro','Argentina':'ar','Fiji':'fj','Spain':'es','Canada':'ca','Ireland':'ie','Scotland':'gb-sct','Uruguay':'uy','Portugal':'pt','France':'fr','Japan':'jp','USA':'us','Samoa':'ws','England':'gb-eng','Wales':'gb-wls','Tonga':'to','Zimbabwe':'zw'};
const flagEmojis={'New Zealand':'🇳🇿','Australia':'🇦🇺','Chile':'🇨🇱','Hong Kong China':'🇭🇰','South Africa':'🇿🇦','Italy':'🇮🇹','Georgia':'🇬🇪','Romania':'🇷🇴','Argentina':'🇦🇷','Fiji':'🇫🇯','Spain':'🇪🇸','Canada':'🇨🇦','Ireland':'🇮🇪','Scotland':'🏴󠁧󠁢󠁳󠁣󠁴󠁿','Uruguay':'🇺🇾','Portugal':'🇵🇹','France':'🇫🇷','Japan':'🇯🇵','USA':'🇺🇸','Samoa':'🇼🇸','England':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','Wales':'🏴󠁧󠁢󠁷󠁬󠁳󠁿','Tonga':'🇹🇴','Zimbabwe':'🇿🇼'};
function getFlagEmoji(name){return flagEmojis[name]||'🏉';}
function getFE(n){return getFlagEmoji(n);}
function getFlag(name){
  const code=countryCodes[name];
  if(!code) return `<span style="font-size:20px;">🏉</span>`;
  return `<img class="flag-img" src="${flagUrl(code)}" onerror="this.style.display='none';this.nextSibling.style.display='inline'" alt="${name}"><span style="display:none;font-size:22px;">${getFlagEmoji(name)}</span>`;
}
const codes={'New Zealand':'NZL','Australia':'AUS','Chile':'CHI','Hong Kong China':'HKG','South Africa':'RSA','Italy':'ITA','Georgia':'GEO','Romania':'ROU','Argentina':'ARG','Fiji':'FIJ','Spain':'ESP','Canada':'CAN','Ireland':'IRE','Scotland':'SCO','Uruguay':'URU','Portugal':'POR','France':'FRA','Japan':'JPN','USA':'USA','Samoa':'SAM','England':'ENG','Wales':'WAL','Tonga':'TGA','Zimbabwe':'ZIM'};
function slot(x){return x.replace(/^1st Pool /,'1').replace(/^2nd Pool /,'2').replace(/^3rd Pool /,'3').replace(/Winner R16 \((\d)\)/,'W$1').replace(/Winner (QF|SF)(\d)/,'W$1$2').replace('Runner-up ','RU ');}
function short(n){return codes[n]||slot(n);}

// ── SCHEDULE ── Official RWC 2027 match schedule (World Rugby, Feb 2026). Kick-offs are LOCAL time and subject to change.
const VEN={PS:['Perth Stadium','Perth / Boorloo','Australia/Perth'],AO:['Adelaide Oval','Adelaide / Tarntanya','Australia/Adelaide'],BS:['Brisbane Stadium','Brisbane / Meeanjin','Australia/Brisbane'],DS:['Docklands Stadium','Melbourne / Narrm','Australia/Melbourne'],NS:['Newcastle Stadium','Newcastle / Awabakal-Worimi','Australia/Sydney'],SA:['Stadium Australia','Sydney / Wangal','Australia/Sydney'],SF:['Sydney Football Stadium','Sydney / Gadigal','Australia/Sydney'],NQ:['North Queensland Stadium','Townsville / Gurambilbarra','Australia/Brisbane']};
const MONS={Oct:9,Nov:10};
// Pool: day date|local time|pool|team1|team2|venue
const RAW_POOL=`Fri 1 Oct|18:45|A|Australia|Hong Kong China|PS
Sat 2 Oct|12:15|F|Wales|Zimbabwe|AO
Sat 2 Oct|13:15|A|New Zealand|Chile|PS
Sat 2 Oct|17:45|E|France|USA|DS
Sat 2 Oct|20:15|F|England|Tonga|BS
Sun 3 Oct|12:15|E|Japan|Samoa|NS
Sun 3 Oct|14:15|B|South Africa|Italy|AO
Sun 3 Oct|17:15|D|Scotland|Uruguay|DS
Sun 3 Oct|20:15|B|Georgia|Romania|NQ
Mon 4 Oct|14:15|C|Fiji|Spain|NS
Mon 4 Oct|17:15|D|Ireland|Portugal|SF
Mon 4 Oct|18:45|C|Argentina|Canada|BS
Fri 8 Oct|18:15|F|Wales|Tonga|DS
Fri 8 Oct|20:15|F|England|Zimbabwe|AO
Sat 9 Oct|12:15|E|USA|Samoa|PS
Sat 9 Oct|17:10|A|New Zealand|Australia|SA
Sat 9 Oct|18:45|E|France|Japan|BS
Sat 9 Oct|20:15|A|Chile|Hong Kong China|NQ
Sun 10 Oct|12:15|C|Fiji|Canada|AO
Sun 10 Oct|15:15|C|Argentina|Spain|DS
Sun 10 Oct|16:45|B|South Africa|Georgia|BS
Sun 10 Oct|17:45|D|Ireland|Scotland|PS
Mon 11 Oct|17:15|D|Uruguay|Portugal|NS
Mon 11 Oct|19:45|B|Italy|Romania|SF
Fri 15 Oct|17:15|A|New Zealand|Hong Kong China|DS
Fri 15 Oct|20:00|E|Japan|USA|AO
Fri 15 Oct|20:15|F|Tonga|Zimbabwe|NQ
Sat 16 Oct|13:15|C|Argentina|Fiji|AO
Sat 16 Oct|15:10|A|Australia|Chile|BS
Sat 16 Oct|19:45|F|England|Wales|SA
Sat 16 Oct|20:15|C|Spain|Canada|NQ
Sun 17 Oct|12:15|B|Italy|Georgia|NS
Sun 17 Oct|14:45|D|Ireland|Uruguay|DS
Sun 17 Oct|16:15|D|Scotland|Portugal|BS
Sun 17 Oct|19:45|E|France|Samoa|SF
Sun 17 Oct|19:15|B|South Africa|Romania|PS`;
// Knockout: stage|day date|local time|slot1|slot2|venue|key
const RAW_KO=`Round of 16|Sat 23 Oct|14:15|2nd Pool C|2nd Pool F|SF|R16 (1)
Round of 16|Sat 23 Oct|15:45|1st Pool A|3rd Pool C/E/F|BS|R16 (2)
Round of 16|Sat 23 Oct|19:15|1st Pool E|2nd Pool D|DS|R16 (3)
Round of 16|Sat 23 Oct|18:45|1st Pool B|3rd Pool D/E/F|PS|R16 (4)
Round of 16|Sun 24 Oct|14:15|1st Pool C|3rd Pool A/E/F|SF|R16 (5)
Round of 16|Sun 24 Oct|16:45|1st Pool D|3rd Pool B/E/F|DS|R16 (6)
Round of 16|Sun 24 Oct|18:15|2nd Pool A|2nd Pool E|BS|R16 (7)
Round of 16|Sun 24 Oct|18:45|1st Pool F|2nd Pool B|PS|R16 (8)
Quarterfinal|Sat 30 Oct|16:45|Winner R16 (2)|Winner R16 (4)|SA|QF1
Quarterfinal|Sat 30 Oct|18:45|Winner R16 (1)|Winner R16 (3)|BS|QF2
Quarterfinal|Sun 31 Oct|16:00|Winner R16 (5)|Winner R16 (6)|BS|QF3
Quarterfinal|Sun 31 Oct|20:00|Winner R16 (7)|Winner R16 (8)|SA|QF4
Semifinal|Fri 5 Nov|20:00|Winner QF1|Winner QF2|SA|SF1
Semifinal|Sat 6 Nov|20:00|Winner QF3|Winner QF4|SA|SF2
Bronze Final|Fri 12 Nov|19:45|Runner-up SF1|Runner-up SF2|SA|
Final|Sat 13 Nov|20:00|Winner SF1|Winner SF2|SA|`;
const matches=[];
RAW_POOL.split('\n').forEach(l=>{const r=l.split('|'),dd=r[0].split(' '),v=VEN[r[5]];matches.push({id:matches.length+1,team1:r[3],team2:r[4],dow:dd[0],date:dd[1]+' '+dd[2],time:r[1],venue:v[0],city:v[1],tz:v[2],vk:r[5],group:'Pool '+r[2],stage:'Pool'});});
RAW_KO.split('\n').forEach(l=>{const r=l.split('|'),dd=r[1].split(' '),v=VEN[r[5]];matches.push({id:matches.length+1,team1:r[3],team2:r[4],dow:dd[0],date:dd[1]+' '+dd[2],time:r[2],venue:v[0],city:v[1],tz:v[2],vk:r[5],group:r[0],stage:r[0],key:r[6]});});
const TOTAL = matches.length; // 52

// ── KICK-OFF TIMES (shown in Cyprus time, with the local stadium time) ──
function _parts(t,tz){const p={};new Intl.DateTimeFormat('en-GB',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}).formatToParts(new Date(t)).forEach(x=>{p[x.type]=+x.value});return p;}
function _off(t,tz){const p=_parts(t,tz);return Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute)-t;}
function utcOf(m){const [h,mi]=m.time.split(':').map(Number),[d,mo]=m.date.split(' '),want=Date.UTC(2027,MONS[mo],+d,h,mi);let t=want;for(let i=0;i<3;i++)t=want-_off(t,m.tz);return t;}

// ── INDICATIVE OUTCOME MODEL ──
// Simple rating model. Ratings are approximate team strengths used only to estimate win odds and a likely score; not official rankings.
const RATING={'New Zealand':90,'South Africa':90,'France':89,'Ireland':88,'England':86,'Argentina':84,'Scotland':82,'Australia':80,'Fiji':80,'Italy':78,'Japan':76,'Wales':74,'Georgia':74,'Samoa':73,'Tonga':72,'USA':68,'Uruguay':68,'Spain':66,'Portugal':66,'Canada':64,'Romania':62,'Chile':62,'Zimbabwe':52,'Hong Kong China':50};
// ── POOL CONTEXT ──
function dayNum(m){const [d,mo]=m.date.split(' ');return Date.UTC(2027,MONS[mo],+d)/864e5;}
function poolInfo(m,team){const ms=matches.filter(x=>x.stage==='Pool'&&(x.team1===team||x.team2===team)).sort((a,b)=>a.id-b.id),i=ms.findIndex(x=>x.id===m.id);return {n:i+1,rest:i>0?Math.round(dayNum(m)-dayNum(ms[i-1])):null};}
function ctxStat(num,lbl,col){return `<div class="h2h-stat"><div class="h2h-num"${col?` style="color:${col}"`:''}>${num}</div><div class="h2h-lbl">${lbl}</div></div>`;}
// ── HEAD TO HEAD ── Verified test results only (most recent first). addH2H(teamA,teamB,rows): each row 'year|competition|teamA points|teamB points'.
// Pairings without an entry fall back to Pool Context. More pairings can be added here as results are verified.
const H2H={};
function addH2H(a,b,raw,partial){H2H[[a,b].sort().join('|')]={a,b,partial:!!partial,rows:raw.trim().split('\n').map(l=>{const r=l.split('|');return{yr:r[0],comp:r[1],sa:+r[2],sb:+r[3]};})};}
addH2H('Ireland','Scotland',`2026|Six Nations|43|21
2025|Six Nations|32|18
2024|Six Nations|17|13
2023|Rugby World Cup|36|14
2023|Six Nations|22|7
2022|Six Nations|26|5
2021|Six Nations|27|24
2020|Six Nations|19|12
2019|Rugby World Cup|27|3
2019|Six Nations|22|13`);
addH2H('New Zealand','Australia',`2025|Rugby Championship|28|14
2025|Rugby Championship|33|24
2024|Rugby Championship|33|13
2024|Rugby Championship|31|28
2023|Test match|23|20
2023|Rugby Championship|38|7
2022|Rugby Championship|40|14`,true);
function h2hFor(m){
  const d=H2H[[m.team1,m.team2].sort().join('|')];if(!d)return null;
  const flip=d.a!==m.team1,rows=d.rows.map(r=>({yr:r.yr,comp:r.comp,s1:flip?r.sb:r.sa,s2:flip?r.sa:r.sb}));
  return{rows,w1:rows.filter(r=>r.s1>r.s2).length,dr:rows.filter(r=>r.s1===r.s2).length,w2:rows.filter(r=>r.s1<r.s2).length,partial:d.partial,avg1:rows.reduce((s,r)=>s+r.s1,0)/rows.length,avg2:rows.reduce((s,r)=>s+r.s2,0)/rows.length};
}
// ── TEAM DATA ──
const poolOf={};matches.filter(m=>m.stage==='Pool').forEach(m=>{poolOf[m.team1]=m.group;poolOf[m.team2]=m.group;});


// ── SQUADS ── Real named squads (Wikipedia squad tables, Jan–Sep 2026). Fields: Name(*=captain)|Pos|Club|Caps|Birth year. Final RWC 2027 squads are named closer to the tournament.
const SQUADS={};
function addSquad(team,coach,note,raw){SQUADS[team]={coach,note,players:raw.trim().split('\n').map(l=>{const r=l.split('|');return{name:r[0].replace('*',''),cap:r[0].includes('*'),pos:r[1],club:r[2],caps:+r[3],born:+r[4]};})};}
addSquad('England','Steve Borthwick','36-player squad named for the 2026 Six Nations (Jan 2026). Caps as of 5 Feb 2026.',`Luke Cowan-Dickie|HK|Sale Sharks|53|1993
Theo Dan|HK|Saracens|20|2000
Jamie George|HK|Saracens|105|1990
Trevor Davison|PR|Northampton Saints|3|1992
Ellis Genge|PR|Bristol Bears|75|1995
Joe Heyes|PR|Leicester Tigers|17|1999
Emmanuel Iyogun|PR|Northampton Saints|0|2000
Bevan Rodd|PR|Sale Sharks|10|2000
Vilikesa Sela|PR|Bath|0|2005
Ollie Chessum|LK|Leicester Tigers|30|2000
Arthur Clark|LK|Gloucester|1|2001
Alex Coles|LK|Northampton Saints|14|1999
Maro Itoje*|LK|Saracens|97|1994
Chandler Cunningham-South|BR|Harlequins|20|2003
Tom Curry|BR|Sale Sharks|65|1998
Ben Earl|BR|Saracens|46|1998
Greg Fisilau|BR|Exeter Chiefs|0|2003
Guy Pepper|BR|Bath|7|2003
Henry Pollock|BR|Northampton Saints|5|2005
Sam Underhill|BR|Bath|45|1996
Alex Mitchell|SH|Northampton Saints|27|1997
Ben Spencer|SH|Bath|14|1992
Jack van Poortvliet|SH|Leicester Tigers|21|2001
George Ford|FH|Sale Sharks|105|1993
Marcus Smith|FH|Harlequins|46|1999
Seb Atkinson|CE|Gloucester|2|2002
Fraser Dingwall|CE|Northampton Saints|7|1999
Max Ojomoh|CE|Bath|2|2000
Henry Slade|CE|Exeter Chiefs|74|1993
Henry Arundell|WG|Bath|11|2002
Immanuel Feyi-Waboso|WG|Exeter Chiefs|13|2002
Tommy Freeman|WG|Northampton Saints|22|2001
Cadan Murley|WG|Harlequins|4|1999
Elliot Daly|FB|Saracens|74|1992
George Furbank|FB|Northampton Saints|14|1996
Freddie Steward|FB|Leicester Tigers|41|2000`);
addSquad('France','Fabien Galthié','42-player squad plus call-ups for the 2026 Six Nations (Jan 2026). Caps as of 5 Feb 2026.',`Maxime Lamothe|HK|Bordeaux Bègles|2|1998
Julien Marchand|HK|Toulouse|48|1995
Peato Mauvaka|HK|Toulouse|42|1997
Dorian Aldegheri|PR|Toulouse|23|1993
Uini Atonio|PR|La Rochelle|68|1990
Cyril Baille|PR|Toulouse|57|1993
Jean-Baptiste Gros|PR|Toulon|40|1999
Régis Montagne|PR|Clermont|5|2000
Rodrigue Neti|PR|Toulouse|4|1995
Dany Priso|PR|Toulon|18|1994
Tevita Tatafu|PR|Bayonne|2|2002
Georges-Henri Colombe|PR|Toulouse|9|1998
Hugo Auradou|LK|Pau|10|2003
Thibaud Flament|LK|Toulouse|34|1997
Mickaël Guillard|LK|Lyon|13|2000
Emmanuel Meafou|LK|Toulouse|11|1998
Tom Staniforth|LK|Castres|0|1994
Cameron Woki|LK|Bordeaux Bègles|31|1998
Joshua Brennan|LK|Toulouse|2|2001
Paul Boudehent|BR|La Rochelle|21|1999
François Cros|BR|Toulouse|39|1994
Alexandre Fischer|BR|Bayonne|3|1998
Oscar Jégou|BR|La Rochelle|9|2003
Anthony Jelonch|BR|Toulouse|35|1996
Temo Matiu|BR|Bordeaux Bègles|0|2001
Lenni Nouchi|BR|Montpellier|2|2003
Charles Ollivon|BR|Toulon|48|1993
Alexandre Roumat|BR|Toulouse|10|1997
Thibault Daubagna|SH|Pau|2|1994
Antoine Dupont*|SH|Toulouse|59|1996
Baptiste Serin|SH|Toulon|46|1994
Matthieu Jalibert|FH|Bordeaux Bègles|35|1998
Ugo Seunes|FH|Racing 92|0|2000
Fabien Brau-Boirie|CE|Pau|0|2005
Nicolas Depoortère|CE|Bordeaux Bègles|7|2003
Kalvin Gourgues|CE|Toulouse|1|2005
Yoram Moefana|CE|Bordeaux Bègles|36|2000
Noah Nene|CE|Stade Français|0|2004
Théo Attissogbé|WG|Pau|8|2004
Louis Bielle-Biarrey|WG|Bordeaux Bègles|22|2003
Gaël Dréan|WG|Toulon|0|2000
Aaron Grandidier-Nkanang|WG|Pau|0|2000
Grégoire Arfeuil|FB|Pau|0|2004
Romain Buros|FB|Bordeaux Bègles|1|1997
Thomas Ramos|FB|Toulouse|47|1995`);
addSquad('Ireland','Andy Farrell','37-player squad plus replacements for the 2026 Six Nations (Jan 2026). Caps as of 5 Feb 2026.',`Ronan Kelleher|HK|Leinster|43|1998
Dan Sheehan|HK|Leinster|35|1998
Tom Stewart|HK|Ulster|4|2001
Jack Boyle|PR|Leinster|4|2002
Michael Milne|PR|Munster|2|1999
Jeremy Loughman|PR|Munster|5|1995
Tom O'Toole|PR|Ulster|17|1998
Finlay Bealham|PR|Connacht|54|1991
Tom Clarkson|PR|Leinster|10|2000
Tadhg Furlong|PR|Leinster|82|1992
Billy Bohan|PR|Connacht|0|2005
Thomas Ahern|LK|Munster|2|2000
Tadhg Beirne|LK|Munster|65|1992
James Ryan|LK|Leinster|76|1996
Edwin Edogbo|LK|Munster|0|2002
Joe McCarthy|LK|Leinster|19|2001
Cormac Izuchukwu|LK|Ulster|3|2000
Jack Conan|BR|Leinster|55|1992
Caelan Doris*|BR|Leinster|55|1998
Cian Prendergast|BR|Connacht|8|2000
Nick Timoney|BR|Ulster|6|1995
Josh van der Flier|BR|Leinster|75|1993
Craig Casey|SH|Munster|24|1999
Jamison Gibson-Park|SH|Leinster|46|1992
Nathan Doak|SH|Ulster|0|2001
Harry Byrne|FH|Leinster|4|1999
Jack Crowley|FH|Munster|30|2000
Ciarán Frawley|FH|Leinster|9|1997
Sam Prendergast|FH|Leinster|13|2003
Bundee Aki|CE|Connacht|68|1990
Stuart McCloskey|CE|Ulster|23|1992
Garry Ringrose|CE|Leinster|69|1995
Tom Farrell|CE|Munster|2|1993
Jude Postlethwaite|CE|Ulster|0|2002
James Lowe|WG|Leinster|43|1992
Tommy O'Brien|WG|Leinster|6|1998
Jacob Stockdale|WG|Ulster|40|1996
Robert Baloucoune|WG|Ulster|4|1997
Jamie Osborne|FB|Leinster|10|2001
Hugo Keenan|FB|Leinster|46|1996`);
addSquad('Italy','Gonzalo Quesada','33-player squad plus replacements for the 2026 Six Nations (Jan 2026). Caps as of 5 Feb 2026.',`Tommaso Di Bartolomeo|HK|Zebre Parma|6|2001
Pablo Dimcheff|HK|Colomiers|3|1999
Giacomo Nicotera|HK|Stade Français|36|1996
Simone Ferrari|PR|Benetton|69|1994
Danilo Fischetti|PR|Northampton Saints|58|1998
Muhamed Hasa|PR|Zebre Parma|4|2001
Marco Riccioni|PR|Saracens|36|1997
Mirco Spagnolo|PR|Benetton|19|2001
Giosuè Zilocchi|PR|Benetton|25|1997
Niccolò Cannone|LK|Benetton|58|1998
Riccardo Favretto|LK|Benetton|8|2001
Federico Ruzza|LK|Benetton|67|1994
Andrea Zambonin|LK|Exeter Chiefs|14|2000
Lorenzo Cannone|BR|Benetton|33|2001
Alessandro Izekor|BR|Benetton|8|2000
Michele Lamaro*|BR|Benetton|49|1998
Samuele Locatelli|BR|Zebre Parma|0|2001
David Odiase|BR|Zebre Parma|3|2003
Manuel Zuliani|BR|Benetton|38|2000
Alessandro Fusco|SH|Zebre Parma|20|1999
Martin Page-Relo|SH|Bordeaux|21|1999
Stephen Varney|SH|Exeter Chiefs|36|2001
Alessandro Garbisi|SH|Benetton|20|2002
Giacomo Da Re|FH|Zebre Parma|6|1999
Paolo Garbisi|FH|Toulon|49|2000
Ignacio Brex|CE|Toulon|49|1992
Leonardo Marin|CE|Benetton|17|2002
Damiano Mazza|CE|Zebre Parma|0|1999
Tommaso Menoncello|CE|Benetton|34|2002
Paolo Odogwu|CE|Benetton|7|1997
Monty Ioane|WG|Lyon|42|1994
Louis Lynagh|WG|Benetton|9|2000
Edoardo Todaro|WG|Northampton Saints|1|2006
Matt Gallagher|FB|Benetton|3|1996
Lorenzo Pani|FB|Zebre Parma|8|2002`);
addSquad('Scotland','Gregor Townsend','40-player squad plus additions for the 2026 Six Nations (Jan 2026). Caps as of 5 Feb 2026.',`Ewan Ashman|HK|Edinburgh|32|2000
Dave Cherry|HK|Vannes|16|1991
George Turner|HK|Harlequins|50|1992
Gregor Hiddleston|HK|Glasgow Warriors|0|2002
Zander Fagerson|PR|Glasgow Warriors|76|1996
Nathan McBeth|PR|Glasgow Warriors|5|1998
Elliot Millar-Mills|PR|Northampton Saints|11|1992
D'Arcy Rae|PR|Edinburgh|5|1994
Pierre Schoeman|PR|Edinburgh|44|1994
Rory Sutherland|PR|Glasgow Warriors|46|1992
Gregor Brown|LK|Glasgow Warriors|12|2001
Alex Craig|LK|Glasgow Warriors|6|1997
Scott Cummings|LK|Glasgow Warriors|45|1996
Grant Gilchrist|LK|Edinburgh|83|1990
Jonny Gray|LK|Bordeaux|81|1994
Max Williamson|LK|Glasgow Warriors|9|2002
Josh Bayliss|BR|Bath|14|1997
Magnus Bradbury|BR|Edinburgh|21|1995
Rory Darge|BR|Glasgow Warriors|34|2000
Jack Dempsey|BR|Glasgow Warriors|29|1994
Freddy Douglas|BR|Edinburgh|1|2005
Matt Fagerson|BR|Glasgow Warriors|59|1998
Liam McConnell|BR|Edinburgh|1|2004
Jamie Ritchie|BR|Perpignan|61|1996
Jamie Dobie|SH|Glasgow Warriors|17|2001
George Horne|SH|Glasgow Warriors|40|1995
Ben White|SH|Toulon|31|1998
Gus Warr|SH|Sale Sharks|2|1999
Fergus Burke|FH|Saracens|3|1999
Adam Hastings|FH|Glasgow Warriors|35|1996
Finn Russell|FH|Bath|89|1992
Rory Hutchinson|CE|Northampton Saints|11|1996
Huw Jones|CE|Glasgow Warriors|58|1993
Tom Jordan|CE|Bristol Bears|12|1998
Stafford McDowall|CE|Glasgow Warriors|16|1998
Sione Tuipulotu*|CE|Glasgow Warriors|33|1997
Darcy Graham|WG|Edinburgh|50|1997
Kyle Rowe|WG|Glasgow Warriors|17|1998
Kyle Steyn|WG|Glasgow Warriors|28|1994
Duhan van der Merwe|WG|Edinburgh|52|1995
Blair Kinghorn|FB|Toulouse|62|1997
Ollie Smith|FB|Glasgow Warriors|12|2000`);
addSquad('Wales','Steve Tandy','38-player squad plus additions for the 2026 Six Nations (Jan 2026). Caps as of 5 Feb 2026.',`Liam Belcher|HK|Cardiff|4|1996
Ryan Elias|HK|Scarlets|44|2000
Dewi Lake*|HK|Ospreys|26|1999
Keiron Assiratti|PR|Cardiff|19|1997
Rhys Carré|PR|Saracens|23|1998
Tomas Francis|PR|Provence|77|1992
Archie Griffin|PR|Bath|11|2001
Nicky Smith|PR|Leicester Tigers|58|1994
Gareth Thomas|PR|Ospreys|44|1993
Sam Wainwright|PR|Cardiff|4|1998
Adam Beard|LK|Montpellier|61|1996
Ben Carter|LK|Dragons|14|2001
Dafydd Jenkins|LK|Exeter Chiefs|26|2002
Freddie Thomas|LK|Gloucester|7|2001
Rhys Davies|LK|Ospreys|4|1998
James Botham|BR|Cardiff|18|1998
Olly Cracknell|BR|Leicester Tigers|2|1994
Harri Deaves|BR|Ospreys|1|2001
Alex Mann|BR|Cardiff|11|2002
Josh Macleod|BR|Scarlets|4|1996
Taine Plumtree|BR|Scarlets|11|2000
Aaron Wainwright|BR|Dragons|62|1997
Kieran Hardy|SH|Ospreys|28|1995
Reuben Morgan-Williams|SH|Ospreys|2|1998
Tomos Williams|SH|Gloucester|67|1995
Sam Costelow|FH|Scarlets|19|2001
Dan Edwards|FH|Ospreys|7|2003
Jarrod Evans|FH|Harlequins|14|1996
Joe Hawkins|CE|Scarlets|7|2002
Louie Hennessey|CE|Bath|0|2004
Eddie James|CE|Scarlets|4|2002
Ben Thomas|CE|Cardiff|17|1998
Owen Watkin|CE|Ospreys|43|1996
Josh Adams|WG|Cardiff|65|1995
Ellis Mee|WG|Scarlets|8|2003
Mason Grady|WG|Cardiff|15|2002
Louis Rees-Zammit|WG|Bristol Bears|35|2001
Tom Rogers|WG|Scarlets|13|1998
Gabriel Hamer-Webb|WG|Leicester Tigers|0|2000
Blair Murray|FB|Scarlets|14|2001`);
addSquad('Australia','Les Kiss','34-player squad named 19 Aug 2026 for the tour of Argentina. Caps as of 29 Aug 2026. Allan Alaalatoa and Harry Wilson both captained on tour.',`Josh Nasser|HK|Reds|15|1999
Brandon Paenga-Amosa|HK|Force|29|1995
Billy Pollard|HK|Brumbies|22|2001
Isaac Aedo Kailea|PR|Waratahs|8|2000
Allan Alaalatoa*|PR|Brumbies|92|1994
Angus Bell|PR|Waratahs|55|2000
Massimo de Lutiis|PR|Reds|1|2003
Aidan Ross|PR|Reds|5|1995
Taniela Tupou|PR|Racing 92|72|1996
Josh Canham|LK|Reds|6|2001
Lukhan Salakaia-Loto|LK|Reds|46|1996
Lachlan Shaw|LK|Brumbies|3|2003
Jeremy Williams|LK|Force|30|2000
Charlie Cale|BR|Brumbies|4|2000
Tom Hooper|BR|Exeter Chiefs|23|2001
Fraser McReight|BR|Reds|44|1999
Carlo Tizzano|BR|Force|16|2000
Rob Valetini|BR|Brumbies|66|1998
Harry Wilson*|BR|Reds|41|1999
Ryan Lonergan|SH|Brumbies|10|1998
Tate McDermott|SH|Reds|55|1998
Kalani Thomas|SH|Reds|1|2002
Ben Donaldson|FH|Force|23|1999
Carter Gordon|FH|Reds|11|2001
Declan Meredith|FH|Brumbies|3|1999
Isaac Henry|CE|Reds|2|1999
Len Ikitau|CE|Brumbies|53|1998
Hunter Paisami|CE|Reds|37|1999
Joseph-Aukuso Sua'ali'i|CE|Waratahs|22|2003
Filipo Daugunu|WG|Reds|23|1995
Max Jorgensen|WG|Waratahs|25|2004
Dylan Pietsch|WG|Force|11|1998
Harry Potter|WG|Waratahs|14|1997
Jock Campbell|FB|Reds|6|1995
Tom Wright|FB|Brumbies|48|1997`);
addSquad('Argentina','Felipe Contepomi','36-player squad named 17 Aug 2026 for the series against Australia. Caps as of 29 Aug 2026.',`Leonel Oviedo|HK|Western Force|1|1998
Ignacio Ruiz|HK|Perpignan|31|2001
Martín Vaca|HK|Capibaras XV|0|2001
Pedro Delgado|PR|Harlequins|11|1997
Rodrigo Martínez|PR|Dragons|3|1998
Francisco Moreno|PR|Tarucas|1|2002
Tomas Rapetti|PR|Toulouse|7|2005
Mayco Vivas|PR|Oyonnax|43|1998
Boris Wenger|PR|Harlequins|9|2002
Juan Martín Scelzo|PR|Stade Français|1|2002
Efraín Elías|LK|Toulouse|4|2004
Tomás Lavanini|LK|Highlanders|92|1993
Franco Molina|LK|Newcastle Red Bulls|21|1997
Guido Petti|LK|Harlequins|102|1994
Facundo Cardozo|BR|Tarucas|0|1995
Benjamín Grondona|BR|Bristol Bears|3|2003
Pablo Matera*|BR|Tochigi Honda Heat|125|1993
Joaquín Moro|BR|Leicester Tigers|6|2001
Juan Penoucos|BR|Pampas XV|1|2004
Agustín Sarelli|BR|Tarucas|0|2004
Simon Benitez Cruz|SH|Newcastle Red Bulls|13|1999
Gonzalo Bertranou|SH|California Legion|68|1993
Agustín Moyano|SH|Western Force|10|2001
Gerónimo Prisciantelli|FH|Racing 92|5|1999
Nicolás Roger|FH|Dogos XV|3|2000
Lucio Cinti|CE|Saracens|43|2000
Agustín Fraga|CE|Pampas XV|0|2002
Matías Moroni|CE|Bristol Bears|98|1991
Benjamín Ordiz|CE|Capibaras XV|0|2006
Faustino Sánchez Valarolo|CE|Dogos XV|3|2004
Rodrigo Isgró|WG|Harlequins|18|1999
Ignacio Mendy|WG|Benetton|6|2000
Santiago Pernas|WG|Pampas XV|1|2003
Santiago Carreras|FB|Bath|69|1998
Mateo Soler|FB|Dogos XV|0|2003
Tobías Wade|FB|Pampas XV|0|1999`);
addSquad('New Zealand','Dave Rennie','44-player squad named 27 Jul 2026 for the tour of South Africa, with later call-ups. Caps as of the first tour match (7 Aug 2026).',`Asafo Aumua|HK|Hurricanes|24|1997
Bradley Slater|HK|Blues|0|1998
Samisoni Taukei'aho|HK|Chiefs|44|1997
Codie Taylor|HK|Crusaders|111|1991
George Bower|PR|Crusaders|26|1992
Ethan de Groot|PR|Highlanders|44|1998
Siale Lauaki|PR|Hurricanes|0|2003
Tyrel Lomax|PR|Hurricanes|53|1996
Saula Ma'u|PR|Highlanders|0|2000
Fletcher Newell|PR|Crusaders|39|2000
Xavier Numia|PR|Hurricanes|3|1998
Pasilio Tosi|PR|Hurricanes|17|1998
Ofa Tu'ungafasi|PR|Blues|68|1992
Sam Darry|LK|Blues|10|2000
Jamie Hannah|LK|Crusaders|1|2002
Fabian Holland|LK|Highlanders|14|2002
Josh Lord|LK|Chiefs|16|2001
Patrick Tuipulotu|LK|Blues|58|1993
Tupou Vaa'i|LK|Chiefs|49|2000
Ethan Blackadder|BR|Crusaders|15|1995
Luke Jacobson|BR|Chiefs|29|1997
Peter Lakai|BR|Hurricanes|12|2003
Simon Parker|BR|Chiefs|10|2000
Ardie Savea*|BR|Moana Pasifika|111|1993
Wallace Sititi|BR|Chiefs|21|2002
Semisi Tupou Ta'eiloa|BR|Moana Pasifika|0|2003
Noah Hotham|SH|Crusaders|3|2003
Kyle Preston|SH|Crusaders|3|1999
Cortez Ratima|SH|Chiefs|24|2001
Cam Roigard|SH|Hurricanes|22|2000
Beauden Barrett|FH|Blues|144|1991
Josh Jacomb|FH|Chiefs|0|2001
Ruben Love|FH|Hurricanes|10|2001
Damian McKenzie|FH|Chiefs|79|1995
Richie Mo'unga|FH|Crusaders|56|1994
Jordie Barrett|CE|Hurricanes|83|1997
Anton Lienert-Brown|CE|Chiefs|92|1995
Quinn Tupaea|CE|Chiefs|28|1999
Timoci Tavatavanawai|CE|Highlanders|2|1998
Leroy Carter|WG|Chiefs|9|1999
Fehi Fineanganofo|WG|Hurricanes|1|2002
Rieko Ioane|WG|Blues|88|1997
Josh Moorby|WG|Hurricanes|3|1998
Emoni Narawa|WG|Chiefs|4|1999
Will Jordan|FB|Crusaders|59|1998`);
addSquad('South Africa','Rassie Erasmus','43-player squad named 22 Jul 2026 for the Argentina test and four tests against New Zealand. Caps as of 22 Aug 2026.',`Deon Fourie|HK|Stormers|13|1986
Johan Grobbelaar|HK|Bulls|10|1997
Malcolm Marx|HK|Kubota Spears|89|1994
Jan-Hendrik Wessels|HK|Bulls|13|2001
Thomas du Toit|PR|Sharks|34|1995
Wilco Louw|PR|Stormers|31|1994
Ox Nche|PR|Sharks|48|1995
Zachary Porthen|PR|Stormers|6|2004
Carlü Sadie|PR|Bordeaux Bègles|1|1997
Gerhard Steenekamp|PR|Bulls|19|1997
Boan Venter|PR|Lions|10|1997
Lood de Jager|LK|Wild Knights|74|1992
Eben Etzebeth|LK|Sharks|142|1991
Franco Mostert|LK|Honda Heat|84|1990
Ruan Nortjé|LK|Kubota Spears|20|1998
Cobus Wiese|LK|Bulls|5|1997
Paul de Villiers|BR|Stormers|3|2003
Ben-Jason Dixon|BR|Stormers|11|1998
Pieter-Steph du Toit|BR|Toyota Verblitz|98|1992
Cameron Hanekom|BR|Bulls|3|2002
Siya Kolisi*|BR|Stormers|104|1991
Elrigh Louw|BR|Bulls|15|1999
Vincent Tshituka|BR|Sharks|2|1998
Marco van Staden|BR|Bulls|36|1995
Jasper Wiese|BR|Urayasu D-Rocks|45|1995
Herschel Jantjies|SH|Bayonnais|25|1996
Cobus Reinach|SH|Stormers|53|1990
Morné van den Berg|SH|Lions|7|1997
Grant Williams|SH|Kobelco Kobe Steelers|30|1996
Sacha Feinberg-Mngomezulu|FH|Stormers|20|2002
Manie Libbok|FH|Kintetsu Liners|30|1997
Vusi Moyo|FH|Sharks|1|2006
Handré Pollard|FH|Bulls|87|1994
Damian de Allende|CE|Saitama Wild Knights|99|1991
André Esterhuizen|CE|Sharks|31|1994
Jesse Kriel|CE|Yokohama Canon Eagles|90|1994
Kurt-Lee Arendse|WG|Sagamihara Dynaboars|32|1996
Ethan Hooker|WG|Sharks|10|2003
Cheslin Kolbe|WG|Stormers|50|1993
Canan Moodie|WG|Bulls|25|2002
Edwill van der Merwe|WG|Sharks|7|1996
Aphelele Fassi|FB|Toshiba Brave Lupus Tokyo|18|1998
Quan Horn|FB|Lions|2|2001
Damian Willemse|FB|Stormers|52|1998`);
const POS=['HK','PR','LK','BR','SH','FH','CE','WG','FB'],POSN={HK:'Hooker',PR:'Prop',LK:'Lock',BR:'Back row',SH:'Scrum-half',FH:'Fly-half',CE:'Centre',WG:'Wing',FB:'Fullback'},POSC={HK:'pos-gk',PR:'pos-gk',LK:'pos-def',BR:'pos-def',SH:'pos-mid',FH:'pos-mid',CE:'pos-fwd',WG:'pos-fwd',FB:'pos-fwd'};
function capOf(t){const s=SQUADS[t];if(!s)return null;const c=s.players.find(p=>p.cap);return c?{n:c.name,c:`${t} captain · ${c.caps} caps`}:null;}

const stadiumFacts={
  'Stadium Australia':{cap:'~83,500',fact:"Sydney's Olympic stadium. Hosted the 2003 Rugby World Cup final and will stage the 2027 semi-finals, bronze final and final."},
  'Sydney Football Stadium':{cap:'~42,500',fact:"Rebuilt and reopened in 2022. A compact, steep-sided rectangular stadium in central Sydney."},
  'Brisbane Stadium':{cap:'~52,500',fact:"Rectangular stadium at Suncorp, a home of Queensland rugby union and league. Hosts two quarter-final matches."},
  'Docklands Stadium':{cap:'~53,000',fact:"Retractable-roof stadium on Melbourne's Docklands waterfront, so weather will not be a factor."},
  'Perth Stadium':{cap:'~60,000',fact:"Opened in 2018 on the Swan River. Stages the opening match of the tournament."},
  'Adelaide Oval':{cap:'~53,500',fact:"A cricket and Australian football ground a short walk from the centre of Adelaide."},
  'Newcastle Stadium':{cap:'~33,000',fact:"A rectangular stadium in Newcastle, home to the Knights in rugby league."},
  'North Queensland Stadium':{cap:'~25,000',fact:"Opened in 2020 in Townsville. The smallest venue of the tournament and the furthest north."},
};
