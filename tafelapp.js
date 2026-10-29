// ---------- LINKS: tafel bekijken ----------
let inputLinksObj = document.getElementById("inputTafelLinks");
let outputLinksObj = document.getElementById("outputTafelLinks");
let titelLinksObj = document.getElementById("titelLinks");

// ---------- MIDDEN: oefenen ----------
let inputMiddenObj = document.getElementById("inputTafel");
let titelMiddenObj = document.getElementById("titelMidden");
let oefenVakObj = document.getElementById("oefenVak");
let oefening = null; // { tafel, teller, antwoorden: [] }

// ---------- RECHTS: geheugen ----------
let geheugenObj = document.getElementById("geheugen");
let geheugen = [];


// Rondt af zodat bv. 0.1 x 3 netjes 0.3 wordt
function rond(getal) {
    return Math.round(getal * 1e10) / 1e10;
}

function schud(inputObj) {
    inputObj.classList.add("fout");
    setTimeout(function () { inputObj.classList.remove("fout"); }, 500);
}

function maakTafel(tafel) {
    let output = "";
    for (let teller = 1; teller < 11; teller++) {
        output += "<div class='regel'><span>" + teller + " x " + tafel + "</span><b>" + rond(teller * tafel) + "</b></div>";
    }
    return output;
}


// ===== LINKS =====
function toonLinks(tafel) {
    inputLinksObj.value = tafel;
    titelLinksObj.innerHTML = "Tafel van " + tafel;
    outputLinksObj.innerHTML = maakTafel(tafel);
    outputLinksObj.classList.remove("pop");
    void outputLinksObj.offsetWidth;
    outputLinksObj.classList.add("pop");
}

function showTafel() {
    if (inputLinksObj.value === "") {
        schud(inputLinksObj);
        return;
    }
    toonLinks(Number(inputLinksObj.value));
}


// ===== MIDDEN: OEFENEN =====
function startOefenen(tafel) {
    if (tafel === undefined) {
        if (inputMiddenObj.value === "") {
            schud(inputMiddenObj);
            return;
        }
        tafel = Number(inputMiddenObj.value);
    }

    inputMiddenObj.value = tafel;
    titelMiddenObj.innerHTML = "Oefenen: tafel van " + tafel;

    let volgorde = hussel([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    oefening = { tafel: tafel, volgorde: volgorde, stap: 0, teller: volgorde[0], antwoorden: [] };
    toonVraag("");
}

// Zet de getallen in een willekeurige volgorde (elk getal komt 1 keer voor)
function hussel(lijst) {
    for (let i = lijst.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tijdelijk = lijst[i];
        lijst[i] = lijst[j];
        lijst[j] = tijdelijk;
    }
    return lijst;
}

// Lijst met alles wat je al beantwoord hebt
function maakVoortgang() {
    let output = "<div class='voortgang'>";
    for (let i = 0; i < oefening.antwoorden.length; i++) {
        let a = oefening.antwoorden[i];
        if (a.goed) {
            output += "<div class='regel goed'><span>" + a.teller + " x " + oefening.tafel + " = " + a.gegeven + "</span><b>✓</b></div>";
        } else {
            output += "<div class='regel fout-regel'><span>" + a.teller + " x " + oefening.tafel + " = <s>" + a.gegeven + "</s> " + a.juist + "</span><b>✗</b></div>";
        }
    }
    output += "</div>";
    return output;
}

function toonVraag(melding) {
    let output = melding;
    output += "<div class='stap'>Vraag " + (oefening.stap + 1) + " van 10</div>";
    output += "<div class='vraag'>" + oefening.teller + " x " + oefening.tafel + " = ?</div>";
    output += "<div class='antwoord-rij'>";
    output += "<input type='number' id='antwoordInput' class='form-control' placeholder='?'>";
    output += "<button class='btn btn-go' onclick='controleer()'>Check</button>";
    output += "</div>";
    output += maakVoortgang();
    oefenVakObj.innerHTML = output;

    let antwoordObj = document.getElementById("antwoordInput");
    antwoordObj.addEventListener("keydown", function (e) { if (e.key === "Enter") controleer(); });
    antwoordObj.focus();
}

function controleer() {
    let antwoordObj = document.getElementById("antwoordInput");
    if (antwoordObj.value === "") {
        schud(antwoordObj);
        return;
    }

    let gegeven = Number(antwoordObj.value);
    let juist = rond(oefening.teller * oefening.tafel);
    let goed = gegeven === juist;
    oefening.antwoorden.push({ teller: oefening.teller, gegeven: gegeven, juist: juist, goed: goed });

    let melding;
    if (goed) {
        melding = "<div class='melding melding-goed'>✓ Goed! " + oefening.teller + " x " + oefening.tafel + " = " + juist + "</div>";
    } else {
        melding = "<div class='melding melding-fout'>✗ Fout! Jij zei " + gegeven + ", maar " + oefening.teller + " x " + oefening.tafel + " = " + juist + "</div>";
    }

    oefening.stap++;
    if (oefening.stap >= 10) {
        klaar(melding);
    } else {
        oefening.teller = oefening.volgorde[oefening.stap];
        toonVraag(melding);
    }
}

function klaar(melding) {
    let score = 0;
    for (let i = 0; i < oefening.antwoorden.length; i++) {
        if (oefening.antwoorden[i].goed) score++;
    }

    let tekst = "Blijf oefenen, je kan het!";
    if (score === 10) tekst = "Perfect! Alles goed 🎉";
    else if (score >= 7) tekst = "Goed gedaan! 👍";

    let output = melding;
    output += "<div class='score'>" + score + " / 10</div>";
    output += "<div class='score-tekst'>" + tekst + "</div>";
    output += "<button class='btn btn-go mb-3' onclick='startOefenen(" + oefening.tafel + ")'>Nog een keer</button>";
    output += maakVoortgang();
    oefenVakObj.innerHTML = output;

    // Opslaan in het geheugen
    let tijd = new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    geheugen.unshift({ tafel: oefening.tafel, tijd: tijd, score: score, antwoorden: oefening.antwoorden });
    bewaarGeheugen();
    toonGeheugen();
}

function toonStart() {
    oefenVakObj.innerHTML = "<p class='leeg'>Kies een tafel en druk op START.<br>Dan krijg je 10 sommen om te oefenen!</p>";
}


// ===== RECHTS: GEHEUGEN =====
function toonGeheugen() {
    if (geheugen.length === 0) {
        geheugenObj.innerHTML = "<p class='leeg'>Nog niks geoefend.<br>Je resultaten komen hier.</p>";
        return;
    }

    let output = "";
    for (let i = 0; i < geheugen.length; i++) {
        let item = geheugen[i];
        let scoreKlasse = item.score === 10 ? "pill-perfect" : (item.score >= 7 ? "pill-goed" : "pill-fout");

        output += "<details class='geheugen-item'>";
        output += "<summary>";
        output += "<span class='badge-tafel'>" + item.tafel + "</span>";
        output += "<span class='info'>Tafel van " + item.tafel + "<small>" + item.tijd + "</small></span>";
        output += "<span class='score-pill " + scoreKlasse + "'>" + item.score + "/10</span>";
        output += "<span class='terug' title='Nog een keer oefenen' onclick='event.preventDefault(); startOefenen(" + item.tafel + ")'>↺</span>";
        output += "</summary>";
        output += "<div class='mini-tafel'>";
        for (let j = 0; j < item.antwoorden.length; j++) {
            let a = item.antwoorden[j];
            if (a.goed) {
                output += "<div class='regel goed'><span>" + a.teller + " x " + item.tafel + " = " + a.gegeven + "</span><b>✓</b></div>";
            } else {
                output += "<div class='regel fout-regel'><span>" + a.teller + " x " + item.tafel + " = <s>" + a.gegeven + "</s> " + a.juist + "</span><b>✗</b></div>";
            }
        }
        output += "</div>";
        output += "</details>";
    }
    geheugenObj.innerHTML = output;
}

function wisGeheugen() {
    geheugen = [];
    bewaarGeheugen();
    toonGeheugen();
}

function bewaarGeheugen() {
    try { localStorage.setItem("tafelOefenGeheugen", JSON.stringify(geheugen)); } catch (e) { }
}

function laadGeheugen() {
    try {
        let opgeslagen = localStorage.getItem("tafelOefenGeheugen");
        if (opgeslagen) { geheugen = JSON.parse(opgeslagen); }
    } catch (e) { geheugen = []; }
}


// ===== Enter-toets =====
inputLinksObj.addEventListener("keydown", function (e) { if (e.key === "Enter") showTafel(); });
inputMiddenObj.addEventListener("keydown", function (e) { if (e.key === "Enter") startOefenen(); });


// ===== Start =====
laadGeheugen();
toonLinks(5);
toonStart();
toonGeheugen();
