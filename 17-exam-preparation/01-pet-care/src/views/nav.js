import page from '../../node_modules/page/page.mjs';
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js";
import { logout } from '../api/user.js';

const nav = document.querySelector('header');

const navTemplate = (hasUser) => html`
    <nav>
        <section class="logo">
            <img src="./images/logo.png" alt="logo">
        </section>
        <ul>
            <!--Users and Guest-->
            <li><a href="/">Home</a></li>
            <li><a href="/catalog">Dashboard</a></li>

            <!-- Users or Guest -->
            ${!hasUser ? html`
            <li class="guest"><a href="/login">Login</a></li>
            <li class="guest"><a href="/register">Register</a></li>`
             : html`
            <li class="user"><a href="/create">Create Postcard</a></li>
            <li class="user"><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>
            `}
            <!-- When we have 'javascript:void(0)', we don't need to use 'preventDefault()' -->
            <!-- If we make navigation with thernary operator, we dont need to add classes for 'guest' or 'user' -->
        </ul>
    </nav>`

export function updateNav() {
    const user = getUserData(); // This will return the data in 'sessionStorage'.
    render(navTemplate(user), nav);
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}