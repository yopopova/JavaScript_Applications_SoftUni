import { get, post, put, del } from "./api.js";

// We can use this endpoint with encodeURIComponent()
// const endpoints = {
//     'search': '/data/albums?where=name'
// }

export async function getAll() { // With this function we take all existinct records in the server.
    return get('/data/offers?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return get('/data/offers/' + id); // Here we take the current song by ID. This is the link from 'details' in the task.
}

export async function deleteById(id) {
    return del('/data/offers/' + id); // This is the link from 'DELETE record' in the task.
}

export async function createJob(jobData) {
    return post('/data/offers', jobData); // This is the link from 'CREATE record' in the task.
}

export async function editJob(id, jobData) { // This is the link from 'EDIT record' in the task.
    return put('/data/offers/' + id, jobData);
}