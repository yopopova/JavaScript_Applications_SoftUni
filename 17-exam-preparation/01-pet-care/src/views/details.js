import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteById, getById } from "../api/data.js";
import { donate, getDonations, getOwnDonation } from "../api/donations.js";

const detailsTemplate = (pet, donations, hasUser, canDonate, isOwner, onDelete, onDonate) => html`
    <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${pet.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${donations}$</h4>
                    </div>

                     <!-- This is the construction with BONUS PART! -->
                    ${petControls(pet, hasUser, canDonate, isOwner, onDelete, onDonate)}
                      <!-- This is the construction with BONUS PART! -->

                    <!-- if there is no registered user, do not display div-->

                    <!-- This is the construction without BONUS PART! -->
                    <!-- ${hasUser ? html`
                        <div class="actionBtn">
                            ${isOwner ? html`
                                <a href="/edit/${pet._id}" class="edit">Edit</a>
                                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>` : html`
                                
                                <a href="#" class="donate">Donate</a>`
                            }
                        </div>` : nothing} -->
                     <!-- This is the construction without BONUS PART! -->
                </div>
            </div>
    </section>`

// This is the BONUS PART!
function petControls(pet, hasUser, canDonate, isOwner, onDelete, onDonate) {
    if(hasUser == false) {
        return nothing;
    }

    if(canDonate) {
        return html`
        <div class="actionBtn">
            <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>
        </div>`
    }

    if(isOwner) {
        return html`
            <div class="actionBtn">
                <a href="/edit/${pet._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>`
    }
}
// This is the BONUS PART!

export async function showDetails(ctx) {
    const id = ctx.params.id; // This gives this line: '/catalog/:id' from 'app.js'

    // This is for donations.
    const requests = [
        getById(id),
        getDonations(id)
    ]
    // This is for donations.

    const hasUser = Boolean(ctx.user);

    // This is for donations.
    if(hasUser) {
        requests.push(getOwnDonation(id, ctx.user._id));
    }

    const [pet, donations, hasDonation] = await Promise.all(requests);
    // This is for donations.


    // TESTS
    // const hasUser = true; // For checking the buttons 'Delete', 'Edit', and 'Donate'.
    // const isOwner = true; // For checking the buttons 'Delete', 'Edit', and 'Donate'.
    // const canDonate = true; // This is for donations.
    // TESTS

    const isOwner = hasUser && ctx.user._id == pet._ownerId; // Here we are looking for the creator of the animal card.
    // ^ If we have user, we compare the user 'id' to the 'ownerId'.

    // This is for donations.
    const canDonate = !isOwner && hasDonation == 0;
    // This is for donations.

    ctx.render(detailsTemplate(pet, donations * 100, hasUser, canDonate, isOwner, onDelete, onDonate));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this pet?'); // Similar to 'alert()', but with 2 choises.

        if(choise) {
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }

    // This is for donations.
    async function onDonate() {
        await donate(id);
        ctx.page.redirect('/catalog/' + id);
    }
    // This is for donations.
}