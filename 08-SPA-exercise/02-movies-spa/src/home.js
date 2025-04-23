import { detailsPage } from './details.js';
import { showView, spinner } from './util.js';


const section = document.querySelector('#home-page');
const catalog = section.querySelector('#movie .card-deck.d-flex.justify-content-center'); // This is section wich holds all movies.

catalog.addEventListener('click', (event) => { // This function will be invoked in details.js
    if (event.target.tagName == 'BUTTON') {
        event.preventDefault(); // If we don't use it the page will refresh, if we click on button 'Details'.
        const id = event.target.dataset.id; // Like this we get the movie id.
        detailsPage(id); // Here we use detailsPage() with this id.
    }
});

export function homePage() {
    showView(section); // Here we give 'section' like argument to function 'showView()'. In this case we will show home page.
    displayMovies(); // After we show the home section, we show the movies.
}

async function displayMovies() {
    catalog.replaceChildren(spinner()); // We use this to display somethig until we load the movies on the page.
    const movies = await getMovies(); // After that we make the request.
    catalog.replaceChildren(...movies.map(createMoviePreview)); // Like this we append all movies to the catalog.
}

function createMoviePreview(movie) { // Here we create the card for every movie.
    const element = document.createElement('div');
    element.className = 'card mb-4';
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${movie._id}">
            <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
        </a>
    </div>`;
    // Then we can read data-id="${movie._id}" with 'element.dataset.id'.

    return element;
}

async function getMovies() { // Here we load all movies.
    const res = await fetch('http://localhost:3030/data/movies');
    const data = await res.json();

    return data;
}

// window.getMovies = getMovies; // За проверка дали работи заявката. Така го правим глобален скоут, защото модулите не са глобален скоуп. Това е вместо console.log(). Пишем го в браузъра.