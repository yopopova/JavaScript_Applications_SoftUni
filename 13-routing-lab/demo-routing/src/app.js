// Detect URL changes and notify application
// -- application start -> wondow.location.path
// -- back/forward browser buttons (popstate event) -> wondow.location.path
// -- link navigation -> event.target.href
// Change URL on application content swap

const views = {
    '/': () => '<h2>Home Page</h2>',
    '/catalog': () => '<h2>Catalog</h2>',
    '/about': () => '<h2>About Page</h2>'
}

const main = document.querySelector('main');
document.querySelector('nav').addEventListener('click', onNavigate); // Line 4
window.addEventListener('popstate', onPopState);

// Start application in previous view
onPopState(); // Line 2

function onNavigate(event) {
    if (event.target.tagName === 'A') {
        const url = new URL(event.target.href);
        // const view = views[url.pathname];

        if (showView(url.pathname)) {
            event.preventDefault();

            // After we get the current <a>, we change the URL in the browser.
            history.pushState(null, '', url.pathname); // Like this we change the URL in the browser address bar.
            // pushState променя URL-а и го вкарва в бутоните за напред и назад в браузъра
        }
    }
}

function onPopState() {
    const startingView = window.location.pathname; // Line 3
    showView(startingView); // така сменяме линка и съдържанието на всяка страница, когато се връщаме назад.
}

function showView(name) {
    const view = views[name];

    if (typeof view == 'function') {
        main.innerHTML = view();
        return true;
    } else {
        return false;
    }
}