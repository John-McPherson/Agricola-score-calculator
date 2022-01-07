function addEventListeners() {
    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let next = document.getElementsByClassName("next");
    for (let x = 0; x < plus.length; x++) {
        plus[x].addEventListener("click", increase);
        minus[x].addEventListener("click", increase);
        next[x].addEventListener("click", set_up);
    }
}
let input = 3;
let player_count = 3;
let players = [];
type = ["Fields", "pastures"]

function increase() {
    if (this.className === "plus" && input < 5) {
        input++
    } else if (this.className === "minus" && input > 2) {
        input--
    }
    update_input()
}

function update_input() {
    let output = document.getElementsByClassName("input-text")[0]
    output.innerHTML = `${input}`
}

function set_up() {
    let output = document.getElementsByClassName("input-text")[0]
    player_count = parseInt(output.innerHTML);
    newPlayer(1)

}


function nextScreen() {
    input = 0;
    let setupArea = document.getElementById("set-up")
    setupArea.innerHTML = `
    <h1>Agricola Score Calculator</h1>
    <h2>${players[0].playerName}</h2>
    <p>How Many ${type[0]}?</p>
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

function updatePlayer(event) {
    event.preventDefault();
    let name = document.getElementById("name").value
    let player = {
        playerName: name
    }
    players.push(player)
    console.log(players)
    newPlayer(players.length + 1)
}

function newPlayer(y) {
    if (y <= player_count) {
        console.log(y)
        let setup_area = document.getElementById("set-up")
        setup_area.innerHTML = `<h1>Agricola Score Calculator</h1> 
    <form onsubmit="updatePlayer(event)">
    <label for="name">
        <h2>Player ${y} name</h2>
    </label>
    <input type="text" id="name" required>
    <input type="submit">
</form>
    `
    } else {
        nextScreen()

    }
}
addEventListeners()