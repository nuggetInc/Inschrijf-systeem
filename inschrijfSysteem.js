let kleuren = [
    "#ee0000",
    "#00ee00",
    "#0000ee",
    "#00eeee",
    "#eeee00",
    "#ee00ee",
]

let volgendeKleur = 0;
let spelerNamen = [];
let spelerKleuren = [];
let battles = [];

function CheckSpelers() {
    spelerNamen = document.getElementsByClassName("text");
    spelerKleuren = document.getElementsByClassName("color");
    //console.log(spelers);
    //console.log(spelers.length);
    let ingevuldeVakjes = 0;
    for (let i = 0; i < spelerNamen.length; i++) {
        if (spelerNamen[i].value != "") {
            ingevuldeVakjes++;
        }
    }

    if (ingevuldeVakjes == spelerNamen.length) {
        VoegSpelerToe();
    }
};

function VoegSpelerToe() {
    let item = document.createElement("div");
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let inputtext = document.createElement("input");
    let inputcolor = document.createElement("input");

    inputtext.setAttribute("class", "text");
    inputtext.setAttribute("type", "text");
    inputtext.setAttribute("onkeyup", "CheckSpelers()");
    inputcolor.setAttribute("class", "color");
    inputcolor.setAttribute("type", "color");

    inputcolor.value = kleuren[volgendeKleur % kleuren.length];
    volgendeKleur++

    li1.appendChild(inputtext);
    li2.appendChild(inputcolor)

    item.appendChild(li1);
    item.appendChild(li2);

    document.getElementById("inputfields").appendChild(item);

}

function StartTournament() {
    if (spelerNamen.length < 2) {
        return;
    }

    document.getElementById("select").setAttribute("style", "display: none;");
    document.getElementById("versus").setAttribute("style", "");

    for (let i = 0; i < spelerNamen.length - 1; i++) {
        for (let j = 0; j <= i; j++) {
            if (i != j) {
                battles[battles.length] = [i, j];
            }
        }
    }
    console.log(battles);
    NextBattle();
}

let spelerScores = [];
function Victory(i) {
    if (spelerScores[battles[previousBattle][i]] == null) {
        spelerScores[battles[previousBattle][i]] = 0;
    }
    spelerScores[battles[previousBattle][i]]++;

    NextBattle();
}

let previousBattle = -1;
function NextBattle() {
    previousBattle++;
    if (previousBattle < battles.length) {
        StartBattle(spelerNamen[battles[previousBattle][0]].value, spelerNamen[battles[previousBattle][1]].value,
            spelerKleuren[battles[previousBattle][0]].value, spelerKleuren[battles[previousBattle][1]].value);
    } else {
        document.getElementById("versus").setAttribute("style", "display: none;");
        document.getElementById("winscreen").setAttribute("style", "");

        document.getElementById("winner").innerHTML = spelerNamen[indexOfMax(spelerScores)].value;
        document.getElementById("winScore").innerHTML = spelerScores[indexOfMax(spelerScores)];

        let str = "";
        for (let i = 0; i < spelerNamen.length - 1; i++) {
            str = str + spelerNamen[i].value + ": " + spelerScores[i] + "<br>";
        }
        document.getElementById("allScores").innerHTML = str;
    }
}

function StartBattle(player1, player2, kleur1, kleur2) {
    document.getElementById("player1").innerHTML = player1;
    document.getElementById("player2").innerHTML = player2;

    document.getElementById("kleur1").setAttribute("style", `background-color: ${kleur1};`);
    document.getElementById("kleur2").setAttribute("style", `background-color: ${kleur2};`);

    document.getElementById("player1").animate([
        // keyframes
        { marginLeft: '-1000px' },
        { marginLeft: '0px' }
    ], {
        // timing options
        duration: 400,
        iterations: 1
    });

    document.getElementById("player2").animate([
        // keyframes
        { marginRight: '-1000px' },
        { marginRight: '0px' }
    ], {
        // timing options
        duration: 400,
        iterations: 1
    });

    document.getElementById("balk").animate([
        // keyframes
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(10deg)' }
    ], {
        // timing options
        duration: 300,
        iterations: 1
    });

    document.getElementById("kleur1").animate([
        // keyframes
        { background: 'black' },
        { background: 'black' },
        { background: 'black' },
        { background: 'black' },
        { background: 'blue' }
    ], {
        // timing options
        duration: 300,
        iterations: 1
    });

    document.getElementById("kleur2").animate([
        // keyframes
        { background: 'black' },
        { background: 'black' },
        { background: 'black' },
        { background: 'black' },
        { background: 'red' }
    ], {
        // timing options
        duration: 300,
        iterations: 1
    });
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = 0;
    var maxIndex = 0;

    for (var i = 0; i < spelerNamen.length; i++) {
        if (arr[i] == null) {
            arr[i] = 0;
        }
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

window.onload = VoegSpelerToe