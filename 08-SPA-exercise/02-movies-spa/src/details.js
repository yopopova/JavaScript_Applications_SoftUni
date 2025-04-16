// The code running only in the module.
// When the user like a movie, the 'Like' button should be hidden.

import { showView, spinner } from './util.js';


const section = document.querySelector('#movie-example');

export function detailsPage(id) {
    showView(section); // Here we show the whole section
    displayMovie(id); // Here we show the movie
}

async function displayMovie(id) { // Here we show the movie
    section.replaceChildren(spinner());

    const user = JSON.parse(localStorage.getItem('user'));

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id), // we take the id
        getLikes(id), // we take the number of likes
        getOwnLike(id, user) // we take the user own like
    ]);

    section.replaceChildren(createMovieCard(movie, user, likes, ownLike));
}

function createMovieCard(movie, user, likes, ownLike) { // Here create the movie
    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${createControls(movie, user, ownLike)}
            <span class="enrolled-span">Liked ${likes}</span>
        </div>
    </div>`;

    const likeBtn = element.querySelector('.like-btn'); // Here we add event to the like button.
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    }

    return element;
}

// Buttons Delete, Edit, Like for every field depend on thet if the user is logged in and if the current logged user is movie author!!!

function createControls(movie, user, ownLike) {
    const isOwner = user && user._id == movie._ownerId; // If we have logged user and if the current logged user is movie author.

    let controls = [];

    if (isOwner) { // If we have movie owner, we add the 2 buttons to controls.
        controls.push('<a class="btn btn-danger" href="#">Delete</a>');
        controls.push('<a class="btn btn-warning" href="#">Edit</a>');
    } else if (user && ownLike == false) { // We have user, but he doesn't liked the movie
        controls.push('<a class="btn btn-primary like-btn" href="#">Like</a>');
    }
    controls.push();

    return controls.join('');
}

async function getMovie(id) { // Here we get the movie
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = await res.json();

    return movie;
}

async function getLikes(id) { // This is function for number of movie likes
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}

async function getOwnLike(movieId, user) { // Here we looking for user own like. The function should return tru if the user liked the movie nad false if not.
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await res.json();

        return like.length > 0;
    }
}

async function likeMovie(e, movieId) { // This is request for likes.
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            movieId
        })
    });

    detailsPage(movieId);
}