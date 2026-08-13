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

## Utvecklingskö — alla spel

Statusnyckel: `KLAR 1` = första stora förbättringspasset klart. `GLOBALT` = nytt pixel-/arkadskal och unik thumbnail klart. `NÄSTA` = prioriterad mekanisk förbättring.

### Arcade, fysik och reflex

| Spel | Styrka idag | Nästa specifika förbättring | Status |
|---|---|---|---|
| Blockkrossaren | Tillfredsställande studs och kedjereaktioner | Banuppdrag, bollmästerskap och balansmätning efter verkliga spelrundor | KLAR 1 |
| Klossfall | Omedelbart begriplig klassisk loop | Fler uppdrag och finbalansering från verkliga rundor | KLAR 1 |
| Ormen | Bra svepstyrning och lokal rekordlagring | Banvarianter, risk-/belöningsfrön och korta uppdrag | GLOBALT |
| Superhjälte-språnget | Fysisk rörelse och tydligt mål | Checkpoints, tidsmedaljer och tre banprofiler | GLOBALT |
| Flykten | Enkel tvåfilskontroll och stigande press | Nära-miss-bonus, miljöskiften och rättvisare svårighetskurva | GLOBALT |
| Reaktionsraketen | Stark kort reflexrunda | Perfekt-träff-fönster, raketdelar och veckans lokala rekord | GLOBALT |
| Dansstopp | Kroppslig, social och lätt att starta | Rytmnivåer, säkra rörelsekort och lagläge på samma skärm | GLOBALT |
| Balansbanan | Finmotorisk kontroll och störningar | Adaptiv vind, precisionstid och tillgängligt lugnt läge | GLOBALT |
| Molnhoppet | Vertikal progression och luftstyrning | Molntyper, räddningshopp och tydlig höjdmätare | GLOBALT |
| Tornverkstan | Ren timingmekanik | Perfektkedja, tornmiljöer och dagliga tre-försök-utmaningar utan straff | GLOBALT |
| Tålamodstornet | Timing kopplad till tålamod | Synlig rytm, falska lockbeten och reflektion efter rundan | GLOBALT |
| Färgfusion | Begriplig merge-progression | Förhandsplanering, specialbrickor som tjänas via skicklighet och slutmål | GLOBALT |
| Fruktfångaren | Språk och rörelse i samma loop | Felvänlig adaptiv ordpool och kombo för säkert hörande | GLOBALT |
| Bistroblixten | Tempo och ordningsbyggande | Kundpersonligheter, kvalitetsbonus och mindre läsning per beslut | GLOBALT |
| Accentjakten | Kort och skarp stavningsövning | Felmönster som återkommer smart och tydlig accentförklaring | GLOBALT |
| Ordbron | Varje svar bygger något synligt | Brodelar med olika funktion och slutlig testvandring | GLOBALT |
| Brobyggarna | Kreativ ritfysik | Flera giltiga lösningar, materialbudget och stjärnor för enkelhet | GLOBALT |
| Träffa rätt | Rita–släpp ger fin aha-känsla | Lösningsmedaljer, nya hinder och omedelbar omstart | GLOBALT |
| Poppa ballongerna | Ordning och fysik i en resa | Färre döda väntesekunder, trickskott och tydliga banmål | GLOBALT |
| Rädda ägget | Spänning genom fallhastighet | Skademätare, materialtyper och flera räddningsstrategier | GLOBALT |
| Sikta rätt | Bra slangbågekänsla | Vind, precisionzoner, ghost av personbästa och korta banserier | GLOBALT |
| Kulbanan | Byggande före simulering | Lösningsfrihet, färre trial-and-error-stopp och skaparläge | GLOBALT |
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
