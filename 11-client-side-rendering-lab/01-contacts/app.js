// The solution is written without 'lit-html' .addEventListener on 'details button'.

import { html, render } from './node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';

const root = document.getElementById('contacts');

const contactCard = (contact) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${contact.name}</h2>
        <button class="detailsBtn">Details</button>
        <div class="details" id=${contact.id}>
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
        </div>
    </div>
</div>`

root.addEventListener('click', toggleDetails);

render(contacts.map(contactCard), root);

function toggleDetails(event) {
    if (event.target.classList.contains('detailsBtn')) {
        const parent = event.target.parentElement;
        const details = parent.querySelector('.details');

        if (details.style.display == 'block') {
            details.style.display = 'none';
        } else {
            details.style.display = 'block';
        }
    }
}