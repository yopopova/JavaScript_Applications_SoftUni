import * as api from './api.js';

const endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
    'createItem': 'data/catalog',
    'getAllItems': 'data/catalog',
    'getItemById': 'data/catalog/',
    'myItem': 'data/catalog?where=_ownerId%3D%22'
}

export async function login(email, password) {
    const response = await api.post(endpoints.login, { email, password }); // This will return the token and the data.
    sessionStorage.setItem('userData', JSON.stringify(response));
    return response;
}

export async function register(email, password) {
    const response = await api.post(endpoints.register, { email, password }); // This will return the token and the data.
    sessionStorage.setItem('userData', JSON.stringify(response));
    return response;
}

export async function logout() {
    const response = await api.get(endpoints.logout);
    sessionStorage.removeItem('userData');
    return response;
}

// Create Furniture (POST): http://localhost:3030/data/catalog
export async function createItem(data) {
    const response = await api.post(endpoints.createItem, data);
    return response;
}

// All Furniture (GET): http://localhost:3030/data/catalog
export async function getAllItems() {
    const response = await api.get(endpoints.getAllItems);
    return response;
}

// Furniture Details (GET): http://localhost:3030/data/catalog/:id
export async function getItemById(id) {
    const response = await api.get(endpoints.getItemById + id);
    return response; // ???
}

// Update Furniture (PUT): http://localhost:3030/data/catalog/:id
export async function updateById(id, data) {
    const response = await api.put(endpoints.getItemById + id, data);
    return response;
}

// Delete Furniture (DELETE):  http://localhost:3030/data/catalog/:id
export async function deleteItem(id) {
    const response = await api.del(endpoints.getItemById + id);
    return response;
}

// My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22
export async function getMyItems() {
    // {userId}%22
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData && userData._id;
    let id = `${userId}%22`;

    const response = await api.get(endpoints.myItem + id);
    return response;
}