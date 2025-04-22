// In 'util.js' file we put thing which we should take from other files!!! They should be available to every other file.

const views = [...document.querySelectorAll('.view-section')]; // Like this we take all sections from the page. It will return array with the sections.

function hideAll() { // This function will hide all sections from home page.
    views.forEach(v => v.style.display = 'none');
}

export function showView(section) {
    hideAll(); // First we hide all sections with function 'hideAll()'.
    section.style.display = 'block'; // After that show the specific section with specific app page we want.
}

export function spinner() { // We use this to display somethig until we load the movies on the page, because the loading is slow.
    const element = document.createElement('p');
    element.innerHTML = 'Loading &hellip;';

    return element;
}

// After user is logged, we should hide or show some buttons.
export function updateNav() {
    const user = JSON.parse(localStorage.getItem('user')); // It should get things from local storage. If we don't parse it, it should return 'null'.
    const msgContaier = document.getElementById('welcome-msg');

    if (user) {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
        msgContaier.textContent = `Welcome, ${user.email}`; // Like this we change the welcome content in nav bar when we have user.
    } else {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block');
        msgContaier.textContent = '';
    }
}