// The solution is written with 'lit-html' .addEventListener on 'details button'.

import { html, nothing, render } from './node_modules/lit-html/lit-html.js';
import { contacts as data } from './contacts.js';

// Like this we invoke 'styleMap' from the 'lit-html' library
// import { styleMap } from './node_modules/lit-html/directives/style-map.js';

const contacts = data.map(c => Object.assign({}, c, { active: false }));

const root = document.getElementById('contacts');

const contactCard = (contact) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${contact.name}</h2>
        <button id=${contact.id} class="detailsBtn">Details</button>

        ${contact.active
        ? html`
        <div class="details">
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
        </div>`
        : nothing}

    </div>
</div>`

root.addEventListener('click', toggleDetails);
update();

function update() {
    render(contacts.map(contactCard), root);
}

function toggleDetails(event) {
    if (event.target.classList.contains('detailsBtn')) {
        const id = event.target.id; // Here we take the button 'id'.
        const contact = contacts.find(c => c.id == id); // Here we find the contact with this 'id' from contacts.

        contact.active = !contact.active; // This is the toggle!

        update();
    }
}