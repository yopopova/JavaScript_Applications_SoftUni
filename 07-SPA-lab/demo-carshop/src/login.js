import { showHome } from "./home.js"; // We write this because we use the 'showHome()' function want to redirect the user to home page.

const loginSection = document.getElementById('login');

const loginForm = loginSection.querySelector('#login-form');
loginForm.addEventListener('submit', onLogin);

export function showLogin() {
    document.querySelector('main').replaceChildren(loginSection);
}

// We don't need to export 'onLogin' functiont, because it works trought the button.
async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const {email, password} = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
        });

        if(response.ok === false) {
            const error = await response.json();
            throw error;
        }

        // Like this we save user information in localStorage
        const userData = await response.json();
        localStorage.setItem('email', userData.email);
        localStorage.setItem('id', userData._id);
        localStorage.setItem('accessToken', userData.accessToken);

        loginForm.reset(); // Here we clear the form

        showHome(); // Here we invoke the function and make redirect from login to home page.

    } catch(err) {
        alert(err.message);
    }
}