// Judge: 60/100

import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js'; // Here 'towns' is an array.

const townsRoot = document.getElementById('towns');
const resultRoot = document.getElementById('result');
document.querySelector('button').addEventListener('click', search);

update();

function update(text) {
   const ul = searchTemplate(towns, text);
   render(ul, townsRoot);
}

function searchTemplate(townsName, match) {
   const ul = html`
      <ul>
         ${townsName.map(townName => createLiTemplate(townName, match))}
      </ul>`;

   return ul;
}

function createLiTemplate(town, match) {
   return html`
      <li class=${(match && town.toLowerCase().includes(match)) ? 'active' : ''}>${town}</li>
   `;
}
// ^ If we don't have 'match', it will return 'false' and that means the whole in  first () will return 'false'.
// ^ If the element has a match, add class 'active'. In the other hand add empty string.
// The input value is turned to 'lowerCase', so we should turn all the towns into 'lowerCase'.

function search() {
   const textNode = document.getElementById('searchText');
   const text = textNode.value.toLowerCase(); // It doesn't matter of the text, the app should match the letters.

   update(text);
   updateCount();
   textNode.value = '';
}

function updateCount() {
   const count = document.querySelectorAll('.active').length;
   const countElement = count ? html`<p>${count} matches found</p>` : '';

   render(countElement, resultRoot);
}