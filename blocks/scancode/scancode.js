export default function scancode(block) {
  const container = document.querySelector('.scancode');
  const scinput = document.createElement('input');
  const inputEl = [...block.firstElementChild.children];
  container.firstElementChild.append(scinput);
  scinput.placeholder = inputEl[0].children[0].innerHTML;
  inputEl[0].children[0].classList.add('input-text');
}
