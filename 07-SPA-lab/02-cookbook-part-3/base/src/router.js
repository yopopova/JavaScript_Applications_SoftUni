import { renderHome } from './pages/home.js';
import { renderLogin } from './pages/login.js';
import { renderLogout } from './pages/logout.js';
import { renderRegister } from './pages/register.js';
import { renderCreate } from './pages/create.js';
import { render404 } from './pages/404.js';

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/create': renderCreate,
    '/logout': renderLogout
}

// const homeSection = document.querySelector('.home');
// const loginSection = document.querySelector('.login');

export function router(path) {
    hideContent(); // Всеки път, когато извикаме рутъра, първо ще се скрие съдържанието

    // Казваме на отделния секшън, в зависимост от пътя му, дали да се покаже
    // Обектът 'routes' замества if/else проверката
    // if (path == '/') {
    //     renderHome();
    // } else if(path == '/login') {
    //     renderLogin();
    // } else {
    //     render404();
    // }

    const renderer = routes[path] || render404; // Акопървото е undefined върни ми рендъра; path идва от router(url.pathname); от app.js файла
    renderer();
}

function hideContent() {
    const mainContent = document.querySelector('.main-content');

    for (const section of mainContent.children) {
        section.style.display = 'none'; // Така ще скрием всички секшъни
    }
}