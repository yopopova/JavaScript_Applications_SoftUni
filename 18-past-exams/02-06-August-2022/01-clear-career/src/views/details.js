import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { apply, getApplications, getUserApplication } from "../api/applications.js";
import { deleteById, getById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (offer, onDelete, onApply) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
              </div>
            </div>
            <p>Applications: <strong id="applications">${offer.applications}</strong></p>

            <!--Edit and Delete are only for creator-->
            ${offer.canEdit || offer.canApply ? html`
            <div id="action-buttons">

                ${offer.canEdit ? html`
                    <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                ` : nothing}

              <!--Bonus - Only for logged-in users ( not authors )-->
                ${offer.canApply ? html`
                    <a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>`
                : nothing}
            </div>` : nothing}
          </div>
        </section>`


export async function showDetails(ctx) {
    const id = ctx.params.id; // This gives this line: '/details/:id' from 'app.js'

  const requests = [
    getById(id),
    getApplications(id)
  ]

  const userData = getUserData();

  if(userData) {
    requests.push(getUserApplication(id, userData._id));
  }

  const [offer, applications, hasApplied] = await Promise.all(requests);
  offer.applications = applications;

  if(userData) {
    offer.canEdit = userData._id == offer._ownerId;
    offer.canApply = offer.canEdit == false && hasApplied == 0; // The user doesn't have to be the author of the position and has 0 applications.
  }

    // MY OLD LOGIC
    // const jobPosition = await getById(id); // Here we take the current album.

    // const hasUser = Boolean(ctx.user); // Like this we check if we have a logged-in user.
    // const isOwner = hasUser && jobPosition._ownerId === ctx.user._id; // This is a boolean variable.
    // MY OLD LOGIC
    
    update();

    function update() {
      ctx.render(detailsTemplate(offer, onDelete, onApply));
    }

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this job position?'); // Similar to 'alert()', but with 2 choises.

        if(choise) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }

    // For the bonus
    async function onApply() {
      await apply(id);

      offer.applications++;
      offer.canApply = false;
      update();
      // ctx.page.redirect('catalog/' + id); // This is the second way to redirect to the same page, instead of 'update()', if we want to refresh it.
    }
    // For the bonus
}