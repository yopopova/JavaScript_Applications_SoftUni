import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";

const catalogTemplate = (motorcycles) => html`
    <h2>Available Motorcycles</h2>
    ${motorcycles.length === 0 ? html`
    <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>` : html`
    <section id="dashboard">
        ${motorcycles.map(motorcycle => singleMotorcycleTemplate(motorcycle))}
          
    </section>`}`


const singleMotorcycleTemplate = (motorcycle) => html`
    <div class="motorcycle">
        <img src=${motorcycle.imageUrl} alt="example1" />
        <h3 class="model">${motorcycle.model}</h3>
        <p class="year">Year: ${motorcycle.year}</p>
        <p class="mileage">Mileage: ${motorcycle.mileage} km.</p>
        <p class="contact">Contact Number: ${motorcycle.contact}</p>
        <a class="details-btn" href="/details/${motorcycle._id}">More Info</a>
    </div>`


export async function showCatalog(ctx) {
    const availableMotorcycles = await getAll(); // Like this we take all cars from 'data.js' file.
    ctx.render(catalogTemplate(availableMotorcycles));
}