
const $input = document.querySelector("[required]");
const $span = document.getElementById("input-alert");

let approve = true;

$input.addEventListener("keyup", (e) => {
    let pattern = e.target.pattern

    if(pattern){
        let regEx = new RegExp(pattern)
        regEx.test(e.target.value)
            ? $span.classList.remove("invalid")
            : $span.classList.add("invalid");
    }
})

