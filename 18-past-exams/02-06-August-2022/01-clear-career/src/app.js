// For testing in browser.
// import * as api from './api/user.js';
// window.api = api;

import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';
import { logout } from "./api/user.js";
import { getUserData } from "./util.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from './views/home.js';
import { showLogin } from "./views/login.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/register.js";

// import * as api from './data/applications.js';
// window.api = api;

const main = document.querySelector('main');
// document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext); // This function should be invoked before others, if we want ot load the currect page template. It's global!
page('/index.html', '/'); // If we don't write this line, the app will redirect us to an empty home page.
page('/', showHome);
// page('/home', showHome); // Just in case!!!

page('/catalog', showCatalog);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav; // Like this we will have access to navigation trought context. Every module can invoke it!

    // This is for check out if current animal card is ours.
    const user = getUserData(); // This will read the 'sessionStorage'.
    if(user) {
        ctx.user = user; // And if we have something in 'sessionStorage', we set it in the context.
    }
    // This is for check out if current animal card is ours.

    next(); // We write this in cases when the function is async.
}

function renderMain(content) {
    render(content, main);
}