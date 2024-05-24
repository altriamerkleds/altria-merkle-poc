export default function scancode(block) {
    const inputEl = [...block.firstElementChild.children];
    console.log(inputEl[0].children[0].innerHTML);
    var container = document.querySelector(".scancode");
    var scinput = document.createElement("input");
    container.firstElementChild.append(scinput);
    scinput.placeholder=inputEl[0].children[0].innerHTML
    inputEl[0].children[0].classList.add('input-text')
}