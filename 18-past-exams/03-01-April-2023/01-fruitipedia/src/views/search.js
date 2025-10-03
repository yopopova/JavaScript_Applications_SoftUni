import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { searchFruit } from "../api/data.js";

const searchTemplate = (isClicked, handler, albums) => html`
<section id="search">

    <div class="form">
        <h2>Search</h2>
        <form class="search-form">
            <input
            type="text"
            name="search"
            id="search-input"
        />
            <button @click=${handler} class="button-list">Search</button>
        </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result">
        ${isClicked ? createResultTemplate(albums) : nothing}
    </div>
</section>`


const createCard = (fruit) => html`
        <div class="fruit">
          <img src=${fruit.imageUrl} alt="example1" />
          <h3 class="title">${fruit.name}</h3>
          <p class="description">${fruit.description}</p>
          <a class="details-btn" href="/catalog/${fruit._id}">More Info</a>
        </div>`


const createResultTemplate = (albums) => {
    return html`
        ${albums.length > 0 ? html`
            ${albums.map(album => createCard(album))}
        ` : html`
        <p class="no-result">No result.</p>`
        }`
}

export async function showSearch(ctx) {
    ctx.render(searchTemplate(false, onSearch));

    async function onSearch(event) {
        event.preventDefault();

        const searchInput = document.getElementById('search-input');
        const query = searchInput.value;

        if(!query) {
            return alert('Enter some word');
        }

        const albums = await searchFruit(query); // This will return array.

        ctx.render(searchTemplate(true, onSearch, albums));
        searchInput.value = '';
    }
}

// SEARCH CONDITIONS
// If the button 'Search' is clicked
// If there is a result