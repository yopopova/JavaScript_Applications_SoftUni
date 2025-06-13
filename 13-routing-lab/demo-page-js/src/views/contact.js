import { html } from '../../node_modules/lit-html/lit-html.js';

const contactTemplate = () => html`<h2>Contact Us</h2>`

export function showContact(ctx) {
    ctx.render(contactTemplate());
}