import { post } from './api.js';
import { createSubmitHandler, setUserData } from './util.js';

createSubmitHandler('register-form', onRegister);

const section = document.getElementById('register-view');
section.remove();

let ctx = null;

export function showRegisterView(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}

async function onRegister(data) {
    const { email, username, password, repass } = data;

    if (password != repass) {
        return alert("Password don't match");
    }

    const userData = await post('/users/register', { email, username, password });
    // ^ Here we use the 'post' method from 'api.js' file.
    setUserData(userData);

    ctx.checkUserNav();
    ctx.goto('catalog-link');
}