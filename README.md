# Tafels

Een kleine webapp om de tafels van vermenigvuldiging te leren en te oefenen.
De app heeft een donker, modern en kleurrijk ontwerp en werkt in elke webbrowser.

Gemaakt door Hashmat.

## Functies

De pagina heeft drie kaarten:

### 1. Links: Tafel van ... (leren)
- Typ een getal en druk op **GO!** (of Enter).
- Je ziet de hele tafel van `1 x n` tot en met `10 x n`, zodat je hem kunt bekijken en leren.
- Als de pagina opent, staat de tafel van 5 al klaar.

### 2. Midden: Oefenen
- Typ een getal en druk op **START** (of Enter).
- Je krijgt 10 sommen van die tafel in een **willekeurige volgorde**, bijvoorbeeld eerst `4 x 6 = ?` en daarna `9 x 6 = ?`.
  Elke som van 1 tot en met 10 komt precies één keer voorbij.
- Typ je antwoord en druk op **Check** (of Enter):
  - **Goed** geeft een groene melding "✓ Goed!" en gaat door naar de volgende som.
  - **Fout** geeft een rode melding "✗ Fout!" met het juiste antwoord en gaat door naar de volgende som.
- Onder de vraag zie je al je antwoorden tot nu toe, in het groen (goed) of rood (fout).
- Na 10 sommen zie je je score (bijvoorbeeld `8 / 10`) en een knop **Nog een keer** om opnieuw te oefenen.

### 3. Rechts: Geheugen
- Elke afgeronde oefenronde wordt hier bewaard, met de tafel, de tijd en de score.
- Kleuren van de score: groen = 10/10, geel = 7 of meer, rood = minder dan 7.
- Klik op een ronde om te zien welke sommen goed en welke fout waren.
  Foute antwoorden zijn doorgestreept, met het juiste antwoord ernaast.
- Druk op **↺** om die tafel nog een keer te oefenen.
- Druk op **Wis geheugen** om het geheugen leeg te maken.
- Het geheugen wordt in de browser opgeslagen (`localStorage`), dus het blijft bewaard als je de pagina ververst.

Je kunt elk getal gebruiken, bijvoorbeeld 6, 13, 25 of 100.

## Bestanden

| Bestand | Wat het doet |
|---------|--------------|
| `index.html` | De opbouw van de pagina met de drie kaarten |
| `style.css` | Het ontwerp: donkere achtergrond, gloeiende kleurvlekken, kleurverlopen en animaties |
| `tafelapp.js` | Alle logica: tafels tonen, oefenen, antwoorden controleren en het geheugen |

## Gebruik

1. Zet `index.html`, `style.css` en `tafelapp.js` samen in **dezelfde map**.
2. Open `index.html` in een webbrowser (Chrome, Edge, Firefox of Safari).
3. Je hebt internet nodig, want Bootstrap en het lettertype Poppins worden van internet geladen.

## Gemaakt met

- HTML, CSS en JavaScript
- [Bootstrap 5.3](https://getbootstrap.com/) voor de opmaak
- [Google Fonts: Poppins](https://fonts.google.com/specimen/Poppins)
