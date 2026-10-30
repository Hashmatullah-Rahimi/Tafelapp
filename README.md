# Tafels

A small web app for learning and practising the multiplication tables (tafels).
It has a dark, modern and colourful design and works in any web browser.

Made by Hashmat.

## Features

The page has three cards:

### 1. Left: Tafel van ... (learn)
- Type any number and press **GO!** (or Enter).
- It shows the full table from `1 x n` to `10 x n`, so you can look at it and learn it.
- When the page opens, the table of 5 is shown.

### 2. Middle: Oefenen (practise)
- Type a number and press **START** (or Enter).
- You get 10 sums from that table in a **random order**, for example `4 x 6 = ?`, then `9 x 6 = ?`.
  Every sum from 1 to 10 is asked exactly once.
- Type your answer and press **Check** (or Enter):
  - **Correct** shows a green "✓ Goed!" and goes to the next sum.
  - **Wrong** shows a red "✗ Fout!" with the correct answer and goes to the next sum.
- Below the question you see all your answers so far in green (correct) or red (wrong).
- After 10 sums you see your score (for example `8 / 10`) and a **Nog een keer** button to try again.

### 3. Right: Geheugen (memory)
- Every finished practice round is saved here with the table, the time and the score.
- Score colours: green = 10/10, yellow = 7 or more, red = less than 7.
- Click a round to see which sums were right and which were wrong.
  Wrong answers are crossed out with the correct answer next to them.
- Press **↺** to practise that table again.
- Press **Wis geheugen** to clear the memory.
- The memory is saved in the browser (`localStorage`), so it is still there after you refresh the page.

You can use any number, for example 6, 13, 25 or 100.

## Files

| File | What it does |
|------|--------------|
| `index.html` | The structure of the page with the three cards |
| `style.css` | The design: dark background, glowing colour blobs, gradients and animations |
| `tafelapp.js` | All the logic: showing tables, practising, checking answers and the memory |

## How to use

1. Put `index.html`, `style.css` and `tafelapp.js` together in the **same folder**.
2. Open `index.html` in a web browser (Chrome, Edge, Firefox or Safari).
3. An internet connection is needed for Bootstrap and the Poppins font, which load from the web.

## Built with

- HTML, CSS and JavaScript
- [Bootstrap 5.3](https://getbootstrap.com/) for the layout
- [Google Fonts: Poppins](https://fonts.google.com/specimen/Poppins)
