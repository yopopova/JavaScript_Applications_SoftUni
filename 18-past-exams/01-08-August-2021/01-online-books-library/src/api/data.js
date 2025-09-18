import { get, post, put, del } from "./api.js";

// We can use this endpoint with encodeURIComponent()
// const endpoints = {
//     'search': '/data/albums?where=name'
// }

export async function getAll() { // With this function we take all existinct records in the server.
    return get('/data/books?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return get('/data/books/' + id); // Here we take the current song by ID. This is the link from 'DETAILS' in the task.
}

export async function deleteById(id) {
    return del('/data/books/' + id); // This is the link from 'DELETE record' in the task.
}

export async function createBook(bookData) {
    return post('/data/books', bookData); // This is the link from 'CREATE record' in the task.
}

export async function editJob(id, bookData) { // This is the link from 'EDIT record' in the task.
    return put('/data/books/' + id, bookData);
}

// This is for the extra page 'My Books'
export async function getMyBooks(userId) {
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

// This is for book likes
export async function likeBook(bookId) {
    return post('/data/likes', {
        bookId
    });
}

// This will get all like for the current book
export async function getLikesByBookId(bookId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

// This is for my book likes
export async function getMyLikeBookId(bookId, userId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}