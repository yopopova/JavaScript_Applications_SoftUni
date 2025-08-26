import { data, products } from "./data.js";
import { dom } from "./dom.js";
import { getTemplate } from "./templating.js";

start();

async function start() {
    const main = document.querySelector('main');
    const list = document.getElementById('products');

    for(let user of data) {
        // const html = await getTemplate('user-block', user); // Like this we catch the html code. This is async so the function 'start' should also be async.
        // main.innerHTML += html; // Here we import the template on the page.

        // const element = dom('article', {className: 'user-block'}, dom('span', {}, `Username: ${user.name}`), dom('span', { onClick: () => alert('Messaging ' + user.phone) }, `Phone: ${user.phone}`));
        main.appendChild(userBlock(user));
    }

    for(let product of products) {
        const html = await getTemplate('product', product);
        list.innerHTML += html;
    }
}

function userBlock(user) {
    return dom('article', {className: 'user-block'}, dom('span', { style: {'backgroundColor': 'red'} }, `Username: ${user.name}`), dom('span', { onClick: () => alert('Messaging ' + user.phone) }, `Phone: ${user.phone}`));
    
}