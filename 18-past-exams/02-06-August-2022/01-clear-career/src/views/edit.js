import { html } from "../../node_modules/lit-html/lit-html.js";
import { editJob, getById } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (job, onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value=${job.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value=${job.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${job.category}
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
                .value=${job.description}
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
                .value=${job.requirements}
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${job.salary}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`


        // <section class="editPage">
        //     <form @submit=${onEdit}>
        //         <fieldset>
        //             <legend>Edit Album</legend>

        //             <div class="container">
        //                 <label for="name" class="vhide">Album name</label>
        //                 <input id="name" name="name" class="name" type="text" .value=${album.name}>

        //                 <label for="imgUrl" class="vhide">Image Url</label>
        //                 <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${album.imgUrl}>

        //                 <label for="price" class="vhide">Price</label>
        //                 <input id="price" name="price" class="price" type="text" .value=${album.price}>

        //                 <label for="releaseDate" class="vhide">Release date</label>
        //                 <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${album.releaseDate}>

        //                 <label for="artist" class="vhide">Artist</label>
        //                 <input id="artist" name="artist" class="artist" type="text" .value=${album.artist}>

        //                 <label for="genre" class="vhide">Genre</label>
        //                 <input id="genre" name="genre" class="genre" type="text" .value=${album.genre}>

        //                 <label for="description" class="vhide">Description</label>
        //                 <textarea name="description" class="description" rows="10"
        //                     cols="10">${album.description}</textarea>

        //                 <button class="edit-album" type="submit">Edit Album</button>
        //             </div>
        //         </fieldset>
        //     </form>
        // </section>`


export async function showEdit(ctx) {
    const id = ctx.params.id;
    const jobPosition = await getById(id);

    ctx.render(editTemplate(jobPosition, createSubmitHandler(onEdit)));

    async function onEdit({ title, imageUrl, category, description, requirements, salary }, form) {
        if (title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == '') {
            return alert('All fields are required!');
        }

        await editJob(id, {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        })

        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}