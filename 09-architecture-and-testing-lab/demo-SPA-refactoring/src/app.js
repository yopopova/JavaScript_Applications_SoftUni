import { checkUserNav, onLogout } from './auth.js';
import { showHomeView } from './home.js';
import { showCatalogView } from './catalog.js';
import { showLoginView } from './login.js';
import { showRegisterView } from './register.js';
import { showCreateView } from './create.js';
import { showDetailsView } from './details.js';
import './details.js';

// document.getElementById('home-link').addEventListener('click', showHomeView);
// document.getElementById('login-link').addEventListener('click', showLoginView);
// document.getElementById('catalog-link').addEventListener('click', showCatalogView);
// document.getElementById('logout-link').addEventListener('click', onLogout);

// function registerView(id, showView) {
//     document.getElementById(id).addEventListener('click', showView);
// }

document.querySelector('nav').addEventListener('click', onNavigate);

const views = {
    "home-link": showHomeView,
    "catalog-link": showCatalogView,
    "login-link": showLoginView,
    "register-link": showRegisterView,
    "logout-link": onLogout,
    "create-link": showCreateView,
    "details-link": showDetailsView
}

checkUserNav();

// Start application in home view
goto('home-link');

function onNavigate(event) {
    if (event.target.tagName == 'A') {
        const id = event.target.id;

        if(goto(id)) {
            event.preventDefault();
        }
    }
}

function goto(viewName, ...params) {
    const view = views[viewName];

    if (typeof view === 'function') {
        // event.preventDefault(); // This wiil block page reload for every link in 'views' object.
        // [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
        document.querySelector('main').replaceChildren(); // This is another version of the row above.

        const ctx = {
            goto,
            checkUserNav,
            render
        }

        view(ctx, ...params); // Every view/app page will receive ctx like parameter.
        // After we hide all sections and show only clicked one with 'view()'.
        return true;
    }

    return false;
}

function render(section) {
    document.querySelector('main').appendChild(section);
}