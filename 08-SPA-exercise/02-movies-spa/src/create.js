import { homePage } from './home.js';
import { showView } from './util.js';


const section = document.querySelector('#add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createPage() {
    showView(section); // Here we show the create page.
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    await createMovie(title, description, img);
    form.reset(); // Here we clear the form fields after tage the information.
    homePage(); // Here we ridirect to home page (catalog).
}

async function createMovie(title, description, img) {
    const user = JSON.parse(localStorage.getItem('user')); // We should get the user data to authorise.

    // This request should be authorised, because only logged users can create movies.
    await fetch('http://localhost:3030/data/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken // Here we use the token
        },
        body: JSON.stringify({ title, description, img })
    });
}

// window.createMovie = createMovie; // Here we test the function.