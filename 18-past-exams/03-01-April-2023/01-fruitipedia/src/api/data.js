import { get, post, put, del } from "./api.js";

export async function getAll() { // With this function we take all existinct records in the server.
    return get('/data/fruits?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return get('/data/fruits/' + id); // Here we take the current fruit by ID. This is the link from 'details' in the task.
}

export async function deleteById(id) {
    return del('/data/fruits/' + id); // This is the link from 'DELETE record' in the task.
}

export async function createFruit(fruitData) {
    return post('/data/fruits', fruitData); // This is the link from 'CREATE record' in the task.
}

export async function editFruit(id, fruitData) { // This is the link from 'EDIT record' in the task.
    return put('/data/fruits/' + id, fruitData);
}

// For the SEARCH
export async function searchFruit(query) {
    return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}