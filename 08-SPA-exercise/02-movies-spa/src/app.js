// [x] improve HTML structure
// [x] create app.js module
// [x] create util.js containing hide and display of view
// [x] placeholders for all views

// implement views
// - create request logic
// - DOM manipulation logic
// [x] catalog
// [x] login
// [ ] register
// [ ] create
// [ ] details; they will be loaded throught the catalog
// [ ] like
// [ ] edit
// [ ] delete

import { homePage } from './home.js';
import { loginPage } from './login.js';
import { registerPage } from './register.js';
import { createPage } from './create.js';
import { updateNav } from './util.js';

// Here are all 'href' attributes to pages and functions to them. We don't have 'Detail' because the logic is different and we don;t have details in navigation menu.
const routes = {
    '/': homePage,
    '/login': loginPage,
    '/logout': logout,
    '/register': registerPage,
    '/create': createPage
};

document.querySelector('nav').addEventListener('click', onNavigate); // We take the whole navigation and add it event listener.
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate); // This is the buutton 'Add Movie'.

function onNavigate(event) {
    if (event.target.tagName == 'A' && event.target.href) { // Here check if the element is <a> and if it has 'href'. It's because of the 'Welcome, guest' element. It is 'a', but it leads to nowhere.
        event.preventDefault(); // We write it here, because we want to be able to click ONLY on <a> link, but not on <nav>.
        
        const url = new URL(event.target.href); // We take the element url.
        const view = routes[url.pathname]; // We take the url with 'pathname'. The variable becomes a function.

        if (typeof view == 'function') { // Our url.pathname (view) should be function to invoke it and display it on the screen.
            view(); // View becomes a function.
        }
    }
}

function logout() { // Logout is not a page!!!
    localStorage.removeItem('user'); // Here we clear the local storage, which means the user is removed.
    updateNav(); // Here we update the navigation bar again and say there is no user anymore.
}

// Start application in catalog view
updateNav(); // We update the navigation bar before we show the home page.
homePage(); // Here we start the 'home.js' module, because we want to load home page first.