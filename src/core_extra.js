// ═══════════════ EXTRAS: languages, time zones, calendar, results, standings, bracket ═══════════════
// Pure logic (no DOM) so the app, the static pages and the admin page share it.
const LANGS={en:['English','en-GB'],es:['Español','es-ES'],fr:['Français','fr-FR'],it:['Italiano','it-IT'],ja:['日本語','ja-JP'],pt:['Português','pt-PT']};
let LANG='en';
function setLang(l){LANG=LANGS[l]?l:'en';}
const UI={};
// key|English|Spanish|French|Italian|Japanese|Portuguese  ({x} = placeholder)
`tabMatches|Matches|Partidos|Matchs|Partite|試合|Jogos
tabPools|Pools|Grupos|Poules|Gironi|プール|Grupos
tabStadiums|Stadiums|Estadios|Stades|Stadi|スタジアム|Estádios
tabTeams|Teams|Equipos|Équipes|Squadre|チーム|Equipas
siteTitle|Rugby World Cup 2027 · Fan Navigator|Copa Mundial de Rugby 2027 · Navegador para aficionados|Coupe du monde de rugby 2027 · Navigateur pour fans|Coppa del Mondo di rugby 2027 · Navigatore per tifosi|ラグビーワールドカップ2027 · ファンナビゲーター|Mundial de Râguebi 2027 · Navegador para adeptos
disclaimer|Unofficial fan site. Not affiliated with, endorsed by or connected to World Rugby or Rugby World Cup Limited. All trademarks belong to their owners.|Sitio de aficionados no oficial. No está afiliado, respaldado ni conectado con World Rugby ni Rugby World Cup Limited. Todas las marcas pertenecen a sus propietarios.|Site de fans non officiel. Sans lien avec World Rugby ou Rugby World Cup Limited, ni approuvé par eux. Toutes les marques appartiennent à leurs propriétaires.|Sito non ufficiale dei tifosi. Non affiliato, approvato o collegato a World Rugby o Rugby World Cup Limited. Tutti i marchi appartengono ai rispettivi proprietari.|非公式のファンサイトです。World RugbyおよびRugby World Cup Limitedとは提携・承認・関係はありません。商標はすべて各権利者に帰属します。|Site de adeptos não oficial. Não é afiliado, aprovado nem ligado à World Rugby ou à Rugby World Cup Limited. Todas as marcas pertencem aos respetivos proprietários.
stPool|Pool|Grupo|Poule|Girone|プール|Grupo
stR16|Round of 16|Octavos de final|Huitièmes de finale|Ottavi di finale|ベスト16|Oitavos de final
stQF|Quarterfinal|Cuartos de final|Quarts de finale|Quarti di finale|準々決勝|Quartos de final
stSF|Semifinal|Semifinal|Demi-finale|Semifinale|準決勝|Meias-finais
stBronze|Bronze Final|Final de bronce|Match pour la 3e place|Finale per il 3º posto|3位決定戦|Disputa do 3.º lugar
stFinal|Final|Final|Finale|Finale|決勝|Final
lgR16|R16|1/8|1/8|1/8|16強|1/8
lgQF|QF|1/4|1/4|1/4|8強|1/4
lgSF|SF|1/2|1/2|1/2|4強|1/2
lgBronze|Bronze|Bronce|Bronze|Bronzo|銅|Bronze
poolWord|Pool|Grupo|Poule|Girone|プール|Grupo
dragHint|↕ Drag each ring · Scroll · Click to select|↕ Arrastra cada anillo · Rueda · Clic para elegir|↕ Faites glisser chaque anneau · Molette · Clic pour choisir|↕ Trascina ogni anello · Rotella · Clic per scegliere|↕ リングをドラッグ · スクロール · クリックで選択|↕ Arraste cada anel · Roda do rato · Clique para escolher
poolRound|Pool / Round|Grupo / Ronda|Poule / Phase|Girone / Fase|プール / ラウンド|Grupo / Fase
labDate|Date|Fecha|Date|Data|日付|Data
labVenue|Venue|Estadio|Stade|Stadio|会場|Estádio
labCity|City|Ciudad|Ville|Città|都市|Cidade
yourTime|your time|tu hora|votre heure|il tuo orario|お住まいの時間|a sua hora
stadiumTime|Stadium time|Hora del estadio|Heure au stade|Ora allo stadio|現地時間|Hora no estádio
prev|← Prev|← Anterior|← Préc.|← Prec.|← 前へ|← Anterior
next|Next →|Siguiente →|Suiv. →|Succ. →|次へ →|Seguinte →
matchOf|Match {n} of {t}|Partido {n} de {t}|Match {n} sur {t}|Partita {n} di {t}|第{n}試合 / 全{t}試合|Jogo {n} de {t}
predTitle|🔮 Indicative Outcome|🔮 Resultado estimado|🔮 Résultat estimé|🔮 Esito stimato|🔮 予想結果(目安)|🔮 Resultado estimado
draw|Draw|Empate|Nul|Pareggio|引き分け|Empate
ptsTitle|🏉 Points Predicted|🏉 Puntos previstos|🏉 Points prévus|🏉 Punti previsti|🏉 予想得点|🏉 Pontos previstos
mostLikely|Most likely|Más probable|Le plus probable|Più probabile|最も可能性が高い|Mais provável
watchFor|⭐ Watch For|⭐ A seguir|⭐ À suivre|⭐ Da seguire|⭐ 注目|⭐ A acompanhar
ctxTitle|📊 Pool Context|📊 Contexto del grupo|📊 Contexte de la poule|📊 Contesto del girone|📊 プールの状況|📊 Contexto do grupo
lastMeetings|📊 Last {n} meetings|📊 Últimos {n} enfrentamientos|📊 {n} derniers face-à-face|📊 Ultimi {n} precedenti|📊 直近{n}回の対戦|📊 Últimos {n} confrontos
winsOf|{x} wins|Victorias {x}|Victoires {x}|Vittorie {x}|{x}の勝利|Vitórias {x}
draws|Draws|Empates|Nuls|Pareggi|引き分け|Empates
form|{a} form v {b}|Racha de {a} contra {b}|Forme de {a} contre {b}|Forma di {a} contro {b}|{a}の対{b}成績|Forma de {a} contra {b}
avgScore|Average score|Marcador medio|Score moyen|Punteggio medio|平均スコア|Resultado médio
h2hPartial|{n} meetings loaded ({a} to {b}). Earlier results not loaded yet.|{n} enfrentamientos cargados ({a} a {b}). Resultados anteriores aún no cargados.|{n} rencontres chargées ({a} à {b}). Résultats antérieurs pas encore chargés.|{n} precedenti caricati ({a}-{b}). Risultati precedenti non ancora caricati.|{n}試合を登録済み({a}〜{b}年)。それ以前の結果は未登録です。|{n} jogos carregados ({a} a {b}). Resultados anteriores ainda não carregados.
h2hNone|Meeting history for this pairing is not loaded yet.|El historial de este cruce aún no está cargado.|L'historique de cette affiche n'est pas encore chargé.|Lo storico di questo confronto non è ancora caricato.|この対戦の過去の結果はまだ登録されていません。|O histórico deste confronto ainda não está carregado.
restWord|{x} rest|Descanso {x}|Repos {x}|Riposo {x}|休養{x}|Descanso {x}
daysN|{n} days|{n} días|{n} jours|{n} giorni|{n}日|{n} dias
opener|Opener|Debut|Premier match|Esordio|初戦|Estreia
thisRound|This round|Esta ronda|Ce tour|Questo turno|このラウンド|Esta fase
winnerPlays|Winner plays|Juega el ganador|Le vainqueur joue|Gioca il vincitore|勝者の次戦|Joga o vencedor
nextDate|Next date|Próxima fecha|Prochaine date|Prossima data|次の日程|Próxima data
lastMatch|Last match|Último partido|Dernier match|Ultima partita|最終戦|Último jogo
placeAtStake|Place at stake|Puesto en juego|Place en jeu|Posto in palio|懸かる順位|Lugar em disputa
thirdPlace|3rd|3.º|3e|3º|3位|3.º
venueWord|Venue|Estadio|Stade|Stadio|会場|Estádio
ctxPool|{t1} play their {o1} pool game and {t2} their {o2}. The top two in each pool, plus the four best third-placed teams, reach the Round of 16.|{t1} juega su {o1} partido de grupo y {t2}, el {o2}. Los dos primeros de cada grupo, más los cuatro mejores terceros, pasan a octavos de final.|{t1} dispute son {o1} match de poule et {t2} son {o2}. Les deux premiers de chaque poule, plus les quatre meilleurs troisièmes, atteignent les huitièmes de finale.|{t1} gioca la sua {o1} partita del girone e {t2} la sua {o2}. Le prime due di ogni girone, più le quattro migliori terze, accedono agli ottavi di finale.|{t1}はプール戦{o1}試合目、{t2}は{o2}試合目です。各プール上位2チームと、成績上位の3位4チームがベスト16に進みます。|{t1} joga o seu {o1} jogo do grupo e {t2} o seu {o2}. Os dois primeiros de cada grupo, mais os quatro melhores terceiros, chegam aos oitavos de final.
ctxNext|Winner advances to: {stage} (match #{id}) · {venue} · {date}|El ganador avanza a: {stage} (partido n.º {id}) · {venue} · {date}|Le vainqueur avance vers : {stage} (match n° {id}) · {venue} · {date}|Il vincitore passa a: {stage} (partita n. {id}) · {venue} · {date}|勝者の進出先: {stage}(第{id}試合)· {venue} · {date}|O vencedor avança para: {stage} (jogo n.º {id}) · {venue} · {date}
ctxFinal|The winner lifts the Webb Ellis Cup at Stadium Australia in Sydney.|El ganador levanta la Copa Webb Ellis en el Stadium Australia de Sídney.|Le vainqueur soulève la coupe Webb Ellis au Stadium Australia de Sydney.|Il vincitore alza la Coppa Webb Ellis allo Stadium Australia di Sydney.|優勝チームはシドニーのスタジアム・オーストラリアでウェブ・エリス・カップを掲げます。|O vencedor ergue a Taça Webb Ellis no Stadium Australia, em Sydney.
ctxBronze|The two beaten semi-finalists play for third place, one day before the final.|Los dos semifinalistas derrotados juegan por el tercer puesto, un día antes de la final.|Les deux demi-finalistes battus jouent la troisième place, la veille de la finale.|Le due semifinaliste sconfitte giocano per il terzo posto, il giorno prima della finale.|準決勝で敗れた2チームが、決勝の前日に3位をかけて戦います。|As duas equipas derrotadas nas meias-finais disputam o terceiro lugar, um dia antes da final.
koVerdict|The teams in this match are set by final pool standings.|Los equipos de este partido los decide la clasificación final de los grupos.|Les équipes de ce match seront déterminées par le classement final des poules.|Le squadre di questa partita saranno decise dalla classifica finale dei gironi.|この試合の対戦カードは、プール戦の最終順位で決まります。|As equipas deste jogo dependem da classificação final dos grupos.
koScore|Teams to be confirmed|Equipos por confirmar|Équipes à confirmer|Squadre da confermare|対戦チーム未定|Equipas por confirmar
koClub|Knockout slot|Cruce eliminatorio|Rencontre à élimination directe|Incrocio a eliminazione|決勝トーナメント枠|Jogo a eliminar
noSquadShort|Squad not loaded yet|Plantilla aún no cargada|Effectif pas encore chargé|Rosa non ancora caricata|メンバー未登録|Plantel ainda não carregado
captain|captain|capitán|capitaine|capitano|キャプテン|capitão
capsWord|caps|caps|sélections|presenze|キャップ|internacionalizações
v30|{fav} should win comfortably. {und} will aim to hold the score down and make the most of their chances.|{fav} debería ganar con comodidad. {und} intentará limitar el marcador y aprovechar sus oportunidades.|{fav} devrait s'imposer assez facilement. {und} cherchera à limiter l'écart et à saisir ses occasions.|{fav} dovrebbe vincere con margine. {und} cercherà di limitare il passivo e sfruttare le occasioni.|{fav}が余裕を持って勝つ見込みです。{und}は失点を抑え、数少ないチャンスを生かしたいところです。|{fav} deve vencer com facilidade. {und} tentará limitar o resultado e aproveitar as oportunidades.
v18|{fav} are clear favourites, but {und} can make it awkward if the forward battle stays tight.|{fav} es claro favorito, pero {und} puede complicarlo si el duelo de delanteros se mantiene igualado.|{fav} est nettement favori, mais {und} peut le gêner si le combat des avants reste serré.|{fav} parte nettamente favorita, ma {und} può metterla in difficoltà se la mischia resta equilibrata.|{fav}が明確な優勢ですが、FWの攻防が拮抗すれば{und}も食い下がれます。|{fav} é claro favorito, mas {und} pode complicar se o duelo dos avançados se mantiver equilibrado.
v8|{fav} have the edge on form and depth. A strong start from {und} could keep it close.|{fav} lleva ventaja en forma y fondo de plantilla. Un buen arranque de {und} podría mantener el partido abierto.|{fav} a l'avantage en forme et en profondeur d'effectif. Un bon début de {und} pourrait garder le match serré.|{fav} ha il vantaggio per forma e profondità. Un buon avvio di {und} potrebbe tenere la gara aperta.|{fav}が調子と選手層で上回ります。{und}が好スタートを切れば接戦になる可能性があります。|{fav} tem vantagem em forma e profundidade. Um bom arranque de {und} pode manter o jogo equilibrado.
v3|A close call. {fav} edge it on paper, but this could go either way.|Partido muy parejo. {fav} parte con una ligera ventaja sobre el papel, pero puede caer de cualquier lado.|Match serré. {fav} a un léger avantage sur le papier, mais tout est possible.|Gara equilibrata. {fav} ha un lieve vantaggio sulla carta, ma può finire in qualsiasi modo.|接戦が予想されます。{fav}が紙の上ではわずかに優位ですが、どちらに転ぶか分かりません。|Jogo muito equilibrado. {fav} tem ligeira vantagem no papel, mas pode cair para qualquer lado.
v0|Too close to call. Expect a tight, physical match decided by small margins.|Imposible de pronosticar. Se espera un partido físico y cerrado, decidido por pequeños detalles.|Impossible à départager. Attendez-vous à un match serré et physique, décidé par de petits détails.|Troppo equilibrata per un pronostico. Attesa una gara fisica e tirata, decisa da piccoli dettagli.|予想がつかない互角の対戦です。フィジカルな接戦で、わずかな差が勝敗を分けそうです。|Impossível de prever. Espera-se um jogo físico e muito equilibrado, decidido por pequenos detalhes.
sp1|Australia open the tournament in Perth against Hong Kong China, with the home crowd behind them.|Australia abre el torneo en Perth ante Hong Kong (China), con el público local a su favor.|L'Australie ouvre le tournoi à Perth face à Hong Kong (Chine), portée par son public.|L'Australia apre il torneo a Perth contro Hong Kong (Cina), con il pubblico di casa dalla sua parte.|開幕戦はパースで、オーストラリアが香港と対戦。地元ファンの声援を受けて戦います。|A Austrália abre o torneio em Perth frente a Hong Kong (China), com o apoio do público da casa.
sp16|Trans-Tasman rivals meet in Sydney. The Bledisloe Cup rivalry moves to the World Cup stage and could decide who tops Pool A.|Los eternos rivales del Tasman se ven las caras en Sídney. La rivalidad de la Bledisloe Cup llega al Mundial y podría decidir quién lidera el Grupo A.|Les rivaux de la mer de Tasman se retrouvent à Sydney. La rivalité de la Bledisloe Cup s'invite à la Coupe du monde et pourrait désigner le premier de la poule A.|Le rivali del Tasman si affrontano a Sydney. La rivalità della Bledisloe Cup arriva al Mondiale e potrebbe decidere chi vince il Girone A.|タスマン海を挟んだライバルがシドニーで激突。ブレディスローカップの宿敵対決がワールドカップの舞台に登場し、プールAの首位を左右するかもしれません。|Os rivais do Tasman encontram-se em Sydney. A rivalidade da Taça Bledisloe chega ao Mundial e pode decidir quem lidera o Grupo A.
sp22|Ireland v Scotland: two Six Nations rivals, and the top spot in Pool D is likely on the line.|Irlanda – Escocia: dos rivales del Seis Naciones, con probablemente el primer puesto del Grupo D en juego.|Irlande – Écosse : deux rivaux du Tournoi des Six Nations, avec sans doute la première place de la poule D en jeu.|Irlanda–Scozia: due rivali del Sei Nazioni, con ogni probabilità in palio il primo posto del Girone D.|アイルランド対スコットランド。シックス・ネーションズの宿敵同士で、プールDの首位がかかる可能性が高い一戦です。|Irlanda–Escócia: dois rivais do Seis Nações, com provavelmente o primeiro lugar do Grupo D em jogo.
sp30|England v Wales is a Six Nations rivalry played at Stadium Australia, and probably the decider for first place in Pool F.|Inglaterra – Gales es un clásico del Seis Naciones que se juega en el Stadium Australia y probablemente decida el primer puesto del Grupo F.|Angleterre – pays de Galles, classique du Tournoi des Six Nations, se joue au Stadium Australia et pourrait décider de la première place de la poule F.|Inghilterra–Galles, classico del Sei Nazioni, si gioca allo Stadium Australia e probabilmente decide il primo posto del Girone F.|イングランド対ウェールズはシックス・ネーションズの宿敵対決で、会場はスタジアム・オーストラリア。プールFの首位決定戦になりそうです。|Inglaterra–País de Gales, clássico do Seis Nações, joga-se no Stadium Australia e deve decidir o primeiro lugar do Grupo F.
cSix|Six Nations|Seis Naciones|Tournoi des Six Nations|Sei Nazioni|シックス・ネーションズ|Seis Nações
cRWC|Rugby World Cup|Copa Mundial de Rugby|Coupe du monde de rugby|Coppa del Mondo di rugby|ラグビーワールドカップ|Mundial de Râguebi
cRC|Rugby Championship|Rugby Championship|Rugby Championship|Rugby Championship|ラグビーチャンピオンシップ|Rugby Championship
cTest|Test match|Partido internacional|Match international|Test match|テストマッチ|Jogo internacional
addCal|Add to calendar|Añadir al calendario|Ajouter au calendrier|Aggiungi al calendario|カレンダーに追加|Adicionar ao calendário
gcal|Google Calendar|Google Calendar|Google Agenda|Google Calendar|Googleカレンダー|Google Agenda
icsFile|Download .ics|Descargar .ics|Télécharger .ics|Scarica .ics|.icsを保存|Transferir .ics
resFT|FT|FINAL|TERMINÉ|FINALE|終了|FINAL
resLive|LIVE|EN VIVO|EN DIRECT|LIVE|ライブ|AO VIVO
poolsTitle|Pools|Grupos|Poules|Gironi|プール|Grupos
poolsSub|6 pools · 24 teams · Click any card to expand|6 grupos · 24 equipos · Pulsa una tarjeta para ampliar|6 poules · 24 équipes · Cliquez sur une carte pour développer|6 gironi · 24 squadre · Clicca una scheda per espandere|6プール · 24チーム · カードをクリックして展開|6 grupos · 24 equipas · Clique num cartão para expandir
fixturesWord|fixtures|partidos|matchs|partite|試合|jogos
expand|▼ Click to expand|▼ Pulsa para ampliar|▼ Cliquez pour développer|▼ Clicca per espandere|▼ クリックで展開|▼ Clique para expandir
collapse|▲ Click to collapse|▲ Pulsa para cerrar|▲ Cliquez pour réduire|▲ Clicca per chiudere|▲ クリックで閉じる|▲ Clique para fechar
standings|Standings|Clasificación|Classement|Classifica|順位表|Classificação
standingsNote|Standings update as results come in. 4 points for a win, 2 for a draw, plus bonus points.|La clasificación se actualiza con los resultados. 4 puntos por victoria, 2 por empate y puntos de bonus.|Le classement se met à jour avec les résultats. 4 points pour une victoire, 2 pour un nul, plus les bonus.|La classifica si aggiorna con i risultati. 4 punti per la vittoria, 2 per il pareggio, più i bonus.|結果に応じて順位表が更新されます。勝利4点、引き分け2点、ボーナスポイントあり。|A classificação atualiza com os resultados. 4 pontos por vitória, 2 por empate, mais bónus.
noResults|No results yet|Aún no hay resultados|Aucun résultat pour l'instant|Ancora nessun risultato|まだ結果はありません|Ainda sem resultados
hP|P|PJ|J|G|試|J
hW|W|G|G|V|勝|V
hD|D|E|N|N|分|E
hL|L|P|P|P|敗|D
hPF|PF|PF|PM|PF|得|PM
hPA|PA|PC|PE|PS|失|PS
hDiff|+/-|+/-|+/-|+/-|差|+/-
hTF|TF|TF|EM|MF|T|TM
hBP|BP|BP|BO|BP|BP|BP
hPts|Pts|Pts|Pts|Pt|勝点|Pts
bracket|Knockout bracket|Cuadro eliminatorio|Tableau final|Tabellone a eliminazione|決勝トーナメント|Quadro a eliminar
stadiumsTitle|Stadiums|Estadios|Stades|Stadi|スタジアム|Estádios
stadiumsSub|8 venues · 7 host cities · Australia · Click to expand matches|8 sedes · 7 ciudades anfitrionas · Australia · Pulsa para ver los partidos|8 sites · 7 villes hôtes · Australie · Cliquez pour voir les matchs|8 sedi · 7 città ospitanti · Australia · Clicca per vedere le partite|8会場 · 7開催都市 · オーストラリア · クリックで試合を表示|8 estádios · 7 cidades anfitriãs · Austrália · Clique para ver os jogos
matchesWord|matches|partidos|matchs|partite|試合|jogos
capShort|cap.|aforo|cap.|cap.|収容|cap.
expandMatches|▼ Click to expand matches|▼ Pulsa para ver los partidos|▼ Cliquez pour voir les matchs|▼ Clicca per vedere le partite|▼ クリックで試合を表示|▼ Clique para ver os jogos
teamsTitle|Teams|Equipos|Équipes|Squadre|チーム|Equipas
headCoach|Head coach|Seleccionador|Sélectionneur|Commissario tecnico|ヘッドコーチ|Selecionador
poolFixtures|Pool fixtures|Partidos de grupo|Matchs de poule|Partite del girone|プール戦|Jogos do grupo
thMatch|Match|Partido|Match|Partita|試合|Jogo
thOpp|Opponent|Rival|Adversaire|Avversario|対戦相手|Adversário
thDate|Date|Fecha|Date|Data|日付|Data
thVenue|Venue|Estadio|Stade|Stadio|会場|Estádio
thKick|Kick-off (your time)|Hora (tu zona)|Coup d'envoi (votre heure)|Calcio d'inizio (tuo orario)|キックオフ(お住まいの時間)|Início (a sua hora)
thPlayer|Player|Jugador|Joueur|Giocatore|選手|Jogador
thPos|Pos|Pos.|Poste|Ruolo|ポジション|Pos.
thClub|Club / franchise|Club / franquicia|Club / franchise|Club / franchigia|クラブ|Clube / franquia
thCaps|Caps|Caps|Sélections|Presenze|キャップ|Caps
thAge|Age (2027)|Edad (2027)|Âge (2027)|Età (2027)|年齢(2027年)|Idade (2027)
playersWord|Players|Jugadores|Joueurs|Giocatori|選手数|Jogadores
totalCaps|Total caps|Total de caps|Total sélections|Presenze totali|合計キャップ|Total de caps
avgCaps|Avg caps|Media de caps|Moy. sélections|Media presenze|平均キャップ|Média de caps
avgAge|Avg age (2027)|Edad media (2027)|Âge moyen (2027)|Età media (2027)|平均年齢(2027年)|Idade média (2027)
mostCapped|Most capped|Más internacional|Le plus capé|Più presenze|最多キャップ|Mais internacional
uncapped|Uncapped|Debutantes|Sans sélection|Esordienti|キャップなし|Estreantes
squadTail|Ages are approximate, as at 2027. Final Rugby World Cup squads are named closer to the tournament.|Las edades son aproximadas, a 2027. Las plantillas definitivas se anuncian más cerca del torneo.|Les âges sont approximatifs, en 2027. Les effectifs définitifs sont annoncés plus près du tournoi.|Le età sono approssimative, al 2027. Le rose definitive vengono annunciate più vicino al torneo.|年齢は2027年時点のおおよその値です。最終メンバーは大会が近づいてから発表されます。|As idades são aproximadas, a 2027. Os plantéis definitivos são anunciados mais perto do torneio.
noSquad|Player details for {team} are not loaded yet. Final squads are named closer to the tournament.|Los datos de jugadores de {team} aún no están cargados. Las plantillas definitivas se anuncian más cerca del torneo.|Les joueurs de {team} ne sont pas encore chargés. Les effectifs définitifs sont annoncés plus près du tournoi.|I giocatori di {team} non sono ancora caricati. Le rose definitive vengono annunciate più vicino al torneo.|{team}の選手情報はまだ登録されていません。最終メンバーは大会が近づいてから発表されます。|Os jogadores de {team} ainda não estão carregados. Os plantéis definitivos são anunciados mais perto do torneio.
followPick|★ Follow a team|★ Seguir a un equipo|★ Suivre une équipe|★ Segui una squadra|★ チームをフォロー|★ Seguir uma equipa
followNext|Next match|Próximo partido|Prochain match|Prossima partita|次の試合|Próximo jogo
followIn|in {d}d {h}h|en {d} d {h} h|dans {d} j {h} h|tra {d} g {h} h|あと{d}日{h}時間|em {d} d {h} h
followNone|No upcoming match|Sin próximos partidos|Aucun match à venir|Nessuna partita in programma|今後の試合なし|Sem próximos jogos
followAll|Add all fixtures to calendar|Añadir todos los partidos al calendario|Ajouter tous les matchs au calendrier|Aggiungi tutte le partite al calendario|全試合をカレンダーに追加|Adicionar todos os jogos ao calendário
followPool|Pool position|Posición en el grupo|Position dans la poule|Posizione nel girone|プール順位|Posição no grupo
followStop|Stop following|Dejar de seguir|Ne plus suivre|Smetti di seguire|フォロー解除|Deixar de seguir
followOpen|Open match|Ver partido|Voir le match|Apri partita|試合を開く|Abrir jogo
tzLabel|Time zone|Zona horaria|Fuseau horaire|Fuso orario|タイムゾーン|Fuso horário
tzAuto|Auto (your device)|Automática (tu dispositivo)|Auto (votre appareil)|Automatico (dispositivo)|自動(端末の設定)|Automático (o seu dispositivo)
langLabel|Language|Idioma|Langue|Lingua|言語|Idioma
navApp|Wheel navigator|Navegador de ruleta|Navigateur à roues|Navigatore a ruote|ホイールナビ|Navegador em roda
navFixtures|Fixtures|Calendario|Calendrier|Calendario|日程|Calendário
navAll|All|Todos|Tous|Tutti|すべて|Todos
kickoffWord|Kick-off|Hora de inicio|Coup d'envoi|Calcio d'inizio|キックオフ|Início
utcWord|UTC|UTC|UTC|UTC|UTC|UTC
localWord|Local|Local|Local|Locale|現地|Local
openInApp|Open in the wheel navigator|Abrir en el navegador de ruleta|Ouvrir dans le navigateur à roues|Apri nel navigatore a ruote|ホイールナビで開く|Abrir no navegador em roda
relatedMatches|Matches|Partidos|Matchs|Partite|試合|Jogos
squadWord|Squad|Plantilla|Effectif|Rosa|メンバー|Plantel
venueFacts|About the stadium|Sobre el estadio|À propos du stade|Informazioni sullo stadio|スタジアムについて|Sobre o estádio
capacity|Capacity|Aforo|Capacité|Capienza|収容人数|Capacidade
updatedWord|Results last updated|Resultados actualizados|Résultats mis à jour|Risultati aggiornati|結果の最終更新|Resultados atualizados
logoSub|Fan Navigator · unofficial|Navegador de aficionados · no oficial|Navigateur fans · non officiel|Navigatore tifosi · non ufficiale|ファンナビ · 非公式|Navegador de adeptos · não oficial
descHome|Interactive Rugby World Cup 2027 guide: all 52 matches, pools, stadiums and teams, kick-off times in your time zone, live standings and calendar downloads.|Guía interactiva de la Copa Mundial de Rugby 2027: los 52 partidos, grupos, estadios y equipos, horarios en tu zona horaria, clasificación en vivo y descarga de calendario.|Guide interactif de la Coupe du monde de rugby 2027 : les 52 matchs, poules, stades et équipes, horaires dans votre fuseau, classement en direct et calendrier à télécharger.|Guida interattiva alla Coppa del Mondo di rugby 2027: tutte le 52 partite, gironi, stadi e squadre, orari nel tuo fuso, classifica live e calendario da scaricare.|ラグビーワールドカップ2027のインタラクティブガイド。全52試合、プール、スタジアム、チーム、お住まいの時間でのキックオフ時刻、ライブ順位表、カレンダー保存に対応。|Guia interativo do Mundial de Râguebi 2027: os 52 jogos, grupos, estádios e equipas, horários no seu fuso, classificação em direto e calendário para transferir.
descMatch|{t1} v {t2} at {venue}, {city}: {date}, kick-off {time} local ({utc} UTC). {pool}. Prediction, head-to-head and kick-off in your time zone.|{t1} - {t2} en {venue}, {city}: {date}, inicio {time} hora local ({utc} UTC). {pool}. Pronóstico, historial y hora en tu zona horaria.|{t1} - {t2} à {venue}, {city} : {date}, coup d'envoi {time} heure locale ({utc} UTC). {pool}. Pronostic, historique et horaire dans votre fuseau.|{t1} - {t2} a {venue}, {city}: {date}, calcio d'inizio {time} ora locale ({utc} UTC). {pool}. Pronostico, precedenti e orario nel tuo fuso.|{t1}対{t2}、{venue}({city})、{date}、現地{time}キックオフ(UTC {utc})。{pool}。予想、過去の対戦、お住まいの時間でのキックオフ時刻。|{t1} - {t2} em {venue}, {city}: {date}, início às {time} locais ({utc} UTC). {pool}. Previsão, histórico e hora no seu fuso.
descTeam|{team} at Rugby World Cup 2027 ({pool}): fixtures and kick-off times in your time zone, standings, squad and player stats.|{team} en la Copa Mundial de Rugby 2027 ({pool}): partidos y horarios en tu zona horaria, clasificación, plantilla y estadísticas.|{team} à la Coupe du monde de rugby 2027 ({pool}) : matchs et horaires dans votre fuseau, classement, effectif et statistiques.|{team} alla Coppa del Mondo di rugby 2027 ({pool}): partite e orari nel tuo fuso, classifica, rosa e statistiche.|ラグビーワールドカップ2027の{team}({pool}):お住まいの時間での日程、順位表、メンバーと選手データ。|{team} no Mundial de Râguebi 2027 ({pool}): jogos e horários no seu fuso, classificação, plantel e estatísticas.
descPool|Rugby World Cup 2027 {pool}: teams, fixtures, kick-off times in your time zone and live standings.|Copa Mundial de Rugby 2027, {pool}: equipos, partidos, horarios en tu zona horaria y clasificación en vivo.|Coupe du monde de rugby 2027, {pool} : équipes, matchs, horaires dans votre fuseau et classement en direct.|Coppa del Mondo di rugby 2027, {pool}: squadre, partite, orari nel tuo fuso e classifica live.|ラグビーワールドカップ2027 {pool}:出場チーム、日程、お住まいの時間でのキックオフ時刻、ライブ順位表。|Mundial de Râguebi 2027, {pool}: equipas, jogos, horários no seu fuso e classificação em direto.
descStadium|{venue}, {city}: the {n} Rugby World Cup 2027 matches played here, with dates, kick-off times and teams.|{venue}, {city}: los {n} partidos de la Copa Mundial de Rugby 2027 que se juegan aquí, con fechas, horarios y equipos.|{venue}, {city} : les {n} matchs de la Coupe du monde de rugby 2027 disputés ici, avec dates, horaires et équipes.|{venue}, {city}: le {n} partite della Coppa del Mondo di rugby 2027 che si giocano qui, con date, orari e squadre.|{venue}({city}):ラグビーワールドカップ2027でここで行われる{n}試合の日程、キックオフ時刻、対戦チーム。|{venue}, {city}: os {n} jogos do Mundial de Râguebi 2027 disputados aqui, com datas, horários e equipas.
descFixtures|All 52 Rugby World Cup 2027 matches by date, with kick-off times in your time zone.|Los 52 partidos de la Copa Mundial de Rugby 2027 por fecha, con horarios en tu zona horaria.|Les 52 matchs de la Coupe du monde de rugby 2027 par date, avec les horaires dans votre fuseau.|Tutte le 52 partite della Coppa del Mondo di rugby 2027 per data, con orari nel tuo fuso.|ラグビーワールドカップ2027の全52試合を日付順に。お住まいの時間でのキックオフ時刻つき。|Os 52 jogos do Mundial de Râguebi 2027 por data, com horários no seu fuso.
descTeams|All 24 teams at Rugby World Cup 2027, with fixtures, standings and squads.|Los 24 equipos de la Copa Mundial de Rugby 2027, con partidos, clasificación y plantillas.|Les 24 équipes de la Coupe du monde de rugby 2027, avec matchs, classement et effectifs.|Le 24 squadre della Coppa del Mondo di rugby 2027, con partite, classifica e rose.|ラグビーワールドカップ2027の全24チーム。日程、順位表、メンバーを掲載。|As 24 equipas do Mundial de Râguebi 2027, com jogos, classificação e plantéis.
descPools|The six Rugby World Cup 2027 pools with teams, fixtures and standings.|Los seis grupos de la Copa Mundial de Rugby 2027 con equipos, partidos y clasificación.|Les six poules de la Coupe du monde de rugby 2027 avec équipes, matchs et classement.|I sei gironi della Coppa del Mondo di rugby 2027 con squadre, partite e classifica.|ラグビーワールドカップ2027の6つのプール。チーム、日程、順位表。|Os seis grupos do Mundial de Râguebi 2027 com equipas, jogos e classificação.
descStadiums|The eight Rugby World Cup 2027 stadiums in seven Australian host cities, with every match played at each venue.|Los ocho estadios de la Copa Mundial de Rugby 2027 en siete ciudades australianas, con todos los partidos de cada sede.|Les huit stades de la Coupe du monde de rugby 2027 dans sept villes australiennes, avec tous les matchs de chaque site.|Gli otto stadi della Coppa del Mondo di rugby 2027 in sette città australiane, con tutte le partite di ogni sede.|オーストラリア7都市にある、ラグビーワールドカップ2027の8会場と各会場の全試合。|Os oito estádios do Mundial de Râguebi 2027 em sete cidades australianas, com todos os jogos de cada recinto.
descStandings|Live Rugby World Cup 2027 pool standings and knockout bracket, updated as results come in.|Clasificación en vivo de los grupos y cuadro eliminatorio de la Copa Mundial de Rugby 2027, actualizados con cada resultado.|Classement en direct des poules et tableau final de la Coupe du monde de rugby 2027, mis à jour à chaque résultat.|Classifica live dei gironi e tabellone a eliminazione della Coppa del Mondo di rugby 2027, aggiornati a ogni risultato.|ラグビーワールドカップ2027のプール順位表と決勝トーナメント表を、結果に応じてリアルタイム更新。|Classificação em direto dos grupos e quadro a eliminar do Mundial de Râguebi 2027, atualizados a cada resultado.
followThis|★ Follow this team|★ Seguir a este equipo|★ Suivre cette équipe|★ Segui questa squadra|★ このチームをフォロー|★ Seguir esta equipa
shareWord|Share|Compartir|Partager|Condividi|共有|Partilhar`.split('\n').forEach(l=>{const r=l.split('|');UI[r[0]]={en:r[1],es:r[2],fr:r[3],it:r[4],ja:r[5],pt:r[6]};});
function tx(k,v){const e=UI[k];let s=e?(e[LANG]||e.en):k;if(v)for(const x in v)s=s.split('{'+x+'}').join(v[x]);return s;}

// ── team and slot names ──
const REGION={'New Zealand':'NZ','Australia':'AU','Chile':'CL','South Africa':'ZA','Italy':'IT','Georgia':'GE','Romania':'RO','Argentina':'AR','Fiji':'FJ','Spain':'ES','Canada':'CA','Ireland':'IE','Uruguay':'UY','Portugal':'PT','France':'FR','Japan':'JP','Samoa':'WS','Tonga':'TO','Zimbabwe':'ZW'};
const TEAM_I18N={Scotland:{es:'Escocia',fr:'Écosse',it:'Scozia',ja:'スコットランド',pt:'Escócia'},England:{es:'Inglaterra',fr:'Angleterre',it:'Inghilterra',ja:'イングランド',pt:'Inglaterra'},Wales:{es:'Gales',fr:'Pays de Galles',it:'Galles',ja:'ウェールズ',pt:'País de Gales'},USA:{es:'Estados Unidos',fr:'États-Unis',it:'Stati Uniti',ja:'アメリカ',pt:'Estados Unidos'},'Hong Kong China':{es:'Hong Kong (China)',fr:'Hong Kong (Chine)',it:'Hong Kong (Cina)',ja:'香港',pt:'Hong Kong (China)'}};
const _dn={};
const WINW={en:'Winner',es:'Ganador',fr:'Vainqueur',it:'Vincente',ja:'勝者',pt:'Vencedor'},RUNW={en:'Runner-up',es:'Perdedor',fr:'Perdant',it:'Perdente',ja:'敗者',pt:'Derrotado'};
const RABB={en:'R16',es:'1/8',fr:'8e',it:'OF',ja:'R16',pt:'1/8'},QABB={en:'QF',es:'CF',fr:'QF',it:'QF',ja:'QF',pt:'QF'};
const ORDS={en:['1st','2nd','3rd'],es:['1.º','2.º','3.º'],fr:['1er','2e','3e'],it:['1ª','2ª','3ª'],ja:['1','2','3'],pt:['1.º','2.º','3.º']};
function slotName(s){
  if(LANG==='en')return s;let m;
  if(m=/^(1st|2nd|3rd) Pool (.+)$/.exec(s)){const n=['1st','2nd','3rd'].indexOf(m[1]);return LANG==='ja'?'プール'+m[2]+(n+1)+'位':ORDS[LANG][n]+' '+tx('poolWord')+' '+m[2];}
  if(m=/^Winner R16 \((\d)\)$/.exec(s))return WINW[LANG]+' '+RABB[LANG]+' ('+m[1]+')';
  if(m=/^Winner (QF|SF)(\d)$/.exec(s))return WINW[LANG]+' '+(m[1]==='QF'?QABB[LANG]:'SF')+m[2];
  if(m=/^Runner-up SF(\d)$/.exec(s))return RUNW[LANG]+' SF'+m[1];
  return s;
}
function tn(n){
  if(LANG==='en'||!n)return n;
  if(TEAM_I18N[n]&&TEAM_I18N[n][LANG])return TEAM_I18N[n][LANG];
  if(REGION[n]){try{const d=_dn[LANG]||(_dn[LANG]=new Intl.DisplayNames([LANGS[LANG][1]],{type:'region'}));return d.of(REGION[n])||n;}catch(e){}}
  return slotName(n);
}
function stageName(st){return tx({'Pool':'stPool','Round of 16':'stR16','Quarterfinal':'stQF','Semifinal':'stSF','Bronze Final':'stBronze','Final':'stFinal'}[st]||'stPool');}
function stageShort(st){return {'Round of 16':tx('lgR16'),'Quarterfinal':tx('lgQF'),'Semifinal':tx('lgSF'),'Bronze Final':tx('lgBronze'),'Final':stageName('Final'),'Pool':stageName('Pool')}[st]||st;}
function poolLabel(g){return /^Pool /.test(g)?(LANG==='ja'?tx('poolWord')+g.slice(5):tx('poolWord')+' '+g.slice(5)):stageName(g);}
function compName(c){return {'Six Nations':'cSix','Rugby World Cup':'cRWC','Rugby Championship':'cRC','Test match':'cTest'}[c]?tx({'Six Nations':'cSix','Rugby World Cup':'cRWC','Rugby Championship':'cRC','Test match':'cTest'}[c]):c;}
function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}

// ── dates, time zones ──
function dtf(opts,ms,tz){return new Intl.DateTimeFormat(LANGS[LANG][1],Object.assign({timeZone:tz||'UTC'},opts)).format(ms);}
function getTZ(){try{const s=typeof localStorage!=='undefined'&&localStorage.getItem('rwc27.tz');if(s&&s!=='auto')return s;}catch(e){}try{return Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC';}catch(e){return 'UTC';}}
function zoneLabel(ms,tz){try{const p=new Intl.DateTimeFormat('en-GB',{timeZone:tz,timeZoneName:'short'}).formatToParts(ms).find(x=>x.type==='timeZoneName');return p?p.value:tz;}catch(e){return tz;}}
function kickInfo(m,tz){
  tz=tz||getTZ();const ms=utcOf(m);
  return {ms,tz,time:dtf({hour:'2-digit',minute:'2-digit',hourCycle:'h23'},ms,tz),date:dtf({weekday:'short',day:'numeric',month:'short'},ms,tz),dateLong:dtf({weekday:'short',day:'numeric',month:'short',year:'numeric'},ms,tz),zone:zoneLabel(ms,tz),
    localDate:dtf({weekday:'short',day:'numeric',month:'short'},ms,m.tz),utcTime:dtf({hour:'2-digit',minute:'2-digit',hourCycle:'h23'},ms,'UTC')};
}
function cyTime(m){const k=kickInfo(m);return {t:k.time,z:k.zone};}   // name kept: used by team and stadium views
function shortDate(m){const mo=MONS[m.date.split(' ')[1]],d=+m.date.split(' ')[0];return dtf({weekday:'short',day:'numeric',month:'short'},Date.UTC(2027,mo,d,12),'UTC');}

// ── calendar files ──
function icsStamp(ms){return new Date(ms).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');}
function icsEsc(s){return String(s).replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r?\n/g,'\\n');}
function icsFold(l){const out=[];while(l.length>73){out.push(l.slice(0,73));l=' '+l.slice(73);}out.push(l);return out.join('\r\n');}
function matchTitle(m){return tn(m.team1)+' v '+tn(m.team2)+' · RWC 2027';}
function matchDesc(m,url){return (m.stage==='Pool'?poolLabel(m.group):stageName(m.stage))+(url?'\n'+url:'');}
function icsEvent(m,base){const s=utcOf(m),e=s+2*36e5;return ['BEGIN:VEVENT','UID:rwc2027-m'+m.id+'@rwc2027-fan-navigator','DTSTAMP:'+icsStamp(Date.UTC(2026,9,1)),'DTSTART:'+icsStamp(s),'DTEND:'+icsStamp(e),'SUMMARY:'+icsEsc(matchTitle(m)),'LOCATION:'+icsEsc(m.venue+', '+m.city),'DESCRIPTION:'+icsEsc(matchDesc(m,base?base+'match/'+matchSlug(m)+'/':'')),'END:VEVENT'].map(icsFold).join('\r\n');}
function icsFile(list,base){return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//RWC 2027 Fan Navigator//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH'].join('\r\n')+'\r\n'+list.map(m=>icsEvent(m,base)).join('\r\n')+'\r\nEND:VCALENDAR\r\n';}
function gcalUrl(m,base){const s=utcOf(m),e=s+2*36e5,q=encodeURIComponent;return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text='+q(matchTitle(m))+'&dates='+icsStamp(s)+'/'+icsStamp(e)+'&details='+q(matchDesc(m,base?base+'match/'+matchSlug(m)+'/':''))+'&location='+q(m.venue+', '+m.city);}
function matchSlug(m){return m.stage==='Pool'?m.id+'-'+slug(m.s1)+'-v-'+slug(m.s2):m.id+'-'+slug(m.stage)+(m.key?'-'+slug(m.key.replace(/^\D+/,'').replace(/[()]/g,'')):'');}

// ── results, standings, bracket ──
let RESULTS={};
let STAND={};
const POOL_LETTERS=['A','B','C','D','E','F'];
matches.forEach(m=>{m.s1=m.team1;m.s2=m.team2;m.result=null;});
function emptyRow(t){return {team:t,p:0,w:0,d:0,l:0,pf:0,pa:0,tf:0,ta:0,bp:0,pts:0,tryKnown:true};}
function rankPool(arr,ms){
  const df=r=>r.pf-r.pa,td=r=>r.tf-r.ta;arr.sort((x,y)=>y.pts-x.pts);const out=[];let i=0;
  while(i<arr.length){let j=i;while(j+1<arr.length&&arr[j+1].pts===arr[i].pts)j++;const g=arr.slice(i,j+1);
    if(g.length>1){const names=g.map(r=>r.team),mini={};g.forEach(r=>mini[r.team]={pts:0,diff:0});
      ms.forEach(m=>{const r=RESULTS[m.id];if(!r||r.live)return;if(names.includes(m.team1)&&names.includes(m.team2)){const a=mini[m.team1],b=mini[m.team2];if(r.s1>r.s2)a.pts+=4;else if(r.s2>r.s1)b.pts+=4;else{a.pts+=2;b.pts+=2;}a.diff+=r.s1-r.s2;b.diff+=r.s2-r.s1;}});
      g.sort((x,y)=>(mini[y.team].pts-mini[x.team].pts)||(mini[y.team].diff-mini[x.team].diff)||(df(y)-df(x))||(td(y)-td(x))||(y.pf-x.pf)||x.team.localeCompare(y.team));}
    out.push(...g);i=j+1;}
  return out;
}
function computeStandings(){
  STAND={};
  POOL_LETTERS.forEach(L=>{
    const ms=matches.filter(m=>m.group==='Pool '+L),rows={};Object.keys(poolOf).filter(t=>poolOf[t]==='Pool '+L).forEach(t=>rows[t]=emptyRow(t));let done=0;
    ms.forEach(m=>{const r=RESULTS[m.id];if(!r||r.live)return;done++;const a=rows[m.team1],b=rows[m.team2];
      a.p++;b.p++;a.pf+=r.s1;a.pa+=r.s2;b.pf+=r.s2;b.pa+=r.s1;
      if(r.t1!=null&&r.t2!=null){a.tf+=r.t1;a.ta+=r.t2;b.tf+=r.t2;b.ta+=r.t1;}else{a.tryKnown=b.tryKnown=false;}
      if(r.s1>r.s2){a.w++;a.pts+=4;b.l++;}else if(r.s2>r.s1){b.w++;b.pts+=4;a.l++;}else{a.d++;b.d++;a.pts+=2;b.pts+=2;}
      if(r.t1!=null&&r.t1>=4){a.bp++;a.pts++;}if(r.t2!=null&&r.t2>=4){b.bp++;b.pts++;}
      if(r.s1<r.s2&&r.s2-r.s1<=7){a.bp++;a.pts++;}if(r.s2<r.s1&&r.s1-r.s2<=7){b.bp++;b.pts++;}});
    STAND['Pool '+L]={rows:rankPool(Object.values(rows),ms),complete:done===ms.length,played:done};
  });
}
function isTeam(n){return !!countryCodes[n];}
const THIRD_SLOTS={2:'CEF',4:'DEF',5:'AEF',6:'BEF'};
function thirdAssign(){
  if(!POOL_LETTERS.every(L=>STAND['Pool '+L].complete))return null;
  const th=POOL_LETTERS.map(L=>({L,r:STAND['Pool '+L].rows[2]})).sort((x,y)=>(y.r.pts-x.r.pts)||((y.r.pf-y.r.pa)-(x.r.pf-x.r.pa))||((y.r.tf-y.r.ta)-(x.r.tf-x.r.ta))||(y.r.pf-x.r.pf)||x.L.localeCompare(y.L)).slice(0,4);
  const keys=[2,4,5,6],used=[];const res={};
  (function go(i){if(i===4)return true;for(let k=0;k<4;k++){if(used[k])continue;if(THIRD_SLOTS[keys[i]].includes(th[k].L)){used[k]=1;res[keys[i]]=th[k].r.team;if(go(i+1))return true;used[k]=0;}}return false;})(0);
  return Object.keys(res).length===4?{map:res,qualified:th.map(x=>x.r.team)}:null;
}
function winnerOfMatch(m){const r=m.result;if(!r||r.live||!isTeam(m.team1)||!isTeam(m.team2))return null;if(r.s1>r.s2)return m.team1;if(r.s2>r.s1)return m.team2;return r.w===1?m.team1:r.w===2?m.team2:null;}
function loserOfMatch(m){const w=winnerOfMatch(m);return w?(w===m.team1?m.team2:m.team1):null;}
function resolveBracket(){
  const th=thirdAssign();
  matches.forEach(m=>{
    if(m.stage==='Pool')return;
    const res=(slotStr,key)=>{let g;
      if(g=/^(1st|2nd) Pool (.)$/.exec(slotStr)){const s=STAND['Pool '+g[2]];return s&&s.complete?s.rows[g[1]==='1st'?0:1].team:slotStr;}
      if(/^3rd Pool/.test(slotStr)){const n=+(/\((\d)\)/.exec(key||'')||[])[1];return th&&th.map[n]?th.map[n]:slotStr;}
      if(g=/^Winner (R16 \(\d\)|QF\d|SF\d)$/.exec(slotStr)){const src=matches.find(x=>x.key===g[1]);const w=src&&winnerOfMatch(src);return w||slotStr;}
      if(g=/^Runner-up (SF\d)$/.exec(slotStr)){const src=matches.find(x=>x.key===g[1]);const w=src&&loserOfMatch(src);return w||slotStr;}
      return slotStr;};
    m.team1=res(m.s1,m.key);m.team2=res(m.s2,m.key);
  });
  return th;
}
function applyResults(obj){
  RESULTS=(obj&&(obj.results||obj))||{};if(RESULTS.updated)delete RESULTS.updated;
  matches.forEach(m=>{m.result=RESULTS[m.id]||null;});
  computeStandings();let th=null;
  for(let pass=0;pass<4;pass++){th=resolveBracket();matches.forEach(m=>{m.result=RESULTS[m.id]||null;});}
  return {standings:STAND,thirds:th};
}
function poolPosition(team){const s=STAND[poolOf[team]];if(!s||!s.played)return null;const i=s.rows.findIndex(r=>r.team===team);return i<0?null:{pos:i+1,row:s.rows[i],complete:s.complete};}
function nextMatchFor(team,now){
  const ms=matches.filter(m=>(m.team1===team||m.team2===team)).sort((a,b)=>utcOf(a)-utcOf(b));
  return ms.find(m=>utcOf(m)+3*36e5>now&&!(m.result&&!m.result.live))||null;
}
applyResults({});

// ── localised prediction and context text ──
const SPECIAL_IDS=[1,16,22,30];
function verdictText(ad,fav,und){const k=ad>=30?'v30':ad>=18?'v18':ad>=8?'v8':ad>=3?'v3':'v0';return tx(k,{fav:tn(fav),und:tn(und)});}
function capOfL(t){const s=SQUADS[t];if(!s)return null;const c=s.players.find(p=>p.cap);return c?{n:c.name,c:tn(t)+' '+tx('captain')+' · '+c.caps+' '+tx('capsWord')}:null;}
function getPred(m){
  const r1=RATING[m.team1],r2=RATING[m.team2];
  if(r1==null||r2==null)return {w1:49,dr:2,w2:49,verdict:tx('koVerdict'),tot:'—',s:tx('koScore'),potm:'—',club:tx('koClub')};
  const d=r1-r2,ad=Math.abs(d),p1=1/(1+Math.exp(-d/9)),w1=Math.round(98*p1),w2=98-w1,fav=d>=0?m.team1:m.team2,und=d>=0?m.team2:m.team1;
  let v=verdictText(ad,fav,und);if(SPECIAL_IDS.includes(m.id)&&m.stage==='Pool')v=tx('sp'+m.id);
  const margin=Math.max(2,Math.round(ad*.9)),tot=Math.round(46+ad*.5),hi=Math.round((tot+margin)/2),lo=tot-hi;
  const star=capOfL(fav)||capOfL(und);
  return {w1,dr:2,w2,verdict:v,tot,s:tx('mostLikely')+': '+(d>=0?hi+'–'+lo:lo+'–'+hi),potm:star?star.n:'—',club:star?star.c:tx('noSquadShort')};
}
function ordN(n){return ORDS[LANG][n-1];}
function contextHtml(m,color){
  if(m.stage==='Pool'){
    const a=poolInfo(m,m.team1),b=poolInfo(m,m.team2),rest=x=>x.rest==null?tx('opener'):tx('restWord',{x:tx('daysN',{n:x.rest})});
    return {stats:ctxStat(a.rest==null?tx('opener'):tx('daysN',{n:a.rest}),short(m.team1)+' · '+tx('restWord',{x:''}).trim(),color)+ctxStat(m.group.replace('Pool ',''),tx('poolWord'))+ctxStat(b.rest==null?tx('opener'):tx('daysN',{n:b.rest}),short(m.team2)+' · '+tx('restWord',{x:''}).trim(),color),
      text:tx('ctxPool',{t1:tn(m.team1),o1:ordN(a.n),t2:tn(m.team2),o2:ordN(b.n)})};
  }
  const next=m.key?matches.find(x=>x.s1==='Winner '+m.key||x.s2==='Winner '+m.key):null;
  if(m.stage==='Final')return {stats:ctxStat(stageName('Final'),tx('lastMatch'),color)+ctxStat(shortDate(m),tx('labDate'))+ctxStat(m.venue.replace('Stadium Australia','Stadium Aus.'),tx('venueWord')),text:tx('ctxFinal')};
  if(m.stage==='Bronze Final')return {stats:ctxStat(tx('thirdPlace'),tx('placeAtStake'),color)+ctxStat(shortDate(m),tx('labDate'))+ctxStat('—','—'),text:tx('ctxBronze')};
  return {stats:ctxStat(stageShort(m.stage),tx('thisRound'),color)+ctxStat(next?stageShort(next.stage):'—',tx('winnerPlays'))+ctxStat(next?shortDate(next):'—',tx('nextDate')),
    text:next?tx('ctxNext',{stage:stageName(next.stage),id:next.id,venue:next.venue,date:shortDate(next)}):''};
}
function h2hHtml(m,h){
  const strip=h.rows.map(r=>`<span class="hh-dot ${r.s1>r.s2?'hh-w':r.s1<r.s2?'hh-l':'hh-d'}" title="${r.yr} ${compName(r.comp)}: ${r.s1}-${r.s2}">${r.s1>r.s2?'W':r.s1<r.s2?'L':'D'}</span>`).join('');
  const list=h.rows.map(r=>`<div class="hh-row"><span class="hh-yr">${r.yr}</span><span class="hh-comp">${compName(r.comp)}</span><span class="hh-sc"><b class="${r.s1>=r.s2?'hh-win':''}">${short(m.team1)} ${r.s1}</b> – <b class="${r.s2>=r.s1?'hh-win':''}">${r.s2} ${short(m.team2)}</b></span></div>`).join('');
  const yrs=h.rows.map(r=>r.yr),note=h.partial?' · '+tx('h2hPartial',{n:h.rows.length,a:Math.min(...yrs),b:Math.max(...yrs)}):'';
  return `<div class="hh-strip"><span class="hh-lbl">${tx('form',{a:short(m.team1),b:short(m.team2)})}</span>${strip}</div>${list}<div class="hh-foot">${tx('avgScore')} ${h.avg1.toFixed(0)}–${h.avg2.toFixed(0)}${note}</div>`;
}
