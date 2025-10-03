import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';

import { getUserData } from "../util.js";
import { logout } from '../api/user.js';

const nav = document.querySelector('header');

const navTemplate = (hasUser) => html`
        <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
          <div>
            <a href="/catalog">Fruits</a>
            <a href="/search">Search</a>
          </div>

          ${!hasUser ? html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            
          </div>
          ` : html `
          <div class="user">
            <a href="/create">Add Fruit</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
          </div>
          `}
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