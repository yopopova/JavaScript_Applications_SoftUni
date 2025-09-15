import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { searchMotorcycle } from "../api/data.js";
import { createSubmitHandler } from "../util.js";

const searchTemplate = (isClicked, handler, albums, hasUser) => html`
<section id="search">

    <div class="form">
        <h4>Search</h4>
        <form @click=${handler} class="search-form">
            <input
            type="text"
            name="search"
            id="search-input"
            />
            <button class="button-list">Search</button>
        </form>
    </div>
    <h4 id="result-heading">Results:</h4>
    <div class="search-result">
        ${isClicked ? createResultTemplate(albums, hasUser) : nothing}
    </div>
</section>`


    // <section id="searchPage">
    //         <h1>Search by Name</h1>

    //         <div class="search">
    //             <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    //             <button @click=${handler} class="button-list">Search</button>
    //         </div>

    //         <h2>Results:</h2>

    //         <div class="search-result">
    //             ${isClicked ? createResultTemplate(albums, hasUser) : nothing}
    //         </div>
    //     </section>


const createCard = (motorcycle, hasUser) => html`
<div class="motorcycle">
    <img src=${motorcycle.imageUrl} alt="example1" />
    <h3 class="model">${motorcycle.model}</h3>
    <a class="details-btn" href="/details/${motorcycle._id}">More Info</a>
</div>`


    // <div class="card-box">
    //     <img src=${album.imgUrl}>
    //     <div>
    //         <div class="text-center">
    //             <p class="name">Name: ${album.name}</p>
    //             <p class="artist">Artist: ${album.artist}</p>
    //             <p class="genre">Genre: ${album.genre}</p>
    //             <p class="price">Price: $${album.price}</p>
    //             <p class="date">Release Date: ${album.releaseDate}</p>
    //         </div>

    //         ${hasUser ? html`
    //             <div class="btn-group">
    //                 <a href="/details/${album._id}" id="details">Details</a>
    //             </div>` : nothing
    //         }
    //     </div>
    // </div>


const createResultTemplate = (albums, hasUser) => {
    return html`
        ${albums.length > 0 ? html`
            ${albums.map(album => createCard(album, hasUser))}
        ` : html`
        <h2 class="no-avaliable">No result.</h2>`
        }`
}

export async function showSearch(ctx) {
    ctx.render(searchTemplate(false, onSearch));
    // ctx.render(searchTemplate(false, createSubmitHandler(onSearch)));

    async function onSearch(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value;

        if(!query) {
            return alert('Enter some word');
        }

        const albums = await searchMotorcycle(query); // This will return array.

        ctx.render(searchTemplate(true, onSearch, albums, !!ctx.user));
    }
}

// SEARCH CONDITIONS
// If the button 'Search' is clicked
// If there is a result
// If there is a logged-in user