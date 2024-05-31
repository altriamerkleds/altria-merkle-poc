import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  let garbage = [];
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'punchcard-image';
      else div.className = 'punchcard-body';
      if (div.children.length === 3) {
        li.lastChild.style.display='none';
        garbage = li.lastChild.lastChild.innerText;
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false)));
  block.textContent = '';
  block.append(ul);
  
  function decode(encodedString) {
    const tmpElement = document.createElement('span');
    tmpElement.innerHTML = encodedString;
    return tmpElement.innerHTML;
  }

  const carousel = document.querySelector('.punchcards');
  const items = carousel.querySelectorAll('li');
  carousel.querySelector('li:first-child').className = 'active';
  const prev = document.createElement('span');
  const next = document.createElement('span');
  prev.className = 'prev-btn';
  next.className = 'next-btn';
  prev.textContent = decode('&#8249;');
  next.textContent = decode('&#8250;');
  carousel.prepend(prev);
  carousel.append(next);

  function showItem(index) {
    items.forEach((item, idx) => {
      item.classList.remove('active');
      if (idx === index) {
        item.classList.add('active');
      }
    });
  }

  // Numbers code
  const punchcardContainer = document.querySelector('.punchcards-container');
  const punchcardWrapper = document.querySelector('.punchcards-wrapper');
  const punchDataNumberValue = punchcardContainer.getAttribute('data-numbers');
  // Event listeners for buttons
  document.querySelector('.prev-btn').addEventListener('click', () => {
    const index = [...items].findIndex((item) => item.classList.contains('active'));
    showItem((index - 1 + items.length) % items.length);
  });
  document.querySelector('.next-btn').addEventListener('click', () => {
    const index = [...items].findIndex((item) => item.classList.contains('active'));
    showItem((index + 1) % items.length);
  });

  if (punchDataNumberValue === 'true') {
    const cardPunchCount = 10;
    const numberDiv = document.createElement('div');
    const numberUl = document.createElement('ul');
    numberDiv.className = 'punchcards-numbers';
    numberUl.className = 'punchcards-numberlist';

    let i = 1;
    do {
      const numberLi = document.createElement('li');
      numberLi.innerText = i;
      numberLi.className = 'punchcards-numbers';
      numberUl.append(numberLi);
      // eslint-disable-next-line no-plusplus
      i++;
    } while (i <= cardPunchCount);
    numberDiv.append(numberUl);
    punchcardWrapper.append(numberDiv);
  }
}
