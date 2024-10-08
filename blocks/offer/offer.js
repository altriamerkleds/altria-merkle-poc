import { getMetadata } from '../../scripts/aem.js';
export default function scancode(block) {
   const offerMeta = getMetadata('offer');
   [...block.children].forEach((row) => {
      const cols = row.children;
      if (cols.length == 1) {
        const text = cols[0].textContent.trim();
        console.log(offerMeta);
        var regExp = new RegExp("{{ fds }}");  // regex pattern string
        const updated_text=text.replace(regExp,offerMeta);
        const punchCardWrapper = document.querySelector('.offer-wrapper');
        punchCardWrapper.removeChild(punchCardWrapper.firstChild);
        const textElement = document.createElement('p');
        textElement.innerText = updated_text;
        punchCardWrapper.append(textElement);
      }
    });


}
