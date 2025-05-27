import { get } from './api.js';

// get data from REST service
// parse and display each recipe

document.getElementById('recipe-list').addEventListener('click', openRecipe);

const section = document.getElementById('catalog-view');
section.remove(); // Here we remove the section from DOM tree.
// ^ Here we save the module section in variable, because we want ot add or remove it to the DOM tree,
// ^ instead of show or hide it with 'display = none/block'.

let ctx = null;

export async function showCatalogView(inCtx) {
    ctx = inCtx;
    ctx.render(section); // Here we add the section to DOM tree.
    displayRecipes([]); // this will show white screen.

    const recipes = await getAllRecipes();
    displayRecipes(recipes);
}

async function getAllRecipes() {
    const recipes = await get('/data/recipes?select=' + encodeURIComponent('_id,name'));
    // ^ Here we use the 'get' method from 'api.js' file.
    return recipes;
}

function displayRecipes(recipes) {
    const cards = recipes.map(createRecipeCard);

    const fragment = document.createDocumentFragment();
    for (let item of cards) {
        fragment.appendChild(item);
    }

    const list = document.getElementById('recipe-list');
    list.replaceChildren(fragment);
}

function createRecipeCard(recipe) {
    const element = document.createElement('li');
    element.textContent = recipe.name;

    const link = document.createElement('a');
    link.href = 'javascript:void(0)';
    link.text = '[Details]';
    link.id = recipe._id;
    element.appendChild(link);

    return element;
}

function openRecipe(event) {
    if (event.target.tagName == 'A') {
        event.preventDefault();
        const id = event.target.id;
        // showDetailsView(id);
        ctx.goto('details-link', id);
    }
}