import { showHome } from './src/views/home.js';
import { showCatalog } from './src/views/catalog.js';
import { showLogin } from './src/views/login.js';
import { showRegister } from './src/views/register.js';
import { showDetails } from './src/views/details.js';
import { showCreate } from './src/views/create.js';
import { initialize } from './src/router.js';
import { logout } from './src/api/user.js';


// For testing in browser.
// window.myApi = api;
// window.login = login;
// window.register = register;
// Judge: 44/100

// window.logout = logout;

// const registerView = document.getElementById('registerView');
// const loginView = document.getElementById('loginView');
// const dashboard = document.getElementById('dashboard-holder');
// const detailView = document.getElementById('detailsView');
// const createView = document.getElementById('createView');

document.getElementById('defSection').remove(); // Like this we remove all sections from the DOM.

const links = {
    '/': showHome,
    '/catalog': showCatalog,
    '/login': showLogin,
    '/register': showRegister,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': async function () {
        await logout();
        router.goTo('/');
        router.updateNavigate();
    }
}

const router = initialize(links);
router.updateNavigate();
router.goTo('/');
// Like this we make the app to load the home page, when you open it for the first time.
// When the app is refreshed, it will load the home page.

// For testing in browser.
// showHome(context);
// window.showHome = showHome;
// window.context = context;