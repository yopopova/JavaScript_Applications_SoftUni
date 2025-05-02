import { createPost, onClose, showHome } from "./home.js";

// Here we load home page when someone clicks on the link in 'nav'.
const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHome);

// Here we take the two form buttons.
const buttonsElements = document.querySelectorAll('button');

const cancelButtonElement = buttonsElements[0];
cancelButtonElement.addEventListener('click', onClose); // Like this we clear all form fields

const createPostButtonElement = buttonsElements[1];
createPostButtonElement.addEventListener('click', createPost); // Like this we create a comment
