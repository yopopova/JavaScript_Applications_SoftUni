import { get, post, put, del } from "./api.js";


export async function getAll() { // With this function we take all existinct records in the server.
    return get('/data/motorcycles?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return get('/data/motorcycles/' + id); // Here we take the current song by ID. This is the link from 'details' in the task.
}

export async function deleteById(id) {
    return del('/data/motorcycles/' + id); // This is the link from 'DELETE record' in the task.
}

export async function createMotorcycle(motorcycleData) {
    return post('/data/motorcycles', motorcycleData); // This is the link from 'CREATE record' in the task.
}

export async function editMotorcycle(id, motorcycleData) { // This is the link from 'EDIT record' in the task.
    return put('/data/motorcycles/' + id, motorcycleData);
}

// For the SEARCH
// This is the link: /data/albums?where=name%20LIKE%20%22${query}%22
// We can use encodeURIComponent() with the link in the browser console to see how the link should looks like.
// Another way to write the link: return get(endpoints.search + encodeURIComponent(` LIKE "${query}"`));

export async function searchMotorcycle(query) {
    return get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`);
}
// ^ For the SEARCH