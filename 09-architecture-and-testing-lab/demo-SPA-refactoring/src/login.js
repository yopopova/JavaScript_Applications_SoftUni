// register event listeners to navigation
// switch view
// handle form submit
// send login information to REST service
// store authorization token

import { post } from './api.js';
import { createSubmitHandler, setUserData } from './util.js';

createSubmitHandler('login-form', onLogin);

const section = document.getElementById('login-view');
section.remove();

let ctx = null;

export function showLoginView(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}

async function onLogin(data) {
    const { email, password } = data;

    const userData = await post('/users/login', { email, password }); // ^ Here we use the 'post' method from 'api.js' file.

    setUserData(userData);

    ctx.checkUserNav();
    ctx.goto('catalog-link');
}