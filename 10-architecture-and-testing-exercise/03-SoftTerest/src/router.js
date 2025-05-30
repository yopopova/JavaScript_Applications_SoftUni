// This file controls the whole site navigation (clicking on buttons).

export function initialize(links) {
    const main = document.getElementById('mainView');
    document.querySelector('nav').addEventListener('click', onNavigate);

    const context = {
        showSection,
        goTo,
        updateNavigate
    }

    return context;

    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigate(e) {
        e.preventDefault();
        let target = e.target;

        if (target.tagName === 'IMG') {
            target = target.parentElement; // Here we try to catch the 'a' tag, which is parent element of 'img'.
        }

        if (target.tagName === 'A') {
            const url = new URL(target.href); // Like this we take the element URL.
            goTo(url.pathname); // Like this we take the path name (part after the URL) to the current page.
        }
    }

    function goTo(name, ...params) { // With this function we take pathname from 'href'.
        const handler = links[name]; // Like this we will take the current function from 'links'. Here 'handler' becomes function!!!

        if (typeof (handler) === 'function') {
            handler(context, ...params); // Like this the link will show needed page.
            // Parameter '...params' keeps the 'id'.
        }
    }

    function updateNavigate() {
        const user = JSON.parse(sessionStorage.getItem('user'));

        if(user) {
            document.querySelectorAll('.user').forEach(e => e.style.display = 'block');
            document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
        } else {
            document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
            document.querySelectorAll('.guest').forEach(e => e.style.display = 'block');
        }
    }
}