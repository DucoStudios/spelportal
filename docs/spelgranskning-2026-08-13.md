# Spelportalen — spel-för-spel-granskning

Datum: 2026-08-13

## Beslutad riktning

- Visuellt: 80/90-tals arkad och 8-bit, byggt med portalens befintliga cyan, rosa, lila, orange och gula färger.
- Varje spel ska kännas som en egen kassett, men alla ska tillhöra samma arkadmaskin.
- Varje katalogkort ska visa en faktisk miniscen ur spelmekaniken, inte en generell emoji på samma bakgrund.
- Mobil först: direkt interaktion, få synliga kontroller, minst 44 px träffytor, stabilt 60 fps som mål och alternativa kontroller där det behövs.
- Retention utan manipulation: kort första runda, tydliga mål, personbästa, varierade utmaningar och meningsfull progression. Ingen reklam, chatt, lootlådor, köp eller straffande streaks.
- Self-development: spelaren ska öva på verkliga val, värdeskapande, uthållighet och reflektion. Myron Golden-inspirationen märks främst i att skapa värde, göra fler relevanta erbjudanden, utveckla färdighet och omsätta lärande i handling — inte i personnamn eller lösa motivationscitat.

Underlag: [Apple — Designing for games](https://developer.apple.com/design/human-interface-guidelines/designing-for-games), [Android — Game design guidelines](https://developer.android.com/games/design/overview), [Android — Frame rate](https://developer.android.com/games/optimize/framerate), [GameAnalytics — 2025 Mobile Gaming Benchmarks](https://www.gameanalytics.com/reports/2025-mobile-gaming-benchmarks), [Adjust — Gaming App Insights 2026](https://www.adjust.com/resources/ebooks/gaming-app-insights/) och [Myron Golden](https://myrongolden.com/).

## Genomfört i första passet

- Ny gemensam pixel-/arkadform för portal och spel.
- 61 individuellt ritade pixelminiscener, en per spel.
- Blockkrossaren: poäng, rekord, våg och bollantal i toppen; fyra förklarade bollroller; döljbar bollväljare; poäng för träff, kombo, kross och ny boll; tydligare onboarding.
- Automatiska kontroller av att samtliga 61 miniscener ritas och att alla 61 spel laddar på mobil och desktop.

## Genomfört i andra passet

- Klossfall: rättvis 7-kloss-påse, nästa-kloss-fönster, radkombo, nivå och lokalt rekord.
- Kulrullaren: fyra checkpoints med portar, tid/fall/mynt i HUD, lokala tidsrekord och skicklighetsbaserade stjärnkrav.
- Memory-plattorna: rättvis Fisher–Yates-blandning, klockstart på första draget, matchstreak och lokalt rekord på drag/tid.
- Saftstånd-erbjudandet: träffsäkerhet i HUD, direkt förklaring av varför ett val passar eller inte passar behovet och lokalt poängrekord.
- Ordmästaren: synligt sessionssteg och kombo, träffsäkerhet i slutsummeringen och ett positivt dagligt lektionsmål.
- Verifierat med 31 automatiska tester och 122 riktiga Chrome-laddningar: 61 spel på mobil och desktop.

## Genomfört i tredje passet

- Ormen: roterande korta mål, lokal uppdragsprogress och ett glödande bonusfrö med högre poäng och större tempohöjning.
- Superhjälte-språnget: två checkpoints, fallräknare, lokalt tidsrekord och tre skicklighetsbaserade medaljnivåer.
- Flykten: nära-miss-flow som pressar tillbaka vågen, tydligare HUD, mjukare återhämtning efter krock och sparat rekord.
- Reaktionsraketen: perfekt/snabb/normal-fönster i millisekunder, tidsgräns per kärna, precisionskombo och lokalt snabbaste träff.
- Dansstopp: tre stigande rytmnivåer, varierade säkra rörelsekort och tydligare säker onboarding.
- Verifierat med 36 automatiska tester och 122 riktiga Chrome-laddningar: 61 spel på mobil och desktop.

## Genomfört i fjärde passet

- Balansbanan: adaptiv vind efter avstånd från centrum, exakt centertid, flowbonus och valbart lugnt läge med oförändrad poäng.
- Molnhoppet: tre läsbara molntyper, höjdmätare, två räddningsvingar och garanterad introduktion av boost- och skörmoln.
- Tornverkstan: perfektkedja som bevarar bredd, tydlig byggprogress och tre retrovärldar som byts vid våning 4 och 8.
- Tålamodstornet: synliga gula lockbeten, separat perfektzon, lugn kedja och en kort reflektion efter rundan.
- Färgfusion: förhandsvisning av nästa bricka, färgkedja och prismakrafter som förtjänas efter tre lyckade fusioner i följd.
- Verifierat med 41 automatiska tester och 122 riktiga Chrome-laddningar: 61 spel på mobil och desktop.

## Genomfört i femte passet

- Fruktfångaren: hörselkombo, tangentbordsstyrd repetition av målorden och adaptiv viktning som låter missade ord återkomma oftare.
- Bistroblixten: gäster med olika servicebehov, mer bilddrivna varuval och ett kvalitetsbetyg som prioriterar felfri service före stress.
- Accentjakten: korta förklaringar av accent aigu, grave, circonflexe och tréma samt automatisk återkomst av missade ord efter två andra frågor.
- Ordbron: sex synliga brodelar med olika roller och en avslutande testvandring som gör språkprogressen fysisk.
- Brobyggarna: synlig materialbudget, flera fria ritlösningar och upp till tre stjärnor för en enkel och materialsnål bro.
- Verifierat med 46 automatiska tester, klick-/ritkontroll av de nya mekanikerna och 122 riktiga Chrome-laddningar: 61 spel på mobil och desktop.

## Genomfört i sjätte passet

- Träffa rätt: begränsad materialbudget, effektivitetspoäng, banmedaljer och lokalt stjärnrekord.
- Poppa ballongerna: synligt nästa mål, kortare dödtid, trickskott via studs och lokalt stjärnrekord.
- Rädda ägget: tre rampmaterial med egen fysik, skalmätare, landningskvalitet och flera giltiga räddningsstrategier.
- Sikta rätt: växlande vind, 60-sekundersrunda, lokalt precisionsspöke och sparat poängrekord.
- Kulbanan: levande vägprognos före test, ångra, snabbare simulering och lösningsmedaljer efter materialåtgång.
- Verifierat med 52 automatiska tester, riktiga interaktioner och 122 Chrome-laddningar: 61 spel på mobil och desktop.

## Utvecklingskö — alla spel

Statusnyckel: `KLAR 1` = första stora förbättringspasset klart. `GLOBALT` = nytt pixel-/arkadskal och unik thumbnail klart. `NÄSTA` = prioriterad mekanisk förbättring.

### Arcade, fysik och reflex

| Spel | Styrka idag | Nästa specifika förbättring | Status |
|---|---|---|---|
| Blockkrossaren | Tillfredsställande studs och kedjereaktioner | Banuppdrag, bollmästerskap och balansmätning efter verkliga spelrundor | KLAR 1 |
| Klossfall | Omedelbart begriplig klassisk loop | Fler uppdrag och finbalansering från verkliga rundor | KLAR 1 |
| Ormen | Bra svepstyrning och lokal rekordlagring | Banvarianter och förfining från verkliga rundor | KLAR 1 |
| Superhjälte-språnget | Fysisk rörelse och tydligt mål | Tre separata banprofiler | KLAR 1 |
| Flykten | Enkel filkontroll och stigande press | Miljöskiften och ljudprofil per svårighetsfas | KLAR 1 |
| Reaktionsraketen | Stark kort reflexrunda | Raketdelar och veckans lokala utmaning | KLAR 1 |
| Dansstopp | Kroppslig, social och lätt att starta | Lagläge på samma skärm | KLAR 1 |
| Balansbanan | Finmotorisk kontroll och störningar | Fler vindprofiler och finbalansering från verkliga rundor | KLAR 1 |
| Molnhoppet | Vertikal progression och luftstyrning | Banprofiler och finbalansering av räddningsvingar | KLAR 1 |
| Tornverkstan | Ren timingmekanik | Lokala tredagarsutmaningar utan straff och fler tornmiljöer | KLAR 1 |
| Tålamodstornet | Timing kopplad till tålamod | Fler rytmprofiler och valbar längre fokusrunda | KLAR 1 |
| Färgfusion | Begriplig merge-progression | Nya brädformer och balans av prismaladdning från verkliga rundor | KLAR 1 |
| Fruktfångaren | Språk och rörelse i samma loop | Fler temapooler och balans från verkliga felmönster | KLAR 1 |
| Bistroblixten | Tempo och ordningsbyggande | Återkommande gäster och längre servicekedjor | KLAR 1 |
| Accentjakten | Kort och skarp stavningsövning | Fler accentfamiljer och lokal kunskapskarta | KLAR 1 |
| Ordbron | Varje svar bygger något synligt | Fler broprofiler och blandade ordklasser | KLAR 1 |
| Brobyggarna | Kreativ ritfysik | Fler hinderfamiljer och lokal galleriöversikt | KLAR 1 |
| Träffa rätt | Rita–släpp ger fin aha-känsla | Nya hinderfamiljer och balans från verkliga lösningar | KLAR 1 |
| Poppa ballongerna | Ordning och fysik i en resa | Fler trickskottsprofiler och balans från verkliga rundor | KLAR 1 |
| Rädda ägget | Spänning genom fallhastighet | Fler bon och finbalansering av materialens fysik | KLAR 1 |
| Sikta rätt | Bra slangbågekänsla | Korta banserier och fler vindprofiler | KLAR 1 |
| Kulbanan | Byggande före simulering | Skaparläge och lokal galleriöversikt | KLAR 1 |
| Kulrullaren | Stark 3D-känsla på webben | Kortare banprofiler och finbalansering av medaljtider | KLAR 1 |
| Rör på dig! | Automatiska intervaller och paus fungerar | Rörelsepaket, intensitetsval och avslutande kroppskoll | GLOBALT |

### Logik, skapande och strategi

| Spel | Styrka idag | Nästa specifika förbättring | Status |
|---|---|---|---|
| Memory-plattorna | Ren minnesloop med stora träffytor | Tema-set och valbar 4×4-snabbrunda | KLAR 1 |
| Pusselvridaren | Rotation och placering ger djup | Dragindikator, medaljer och fler bildmönster | GLOBALT |
| Ordspråks-pusslet | Match-3 driver en språklig reveal | Tydligare målrad, specialmatchningar och slutlig betydelsefråga | GLOBALT |
| Schack | Kompletta regler, AI och två spelare | Bättre mobilanalys, hotmarkering som val och korta schackpussel | GLOBALT |
| Blockvärlden | Stor frihet och skaparlust | Sparade byggen, små bygguppdrag och tydligare resursmål | GLOBALT |
| Gårdsriket | Byggande och passiv ekonomi | Beslutsfulla säsonger, kundbehov och tydlig vinst genom värde | GLOBALT |
| Målarboken | Lugn kreativitet med franska ord | Fler pixelmotiv, ångra, palettsparning och färdig-bild-kort | GLOBALT |
| Idéverkstan | Kombinerar idéer till hjälp | Flera lösningar, målgruppsbehov och test–förbättra-loop | GLOBALT |

### Franska och språk

| Spel | Styrka idag | Nästa specifika förbättring | Status |
|---|---|---|---|
| Alfabetet & färgerna | Enkel för yngre och naturligare röst | Mikropaket, uttalsrepetition och visuell progression | GLOBALT |
| Ljudmatchen | Hör först, välj sedan | Adaptiv repetition, mindre text och tydlig säker/osäker-knapp | GLOBALT |
| Meningsbyggaren | Aktiv ordföljd | Meningsvariationer, hjälp i tre steg och återanvändning av svåra ord | GLOBALT |
| Ordracet | Snabba tvåspråkiga val | Nivåer efter ordklass och bättre felåterkoppling | GLOBALT |
| Ordresan | Sparad resa i sex stationer | Temakartor, mästarprov och återbesök till osäkra ord | GLOBALT |
| Ordgåtan | Bekant ordslutledning | Uttal efter gissning, temaläge och statistik över bokstavsmönster | GLOBALT |
| Ordmästaren | Stor 1000-ordsprogression, läs/lyssna/tala | Kunskapskarta och adaptiv repetition från felmönster | KLAR 1 |

### Ekonomi, företagande och värdeskapande

| Spel | Styrka idag | Nästa specifika förbättring | Status |
|---|---|---|---|
| Saftstånd-erbjudandet | Matchar behov mot erbjudande | Fler behovssamtal och värdestapling över flera kundrundor | KLAR 1 |
| Minimarknaden | Kundtempo och packning | Kvalitet före fart, återkommande kunder och förbättrad arbetsprocess | GLOBALT |
| Myntmatchen | Konkret euroförståelse | Växel, flera giltiga myntlösningar och vardagliga köp | GLOBALT |
| Spargrissprint | Smart val kontra impuls | Mål före lopp, opportunity cost och valfri efterreflektion | GLOBALT |
| Sex burkar-sortern | Visuell fördelning av pengar | Egna procentmål, konsekvenser över flera rundor och givande som aktivt val | GLOBALT |
| Ekorrhjulet | Tillgångar kontra utgifter | Kassaflödesprognos, risknivå och värdeskapande tillgångar | GLOBALT |

### Hälsa, relationer och kloka val

| Spel | Styrka idag | Nästa specifika förbättring | Status |
|---|---|---|---|
| Andningsdykaren | Lugn rytm och pärlbelöning | Tillgänglig takt, diskret ljud och avslut utan poängstress | GLOBALT |
| Byggkost eller Sällanmat | Direkt sortering | Måltidsbygge, portionskontext och mindre svart-vitt språk | GLOBALT |
| Kroppens Tempel | Hälsokunskap med värdegrund | Scenarier och vanebyggande i stället för främst quiz | GLOBALT |
| Gåvokedjan | Flera balanserade mätare | Relationers olika behov, konsekvens över tid och återhämtning | GLOBALT |
| Gap-monstren | Synliggör jämförelsetankar | Fler strategier än att “smälla”, omformulering och lugnt läge | GLOBALT |
| Vänskapskompassen | Omtänksamma vardagsval | Dialogkonsekvenser och fler rimliga, nyanserade svar | GLOBALT |
| Hjälparjakten | Letar efter konkret hjälp | Behov före handling, prioritering och effektmätare | GLOBALT |
| Tacksamhetsträdet | Positiv samlarloop | Spelarens egna lokala ord, säsonger och privat export | GLOBALT |
| Vishetens Väg | Vardagsscenarier och kloka val | Nyanserade följder, samtalsläge och mindre quizkänsla | GLOBALT |

### Bibelspel

| Spel | Styrka idag | Nästa specifika förbättring | Status |
|---|---|---|---|
| Bibelhjälten | Valstyrd berättelse | Fler perspektiv, konsekvenskarta och tydligare källkoppling | GLOBALT |
| Barmhärtighetsresan | Behov och verklig hjälp | Resursval, avbrott och efterreflektion utan predikoton | GLOBALT |
| Bygg på klippan | Principen blir fysisk konstruktion | Fler byggval, stormtest och skillnad mellan höra och göra | GLOBALT |
| Andens fruktträdgård | Nio egenskaper visualiseras | Vardagsscenarier, samspel mellan frukterna och växande trädgård | GLOBALT |
| Ord som bygger | Lyssna, pausa och välj ord | Tonläge, reparera ett dåligt svar och flera goda formuleringar | GLOBALT |
| Bibelresan 66 | 66 böcker, 1 189 kapitel och lokal progress | Bättre mobilkarta, milstolpar och kunskapsstopp som inte blockerar läsning | GLOBALT |

## Prioriterad ordning efter Blockkrossaren

1. Klossfall — samma publik, liten teknisk risk, tydlig effekt av rekord/kombo/förhandsvisning.
2. Kulrullaren — starkt spel men saknar poäng, checkpoints och tydlig 3D-läsbarhet.
3. Memory-plattorna — snabb vinst genom personbästa, tema-set och kombokedja.
4. Saftstånd-erbjudandet — viktigaste spelet för erbjudande/värdeskapande och Myron-inspirerad praktisk utveckling.
5. Ordmästaren — störst pedagogisk yta och mest långsiktig progression.
6. Därefter arcade/reflex-gruppen, språkgruppen, ekonomi/företagande, hälsa/relationer och bibelspelen i tabellordning.

Varje spelpass avslutas med statisk kontroll, hela testsuiten samt riktig Chrome-kontroll på mobil och desktop. Beteende bör fintrimmas från anonym feedback när feedback-endpointen har kopplats in.

## Driftfix 2026-08-20 — desktopscroll i spelkatalogen

Portalens rotlager har ett explicit vertikalt scrollkontrakt: dokumentet äger y-scrollen, `body` får växa naturligt och touchytan tillåter `pan-y`. Den tidigare kombinationen av generell overscroll-låsning och inline-containment är borttagen eftersom den kunde låsa hela spelkatalogen i desktopwebbläsare. Smoke-testet skickar nu ett riktigt touchsvep på mobil och ett mushjulsevent på desktop och verifierar att katalogen rör sig i båda formaten.
