import page from '../../node_modules/page/page.mjs';
import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js";
import { logout } from '../api/user.js';

const nav = document.querySelector('header');

const navTemplate = (hasUser) => html`
      <nav class="navbar">
        <section class="navbar-dashboard">
          <a href="/">Dashboard</a>

          ${hasUser ? html`
            <div id="user">
              <span>Welcome, ${hasUser.email}</span>
              <a class="button" href="/my-books">My Books</a>
              <a class="button" href="/create">Add Book</a>
              <a class="button" @click=${onLogout} href="javascript:void(0)">Logout</a>
            </div>` : html`
            <div id="guest">
              <a class="button" href="/login">Login</a>
              <a class="button" href="/register">Register</a>
            </div>
           `}
        </section>
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