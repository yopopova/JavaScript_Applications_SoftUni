import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getById, deleteById } from "../api/data.js";

const detailsTemplate = (fruit, hasUser, isOwner, onDelete) => html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${fruit.imageUrl} alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>
                    ${fruit.description}
                  </p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                      ${fruit.nutrition}
                        </p>
              </div>

              ${hasUser && isOwner ? html`
              <div id="action-buttons">
                    <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>` : nothing}
            </div>
        </div>
    </section>`


export async function showDetails(ctx) {
    const id = ctx.params.id; // This gives this line: '/catalog/:id' from 'app.js'
    const fruit = await getById(id);

    const hasUser = Boolean(ctx.user); // Here we are looking, if we have 'logged-in' user.
    const isOwner = hasUser && ctx.user._id == fruit._ownerId; // Here we are looking, if the logged-in user is the creator of the fruit card.
    // ^ If we have user, we compare the user 'id' to the 'ownerId'.

    ctx.render(detailsTemplate(fruit, hasUser, isOwner, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this fruit?'); // Similar to 'alert()', but with 2 choises.

        if(choise) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
}