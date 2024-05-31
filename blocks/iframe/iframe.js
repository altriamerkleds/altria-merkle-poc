export default function iframe(block) {
  const container = document.querySelector('.iframe');
  const ifrm = document.createElement('iframe');
  const inputEl = [...block.firstElementChild.children];
  const iframeValue = inputEl[0].children[0].innerHTML;
  container.firstElementChild.append(ifrm);
  ifrm.setAttribute("src", iframeValue);
  inputEl[0].children[0].classList.add('iframe-value');
}