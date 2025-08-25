import { html, render } from '../node_modules/lit-html/lit-html.js';

import { data, products } from "./data.js";
import { dom } from "./dom.js";
import { getTemplate } from "./templating.js";

// -------------- IMPORTANT --------------
// const greetingTemplate = (name) => html `<h2>Hello, ${name}!</h2>`; // 'html' make HTML template from string.
// render(greetingTemplate('Lit-HTML'), document.querySelector('main')); // We display the html content throught 'render' function in first argument and the 2nd el is the el where we want to append this template.


// const name = 'Peter';
// const result = myTag `hello, ${name}`;

// function myTag(strings, ...values) {
//     console.log(strings, values);
//     return '';
// }
// -------------- IMPORTANT --------------

const userBlock = (user) => html`
<article class="user-block" data-id="12345">
    <span style="background-color: red">Username: ${user.name}</span>
    <span>Phone: ${user.phone}</span>
</article>
`;

const productTemplate = (product) => html`
<div class="product">
    <span style=${'color: ' + product.color}>Label: ${products.label}</span>
    <span>Price: $${products.price}</span>
    <input type="number" .value="${product.qty}">
    <button ?disabled=${product.qty == 0} @click=${() => buyProduct(product)}>Buy</button>
    ${ product.qty == 0 ? html`<span>Out of Stock</span>` : html`<span>Free shipping available for premium users</span>`}
</div>
`;
// Like this we add style to html element.
// Even if we set disabled to 'false' in html document, the browser always displays it like 'true'.
// We add '.' in front of 'value', because we don't want the value to be like placeholder in the element.
// With '@' we add '.addEventListener'.

const greetingTemplate = (name) => html `
<h2>Hello, ${name}!</h2>
`;

const head = document.querySelector('header');
const main = document.querySelector('main');
const list = document.getElementById('products');

window.head = null;

document.querySelector('button').addEventListener('click', () => {
    render(greetingTemplate('Peter'), head);
});

start();

async function start() {
    render(greetingTemplate('Guest'), head);
    render(data.map(userBlock), main); // Here we use '.map()', because the first element will return array.
    render(products.map(productTemplate), list);

    window.head = document.querySelector('h2');;
}

function buyProduct(product) {
    alert(`You bought ${product.label} for $${product.price}`);
}