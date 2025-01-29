import { updateAuth } from "../auth.js";

const loginSection = document.querySelector('.login');
const loginForm = loginSection.querySelector('form'); // Така ограничаваме търсенето в по-малък клон.

loginForm.addEventListener('submit', (e) => { // Пишем го отвън, а не във финкцията renderLogin(), защото иначе всеки път, когато натиснем Login ще закачаме нов ивент.
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');

    fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(user => {
        localStorage.setItem('user', JSON.stringify(user)); // Взимаме обекта и го съхраняваме по д user в localStorage
        updateAuth(); // искам след като се логна да ъпдейтнеш auth
        alert('Successful login');
    })
});

export function renderLogin() {
    loginSection.style.display = 'block';
}