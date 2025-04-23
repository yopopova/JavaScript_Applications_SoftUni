import { homePage } from './home.js';
import { showView, updateNav } from './util.js';

const section = document.querySelector('#form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function loginPage() {
    showView(section); // Here we give 'section' like argument to function 'showView()'. In this case we will show login page.
}

async function onSubmit(event) {
    event.preventDefault(); // When we have SUBMIT we always add .preventDefault()!!!!!

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    await login(email, password);
    form.reset(); // Here we clear the form after use the imput field values.
    updateNav(); // Here we update the navigation bar.
    homePage(); // If the request is ok, we show the home page.
}

async function login(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user)); // Here we save user data in local storage.
    } catch (err) {
        alert(err.message);
        throw err; // Write this because even if we have wrong pass ot email, it will redirect us to home page, but it shouldn't.
    }
}

// window.login = login; // Like this we test the function 'login'.