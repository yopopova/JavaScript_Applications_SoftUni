import page from "../node_modules/page/page.mjs";
import { html, nothing, render } from '../node_modules/lit-html/lit-html.js';

import { showAbout } from "./views/about.js";
import { showCatalog } from "./views/catalog.js";
// import { showContact } from "./views/contact.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { notFound } from "./views/notFound.js";
import { showLogin } from "./views/login.js";
import { getUserData } from "./util.js";
import { showRegister } from "./views/register.js";
import { logout } from "./data/auth.js";

const navTemplate = (user) => html`
    <a href="/">Home</a>
    <a href="/recipes">Catalog</a>
    ${user ? html`<a href="/create">Create</a>` : nothing}
    <a href="/about">About</a>
    ${user ? html`<span>Welcome, ${user.username}</span><a href="/logout">Logout</a>` : html`
        <a href="/login">Login</a>
        <a href="/register">Register</a>`}
    `

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/')
}

function decorateContext(ctx, next) {
    render(navTemplate(ctx.user), document.querySelector('nav'));

    ctx.render = function (content) {
        render(content, document.querySelector('main'));
    }

    next();
}

function parseQuery(ctx, next) {
    // console.log(Object.fromEntries(ctx.querystring.split('&').map(e => e.split('='))));

    ctx.query = {};

    if (ctx.querystring) {
        const query = Object.fromEntries(ctx.querystring
            .split('&')
            .map(e => e.split('=')));
            Object.assign(ctx.query, query);
    }

    next();
}

function session(ctx, next) {
    const user = getUserData();

    if(user) {
        ctx.user = user;
    }

    next();
}

// The router matches ONLY the first pattern (function) for the page! Be carefull with the order!
page(session);
page(decorateContext); // This is global and all pages will have access to this function!
page(parseQuery);
page('/index.html', '/');
page('/', showHome);
page('/recipes', showCatalog);
page('/catalog/create', showCreate);
page('/recipes/:id', showDetails);
page('/about', showAbout);
page('/login', showLogin);
page('/register', showRegister);
page('/logout', onLogout);

// page('/contact*', showContact); // * symbol means catch everything after 'contact'
// page('/contact', showContact);
page('*', notFound); // Like this we catch the 404 error

page.start(); // For starting the library