let plus = document.getElementsByClassName("plus");
let minus = document.getElementsByClassName("minus");
for (let x = 0; x < plus.length; x++) {
    plus[x].addEventListener("click", increase);
    minus[x].addEventListener("click", increase);
}
let input = 3;

function increase() {
    if (this.className === "plus") {
        input++
    } else if (this.className === "minus") {
        input--
    }
    console.log(input)
}