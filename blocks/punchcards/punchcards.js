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

  // Event listeners for buttons
  document.querySelector('.prev-btn').addEventListener('click', () => {
    const index = [...items].findIndex((item) => item.classList.contains('active'));
    showItem((index - 1 + items.length) % items.length);
  });

  document.querySelector('.next-btn').addEventListener('click', () => {
    const index = [...items].findIndex((item) => item.classList.contains('active'));
    showItem((index + 1) % items.length);
  });
}
