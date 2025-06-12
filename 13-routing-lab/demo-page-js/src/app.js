import page from "../node_modules/page/page.mjs";
import { render } from '../node_modules/lit-html/lit-html.js';

import { showAbout } from "./views/about.js";
import { showCatalog } from "./views/catalog.js";
// import { showContact } from "./views/contact.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { notFound } from "./views/notFound.js";

function decorateContext(ctx, next) {
    ctx.render = function (content) {
        render(content, document.querySelector('main'));
    }
    next();
}

// The router matches ONLY the first pattern (function) for the page! Be carefull with the order!
page(decorateContext); // This is global and all pages will have access to this function!
page('/index.html', '/');
page('/', showHome);
page('/recipes', showCatalog);
page('/catalog/create', showCreate);
page('/recipes/:id', showDetails);
page('/about', showAbout);
// page('/contact*', showContact); // * symbol means catch everything after 'contact'
// page('/contact', showContact);
page('*', notFound); // Like this we catch the 404 error

page.start(); // For starting the library