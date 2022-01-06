let plus = document.getElementsByClassName("plus");
let minus = document.getElementsByClassName("minus");
let next = document.getElementsByClassName("next");
for (let x = 0; x < plus.length; x++) {
    plus[x].addEventListener("click", increase);
    minus[x].addEventListener("click", increase);
    next[x].addEventListener("click", next_screen);
}
let input = 3;

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

function next_screen() {
    console.log("test")

}