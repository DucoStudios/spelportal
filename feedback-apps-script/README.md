# Spelportalens feedbackmottagare

Detta är Google Apps Script-koden som tar emot anonym feedback från spelportalen och skriver den i det privata
Google Sheet-dokumentet `Spelportalen – anonym spelarfeedback`.

## Driftsättning

1. Öppna feedback-dokumentet i Google Sheets.
2. Välj **Tillägg → Apps Script**.
3. Ersätt `Code.gs` med innehållet i den här mappens `Code.gs`.
4. Öppna projektinställningarna, aktivera visning av manifestfil och ersätt `appsscript.json` med filen här.
5. Välj **Distribuera → Ny distribution → Webbapp**.
6. Kör som **mig** och ge åtkomst till **alla**. Bekräfta sedan distributionen.
7. Kopiera `/exec`-adressen till `endpoint` i `feedback-config.js`.

Webbappen samlar inte in namn eller e-post. Den accepterar endast portalens kända spel-id:n, heltalsbetyg 1–5,
meddelanden på högst 240 tecken och portalens publika sid-URL. Text neutraliseras innan den skrivs till Sheet för
att hindra att feedback tolkas som kalkylbladsformler.
