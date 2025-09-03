import { get, post, put, del } from "./api.js";

// We can use this endpoint with encodeURIComponent()
// const endpoints = {
//     'search': '/data/albums?where=name'
// }

export async function getAll() { // With this function we take all existinct records in the server.
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function getById(id) {
    return get('/data/albums/' + id); // Here we take the current song by ID. This is the link from 'details' in the task.
}

export async function deleteById(id) {
    return del('/data/albums/' + id); // This is the link from 'DELETE record' in the task.
}

export async function createAlbum(albumData) {
    return post('/data/albums', albumData); // This is the link from 'CREATE record' in the task.
}

export async function editAlbum(id, albumData) { // This is the link from 'EDIT record' in the task.
    return put('/data/albums/' + id, albumData);
}

// For the SEARCH
// This is the link: /data/albums?where=name%20LIKE%20%22${query}%22
// We can use encodeURIComponent() with the link in the browser console to see how the link should looks like.
// Another way to write the link: return get(endpoints.search + encodeURIComponent(` LIKE "${query}"`));

export async function searchAlbum(query) {
    return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}
// ^ For the SEARCH