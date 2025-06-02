// This file will take responsibility for user 'login', 'register', and 'logout'.

import { get, post, put, del } from "./api.js";

// We write 'endpoint' object, because we don't want ot write links in code.
const edpoint = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/login'
}

export async function login(email, password) {
    const user = await post(edpoint.login, { email, password }); // Like this we take the user.

    // 'localeStorage' works ONLY with strings, but not with objects.
    sessionStorage.setItem('user', JSON.stringify(user)); // Like this we save the user in 'sessionStorage'.
}

export async function register(email, password) {
    const user = post(edpoint.register, { email, password });
    sessionStorage.setItem('user', JSON.stringify(user)); // Like this we save the user in 'sessionStorage'.
    // We don't use 'repass' here, because when we make a request to the server, we need only 'email' and 'password'.
    // 'repass' is used for validation on the front-end to see if the password and repassword are equivalent.
}

export async function logout() {
    get(edpoint.logout); // Here we logout the user with 'GET' request.
    sessionStorage.removeItem('user'); // After that we remove the user data from 'sessionStorage'.
}