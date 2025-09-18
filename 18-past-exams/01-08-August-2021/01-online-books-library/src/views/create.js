import { html } from "../../node_modules/lit-html/lit-html.js";
import { createBook } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onCreate) => html`
        <section id="create-page" class="create">
            <form @submit=${onCreate} id="create-form" action="" method="">
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>`



    // <section id="create">
    //       <div class="form">
    //         <h2>Create Offer</h2>
    //         <form @submit=${onCreate} class="create-form">
    //           <input
    //             type="text"
    //             name="title"
    //             id="job-title"
    //             placeholder="Title"
    //           />
    //           <input
    //             type="text"
    //             name="imageUrl"
    //             id="job-logo"
    //             placeholder="Company logo url"
    //           />
    //           <input
    //             type="text"
    //             name="category"
    //             id="job-category"
    //             placeholder="Category"
    //           />
    //           <textarea
    //             id="job-description"
    //             name="description"
    //             placeholder="Description"
    //             rows="4"
    //             cols="50"
    //           ></textarea>
    //           <textarea
    //             id="job-requirements"
    //             name="requirements"
    //             placeholder="Requirements"
    //             rows="4"
    //             cols="50"
    //           ></textarea>
    //           <input
    //             type="text"
    //             name="salary"
    //             id="job-salary"
    //             placeholder="Salary"
    //           />

    //           <button type="submit">post</button>
    //         </form>
    //       </div>
    //     </section>`


export function showCreate(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate({ title, description, imageUrl, type }, form) {
        if (title == '' || description == '' || imageUrl == '' || type == '') {
            return alert('All fields are required!');
        }

        await createBook({
            title,
            description,
            imageUrl,
            type
        })

        form.reset();
        ctx.page.redirect('/');
    }
}