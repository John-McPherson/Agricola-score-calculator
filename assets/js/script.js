function addEventListeners() {
    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let next = document.getElementsByClassName("next");
    for (let x = 0; x < plus.length; x++) {
        plus[x].addEventListener("click", increase);
        minus[x].addEventListener("click", increase);
        if (round === 0) {
            next[x].addEventListener("click", setUp);
        } else {
            next[x].addEventListener("click", newScreen);
        }
    }
}
let input = 3;
let playerCount = 3;
let currentPlayer = 0;
let min = 2;
let max = 5;
let players = [];
let type = ["", "Fields", "Pastures", "Grain", "Vegetables", "Sheep", "Wild Boar", "Cattle", "Unused Spaces", "Fenced Stables and Clay Hut Rooms", "Stone House Rooms", "Family Members", "Points For Cards", "Bonus Points"]
let pointValue = ["", [2, 3, 4, 5],
    [1, 2, 3, 4],
    [1, 4, 6, 8],
    [1, 2, 3, 4],
    [1, 4, 6, 8],
    [1, 3, 5, 7],
    [1, 2, 4, 6]
]
let round = 0;

function increase() {
    if (this.className === "plus" && input < max) {
        input++
    } else if (this.className === "minus" && input > min) {
        input--
    }
    updateInput()
}

function updateInput() {
    let output = document.getElementsByClassName("input-text")[0]
    output.innerHTML = `${input}`
}

function setUp() {
    let output = document.getElementsByClassName("input-text")[0]
    playerCount = parseInt(output.innerHTML);
    newPlayer(1)

}


function nextScreen() {
    input = 0;
    let setupArea = document.getElementById("set-up")
    setupArea.innerHTML = `
    <h1>Agricola Score Calculator</h1>
    <h2>${players[currentPlayer].playerName}</h2>
    <p>How Many ${type[round]}?</p>
    <p class="input-text">0</p>
    <span class="plus-minus">
        <button class="minus">-</button>
        <button class="plus">+</button>
    </span>

    <span>
        <button class="next">Next</button>
    </span>
    `
    addEventListeners()

}

function newScreen() {
    updateScore()
    if (currentPlayer !== playerCount - 1) {
        currentPlayer++
        nextScreen()
    } else {
        round++
        currentPlayer = 0;
        if (round > 13) {
            displayTotal();
        } else {
            nextScreen();
        }
    }

}

function displayTotal() {
    let setupArea = document.getElementById("set-up")
    let html = ""
    for (let x = 0; x < playerCount; x++) {
        let name = players[x].playerName
        let totalScore = players[x].totalPoints
        html += `<p>${name} scored ${totalScore}</p>`
    }
    setupArea.innerHTML = `${html}`
}

function updatePlayer(event) {
    event.preventDefault();
    let name = document.getElementById("name").value
    let player = {
        playerName: name,
        totalPoints: 0
    }
    players.push(player)
    newPlayer(players.length + 1)
}

function updateScore() {
    let score = input;
    if (type[round] === "Unused Spaces") {
        score = input * -1;
    } else if (type[round] === "Fenced Stables and Clay Hut Rooms") {
        score = input * 1;
    } else if (type[round] === "Stone House Rooms") {
        score = input * 2;
    } else if (type[round] === "Family Members") {
        score = input * 3;
    } else if (type[round] === "Points For Cards" || type[round] === "Bonus Points") {
        score = input;
    } else {
        score = workoutScore()
    }
    players[currentPlayer][type[round]] = score;
    players[currentPlayer]['totalPoints'] = players[currentPlayer]['totalPoints'] + score;
}

function workoutScore() {
    if (input < pointValue[round][0]) {
        return -1
    } else if (input < pointValue[round][1]) {
        return 1
    } else if (input < pointValue[round][2]) {
        return 2
    } else if (input < pointValue[round][3]) {
        return 3
    } else {
        return 4
    }
}

function newPlayer(y) {
    if (y <= playerCount) {
        let setupArea = document.getElementById("set-up")
        setupArea.innerHTML = `<h1>Agricola Score Calculator</h1> 
    <form onsubmit="updatePlayer(event)">
    <label for="name">
        <h2>Player ${y} name</h2>
    </label>
    <input type="text" id="name" required>
    <input type="submit">
</form>
    `
    } else {
        round++
        min = 0;
        max = 100;
        nextScreen()

    }
}
addEventListeners()