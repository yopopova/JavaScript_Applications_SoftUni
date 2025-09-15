import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteById, getById } from "../api/data.js";

const detailsTemplate = (motorcycle, isOwner, onDelete) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${motorcycle.imageUrl} alt="example1" />
            <p id="details-title">${motorcycle.model}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="year">Year: ${motorcycle.year}</p>
                    <p class="mileage">Mileage: ${motorcycle.mileage} km.</p>
                    <p class="contact">Contact Number: ${motorcycle.contact}</p>
                    <p id = "motorcycle-description">${motorcycle.about}</p>
                </div>
                ${isOwner ? html`
                <div id="action-buttons">
                    <a href="/edit/${motorcycle._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>` : nothing}
            </div>
        </div>
    </section>`


export async function showDetails(ctx) {
    const id = ctx.params.id; // This gives this line: '/details/:id' from 'app.js'
    const motorcycle = await getById(id); // Here we take the current album.

    // const hasUser = Boolean(ctx.user);
    const isOwner = motorcycle._ownerId === ctx.user._id; // This is a boolean variable.
    
    ctx.render(detailsTemplate(motorcycle, isOwner, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this motorcycle?'); // Similar to 'alert()', but with 2 choises.

        if(choise) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
}