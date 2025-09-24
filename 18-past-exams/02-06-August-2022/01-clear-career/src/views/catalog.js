import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";

const catalogTemplate = (jobPositions) => html`
<section id="dashboard">
          <h2>Job Offers</h2>

          ${jobPositions.length === 0 ? html`
          <h2>No offers yet.</h2>` : 
            jobPositions.map(job => jobCardTemplate(job))}
          
        </section>`


const jobCardTemplate = (job) => html`
        <div class="offer">
            <img src=${job.imageUrl} alt="example1" />
            <p>
              <strong>Title: </strong><span class="title">${job.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${job.salary}</span></p>
            <a class="details-btn" href="/details/${job._id}">Details</a>
          </div>`


export async function showCatalog(ctx) {
    const jobPositions = await getAll(); // Like this we take all albums from 'data.js' file.
    ctx.render(catalogTemplate(jobPositions));
}