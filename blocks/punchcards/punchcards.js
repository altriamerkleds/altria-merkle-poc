import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'punchcard-image';
      else div.className = 'punchcard-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
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
  const punchCardCount = punchcardContainer.getAttribute('data-puchcardshow');

  // Event listeners for buttons
  document.querySelector('.prev-btn').addEventListener('click', () => {
    const index = [...items].findIndex((item) => item.classList.contains('active'));
    if (index >= 1) 
      { showItem((index - 1)); }
    else { showItem(punchCardCount - 1); }
  });
  document.querySelector('.next-btn').addEventListener('click', () => {
    const index = [...items].findIndex((item) => item.classList.contains('active'));
    showItem((index + 1) % punchCardCount);
  });

  if (punchDataNumberValue === 'true') {
    const totalLIItems = items.length;
    const numberDiv = document.createElement('div');
    const numberUl = document.createElement('ul');
    numberDiv.className = 'punchcards-numbers';
    numberUl.className = 'punchcards-numberlist';

    let i = 1;
    do {
      const numberLi = document.createElement('li');
      numberLi.innerText = i;
      numberLi.className = 'punchcards-numbers';
      if (i <= punchCardCount) {
        numberLi.style.color = '#ffffff';
        numberLi.addEventListener('click', (e) => {
          e.preventDefault();
          const nextSlideIndex = e.target.innerText;
          showItem((nextSlideIndex - 1 + items.length) % items.length);
        });
      }
      numberUl.append(numberLi);
      // eslint-disable-next-line no-plusplus
      i++;
    } while (i <= totalLIItems);
    numberDiv.append(numberUl);
    punchcardWrapper.append(numberDiv);
  }
}
