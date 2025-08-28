// import { getToken } from './auth.js';
import * as request from './request.js'; // * as request дай ми всичките модули и ми ги кръсти request

const baseUrl = 'http://localhost:3030';
const recipesUrl = `${baseUrl}/data/recipes`;
const loginUrl = `${baseUrl}/users/login`;

export const getRecipes = () => request.get(recipesUrl).then(data => Object.values(data));

export const createRecipe = (recipeData) => request.post(recipesUrl, recipeData); // The result of this finction will be Promise; задължително слагаме data от файл create.js

export const login = (email, password) => request.post(loginUrl, { email, password });