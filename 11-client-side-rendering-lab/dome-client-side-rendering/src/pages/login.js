import { updateAuth, saveUser } from '../auth.js';
import { login } from '../api.js';
// import * as api from '../api.js'; // Ако започнат да ни се повтарят много имената

const loginSection = document.querySelector('.login');
const loginForm = loginSection.querySelector('form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');

    // fetch('http://localhost:3030/users/login', {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify({email, password})
    // })

    // Или добавяме api.login(email, password) в продължение на ред 3
    login(email, password)
        .then(user => {
            saveUser(user);
            updateAuth();
            alert('successfuly logged in');
        });
});

export function renderLogin() {
    loginSection.style.display = 'block';
}